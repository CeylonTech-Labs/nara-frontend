// Run against an existing local Next server and a Chrome debugging endpoint.
// Example: QA_ORIGIN=http://localhost:3000 QA_CDP_PORT=9228 node scripts/responsive-smoke.mjs
import fs from 'node:fs/promises';
const origin = process.env.QA_ORIGIN ?? 'http://localhost:3000';
const port = process.env.QA_CDP_PORT ?? '9228';
const tabs = await fetch(`http://127.0.0.1:${port}/json`).then(r => r.json());
const tab = tabs.find(t => t.type === 'page');
if (!tab) throw new Error('Open a local Chrome debugging session first.');
const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
let id = 0;
const pending = new Map();
let loadResolve;
ws.onmessage = ({ data }) => { const m = JSON.parse(data); if (m.id) { const p = pending.get(m.id); pending.delete(m.id); if (m.error) p.reject(new Error(m.error.message)); else p.resolve(m.result); } else if (m.method === "Page.loadEventFired") loadResolve?.(); };
function send(method, params = {}) { return new Promise((resolve, reject) => { const request = ++id; pending.set(request, { resolve, reject }); ws.send(JSON.stringify({ id: request, method, params })); }); }
async function evaluate(expression) { const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails)); return r.result.value; }
await send('Page.enable');
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
const results = [];
try {
 for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  await send('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: false });
  for (const path of ['/', '/hair-care', '/skin-care', '/products/hair-oil', '/products/rosemary-oil', '/products/shampoo', '/contact', '/about', '/cart', '/checkout']) {
   const loaded = new Promise(resolve => { loadResolve = resolve; });
   await send('Page.navigate', { url: origin + path });
   await loaded;
   loadResolve = undefined;
   // Wait for navigation, hydration, fonts, and visible image loading.
   for (let attempt = 0; attempt < 100; attempt++) {
    const ready = await evaluate(`location.pathname === ${JSON.stringify(path)} && document.readyState === 'complete' && !!document.querySelector('h1')`);
    if (ready) break;
    await new Promise(resolve => setTimeout(resolve, 100));
   }
   await evaluate(`(async () => { await document.fonts.ready; await Promise.all([...document.images].filter(i => i.loading !== 'lazy').map(i => i.decode().catch(() => {}))); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); })()`);
   const result = await evaluate(`({ path: location.pathname, viewport: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, h1: document.querySelectorAll('h1').length, overflow: [...document.querySelectorAll('main *, header *')].filter(e => { const r=e.getBoundingClientRect(); return r.width && (r.right > innerWidth + 1 || r.left < -1); }).slice(0,6).map(e=>({tag:e.tagName, class:e.className})), brokenImages: [...document.images].filter(i=>i.complete && i.naturalWidth===0).map(i=>i.alt) })`);
   if (result.scrollWidth > result.viewport || result.h1 !== 1 || result.brokenImages.length) throw new Error(JSON.stringify({width,...result}));
   results.push({width, path, overflow: result.scrollWidth > result.viewport, brokenImages: result.brokenImages.length});
   if (path === '/') {
    // Reduced motion must expose below-the-fold reveals, including SSR hydration.
    const hidden = await evaluate(`(async () => { let hidden; for (let i = 0; i < 50; i++) { hidden = [...document.querySelectorAll('.signature-grid > div, .collections .grid-two > div, .ingredient-circles > div, .ingredient-lists > div')].filter(e => Number(getComputedStyle(e).opacity) < 1).length; if (!hidden) return 0; await new Promise(r => setTimeout(r, 100)); } return hidden; })()`);
    if (hidden) throw new Error(`Reduced-motion content hidden: ${hidden} sections at ${width}px`);
    const clean = await evaluate(`document.querySelectorAll(".ingredient-circle img").length === 12 && [...document.querySelectorAll(".hero-bottle")].every(e => { const s = getComputedStyle(e); return s.backgroundColor === "rgba(0, 0, 0, 0)" && s.borderTopWidth === "0px"; }) && document.querySelector("footer").textContent.includes("Powered by CeylonTech Labs")`);
    if (!clean) throw new Error("Ingredient gallery, clean bottle frames or footer credit failed");
   }
   if (path === '/' && (width === 360 || width === 1440)) {
    await fs.mkdir('.qa', {recursive:true});
    const {data} = await send('Page.captureScreenshot', {format:'png'});
    await fs.writeFile(`.qa/home-${width}.png`,Buffer.from(data,'base64'));
    await evaluate(`document.querySelector("#ingredients").scrollIntoView();`);
    await evaluate(`new Promise(r => setTimeout(r, 400))`);
    const ingredientsShot = await send("Page.captureScreenshot", {format: "png"});
    await fs.writeFile(`.qa/ingredients-${width}.png`,Buffer.from(ingredientsShot.data, "base64"));
    await evaluate(`window.scrollTo(0,0)`);
   }
   if (path === '/' && width === 360) {
    await evaluate(`document.querySelector('[aria-label="Open navigation"]').click()`);
    if (!await evaluate(`!!document.querySelector('.navigation-dialog[open]')`)) throw new Error('Mobile menu did not open');
    await send('Input.dispatchKeyEvent', {type:'keyDown', key:'Escape', code:'Escape', windowsVirtualKeyCode:27});
    await send('Input.dispatchKeyEvent', {type:'keyUp', key:'Escape', code:'Escape', windowsVirtualKeyCode:27});
    if (await evaluate(`!!document.querySelector('.navigation-dialog[open]')`)) throw new Error('Escape did not close menu');
    await evaluate(`document.querySelector('[aria-label="Search products"]').click()`);
    if (!await evaluate(`document.activeElement?.id === 'product-search' || !!document.activeElement?.closest('.search-dialog')`)) throw new Error('Search focus escaped the dialog');
    await evaluate(`document.querySelector('.search-dialog').close()`);
   }
  }
 }
 await fs.mkdir('.qa',{recursive:true});
 await fs.writeFile('.qa/responsive-results.json',JSON.stringify(results,null,2));
 console.log(`Passed ${results.length} route/viewport smoke checks; mobile dialog Escape and search focus passed.`);
} finally { ws.close(); }
