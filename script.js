// ---- Mobile nav toggle ----
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
}

// ---- Contact form: submit without leaving the page ----
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (contactForm.action.includes('YOUR_FORM_ID')) {
      formStatus.textContent = 'Form not connected yet — set up Formspree first (see comment in contact.html).';
      formStatus.className = 'form-status error';
      return;
    }

    formStatus.textContent = 'Sending...';
    formStatus.className = 'form-status';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = 'Message sent — we\'ll reply within 24 hours.';
        formStatus.className = 'form-status success';
        contactForm.reset();
      } else {
        formStatus.textContent = 'Something went wrong. Please try again or email us directly.';
        formStatus.className = 'form-status error';
      }
    } catch (err) {
      formStatus.textContent = 'Network error. Please check your connection and try again.';
      formStatus.className = 'form-status error';
    }
  });
}
