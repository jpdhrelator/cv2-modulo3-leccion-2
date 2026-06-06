// Checklist con barra de progreso. Guarda el avance por página en el navegador.
document.addEventListener("DOMContentLoaded", function () {
  var list = document.querySelector(".checklist");
  if (!list) return;
  var key = "checklist:" + location.pathname.split("/").pop();
  var boxes = list.querySelectorAll('input[type="checkbox"]');
  var fill = document.querySelector(".progress-fill");
  var text = document.querySelector(".progress-text");

  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || "{}"); } catch (e) {}

  function update() {
    var done = 0;
    boxes.forEach(function (b, i) {
      if (b.checked) done++;
      saved[i] = b.checked;
    });
    var pct = boxes.length ? Math.round((done / boxes.length) * 100) : 0;
    if (fill) fill.style.width = pct + "%";
    if (text) text.textContent = done + " de " + boxes.length + " requisitos completados (" + pct + "%)" + (pct === 100 ? " — ¡listo para entregar!" : "");
    try { localStorage.setItem(key, JSON.stringify(saved)); } catch (e) {}
  }

  boxes.forEach(function (b, i) {
    if (saved[i]) b.checked = true;
    b.addEventListener("change", update);
  });
  update();
});
