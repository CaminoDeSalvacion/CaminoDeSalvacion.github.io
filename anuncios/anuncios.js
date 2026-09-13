// Carga los anuncios desde data/anuncios.json y los dibuja en la página.
// Esto permite que el panel de administración actualice este archivo
// (vía GitHub) sin que nadie tenga que editar este HTML a mano.
(function () {
  var container = document.getElementById("announcements-list");
  if (!container) return;

  fetch("../data/anuncios.json", { cache: "no-store" })
    .then(function (res) {
      if (!res.ok) throw new Error("No se pudo cargar anuncios.json");
      return res.json();
    })
    .then(function (items) {
      container.innerHTML = "";

      if (!items || items.length === 0) {
        container.innerHTML = "<p>No hay anuncios por el momento.</p>";
        return;
      }

      items.forEach(function (item) {
        var box = document.createElement("div");
        box.className = "announcement-box";

        if (item.type === "image") {
          box.innerHTML =
            '<h3>' + escapeHtml(item.date || "") + "</h3>" +
            (item.image
              ? '<img src="../' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.caption || "Anuncio") + '" style="max-width:100%;border-radius:10px;margin:8px 0;">'
              : "") +
            (item.caption ? "<p>" + escapeHtml(item.caption) + "</p>" : "");
        } else {
          box.innerHTML =
            (item.date ? "<h3>" + escapeHtml(item.date) + "</h3>" : "") +
            (item.time ? "<h3>" + escapeHtml(item.time) + "</h3>" : "") +
            (item.title ? "<p><strong>" + escapeHtml(item.title) + "</strong></p>" : "") +
            (item.body ? "<p>" + escapeHtml(item.body) + "</p>" : "");
        }

        container.appendChild(box);
      });
    })
    .catch(function (err) {
      console.error(err);
      container.innerHTML = "<p>No se pudieron cargar los anuncios en este momento.</p>";
    });

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
