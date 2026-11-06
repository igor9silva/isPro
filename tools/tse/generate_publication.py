"""Render the reviewed TSE reports for publication from the original research workspace.

The published files are checked into the site; this script is not run by the
site build. The full source workspace and its locked Python environment are
needed to regenerate them. It never reads credentials or writes to Tigris.
"""
from __future__ import annotations

import argparse
import copy
import gzip
import hashlib
import html
import json
from pathlib import Path
import re
import shutil
import sys
from urllib.parse import urlsplit
from zipfile import ZIP_DEFLATED, ZipFile

SITE = Path(__file__).resolve().parents[2]
DEST = SITE / 'public/eleicoes-2026'
MAIN_ARCHIVE = 'analysis/reports/final/1793441881174112000/estudo-tse-2026-resultados-e-codigo-v2.zip'
SUPPLEMENT_ARCHIVE = 'analysis/extensions/biometry-history-v1/report-1793447557822532000/suplemento-resultados-e-codigo.zip'
SUPPLEMENT_REPORT = 'analysis/extensions/biometry-history-v1/report-1793447557822532000'
STAMP = '31 de outubro de 2026'


def digest(path: Path) -> str:
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()


def read_json(path: Path):
    return json.loads(path.read_text())


def public_doc(doc, kind):
    doc = copy.deepcopy(doc)
    if kind == 'supplement':
        doc['document_status'] = ('Extensão exploratória baseada em registros públicos. '
                                  'Revisão interna; não submetida a revisão externa por pares.')
    substitutions = {
        'Este suplemento atende à ampliação solicitada pelo usuário; não apresenta a comparação histórica como algo ausente de todo o estudo anterior.':
            'Este suplemento amplia a comparação histórica com uma auditoria específica dos indicadores biométricos.',
        'embora seu ZIP de 44.468 bytes esteja preservado':
            'embora seu ZIP de 44.468 bytes tenha sido preservado na coleta',
        'Permanecem o SHA1 de 2014 indisponível, com seu ZIP preservado,':
            'Permanecem o SHA1 de 2014 indisponível, com seu ZIP preservado na coleta,',
        'Os PDFs públicos foram preservados, e carimbos RFC3161 embutidos foram extraídos':
            'Os PDFs públicos foram arquivados na coleta, e carimbos RFC3161 embutidos foram extraídos',
        'O armazenamento privado tem teto absoluto de 1 TB. A publicação dos derivados usa manifesto explícito, hashes, escrita condicional e verificação por releitura. Credenciais não fazem parte dos artefatos. O Mac lê blocos remotos e mantém apenas derivados compactos e membros pequenos necessários à análise; não armazena os grandes ZIPs completos.':
            'A aquisição usou leitura remota em blocos, com catálogo, hashes, recibos e verificação por releitura. O inventário público identifica as fontes e os controles de integridade. Os grandes ZIPs não integram o pacote público reduzido; as fontes podem ser atualizadas ou deixar de estar disponíveis.',
        'A extração depende do inventário auditado e de credenciais privadas apenas por referência de arquivo. O relatório pode ser reconstruído dos derivados preservados, sem nova aquisição.':
            'A extração depende dos arquivos originais, do inventário auditado e dos derivados por seção. O pacote público reúne código, tabelas agregadas e inventário, mas não contém os grandes arquivos nem todos os derivados intermediários; a reprodução integral exige obtê-los separadamente.',
    }
    for section in doc['sections']:
        for index, paragraph in enumerate(section.get('paragraphs', [])):
            for old, new in substitutions.items():
                paragraph = paragraph.replace(old, new)
            section['paragraphs'][index] = paragraph
    return doc


def make_accessible_html(path: Path, slug: str, figure_paths: list[str]):
    text = path.read_text()
    text = text.replace('<meta charset="utf-8">',
        '<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
        f'<link rel="canonical" href="https://igorsilva.pro/eleicoes-2026/{slug}.html">')
    text = text.replace('</style><body>',
        '.report-nav{margin-bottom:28px;font-size:15px}.table-scroll{overflow-x:auto}'
        '.table-scroll table{min-width:570px}figure img{display:block;max-width:100%;height:auto}'
        'a:focus-visible{outline:3px solid #147a70;outline-offset:3px}'
        '</style><body><nav class="report-nav" aria-label="Navegação da pesquisa">'
        '<a href="/eleicoes-2026/">← Voltar à pesquisa</a></nav>')
    text = text.replace('<table>', '<div class="table-scroll"><table>').replace('</table>', '</table></div>')

    pending = iter(figure_paths)

    def label_figure(match):
        caption = match.group(2)
        label = html.escape(re.sub('<[^>]*>', '', html.unescape(caption)), quote=True)
        image = html.escape(next(pending), quote=True)
        return (f'<figure><a href="{image}"><img src="{image}" alt="{label}"></a>'
                f'<figcaption>{caption}</figcaption></figure>')

    text, replaced = re.subn(r'<figure>(.*?)<figcaption>(.*?)</figcaption></figure>', label_figure, text, flags=re.S)
    if replaced != len(figure_paths):
        raise ValueError('Rendered figure count differs from the manuscript')
    text = re.sub(r'[ \t]+(?=\r?$)', '', text, flags=re.M)
    path.write_text(text)


def build_public_artifacts(root: Path):
    main = root / MAIN_ARCHIVE
    supplement = root / SUPPLEMENT_ARCHIVE
    audit = root / 'reports/acquisition-audit-20261030T224600/objects.jsonl'
    records = []
    for line in audit.read_text().splitlines():
        row = json.loads(line)
        url = urlsplit(row['url'])
        if url.scheme != 'https' or not (url.hostname or '').endswith('.tse.jus.br') or url.query:
            raise ValueError('Unexpected source URL in acquisition inventory')
        records.append({key: row[key] for key in ['path', 'url', 'year', 'category', 'bytes', 'hashes',
                                                  'verification_method', 'official_companions', 'issues']})
    if len(records) != 3388:
        raise ValueError('Acquisition inventory count changed')
    inventory = ''.join(json.dumps(r, ensure_ascii=False, sort_keys=True) + '\n' for r in records).encode()
    with (DEST / 'inventario-fontes.jsonl.gz').open('wb') as raw:
        with gzip.GzipFile(filename='', mode='wb', fileobj=raw, mtime=0) as out:
            out.write(inventory)

    readme = '''PESQUISA ELEIÇÕES 2026: DADOS E CÓDIGO

O pacote contém tabelas agregadas, dicionários, scripts, planos e um inventário
das fontes oficiais. As figuras, os relatórios e os apêndices estão no site.

O arquivo inventario-fontes.jsonl.gz lista 3.388 objetos, seus endereços oficiais,
tamanhos e hashes calculados durante a coleta. O campo official_companions indica
os casos em que houve comparação com um hash oficial; hash calculado não é a
mesma garantia. Um SHA1 de 2014 retornou 404. Dez documentos auxiliares não foram
arquivados na coleta original, embora alguns textos tenham sido consultados.

Os ZIPs brutos e todos os derivados intermediários por seção NÃO estão neste pacote.
Portanto, ele permite examinar as tabelas publicadas e o código, mas a execução
integral do pipeline exige obter as entradas e intermediários correspondentes.
O TSE pode atualizar uma URL; compare os hashes antes de tratar outro download
como idêntico. A aquisição original usou S3 privado e leitura em blocos: os
scripts preservam os parâmetros de então e exigem adaptação para outro ambiente.
Nenhuma credencial é distribuída. Consulte requirements-analysis.txt e os planos.

Fontes: Portal de Dados Abertos do TSE, https://dadosabertos.tse.jus.br/ .
Os dados do TSE devem ser atribuídos à fonte e às licenças dos respectivos conjuntos.
A análise é independente e não representa uma conclusão institucional do TSE.
'''
    bundle = DEST / 'dados-e-codigo.zip'
    copied = []
    with ZipFile(bundle, 'w', compression=ZIP_DEFLATED, compresslevel=6) as out:
        out.writestr('LEIA-ME.txt', readme)
        out.writestr('inventario/inventario-fontes.jsonl.gz', (DEST / 'inventario-fontes.jsonl.gz').read_bytes())
        for source, slug, kind in [
            ('analysis/report-source/manuscript-v2.json', 'relatorio', 'main'),
            ('analysis/report-source/technical-appendix-v2.json', 'apendice-tecnico', 'main'),
            (SUPPLEMENT_REPORT+'/manuscript.json', 'biometria-historico', 'supplement'),
            (SUPPLEMENT_REPORT+'/technical-appendix.json', 'apendice-biometria', 'supplement'),
        ]:
            out.writestr('manuscritos-publicos/'+slug+'.json',
                         json.dumps(public_doc(read_json(root/source), kind), ensure_ascii=False, indent=2))
        for label, archive in [('principal', main), ('suplemento', supplement)]:
            with ZipFile(archive) as src:
                for item in src.infolist():
                    name = item.filename
                    include = (name.startswith('scripts/') and name.endswith(('.py', '.txt')))
                    include |= (name.startswith('analysis/derived/') and name.endswith('.csv'))
                    include |= (name.startswith('analysis/dictionaries/') and name.endswith(('.csv', '.json')))
                    include |= (name.startswith('analysis/extensions/biometry-history-v1/') and name.endswith('.csv'))
                    include |= name in ('analysis/analysis-plan.json', 'analysis/analysis-plan-v1.json',
                                        'analysis/plan-amendments.jsonl')
                    if not include or item.is_dir():
                        continue
                    data = src.read(item)
                    # Code/data should not carry local user paths or embedded access keys.
                    if b'/Users/igor/' in data or re.search(rb'AKIA[0-9A-Z]{16}', data):
                        raise ValueError('Potential private path or credential in selected artifact: ' + name)
                    out.writestr(label + '/' + name, data)
                    copied.append(label + '/' + name)
        for directory, label in [(root/'analysis/reports/final/1793441881174112000', 'principal'),
                                 (root/SUPPLEMENT_REPORT, 'suplemento')]:
            for path in sorted(directory.glob('*.csv')):
                out.writestr(label + '/tabelas-publicadas/' + path.name, path.read_bytes())
        out.writestr('manifesto-arquivos.json', json.dumps(sorted(copied), ensure_ascii=False, indent=2))
    with ZipFile(bundle) as check:
        if check.testzip() is not None:
            raise ValueError('Public reproducibility ZIP failed CRC validation')
    return {'inventory_records': len(records), 'code_and_data_entries': len(copied),
            'bundle_bytes': bundle.stat().st_size, 'bundle_sha256': digest(bundle)}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--research-root', required=True, type=Path)
    args = parser.parse_args()
    root = args.research_root.resolve()
    sys.path.insert(0, str(root/'scripts'))
    import report_renderer as renderer

    renderer.ROOT = root
    DEST.mkdir(parents=True, exist_ok=True)
    tables, figures, _ = renderer.inputs_and_tables()
    # Original renderer's main() sets the published numbering before rendering.
    for number, key in enumerate(['documentary_windows', 'coverage_2026', 'time_windows', 'intervals',
                                  'history_participation', 'history_temporal', 'margin_sensitivity', 'audit_margin'], 1):
        tables[key]['title'] = re.sub(r'^Tabela \d+\.', f'Tabela {number}.', tables[key]['title'])
    main_figure_items = renderer.figure_items
    sources = [
        ('analysis/report-source/manuscript-v2.json', 'relatorio', 'main'),
        ('analysis/report-source/technical-appendix-v2.json', 'apendice-tecnico', 'main'),
        (SUPPLEMENT_REPORT+'/manuscript.json', 'biometria-historico', 'supplement'),
        (SUPPLEMENT_REPORT+'/technical-appendix.json', 'apendice-biometria', 'supplement'),
    ]
    supplement_tables = read_json(root/SUPPLEMENT_REPORT/'tables.json')
    supplement_figures = read_json(root/'reports/biometry-history-figures-state.json')
    figure_numbers = {'historical-biometry': 1, 'historical-panel': 2, 'regional-correlation': 3,
                      'historical-prediction': 4, 'extreme-history': 5, 'first-digit-history': 6}

    def supplement_figure_items(ids, state):
        for name in ids:
            item = dict(next(x for x in state['figures'] if x['name'] == name))
            item['caption'] = re.sub(r'^Figura \d+\.', f'Figura {figure_numbers[name]}.', item['caption'])
            yield root/state['output_folder'], item

    source_hashes = []
    for source, slug, kind in sources:
        source_path = root/source
        source_hashes.append({'path': source, 'sha256': digest(source_path)})
        doc = public_doc(read_json(source_path), kind)
        is_supplement = kind == 'supplement'
        renderer.figure_items = supplement_figure_items if is_supplement else main_figure_items
        doc_tables = supplement_tables if is_supplement else tables
        doc_figures = supplement_figures if is_supplement else figures
        figure_paths = []
        for section in doc['sections']:
            for figure_root, item in renderer.figure_items(section.get('figures', []), doc_figures):
                relative = Path('figuras') / (item['name'] + '.png')
                (DEST / relative).parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(figure_root / (item['name'] + '.png'), DEST / relative)
                figure_paths.append(relative.as_posix())
        renderer.build_html(doc, DEST/(slug+'.html'), doc_tables, doc_figures, STAMP)
        make_accessible_html(DEST/(slug+'.html'), slug, figure_paths)
        renderer.build_pdf(doc, DEST/(slug+'.pdf'), doc_tables, doc_figures, STAMP)
    results = build_public_artifacts(root)
    outputs = [{'path': str(p.relative_to(DEST)), 'bytes': p.stat().st_size, 'sha256': digest(p)}
               for p in sorted(DEST.rglob('*')) if p.is_file() and p.name != 'manifesto-publicacao.json']
    manifest = {'data_limite': '2026-10-31', 'source_documents': source_hashes, 'outputs': outputs,
                'editorial_changes': ['Retirada de marcações de uso privado e inclusão de navegação pública.',
                                      'Explicitação de que o pacote público é reduzido e as fontes podem mudar.',
                                      'Referências à preservação de um ZIP convertidas para o tempo da coleta.',
                                      'Resultados, tabelas, hipóteses e limites científicos mantidos.'], **results}
    (DEST/'manifesto-publicacao.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n')
    print(json.dumps({'documents': len(sources), **results}, ensure_ascii=False))


if __name__ == '__main__':
    main()
