const carousel = document.querySelector(".featured-carousel");

const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".carousel-card");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");


console.log("JS STARTED");

let activeIndex = 3;

function updateCarousel(){

    cards.forEach(card => {

        card.classList.remove("active");
        card.classList.remove("side-card");

    });

    cards[activeIndex].classList.add("active");

   if(window.innerWidth > 768){

    if(activeIndex > 0){
        cards[activeIndex - 1].classList.add("side-card");
    }

    if(activeIndex < cards.length - 1){
        cards[activeIndex + 1].classList.add("side-card");
    }

}


const activeCard = cards[activeIndex];

const viewport = document.querySelector(".carousel-viewport");

const viewportCenter = viewport.offsetWidth / 2;

const cardCenter =
    activeCard.offsetLeft +
    (activeCard.offsetWidth / 2);

let moveAmount;

if(window.innerWidth <= 768){

    moveAmount = activeCard.offsetLeft;

}else{

    moveAmount = cardCenter - viewportCenter;

}

if(moveAmount < 0){
    moveAmount = 0;
}

track.style.transform = `translateX(-${moveAmount}px)`;
}

let autoSlide = setInterval(nextSlide, 4000);

function nextSlide(){

    activeIndex++;

    if(activeIndex >= cards.length){
        activeIndex = 0;
    }

    updateCarousel();
}

nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", () => {

    activeIndex--;

    if(activeIndex < 0){
        activeIndex = cards.length - 1;
    }

    updateCarousel();

});

/*
carousel.addEventListener("mouseenter", () => {

    clearInterval(autoSlide);

});

carousel.addEventListener("mouseleave", () => {

    autoSlide = setInterval(nextSlide, 5000);

});
*/

updateCarousel();

window.addEventListener("resize", updateCarousel);