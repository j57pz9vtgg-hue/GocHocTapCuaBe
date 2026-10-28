#!/usr/bin/env python3
"""Publish immutable JS/CSS filenames; no compilation or external dependencies."""
from pathlib import Path
import hashlib
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCES = [
    'assets/school-math.js', 'assets/sync-core.js', 'assets/cloud-sync.js', 'assets/icons.js', 'assets/data.js', 'assets/school-reports.js', 'assets/classification-base.js', 'assets/classification.js', 'assets/app.js', 'assets/settings.js', 'assets/access.js',
    *[f'assets/reference/styles/{name}.css' for name in
      ['dialogs', 'pixel', 'paper', 'themes', 'topics', 'toys', 'arctic']],
    'assets/compat.css',
]
html = (ROOT / 'index.html').read_text(encoding='utf-8')
for relative in SOURCES:
    source = ROOT / relative
    content = source.read_bytes()
    digest = hashlib.sha256(content).hexdigest()[:12]
    published = source.with_name(f'{source.stem}.{digest}{source.suffix}')
    if published.exists() and published.read_bytes() != content:
        raise RuntimeError(f'Hash collision: {published.name}')
    published.write_bytes(content)
    # Keep each stylesheet beside its source so relative image/font URLs stay valid.
    pattern = (r'(?P<prefix>(?:src|href)="\./)' +
               re.escape(str(Path(relative).parent).replace('\\', '/')) + '/' +
               re.escape(source.stem) + r'(?:\.[a-f0-9]{12})?' +
               re.escape(source.suffix) + r'(?:\?[^\"]*)?"')
    target = published.relative_to(ROOT).as_posix()
    html, count = re.subn(pattern, lambda match: match['prefix'] + target + '"', html)
    if count != 1:
        raise RuntimeError(f'Expected one HTML reference to {relative}; found {count}')
(ROOT / 'index.html').write_text(html, encoding='utf-8')
print(f'Versioned {len(SOURCES)} JS/CSS assets; source files retained.')
