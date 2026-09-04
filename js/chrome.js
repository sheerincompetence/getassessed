(function () {
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

  function inject(name) {
    var slot = document.querySelector('[data-include="' + name + '"]');
    if (!slot) return Promise.resolve();
    return fetch("/includes/" + name + ".html").then(function (res) {
      if (!res.ok) throw new Error("Could not load /includes/" + name + ".html");
      return res.text();
    }).then(function (html) {
      slot.outerHTML = html;
    });
  }

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
