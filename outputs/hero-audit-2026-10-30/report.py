import collections
import datetime
import html
import json
from pathlib import Path

root = Path(__file__).resolve().parent
rows = json.loads((root/'results.json').read_text())
assert len(rows) == len({r['url'] for r in rows}) == 80
assert all(r['http_status'] == 200 and r['final_url'] == r['url'] for r in rows)
assert all(r['comparison'] == {'headline':'exact','description':'exact','cta':'svg_arrow'} for r in rows)
e = html.escape
checked = datetime.datetime.fromisoformat(max(r['checked_at'] for r in rows)).astimezone(datetime.timezone(datetime.timedelta(hours=5)))
stamp = checked.strftime('%d.%m.%Y %H:%M') + ' (Asia/Qostanay, UTC+5)'
counts = collections.Counter(r['angle'] for r in rows)
summary = ''.join(f'<tr><td>{e(angle)}</td><td>{count}</td><td>{count}</td><td>0</td></tr>' for angle,count in counts.items())
details = []
for r in rows:
    comparison = []
    for field, label in [('headline','Заголовок'),('description','Описание'),('cta','Кнопка')]:
        note = 'Совпадает. Стрелка — SVG-иконка.' if field == 'cta' else 'Совпадает дословно.'
        comparison.append(f'<tr><th scope="row">{label}</th><td>{e(r["expected"][field])}</td><td>{e(r["actual"][field])}</td><td>{note}</td></tr>')
    details.append(f'''<details data-angle="{e(r['angle'])}"><summary><span>{r['index']:02d}. {e(r['angle'])} — {e(r['group'].split(' – ',1)[-1])}</span><span class="status">Соответствует</span></summary>
<div class="detail"><p><a href="{e(r['url'])}" target="_blank" rel="noopener">{e(r['url'])}</a></p><p class="meta">XLSX: строка {r['xlsx_row']}. DOCX: {e(r['group'])}. HTTP {r['http_status']}. Перенаправлений нет.</p>
<table class="comparison"><thead><tr><th>Поле</th><th>В DOCX</th><th>На странице</th><th>Результат</th></tr></thead><tbody>{''.join(comparison)}</tbody></table></div></details>''')
options = ''.join(f'<option value="{e(angle)}">{e(angle)}</option>' for angle in counts)
report = f'''<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>MYVOX-9 — проверка hero-блоков 80 страниц</title>
<style>*{{box-sizing:border-box}}body{{font:16px/1.6 system-ui,sans-serif;color:#18233b;background:#f5f7fa;margin:0}}main{{max-width:1280px;margin:auto;padding:40px 24px 80px}}h1{{font-size:32px;line-height:1.2;margin:0 0 20px}}h2{{font-size:23px;margin-top:32px}}p{{max-width:1050px}}.lead{{font-size:21px;font-weight:650}}.meta{{font-size:14px;color:#526077}}table{{border-collapse:collapse;background:white;width:100%;text-align:left}}th,td{{padding:12px 15px;border:1px solid #dce2ea;vertical-align:top}}thead th{{background:#e9eef5}}.overview-wrap{{overflow-x:auto}}.overview{{max-width:850px;min-width:620px}}.overview th,.overview td{{white-space:nowrap}}.toolbar{{display:flex;gap:12px;flex-wrap:wrap;margin:24px 0}}label{{display:flex;gap:10px;align-items:center}}select,input,button{{font:inherit;padding:8px 12px;border:1px solid #a9b5c5;border-radius:6px;background:white;color:inherit}}input{{width:min(100%,340px)}}button{{cursor:pointer}}details{{background:white;border:1px solid #dce2ea;border-radius:8px;margin:10px 0}}summary{{padding:15px 18px;cursor:pointer;display:flex;gap:15px;align-items:center;justify-content:space-between}}summary>span:first-child{{font-weight:600}}.status{{font-size:14px;color:#17633f;white-space:nowrap}}.detail{{padding:0 18px 20px;overflow-x:auto}}.comparison{{table-layout:fixed;min-width:760px}}.comparison th:first-child{{width:13%}}.comparison th:nth-child(2),.comparison th:nth-child(3){{width:35%}}.comparison th:nth-child(4){{width:17%}}td{{overflow-wrap:anywhere}}a{{color:#2455a4;overflow-wrap:anywhere}}[hidden]{{display:none!important}}@media(max-width:650px){{main{{padding:24px 16px}}h1{{font-size:27px}}summary{{align-items:flex-start;flex-direction:column;gap:4px}}.overview{{font-size:14px}}th,td{{padding:10px}}}}@media print{{body{{background:white}}.toolbar{{display:none}}main{{padding:0}}details{{break-inside:avoid}}}}</style>
<main><h1>MYVOX-9 — проверка hero-блоков 80 страниц</h1><p class="lead">Все 80 страниц соответствуют документу. Расхождений в заголовках, описаниях и словах на кнопках не найдено.</p><p class="meta">Проверено: {stamp}. Все 80 уникальных URL открылись с HTTP 200 без перенаправлений.</p>
<p>На каждой странице проверен первый hero-блок внутри основного содержимого: заголовок, описание и основная кнопка. Все 80 вариантов DOCX сопоставлены со строками XLSX по порядку и полному названию HERO / GROUP. Совпадение всех названий проверено.</p>
<p><strong>Единственное отличие в представлении:</strong> во всех 80 CTA документ заканчивается символом «→», а на сайте после того же текста стоит отдельная SVG-иконка стрелки. Это учтено как соответствие текста. Заголовки и описания совпадают дословно, включая регистр и пунктуацию.</p>
<p class="meta">Метод: тексты извлечены из опубликованного HTML каждой страницы, HTML-сущности декодированы, последовательности пробелов и переносы строк сведены к одному пробелу. Слова, регистр, апострофы и тире не заменялись. Проверка касается текстов hero-блоков на момент загрузки страниц.</p>
<h2>Результат по темам</h2><div class="overview-wrap"><table class="overview"><thead><tr><th>Тема</th><th>Страниц</th><th>Соответствуют</th><th>Расхождений</th></tr></thead><tbody>{summary}<tr><th>Всего</th><th>80</th><th>80</th><th>0</th></tr></tbody></table></div>
<h2>Сравнение по каждой странице</h2><p>Раскройте строку, чтобы увидеть исходный и опубликованный текст рядом.</p><div class="toolbar"><label>Тема <select id="angle"><option value="">Все темы</option>{options}</select></label><label>Поиск <input id="search" type="search" placeholder="Название или часть URL"></label><button id="expand" type="button">Раскрыть все</button><button id="collapse" type="button">Свернуть все</button></div><p id="count" class="meta">Показано: 80 из 80</p>{''.join(details)}
<h2>Источники</h2><p>Список страниц: MYVOX-9 LP URLs.xlsx, строки 2–81.<br>Эталонные тексты: MYVOX-9 Hero Blocks.docx, все 80 вариантов HERO.<br>Опубликованные страницы: прямые ссылки приведены в каждой строке выше.</p></main>
<script>const items=[...document.querySelectorAll('details')];const angle=document.querySelector('#angle');const search=document.querySelector('#search');function filter(){{let n=0;for(const item of items){{item.hidden=!!((angle.value&&item.dataset.angle!==angle.value)||(search.value&&!item.textContent.toLowerCase().includes(search.value.toLowerCase())));if(!item.hidden)n++}}document.querySelector('#count').textContent=`Показано: ${{n}} из 80`}}angle.addEventListener('change',filter);search.addEventListener('input',filter);document.querySelector('#expand').addEventListener('click',()=>items.filter(x=>!x.hidden).forEach(x=>x.open=true));document.querySelector('#collapse').addEventListener('click',()=>items.forEach(x=>x.open=false));</script></html>'''
(root/'MYVOX-9 Hero Audit.html').write_text(report)
print('HTML report saved:',root/'MYVOX-9 Hero Audit.html')
print('Checked:',stamp)
print('Summary:',dict(counts))
