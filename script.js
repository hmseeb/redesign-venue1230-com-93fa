/* =========================================================
   Venue 1230 — interactions
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('nav-open');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('nav-open', open);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || burger.contains(e.target)) return;
      closeNav();
    });
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById('site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-stuck', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  /* NOTE: carousel slides (.quote) are deliberately excluded — cards parked
     outside the horizontal viewport would never intersect and would stay
     invisible when the user scrolls the track. The whole track fades in. */
  var revealTargets = document.querySelectorAll(
    '.section-head, .pillar, .spaces__fig, .card, .video, .reviews__viewport, .owner__media, .owner__text, .info, .cta-band__inner, .stats, .contact__quick'
  );

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
          setTimeout(function () {
            el.classList.add('is-in');
          }, delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    Array.prototype.forEach.call(revealTargets, function (el, i) {
      el.classList.add('reveal');
      // stagger siblings within the same grid
      var siblingIndex = 0;
      var prev = el.previousElementSibling;
      while (prev && prev.classList.contains('reveal')) {
        siblingIndex++;
        prev = prev.previousElementSibling;
      }
      el.setAttribute('data-delay', String(Math.min(siblingIndex, 5) * 70));
      io.observe(el);
    });
  }

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCap = document.getElementById('lightboxCap');
  var lightboxClose = document.getElementById('lightboxClose');
  var lastFocused = null;
  /* 1x1 transparent GIF: keeps the lightbox <img> a valid, decodable image while idle */
  var LIGHTBOX_BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lastFocused = document.activeElement;
    lightboxImg.setAttribute('src', src);
    lightboxImg.setAttribute('alt', caption || 'Venue 1230 photo');
    if (lightboxCap) lightboxCap.textContent = caption || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  }

  function hideLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    if (lightboxImg) {
      lightboxImg.setAttribute('src', LIGHTBOX_BLANK);
      lightboxImg.setAttribute('alt', '');
    }
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  Array.prototype.forEach.call(document.querySelectorAll('.tile'), function (tile) {
    tile.addEventListener('click', function () {
      openLightbox(tile.getAttribute('data-full'), tile.getAttribute('data-caption'));
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', hideLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) hideLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (lightbox && !lightbox.hidden) hideLightbox();
    if (nav && nav.classList.contains('is-open')) closeNav();
  });

  /* ---------- Reviews carousel ---------- */
  var track = document.getElementById('reviewsTrack');
  var prev = document.getElementById('revPrev');
  var next = document.getElementById('revNext');

  function step() {
    if (!track) return 320;
    var card = track.querySelector('.quote');
    if (!card) return 320;
    var styles = window.getComputedStyle(track);
    var gap = parseFloat(styles.columnGap || styles.gap || '16') || 16;
    return card.getBoundingClientRect().width + gap;
  }

  function syncButtons() {
    if (!track || !prev || !next) return;
    var max = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max;
    prev.style.opacity = prev.disabled ? '.4' : '1';
    next.style.opacity = next.disabled ? '.4' : '1';
  }

  if (track && prev && next) {
    prev.addEventListener('click', function () {
      track.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    next.addEventListener('click', function () {
      track.scrollBy({ left: step(), behavior: 'smooth' });
    });
    track.addEventListener('scroll', syncButtons, { passive: true });
    window.addEventListener('resize', syncButtons);
    syncButtons();
  }
})();
