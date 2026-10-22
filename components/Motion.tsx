'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Lets the hero show again (see the guard script in app/layout.tsx). */
const releaseHero = () => document.documentElement.classList.remove('motion-pending');

/**
 * All page animation lives here, scoped to this wrapper. Content is fully visible
 * without it: elements are only hidden by GSAP itself, at the moment it animates them.
 */
export default function Motion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      try {
        /* ---------- Everything that moves: only when motion is welcome ---------- */
        mm.add('(prefers-reduced-motion: no-preference)', (_ctx, contextSafe) => {
          const q = gsap.utils.selector(scope);
          // Event-handler tweens must join this context so they're reverted on cleanup
          const safe = (fn: () => void) => (contextSafe ? contextSafe(fn) : fn) as EventListener;

          // Hero entrance
          gsap
            .timeline({ defaults: { ease: 'power3.out' } })
            .from(q('[data-anim="nav"]'), { y: -14, autoAlpha: 0, duration: 0.6, stagger: 0.05 })
            .from(q('.hero [data-anim="hero-line"]'), { yPercent: 105, duration: 1, stagger: 0.08 }, 0.1)
            .from(q('[data-anim="hero-portrait"]'), { y: 48, autoAlpha: 0, duration: 1.2 }, 0.2)
            .from(q('[data-anim="hero-fade"]'), { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.45);
          releaseHero();

          // Section headings
          q('[data-anim="heading"]').forEach((el) => {
            gsap.from(el, {
              y: 40,
              autoAlpha: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            });
          });

          // Service, value, process and gallery cards: short staggers as they arrive
          q('[data-anim="cards"]').forEach((group) => {
            const items = group.querySelectorAll<HTMLElement>('[data-anim-item]');
            gsap.set(items, { y: 36, autoAlpha: 0 });
            ScrollTrigger.batch(items, {
              start: 'top 90%',
              once: true,
              onEnter: (batch) =>
                gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1, overwrite: true }),
            });
          });

          // Projects: image wipes up into view, then the text follows
          q('[data-anim="project"]').forEach((card) => {
            const media = card.querySelector('[data-anim="media"]');
            const text = card.querySelector('[data-anim="project-text"]');
            gsap
              .timeline({ scrollTrigger: { trigger: card, start: 'top 85%', once: true } })
              .fromTo(
                media,
                { clipPath: 'inset(100% 0% 0% 0%)' },
                { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power3.inOut', clearProps: 'clipPath' },
              )
              .from(text, { y: 24, autoAlpha: 0, duration: 0.7, ease: 'power3.out' }, '-=0.45');
          });

          // Contact headline
          const contact = q('#contact')[0];
          if (contact) {
            gsap
              .timeline({ scrollTrigger: { trigger: contact, start: 'top 75%', once: true }, defaults: { ease: 'power3.out' } })
              .from(q('[data-anim="contact-line"]'), { yPercent: 105, duration: 1, stagger: 0.15 })
              .from(q('[data-anim="contact-button"]'), { scale: 0.6, autoAlpha: 0, duration: 0.7 }, '-=0.5')
              .from(q('[data-anim="contact-fade"]'), { y: 16, autoAlpha: 0, duration: 0.6 }, '<0.1');
          }

          // Buttons: quick hover lift, press feedback and an arrow nudge
          const cleanups: (() => void)[] = [];
          q('.btn, .round, .media__cta, .work__link').forEach((btn) => {
            if (btn.classList.contains('is-pending')) return;
            const arrow = btn.querySelector('.ico');
            const lift = btn.classList.contains('btn') ? -2 : 0;
            const enter = safe(() => {
              gsap.to(btn, { y: lift, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
              if (arrow) gsap.to(arrow, { x: 2, y: -2, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
            });
            const leave = safe(() => {
              gsap.to(btn, { y: 0, scale: 1, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
              if (arrow) gsap.to(arrow, { x: 0, y: 0, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
            });
            const down = safe(() => {
              gsap.to(btn, { scale: 0.96, duration: 0.1, ease: 'power2.out', overwrite: 'auto' });
            });
            const up = safe(() => {
              gsap.to(btn, { scale: 1, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
            });
            const pairs: [string, EventListener][] = [
              ['pointerenter', enter],
              ['pointerleave', leave],
              ['pointerdown', down],
              ['pointerup', up],
              ['focus', enter],
              ['blur', leave],
            ];
            pairs.forEach(([type, fn]) => btn.addEventListener(type, fn));
            cleanups.push(() => pairs.forEach(([type, fn]) => btn.removeEventListener(type, fn)));
          });

          return () => cleanups.forEach((fn) => fn());
        });

        /* ---------- Restrained parallax: desktop + motion allowed only ---------- */
        mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
          gsap.utils.toArray<HTMLElement>('[data-parallax]', scope.current).forEach((layer) => {
            gsap.fromTo(
              layer,
              { yPercent: -5 },
              {
                yPercent: 5,
                ease: 'none',
                scrollTrigger: { trigger: layer.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
              },
            );
          });
        });

        // Reduced motion: nothing animates, the hero is shown immediately.
        mm.add('(prefers-reduced-motion: reduce)', releaseHero);

        // Web fonts can change heights slightly; recalculate trigger positions once they're in.
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
      } catch (err) {
        // If anything goes wrong, undo partial animation state so all content is visible.
        console.error('Animation setup failed', err);
        mm.revert();
        releaseHero();
      }

      return () => mm.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
