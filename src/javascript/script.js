
class App {
  constructor() {
    this.setupThemeToggle();
    this.setupObserver();
    this.setupSmoothScrolling();
    this.setupExternalLinks();
    this.setupFormValidation();
    this.setupFormSubmission();
  }

  setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = toggle?.querySelector('i');

    if (!toggle || !body) return;

    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    if (icon) icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    toggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', newTheme);
      if (icon) icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      localStorage.setItem('theme', newTheme);
    });
  }

  animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'), 10);
      if (isNaN(target)) return;
      const duration = 2000;
      let current = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        current += increment;
        counter.textContent = Math.floor(current);
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        }
      }, 16);
    });
  }

  setupObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          if (entry.target.querySelector('[data-count]')) {
            this.animateCounters();
          }
        }
      });
    }, options);
    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }

  setupExternalLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
      link.addEventListener('click', function () {
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="loading"></span> Abriendo...';
        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      });
    });
  }

  setupFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const fields = form.querySelectorAll('input, textarea');
    fields.forEach(field => {
      field.addEventListener('input', () => {
        const errorSpan = document.getElementById(`${field.id}-error`);
        if (field.validity.valid) {
          errorSpan.textContent = '';
        } else if (field.validity.valueMissing) {
          errorSpan.textContent = 'Este campo es obligatorio.';
        } else if (field.validity.tooShort) {
          errorSpan.textContent = `Debe tener al menos ${field.minLength} caracteres.`;
        } else if (field.validity.patternMismatch) {
          errorSpan.textContent = field.title;
        } else if (field.validity.typeMismatch) {
          errorSpan.textContent = 'Formato de correo no válido.';
        }
      });
    });
  }

  setupFormSubmission() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const popup = document.getElementById('successPopup');
    const overlay = document.getElementById('overlay');
    const closePopup = document.getElementById('closePopup');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Simulación de envío exitoso
      popup.classList.add('show');
      overlay.classList.add('show');
      form.reset();

      // Desactivar botón hasta que se acepte de nuevo
      const submitBtn = form.querySelector('button[type="submit"]');
      const checkbox = form.querySelector('#conditions');
      if (submitBtn && checkbox) submitBtn.disabled = true;
    });

    closePopup?.addEventListener('click', () => {
      popup.classList.remove('show');
      overlay.classList.remove('show');
    });

    // Reactivar el botón de enviar al marcar condiciones
    const checkbox = form.querySelector('#conditions');
    const submitBtn = form.querySelector('button[type="submit"]');
    if (checkbox && submitBtn) {
      submitBtn.disabled = !checkbox.checked;
      checkbox.addEventListener('change', () => {
        submitBtn.disabled = !checkbox.checked;
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
