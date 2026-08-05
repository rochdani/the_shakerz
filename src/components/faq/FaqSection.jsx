import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { faqItems } from '../../data/faq';
import { useReveal, useReducedMotion } from '../../animations/reveal';
import { assetPath } from '../../utils/assetPath';
import SectionWave from '../shared/SectionWave';

const REPLAY_DELAY = 8000;

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const revealRef = useReveal();
  const reducedMotion = useReducedMotion();
  const videoRef = useRef(null);
  const replayTimerRef = useRef(null);
  const isVisibleRef = useRef(false);
  const endedRef = useRef(false);
  const heightTransition = { duration: reducedMotion ? 0.01 : 0.32, ease: 'easeInOut' };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return undefined;

    const clearReplayTimer = () => {
      if (replayTimerRef.current !== null) {
        window.clearTimeout(replayTimerRef.current);
        replayTimerRef.current = null;
      }
    };

    const playFromStart = () => {
      clearReplayTimer();
      endedRef.current = false;
      video.currentTime = 0;
      video.play().catch(() => {
        // Keep the currently rendered frame visible if autoplay is unavailable.
      });
    };

    const scheduleReplay = () => {
      clearReplayTimer();
      if (!isVisibleRef.current || document.hidden) return;

      replayTimerRef.current = window.setTimeout(() => {
        replayTimerRef.current = null;
        if (isVisibleRef.current && !document.hidden) {
          playFromStart();
        }
      }, REPLAY_DELAY);
    };

    const handleEnded = () => {
      endedRef.current = true;
      scheduleReplay();
    };

    const handleVisibilityChange = () => {
      clearReplayTimer();

      if (document.hidden) {
        video.pause();
        return;
      }

      if (!isVisibleRef.current) return;

      if (endedRef.current) {
        scheduleReplay();
      } else {
        video.play().catch(() => {
          // Leave the current frame visible when playback cannot resume.
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        isVisibleRef.current = isVisible;
        clearReplayTimer();

        if (!isVisible) {
          video.pause();
          return;
        }

        if (document.hidden) return;

        if (endedRef.current) {
          scheduleReplay();
        } else {
          video.play().catch(() => {
            // Preserve the current frame if the browser blocks autoplay.
          });
        }
      },
      { threshold: [0, 0.25, 0.6] },
    );

    observer.observe(video.closest('.faq-section') || video);
    video.addEventListener('ended', handleEnded);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearReplayTimer();
      observer.disconnect();
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      video.pause();
      isVisibleRef.current = false;
      endedRef.current = false;
    };
  }, [reducedMotion]);

  return (
    <section className="section faq-section section-band section-band-primary" ref={revealRef}>
      <SectionWave position="top" fill="var(--shakerz-primary-cream)" variant="soft" />
      <div className="section__content faq-showcase">
        <div
          className={`faq-product faq-video-wrapper ${reducedMotion ? 'is-static' : ''}`}
          aria-hidden="true"
        >
          {reducedMotion ? (
            <img
              className="faq-video-fallback"
              src={assetPath('/assets/images/faq_img.png')}
              alt=""
              loading="lazy"
            />
          ) : (
            <video
              ref={videoRef}
              className="faq-video"
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
            >
              <source
                src={assetPath('/assets/images/milkshakevideos.mp4')}
                type="video/mp4"
              />
            </video>
          )}
        </div>
        <div className="faq-content">
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2>A little more before your next sip.</h2>
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
                    <span className="faq-toggle">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
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
      </div>
      <SectionWave position="bottom" fill="var(--shakerz-secondary-cream)" variant="asymmetric" />
    </section>
  );
}

export default FaqSection;
