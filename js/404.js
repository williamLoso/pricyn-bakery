/* =====================================
   404 PAGE INITIALIZATION
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  initializeErrorPageEntrance();
  initializeDelayedHelpPrompt();
});

/* =====================================
   ERROR PAGE ENTRANCE
===================================== */

function initializeErrorPageEntrance() {
  const errorShell = document.querySelector(".error-shell");
  const errorCards = document.querySelectorAll(".error-card");

  if (errorShell) {
    errorShell.classList.add("error-ready");
  }

  errorCards.forEach((card, index) => {
    window.setTimeout(
      () => {
        card.classList.add("error-card-ready");
      },
      120 + index * 100,
    );
  });
}

/* =====================================
   DELAYED HELP PROMPT
===================================== */

function initializeDelayedHelpPrompt() {
  const errorLinksSection = document.querySelector(".error-links");

  if (!errorLinksSection) return;

  const helpPrompt = document.createElement("div");

  helpPrompt.className = "error-help";

  helpPrompt.innerHTML = `
    <p>
      Still can't find what you're looking for?
      <a href="contact.html">Contact our team →</a>
    </p>
  `;

  errorLinksSection.appendChild(helpPrompt);

  window.setTimeout(() => {
    helpPrompt.classList.add("show");
  }, 10000);
}
