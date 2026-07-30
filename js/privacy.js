/* =====================================
   PRIVACY PAGE INITIALIZATION
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  initializePrivacyNavigation();
});

/* =====================================
   ACTIVE SIDEBAR NAVIGATION
===================================== */

function initializePrivacyNavigation() {
  const sections = document.querySelectorAll(".policy-section[id]");
  const links = document.querySelectorAll(".privacy-sidebar a");

  if (!sections.length || !links.length) return;

  const linkMap = new Map();

  links.forEach((link) => {
    const id = link.getAttribute("href").replace("#", "");
    linkMap.set(id, link);
  });

  function setActive(id) {
    links.forEach((link) => {
      const active = link === linkMap.get(id);

      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visible.length) return;

      setActive(visible[0].target.id);
    },
    {
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0.1, 0.3, 0.5],
    },
  );

  sections.forEach((section) => observer.observe(section));

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href").replace("#", "");
      setActive(id);
    });
  });

  setActive(sections[0].id);
}
