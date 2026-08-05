import { useEffect, useRef } from 'react';
import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS_LOCATION } from '../../data/business';
import { useReducedMotion } from '../../animations/reveal';
import ShopMap from '../contact/ShopMap';
import SectionWave from '../shared/SectionWave';

gsap.registerPlugin(ScrollTrigger);

function LocationSection() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const whatsappMessage = encodeURIComponent(
    'Hi The Shakerz, I would like to place an order.',
  );
  const whatsappUrl =
    `https://wa.me/${BUSINESS_LOCATION.whatsappNumber}?text=${whatsappMessage}`;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const context = gsap.context(() => {
      const animatedElements = [
        '.visit-card',
        '.visit-map',
        '.visit-intro > *',
        '.visit-detail',
        '.visit-actions',
        '.leaflet-marker-icon',
      ];

      if (reducedMotion) {
        gsap.set(animatedElements, {
          clearProps: 'all',
          opacity: 1,
          y: 0,
          scale: 1,
          clipPath: 'inset(0% round 26px)',
        });
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
        },
      });

      timeline
        .from('.visit-card', { opacity: 0, y: 26, duration: 0.8 })
        .from(
          '.visit-map',
          {
            opacity: 0,
            clipPath: 'inset(10% 10% 10% 10% round 40px)',
            duration: 0.8,
          },
          0.12,
        )
        .from(
          '.visit-intro > *',
          { opacity: 0, y: 20, duration: 0.65, stagger: 0.08 },
          0.22,
        )
        .from(
          '.visit-detail',
          { opacity: 0, y: 16, duration: 0.55, stagger: 0.07 },
          0.32,
        )
        .from('.visit-actions', { opacity: 0, y: 14, duration: 0.55 }, 0.48)
        .from(
          '.leaflet-marker-icon',
          { opacity: 0, scale: 0.72, duration: 0.5 },
          0.5,
        );
    }, section);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      className="section location-section visit-section section-band section-band-secondary"
      id="contact"
      ref={sectionRef}
    >
      <SectionWave position="top" fill="var(--shakerz-secondary-cream)" variant="asymmetric" />
      <div className="section__content">
        <div className="location-card visit-card">
          <ShopMap location={BUSINESS_LOCATION} />

          <div className="location-intro visit-intro">
            <p className="eyebrow">Visit or order</p>
            <h2>We’re right in<br />the heart of the<br />city.</h2>
            <p className="location-copy">
              Drop by for a fresh shake, or reach out for pickup and event requests.
            </p>
          </div>

          <div className="location-details visit-details">
            <div className="location-item visit-detail">
              <MapPin size={19} aria-hidden="true" />
              <div>
                <strong>Address</strong>
                <p>{BUSINESS_LOCATION.address}</p>
              </div>
            </div>
            <div className="location-item visit-detail">
              <Phone size={19} aria-hidden="true" />
              <div>
                <strong>Phone</strong>
                <a href={`tel:${BUSINESS_LOCATION.phoneHref}`}>
                  {BUSINESS_LOCATION.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="location-item visit-detail">
              <MessageCircle size={19} aria-hidden="true" />
              <div>
                <strong>WhatsApp</strong>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  {BUSINESS_LOCATION.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="location-item visit-detail">
              <Clock size={19} aria-hidden="true" />
              <div>
                <strong>Hours</strong>
                {BUSINESS_LOCATION.openingHours.map(({ days, hours }) => (
                  <p key={days}><span>{days}:</span> {hours}</p>
                ))}
              </div>
            </div>

            <div className="location-actions visit-actions">
              <a
                className="button primary"
                href={BUSINESS_LOCATION.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Get Directions
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                className="button whatsapp-button"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Order
              </a>
              <a className="button secondary" href={`tel:${BUSINESS_LOCATION.phoneHref}`}>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocationSection;
