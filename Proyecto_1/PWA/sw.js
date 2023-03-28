const STATIC_CACHE = "static";

const APP_SHELL = [
    "/",
    "/index.html",
    "/Register.html",
    "/Dashboard.html",
    "graficas1.html",
    "graficas2.html",
    "graficas3.html",
    "/assets/css/animate.css",
    "/assets/css/dashboard.css",
    "/assets/css/flex-slider.css",
    "/assets/css/fontawesome.css",
    "assets/js/date.js",
    "/assets/css/filter.css",
    "/assets/css/owl.css",
    "/assets/css/register.css",
    "/assets/css/templatemo-cyborg-gaming.css",
    "/assets/images/banner-bg.jpg",
    "/assets/images/icons8-logout-24.png",
    "/assets/js/dashboard.js",
    "/assets/images/logo.png",
    "/assets/images/logo2.png",
    "/assets/js/isotope.js",
    "/assets/js/isotope.min.js",
    "/assets/js/main.js",
    "/assets/js/owl-carousel.js",
    "/assets/js/popup.js",
    "/assets/js/tabs.js",
    "/assets/js/graph1.js",
    "/assets/js/graph2.js",
    "/assets/js/graph3.js",
    "/assets/js/register.js",
    "/assets/js/graphLastjs",
    "/assets/js/graphParado.js",
    "/assets/js/graphSentado.js",
    "/assets/webfonts/fa-brands-400.ttf",
    "/assets/webfonts/fa-brands-400.woff2",
    "/assets/webfonts/fa-regular-400.ttf",
    "/assets/webfonts/fa-regular-400.woff2",
    "/assets/webfonts/fa-solid-900.ttf",
    "/assets/webfonts/fa-solid-900.woff2",
    "/assets/webfonts/fa-v4compatibility.ttf",
    "/assets/webfonts/fa-v4compatibility.woff2",
    "/vendor/bootstrap/css/bootstrap.min.css",
    "/vendor/bootstrap/js/bootstrap.min.js",
    "/vendor/jquery/jquery.min.js",
    "/vendor/jquery/jquery.slim.min.js",
    "/vendor/jquery/jquery.slim.min.map",
    "/vendor/jquery/jquery.slim.js",
    "/vendor/jquery/jquery.js",
    "/vendor/jquery/jquery.min.map",
];



self.addEventListener("install", (e) => {
    const cacheStatic = caches
        .open(STATIC_CACHE)
        .then(cache => cache.addAll(APP_SHELL));

    e.waitUntil(cacheStatic);
});

self.addEventListener("fetch", (e) => {
    console.log("fetch! ", e.request);

    e.respondWith(
        caches
            .match(e.request)
            .then( res => res || fetch(e.request))
            .catch(console.log)
    );
});