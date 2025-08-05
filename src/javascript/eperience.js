// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const icon = themeToggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('stat-number')) {
        animateStats(entry.target);
      }
    }
  });
}, observerOptions);

// Function to animate stats
const animateStats = (stat) => {
  const finalNumber = parseInt(stat.textContent);
  let currentNumber = 0;
  const increment = Math.ceil(finalNumber / 50); // Incremento más suave

  const updateNumber = () => {
    if (currentNumber < finalNumber) {
      currentNumber += increment;
      stat.textContent = Math.min(currentNumber, finalNumber) + (stat.textContent.includes('+') ? '+' : '');
      requestAnimationFrame(updateNumber);
    } else {
      stat.textContent = finalNumber + (stat.textContent.includes('+') ? '+' : '');
    }
  };

  updateNumber();
};

// Observe elements with the fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Timeline item hover effects
document.querySelectorAll('.timeline-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    const dot = item.querySelector('.timeline-dot');
    dot.style.transform = 'translateX(-50%) scale(1.3)';
    dot.style.borderColor = '#e74c3c';
  });
  
  item.addEventListener('mouseleave', () => {
    const dot = item.querySelector('.timeline-dot');
    dot.style.transform = 'translateX(-50%) scale(1)';
    dot.style.borderColor = '#3498db';
  });
});
