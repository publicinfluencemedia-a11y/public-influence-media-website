/* ================================================
   PUBLIC INFLUENCE MEDIA — script.js
   ================================================ */

/* ---- NAVBAR: scroll effect + hamburger ---- */
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const burger  = document.getElementById('navBurger');
  const mobile  = document.getElementById('navMobile');

  // scroll effect
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // hamburger toggle
  burger.addEventListener('click', function () {
    burger.classList.toggle('open');
    mobile.classList.toggle('open');
  });

  // close mobile menu on link click
  mobile.querySelectorAll('[data-scroll]').forEach(function (el) {
    el.addEventListener('click', function () {
      burger.classList.remove('open');
      mobile.classList.remove('open');
    });
  });
})();

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('[data-scroll]').forEach(function (el) {
  el.addEventListener('click', function () {
    var target = document.getElementById(el.dataset.scroll);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ---- SCROLL-REVEAL (IntersectionObserver) ---- */
(function initReveal() {
  var elements = document.querySelectorAll('.reveal');

  if (!window.IntersectionObserver) {
    // fallback: just show everything
    elements.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // stagger children if data-stagger present
          var delay = entry.target.dataset.delay || 0;
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, Number(delay));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach(function (el) { observer.observe(el); });
})();

/* ---- STAGGERED REVEAL for grids ---- */
(function initStagger() {
  var grids = document.querySelectorAll('[data-stagger-grid]');

  if (!window.IntersectionObserver) return;

  grids.forEach(function (grid) {
    var children = Array.from(grid.children);
    children.forEach(function (child) {
      child.style.opacity = '0';
      child.style.transform = 'translateY(40px)';
      child.style.transition = 'opacity .6s ease, transform .6s ease';
    });

    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          children.forEach(function (child, i) {
            setTimeout(function () {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, i * 80);
          });
          observer.unobserve(grid);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(grid);
  });
})();

/* ---- HERO stats counter animation ---- */
(function initCounters() {
  var counters = document.querySelectorAll('[data-count]');
  if (!window.IntersectionObserver) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el     = entry.target;
        var target = parseInt(el.dataset.count, 10);
        var suffix = el.dataset.suffix || '';
        var duration = 1500;
        var start  = performance.now();

        function step(now) {
          var elapsed  = now - start;
          var progress = Math.min(elapsed / duration, 1);
          // ease-out
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(function (el) { observer.observe(el); });
})();

/* ---- SERVICE CARD hover icon fill ---- */
document.querySelectorAll('.service-card').forEach(function (card) {
  var icon = card.querySelector('.service-icon');
  card.addEventListener('mouseenter', function () {
    if (icon) icon.style.background = '#0077B6';
    var svg = icon && icon.querySelector('svg');
    if (svg) svg.style.stroke = '#ffffff';
  });
  card.addEventListener('mouseleave', function () {
    if (icon) icon.style.background = '#eff6ff';
    var svg = icon && icon.querySelector('svg');
    if (svg) svg.style.stroke = '#0077B6';
  });
});

/* ---- YEAR in footer ---- */
var yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---- Active nav highlight on scroll ---- */
(function initActiveNav() {
  var sections = ['home', 'services', 'reviews', 'contact'];
  var navLinks = document.querySelectorAll('.nav-link[data-scroll]');

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY + 100;

    sections.forEach(function (id) {
      var section = document.getElementById(id);
      if (!section) return;
      var top    = section.offsetTop;
      var height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.style.color = '';
          if (link.dataset.scroll === id) {
            // already handled by CSS :hover state
          }
        });
      }
    });
  });
})();
