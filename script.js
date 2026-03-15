/* KSHETRA — Single pinned viewport, scroll-driven slides */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  lucide.createIcons();

  // ─── Hero entrance (on load) ───
  const heroTL = gsap.timeline({ delay: 0.3 });
  heroTL
    .from('.hero-tag', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' })
    .from('.hero-word', { opacity: 0, y: 40, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '-=0.2')
    .from('.hero-sub', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.15')
    .from('.hero-cta', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.3');

  // ─── Main scroll-driven timeline ───
  // 6 slides, scroll spacer is 600vh
  // Each slide gets ~100vh of scroll = ~16.6% of total
  const main = gsap.timeline({
    scrollTrigger: {
      trigger: '#scroll-spacer',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
    }
  });

  const fadeDur = 0.04;  // fast crossfade
  const holdDur = 0.12;  // time to hold each slide

  // Slide 1 → 2: Hero → Problem
  main
    .to('.slide-hero', { opacity: 0, scale: 0.96, duration: fadeDur }, holdDur)
    .fromTo('.slide-problem',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: fadeDur }, holdDur
    )
    .from('.problem-line', { opacity: 0, y: 30, stagger: 0.02, duration: 0.03 }, holdDur + fadeDur * 0.5)

  // Slide 2 → 3: Problem → Demo
    .to('.slide-problem', { opacity: 0, duration: fadeDur }, holdDur * 2 + fadeDur)
    .fromTo('.slide-demo',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: fadeDur }, holdDur * 2 + fadeDur
    )
    .from('.demo-browser', { opacity: 0, y: 50, scale: 0.95, duration: 0.04 }, holdDur * 2 + fadeDur * 1.5)
    .from('.demo-phone', { opacity: 0, y: 60, duration: 0.04 }, holdDur * 2 + fadeDur * 1.8)

    // Demo screen transitions (within the demo hold period)
    .to('.screen-1', { opacity: 0, duration: 0.02 }, holdDur * 2 + fadeDur * 2 + 0.03)
    .to('.screen-2', { opacity: 1, duration: 0.02 }, holdDur * 2 + fadeDur * 2 + 0.04)
    .to('.screen-2', { opacity: 0, duration: 0.02 }, holdDur * 2 + fadeDur * 2 + 0.08)
    .to('.screen-3', { opacity: 1, duration: 0.02 }, holdDur * 2 + fadeDur * 2 + 0.09)
    .to('.chat-msg:nth-child(1)', { opacity: 1, duration: 0.015 }, holdDur * 2 + fadeDur * 2 + 0.10)
    .to('.chat-msg:nth-child(2)', { opacity: 1, duration: 0.015 }, holdDur * 2 + fadeDur * 2 + 0.11)
    .to('.chat-msg:nth-child(3)', { opacity: 1, duration: 0.015 }, holdDur * 2 + fadeDur * 2 + 0.12)
    .from('.mobile-notif', { opacity: 0, y: 10, stagger: 0.01, duration: 0.02 }, holdDur * 2 + fadeDur * 2 + 0.06)

  // Slide 3 → 4: Demo → Skills
    .to('.slide-demo', { opacity: 0, duration: fadeDur }, holdDur * 3 + fadeDur * 2)
    .fromTo('.slide-skills',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: fadeDur }, holdDur * 3 + fadeDur * 2
    )
    .from('.skill-card', { opacity: 0, y: 30, stagger: 0.008, duration: 0.03 }, holdDur * 3 + fadeDur * 2.5)

  // Slide 4 → 5: Skills → Two-Way
    .to('.slide-skills', { opacity: 0, duration: fadeDur }, holdDur * 4 + fadeDur * 3)
    .fromTo('.slide-twoway',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: fadeDur }, holdDur * 4 + fadeDur * 3
    )
    .from('.cmd-card', { opacity: 0, x: -30, stagger: 0.008, duration: 0.03 }, holdDur * 4 + fadeDur * 3.5)
    .from('.alert-card', { opacity: 0, x: 30, stagger: 0.008, duration: 0.03 }, holdDur * 4 + fadeDur * 3.5)

  // Slide 5 → 6: Two-Way → CTA
    .to('.slide-twoway', { opacity: 0, duration: fadeDur }, holdDur * 5 + fadeDur * 4)
    .fromTo('.slide-cta',
      { opacity: 0 },
      { opacity: 1, duration: fadeDur }, holdDur * 5 + fadeDur * 4
    );

  // ─── Progress dots ───
  const dots = document.querySelectorAll('.progress-dot');
  const slideCount = 6;

  ScrollTrigger.create({
    trigger: '#scroll-spacer',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const activeIndex = Math.min(Math.floor(self.progress * slideCount), slideCount - 1);
      dots.forEach((dot, i) => {
        dot.style.background = i === activeIndex ? '#171717' : '#d4d4d4';
        dot.style.width = i === activeIndex ? '24px' : '8px';
        dot.style.borderRadius = '4px';
      });
    }
  });

  // ─── Stat counters ───
  let counted = false;
  ScrollTrigger.create({
    trigger: '#scroll-spacer',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      if (counted) return;
      // Trigger when we're in the problem slide (~16-33% of scroll)
      if (self.progress > 0.1 && self.progress < 0.4) {
        counted = true;
        document.querySelectorAll('.stat-number').forEach(el => {
          const target = parseFloat(el.dataset.target);
          const isDecimal = target % 1 !== 0;
          gsap.to(el, {
            duration: 2, ease: 'power2.out',
            onUpdate: function() {
              const v = target * this.progress();
              el.textContent = isDecimal ? v.toFixed(1) : Math.round(v);
            }
          });
        });
      }
    }
  });
});
