'use client';

import { useEffect, useRef, useState } from 'react';
import { navLinks, profile } from '@/content/site';
import { ArrowIcon } from './Icons';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Solid background once the page scrolls past the top of the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((s): s is HTMLElement => Boolean(s));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with Escape or an outside click
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-header__bar">
        <a className="logo" href="#home" data-anim="nav" aria-label={`${profile.name}, back to top`}>
          {profile.name.toUpperCase()}
          <span className="dot">.</span>
        </a>

        <nav className="nav" aria-label="Main" ref={navRef}>
          <button
            ref={toggleRef}
            className="nav__toggle"
            type="button"
            aria-expanded={open}
            aria-controls="nav-list"
            onClick={() => setOpen((o) => !o)}
            data-anim="nav"
          >
            <span className="nav__bars" aria-hidden="true" />
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
          <ul className={`nav__list${open ? ' is-open' : ''}`} id="nav-list">
            {navLinks.map((link) => (
              <li key={link.href} data-anim="nav">
                <a
                  href={link.href}
                  aria-current={active === link.href ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn--yellow btn--sm site-header__cta" href="#contact" data-anim="nav">
          Hire Me <ArrowIcon />
        </a>
      </div>
    </header>
  );
}
