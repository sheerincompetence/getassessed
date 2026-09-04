(function () {
  function copy() {
    var el = document.getElementById("assessment-prompt");
    if (!el) return;
    var text = el.innerText;
    function done() {
      var btn = document.getElementById("copy-prompt");
      if (!btn) return;
      var prev = btn.textContent;
      btn.textContent = "Copied";
      window.setTimeout(function () {
        btn.textContent = prev;
      }, 1600);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        window.getSelection().selectAllChildren(el);
      });
    } else {
      window.getSelection().selectAllChildren(el);
    }
  }
  var btn = document.getElementById("copy-prompt");
  if (btn) btn.addEventListener("click", copy);
})();
