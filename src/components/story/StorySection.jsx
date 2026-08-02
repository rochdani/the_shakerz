import { useReveal } from '../../animations/reveal';
import { business } from '../../data/business';
import { assetPath } from '../../utils/assetPath';
import { ArrowRight } from 'lucide-react';

function StorySection() {
  const revealRef = useReveal({ y: 20, scale: 0.96 });

  return (
    <section className="story-section section" id="story">
      <div className="story-card" ref={revealRef}>
        <div className="story-visual">
          <img src={assetPath('/assets/shop/shop-interior.png')} alt="The milkshake shop interior" loading="lazy" />
          <img src={assetPath('/assets/shop/preparation.png')} alt="Fresh shake preparation" loading="lazy" />
        </div>
        <div className="story-copy">
          <p className="eyebrow">Our story</p>
          <h2>{business.storyTitle}</h2>
          <p>{business.storyBody}</p>
          <div className="story-points">
            <span>Freshly prepared milkshakes</span>
            <span>Premium ingredients</span>
            <span>Custom flavour combinations</span>
            <span>Welcoming local shop experience</span>
          </div>
          <a href="#contact" className="button primary">
            Visit the shop
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default StorySection;
