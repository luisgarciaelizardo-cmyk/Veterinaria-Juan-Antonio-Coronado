(function () {
  "use strict";

  // Horario en formato 24h por día de la semana (0 = domingo).
  var HOURS = {
    0: [11, 14],
    1: [10, 20], 2: [10, 20], 3: [10, 20], 4: [10, 20], 5: [10, 20],
    6: [10, 18]
  };
  var DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

  // ---------- Menú móvil ----------
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("menu");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    nav.classList.toggle("is-open", open);
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  // ---------- Sombra del encabezado al hacer scroll ----------
  var header = document.querySelector(".header");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Abierto / cerrado (hora de Saltillo) ----------
  function saltilloNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Monterrey",
        weekday: "short", hour: "numeric", minute: "numeric", hour12: false
      }).formatToParts(new Date());
      var get = function (t) { return parts.find(function (p) { return p.type === t; }).value; };
      var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
      var hour = parseInt(get("hour"), 10) % 24;
      return { day: day, minutes: hour * 60 + parseInt(get("minute"), 10) };
    } catch (err) {
      var d = new Date();
      return { day: d.getDay(), minutes: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function fmt(h) {
    var suffix = h >= 12 ? "pm" : "am";
    var h12 = h % 12 || 12;
    return h12 + ":00 " + suffix;
  }

  function updateStatus() {
    var now = saltilloNow();
    var pill = document.getElementById("status-pill");
    var text = document.getElementById("status-text");
    var today = HOURS[now.day];
    var open = now.minutes >= today[0] * 60 && now.minutes < today[1] * 60;

    pill.classList.toggle("is-open", open);
    pill.classList.toggle("is-closed", !open);

    if (open) {
      text.textContent = "Abierto ahora · cierra a las " + fmt(today[1]);
    } else if (now.minutes < today[0] * 60) {
      text.textContent = "Cerrado · abrimos hoy a las " + fmt(today[0]);
    } else {
      var next = (now.day + 1) % 7;
      text.textContent = "Cerrado · abrimos mañana " + DAY_NAMES[next] + " a las " + fmt(HOURS[next][0]);
    }
    pill.hidden = false;

    document.querySelectorAll("#hours li").forEach(function (li) {
      var days = li.getAttribute("data-days").split(",").map(Number);
      li.classList.toggle("is-today", days.indexOf(now.day) !== -1);
    });
  }
  updateStatus();
  setInterval(updateStatus, 60 * 1000);

  // ---------- Animación de aparición ----------
  var revealEls = document.querySelectorAll(".card, .section__head, .about__text, .stat, .schedule__card, .location__info, .location__map, .contact");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) {
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  // ---------- Año del pie de página ----------
  document.getElementById("year").textContent = new Date().getFullYear();
})();
