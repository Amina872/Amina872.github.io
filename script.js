/* =====================================
   AMINA KHATOON — PORTFOLIO INTERACTIONS
   ===================================== */

// Mobile navigation
const menuButton = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuButton.textContent = isOpen ? '×' : '☰';
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      menuButton.textContent = '☰';
    });
  });
}

// 3D profile card tilt (desktop / pointer devices only)
const profileCard = document.querySelector('.tilt-card');
const heroVisual = document.querySelector('.hero-art');
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (profileCard && heroVisual && canHover) {
  heroVisual.addEventListener('mousemove', (event) => {
    const rect = profileCard.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    const rotateX = -(y / rect.height) * 10;
    const rotateY = (x / rect.width) * 10;
    profileCard.style.animation = 'none';
    profileCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  heroVisual.addEventListener('mouseleave', () => {
    profileCard.style.transform = '';
    profileCard.style.animation = '';
  });
}

// Google Sheets contact form — existing deployed Apps Script endpoint
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const scriptURL = 'https://script.google.com/macros/s/AKfycby1MzmGpkp8oItJi5vg2R4GK2FKW6DWmU_QxSh_gaBf17SX4i4HD_K0jkeg2REJqJc/exec';

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (!name || !email || !subject || !message) {
      formStatus.textContent = 'Please complete all fields before sending.';
      return;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailIsValid) {
      formStatus.textContent = 'Please enter a valid email address.';
      document.getElementById('email')?.focus();
      return;
    }

    const originalButtonText = submitButton?.innerHTML || 'Send message ↗';
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }
    formStatus.textContent = 'Sending your message...';

    try {
      // no-cors is retained to match the existing Apps Script form integration.
      // The browser cannot read the server response in no-cors mode.
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ name, email, subject, message })
      });

      formStatus.textContent = 'Thank you! Your message has been submitted.';
      contactForm.reset();
    } catch (error) {
      console.error('Contact form error:', error);
      formStatus.textContent = 'Something went wrong. Please try again or email me directly.';
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }
    }
  });
}

// Keep the copyright year current
const yearElement = document.getElementById('current-year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

console.log('Welcome to Amina Khatoon’s portfolio.');


// Gentle reveal animations as sections enter the viewport.
// Content remains visible if IntersectionObserver is unavailable.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealTargets = document.querySelectorAll(
    '.section-heading, .about-copy, .mini-stats, .service-card, .website-card, .project-card, .skill-group, .certificate-card, .timeline article, .contact-intro, .contact-form'
  );

  revealTargets.forEach((element, index) => {
    element.classList.add('reveal');
    if (element.matches('.about-copy, .contact-intro')) element.classList.add('reveal-left');
    element.style.transitionDelay = `${(index % 3) * 80}ms`;
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

  revealTargets.forEach((element) => revealObserver.observe(element));
}

// Keep form feedback visually clear and restore the original button label.
if (formStatus) {
  const statusObserver = new MutationObserver(() => {
    formStatus.classList.toggle('success', /thank you|submitted/i.test(formStatus.textContent));
    formStatus.classList.toggle('error', /wrong|valid|complete|try again/i.test(formStatus.textContent));
  });
  statusObserver.observe(formStatus, { childList: true, characterData: true, subtree: true });
}
