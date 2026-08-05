import { useReveal } from '../../animations/reveal';
import { business } from '../../data/business';
import { assetPath } from '../../utils/assetPath';
import { ArrowRight } from 'lucide-react';
import SectionWave from '../shared/SectionWave';

function StorySection() {
  const revealRef = useReveal({ y: 20, scale: 0.96 });

  return (
    <section className="story-section section section-band section-band-primary" id="story">
      <SectionWave position="top" fill="var(--shakerz-primary-cream)" variant="asymmetric" />
      <div className="section__content story-card" ref={revealRef}>
        <div className="story-copy">
          <p className="eyebrow">Our story</p>
          <h2>More than just<br />a milkshake.</h2>
          <p>{business.storyBody}</p>
          <div className="story-points">
            <span><i>01</i><b>Freshly prepared</b><small>Each shake is made when you order.</small></span>
            <span><i>02</i><b>Premium ingredients</b><small>Only our best fruits, milk and toppings.</small></span>
            <span><i>03</i><b>Custom combinations</b><small>Your shake, your way, without limits.</small></span>
            <span><i>04</i><b>Local experience</b><small>A warm café and friendly faces.</small></span>
          </div>
          <a href="#contact" className="button primary">
            Visit the shop
            <ArrowRight size={16} />
          </a>
        </div>
        <div className="story-visual">
          <img src={assetPath('/assets/shop/shop-interior.png')} alt="The milkshake shop interior" loading="lazy" />
          <img src={assetPath('/assets/shop/preparation.png')} alt="Fresh shake preparation" loading="lazy" />
          <span className="story-fresh-badge">Made fresh<br />every day</span>
        </div>
      </div>
      <SectionWave position="bottom" fill="var(--shakerz-secondary-cream)" variant="wide" />
    </section>
  );
}

export default StorySection;
