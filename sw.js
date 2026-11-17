const CACHE='bdmt-offline-rc3-a9eb4ce4c20197a3';
const FILES=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./build.json','./licenses.txt','./fonts/NotoSansJP-Regular.ttf','./fonts/OFL.txt','./fonts/SOURCE.txt'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',e=>e.waitUntil((async()=>{const keys=await caches.keys();const old=keys.filter(k=>k.startsWith('bdmt-offline-'));await Promise.all(old.filter(k=>k!==CACHE).slice(0,-1).map(k=>caches.delete(k)));await self.clients.claim();})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.open(CACHE).then(async c=>await c.match(e.request)||fetch(e.request)));});
// Waiting worker is activated only by a user requested reload, never during a save.
self.addEventListener('message',e=>{if(e.data==='ACTIVATE')self.skipWaiting();});
