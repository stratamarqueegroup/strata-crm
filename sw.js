// Strata Marquee CRM — keeps the app itself available offline.
// Your data is never cached here: leads live in IndexedDB on the device and in Firestore.
const VERSION = "strata-crm-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png",
  "https://cdn.jsdelivr.net/npm/dexie@4.4.6/dist/dexie.min.js",
  "https://cdn.jsdelivr.net/npm/papaparse@5.5.3/papaparse.min.js",
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth-compat.js",
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore-compat.js"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  // never touch Firebase traffic (sign-in, database)
  if (/googleapis\.com$|firebaseapp\.com$|firebaseio\.com$|identitytoolkit|securetoken/.test(url.hostname)) return;
  const isPage = req.mode === "navigate" || url.pathname.endsWith("/index.html");
  if (isPage){
    // the app page: newest when online, saved copy when offline
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(ca => ca.put("./index.html", c)); return r; }).catch(() => caches.match("./index.html")));
    return;
  }
  const cacheable = url.origin === location.origin || /cdn\.jsdelivr\.net|www\.gstatic\.com|fonts\.(googleapis|gstatic)\.com/.test(url.hostname);
  if (!cacheable) return;
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(VERSION).then(ca => ca.put(req, c)); } return r; })));
});
