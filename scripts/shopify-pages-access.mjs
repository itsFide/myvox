import { readFile } from 'node:fs/promises';
import { loadEnvFile } from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const credentialsFile = new URL('../.env.shopify-pages.local', import.meta.url);
const expectedStore = 'myvox-9.myshopify.com';
const allowedStores = new Set([expectedStore, 'uhgmmm-ef.myshopify.com']);

/** Check this installed app's page permissions without returning its access token. */
export async function checkAccess({ clientId, clientSecret, store, accessToken }, fetchImpl = fetch) {
  if (!allowedStores.has(store)) {
    throw new Error(`Ожидался магазин ${expectedStore}.`);
  }
  if (!accessToken && ![clientId, clientSecret].every((value) => value && !value.startsWith('PUT_'))) {
    throw new Error('Заполни SHOPIFY_CLIENT_ID и SHOPIFY_CLIENT_SECRET в .env.shopify-pages.local.');
  }

  if (!accessToken) {
    const authResponse = await fetchImpl(`https://${store}/admin/oauth/access_token`, {
      method: 'POST',
      redirect: 'error',
      signal: AbortSignal.timeout(30_000),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });
    if (!authResponse.ok) {
      const failure = await authResponse.json().catch(() => ({}));
      if (failure.error === 'shop_not_permitted') {
        throw new Error('shop_not_permitted: для этого приложения и магазина нужен OAuth через браузер.');
      }
      throw new Error(`Shopify отклонил авторизацию (HTTP ${authResponse.status}). Проверь реквизиты и установку приложения.`);
    }
    const auth = await authResponse.json();
    if (typeof auth.access_token !== 'string' || !auth.access_token) {
      throw new Error('Shopify не вернул access token.');
    }
    accessToken = auth.access_token;
  }

  const scopesResponse = await fetchImpl(`https://${store}/admin/oauth/access_scopes.json`, {
    redirect: 'error',
    signal: AbortSignal.timeout(30_000),
    headers: { 'X-Shopify-Access-Token': accessToken },
  });
  if (!scopesResponse.ok) {
    throw new Error(`Не удалось проверить права приложения (HTTP ${scopesResponse.status}).`);
  }
  const { access_scopes: grantedScopes } = await scopesResponse.json();
  if (!Array.isArray(grantedScopes)) {
    throw new Error('Shopify вернул неожиданный ответ при проверке прав.');
  }
  const scopes = new Set(grantedScopes.map(({ handle }) => handle));
  if (!scopes.has('write_online_store_pages') && !scopes.has('write_content')) {
    throw new Error(
      'Приложению не выдано право write_online_store_pages. Добавь его в версию приложения, выпусти версию и подтверди обновленные права в магазине.'
    );
  }
  return { store, pageWriteAccess: true };
}

async function main() {
  if (process.argv[2] !== '--check' || process.argv.length !== 3) {
    console.log('Проверка доступа: node scripts/shopify-pages-access.mjs --check');
    console.log('Реквизиты: .env.shopify-pages.local. Страницы этой командой не изменяются.');
    return;
  }

  try {
    await readFile(credentialsFile, 'utf8');
    loadEnvFile(fileURLToPath(credentialsFile));
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('Не найден файл .env.shopify-pages.local.');
    }
    throw new Error('Не удалось прочитать .env.shopify-pages.local.');
  }
  let saved;
  try {
    saved = JSON.parse(await readFile(new URL('../.shopify-pages-token.local.json', import.meta.url), 'utf8'));
    if (typeof saved.access_token !== 'string' || !saved.access_token || !Number.isFinite(Date.parse(saved.expires_at)) || Date.parse(saved.expires_at) <= Date.now()) {
      throw new Error('Локальный OAuth-токен истек; повтори авторизацию.');
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw new Error('Локальный OAuth-токен недоступен или истек; повтори авторизацию.');
  }
  const report = await checkAccess({
    clientId: process.env.SHOPIFY_CLIENT_ID?.trim(),
    clientSecret: process.env.SHOPIFY_CLIENT_SECRET?.trim(),
    store: saved?.store || process.env.SHOPIFY_STORE?.trim(),
    accessToken: saved?.access_token,
  });
  console.log(`Авторизация успешна: ${report.store}. Доступ к записи страниц подтвержден.`);
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
