(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  document.addEventListener("DOMContentLoaded", function () {
    /* ===== Chuyển chế độ sáng/tối ===== */
    var themeBtn = document.getElementById("themeBtn");
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });

    /* ===== Menu trên điện thoại ===== */
    var burger = document.getElementById("burger");
    var menu = document.getElementById("menu");

    function closeMenu() {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    /* ===== Hiệu ứng xuất hiện khi cuộn ===== */
    var items = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add("visible"); });
    }

    /* ===== Đánh dấu mục menu đang xem ===== */
    var links = menu.querySelectorAll("a");
    var sections = [];
    links.forEach(function (a) {
      var s = document.querySelector(a.getAttribute("href"));
      if (s) sections.push({ link: a, el: s });
    });

    function setActive() {
      var y = window.scrollY + 120;
      var current = null;
      sections.forEach(function (s) {
        if (s.el.offsetTop <= y) current = s.link;
      });
      links.forEach(function (a) { a.classList.toggle("active", a === current); });
    }
    window.addEventListener("scroll", setActive, { passive: true });
    setActive();

    /* ===== Năm ở footer ===== */
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  });
})();
