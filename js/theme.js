// Loaded in <head> so the saved theme applies before the page paints (no flash).
// Order: the visitor's saved choice → their device setting → dark.
(function () {
  var saved = null;
  try { saved = localStorage.getItem("ambica-theme"); } catch (e) {}
  var prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  document.documentElement.setAttribute("data-theme", saved || (prefersLight ? "light" : "dark"));
})();
