const cacheName = 'biblio' + '1.1';

self.addEventListener('install', (evt) => {
    console.log(`sw installé à ${new Date().toLocaleTimeString()}`);
    const cachePromise = caches.open(cacheName).then(cache => {
        return cache.addAll([
            'index.html',
            'main.js',
            'style.css',
            'vendors/bootstrap.min.css',
            'add_book.html',
            'add_book.js',
            'contact.html',
            'contact.js',
        ])
        .then(console.log('cache initialisé'))
        .catch(console.err);
    });

    evt.waitUntil(cachePromise);
});

self.addEventListener('activate', (evt) => {
    console.log(`sw activé à ${new Date().toLocaleTimeString()}`);    
});

/* self.addEventListener('fetch', (evt) => {
    console.log('fetch sur url', evt.request.url);
});

self.addEventListener('fetch', (evt) => {
    if(!navigator.onLine) {
        const headers = { headers: { 'Content-Type': 'text/html;charset=utf-8'} };
        evt.respondWith(new Response('<h1>Pas de connexion internet</h1><div>Apllication en mode dégradé. Veuillez vous connecter</div>', headers));
    }
    console.log('sw intercepte la requête suivante via fetch', evt);
    console.log('url interceptée', evt.request.url);
});     */
/* self.addEventListener('fetch', (evt) => {
    console.log('sw intercepte la requête suivante via fetch', evt);
    console.log('url interceptée', evt.request.url);
});  */
// self.addEventListener('fetch', (evt) => {
    //     if(!navigator.onLine) {
    //         const headers = { headers: { 'Content-Type': 'text/html;charset=utf-8'} };
    //         evt.respondWith(new Response('<h1>Pas de connexion internet</h1><div>Apllication en mode dégradé. Veuillez vous connecter</div>', headers));
    //     }
    
    //     // always serving css from the cache
    //     if(evt.request.url.includes('css')) {
    //         caches.open(cacheName).then(cache => {
    //             console.log('servi depuis le cache', evt.request.url);
    //             cache.match(evt.request);
    //         })
    //     } else {
    //         console.log('fetch request passée à internet', evt.request.url);
    //         evt.respondWith(fetch(evt.request));
    //     } 
    // });
    
    // network first strategy
/*     self.addEventListener('fetch', evt => {
        evt.respondWith(
            fetch(evt.request).then( res => {
                // we add the latest version into the cache
                caches.open(cacheName).then(cache => cache.put(evt.request, res));
                // we clone it as a response can be read only once (it's like a one time read stream)
                return res.clone();
            })
            .catch(err => caches.match(evt.request))
        );
    }); */