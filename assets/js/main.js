/**
 * Madhav Kumar - Bio Website Interactive Engine
 * Handles responsive mobile navigation, theme toggling, clipboard copy, and contact actions
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initThemeToggle();
  initEmailCopy();
  initContactForm();
  initScrollSpy();
});

/* ==========================================================================
   Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  function toggleMenu() {
    const isOpen = hamburger.classList.toggle('is-active');
    navMenu.classList.toggle('is-active', isOpen);
    if (navBackdrop) {
      navBackdrop.classList.toggle('is-active', isOpen);
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('is-active');
    navMenu.classList.remove('is-active');
    if (navBackdrop) {
      navBackdrop.classList.remove('is-active');
    }
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);
  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('is-active')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   Dark / Light Theme Switcher
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  if (!themeToggle || !themeIcon) return;

  const savedTheme = localStorage.getItem('madhav-theme') || 'dark';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('madhav-theme', newTheme);
  });

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeIcon.textContent = '🌙';
      themeToggle.setAttribute('title', 'Switch to Dark Mode');
      themeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.textContent = '☀️';
      themeToggle.setAttribute('title', 'Switch to Light Mode');
      themeToggle.setAttribute('aria-label', 'Switch to Light Mode');
    }
  }
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message, icon = '✓') {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span style="color: #06b6d4; font-weight: bold;">${icon}</span> <span>${message}</span>`;
  toast.classList.add('show');

  if (window.toastTimeout) {
    clearTimeout(window.toastTimeout);
  }

  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   One-Click Email Copy
   ========================================================================== */
function initEmailCopy() {
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  const email = 'mkxtec2.0@gmail.com';

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for non-https or older browsers
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        showToast(`Email copied: ${email}`);
      } catch (err) {
        showToast(`Email: ${email}`);
      }
    });
  });
}

/* ==========================================================================
   Interactive Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName')?.value || 'Guest';
    const email = document.getElementById('senderEmail')?.value || '';
    const subject = document.getElementById('senderSubject')?.value || 'Inquiry for Madhav Kumar';
    const message = document.getElementById('senderMessage')?.value || '';

    // Create mailto link
    const mailtoBody = encodeURIComponent(
      `Hello Madhav,\n\nMy name is ${name} (${email}).\n\nMessage:\n${message}\n\nSent from your Portfolio Website.`
    );
    const mailtoSubject = encodeURIComponent(subject);
    const mailtoUrl = `mailto:mkxtec2.0@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    showToast('Opening your email client...', '✉️');

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 600);
  });
}

/* ==========================================================================
   Active Navigation Scroll Spy
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });
}
