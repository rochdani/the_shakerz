import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useReducedMotion } from '../../animations/reveal';
import { gsap } from 'gsap';

const AUTOPLAY_DELAY = 4200;

function FlavourHero({ flavours }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const isHoveredRef = useRef(false);
  const activeIndexRef = useRef(0);

  const activeFlavour = useMemo(() => flavours[activeIndex], [activeIndex, flavours]);

  useEffect(() => {
    if (!heroRef.current || reducedMotion) {
      return undefined;
    }

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    timeline.fromTo(
      contentRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7 },
    );
    timeline.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.86, y: 34, rotate: -3 },
      { opacity: 1, scale: 1, y: 0, rotate: 0, duration: 0.9 },
      '-=0.35',
    );
    return () => timeline.kill();
  }, [activeIndex, reducedMotion]);

  useEffect(() => {
    if (!heroRef.current) {
      return undefined;
    }

    heroRef.current.style.setProperty('--hero-accent', activeFlavour.secondary);
    heroRef.current.style.setProperty('--hero-bg', activeFlavour.background);
    heroRef.current.style.setProperty('--hero-panel', activeFlavour.secondary);
    heroRef.current.style.setProperty('--hero-text', activeFlavour.textColor);

    return undefined;
  }, [activeFlavour]);

  const clearAutoplay = () => {
    if (autoplayTimerRef.current) {
      window.clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  const scheduleAutoplay = (fromIndex) => {
    clearAutoplay();
    if (reducedMotion || flavours.length <= 1) {
      return;
    }

    const delay = flavours[fromIndex]?.video ? 7000 : AUTOPLAY_DELAY;

    autoplayTimerRef.current = window.setTimeout(() => {
      if (isHoveredRef.current) {
        return;
      }
      goToIndex((fromIndex + 1) % flavours.length);
    }, delay);
  };

  const goToIndex = (nextIndex) => {
    if (isTransitioningRef.current || nextIndex === activeIndexRef.current) {
      return;
    }

    clearAutoplay();
    isTransitioningRef.current = true;

    const finish = () => {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      isTransitioningRef.current = false;
      scheduleAutoplay(nextIndex);
    };

    if (reducedMotion) {
      finish();
      return;
    }

    const timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
    timeline.to([contentRef.current, imageRef.current], {
      opacity: 0,
      y: 22,
      scale: 0.96,
      duration: 0.34,
      stagger: 0.03,
    });
    timeline.call(finish);
    timeline.fromTo(
      [contentRef.current, imageRef.current],
      { opacity: 0, y: 30, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.62, stagger: 0.06 },
    );
  };

  const shiftFlavour = (direction) => {
    const nextIndex = direction === 'next'
      ? (activeIndexRef.current + 1) % flavours.length
      : (activeIndexRef.current - 1 + flavours.length) % flavours.length;

    goToIndex(nextIndex);
  };

  useEffect(() => {
    scheduleAutoplay(activeIndexRef.current);
    return () => clearAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, flavours.length]);

  const handleHoverStart = () => {
    isHoveredRef.current = true;
    clearAutoplay();
  };

  const handleHoverEnd = () => {
    isHoveredRef.current = false;
    scheduleAutoplay(activeIndexRef.current);
  };

  const getOrbitPosition = (index) => {
    const offset = (index - activeIndex + flavours.length) % flavours.length;

    if (offset === 0) return 'active';
    if (offset === 1) return 'next';
    if (offset === 2) return 'far-next';
    if (offset === flavours.length - 1) return 'previous';
    if (offset === flavours.length - 2) return 'far-previous';
    return 'back';
  };

  return (
    <section
      className="hero-section"
      id="home"
      ref={heroRef}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {activeFlavour.videoBackground && activeFlavour.video ? (
        <div className="hero-video-background" aria-hidden="true">
          <video
            key={`background-${activeFlavour.id}-${activeIndex}`}
            src={activeFlavour.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <span />
        </div>
      ) : null}

      <div className="hero-content">
        <div className="hero-copy" ref={contentRef}>
          <p className="eyebrow hero-eyebrow">
            <Sparkles size={15} /> {activeFlavour.tagline}
          </p>
          <h1>Taste Joy in<br />Every Sip.</h1>
          <p className="hero-description">{activeFlavour.description}</p>
          <div className="hero-actions">
            <a className="button primary" href="#menu">
              Order Now
              <ArrowRight size={16} />
            </a>
            <a className="button secondary" href="#menu">
              Explore flavours
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label={`Featured ${activeFlavour.name} milkshake`}>
          <div className="hero-orbit">
            {flavours.map((flavour, index) => {
              const position = getOrbitPosition(index);
              return (
                <button
                  key={flavour.id}
                  type="button"
                  className={`orbit-shake orbit-${position}`}
                  onClick={() => goToIndex(index)}
                  aria-label={`Show ${flavour.name}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                >
                  {flavour.video && !flavour.videoBackground && index === activeIndex ? (
                    <video
                      key={`${flavour.id}-${activeIndex}`}
                      ref={imageRef}
                      className="hero-image hero-shake-video"
                      src={flavour.video}
                      poster={flavour.image}
                      autoPlay
                      muted
                      playsInline
                      preload="auto"
                      aria-label={`${flavour.name} milkshake transformation`}
                    />
                  ) : (
                    <img
                      ref={index === activeIndex ? imageRef : null}
                      className="hero-image"
                      src={flavour.image}
                      alt={index === activeIndex ? flavour.name : ''}
                    />
                  )}
                  <span>{flavour.name}</span>
                </button>
              );
            })}
          </div>
          <div className="orbit-shadow" aria-hidden="true" />
          <button
            type="button"
            className="orbit-hit-area orbit-hit-left"
            onClick={() => shiftFlavour('prev')}
            aria-label="Previous flavour"
          />
          <button
            type="button"
            className="orbit-hit-area orbit-hit-right"
            onClick={() => shiftFlavour('next')}
            aria-label="Next flavour"
          />
        </div>
      </div>

      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 240" preserveAspectRatio="none">
          <path d="M0,98 C105,18 190,20 280,102 C370,183 466,192 548,74 C625,-36 731,-9 808,98 C886,206 1004,187 1085,77 C1164,-30 1264,12 1335,93 C1375,138 1411,136 1440,108 L1440,240 L0,240 Z" />
        </svg>
      </div>

      <div className="hero-bottom">
        <div className="hero-rating">
          <span className="rating-avatars" aria-hidden="true">
            <i>J</i><i>M</i><i>A</i>
          </span>
          <span><strong>4.9/5</strong> · Happy shake lovers</span>
        </div>

        <span className="price-pill">From {activeFlavour.price}</span>

        <div className="hero-nav">
          <div className="hero-controls" aria-label="Flavour controls">
            <button type="button" onClick={() => shiftFlavour('prev')} aria-label="Previous flavour">
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={() => shiftFlavour('next')} aria-label="Next flavour">
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="hero-pagination" aria-label="Choose a flavour">
            {flavours.map((flavour, index) => (
              <button
                key={flavour.id}
                type="button"
                className={index === activeIndex ? 'active' : ''}
                onClick={() => goToIndex(index)}
                aria-label={`Show ${flavour.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FlavourHero;
