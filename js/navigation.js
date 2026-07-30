/* =====================================
   PRICYN BAKERY GLOBAL NAVIGATION
===================================== */

(() => {
  /* Prevent this script from running twice */
  if (window.pricynNavigationInitialized) return;

  window.pricynNavigationInitialized = true;

  document.addEventListener("DOMContentLoaded", () => {
    initializeMobileNavigation();
    initializeBackToTop();
    initializeActiveNavigation();
    initializeNavbarScroll();
    initializeGlobalReveal();
    initializeHeroParallax();
    initializeManualReveal();
    initializePageLoader();
  });

  /* =====================================
     MOBILE NAVIGATION
  ===================================== */

  function initializeMobileNavigation() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (!hamburger || !navLinks) return;

    const closeMenu = () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    };

    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.toggle("active");

      navLinks.classList.toggle("active", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  /* =====================================
     BACK TO TOP BUTTON
  ===================================== */

  function initializeBackToTop() {
    const backToTop = document.getElementById("backToTop");

    if (!backToTop) return;

    const updateVisibility = () => {
      backToTop.classList.toggle("show", window.scrollY > 300);
    };

    window.addEventListener("scroll", updateVisibility, {
      passive: true,
    });

    updateVisibility();

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =====================================
     ACTIVE NAVIGATION LINK
  ===================================== */

  function initializeActiveNavigation() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach((link) => {
      const href = link.getAttribute("href");

      if (!href) return;

      const linkPage = href.split("/").pop();
      const isCurrentPage = linkPage === currentPage;

      link.classList.toggle("active", isCurrentPage);

      if (isCurrentPage) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* =====================================
     NAVBAR SCROLL EFFECT
  ===================================== */

  function initializeNavbarScroll() {
    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    const updateNavbar = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    };

    window.addEventListener("scroll", updateNavbar, {
      passive: true,
    });

    updateNavbar();
  }

  /* =====================================
     GLOBAL SCROLL REVEAL
  ===================================== */

  function initializeGlobalReveal() {
    const items = document.querySelectorAll(
      ".section-header, .product-card, .feature-card, .about-image, .about-content, .gallery-preview img, .testimonial-card, .contact-cta",
    );

    if (!items.length) return;

    items.forEach((item) => {
      item.classList.add("reveal-item");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const parent = entry.target.parentElement;

          const siblings = parent
            ? [...parent.children].filter((child) =>
                child.classList.contains("reveal-item"),
              )
            : [];

          const index = siblings.indexOf(entry.target);

          entry.target.style.transitionDelay = `${Math.max(index, 0) * 80}ms`;
          entry.target.classList.add("reveal-show");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    items.forEach((item) => {
      observer.observe(item);
    });
  }

  /* =====================================
     HERO PARALLAX
  ===================================== */

  function initializeHeroParallax() {
    const heroImage = document.querySelector(".hero-image img");

    if (!heroImage) return;

    let ticking = false;

    const updateParallax = () => {
      const offset = window.scrollY * 0.12;

      heroImage.style.transform = `translateY(${offset}px)`;
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;

        window.requestAnimationFrame(updateParallax);
        ticking = true;
      },
      {
        passive: true,
      },
    );
  }

  /* =====================================
     MANUAL SCROLL REVEALS
  ===================================== */

  function initializeManualReveal() {
    const elements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right",
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -80px 0px",
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });
  }

  /* =====================================
     PAGE TRANSITION LOADER
  ===================================== */

  function initializePageLoader() {
    const pageLoader = document.querySelector(".page-loader");

    if (!pageLoader) return;

    const hideLoader = () => {
      pageLoader.classList.add("hide");
    };

    window.setTimeout(() => {
      hideLoader();
    }, 100);

    document.querySelectorAll("a[href]").forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (shouldSkipTransition(link, href, event)) return;

        event.preventDefault();

        document.body.classList.add("page-exit");
        pageLoader.classList.remove("hide");

        window.setTimeout(() => {
          window.location.href = href;
        }, 200);
      });
    });
  }

  /* =====================================
     PAGE TRANSITION FILTER
  ===================================== */

  function shouldSkipTransition(link, href, event) {
    if (!href) return true;

    const modifiedClick =
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0;

    const specialLink =
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:");

    const externalLink = link.origin && link.origin !== window.location.origin;

    const newContext =
      link.target === "_blank" || link.hasAttribute("download");

    return modifiedClick || specialLink || externalLink || newContext;
  }
})();
