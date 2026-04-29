(function () {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  const parallaxItems = Array.from(document.querySelectorAll("[data-parallax]"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  function updateParallax() {
    if (reduceMotion) return;

    parallaxItems.forEach((item) => {
      const rect = item.parentElement.getBoundingClientRect();
      const speed = Number(item.dataset.speed || 0.12);
      const offset = rect.top * speed;
      item.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  }

  function closeMenu() {
    if (!menuToggle || !nav) return;
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) closeMenu();
    });
  }

  window.addEventListener("scroll", () => {
    updateHeader();
    updateParallax();
  }, { passive: true });

  window.addEventListener("resize", updateParallax);

  updateHeader();
  updateParallax();

  if (window.lucide) {
    window.lucide.createIcons();
  }
})();
