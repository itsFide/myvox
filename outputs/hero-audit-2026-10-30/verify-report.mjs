import { chromium } from '/Users/sergey/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'node:url';
const browser = await chromium.launch({headless:true,channel:'chrome'});
try {
  const page = await browser.newPage({viewport:{width:1440,height:1100}});
  await page.goto(new URL('./MYVOX-9 Hero Audit.html',import.meta.url).href);
  if (await page.locator('details').count() !== 80) throw new Error('Missing rows');
  await page.selectOption('#angle','Energy');
  if (await page.locator('details:visible').count() !== 10) throw new Error('Topic filter');
  await page.selectOption('#angle','');
  await page.fill('#search','one-the-decisive-payoff');
  if (await page.locator('details:visible').count() !== 1) throw new Error('URL search');
  await page.fill('#search','');
  await page.click('#expand');
  if (await page.locator('details[open]').count() !== 80) throw new Error('Expand');
  await page.click('#collapse');
  await page.locator('details').first().locator('summary').click();
  await page.screenshot({path:fileURLToPath(new URL('./report-desktop.png',import.meta.url)),fullPage:false});
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(() => window.scrollTo(0,0));
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error('Mobile page overflow');
  await page.screenshot({path:fileURLToPath(new URL('./report-mobile.png',import.meta.url)),fullPage:false});
  console.log('Report verified: 80 rows, 8 topics, topic filter, URL search, expand/collapse. Screenshots saved.');
} finally { await browser.close(); }
