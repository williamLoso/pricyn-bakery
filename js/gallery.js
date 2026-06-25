const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.querySelector(".lightbox");

const lightboxImage = document.querySelector(".lightbox-image");

const lightboxClose = document.querySelector(".lightbox-close");

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        lightbox.classList.add("active");

        lightboxImage.src = image.src;

    });

});

lightboxClose.addEventListener("click", () => {

    lightbox.classList.remove("active");

});

lightbox.addEventListener("click", (e) => {

    if(e.target === lightbox){

        lightbox.classList.remove("active");

    }

});

const galleryItems = document.querySelectorAll(".gallery-item");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

galleryItems.forEach(item => {

    observer.observe(item);

});

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            if(
                filter === "all" ||
                item.dataset.category === filter
            ){

                item.style.display = "block";

            }else{

                item.style.display = "none";

            }

        });

    });

});