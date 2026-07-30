/* =====================================
   ABOUT PAGE SCROLL REVEAL
===================================== */

const revealItems = document.querySelectorAll(
  ".about-story-image, .about-story-copy, .value-card, .about-process-copy, .about-process-image, .why-list article, .about-quote-shell, .about-cta-shell",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-show");
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -120px 0px",
  },
);

revealItems.forEach((item) => {
  item.classList.add("reveal-item");
  revealObserver.observe(item);
});
