'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, CustomEase, useGSAP);

/** Lets the hero show again (see the guard script in app/layout.tsx). */
const releaseHero = () => document.documentElement.classList.remove('motion-pending');

/**
 * All page animation lives here, scoped to this wrapper. Content is fully visible
 * without it: elements are only hidden by GSAP itself, at the moment it animates them,
 * and everything (including SplitText) is reverted on cleanup or reduced motion.
 */
export default function Motion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Signature ease: quick start, long soft landing
      CustomEase.create('ak', '0.16, 1, 0.3, 1');

      try {
        /* ---------- Everything that moves: only when motion is welcome ---------- */
        mm.add('(prefers-reduced-motion: no-preference)', (_ctx, contextSafe) => {
          const q = gsap.utils.selector(scope);
          // Event-handler tweens must join this context so they're reverted on cleanup
          const safe = (fn: (e: Event) => void) => (contextSafe ? contextSafe(fn) : fn) as EventListener;
          const cleanups: (() => void)[] = [];
          const listen = (el: Element, type: string, fn: EventListener) => {
            el.addEventListener(type, fn);
            cleanups.push(() => el.removeEventListener(type, fn));
          };

          /* Hero entrance: lines rise, photo settles, eyebrow decodes, badge spins in */
          const eyebrow = q('.hero__intro .eyebrow')[0];
          const hero = gsap
            .timeline({ defaults: { ease: 'ak' } })
            .from(q('[data-anim="nav"]'), { y: -16, autoAlpha: 0, duration: 0.8, stagger: 0.05 })
            .from(q('.hero [data-anim="hero-line"]'), { yPercent: 110, duration: 1.3, stagger: 0.09 }, 0.1)
            .from(q('[data-anim="hero-portrait"]'), { y: 90, autoAlpha: 0, duration: 1.5 }, 0.2)
            .from(q('.hero__frame img'), { scale: 1.35, duration: 2 }, 0.2)
            .from(q('[data-anim="hero-fade"]'), { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.5)
            .from(q('.ring'), { scale: 0, rotation: -140, duration: 1.4, ease: 'back.out(1.7)' }, 0.9);
          if (eyebrow?.textContent) {
            hero.to(
              eyebrow,
              { duration: 1.1, ease: 'none', scrambleText: { text: eyebrow.textContent, chars: 'upperCase', speed: 0.5 } },
              0.55,
            );
          }
          releaseHero();

          /* Always-on loops: badge rotation and the ticker, both sped up by scroll velocity */
          const spin = gsap.to(q('[data-anim="ring"]'), { rotation: 360, duration: 18, ease: 'none', repeat: -1 });
          const loops: gsap.core.Tween[] = [spin];
          const track = q('[data-anim="marquee"]')[0];
          if (track) loops.push(gsap.to(track, { xPercent: -50, duration: 32, ease: 'none', repeat: -1 }));
          ScrollTrigger.create({
            onUpdate: (self) => {
              const boost = gsap.utils.clamp(1, 6, Math.abs(self.getVelocity()) / 260);
              loops.forEach((l) => l.timeScale(self.direction * boost));
              gsap.to(loops, { timeScale: self.direction, duration: 1.2, ease: 'power2.out', overwrite: true });
            },
          });

          /* Reading progress bar */
          gsap.fromTo(
            q('[data-anim="progress"]'),
            { scaleX: 0 },
            { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } },
          );

          /* Header slides away while scrolling down, returns on the way up (never while the menu is open) */
          const header = q('.site-header')[0];
          if (header) {
            const hide = gsap.to(header, { yPercent: -150, duration: 0.4, ease: 'power2.out', paused: true });
            ScrollTrigger.create({
              start: 'top -200',
              end: 'max',
              onUpdate: (self) => {
                const busy = header.querySelector('.nav__list.is-open') || header.contains(document.activeElement);
                if (self.direction === 1 && !busy) hide.play();
                else hide.reverse();
              },
              onLeaveBack: () => hide.reverse(),
            });
            listen(header, 'focusin', safe(() => hide.reverse()));
          }

          /* Section titles: characters rise out of word masks */
          q('[data-split]').forEach((el) => {
            const split = SplitText.create(el, { type: 'words,chars', mask: 'words' });
            gsap.from(split.chars, {
              yPercent: 115,
              rotate: 8,
              duration: 1.1,
              ease: 'ak',
              stagger: 0.022,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            });
          });

          /* About text lights up word by word as it scrolls past */
          q('[data-anim="words"]').forEach((el) => {
            const split = SplitText.create(el, { type: 'words' });
            gsap.fromTo(
              split.words,
              { opacity: 0.16 },
              {
                opacity: 1,
                ease: 'none',
                stagger: 0.1,
                scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 58%', scrub: true },
              },
            );
          });

          /* Notes, panels and other blocks */
          q('[data-anim="heading"]').forEach((el) => {
            gsap.from(el, {
              y: 40,
              autoAlpha: 0,
              duration: 1,
              ease: 'ak',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            });
          });

          /* Cards: rise in small batches while their photos wipe open */
          q('[data-anim="cards"]').forEach((group) => {
            const items = group.querySelectorAll<HTMLElement>('[data-anim-item]');
            gsap.set(items, { y: 48, autoAlpha: 0 });
            ScrollTrigger.batch(items, {
              start: 'top 90%',
              once: true,
              onEnter: (batch) => {
                gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1, ease: 'ak', stagger: 0.1, overwrite: true });
                const media = batch.flatMap((b) => Array.from(b.querySelectorAll('.media')));
                if (media.length) {
                  gsap.fromTo(
                    media,
                    { clipPath: 'inset(0% 0% 100% 0%)' },
                    { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut', stagger: 0.1, clearProps: 'clipPath' },
                  );
                }
              },
            });
          });

          /* Projects: screenshot wipes up, the number decodes, then the text follows */
          q('[data-anim="project"]').forEach((card) => {
            const media = card.querySelector('[data-anim="media"]');
            const text = card.querySelector('[data-anim="project-text"]');
            const num = card.querySelector<HTMLElement>('[data-anim="num"]');
            const tl = gsap
              .timeline({ scrollTrigger: { trigger: card, start: 'top 82%', once: true } })
              .fromTo(
                media,
                { clipPath: 'inset(100% 0% 0% 0%)' },
                { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut', clearProps: 'clipPath' },
              )
              .from(text, { y: 32, autoAlpha: 0, duration: 0.9, ease: 'ak' }, '-=0.55');
            if (num?.textContent) {
              tl.to(num, { duration: 0.9, scrambleText: { text: num.textContent, chars: '0123456789', speed: 0.6 } }, '<');
            }
          });

          /* Process: a yellow line draws across as the steps scroll by */
          const processList = q('.process')[0];
          if (processList) {
            gsap.fromTo(
              q('[data-anim="track"]'),
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: { trigger: processList, start: 'top 85%', end: 'bottom 65%', scrub: 0.5 },
              },
            );
          }

          /* Contact headline */
          const contact = q('#contact')[0];
          if (contact) {
            gsap
              .timeline({ scrollTrigger: { trigger: contact, start: 'top 75%', once: true }, defaults: { ease: 'ak' } })
              .from(q('[data-anim="contact-line"]'), { yPercent: 110, duration: 1.2, stagger: 0.15 })
              .from(q('[data-anim="contact-button"]'), { scale: 0, rotation: -90, autoAlpha: 0, duration: 1, ease: 'back.out(1.6)' }, '-=0.7')
              .from(q('[data-anim="contact-fade"]'), { y: 16, autoAlpha: 0, duration: 0.7 }, '<0.1');
          }

          /* Footer: the giant name rises letter by letter as the page ends */
          const footerName = q('[data-anim="footer-name"]')[0];
          if (footerName) {
            // aria: 'none' keeps the link's own accessible name ("Ali Khan, back to top")
            const split = SplitText.create(footerName, { type: 'chars', mask: 'chars', aria: 'none' });
            gsap.from(split.chars, {
              yPercent: 100,
              ease: 'none',
              stagger: 0.06,
              scrollTrigger: { trigger: footerName, start: 'top bottom', end: 'bottom 92%', scrub: 0.6 },
            });
          }

          /* Buttons: quick hover lift, press feedback and an arrow nudge */
          q('.btn, .round, .media__cta, .work__link').forEach((btn) => {
            if (btn.classList.contains('is-pending')) return;
            const arrow = btn.querySelector('.ico');
            // Magnetic elements own x/y; they only get the scale and arrow feedback here
            const magnetic = btn.hasAttribute('data-magnetic');
            const lift = btn.classList.contains('btn') ? -3 : 0;
            listen(btn, 'pointerenter', safe(() => {
              if (!magnetic) gsap.to(btn, { y: lift, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
              if (arrow) gsap.to(arrow, { x: 3, y: -3, rotate: 45, duration: 0.35, ease: 'back.out(2)', overwrite: 'auto' });
            }));
            listen(btn, 'pointerleave', safe(() => {
              gsap.to(btn, { ...(magnetic ? {} : { y: 0 }), scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
              if (arrow) gsap.to(arrow, { x: 0, y: 0, rotate: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
            }));
            listen(btn, 'pointerdown', safe(() => gsap.to(btn, { scale: 0.95, duration: 0.1, ease: 'power2.out', overwrite: 'auto' })));
            listen(btn, 'pointerup', safe(() => gsap.to(btn, { scale: 1, duration: 0.25, ease: 'back.out(3)', overwrite: 'auto' })));
          });

          return () => cleanups.forEach((fn) => fn());
        });

        /* ---------- Mouse-only polish: magnetic buttons and 3D tilt on project screenshots ---------- */
        mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', (_ctx, contextSafe) => {
          const safe = (fn: (e: Event) => void) => (contextSafe ? contextSafe(fn) : fn) as EventListener;
          const cleanups: (() => void)[] = [];
          const listen = (el: Element, type: string, fn: EventListener) => {
            el.addEventListener(type, fn);
            cleanups.push(() => el.removeEventListener(type, fn));
          };

          gsap.utils.toArray<HTMLElement>('[data-magnetic]', scope.current).forEach((el) => {
            const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
            const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
            listen(el, 'pointermove', safe((e) => {
              const { clientX, clientY } = e as PointerEvent;
              const r = el.getBoundingClientRect();
              xTo((clientX - r.left - r.width / 2) * 0.35);
              yTo((clientY - r.top - r.height / 2) * 0.35);
            }));
            listen(el, 'pointerleave', safe(() => {
              xTo(0);
              yTo(0);
            }));
          });

          gsap.utils.toArray<HTMLElement>('[data-tilt]', scope.current).forEach((el) => {
            gsap.set(el, { transformPerspective: 1200 });
            const rxTo = gsap.quickTo(el, 'rotationX', { duration: 0.7, ease: 'power3.out' });
            const ryTo = gsap.quickTo(el, 'rotationY', { duration: 0.7, ease: 'power3.out' });
            listen(el, 'pointermove', safe((e) => {
              const { clientX, clientY } = e as PointerEvent;
              const r = el.getBoundingClientRect();
              ryTo(((clientX - r.left) / r.width - 0.5) * 8);
              rxTo(-((clientY - r.top) / r.height - 0.5) * 8);
            }));
            listen(el, 'pointerleave', safe(() => {
              rxTo(0);
              ryTo(0);
            }));
          });

          return () => cleanups.forEach((fn) => fn());
        });

        /* ---------- Desktop scroll depth: parallax photos and a layered hero exit ---------- */
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

          const heroEl = scope.current?.querySelector('.hero');
          if (heroEl) {
            const exit = { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: 0.4 };
            gsap.to(heroEl.querySelector('.hero__title'), { y: -90, ease: 'none', scrollTrigger: exit });
            gsap.to(heroEl.querySelector('.hero__statement'), { y: -50, ease: 'none', scrollTrigger: exit });
            gsap.to(heroEl.querySelector('.hero__frame'), { yPercent: 12, ease: 'none', scrollTrigger: exit });
          }
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
