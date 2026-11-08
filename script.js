
/* ==============================
   3D PROFILE CARD EFFECT
================================ */

const profileCard = document.querySelector(".tilt-card");
const heroVisual = document.querySelector(".hero-visual");

if (profileCard && heroVisual) {

    heroVisual.addEventListener("mousemove", function (event) {

        const rect = profileCard.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = event.clientX - centerX;
        const mouseY = event.clientY - centerY;

        const rotateX = -(mouseY / rect.height) * 15;
        const rotateY = (mouseX / rect.width) * 15;

        profileCard.style.animation = "none";

        profileCard.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

    });

    heroVisual.addEventListener("mouseleave", function () {

        profileCard.style.transform = "";

        profileCard.style.animation =
            "float-card 5s ease-in-out infinite";

    });

}


/* ==============================
   CONTACT FORM
================================ */


/* ==============================
   CONTACT FORM - GOOGLE SHEETS
================================ */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Paste your deployed Google Apps Script Web App URL here
const scriptURL = "https://script.google.com/macros/s/AKfycby1MzmGpkp8oItJi5vg2R4GK2FKW6DWmU_QxSh_gaBf17SX4i4HD_K0jkeg2REJqJc/exec";

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            formStatus.textContent = "Please fill in all the fields.";
            return;
        }

        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        formStatus.textContent = "Sending your message...";

        try {

            await fetch(scriptURL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(formData)
            });

            formStatus.textContent =
                "Thank you! Your message has been submitted.";

            contactForm.reset();

        } catch (error) {

            console.error("Contact form error:", error);

            formStatus.textContent =
                "Something went wrong. Please try again.";

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "Send Message ↗";

        }

    });

}



/* ==============================
   NAVIGATION ACTIVE HOVER
================================ */

const navigationLinks = document.querySelectorAll(".navbar nav a");

navigationLinks.forEach(function (link) {

    link.addEventListener("mouseenter", function () {

        link.style.transform = "translateY(-2px)";

    });

    link.addEventListener("mouseleave", function () {

        link.style.transform = "translateY(0)";

    });

});


/* ==============================
   CONSOLE MESSAGE
================================ */

console.log(
    "Welcome to Amina Khatoon's Data Analytics Portfolio!"
);
