const contactForm = document.querySelector(".contact-form");

const formMessage = document.getElementById("formMessage");

if(contactForm){

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!name || !email || !message){

            formMessage.className = "form-message error";

            formMessage.textContent =
                "Please complete all required fields.";

            return;
        }

        if(!emailPattern.test(email)){

            formMessage.className = "form-message error";

            formMessage.textContent =
                "Please enter a valid email address.";

            return;
        }

        formMessage.className = "form-message success";

        formMessage.textContent =
            "Thank you! Your message has been received.";

        contactForm.reset();

    });

}