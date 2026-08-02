import { ArrowRight, Phone, MapPin, MessageCircle } from 'lucide-react';
import { business } from '../../data/business';
import { useReveal } from '../../animations/reveal';

function LocationSection() {
  const revealRef = useReveal();

  return (
    <section className="section location-section" ref={revealRef}>
      <div className="location-card">
        <div>
          <p className="eyebrow">Visit or order</p>
          <h2>We’re right in the heart of the city.</h2>
          <p className="location-copy">
            Drop by for a fresh shake, or reach out for pickup and event requests.
          </p>
        </div>
        <div className="location-details">
          <div className="location-item">
            <MapPin size={18} />
            <div>
              <strong>Address</strong>
              <p>{business.address}</p>
            </div>
          </div>
          <div className="location-item">
            <Phone size={18} />
            <div>
              <strong>Phone</strong>
              <p>{business.phone}</p>
            </div>
          </div>
          <div className="location-item">
            <MessageCircle size={18} />
            <div>
              <strong>WhatsApp</strong>
              <p>{business.whatsapp}</p>
            </div>
          </div>
          <div className="location-actions">
            <a className="button primary" href="#home">
              Get Directions
              <ArrowRight size={16} />
            </a>
            <a className="button secondary" href="#contact">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocationSection;
