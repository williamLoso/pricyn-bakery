/* =====================================
   GALLERY PAGE INITIALIZATION
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  initializeGalleryLightbox();
  initializeGalleryReveal();
  initializeGalleryFilters();
});

/* =====================================
   GALLERY LIGHTBOX
===================================== */

function initializeGalleryLightbox() {
  const galleryImages = document.querySelectorAll(".gallery-item img");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const lightboxClose = document.querySelector(".lightbox-close");

  if (!galleryImages.length || !lightbox || !lightboxImage || !lightboxClose) {
    return;
  }

  let lastFocusedElement = null;

  const openLightbox = (image) => {
    lastFocusedElement = document.activeElement;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "Expanded gallery image";

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("lightbox-open");

    lightboxClose.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    lightboxImage.src = "";

    document.body.classList.remove("lightbox-open");

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  galleryImages.forEach((image) => {
    image.setAttribute("tabindex", "0");

    image.addEventListener("click", () => {
      openLightbox(image);
    });

    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

/* =====================================
   GRADUAL GALLERY REVEAL
===================================== */

function initializeGalleryReveal() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!galleryItems.length) return;

  const galleryRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const item = entry.target;

        const visibleItems = [...galleryItems].filter(
          (galleryItem) => galleryItem.style.display !== "none",
        );

        const index = visibleItems.indexOf(item);

        item.style.transitionDelay = `${Math.min(
          Math.max(index, 0) * 70,
          420,
        )}ms`;

        item.classList.add("show");

        galleryRevealObserver.unobserve(item);
      });
    },
    {
      threshold: 0.15,
    },
  );

  galleryItems.forEach((item) => {
    galleryRevealObserver.observe(item);
  });
}

/* =====================================
   GALLERY FILTERS
===================================== */

function initializeGalleryFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!filterButtons.length || !galleryItems.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;

        filterButton.classList.toggle("active", isActive);

        filterButton.setAttribute("aria-pressed", String(isActive));
      });

      galleryItems.forEach((item) => {
        const shouldShow = filter === "all" || item.dataset.category === filter;

        item.style.display = shouldShow ? "block" : "none";

        if (!shouldShow) {
          item.classList.remove("show");
          item.style.transitionDelay = "0ms";
          return;
        }

        item.classList.remove("show");
        item.style.transitionDelay = "0ms";

        window.setTimeout(() => {
          item.classList.add("show");
        }, 80);
      });
    });
  });

  const activeButton = document.querySelector(".filter-btn.active");

  filterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button === activeButton));
  });
}
