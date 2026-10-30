import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const tokenFile = new URL('../.shopify-pages-token.local.json', import.meta.url);
const apiVersion = '2026-10';
const allowedStores = new Set(['uhgmmm-ef.myshopify.com', 'myvox-9.myshopify.com']);

export function selectPage(pages, entry) {
  const handles = entry.existing_page_lookup_handles || [entry.handle];
  const matches = pages.filter((page) => handles.includes(page.handle));
  if (matches.length > 1) throw new Error(`Найдено несколько страниц для ${entry.handle}; автоматический выбор остановлен.`);
  const page = matches[0];
  if (page && page.templateSuffix !== entry.template_suffix) {
    throw new Error(`Страница ${page.handle} использует другой шаблон: ${page.templateSuffix}.`);
  }
  return page;
}

export function verifyPage(page, entry, published = false) {
  if (!page || page.templateSuffix !== entry.template_suffix || (published && !page.isPublished)) {
    throw new Error(`Не подтверждены шаблон/публикация ${entry.handle}.`);
  }
  const aliases = { hero_heading: 'heading', hero_description: 'description', hero_button_text: 'button' };
  for (const field of entry.metafields) {
    const actual = page[aliases[field.key]];
    if (actual?.value !== field.value || actual.type !== field.type) {
      throw new Error(`Метаполе ${page.handle}/${field.key} не совпадает с планом.`);
    }
  }
}

export async function main(mode, categoryKey = 'energy') {
  const category = { energy: 'Energy', 'the-drawer-dump': 'The Drawer Dump', focus: 'Focus', immunity: 'Immunity', gut: 'Gut', vitality: 'Vitality', nature: 'Nature Build It First', one: 'If I Could Only Keep One' }[categoryKey];
  if (!category) throw new Error('Неизвестная категория лендингов.');
  const outputDir = new URL(`../outputs/${categoryKey}-landings/`, import.meta.url);
  const planFile = new URL(`${categoryKey}-pages-plan.json`, outputDir);
  const resultsFile = new URL(`${categoryKey}-pages-results.json`, outputDir);
  if (!['--inspect', '--apply'].includes(mode)) {
    console.log('Проверка: node scripts/shopify-energy-pages.mjs --inspect [energy|the-drawer-dump|focus|immunity|gut|vitality|nature|one]');
    console.log('Импорт: node scripts/shopify-energy-pages.mjs --apply [energy|the-drawer-dump|focus|immunity|gut|vitality|nature|one]');
    return;
  }
  const token = JSON.parse(await readFile(tokenFile, 'utf8'));
  if (!allowedStores.has(token.store) || !token.access_token || !Number.isFinite(Date.parse(token.expires_at)) || Date.parse(token.expires_at) <= Date.now()) {
    throw new Error('OAuth-токен отсутствует, истек или относится к другому магазину.');
  }
  const plan = JSON.parse(await readFile(planFile, 'utf8'));
  if (plan.category !== category || plan.pages.length !== 10 || new Set(plan.pages.map((p) => p.handle)).size !== 10 || plan.pages.some((p) => !p.handle.startsWith(`${categoryKey}-`))) {
    throw new Error(`Ожидался проверенный план из 10 уникальных страниц ${category}.`);
  }
  const document = await readFile(new URL('./shopify-energy-pages.graphql', import.meta.url), 'utf8');
  async function graphql(operationName, variables = {}) {
    const response = await fetch(`https://${token.store}/admin/api/${apiVersion}/graphql.json`, {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(30000),
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': token.access_token },
      body: JSON.stringify({ query: document, operationName, variables }),
    });
    if (!response.ok) throw new Error(`${operationName}: Shopify HTTP ${response.status}.`);
    const body = await response.json();
    if (body.errors?.length) throw new Error(`${operationName}: ${body.errors.map((e) => e.message).join('; ')}`);
    if (!body.data) throw new Error(`${operationName}: Shopify не вернул данные.`);
    return body.data;
  }
  async function collect(operation, key) {
    const all = [];
    let after = null;
    do {
      const connection = (await graphql(operation, { after }))[key];
      all.push(...connection.nodes);
      if (!connection.pageInfo.hasNextPage) return all;
      if (!connection.pageInfo.endCursor || connection.pageInfo.endCursor === after) throw new Error('Некорректный курсор Shopify.');
      after = connection.pageInfo.endCursor;
    } while (true);
  }
  function mutationResult(data, key) {
    const payload = data[key];
    if (!payload || payload.userErrors?.length) {
      throw new Error(`${key}: ${payload?.userErrors?.map((e) => e.message).join('; ') || 'нет результата'}`);
    }
    return payload;
  }
  const shop = (await graphql('EnergyShop')).shop;
  if (!allowedStores.has(shop.myshopifyDomain)) throw new Error('Shopify вернул другой магазин.');
  const pages = await collect('EnergyPages', 'pages');
  const definitions = await collect('EnergyDefinitions', 'metafieldDefinitions');
  for (const field of plan.pages[0].metafields) {
    const definition = definitions.find((d) => d.namespace === field.namespace && d.key === field.key);
    if (definition?.type.name !== field.type) throw new Error(`Не подтверждено определение ${field.namespace}.${field.key} типа ${field.type}.`);
  }
  const existing = plan.pages.map((entry) => selectPage(pages, entry));
  if (categoryKey === 'energy' && !existing[0]) throw new Error('Существующая страница Mornings не найдена; импорт остановлен, чтобы не создать дубль.');
  console.log(`Магазин: ${shop.name} (${shop.myshopifyDomain}); сайт ${shop.primaryDomain.url}`);
  for (let i = 0; i < plan.pages.length; i++) console.log(`${existing[i] ? 'Обновить' : 'Создать'}: ${plan.pages[i].handle}${existing[i] ? ` [${existing[i].id}]` : ''}`);
  if (mode === '--inspect') return;

  await mkdir(outputDir, { recursive: true });
  const backupFile = new URL(`${categoryKey}-pages-before-${new Date().toISOString().replace(/[:.]/g, '-')}.json`, outputDir);
  await writeFile(backupFile, JSON.stringify({ shop, pages: existing.filter(Boolean) }, null, 2) + '\n', { flag: 'wx' });
  const results = { status: 'in_progress', category, shop, source_document: plan.source_document, source_workbook: plan.source_workbook, pages: [] };
  const save = () => writeFile(resultsFile, JSON.stringify(results, null, 2) + '\n');
  await save();
  for (let i = 0; i < plan.pages.length; i++) {
    const entry = plan.pages[i];
    let page = existing[i];
    const created = !page;
    if (!page) {
      const input = { title: entry.page_title, handle: entry.handle, templateSuffix: entry.template_suffix, isPublished: false };
      page = mutationResult(await graphql('EnergyCreatePage', { page: input }), 'pageCreate').page;
      if (page.handle !== entry.handle) throw new Error(`Shopify изменил запрошенный URL ${entry.handle} на ${page.handle}; импорт остановлен.`);
      pages.push(page);
    }
    const result = { hero_number: entry.hero_number, group_label: entry.group_label, page_id: page.id, handle: page.handle, created, worksheet: entry.worksheet, url_cell: entry.url_cell, status: 'setting_content' };
    results.pages.push(result);
    await save();
    mutationResult(await graphql('EnergySetMetafields', { metafields: entry.metafields.map((field) => ({ ...field, ownerId: page.id })) }), 'metafieldsSet');
    page = (await graphql('EnergyPage', { id: page.id })).page;
    verifyPage(page, entry);
    if (!page.isPublished) page = mutationResult(await graphql('EnergyUpdatePage', { id: page.id, page: { isPublished: true } }), 'pageUpdate').page;
    verifyPage(page, entry, true);
    result.url = new URL(`/pages/${page.handle}`, shop.primaryDomain.url).href;
    result.status = 'verified_in_admin_api';
    await save();
    console.log(`Готово ${i + 1}/10: ${result.url}`);
  }
  results.status = 'verified_in_admin_api';
  results.completed_at = new Date().toISOString();
  await save();
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  main(process.argv[2], process.argv[3]).catch((error) => { console.error(error.message); process.exitCode = 1; });
}
