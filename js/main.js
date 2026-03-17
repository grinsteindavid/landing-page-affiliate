/* ============================================
   StylePick — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Mobile Navigation Toggle ----
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('headerNav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('open');
    });

    // Close nav on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  // ---- Header background on scroll ----
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.background = window.scrollY > 60
        ? 'rgba(15, 15, 18, 0.92)'
        : 'rgba(15, 15, 18, 0.72)';
    }, { passive: true });
  }

  // ---- Newsletter form interaction ----
  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button');
      if (input && input.value) {
        btn.textContent = '✓ Subscribed!';
        btn.style.pointerEvents = 'none';
        input.disabled = true;
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.style.pointerEvents = 'auto';
          input.disabled = false;
        }, 3000);
      }
    });
  }

  // ---- Intersection Observer for fade-in ----
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.category-card, .product-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1)';
    observer.observe(el);
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id && id !== '#') {
        e.preventDefault();
        const target = document.querySelector(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
