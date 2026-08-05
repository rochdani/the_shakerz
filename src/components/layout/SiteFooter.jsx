import { useEffect, useRef } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { business } from '../../data/business';
import { useReducedMotion } from '../../animations/reveal';
import SectionWave from '../shared/SectionWave';

gsap.registerPlugin(ScrollTrigger);

function SiteFooter() {
  const footerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return undefined;

    const context = gsap.context(() => {
      const columns = '.site-footer__brand, .site-footer__column';

      if (reducedMotion) {
        gsap.set(columns, { clearProps: 'all', opacity: 1, y: 0 });
        return;
      }

      gsap.from(columns, {
        opacity: 0,
        y: 18,
        duration: 0.65,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 88%',
          once: true,
        },
      });
    }, footer);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <footer className="site-footer" id="site-footer" ref={footerRef}>
      <SectionWave
        position="top"
        fill="var(--shakerz-dark-brown)"
        variant="footer"
        className="footer-wave"
      />

      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <a className="site-footer__wordmark" href="#home" aria-label="The Shakerz home">
            <small>The</small>
            <span>Shakerz</span>
          </a>
          <p className="site-footer__tagline">Life is better shaken.</p>
          <p className="site-footer__description">
            Premium milkshakes made with love for happy shake lovers.
          </p>
          <div className="site-footer__socials" aria-label="Social media">
            <span aria-label="Instagram">ig</span>
            <span aria-label="Facebook">f</span>
            <span aria-label="TikTok">tk</span>
          </div>
        </div>

        <div className="site-footer__column">
          <h3>Visit Us</h3>
          <a
            className="site-footer__detail"
            href={business.mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={16} aria-hidden="true" />
            <span>{business.address}</span>
          </a>
        </div>

        <div className="site-footer__column">
          <h3>Reach Out</h3>
          <a className="site-footer__detail" href={business.phoneHref}>
            <Phone size={16} aria-hidden="true" />
            <span>{business.phone}</span>
          </a>
          <a className="site-footer__detail" href="mailto:theshakerz@gmail.com">
            <Mail size={16} aria-hidden="true" />
            <span>theshakerz@gmail.com</span>
          </a>
        </div>

        <div className="site-footer__column">
          <h3>Opening Hours</h3>
          {business.openingHours.map((hour) => <p key={hour}>{hour}</p>)}
        </div>

        <nav className="site-footer__column" aria-label="Footer navigation">
          <h3>Quick Links</h3>
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#story">Our Story</a>
          <a href="#reviews">Reviews</a>
        </nav>
      </div>

      <div className="site-footer__bottom">
        © 2026 The Shakerz Milk Shake Bar. All rights reserved.
      </div>
    </footer>
  );
}

export default SiteFooter;
