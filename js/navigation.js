const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {

        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");

        const expanded = hamburger.classList.contains("active");
        hamburger.setAttribute("aria-expanded", expanded);

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");

        });

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");

        }

    });

}

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a").forEach(link => {

    const href = link.getAttribute("href");

    if (!href) return;

    const linkPage = href.split("/").pop();

    if (linkPage === currentPage) {

        link.classList.add("active");

    }

});