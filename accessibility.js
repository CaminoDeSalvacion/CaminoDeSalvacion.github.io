// accessibility.js
(function () {
  const root = document.documentElement;
  const STORAGE_KEY = "fontScale";
  const MIN = 0.85;
  const MAX = 1.45;
  const STEP = 0.10;

  let scale = parseFloat(localStorage.getItem(STORAGE_KEY)) || 1;
  scale = Math.min(MAX, Math.max(MIN, scale));
  root.style.setProperty("--base-font-scale", scale);

  function save() {
    localStorage.setItem(STORAGE_KEY, scale.toFixed(2));
    root.style.setProperty("--base-font-scale", scale);
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-text-size]");
    if (!btn) return;

    const action = btn.getAttribute("data-text-size");

    if (action === "increase") scale = Math.min(MAX, scale + STEP);
    if (action === "decrease") scale = Math.max(MIN, scale - STEP);
    if (action === "reset") scale = 1;

    save();
  });
})();
