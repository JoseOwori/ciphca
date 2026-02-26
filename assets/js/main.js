/**
* Template Name: Ciph Creative Agency
* Template URL: https://bootstrapmade.com/Ciph Creative Agency-bootstrap-agency-template/
* Updated: Jun 06 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Section path management (History API)
   * This allows URLs like ciphca.com/services instead of #services
   */
  function updateSectionPath(sectionId, updateHistory = true) {
    const cleanId = sectionId.replace('#', '');
    const path = (cleanId === 'hero' || cleanId === 'top' || cleanId === '') ? window.location.pathname.replace(/\/$/, '') : cleanId;

    // Ensure we don't duplicate the current path in history
    const currentPath = window.location.pathname.split('/').pop() || '';
    if (currentPath === path) return;

    if (updateHistory) {
      window.history.pushState({ sectionId: cleanId }, null, path);
    } else {
      window.history.replaceState({ sectionId: cleanId }, null, path);
    }
  }

  /**
   * Correct scrolling position upon page load or path-based entry.
   */
  window.addEventListener('load', function (e) {
    // Handle hash entry first for legacy/compatibility
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(target).scrollMarginTop;
          window.scrollTo({
            top: target.offsetTop - parseInt(scrollMarginTop || 0),
            behavior: 'smooth'
          });
          updateSectionPath(window.location.hash, false);
        }, 100);
        return;
      }
    }

    // Handle path-based entry (e.g., /services)
    const currentPath = window.location.pathname.split('/').pop();
    if (currentPath && currentPath !== 'index.html') {
      const target = document.getElementById(currentPath);
      if (target) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(target).scrollMarginTop;
          window.scrollTo({
            top: target.offsetTop - parseInt(scrollMarginTop || 0),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Handle smooth scrolling for navigation links and path-based URLs
   */
  document.querySelectorAll('a[href^="#"], #navmenu a').forEach(navlink => {
    navlink.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const hash = this.hash || (href === '#' ? '#top' : null);
      const isHomeLink = href === 'index.html' || (this.pathname && this.pathname.endsWith('index.html') && !this.hash);

      if (isHomeLink && (window.location.pathname === '/' || window.location.pathname.endsWith('index.html'))) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        updateSectionPath('hero');
        return;
      }

      if (!hash) return;

      const target = document.querySelector(hash);
      if (target) {
        const isSamePage = !this.pathname || this.pathname === window.location.pathname ||
          (this.pathname.endsWith('/') && window.location.pathname.endsWith('index.html')) ||
          window.location.pathname.endsWith(this.pathname);

        if (isSamePage) {
          e.preventDefault();

          document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
          this.classList.add('active');

          let scrollMarginTop = getComputedStyle(target).scrollMarginTop;
          window.scrollTo({
            top: target.offsetTop - parseInt(scrollMarginTop || 0),
            behavior: 'smooth'
          });

          updateSectionPath(hash);

          if (document.querySelector('.mobile-nav-active')) {
            mobileNavToogle();
          }
        }
      }
    });
  });

  /**
   * Handle browser back/forward buttons
   */
  window.addEventListener('popstate', function (e) {
    const sectionId = e.state ? e.state.sectionId : null;
    if (sectionId) {
      const target = document.getElementById(sectionId);
      if (target) {
        let scrollMarginTop = getComputedStyle(target).scrollMarginTop;
        window.scrollTo({
          top: target.offsetTop - parseInt(scrollMarginTop || 0),
          behavior: 'smooth'
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    let position = window.scrollY + 200;
    let foundSection = null;

    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
        foundSection = navmenulink.hash;
      }
    });

    if (foundSection) {
      updateSectionPath(foundSection, false);
    } else if (window.scrollY < 200) {
      const homeLink = Array.from(navmenulinks).find(link =>
        link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '#' || link.textContent.toLowerCase() === 'home'
      );
      if (homeLink) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        homeLink.classList.add('active');
        updateSectionPath('hero', false);
      }
    }
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Theme toggle (light / dark) with persistence and accessibility
   */
  (function () {
    const toggles = document.querySelectorAll('#theme-toggle');
    const root = document.documentElement;
    const storageKey = 'theme';

    function getStoredTheme() {
      try {
        return localStorage.getItem(storageKey);
      } catch (e) {
        return null;
      }
    }

    function applyTheme(theme) {
      if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        toggles.forEach(toggle => {
          if (toggle) {
            toggle.innerHTML = '<i class="bi bi-sun"></i>';
            toggle.setAttribute('aria-pressed', 'true');
          }
        });
      } else {
        root.removeAttribute('data-theme');
        toggles.forEach(toggle => {
          if (toggle) {
            toggle.innerHTML = '<i class="bi bi-moon"></i>';
            toggle.setAttribute('aria-pressed', 'false');
          }
        });
      }
    }

    // initialize theme: stored preference -> system -> light
    const stored = getStoredTheme();
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ? stored : (prefersDark ? 'dark' : 'light');
    applyTheme(initial);

    function toggleTheme() {
      const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(storageKey, current);
      } catch (e) { }
      applyTheme(current);
      try {
        if (window.AOS && typeof AOS.refresh === 'function') {
          AOS.refresh();
        }
      } catch (e) { }
    }

    toggles.forEach(toggle => {
      // Click handler
      toggle.addEventListener('click', toggleTheme);

      // Keyboard support: Space and Enter
      toggle.addEventListener('keydown', function (e) {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          toggleTheme();
        }
      });
    });
  })();

  // Set loading="lazy" on images that don't specify loading (progressive enhancement)
  document.addEventListener('DOMContentLoaded', function () {
    try {
      document.querySelectorAll('img[src^="assets/img"]:not([loading])').forEach(img => img.setAttribute('loading', 'lazy'));
    } catch (e) { }
  });

})();