import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '../../data/faq';
import { useReveal, useReducedMotion } from '../../animations/reveal';

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const revealRef = useReveal();
  const reducedMotion = useReducedMotion();
  const heightTransition = { duration: reducedMotion ? 0.01 : 0.32, ease: 'easeInOut' };

  return (
    <section className="section faq-section" ref={revealRef}>
      <div className="faq-showcase">
        <div className="section-heading center">
          <p className="eyebrow">FAQ</p>
          <h2>Everything you need to know before your next visit.</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <article className={`faq-item ${isOpen ? 'open' : ''}`} key={item.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span>{item.question}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={heightTransition}>
                      <ChevronDown size={18} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={heightTransition}
                      style={{ overflow: 'hidden' }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
