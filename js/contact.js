/* =====================================
   CONTACT PAGE INITIALIZATION
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  initializeContactForm();
});

/* =====================================
   CONTACT FORM
   Handles validation, spam protection,
   EmailJS sending and user feedback
===================================== */

function initializeContactForm() {
  const contactForm = document.querySelector(".contact-form");
  const formMessage = document.getElementById("formMessage");

  if (!contactForm || !formMessage) return;

  const submitButton = contactForm.querySelector(".submit-btn");
  const honeypot = document.getElementById("website");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  if (
    !submitButton ||
    !nameInput ||
    !emailInput ||
    !phoneInput ||
    !subjectInput ||
    !messageInput
  ) {
    return;
  }

  let messageTimer;

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    /* =====================================
       HONEYPOT SPAM PROTECTION
    ===================================== */

    if (honeypot && honeypot.value.trim() !== "") {
      return;
    }

    /* =====================================
       FORM VALUES
    ===================================== */

    const formValues = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: messageInput.value.trim(),
    };

    /* =====================================
       FORM VALIDATION
    ===================================== */

    const validationMessage = validateContactForm(formValues);

    if (validationMessage) {
      showFormMessage(formMessage, "error", validationMessage);
      return;
    }

    /* =====================================
       EMAILJS AVAILABILITY CHECK
    ===================================== */

    if (typeof emailjs === "undefined") {
      console.error("EmailJS is not available.");

      showFormMessage(
        formMessage,
        "error",
        "Sorry, the contact form is temporarily unavailable. Please contact us on WhatsApp.",
      );

      return;
    }

    /* =====================================
       SENDING STATE
    ===================================== */

    setSubmitButtonState(submitButton, true);
    clearFormMessage(formMessage);

    /* =====================================
       SEND MESSAGE THROUGH EMAILJS
    ===================================== */

    try {
      await emailjs.send("service_knsg41j", "template_wl26blp", {
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone || "Not provided",
        title: formValues.subject || "Website Enquiry",
        message: formValues.message,
      });

      showFormMessage(
        formMessage,
        "success",
        "Thank you! Your message has been sent successfully.",
      );

      contactForm.reset();

      window.clearTimeout(messageTimer);

      messageTimer = window.setTimeout(() => {
        clearFormMessage(formMessage);
      }, 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);

      showFormMessage(
        formMessage,
        "error",
        "Sorry, something went wrong. Please try again or contact us on WhatsApp.",
      );
    } finally {
      setSubmitButtonState(submitButton, false);
    }
  });
}

/* =====================================
   CONTACT FORM VALIDATION
===================================== */

function validateContactForm(values) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.name || !values.email || !values.message) {
    return "Please complete all required fields.";
  }

  if (!emailPattern.test(values.email)) {
    return "Please enter a valid email address.";
  }

  return "";
}

/* =====================================
   FORM MESSAGE HELPERS
===================================== */

function showFormMessage(element, type, message) {
  element.className = `form-message ${type}`;
  element.textContent = message;
}

function clearFormMessage(element) {
  element.className = "form-message";
  element.textContent = "";
}

/* =====================================
   SUBMIT BUTTON STATE
===================================== */

function setSubmitButtonState(button, isSending) {
  button.disabled = isSending;

  if (isSending) {
    button.innerHTML = `
      <span class="btn-spinner" aria-hidden="true"></span>
      <span>Sending...</span>
    `;

    return;
  }

  button.textContent = "Send Message";
}
