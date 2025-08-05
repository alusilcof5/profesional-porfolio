
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
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    // Skill tag hover effects
    document.querySelectorAll('.skill-tag').forEach(tag => {
      tag.addEventListener('mouseenter', () => {
        tag.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      });
      
      tag.addEventListener('mouseleave', () => {
        tag.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
      });
    });
