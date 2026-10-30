import concurrent.futures
import datetime
import difflib
import hashlib
import html
import json
from pathlib import Path
import re
import sys
import time
import urllib.request
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parent
DOWNLOADS = Path('/Users/sergey/Downloads')
W = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
X = {'x': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

def norm(value):
    return re.sub(r'\s+', ' ', value).strip()

def extract():
    with zipfile.ZipFile(DOWNLOADS / 'MYVOX-9 LP URLs.xlsx') as z:
        strings = [''.join(t.itertext()) for t in ET.fromstring(z.read('xl/sharedStrings.xml')).findall('x:si', X)]
        sheet = ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
        rows = []
        angle = ''
        for row in sheet.findall('x:sheetData/x:row', X)[1:]:
            cells = {}
            for cell in row.findall('x:c', X):
                v = cell.find('x:v', X)
                value = '' if v is None else (v.text or '')
                if cell.get('t') == 's':
                    value = strings[int(value)]
                cells[re.sub('[0-9]', '', cell.get('r'))] = value
            angle = cells.get('A') or angle
            rows.append({'index': len(rows)+1, 'xlsx_row': int(row.get('r')), 'angle': angle, 'group': cells['B'], 'url': cells['C']})
    with zipfile.ZipFile(DOWNLOADS / 'MYVOX-9 Hero Blocks.docx') as z:
        doc = ET.fromstring(z.read('word/document.xml'))
        paragraphs = [norm(''.join(p.itertext())) for p in doc.findall('.//w:p', W)]
    blocks = []
    for p in paragraphs:
        if p.startswith('HERO '):
            blocks.append({'group': p})
        elif p.startswith(('Headline:', 'Subhead:', 'CTA:')):
            key, value = p.split(':', 1)
            blocks[-1][{'Headline':'headline', 'Subhead':'description', 'CTA':'cta'}[key]] = value.strip()
        elif p:
            raise ValueError('Unmapped paragraph: '+p)
    assert len(rows) == len(blocks) == 80
    assert len(set(row['url'] for row in rows)) == 80
    for row, block in zip(rows, blocks):
        assert row['group'] == block['group'], (row, block)
        assert set(block) == {'group','headline','description','cta'}
        row['expected'] = {k: block[k] for k in ['headline','description','cta']}
    (ROOT/'inputs.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2))
    print('Mapped 80 unique URLs to 80 DOCX hero variants; all group labels match.')
    print(json.dumps([{'angle':r['angle'],'first_url':r['url']} for r in rows[::10]],ensure_ascii=False,indent=2))

def fetch_one(row):
    from lxml import html as lh
    slug = row['url'].rsplit('/', 1)[-1]
    output = dict(row)
    output['checked_at'] = datetime.datetime.now(datetime.timezone.utc).isoformat()
    try:
        assert row['url'].startswith('https://myvox-9.com/pages/')
        for attempt in range(3):
            try:
                req = urllib.request.Request(row['url'], headers={'User-Agent':'Mozilla/5.0 MYVOX-Hero-Content-Audit'})
                with urllib.request.urlopen(req, timeout=45) as response:
                    content = response.read()
                    output.update(http_status=response.status, final_url=response.url)
                break
            except Exception:
                if attempt == 2:
                    raise
                time.sleep(1+attempt)
        (ROOT/'evidence'/f'{slug}.html').write_bytes(content)
        output['html_sha256'] = hashlib.sha256(content).hexdigest()
        tree = lh.fromstring(content)
        main = tree.xpath('//main')
        assert len(main) == 1, 'Expected one main'
        hero = main[0].xpath('.//section[contains(concat(" ",normalize-space(@class)," ")," hero ")]')
        assert hero, 'Hero section missing'
        hero = hero[0]
        output['hero_id'] = hero.get('id')
        output['actual'] = {}
        output['selectors'] = {'headline':'.hero__title', 'description':'.hero__description', 'cta':'.hero__button'}
        for field, cls in [('headline','hero__title'),('description','hero__description'),('cta','hero__button')]:
            found = hero.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," '+cls+' ")]')
            assert len(found) == 1, f'{cls}: found {len(found)} elements'
            output['actual'][field] = norm(''.join(found[0].itertext()))
            if field == 'cta':
                output['cta_svg_count'] = len(found[0].xpath('.//*[local-name()="svg"]'))
                output['cta_href'] = found[0].get('href')
        output['comparison'] = {}
        for field in ['headline','description','cta']:
            expected = norm(row['expected'][field])
            actual = output['actual'][field]
            if actual == expected:
                result = 'exact'
            elif field == 'cta' and expected.endswith(' →') and actual == expected[:-2] and output['cta_svg_count']:
                result = 'svg_arrow'
            else:
                result = 'mismatch'
            output['comparison'][field] = result
        output['status'] = 'mismatch' if 'mismatch' in output['comparison'].values() else 'match'
    except Exception as exc:
        output.update(status='unverified', error=str(exc))
    (ROOT/'evidence'/f'{slug}.json').write_text(json.dumps(output,ensure_ascii=False,indent=2))
    return output

def fetch():
    rows = json.loads((ROOT/'inputs.json').read_text())
    (ROOT/'evidence').mkdir(exist_ok=True)
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        for result in pool.map(fetch_one, rows):
            results.append(result)
            print(result['index'],result['angle'],result['url'].rsplit('/',1)[-1],result['status'],result.get('comparison',result.get('error')),flush=True)
    (ROOT/'results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
    print('TOTALS', {status:sum(r['status']==status for r in results) for status in ['match','mismatch','unverified']})

if __name__ == '__main__':
    {'extract':extract, 'fetch':fetch}[sys.argv[1]]()
