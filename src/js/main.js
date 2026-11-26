/* ===========================
   INVASIÓN DEL AMOR — main.js
   T006 + T021: Interacciones y animaciones
   =========================== */

(function () {
  'use strict';

  /* ── Datos de contacto: editar SOLO acá ──
     whatsapp: número en formato internacional, solo dígitos
     (ej. Argentina celular: 549 + área sin 0 + número sin 15 → '5491123456789').
     Mientras esté vacío, los botones de WhatsApp quedan ocultos. */
  const CONTACT = {
    whatsapp: '',
    whatsappMessage: 'Hola! Quiero saber más sobre Invasión del Amor.'
  };

  /* ── WhatsApp links ── */
  const waNumber = CONTACT.whatsapp.replace(/\D/g, '');
  document.querySelectorAll('[data-wa]').forEach(el => {
    if (!waNumber) {
      // Sin número: el link de contacto queda como texto, sin abrir otra pestaña
      el.removeAttribute('target');
      return;
    }
    el.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;
    el.hidden = false;
    if (el.hasAttribute('data-wa-show-number')) el.textContent = `+${waNumber}`;
  });

  /* ── Hero video: no cargar con "reducir movimiento" o ahorro de datos ── */
  const heroVideo = document.getElementById('hero-video');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (heroVideo && !reduceMotion && !saveData) {
    heroVideo.src = heroVideo.dataset.src;
    heroVideo.play().catch(() => { /* autoplay bloqueado: queda el poster */ });
  }

  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Logo del menú: oculto mientras se ve el logo grande del hero, aparece al bajar ── */
  const heroLogo = document.querySelector('.hero__logo');
  if (heroLogo && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      navbar.classList.toggle('show-logo', !entry.isIntersecting);
    }, { rootMargin: '-80px 0px 0px 0px' }).observe(heroLogo);
  } else {
    navbar.classList.add('show-logo');
  }

  /* ── Mobile hamburger menu ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ── Scroll Reveal (Intersection Observer) ── */
  const revealSelectors = '.reveal, .reveal-left, .reveal-right';
  const revealEls = document.querySelectorAll(revealSelectors);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Active nav link highlight on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  // Solo los links a secciones de esta misma página (los que van a otra página quedan como están)
  const navAnchors = document.querySelectorAll('.navbar__links a[href^="#"]');

  const highlightNav = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.id;
    });
    navAnchors.forEach(a => {
      const active = a.getAttribute('href') === `#${current}`;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ── Lightbox de las fotos/comprobantes de la historia de Venezuela ── */
  const lightbox = document.getElementById('lightbox');
  if (lightbox && typeof lightbox.showModal === 'function') {
    const lbImg = lightbox.querySelector('.lightbox__img');
    document.querySelectorAll('.story__zoom').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const thumb = link.querySelector('img');
        lbImg.src = link.href;
        lbImg.alt = thumb ? thumb.alt : '';
        lightbox.showModal();
      });
    });
    lightbox.querySelector('.lightbox__close').addEventListener('click', () => lightbox.close());
    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
  }

  /* ── Smooth WhatsApp float appearance ── */
  const waFloat = document.getElementById('wa-float');
  if (waFloat) {
    waFloat.style.opacity = '0';
    waFloat.style.transform = 'scale(0.5)';
    waFloat.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
    setTimeout(() => {
      waFloat.style.opacity = '1';
      waFloat.style.transform = 'scale(1)';
    }, 1200);
  }
})();
