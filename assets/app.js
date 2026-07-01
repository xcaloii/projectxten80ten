/* ============================================================
   Ten80Ten — Interaction & Animation Engine (vanilla, light)
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia("(hover: none)").matches;

  /* ---------- Footer year ---------- */
  function setYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Active nav link ---------- */
  function setActiveNav() {
    var path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      var target = a.getAttribute("data-nav");
      if (target === path || (path === "" && target === "index.html")) a.classList.add("active");
    });
  }

  /* ---------- Sticky nav scroll state ---------- */
  function navScroll() {
    var nav = document.querySelector(".nav");
    if (!nav) return;
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 12); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  function mobileMenu() {
    var toggle = document.querySelector(".nav-toggle");
    if (!toggle) return;
    var close = function () { document.body.classList.remove("menu-open"); };
    toggle.addEventListener("click", function () { document.body.classList.toggle("menu-open"); });
    document.querySelectorAll(".mobile-menu a").forEach(function (a) { a.addEventListener("click", close); });
    window.addEventListener("resize", function () { if (window.innerWidth > 900) close(); });
  }

  /* ---------- Reveal on scroll (IntersectionObserver) ---------- */
  function reveals() {
    var items = document.querySelectorAll("[data-reveal]");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
        setTimeout(function () { el.classList.add("in"); }, delay);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Auto-stagger groups ---------- */
  function stagger() {
    document.querySelectorAll("[data-stagger]").forEach(function (group) {
      var step = parseInt(group.getAttribute("data-stagger") || "80", 10);
      var kids = group.querySelectorAll("[data-reveal]");
      kids.forEach(function (el, i) { el.setAttribute("data-delay", i * step); });
    });
  }

  /* ---------- Number counters ---------- */
  function counters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    var animate = function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var dec = (el.getAttribute("data-count").split(".")[1] || "").length;
      var dur = 1400, start = null;
      if (reduceMotion) { el.firstChild ? (el.childNodes[0].nodeValue = format(target, dec)) : (el.textContent = format(target, dec)); return; }
      var numNode = el.childNodes[0];
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        numNode.nodeValue = format(target * eased, dec);
        if (p < 1) requestAnimationFrame(step);
        else numNode.nodeValue = format(target, dec);
      };
      requestAnimationFrame(step);
    };
    var format = function (n, dec) {
      return n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Framework bars fill ---------- */
  function bars() {
    var els = document.querySelectorAll(".fw-bar i");
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.style.width = e.target.getAttribute("data-w") || "100%"; io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Accordion / FAQ ---------- */
  function accordion() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if (!q || !a) return;
      q.addEventListener("click", function () {
        var open = item.classList.contains("open");
        if (open) { a.style.height = a.scrollHeight + "px"; requestAnimationFrame(function () { a.style.height = "0px"; }); item.classList.remove("open"); }
        else {
          item.classList.add("open");
          a.style.height = a.scrollHeight + "px";
          a.addEventListener("transitionend", function te() { if (item.classList.contains("open")) a.style.height = "auto"; a.removeEventListener("transitionend", te); });
        }
      });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  function magnetic() {
    if (isTouch || reduceMotion) return;
    document.querySelectorAll("[data-magnetic]").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + x * 0.18 + "px," + y * 0.28 + "px)";
      });
      btn.addEventListener("mouseleave", function () { btn.style.transform = ""; });
    });
  }

  /* ---------- Hero pointer parallax ---------- */
  function heroParallax() {
    if (isTouch || reduceMotion) return;
    var layers = document.querySelectorAll("[data-parallax]");
    if (!layers.length) return;
    var hero = document.querySelector(".hero") || document.body;
    hero.addEventListener("mousemove", function (e) {
      var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      var dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
      layers.forEach(function (l) {
        var depth = parseFloat(l.getAttribute("data-parallax")) || 10;
        l.style.transform = "translate(" + dx * depth + "px," + dy * depth + "px)";
      });
    });
  }

  /* ---------- Smooth anchor scroll ---------- */
  function anchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length < 2) return;
        var t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        var top = t.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
      });
    });
  }

  /* ---------- Contact form validation ---------- */
  function contactForm() {
    var form = document.querySelector("[data-form]");
    if (!form) return;
    var success = form.parentNode.querySelector(".form-success");

    var validators = {
      text: function (v) { return v.trim().length >= 2; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      textarea: function (v) { return v.trim().length >= 10; }
    };

    var validateField = function (field) {
      var input = field.querySelector("input, textarea, select");
      if (!input || !input.required) return true;
      var type = input.tagName === "TEXTAREA" ? "textarea" : (input.type === "email" ? "email" : "text");
      var ok = validators[type](input.value);
      field.classList.toggle("invalid", !ok);
      return ok;
    };

    form.querySelectorAll(".field").forEach(function (field) {
      var input = field.querySelector("input, textarea");
      if (!input) return;
      input.addEventListener("blur", function () { if (field.classList.contains("invalid") || input.value) validateField(field); });
      input.addEventListener("input", function () { if (field.classList.contains("invalid")) validateField(field); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = form.querySelectorAll(".field");
      var firstInvalid = null, valid = true;
      fields.forEach(function (f) {
        var ok = validateField(f);
        if (!ok && !firstInvalid) firstInvalid = f;
        if (!ok) valid = false;
      });
      if (!valid) { if (firstInvalid) { var inp = firstInvalid.querySelector("input,textarea,select"); if (inp) inp.focus(); } return; }

      var btn = form.querySelector('button[type="submit"]');
      var label = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

      // Simulated submit — wire to your endpoint / Formspree / backend here.
      setTimeout(function () {
        form.style.display = "none";
        if (success) { success.classList.add("show"); success.setAttribute("role", "status"); }
        if (btn) { btn.disabled = false; btn.textContent = label; }
      }, 900);
    });
  }

  /* ---------- Init ---------- */
  function init() {
    setYear();
    setActiveNav();
    navScroll();
    mobileMenu();
    stagger();
    reveals();
    counters();
    bars();
    accordion();
    magnetic();
    heroParallax();
    anchors();
    contactForm();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
