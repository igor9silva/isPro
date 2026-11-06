"""Build the complete report after computational review; visual release is separate."""
import argparse
import html
import json
from pathlib import Path
import re
import time

import pandas as pd
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                               TableStyle, Image, KeepTogether, PageBreak)

from analysis_common import ROOT, atomic_json, digest, now


def read_json(path):
    return json.loads((ROOT / path).read_text())


def pt(value, digits=0):
    if pd.isna(value):
        return '—'
    return f'{float(value):,.{digits}f}'.replace(',', '@').replace('.', ',').replace('@', '.')


def inputs_and_tables():
    reports = {name: read_json(f'reports/{name}.json') for name in [
        'temporal-population-state', 'margin-scenario-state', 'intercompletion-state',
        'election-comparison-state', 'scientific-final-figures-state', 'context-sampling-bounds-state',
        'supplemental-sensitivity-state', 'documentary-time-window-state']}
    paths = {name: ROOT / r.get('output_folder', r.get('folder', '')) for name, r in reports.items()}
    files = []

    def frame(report, filename):
        p = paths[report] / filename
        files.append(p)
        return pd.read_csv(p)

    all_n = frame('temporal-population-state', 'national.csv')
    n = all_n[(all_n.year == 2026) & (all_n.scope == 'domestic')].sort_values('round')
    # Fail rather than silently emit prose inconsistent with revised inputs.
    expected = {1: (124934069, 3723678, 3725552, 718),
                2: (127854631, 34050, 34330, 322)}
    for row in n.itertuples():
        actual = tuple(int(getattr(row, k)) for k in ['attendance', 'recorded_strict_post_deadline',
                         'recorded_inclusive_post_deadline', 'unobserved_count_gap_if_no_spurious'])
        if actual != expected[row.round]:
            raise ValueError('Revise the manuscript after changed 2026 population measurements')
    tables = {}
    tables['coverage_2026'] = {
        'title': 'Tabela 1. Cobertura doméstica por turno de 2026',
        'headers': ['Turno', 'Seções', 'Comparecimento', 'Seções sem log', 'Lacuna de contagem', 'Conclusões após 17h'],
        'rows': [[str(r.round), pt(r.sections), pt(r.attendance), pt(r.missing_log_sections),
                  pt(r.unobserved_count_gap_if_no_spurious), pt(r.recorded_strict_post_deadline)] for r in n.itertuples()],
        'note': 'Corte estrito após 17h de Brasília. A lacuna soma comparecimentos não reconstruídos sob ausência de eventos espúrios; não é contagem de votos tardios.'}
    tables['time_windows'] = {
        'title': 'Tabela 2. Conclusões de votação e convenções do corte',
        'headers': ['Turno', 'Exatamente 17h', '(17h,18h]', '(18h,19h]', 'Após 19h', 'Após 17h / comparecimento'],
        'rows': [[str(r.round), pt(r.exact_deadline_events), pt(r.recorded_17_18), pt(r.recorded_18_19),
                  pt(r.recorded_after_19), pt(r.recorded_post_deadline_percent_of_attendance, 5) + '%'] for r in n.itertuples()],
        'note': 'Contagens na escala dos relógios registrados, com conversão municipal. O instante exato de 17h não integra as três janelas estritas.'}
    intervals = frame('intercompletion-state', 'national-intervals.csv')
    intervals = intervals[intervals.year == 2026]
    settings = {'general_first_turn': '1º turno geral', 'president_and_governor': '2º: presidente e governador',
                'president_only': '2º: apenas presidente'}
    tables['intervals'] = {
        'title': 'Tabela 3. Intervalos entre conclusões nas seções qualificadas',
        'headers': ['Configuração', 'Seções', 'Mediana (s)', 'P90 (s)', 'P95 (s)', 'Média (s)'],
        'rows': [[settings.get(r.setting, r.setting), pt(r.sections), pt(r.median_interval_seconds),
                  pt(r.p90_interval_seconds), pt(r.p95_interval_seconds), pt(r.mean_interval_seconds, 2)] for r in intervals.itertuples()],
        'note': 'Os intervalos misturam serviço, chegadas, ociosidade e interrupções; não medem tempo de fila. As exclusões e os denominadores constam da tabela de cobertura do estimador.'}
    hist = frame('election-comparison-state', 'national-participation.csv')
    hist = hist[hist.scope == 'domestic'].sort_values(['year', 'round'])
    tables['history_participation'] = {
        'title': 'Tabela 4. Comparecimento nos produtos BWeb, território brasileiro',
        'headers': ['Ano', 'Turno', 'Seções', 'Aptos', 'Comparecimento', 'Participação'],
        'rows': [[str(r.year), str(r.round), pt(r.sections), pt(r.eligible), pt(r.attendance),
                  pt(100*r.turnout_weighted, 3)+'%'] for r in hist.itertuples()],
        'note': '2014, 2018, 2022 e 2026: cargo presidencial. 2024: prefeito; o segundo turno municipal inclui somente municípios em que ocorreu. O exterior não está incluído.'}
    margins = frame('margin-scenario-state', 'conditional-margin-bounds.csv')
    selected = margins[(margins.scenario == 'strict_other_sections_all') & (margins.cutoff_shift_earlier_seconds == 900)]
    selected = selected.sort_values('race')
    tables['margin_sensitivity'] = {
        'title': 'Tabela 5. Limites condicionais: corte 15 minutos anterior e casos não qualificados integralmente incluídos',
        'headers': ['Disputa', 'Margem observada', 'Teto de participantes adicionais', 'Maior redução da margem', 'Menor margem contrafactual'],
        'rows': [[r.race.replace('-GOVERNADOR', ' · Gov.').replace('BR-PRESIDENTE', 'Brasil · Pres.'),
                  pt(r.observed_margin), pt(r.possible_added_voters_cap), pt(r.maximum_adverse_margin_change),
                  pt(r.minimum_counterfactual_margin)] for r in selected.itertuples()],
        'note': 'Limites matemáticos sob mecanismo de adição de participantes e hipóteses descritas; não são efeitos estimados nem intervalos de confiança. Todo o exterior é incluído no teto presidencial. Esta tabela mostra o limite básico; a tabela da auditoria amplia conservadoramente o limite presidencial. As seis disputas estaduais receberam censo dos contextos restantes.'}
    historical = all_n[all_n.scope.eq('domestic')].sort_values(['year', 'round'])
    tables['history_temporal'] = {
        'title': 'Tabela 6. Conclusões após o prazo nos registros nacionais revisados',
        'headers': ['Ano / turno', 'Seções', 'Comparecimento', 'Após o prazo', 'Taxa (%)', 'Lacuna positiva'],
        'rows': [[f'{r.year} / {r.round}º', pt(r.sections), pt(r.attendance), pt(r.recorded_strict_post_deadline),
                  pt(r.recorded_post_deadline_percent_of_attendance, 5), pt(r.unobserved_count_gap_if_no_spurious)] for r in historical.itertuples()],
        'note': 'Corte estrito doméstico com fuso municipal. Lacunas positivas não são compensadas por excessos: em 2022 houve 117/9 eventos acima do comparecimento e em 2024 houve 3/1, por turno; em 2026 não houve excesso após revisão. 2024 é municipal e seu segundo turno tem população selecionada.'}
    audit = frame('context-sampling-bounds-state', 'presidential-bounds-with-audit-uncertainty.csv')
    tables['audit_margin'] = {
        'title': 'Tabela 7. Sensibilidade presidencial à incerteza da auditoria de contexto',
        'headers': ['Antecipação do corte', 'Redução básica', 'Acréscimo por possíveis falhas', 'Margem mínima'],
        'rows': [[pt(r.cutoff_shift_earlier_seconds/60)+' min', pt(r.base_conditional_adverse_bound),
                  pt(r.additional_adverse_bound_from_context_sampling), pt(r.minimum_counterfactual_margin_with_audit_uncertainty)] for r in audit.itertuples()],
        'note': 'Limites simultâneos de 95% para o número de falhas de identidade nos 21 estratos amostrais; não é intervalo do efeito causal. A margem observada é 4.430.191. Casos fora do conjunto estrito e todo o exterior já integram o teto básico.'}
    documentary = frame('documentary-time-window-state', 'documentary-time-windows.csv')
    documentary = documentary[documentary.territory.eq('BR-domestic')]
    tables['documentary_windows'] = {
        'title': 'Tabela 8. Conclusões após marcadores documentais, sem atribuição de exposição',
        'headers': ['Marcador em Brasília', 'Limite inferior', 'Limite superior', 'Precisão'],
        'rows': [[r.marker_brasilia, pt(r.completions_strictly_after_lower), pt(r.completions_strictly_after_upper),
                  'Exato no bin' if r.exact_at_available_precision else 'Minuto não resolvido'] for r in documentary.itertuples()],
        'note': '17:32:59 e 18:05:21 são carimbos embutidos, sem validação independente da cadeia; 17:49 é minuto de assinatura relatado pelo TRE-AM. Nenhum marcador prova comunicação por seção. Os limites delimitam segundos não resolvidos no histograma, não um intervalo de confiança.'}
    supplement = frame('supplemental-sensitivity-state', 'accepted-alternatives.csv')
    supplement = supplement[supplement.uf.ne('ZZ')]
    tables['supplemental_history'] = {
        'title': 'Tabela A1. Sensibilidade com sequências retidas do primeiro turno de 2022',
        'headers': ['UF / município / zona / seção', 'Comparecimento', 'Conclusões recuperadas', 'Lacuna restante', 'Após o prazo'],
        'rows': [[f'{r.uf} / {r.municipality} / {r.zone} / {r.section}', pt(r.attendance),
                  pt(r.additional_reconstructed_completions), pt(r.alternative_gap), pt(r.additional_reconstructed_strict_late)] for r in supplement.itertuples()],
        'note': 'Somente primários sem conclusões recebem uma sequência própria completa; sequências positivas não são unidas por horário. Os registros e os resultados principais permanecem preservados. Há recuperação adicional de 17.561 conclusões em 53 seções do exterior, sem classificação doméstica de horário.'}
    ops = frame('temporal-population-state', 'operational-associations.csv')
    ops = ops[(ops.year == 2026) & (ops['round'] == 2)]
    indicators = {'multiple_log_boots': 'Boots múltiplos', 'nested_archive': 'Arquivo aninhado',
                  'suspension_without_vote': 'Suspensão sem voto', 'opening_delay_over_5min': 'Abertura > 5 min tarde'}
    tables['operational_associations'] = {
        'title': 'Tabela A2. Associações operacionais no segundo turno de 2026',
        'headers': ['Indicador', 'Presente?', 'Seções', 'Comparecimento', 'Conclusões tardias', 'Por 100 mil'],
        'rows': [[indicators[r.indicator], 'Sim' if r.present else 'Não', pt(r.sections), pt(r.attendance),
                  pt(r.recorded_strict_post_deadline), pt(100000*r.recorded_strict_post_deadline/r.attendance, 2)] for r in ops.itertuples()],
        'note': 'Exclui log ausente e contexto operacional misto. Associações não ajustadas por geografia, tamanho ou demanda; indicadores não demonstram causa nem identificam fila ou substituição de hardware.'}
    for name in reports:
        files.append(ROOT / f'reports/{name}.json')
    return tables, reports['scientific-final-figures-state'], files


CSS = '''
body{font-family:Arial,sans-serif;line-height:1.6;color:#172737;max-width:1000px;margin:42px auto;padding:0 28px}
h1{font-size:32px;line-height:1.2}h2{font-size:23px;margin-top:2.2em;color:#123c52}
.subtitle{font-size:19px;color:#52636d}.draft{border-left:5px solid #b66b17;padding:14px 18px;background:#fff5e6}
p{text-align:left}table{border-collapse:collapse;width:100%;font-size:13px;margin-top:14px}
th{background:#123c52;color:white;text-align:left}td,th{padding:9px;border-bottom:1px solid #d4dfe4}
tr:nth-child(even){background:#f2f6f8}.note,figcaption{font-size:13px;color:#435864}figure{margin:30px 0}
svg{max-width:100%;height:auto}a{color:#145e80}.meta{font-size:13px;color:#56636c}
@media print{body{margin:0;max-width:none;font-size:10pt}h2{break-after:avoid}figure,table{break-inside:avoid}}
'''


def paragraph_markup(text):
    escaped = html.escape(text)
    return re.sub(r'\[(S\d+(?:, S\d+)*)\]', lambda m: ' [' + ', '.join(
        f'<a href="#ref-{x}">{x}</a>' for x in m.group(1).split(', ')) + ']', escaped)


def figure_items(ids, figures):
    root = ROOT / figures['output_folder']
    for prefix in ids:
        item = next(x for x in figures['captions'] if x['name'].startswith(prefix+'-'))
        item = dict(item)
        text = re.sub(r'(?<=[A-Za-zÀ-ÿ])(?=\d)|(?<=\d)(?=[A-Za-zÀ-ÿ])', ' ', item['caption'])
        item['caption'] = text.replace('porUF', 'por UF').replace('hBrasília', 'h Brasília').replace('doméstico,', 'doméstico, ')
        yield root, item


def build_html(doc, output, tables, figures, stamp):
    parts = ['<!doctype html><html lang="pt-BR"><meta charset="utf-8">',
             f'<title>{html.escape(doc["title"])}</title><style>{CSS}</style><body>',
             f'<h1>{html.escape(doc["title"])}</h1><p class="subtitle">{html.escape(doc["subtitle"])}</p>',
             f'<p class="draft">{html.escape(doc["document_status"])}</p><p class="meta">Base científica concluída em {stamp}.</p>']
    for section in doc['sections']:
        parts.append(f'<h2>{html.escape(section["title"])}</h2>')
        parts.extend(f'<p>{paragraph_markup(p)}</p>' for p in section['paragraphs'])
        if section.get('table'):
            t = tables[section['table']]
            parts.append(f'<h3>{html.escape(t["title"])}</h3><table><thead><tr>'+''.join(f'<th>{html.escape(x)}</th>' for x in t['headers'])+'</tr></thead><tbody>')
            for row in t['rows']:
                parts.append('<tr>'+''.join(f'<td>{html.escape(x)}</td>' for x in row)+'</tr>')
            parts.append(f'</tbody></table><p class="note">{html.escape(t["note"])}</p>')
        for root, item in figure_items(section.get('figures', []), figures):
            svg = (root / (item['name']+'.svg')).read_text()
            svg = svg[svg.index('<svg'):]
            parts.append(f'<figure>{svg}<figcaption>{html.escape(item["caption"])}</figcaption></figure>')
    if doc.get('references'):
        parts.append('<h2>Fontes citadas</h2>')
        for ref in doc['references']:
            parts.append(f'<p id="ref-{ref["id"]}"><b>{ref["id"]}.</b> <a href="{html.escape(ref["url"],quote=True)}">{html.escape(ref["title"])}</a></p>')
    parts.append('</body></html>')
    output.write_text('\n'.join(parts))


def build_pdf(doc, output, tables, figures, stamp):
    fonts = Path('/System/Library/Fonts/Supplemental')
    for face, filename in [('Study', 'Arial.ttf'), ('StudyBold', 'Arial Bold.ttf'), ('StudyItalic', 'Arial Italic.ttf')]:
        pdfmetrics.registerFont(TTFont(face, str(fonts / filename)))
    pdfmetrics.registerFontFamily('Study', normal='Study', bold='StudyBold', italic='StudyItalic', boldItalic='StudyBold')
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle('BodyStudy', fontName='Study', fontSize=9.5, leading=14, spaceAfter=8,
                              allowWidows=0, allowOrphans=0))
    styles.add(ParagraphStyle('TitleStudy', fontName='StudyBold', fontSize=21, leading=26, spaceAfter=15))
    styles.add(ParagraphStyle('SubtitleStudy', fontName='Study', fontSize=12, leading=17, textColor=colors.HexColor('#52636d'), spaceAfter=14))
    styles.add(ParagraphStyle('HeadingStudy', fontName='StudyBold', fontSize=14, leading=18, spaceBefore=17, spaceAfter=10, keepWithNext=True))
    styles.add(ParagraphStyle('NoteStudy', fontName='Study', fontSize=8, leading=11, textColor=colors.HexColor('#435864'), spaceAfter=12))
    styles.add(ParagraphStyle('CellStudy', fontName='Study', fontSize=7.8, leading=10))
    styles.add(ParagraphStyle('HeadCellStudy', parent=styles['CellStudy'], fontName='StudyBold', textColor=colors.white))
    width = A4[0] - 88
    story = [Paragraph(html.escape(doc['title']), styles['TitleStudy']),
             Paragraph(html.escape(doc['subtitle']), styles['SubtitleStudy']),
             Paragraph('<b>'+html.escape(doc['document_status'])+'</b>', styles['BodyStudy']),
             Paragraph(f'Base científica concluída em {stamp}.', styles['NoteStudy'])]
    for section in doc['sections']:
        story.append(Paragraph(html.escape(section['title']), styles['HeadingStudy']))
        for p in section['paragraphs']:
            story.append(Paragraph(html.escape(p), styles['BodyStudy']))
        if section.get('table'):
            t = tables[section['table']]
            rows = [[Paragraph(html.escape(x), styles['HeadCellStudy']) for x in t['headers']]]
            rows += [[Paragraph(html.escape(x), styles['CellStudy']) for x in row] for row in t['rows']]
            count = len(t['headers'])
            widths = [width/count]*count
            if section['table'] == 'intervals':
                widths = [width*.27]+[width*.73/(count-1)]*(count-1)
            table = Table(rows, colWidths=widths, repeatRows=1, hAlign='LEFT')
            table.setStyle(TableStyle([
                ('BACKGROUND',(0,0),(-1,0),colors.HexColor('#123c52')),
                ('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,colors.HexColor('#f2f6f8')]),
                ('LINEBELOW',(0,0),(-1,-1),.3,colors.HexColor('#d4dfe4')),
                ('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),6),
                ('RIGHTPADDING',(0,0),(-1,-1),6),('TOPPADDING',(0,0),(-1,-1),7),
                ('BOTTOMPADDING',(0,0),(-1,-1),7)]))
            story.append(Paragraph(html.escape(t['title']), styles['HeadingStudy']))
            story.extend([table, Spacer(1,7), Paragraph(html.escape(t['note']), styles['NoteStudy'])])
        for root, item in figure_items(section.get('figures', []), figures):
            image = Image(str(root/(item['name']+'.png')))
            scale = min(width/image.imageWidth, 420/image.imageHeight)
            image.drawWidth = image.imageWidth*scale
            image.drawHeight = image.imageHeight*scale
            story.append(KeepTogether([Spacer(1,8), image, Spacer(1,5),
                         Paragraph(html.escape(item['caption']), styles['NoteStudy'])]))
    if doc.get('references'):
        story.extend([PageBreak(), Paragraph('Fontes citadas', styles['HeadingStudy'])])
        for ref in doc['references']:
            story.append(Paragraph(f'<b>{ref["id"]}.</b> <link href="{html.escape(ref["url"],quote=True)}" color="#145e80">{html.escape(ref["title"])}</link>', styles['BodyStudy']))

    def footer(canvas, document):
        canvas.saveState()
        canvas.setFont('Study', 8)
        canvas.setFillColor(colors.HexColor('#56636c'))
        canvas.drawString(44, 25, 'Eleições de 2026 · Análise dos registros públicos')
        canvas.drawRightString(A4[0]-44,25,str(document.page))
        canvas.restoreState()

    pdf = SimpleDocTemplate(str(output), pagesize=A4, rightMargin=44, leftMargin=44,
                            topMargin=43, bottomMargin=45, title=doc['title'], author='Análise de dados oficiais do TSE')
    pdf.build(story, onFirstPage=footer, onLaterPages=footer)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--release', action='store_true', required=True,
                        help='Requires completed numerical and methodological review; visual review follows generation.')
    parser.parse_args()
    verification = read_json('reports/analysis-numerical-verification-state.json')
    if verification['status'] != 'passed_numerical_crosschecks_not_causal_identification':
        raise ValueError('Numerical verification has not passed')
    review = read_json('reports/scientific-computation-review.json')
    if review['status'] != 'scientific_computation_reviewed_pending_document_release':
        raise ValueError('Scientific computation review is required')
    tables, figures, files = inputs_and_tables()
    for number, key in enumerate(['documentary_windows', 'coverage_2026', 'time_windows', 'intervals',
                                  'history_participation', 'history_temporal', 'margin_sensitivity', 'audit_margin'], 1):
        tables[key]['title'] = re.sub(r'^Tabela \d+\.', f'Tabela {number}.', tables[key]['title'])
    stamp = now()
    output = ROOT / 'analysis/reports/final' / str(time.time_ns())
    output.mkdir(parents=True, exist_ok=False)
    docs = [('manuscript-v2.json','relatorio-cientifico'), ('technical-appendix-v2.json','apendice-tecnico')]
    for source, name in docs:
        p = ROOT / 'analysis/report-source' / source
        doc = json.loads(p.read_text())
        files.append(p)
        build_html(doc, output/(name+'.html'), tables, figures, stamp)
        build_pdf(doc, output/(name+'.pdf'), tables, figures, stamp)
    for key, t in tables.items():
        pd.DataFrame(t['rows'],columns=t['headers']).to_csv(output/(key+'.csv'),index=False)
    for item in figures['captions']:
        for ext in ['svg','png']:
            files.append(ROOT / figures['output_folder'] / (item['name']+'.'+ext))
    files.extend([ROOT/'reports/analysis-numerical-verification-state.json', ROOT/'reports/scientific-computation-review.json'])
    result = {'at':stamp, 'status':'complete_document_generated_pending_visual_release',
              'output_folder':str(output.relative_to(ROOT)), 'remaining':['Visual PDF review and private preservation'],
              'inputs':[{'path':str(p.relative_to(ROOT)),'sha256':digest(p)} for p in files],
              'outputs':[{'path':str(p.relative_to(ROOT)),'sha256':digest(p),'bytes':p.stat().st_size} for p in output.iterdir()],
              'code_sha256':digest(ROOT/'scripts/build_final_scientific_report.py')}
    atomic_json(output/'document-manifest.json',result)
    atomic_json(ROOT/'reports/scientific-report-final-state.json',result)
    print(json.dumps({k:v for k,v in result.items() if k not in ['inputs','outputs']}))


if __name__ == '__main__':
    main()
