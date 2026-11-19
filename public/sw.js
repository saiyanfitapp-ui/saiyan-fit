// Service worker: l'app si apre anche offline (ultima versione salvata).
const C = 'saiyan-fit-v3';
const SHELL = ['/', '/app.js?v=3', '/sf.js', '/manifest.webmanifest', '/icons/icon-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || u.pathname.startsWith('/api/') || u.pathname.startsWith('/auth/')) return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok && r.type === 'basic') { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); } return r; }).catch(() => caches.match(e.request)));
});
