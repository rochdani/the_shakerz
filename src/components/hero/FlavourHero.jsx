import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  Smile,
  Sparkles,
} from 'lucide-react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../animations/reveal';
import { assetPath } from '../../utils/assetPath';
import SectionWave from '../shared/SectionWave';

const VIDEO_PATH = assetPath('/assets/shakes/newvideo-silent.mp4');
const VIDEO_FALLBACK_PATH = assetPath('/assets/shakes/newvideo.mp4');
const POSTER_PATH = assetPath('/assets/images/milkshake-video-poster.webp');
const REPLAY_DELAY = 10000;

const benefits = [
  { label: 'Real fruits', Icon: Leaf },
  { label: 'Rich & creamy', Icon: Sparkles },
  { label: 'Instant joy', Icon: Smile },
];

function FlavourHero({ flavours }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoAvailable, setVideoAvailable] = useState(true);
  const reducedMotion = useReducedMotion();
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const replayTimerRef = useRef(null);
  const heroVisibleRef = useRef(true);
  const videoEndedRef = useRef(false);
  const playbackRequestedRef = useRef(false);
  const entrancePlayedRef = useRef(false);

  const activeFlavour = flavours[activeIndex];

  const playVideo = useCallback((allowInitialStart = false) => {
    const video = videoRef.current;
    if (
      !video
      || reducedMotion
      || document.hidden
      || (!allowInitialStart && !heroVisibleRef.current)
    ) return;

    playbackRequestedRef.current = true;
    if (replayTimerRef.current) {
      window.clearTimeout(replayTimerRef.current);
      replayTimerRef.current = null;
    }

    videoEndedRef.current = false;
    video.currentTime = 0;
    video.play().catch(() => {
      // Autoplay can be blocked; the poster remains as the visual fallback.
    });
  }, [reducedMotion]);

  const scheduleReplay = useCallback(() => {
    if (reducedMotion || document.hidden || !heroVisibleRef.current) return;

    if (replayTimerRef.current) window.clearTimeout(replayTimerRef.current);
    replayTimerRef.current = window.setTimeout(() => {
      replayTimerRef.current = null;
      if (!document.hidden && heroVisibleRef.current) playVideo();
    }, REPLAY_DELAY);
  }, [playVideo, reducedMotion]);

  const handleVideoEnded = useCallback(() => {
    videoEndedRef.current = true;
    scheduleReplay();
  }, [scheduleReplay]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    if (reducedMotion) {
      gsap.set(hero.querySelectorAll('[data-hero-reveal]'), { clearProps: 'all' });
      return undefined;
    }

    let timeline;

    const startEntrance = () => {
      if (entrancePlayedRef.current) return;
      entrancePlayedRef.current = true;
      playVideo(true);

      const siteHeader = document.querySelector('.site-header');
      const context = gsap.context(() => {
        timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
        timeline
          .fromTo(siteHeader, { autoAlpha: 0, y: -14 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
          }, 0)
          .fromTo('.hero-new-eyebrow', { autoAlpha: 0, y: 14 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
          }, 0.08)
          .fromTo('.hero-new-heading', { autoAlpha: 0, y: 32 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: 'expo.out',
          }, 0.16)
          .fromTo('.hero-new-description, .hero-new-actions', { autoAlpha: 0, y: 20 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
          }, 0.38)
          .fromTo('.hero-product-stage', { autoAlpha: 0, scale: 0.94 }, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.75,
            ease: 'expo.out',
          }, 0.24)
          .fromTo('.hero-orbit-path', { strokeDasharray: 900, strokeDashoffset: 900 }, {
            strokeDashoffset: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: 'sine.inOut',
          }, 0.42)
          .fromTo('.hero-product-badge', { autoAlpha: 0, scale: 0.8 }, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.42,
            stagger: 0.09,
          }, 0.68)
          .fromTo('.hero-benefits', { autoAlpha: 0, y: 22 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
          }, 0.72)
          .fromTo('.hero-wave', { yPercent: 25 }, {
            yPercent: 0,
            duration: 0.65,
            ease: 'sine.out',
          }, 0.72);

        gsap.to('.hero-orbits-back', {
          rotate: 360,
          transformOrigin: 'center',
          duration: 32,
          ease: 'none',
          repeat: -1,
        });
      }, hero);

      return context;
    };

    let context;
    const onPreloaderComplete = () => {
      window.clearTimeout(entranceFallbackTimer);
      context = startEntrance();
    };

    let entranceFallbackTimer;
    let entranceFrame;
    if (document.querySelector('.flavour-spiral-preloader')) {
      window.addEventListener('shakerz:preloader-complete', onPreloaderComplete, { once: true });
      // Strict Mode, HMR, or a safety-timeout handoff must never leave the
      // hero waiting on an event that has already fired.
      entranceFallbackTimer = window.setTimeout(() => {
        context = startEntrance();
      }, 5200);
    } else {
      // Defer direct starts so React Strict Mode can discard its probe effect
      // before the one real entrance timeline is created.
      entranceFrame = window.requestAnimationFrame(() => {
        context = startEntrance();
      });
    }

    return () => {
      window.clearTimeout(entranceFallbackTimer);
      window.cancelAnimationFrame(entranceFrame);
      window.removeEventListener('shakerz:preloader-complete', onPreloaderComplete);
      timeline?.kill();
      context?.revert();
    };
  }, [playVideo, reducedMotion]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || reducedMotion || !videoAvailable) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      heroVisibleRef.current = entry.isIntersecting;

      if (!entry.isIntersecting) {
        videoRef.current?.pause();
        if (replayTimerRef.current) {
          window.clearTimeout(replayTimerRef.current);
          replayTimerRef.current = null;
        }
      } else if (videoEndedRef.current) {
        scheduleReplay();
      } else if (videoRef.current?.paused && videoRef.current.currentTime > 0) {
        videoRef.current.play().catch(() => {
          // The current video frame remains visible when playback is blocked.
        });
      }
    }, { threshold: 0.15 });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoRef.current?.pause();
        if (replayTimerRef.current) {
          window.clearTimeout(replayTimerRef.current);
          replayTimerRef.current = null;
        }
      } else if (heroVisibleRef.current) {
        if (videoEndedRef.current) {
          scheduleReplay();
        } else if (videoRef.current?.paused && videoRef.current.currentTime > 0) {
          videoRef.current.play().catch(() => {
            // Preserve the current frame if playback cannot resume.
          });
        }
      }
    };

    observer.observe(hero);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (replayTimerRef.current) window.clearTimeout(replayTimerRef.current);
    };
  }, [reducedMotion, scheduleReplay, videoAvailable]);

  const shiftFlavour = (direction) => {
    setActiveIndex((current) => (
      direction === 'next'
        ? (current + 1) % flavours.length
        : (current - 1 + flavours.length) % flavours.length
    ));
  };

  return (
    <section className="hero-section hero-redesign" id="home" ref={heroRef}>
      <div className="hero-content hero-new-layout">
        <div className="hero-copy hero-new-copy">
          <p className="hero-new-eyebrow" data-hero-reveal>
            <span />
            Made with love
            <Heart size={18} strokeWidth={1.8} />
          </p>
          <h1 className="hero-new-heading" data-hero-reveal>
            <span>Shake up</span>
            <strong>Goodness</strong>
          </h1>
          <p className="hero-new-description" data-hero-reveal>
            Creamy. Dreamy. Delicious.<br />
            Every sip is a perfect blend of happiness and flavour.
          </p>
          <div className="hero-actions hero-new-actions" data-hero-reveal>
            <a className="button primary" href="#menu">
              Explore menu
              <ArrowRight size={17} />
            </a>
          </div>
        </div>

        <div className="hero-product-stage" data-hero-reveal>
          <div className="hero-product-glow" />

          <svg className="hero-orbits hero-orbits-back" viewBox="0 0 600 700" aria-hidden="true">
            <ellipse className="hero-orbit-path orbit-orange" cx="300" cy="355" rx="245" ry="185" />
            <ellipse className="hero-orbit-path orbit-dashed" cx="300" cy="355" rx="272" ry="285" transform="rotate(-19 300 355)" />
            <circle cx="73" cy="270" r="9" className="orbit-dot-orange" />
            <circle cx="526" cy="466" r="11" className="orbit-dot-orange" />
          </svg>

          {reducedMotion || !videoAvailable ? (
            <img
              className="hero-product-video hero-product-poster"
              src={POSTER_PATH}
              alt="The Shakerz premium milkshake"
            />
          ) : (
            <video
              ref={videoRef}
              className="hero-product-video"
              muted
              playsInline
              preload="metadata"
              poster={POSTER_PATH}
              aria-hidden="true"
              onCanPlay={() => {
                if (playbackRequestedRef.current && videoRef.current?.paused) {
                  playVideo(true);
                }
              }}
              onEnded={handleVideoEnded}
              onError={() => setVideoAvailable(false)}
            >
              <source src={VIDEO_PATH} type="video/mp4" />
              <source src={VIDEO_FALLBACK_PATH} type="video/mp4" />
            </video>
          )}

          <div className="hero-product-badge badge-quality">
            <Sparkles size={21} />
            <span>Premium<br />quality</span>
          </div>
          <div className="hero-product-badge badge-natural">
            <Leaf size={21} />
            <span>Natural<br />ingredients</span>
          </div>
          <div className="hero-product-badge badge-love">
            <Heart size={21} />
            <span>Made<br />with love</span>
          </div>
        </div>

        <aside className="hero-benefits" data-hero-reveal>
          <h2><span>Good mood</span>In every sip</h2>
          <i />
          <ul>
            {benefits.map(({ label, Icon }) => (
              <li key={label}>
                <Icon size={24} strokeWidth={1.7} />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <SectionWave
        position="bottom"
        fill="#FFFAF0"
        variant="heroMenu"
        className="hero-wave hero-menu-wave"
      />

      <div className="hero-bottom">
        <div className="hero-rating">
          <span className="rating-avatars" aria-hidden="true"><i>J</i><i>M</i><i>A</i></span>
          <span><strong>4.9/5</strong> · Happy shake lovers</span>
        </div>
        <span className="price-pill">{activeFlavour.name} · From {activeFlavour.price}</span>
        <div className="hero-nav">
          <div className="hero-controls" aria-label="Flavour controls">
            <button type="button" onClick={() => shiftFlavour('prev')} aria-label="Previous flavour"><ChevronLeft size={18} /></button>
            <button type="button" onClick={() => shiftFlavour('next')} aria-label="Next flavour"><ChevronRight size={18} /></button>
          </div>
          <div className="hero-pagination" aria-label="Choose a flavour">
            {flavours.map((flavour, index) => (
              <button
                key={flavour.id}
                type="button"
                className={index === activeIndex ? 'active' : ''}
                onClick={() => setActiveIndex(index)}
                aria-label={`Select ${flavour.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FlavourHero;
