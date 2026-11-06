"""Check links, source inventory and packaged public artifacts without network access."""
from collections import Counter
import gzip
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[2]
PUBLIC = ROOT / 'public'
STUDY = PUBLIC / 'eleicoes-2026'


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.targets = []
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        if tag == 'a' and 'href' in attrs:
            self.targets.append(attrs['href'])
        if tag == 'img' and 'src' in attrs:
            self.targets.append(attrs['src'])


def main():
    parsed = {}
    for page in STUDY.glob('*.html'):
        parsed[page] = Links()
        parsed[page].feed(page.read_text())
    for page, state in parsed.items():
        for target in state.targets:
            url = urlsplit(target)
            if url.scheme or url.netloc or target.startswith('mailto:'):
                continue
            if url.path == '/':
                continue
            if not url.path:
                local = page
            else:
                local = (PUBLIC / unquote(url.path.lstrip('/'))) if url.path.startswith('/') else (page.parent / unquote(url.path))
            if local.is_dir():
                local /= 'index.html'
            if not local.exists():
                raise ValueError(f'Missing target: {page.name}: {target}')
            if url.fragment and local in parsed and url.fragment not in parsed[local].ids:
                raise ValueError(f'Missing anchor: {page.name}: {target}')
    manifest = json.loads((STUDY/'manifesto-publicacao.json').read_text())
    for row in manifest['outputs']:
        path = STUDY/row['path']
        if path.stat().st_size != row['bytes'] or hashlib.sha256(path.read_bytes()).hexdigest() != row['sha256']:
            raise ValueError(f'Publication artifact changed after manifest: {row["path"]}')
    with gzip.open(STUDY/'inventario-fontes.jsonl.gz', 'rt') as stream:
        inventory = [json.loads(line) for line in stream]
    if len(inventory) != 3388 or sum(row['bytes'] for row in inventory) != 521157604697:
        raise ValueError('Source inventory count or byte total changed')
    if sum(bool(row['official_companions']) for row in inventory) != 1318:
        raise ValueError('Official companion comparisons do not match the audit')
    methods = Counter(row['verification_method'] for row in inventory)
    if methods['full_s3_readback_against_trusted_checksum'] != 638:
        raise ValueError('Full reread count does not match the audit')
    with ZipFile(STUDY/'dados-e-codigo.zip') as bundle:
        names = bundle.namelist()
        if len(names) != len(set(names)) or bundle.testzip() is not None:
            raise ValueError('Duplicate or corrupt public package entry')
        if any('private/' in name.lower() or 'credential' in name.lower() or '/raw/' in name for name in names):
            raise ValueError('Private or raw data path in public package')
        if not any(name.endswith('biometry_history_extension.py') for name in names):
            raise ValueError('Biometric analysis code missing from package')
        if not any(name.endswith('margin_bounds.py') for name in names):
            raise ValueError('Margin-bound code missing from package')
        for name in names:
            if name.endswith(('.py', '.txt', '.csv', '.json', '.jsonl')):
                data = bundle.read(name)
                if b'/Users/igor/' in data or re.search(rb'\b(?:AKIA|ASIA)[0-9A-Z]{16}\b', data):
                    raise ValueError(f'Potential private data in {name}')
    for pdf in ['relatorio.pdf', 'apendice-tecnico.pdf', 'biometria-historico.pdf', 'apendice-biometria.pdf']:
        if not (STUDY/pdf).read_bytes().startswith(b'%PDF-'):
            raise ValueError(f'Invalid PDF: {pdf}')
    print(f'OK: {len(parsed)} HTML pages, {len(inventory)} source records, {len(names)} package entries, 4 PDFs')


if __name__ == '__main__':
    main()
