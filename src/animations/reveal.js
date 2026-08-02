import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener?.('change', updatePreference);

    return () => mediaQuery.removeEventListener?.('change', updatePreference);
  }, []);

  return reducedMotion;
}

export function createStaggerVariants({ stagger = 0.1, y = 16, reducedMotion = false } = {}) {
  return {
    container: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reducedMotion ? 0 : stagger,
        },
      },
    },
    item: {
      hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : y },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: reducedMotion ? 0.01 : 0.5, ease: 'easeOut' },
      },
    },
  };
}

export function useReveal(options = {}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { y = 24, scale = 1, duration = 0.7, once = true } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    if (reducedMotion) {
      gsap.set(element, { clearProps: 'all' });
      return undefined;
    }

    gsap.set(element, { opacity: 0, y, scale });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 88%',
      once,
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [duration, once, reducedMotion, scale, y]);

  return ref;
}
