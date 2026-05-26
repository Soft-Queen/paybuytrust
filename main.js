async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  const res = await fetch(file);

  if (!res.ok) {
    console.error(`Failed to load ${file}`, res.status);
    return;
  }

  el.innerHTML = await res.text();
}

async function init() {
  await loadComponent("navbar", "./components/navbar.html");
  await loadComponent("hero", "./components/hero.html");
  await loadComponent("problem", "./components/problem.html");
  await loadComponent("solution", "./components/solution.html");
  await loadComponent("how-it-works", "./components/how-it-works.html");

  initNavbarMenu();
  initSlider();
  initFAQ();
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

function initSlider() {
  const slider = document.getElementById("who-can-use-slider");
  const prevBtn = document.getElementById("who-can-use-prev");
  const nextBtn = document.getElementById("who-can-use-next");

  if (!slider || !prevBtn || !nextBtn) return;

  function getScrollAmount() {
    const card = slider.querySelector("article");
    const gap = 24;
    return card ? card.offsetWidth + gap : 300;
  }

  prevBtn.addEventListener("click", () => {
    slider.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    slider.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });
}

function initFAQ() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item, index) => {
    const trigger = item.querySelector(".faq-trigger");
    const content = item.querySelector(".faq-content");
    const verticalLine = item.querySelector(".faq-icon-vertical");

    if (!trigger || !content) return;

    if (index === 0) {
      item.classList.add("active");
      content.classList.remove("hidden");
      if (verticalLine) verticalLine.style.opacity = "0";
    } else {
      content.classList.add("hidden");
    }

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      items.forEach((otherItem) => {
        otherItem.classList.remove("active");

        const otherContent = otherItem.querySelector(".faq-content");
        const otherVertical = otherItem.querySelector(".faq-icon-vertical");

        if (otherContent) otherContent.classList.add("hidden");
        if (otherVertical) otherVertical.style.opacity = "1";
      });

      if (!isOpen) {
        item.classList.add("active");
        content.classList.remove("hidden");
        if (verticalLine) verticalLine.style.opacity = "0";
      }
    });
  });
}

init();