async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  const res = await fetch(file);
  const html = await res.text();
  el.innerHTML = html;
}

async function init() {
  await loadComponent("navbar", "./components/navbar.html");
  await loadComponent("hero", "./components/hero.html");
  await loadComponent("problem", "./components/problem.html");
  await loadComponent("solution", "./components/solution.html");
  await loadComponent("how-it-works", "./components/how-it-works.html");

  initNavbarMenu();
}

function initNavbarMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

init();