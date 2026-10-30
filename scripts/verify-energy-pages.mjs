import { readFile, writeFile } from 'node:fs/promises';

const categoryKey = process.argv[2] || 'energy';
if (!['energy', 'the-drawer-dump', 'focus', 'immunity', 'gut', 'vitality', 'nature', 'one'].includes(categoryKey)) throw new Error('Неизвестная категория лендингов.');
const outputDir = new URL(`../outputs/${categoryKey}-landings/`, import.meta.url);
const results = JSON.parse(await readFile(new URL(`${categoryKey}-pages-results.json`, outputDir), 'utf8'));
const plan = JSON.parse(await readFile(new URL(`${categoryKey}-pages-plan.json`, outputDir), 'utf8'));
const decode = (value) => value.replace(/&(?:#(\d+)|#x([a-f0-9]+)|(amp|lt|gt|quot|apos|nbsp));/gi,
  (_, decimal, hex, named) => decimal ? String.fromCodePoint(Number(decimal)) : hex ? String.fromCodePoint(parseInt(hex, 16)) : ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' })[named.toLowerCase()]);
const plain = (value = '') => decode(value.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const checks = [];
for (const page of results.pages) {
  const expected = plan.pages.find((entry) => entry.hero_number === page.hero_number);
  const response = await fetch(page.url, { signal: AbortSignal.timeout(30000), headers: { 'Cache-Control': 'no-cache' } });
  const html = await response.text();
  const heading = html.match(/<h1\b[^>]*class="[^"]*hero__title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '';
  const description = html.match(/<p\b[^>]*class="[^"]*hero__description[^"]*"[^>]*>([\s\S]*?)<\/p>/i)?.[1] || '';
  const button = html.match(/<a\b[^>]*class="[^"]*hero__button[^"]*"[^>]*>([\s\S]*?)<\/a>/i)?.[1] || '';
  const actualHighlight = [...heading.matchAll(/<span\b[^>]*>([\s\S]*?)<\/span>/gi)].map((match) => plain(match[1]));
  const expectedHeading = expected.metafields[0].value.replace('[[', '').replace(']]', '');
  const check = {
    url: page.url,
    status: response.status,
    heading_matches: plain(heading) === plain(expectedHeading),
    description_matches: plain(description) === plain(expected.metafields[1].value),
    button_matches: plain(button) === plain(expected.metafields[2].value),
    highlight_matches: actualHighlight.length === 1 && actualHighlight[0] === expected.highlight,
    actual_heading: plain(heading),
    actual_highlight: actualHighlight,
  };
  check.passed = response.ok && check.heading_matches && check.description_matches && check.button_matches && check.highlight_matches;
  checks.push(check);
  console.log(`${check.passed ? 'PASS' : 'FAIL'} ${page.url}`);
}
await writeFile(new URL(`${categoryKey}-storefront-checks.json`, outputDir), JSON.stringify(checks, null, 2) + '\n');
if (checks.every((check) => check.passed)) {
  results.status = 'verified_on_storefront';
  for (const page of results.pages) page.status = 'verified_on_storefront';
  await writeFile(new URL(`${categoryKey}-pages-results.json`, outputDir), JSON.stringify(results, null, 2) + '\n');
} else process.exitCode = 1;
