/**
 * MEGA STORE - Main JavaScript
 * Pure Vanilla JavaScript - No Frameworks
 */

(function() {
  'use strict';

  // ==========================================
  // Theme Toggle (Light/Dark Mode)
  // ==========================================
  const ThemeManager = {
    init() {
      const toggle = document.getElementById('theme-toggle');
      if (!toggle) return;

      // Check saved preference or system preference
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        this.updateIcon(true);
      }

      toggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
          document.documentElement.removeAttribute('data-theme');
          localStorage.setItem('theme', 'light');
          this.updateIcon(false);
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
          this.updateIcon(true);
        }
      });
    },

    updateIcon(isDark) {
      const toggle = document.getElementById('theme-toggle');
      if (!toggle) return;
      
      if (isDark) {
        toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
      } else {
        toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
      }
    }
  };

  // ==========================================
  // Navigation Scroll Effect
  // ==========================================
  const NavbarManager = {
    init() {
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;

      const onScroll = () => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll(); // Check initial state
    }
  };

  // ==========================================
  // Mobile Menu
  // ==========================================
  const MobileMenu = {
    init() {
      const menuBtn = document.getElementById('mobile-menu-btn');
      const closeBtn = document.getElementById('mobile-menu-close');
      const overlay = document.getElementById('mobile-overlay');
      const menu = document.getElementById('mobile-menu');

      if (!menuBtn || !menu) return;

      menuBtn.addEventListener('click', () => {
        menu.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });

      const closeMenu = () => {
        menu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      };

      if (closeBtn) closeBtn.addEventListener('click', closeMenu);
      if (overlay) overlay.addEventListener('click', closeMenu);

      // Close on link click
      menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
      });
    }
  };

  // ==========================================
  // Scroll Reveal Animation
  // ==========================================
  const ScrollReveal = {
    init() {
      const revealElements = document.querySelectorAll('.reveal');
      if (!revealElements.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    }
  };

  // ==========================================
  // Accordion (FAQ)
  // ==========================================
  const Accordion = {
    init() {
      const accordionItems = document.querySelectorAll('.accordion-item');
      
      accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (!header) return;

        header.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          
          // Close all siblings (optional - remove for multi-open)
          const parent = item.closest('.accordion');
          if (parent) {
            parent.querySelectorAll('.accordion-item').forEach(sibling => {
              sibling.classList.remove('active');
            });
          }

          if (!isActive) {
            item.classList.add('active');
          }
        });
      });
    }
  };

  // ==========================================
  // Search Functionality
  // ==========================================
  const SearchManager = {
    init() {
      const searchInput = document.getElementById('tool-search');
      const toolCards = document.querySelectorAll('[data-tool-card]');
      
      if (!searchInput || !toolCards.length) return;

      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        toolCards.forEach(card => {
          const title = card.getAttribute('data-title') || '';
          const desc = card.getAttribute('data-desc') || '';
          const category = card.getAttribute('data-category') || '';
          
          const match = title.includes(query) || desc.includes(query) || category.includes(query);
          
          if (match || query === '') {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }
  };

  // ==========================================
  // Category Filter
  // ==========================================
  const CategoryFilter = {
    init() {
      const filterBtns = document.querySelectorAll('[data-filter]');
      const toolCards = document.querySelectorAll('[data-tool-card]');
      
      if (!filterBtns.length || !toolCards.length) return;

      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const filter = btn.getAttribute('data-filter');
          
          // Update active state
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          // Filter cards
          toolCards.forEach(card => {
            const category = card.getAttribute('data-category') || 'all';
            
            if (filter === 'all' || category === filter) {
              card.style.display = '';
              card.classList.add('reveal', 'active');
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }
  };

  // ==========================================
  // Smooth Scroll for Anchor Links
  // ==========================================
  const SmoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    }
  };

  // ==========================================
  // Copy to Clipboard
  // ==========================================
  window.copyToClipboard = function(text, btn) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showCopyFeedback(btn);
      }).catch(() => {
        fallbackCopy(text, btn);
      });
    } else {
      fallbackCopy(text, btn);
    }
  };

  function fallbackCopy(text, btn) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      showCopyFeedback(btn);
    } catch (err) {
      console.error('Copy failed:', err);
    }
    
    document.body.removeChild(textarea);
  }

  function showCopyFeedback(btn) {
    if (!btn) return;
    const original = btn.innerHTML;
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Copied!`;
    btn.classList.add('btn-success');
    
    setTimeout(() => {
      btn.innerHTML = original;
      btn.classList.remove('btn-success');
    }, 2000);
  }

  // ==========================================
  // Form Validation Helper
  // ==========================================
  window.validateForm = function(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      const errorEl = field.parentElement.querySelector('.form-error');
      
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = 'var(--accent-red)';
        if (errorEl) errorEl.textContent = 'This field is required';
      } else if (field.type === 'email' && !isValidEmail(field.value)) {
        isValid = false;
        field.style.borderColor = 'var(--accent-red)';
        if (errorEl) errorEl.textContent = 'Please enter a valid email';
      } else {
        field.style.borderColor = '';
        if (errorEl) errorEl.textContent = '';
      }
    });
    
    return isValid;
  };

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ==========================================
  // Download File Helper
  // ==========================================
  window.downloadFile = function(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType || 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  window.downloadBlob = function(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ==========================================
  // Number Formatting
  // ==========================================
  window.formatNumber = function(num, decimals) {
    if (isNaN(num)) return '0';
    return Number(num).toLocaleString('en-IN', {
      minimumFractionDigits: decimals || 0,
      maximumFractionDigits: decimals || 2
    });
  };

  window.formatCurrency = function(num) {
    if (isNaN(num)) return 'Rs. 0';
    return 'Rs. ' + Number(num).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // ==========================================
  // Initialize All
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    NavbarManager.init();
    MobileMenu.init();
    ScrollReveal.init();
    Accordion.init();
    SearchManager.init();
    CategoryFilter.init();
    SmoothScroll.init();
  });

})();
