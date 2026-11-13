// Bei jeder Änderung an der Website VERSION erhöhen
const VERSION='advent-v2';
const DATEIEN=["./","index.html","anleitung.html","geschichte.html","style.css","geschichten.js","manifest.webmanifest","fonts/Adventsrund-Regular.otf","fonts/nunito-0.woff2","fonts/nunito-1.woff2","bilder/apple-touch-icon.png","bilder/favicon-32.png","bilder/icon-192.png","bilder/icon-512.png","bilder/icon-maskable-512.png","bilder/plakat-a2.png","motive/01-Stern.svg","motive/02-Kugel-rot.svg","motive/03-Lebkuchenmann.svg","motive/04-Schneeflocke.svg","motive/05-Nikolaus.svg","motive/06-Glocke.svg","motive/07-Nuss.svg","motive/08-Spielzeugzug.svg","motive/09-Geschenk.svg","motive/10-Pinguin.svg","motive/11-Zuckerstange.svg","motive/12-Plaetzchen.svg","motive/13-Orangenscheibe.svg","motive/14-Herz.svg","motive/15-Rentier.svg","motive/16-Kerze.svg","motive/17-Nikolausstiefel.svg","motive/18-Eule.svg","motive/19-Teddy.svg","motive/20-Rotkehlchen.svg","motive/21-Tannenzapfen.svg","motive/22-Handschuh.svg","motive/23-Schneemann.svg","motive/24-Stechpalme.svg"];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(VERSION).then(c=>c.addAll(DATEIEN)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{
    const net=fetch(e.request).then(r=>{if(r.ok){const k=r.clone();caches.open(VERSION).then(c=>c.put(e.request.url.split('?')[0],k));}return r;});
    return hit?(net.catch(()=>{}),hit):net;}))});
