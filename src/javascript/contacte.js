document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const submitBtn = form.querySelector('button[type="submit"]');
  const overlay = document.getElementById('overlay');
  const successPopup = document.getElementById('successPopup');
  const closePopupBtn = document.getElementById('closePopup');

  // Custom validation messages
  const validationMessages = {
    name: {
      valueMissing: 'Por favor, ingresa tu nombre.',
      patternMismatch: 'El nombre solo puede contener letras y espacios.',
      tooShort: 'El nombre debe tener al menos 2 caracteres.'
    },
    email: {
      valueMissing: 'Por favor, ingresa tu correo electrónico.',
      typeMismatch: 'Por favor, ingresa un correo electrónico válido.'
    },
    message: {
      valueMissing: 'Por favor, escribe un mensaje.',
      tooShort: 'El mensaje debe tener al menos 10 caracteres.'
    },
    conditions: {
      valueMissing: 'Debes aceptar la política de privacidad.'
    }
  };

  // Function to validate individual input
  function validateInput(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    input.classList.remove('input-error');

    if (!input.validity.valid) {
      let message = '';
      if (input.validity.valueMissing) {
        message = validationMessages[input.name].valueMissing;
      } else if (input.validity.patternMismatch) {
        message = validationMessages[input.name].patternMismatch;
      } else if (input.validity.tooShort) {
        message = validationMessages[input.name].tooShort;
      } else if (input.validity.typeMismatch) {
        message = validationMessages[input.name].typeMismatch;
      }
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      input.classList.add('input-error');
    }
  }

  // Function to check form validity and toggle submit button
  function toggleSubmitButton() {
    const isValid = form.checkValidity();
    submitBtn.disabled = !isValid;
    submitBtn.classList.toggle('disabled', !isValid);
  }

  // Function to show success popup
  function showSuccessPopup() {
    overlay.classList.add('show');
    successPopup.classList.add('show');
  }

  // Function to hide success popup
  function hideSuccessPopup() {
    overlay.classList.remove('show');
    successPopup.classList.remove('show');
  }

  // Validate all inputs on input/change
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      validateInput(input);
      toggleSubmitButton();
    });
    input.addEventListener('blur', () => validateInput(input));
  });

  // Special handling for checkbox
  const conditionsCheckbox = document.getElementById('conditions');
  conditionsCheckbox.addEventListener('change', () => {
    validateInput(conditionsCheckbox);
    toggleSubmitButton();
  });

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.querySelectorAll('input, textarea').forEach(validateInput);
      return;
    }

    // Show success popup and reset form
    showSuccessPopup();
    form.reset();
    toggleSubmitButton();
    form.querySelectorAll('.error-message').forEach(error => {
      error.style.display = 'none';
    });
    form.querySelectorAll('input, textarea').forEach(input => {
      input.classList.remove('input-error');
    });
  });

  // Close popup on button click
  closePopupBtn.addEventListener('click', hideSuccessPopup);

  // Close popup on overlay click
  overlay.addEventListener('click', hideSuccessPopup);

  // Close popup on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successPopup.classList.contains('show')) {
      hideSuccessPopup();
    }
  });

  // Initial validation
  toggleSubmitButton();
});

