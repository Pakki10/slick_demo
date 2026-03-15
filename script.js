/* ═══════════════════════════════════════════
   KSHETRA — CONTINUOUS FLOWING SCROLL
   No Lenis. No pins. No scrub.
   Just gsap.from() + stagger + ScrollTrigger.
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger);
  lucide.createIcons();

  // ─── HERO — word-by-word reveal (on load, no scroll needed) ───
  const heroTL = gsap.timeline({ delay: 0.3 });
  heroTL
    .from('.hero-tag', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
    .from('.hero-word', { opacity: 0, y: 40, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
    .from('.hero-sub', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' }, '-=0.2')
    .from('.hero-cta', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' }, '-=0.4');

  // ─── PROBLEM — lines stagger in ───
  gsap.from('.problem-line', {
    opacity: 0, y: 40,
    duration: 0.7,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: { trigger: '#problem', start: 'top 80%' }
  });

  gsap.from('.problem-answer', {
    opacity: 0, y: 20,
    duration: 0.7,
    delay: 0.6,
    ease: 'power3.out',
    scrollTrigger: { trigger: '#problem', start: 'top 80%' }
  });

  // Count up stat numbers
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const isDecimal = target % 1 !== 0;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          duration: 2, ease: 'power2.out',
          onUpdate: function() {
            const v = target * this.progress();
            el.textContent = isDecimal ? v.toFixed(1) : Math.round(v);
          }
        });
      }
    });
  });

  // ─── DEMO — slide in mockups, auto-play screens ───
  gsap.from('.demo-label', {
    opacity: 0, y: 20, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '#demo', start: 'top 80%' }
  });

  gsap.from('.demo-heading', {
    opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '#demo', start: 'top 80%' }
  });

  gsap.from('.demo-browser', {
    opacity: 0, y: 60, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: '#demo', start: 'top 75%' }
  });

  gsap.from('.demo-phone', {
    opacity: 0, y: 80, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '#demo', start: 'top 75%' }
  });

  gsap.from('.mobile-notif', {
    opacity: 0, y: 15, duration: 0.5, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.demo-phone', start: 'top 80%' }
  });

  // Auto-play demo screens when browser enters viewport
  ScrollTrigger.create({
    trigger: '.demo-browser',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      const tl = gsap.timeline({ delay: 1.2 });
      tl
        .to('.screen-1', { opacity: 0, duration: 0.4 })
        .to('.screen-2', { opacity: 1, duration: 0.4 }, '-=0.2')
        .to({}, { duration: 2 })
        .to('.screen-2', { opacity: 0, duration: 0.4 })
        .to('.screen-3', { opacity: 1, duration: 0.4 }, '-=0.2')
        .to('.chat-msg:nth-child(1)', { opacity: 1, duration: 0.4 }, '+=0.4')
        .to('.chat-msg:nth-child(2)', { opacity: 1, duration: 0.4 }, '+=0.3')
        .to('.chat-msg:nth-child(3)', { opacity: 1, duration: 0.4 }, '+=0.3');
    }
  });

  // ─── SKILLS — ONE trigger on container, stagger cards ───
  gsap.from('.skills-heading', {
    opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '#skills', start: 'top 80%' }
  });

  gsap.from('.skill-card', {
    opacity: 0, y: 50,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.skills-grid',
      start: 'top 85%'
    }
  });

  // ─── TWO-WAY — ONE trigger per column, stagger cards ───
  gsap.from('.twoway-heading', {
    opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '#two-way', start: 'top 80%' }
  });

  gsap.from('.cmd-card', {
    opacity: 0, x: -40,
    duration: 0.5,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.cmd-cards',
      start: 'top 85%'
    }
  });

  gsap.from('.alert-card', {
    opacity: 0, x: 40,
    duration: 0.5,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.alert-cards',
      start: 'top 85%'
    }
  });

  // ─── CTA ───
  gsap.from('.cta-heading', {
    opacity: 0, y: 30, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '#cta', start: 'top 80%' }
  });

  gsap.from('.cta-sub', {
    opacity: 0, y: 20, duration: 0.7, delay: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '#cta', start: 'top 80%' }
  });

  gsap.from('.cta-btn', {
    opacity: 0, y: 20, scale: 0.95, duration: 0.8, delay: 0.3, ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '#cta', start: 'top 80%' }
  });

});
