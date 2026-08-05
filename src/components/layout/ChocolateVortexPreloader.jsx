import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './ChocolateVortexPreloader.css';

function ChocolateVortexPreloader() {
  const [isVisible, setIsVisible] = useState(true);
  const loaderRef = useRef(null);
  const finishedRef = useRef(false);

  useLayoutEffect(() => {
    if (!isVisible || !loaderRef.current) return undefined;

    const loader = loaderRef.current;
    const previousOverflow = document.body.style.overflow;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let masterTimeline;
    let context;
    let safetyTimeout;

    document.body.style.overflow = 'hidden';

    const complete = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;

      document.body.style.overflow = previousOverflow;
      window.dispatchEvent(new CustomEvent('shakerz:preloader-complete'));
      setIsVisible(false);
    };

    // Deferring setup by one frame lets React Strict Mode discard its probe
    // effect before a timeline or safety timeout is created.
    const setupFrame = window.requestAnimationFrame(() => {
      safetyTimeout = window.setTimeout(complete, 5000);
      context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([
          '.spiral-cup-body',
          '.spiral-cup-rim',
          '.vortex-cup-liquid',
          '.spiral-chocolate-swirl',
          '.spiral-cookie-layer',
          '.spiral-condensation',
          '.spiral-lid',
          '.spiral-logo',
        ], { autoAlpha: 1 });
        gsap.set('.vortex-cup-liquid', { scale: 1, transformOrigin: '250px 430px' });
        gsap.set('.vortex-progress__fill', { scaleX: 1 });

        masterTimeline = gsap.timeline({ onComplete: complete })
          .fromTo('.flavour-spiral-preloader__scene', { autoAlpha: 0, scale: 0.96 }, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
          })
          .to(loader, { autoAlpha: 0, duration: 0.2, ease: 'power1.out' }, 0.25);
        return;
      }

      const swirlPaths = '.spiral-chocolate-swirl';

      gsap.set(swirlPaths, { strokeDasharray: 360, strokeDashoffset: 360 });
      gsap.set('.vortex-cup-liquid', {
        autoAlpha: 0,
        scaleY: 0,
        transformOrigin: 'center bottom',
      });
      gsap.set('.spiral-cup-body, .spiral-cup-rim, .spiral-cup-outline, .spiral-cup-highlight', {
        autoAlpha: 1,
      });
      gsap.set('.spiral-lid, .spiral-logo, .spiral-logo-glow, .spiral-condensation', {
        autoAlpha: 0,
      });
      gsap.set('.spiral-chocolate-swirl, .spiral-cookie-layer', {
        autoAlpha: 0,
        transformOrigin: '250px 430px',
      });
      gsap.set('.vortex-progress__fill', { scaleX: 0, transformOrigin: 'left center' });

      masterTimeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: complete,
      });

      // 0.00–0.72: the empty branded cup rises into the centre.
      masterTimeline
        .to('.vortex-progress__fill', {
          scaleX: 1,
          duration: 4.72,
          ease: 'none',
        }, 0)
        .fromTo('.flavour-spiral-preloader__scene', {
          scale: 0.9,
          autoAlpha: 0,
          y: 95,
          rotate: -2.5,
        }, {
          scale: 1,
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          duration: 0.72,
          ease: 'power3.out',
        }, 0)
        .fromTo('.flavour-spiral-preloader__glow', { autoAlpha: 0, scale: 0.7 }, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.65,
          ease: 'sine.out',
        }, 0.08)

        // 0.72–3.42: the milkshake rises slowly and evenly from the cup base.
        .to('.vortex-cup-liquid', {
          autoAlpha: 1,
          scaleY: 1,
          duration: 2.7,
          ease: 'sine.inOut',
        }, 0.72)
        .to(swirlPaths, {
          autoAlpha: 0.92,
          strokeDashoffset: 0,
          duration: 0.78,
          stagger: 0.06,
          ease: 'sine.inOut',
        }, 2.45)
        .fromTo('.spiral-cookie-layer', { autoAlpha: 0, scale: 0.82, rotate: -3 }, {
          autoAlpha: 0.88,
          scale: 1,
          rotate: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: 'sine.inOut',
        }, 2.58)
        .fromTo('.spiral-bubble', { autoAlpha: 0, y: 22, scale: 0.4 }, {
          autoAlpha: 0.75,
          y: -18,
          scale: 1,
          duration: 0.92,
          stagger: 0.09,
          ease: 'sine.inOut',
        }, 2.42)
        .to('.spiral-condensation', {
          autoAlpha: 0.72,
          duration: 0.82,
          stagger: 0.045,
          ease: 'sine.out',
        }, 2.55)

        // 3.48–4.02: the orange lid drops after the fill is complete.
        .fromTo('.spiral-lid', {
          y: -52,
          scale: 0.94,
          transformOrigin: '250px 210px',
        }, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.42,
          ease: 'bounce.out',
        }, 3.48)
        .to('.spiral-lid', {
          scaleY: 0.97,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: 'sine.inOut',
        }, 3.88)

        // 3.96–4.24: reveal the cup badge after the lid locks.
        .fromTo('.spiral-logo-glow', { autoAlpha: 0, scale: 0.5 }, {
          autoAlpha: 0.3,
          scale: 1,
          duration: 0.2,
        }, 3.96)
        .fromTo('.spiral-logo', { autoAlpha: 0, scale: 0.78 }, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.25,
          ease: 'back.out(1.4)',
        }, 3.98)

        // 4.26–4.53: one short, controlled branded shake.
        .to('.spiral-shake-group', {
          keyframes: [
            { rotate: -3, duration: 0.08 },
            { rotate: 2.6, duration: 0.09 },
            { rotate: 0, duration: 0.1 },
          ],
          transformOrigin: '250px 470px',
          ease: 'sine.inOut',
        }, 4.26)

        // 4.55–4.90: a chocolate-orange circle opens onto the rendered hero.
        .fromTo('.flavour-spiral-preloader__reveal-wave', {
          scale: 0,
          yPercent: 35,
        }, {
          scale: 1,
          yPercent: 0,
          duration: 0.22,
          ease: 'power2.in',
        }, 4.55)
        .to('.flavour-spiral-preloader__scene', {
          x: '18vw',
          y: -28,
          scale: 0.88,
          autoAlpha: 0,
          duration: 0.22,
          ease: 'power2.inOut',
        }, 4.55)
        .to('.vortex-progress', {
          autoAlpha: 0,
          y: 6,
          duration: 0.18,
          ease: 'power2.in',
        }, 4.62)
        .to(loader, {
          clipPath: 'inset(0 0 100% 0 round 0 0 50% 50%)',
          duration: 0.16,
          ease: 'power3.inOut',
        }, 4.74)
        .set(loader, { autoAlpha: 0 }, 4.9);
      }, loader);
    });

    return () => {
      window.cancelAnimationFrame(setupFrame);
      if (safetyTimeout) window.clearTimeout(safetyTimeout);
      masterTimeline?.kill();
      context?.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="flavour-spiral-preloader" ref={loaderRef} aria-hidden="true">
      <div className="flavour-spiral-preloader__glow" />
      <div className="vortex-loader-content">
        <svg className="flavour-spiral-preloader__scene" viewBox="0 0 500 700">
        <defs>
          <linearGradient id="cupGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".48" />
            <stop offset=".22" stopColor="#fff4cb" stopOpacity=".1" />
            <stop offset=".72" stopColor="#572e0d" stopOpacity=".06" />
            <stop offset="1" stopColor="#fff" stopOpacity=".3" />
          </linearGradient>
          <linearGradient id="creamyChocolate" x1="0" y1="0" x2=".7" y2="1">
            <stop stopColor="#f5dfc2" />
            <stop offset=".48" stopColor="#d9b797" />
            <stop offset="1" stopColor="#b88967" />
          </linearGradient>
          <linearGradient id="lidOrange" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#ffad69" />
            <stop offset=".25" stopColor="#f07f25" />
            <stop offset=".72" stopColor="#d9630d" />
            <stop offset="1" stopColor="#f5964d" />
          </linearGradient>
          <linearGradient id="chocolateSyrup" x1="0" y1="0" x2="1" y2=".7">
            <stop stopColor="#2f1407" />
            <stop offset=".48" stopColor="#572e0d" />
            <stop offset="1" stopColor="#8a4b25" />
          </linearGradient>
          <filter id="spiralSoftShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#572e0d" floodOpacity=".25" />
          </filter>
          <clipPath id="preloaderCupClip">
            <path d="M151 226 Q250 214 349 226 L327 598 Q250 625 173 598Z" />
          </clipPath>
          <path id="brandTopArc" d="M195 466 A62 62 0 0 1 305 466" />
        </defs>

        <g className="spiral-shake-group">
          <g className="preloader-cup" filter="url(#spiralSoftShadow)">
            <path className="spiral-cup-body" d="M151 226 Q250 214 349 226 L327 598 Q250 625 173 598Z" fill="url(#cupGlass)" />
            <path className="spiral-cup-outline" d="M151 226 Q250 214 349 226 L327 598 Q250 625 173 598Z" fill="none" stroke="#572e0d" strokeOpacity=".72" strokeWidth="6" />
            <ellipse className="spiral-cup-rim" cx="250" cy="226" rx="100" ry="18" fill="#fff4cb" fillOpacity=".18" stroke="#572e0d" strokeOpacity=".7" strokeWidth="6" />
            <path className="spiral-cup-highlight" d="M176 251 L193 552 Q198 577 216 584" fill="none" stroke="#fff" strokeOpacity=".62" strokeWidth="10" strokeLinecap="round" />
            <path d="M323 252 L309 554" fill="none" stroke="#572e0d" strokeOpacity=".12" strokeWidth="5" strokeLinecap="round" />
          </g>

          <g clipPath="url(#preloaderCupClip)">
            <path className="vortex-cup-liquid" d="M145 264 Q198 238 250 262 T355 262 L355 625 L145 625Z" fill="url(#creamyChocolate)" opacity="0" />

            <g fill="none" stroke="url(#chocolateSyrup)" strokeLinecap="round">
              <path className="spiral-chocolate-swirl" d="M145 308 C187 278 218 338 261 307 S329 279 357 301" strokeWidth="22" />
              <path className="spiral-chocolate-swirl" d="M145 403 C185 366 221 430 263 399 S327 370 357 396" strokeWidth="17" />
              <path className="spiral-chocolate-swirl" d="M151 525 C190 492 217 551 259 520 S316 492 341 512" strokeWidth="20" />
            </g>

            <g className="spiral-cookie-layer" fill="#3b1b0b" opacity="0">
              <path d="M148 350 C187 331 212 368 250 350 S319 331 354 349 L352 370 C310 384 284 358 248 373 S184 386 151 369Z" />
              <path d="M154 470 C190 450 218 482 251 468 S309 446 347 464 L344 486 C310 498 280 478 247 492 S187 500 156 486Z" />
              <circle cx="181" cy="337" r="5" /><circle cx="219" cy="363" r="4" /><circle cx="292" cy="343" r="5" />
              <circle cx="323" cy="476" r="4" /><circle cx="203" cy="480" r="5" />
            </g>

            <g fill="#fff4cb" fillOpacity=".62">
              <circle className="spiral-bubble" cx="205" cy="455" r="7" />
              <circle className="spiral-bubble" cx="284" cy="492" r="5" />
              <circle className="spiral-bubble" cx="312" cy="382" r="8" />
            </g>
          </g>

          <g className="spiral-plastic-overlay">
            <path d="M183 255 C188 340 192 492 205 565" fill="none" stroke="#fff" strokeOpacity=".2" strokeWidth="28" strokeLinecap="round" />
            <g fill="#fff" stroke="#572e0d" strokeOpacity=".28" strokeWidth="1.2">
              <ellipse className="spiral-condensation" cx="183" cy="292" rx="4" ry="7" />
              <ellipse className="spiral-condensation" cx="310" cy="275" rx="3" ry="5" />
              <ellipse className="spiral-condensation" cx="210" cy="327" rx="3" ry="5" />
              <ellipse className="spiral-condensation" cx="326" cy="352" rx="4" ry="7" />
              <ellipse className="spiral-condensation" cx="177" cy="414" rx="3" ry="6" />
              <ellipse className="spiral-condensation" cx="303" cy="445" rx="3" ry="5" />
              <ellipse className="spiral-condensation" cx="202" cy="515" rx="4" ry="8" />
              <ellipse className="spiral-condensation" cx="315" cy="548" rx="3" ry="6" />
            </g>
          </g>

          <g className="spiral-lid" filter="url(#spiralSoftShadow)">
            <path d="M144 209 Q250 188 356 209 L367 229 Q250 253 133 229Z" fill="url(#lidOrange)" stroke="#572e0d" strokeOpacity=".45" strokeWidth="4" />
            <path d="M154 190 Q250 169 346 190 L356 211 Q250 231 144 211Z" fill="url(#lidOrange)" />
            <ellipse cx="250" cy="190" rx="96" ry="17" fill="#f5964d" />
            <ellipse cx="250" cy="188" rx="72" ry="10" fill="none" stroke="#fff4cb" strokeOpacity=".48" strokeWidth="3" />
            <path d="M190 189 Q250 178 310 189" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="5" strokeLinecap="round" />
          </g>

          <g className="spiral-logo-lockup">
            <circle className="spiral-logo-glow" cx="250" cy="448" r="79" fill="#f07f25" opacity="0" />
            <g className="spiral-logo" opacity="0">
              <circle cx="250" cy="448" r="72" fill="#fff4cb" fillOpacity=".15" stroke="#f07f25" strokeWidth="7" />
              <circle cx="250" cy="448" r="62" fill="none" stroke="#f07f25" strokeWidth="2" />
              <text fill="#f07f25" fontFamily="Trebuchet MS, sans-serif" fontSize="15" fontWeight="900" letterSpacing="1.5">
                <textPath href="#brandTopArc" startOffset="50%" textAnchor="middle">MILK SHAKE BAR</textPath>
              </text>
              <path d="M238 424 H262 L258 458 Q250 463 242 458Z" fill="#f07f25" />
              <path d="M241 421 Q250 409 259 421 M250 410 V401 M245 405 L240 400 M255 405 L260 400" fill="none" stroke="#f07f25" strokeWidth="3" strokeLinecap="round" />
              <text x="250" y="487" textAnchor="middle" fill="#f07f25" fontFamily="Trebuchet MS, sans-serif" fontSize="16" fontWeight="900">The Shakerz</text>
            </g>
          </g>
        </g>

        </svg>
        <div className="vortex-progress">
          <span className="vortex-progress__label">Crafting your shake</span>
          <span className="vortex-progress__track">
            <span className="vortex-progress__fill" />
          </span>
        </div>
      </div>
      <div className="flavour-spiral-preloader__reveal-wave" />
    </div>
  );
}

export default ChocolateVortexPreloader;
