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
const c = document.getElementById('particles'), x = c.getContext('2d');
let w, h, p = [];
function size(){ w = c.width = innerWidth; h = c.height = innerHeight; }
addEventListener('resize', size); size();

const N = innerWidth < 700 ? 35 : 70;
for (let i = 0; i < N; i++)
  p.push({x: Math.random()*w, y: Math.random()*h,
          vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4});

function draw(){
  x.clearRect(0, 0, w, h);
  for (const a of p){
    a.x += a.vx; a.y += a.vy;
    if (a.x < 0 || a.x > w) a.vx *= -1;
    if (a.y < 0 || a.y > h) a.vy *= -1;
    x.fillStyle = 'rgba(255,255,255,.6)';
    x.beginPath(); x.arc(a.x, a.y, 1.5, 0, 6.283); x.fill();
  }
  for (let i = 0; i < p.length; i++)
    for (let j = i+1; j < p.length; j++){
      const d = Math.hypot(p[i].x-p[j].x, p[i].y-p[j].y);
      if (d < 130){
        x.strokeStyle = 'rgba(255,255,255,' + (.15*(1 - d/130)) + ')';
        x.beginPath(); x.moveTo(p[i].x, p[i].y); x.lineTo(p[j].x, p[j].y); x.stroke();
      }
    }
  requestAnimationFrame(draw);
}
draw();
