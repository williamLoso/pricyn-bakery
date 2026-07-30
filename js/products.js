/* =====================================
   SIGNATURE COLLECTION
   Controls featured bread image, text and badge
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".signature-product");
  const photo = document.getElementById("signaturePhoto");
  const image = document.getElementById("featuredImage");
  const copy = document.getElementById("photoCopy");
  const badge = document.getElementById("productBadge");
  const count = document.getElementById("productCount");
  const title = document.getElementById("featuredTitle");
  const text = document.getElementById("featuredText");
  const meta = document.getElementById("featuredMeta");

  if (!products.length || !image || !copy) return;

  let activeImage = image.getAttribute("src");
  let changeTimer;

  products.forEach((product) => {
    const preload = new Image();
    preload.src = product.dataset.image;
    product.setAttribute("tabindex", "0");
  });

  const activateProduct = (product) => {
    const nextImage = product.dataset.image;

    if (nextImage === activeImage) return;

    clearTimeout(changeTimer);

    products.forEach((item) => item.classList.remove("active"));
    product.classList.add("active");

    image.classList.add("is-changing");
    copy.classList.add("is-changing");

    changeTimer = setTimeout(() => {
      image.src = nextImage;
      image.alt = product.dataset.title.replace(/<br\s*\/?>/gi, " ");

      badge.textContent = product.dataset.badge;
      count.textContent = product.dataset.count;
      title.innerHTML = product.dataset.title;
      text.textContent = product.dataset.text;
      meta.textContent = product.dataset.meta;

      activeImage = nextImage;

      image.classList.remove("is-changing");
      copy.classList.remove("is-changing");
    }, 210);
  };

  products.forEach((product) => {
    product.addEventListener("mouseenter", () => activateProduct(product));
    product.addEventListener("click", () => activateProduct(product));
    product.addEventListener("focusin", () => activateProduct(product));
  });

  if (photo) {
    photo.addEventListener("mousemove", (event) => {
      const rect = photo.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;

      image.style.transform = `scale(1.025) translate(${x}px, ${y}px)`;
    });

    photo.addEventListener("mouseleave", () => {
      image.style.transform = "scale(1.015)";
    });
  }
});

/* =====================================
   FRESHLY BAKED TREATS
   Pastry mosaic has CSS-only hover effects
===================================== */

/* No JavaScript needed for this section */

/* =====================================
   ROLLS & BUNS
   Controls roll image, title, description and label
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".roll-tab");
  const image = document.getElementById("rollImage");
  const title = document.getElementById("rollTitle");
  const text = document.getElementById("rollText");
  const label = document.getElementById("rollLabel");

  if (!tabs.length || !image || !title || !text || !label) return;

  let activeImage = image.getAttribute("src");
  let timer;

  tabs.forEach((tab) => {
    const preload = new Image();
    preload.src = tab.dataset.image;
  });

  const activateRoll = (tab) => {
    if (tab.dataset.image === activeImage) return;

    clearTimeout(timer);

    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    image.classList.add("is-changing");

    timer = setTimeout(() => {
      image.src = tab.dataset.image;
      image.alt = tab.dataset.title;
      title.textContent = tab.dataset.title;
      text.textContent = tab.dataset.text;
      label.textContent = tab.dataset.label;

      activeImage = tab.dataset.image;
      image.classList.remove("is-changing");
    }, 180);
  };

  tabs.forEach((tab) => {
    tab.addEventListener("mouseenter", () => activateRoll(tab));
    tab.addEventListener("click", () => activateRoll(tab));
    tab.addEventListener("focusin", () => activateRoll(tab));
  });
});

/* =====================================
   EXPLORE OUR BAKERY
   Controls menu category switching and category image
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".explorer-category");
  const groups = document.querySelectorAll(".explorer-group");
  const image = document.getElementById("explorerImage");

  if (!categories.length || !groups.length || !image) return;

  const categoryImages = {
    bread: {
      src: "../images/products/bread/butter-bread.webp",
      alt: "Butter Bread",
    },

    rolls: {
      src: "../images/products/rolls/Burger Buns.webp",
      alt: "Burger Buns",
    },

    pastries: {
      src: "../images/products/pastries/meat-pie.webp",
      alt: "Meat Pie",
    },

    treats: {
      src: "../images/products/pastries/doughnuts.webp",
      alt: "Doughnuts",
    },
  };

  Object.values(categoryImages).forEach((item) => {
    const preload = new Image();
    preload.src = item.src;
  });

  const switchCategory = (category) => {
    categories.forEach((button) => {
      button.classList.toggle("active", button.dataset.category === category);
    });

    groups.forEach((group) => {
      group.classList.toggle("hidden", group.dataset.group !== category);
    });

    const nextImage = categoryImages[category];

    if (!nextImage) return;

    image.classList.add("is-changing");

    setTimeout(() => {
      image.src = nextImage.src;
      image.alt = nextImage.alt;
      image.classList.remove("is-changing");
    }, 180);
  };

  categories.forEach((button) => {
    button.addEventListener("click", () => {
      switchCategory(button.dataset.category);
    });
  });
});
