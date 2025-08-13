    // Animación de entrada para las tarjetas
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Aplicar animación a las tarjetas
    document.addEventListener('DOMContentLoaded', () => {
      const cards = document.querySelectorAll('.project-card');
      
      cards.forEach((card, index) => {
        // Configuración inicial para animación
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(card);
      });

      // Efecto parallax suave en el hero
      window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
          hero.style.transform = `translateY(${rate}px)`;
        }
      });

      // Smooth scrolling para la navegación
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    });

    // Efecto de hover mejorado para las tarjetas
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
      });
    });

    // Preloader para las imágenes
    const images = document.querySelectorAll('.card-image');
    images.forEach(img => {
      img.addEventListener('load', function() {
        this.style.opacity = '1';
      });
      
      img.addEventListener('error', function() {
        this.style.backgroundColor = '#f8f9fa';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.innerHTML = '<i class="fas fa-image" style="font-size: 2rem; color: #ccc;"></i>';
      });
    });
