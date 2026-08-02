import { business } from '../../data/business';
import { useReveal } from '../../animations/reveal';

function SiteFooter() {
  const revealRef = useReveal({ y: 16 });

  return (
    <footer className="site-footer" id="contact" ref={revealRef}>
      <div>
        <p className="eyebrow">Visit us</p>
        <h2>{business.name}</h2>
        <p>{business.address}</p>
      </div>
      <div>
        <p className="eyebrow">Reach out</p>
        <p>{business.phone}</p>
        <p>{business.whatsapp}</p>
      </div>
      <div>
        <p className="eyebrow">Hours</p>
        {business.openingHours.map((hour) => (
          <p key={hour}>{hour}</p>
        ))}
      </div>
    </footer>
  );
}

export default SiteFooter;
