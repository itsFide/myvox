import { createServer } from 'node:http';
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { writeFile, rename } from 'node:fs/promises';
import { loadEnvFile } from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

export const callbackUrl = 'http://localhost:8787/shopify/callback';
const store = 'uhgmmm-ef.myshopify.com';
const tokenFile = new URL('../.shopify-pages-token.local.json', import.meta.url);
const allowedShops = new Set([store, 'myvox-9.myshopify.com']);

function equal(left, right) {
  const a = Buffer.from(left || '');
  const b = Buffer.from(right || '');
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Validate Shopify's signed callback and the browser's one-time state. */
export function validateCallback(params, cookie, state, secret, now = Date.now()) {
  const keys = [...params.keys()];
  if (new Set(keys).size !== keys.length) return false;
  if (!allowedShops.has(params.get('shop'))) return false;
  if (!equal(params.get('state'), state)) return false;
  const browserState = cookie?.split(';').map((part) => part.trim())
    .find((part) => part.startsWith('myvox_oauth_state='))?.slice('myvox_oauth_state='.length);
  if (!equal(browserState, state)) return false;
  if (!params.get('code') || !/^\d+$/.test(params.get('timestamp') || '')) return false;
  if (Math.abs(now / 1000 - Number(params.get('timestamp'))) > 600) return false;
  const received = params.get('hmac') || '';
  if (!/^[a-f0-9]{64}$/.test(received)) return false;
  const message = [...params.entries()].filter(([key]) => key !== 'hmac' && key !== 'signature')
    .sort(([a], [b]) => a.localeCompare(b, 'en'))
    .map(([key, value]) => `${key}=${value}`).join('&');
  return equal(received, createHmac('sha256', secret).update(message).digest('hex'));
}

async function main() {
  if (process.argv[2] !== '--start' || process.argv.length !== 3) {
    console.log('Запуск OAuth: node scripts/shopify-pages-oauth.mjs --start');
    console.log(`Разрешенный redirect URL в версии приложения: ${callbackUrl}`);
    return;
  }
  loadEnvFile(fileURLToPath(new URL('../.env.shopify-pages.local', import.meta.url)));
  const clientId = process.env.SHOPIFY_CLIENT_ID?.trim();
  const secret = process.env.SHOPIFY_CLIENT_SECRET?.trim();
  if (![clientId, secret].every((value) => value && !value.startsWith('PUT_'))) {
    throw new Error('Заполни реквизиты в .env.shopify-pages.local.');
  }
  const state = randomBytes(32).toString('hex');
  let exchanging = false;
  let completed = false;
  const server = createServer(async (request, response) => {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('Referrer-Policy', 'no-referrer');
    response.setHeader('Content-Type', 'text/plain; charset=utf-8');
    const reply = (status, text) => { response.writeHead(status); response.end(text); };
    if (request.method !== 'GET' || !['localhost:8787', '127.0.0.1:8787'].includes(request.headers.host)) {
      reply(400, 'Invalid local request.');
      return;
    }
    const url = new URL(request.url, 'http://localhost:8787');
    if (url.pathname === '/shopify/start' && !completed) {
      const authUrl = new URL(`https://${store}/admin/oauth/authorize`);
      authUrl.search = new URLSearchParams({
        client_id: clientId,
        scope: 'write_online_store_pages',
        redirect_uri: callbackUrl,
        state,
      }).toString();
      response.setHeader('Set-Cookie', `myvox_oauth_state=${state}; HttpOnly; SameSite=Lax; Path=/shopify; Max-Age=1200`);
      response.writeHead(302, { Location: authUrl.href });
      response.end();
      return;
    }
    if (url.pathname === '/shopify/done' && completed) {
      reply(200, 'Shopify подключен. Можно вернуться в чат; токен сохранен только локально.');
      clearTimeout(timeout);
      server.close();
      return;
    }
    if (url.pathname !== '/shopify/callback') { reply(404, 'Not found.'); return; }
    if (completed || exchanging || !validateCallback(url.searchParams, request.headers.cookie, state, secret)) {
      reply(403, 'Callback verification failed. Restart authorization from /shopify/start.');
      return;
    }
    exchanging = true;
    try {
      const result = await fetch(`https://${store}/admin/oauth/access_token`, {
        method: 'POST',
        redirect: 'error',
        signal: AbortSignal.timeout(30000),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
        body: new URLSearchParams({ client_id: clientId, client_secret: secret, code: url.searchParams.get('code'), expiring: '1' }),
      });
      if (!result.ok) throw new Error(`Shopify token exchange failed (HTTP ${result.status}). Restart authorization.`);
      const token = await result.json();
      const scopes = new Set(String(token.scope || '').split(',').map((item) => item.trim()));
      if (!token.access_token || !token.expires_in || !token.refresh_token) {
        throw new Error('Shopify did not return the requested expiring offline token.');
      }
      if (!scopes.has('write_online_store_pages') && !scopes.has('write_content')) {
        throw new Error('The installed app does not have page write access.');
      }
      const saved = {
        store,
        ...token,
        expires_at: new Date(Date.now() + Number(token.expires_in) * 1000).toISOString(),
      };
      const temporary = new URL('../.shopify-pages-token.local.json.tmp', import.meta.url);
      await writeFile(temporary, JSON.stringify(saved), { mode: 0o600, flag: 'wx' });
      await rename(temporary, tokenFile);
      completed = true;
      response.setHeader('Set-Cookie', 'myvox_oauth_state=; HttpOnly; SameSite=Lax; Path=/shopify; Max-Age=0');
      response.writeHead(302, { Location: '/shopify/done' });
      response.end();
      console.log('OAuth выполнен. Доступ к страницам подтвержден; токен сохранен локально и не выводится.');
    } catch (error) {
      reply(502, 'Authorization could not be completed. Return to the chat.');
      console.error(error instanceof SyntaxError ? 'Unexpected Shopify token response.' : error.message);
    } finally {
      exchanging = false;
    }
  });
  const timeout = setTimeout(() => {
    console.log('Время ожидания OAuth истекло.');
    server.close();
  }, 20 * 60 * 1000);
  server.once('error', (error) => {
    clearTimeout(timeout);
    console.error(error.code === 'EADDRINUSE' ? 'Порт 8787 уже занят.' : 'Не удалось запустить локальный OAuth.');
    process.exitCode = 1;
  });
  server.listen(8787, '127.0.0.1', () => {
    console.log(`Callback URL: ${callbackUrl}`);
    console.log('Открыть в браузере: http://localhost:8787/shopify/start');
  });
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  main().catch(() => { console.error('Не удалось подготовить OAuth; проверь локальный файл реквизитов.'); process.exitCode = 1; });
}
