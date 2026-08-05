import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { createStaggerVariants, useReducedMotion } from '../../animations/reveal';
import { reviews } from '../../data/reviews';
import SectionWave from '../shared/SectionWave';

function ReviewSection() {
  const railRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const variants = createStaggerVariants({ stagger: 0.18, y: 14, reducedMotion });

  const scrollReviews = (direction) => {
    if (!railRef.current) return;

    railRef.current.scrollBy({
      left: direction * Math.min(railRef.current.clientWidth * 0.72, 520),
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section className="section reviews-section section-band section-band-secondary" id="reviews">
      <SectionWave position="top" fill="var(--shakerz-secondary-cream)" variant="wide" />
      <div className="section__content">
      <span className="review-doodle review-doodle-star" aria-hidden="true">✦</span>
      <span className="review-doodle review-doodle-wave" aria-hidden="true">〜</span>
      <span className="review-doodle review-doodle-spark" aria-hidden="true">✣</span>
      <div className="section-heading center">
        <p className="eyebrow">Sweet words from our guests</p>
        <h2>Loved one sip at a time.</h2>
        <p className="section-description">Real reviews from people who came for a shake and stayed for the experience.</p>
      </div>
      <motion.div
        ref={railRef}
        className="reviews-grid"
        variants={variants.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {reviews.map((review, reviewIndex) => (
          <motion.div
            className="review-slide"
            key={review.id}
            variants={variants.item}
            style={{ '--card-tilt': `${[-1.2, 0.4, 1.2][reviewIndex % 3]}deg` }}
          >
            <article className="review-card">
              <span className="review-quote" aria-hidden="true">“</span>
              <div className="stars" aria-label={`${review.rating} star review`}>
                {Array.from({ length: review.rating }).map((_, index) => (
                  <span key={index}>★</span>
                ))}
              </div>
              <p>“{review.review}”</p>
              <div className="review-author">
                <div className="avatar">{review.name.charAt(0)}</div>
                <span>
                  <strong>{review.name}</strong>
                  <small>Verified guest</small>
                </span>
              </div>
            </article>
          </motion.div>
        ))}
      </motion.div>
      <div className="reviews-controls" aria-label="Review carousel controls">
        <button type="button" onClick={() => scrollReviews(-1)} aria-label="Previous reviews">
          <ChevronLeft size={18} />
        </button>
        <button type="button" onClick={() => scrollReviews(1)} aria-label="Next reviews">
          <ChevronRight size={18} />
        </button>
      </div>
      </div>
      <SectionWave position="bottom" fill="var(--shakerz-primary-cream)" variant="soft" />
    </section>
  );
}

export default ReviewSection;
