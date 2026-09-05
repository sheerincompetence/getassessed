(function () {
  var CACHE_PREFIX = "hua-include-v1:";

  function markNav() {
    var current = document.body.getAttribute("data-nav");
    if (!current) return;
    document.querySelectorAll(".service-nav a[data-nav]").forEach(function (link) {
      if (link.getAttribute("data-nav") === current) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function readCache(name) {
    try {
      return sessionStorage.getItem(CACHE_PREFIX + name);
    } catch (e) {
      return null;
    }
  }

  function writeCache(name, html) {
    try {
      sessionStorage.setItem(CACHE_PREFIX + name, html);
    } catch (e) {}
  }

  function loadInclude(name) {
    var cached = readCache(name);
    if (cached) return Promise.resolve(cached);
    return fetch("/includes/" + name + ".html").then(function (res) {
      if (!res.ok) throw new Error("Could not load /includes/" + name + ".html");
      return res.text();
    }).then(function (html) {
      writeCache(name, html);
      return html;
    });
  }

  function inject(name) {
    var slot = document.querySelector('[data-include="' + name + '"]');
    if (!slot) return Promise.resolve();
    return loadInclude(name).then(function (html) {
      slot.outerHTML = html;
    });
  }

  // Sync path when cache is warm: inject before first paint when possible
  ["header", "footer"].forEach(function (name) {
    var slot = document.querySelector('[data-include="' + name + '"]');
    var cached = slot && readCache(name);
    if (cached) slot.outerHTML = cached;
  });

  inject("header")
    .then(function () {
      return inject("footer");
    })
    .then(function () {
      markNav();
    })
    .catch(function (err) {
      console.error(err);
    });
})();
