import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './FlavourSpiralPreloader.css';

function FlavourSpiralPreloader() {
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
          '.spiral-liquid-strawberry',
          '.spiral-cream',
          '.spiral-syrup',
          '.spiral-strawberry',
          '.spiral-straw',
          '.spiral-logo',
        ], { autoAlpha: 1 });
        gsap.set('.spiral-liquid-strawberry', { scaleY: 1, transformOrigin: 'center bottom' });

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

      const drawPaths = '.spiral-cup-outline, .spiral-cup-highlight';
      const ribbonPaths = '.spiral-ribbon-path';
      const toppingPaths = '.spiral-cream-path, .spiral-syrup-path';

      gsap.set(drawPaths, { strokeDasharray: 900, strokeDashoffset: 900 });
      gsap.set(ribbonPaths, { strokeDasharray: 520, strokeDashoffset: 520 });
      gsap.set(toppingPaths, { strokeDasharray: 560, strokeDashoffset: 560 });
      gsap.set('.spiral-liquid-layer, .spiral-liquid-strawberry', {
        scaleY: 0,
        transformOrigin: 'center bottom',
      });
      gsap.set('.spiral-cup-body, .spiral-cup-rim', { autoAlpha: 0 });
      gsap.set('.spiral-cream, .spiral-syrup', { autoAlpha: 0 });

      masterTimeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: complete,
      });

      // 0.00–0.60: the dimensional cup draws itself into the glow.
      masterTimeline
        .fromTo('.flavour-spiral-preloader__scene', { scale: 0.9, autoAlpha: 0 }, {
          scale: 1,
          autoAlpha: 1,
          duration: 0.6,
          ease: 'power3.out',
        }, 0)
        .to('.spiral-cup-body, .spiral-cup-rim', { autoAlpha: 1, duration: 0.25 }, 0.05)
        .to(drawPaths, {
          strokeDashoffset: 0,
          duration: 0.55,
          stagger: 0.035,
          ease: 'power2.inOut',
        }, 0.02)

        // 0.60–1.50: glossy ribbons spiral around the cup.
        .fromTo('.spiral-ribbon', {
          autoAlpha: 0,
          scale: 0.72,
          rotate: -22,
          transformOrigin: '250px 350px',
        }, {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 0.42,
          stagger: 0.055,
        }, 0.6)
        .to(ribbonPaths, {
          strokeDashoffset: 0,
          duration: 0.72,
          stagger: 0.06,
          ease: 'power2.inOut',
        }, 0.68)
        .to('.spiral-ribbon', {
          rotate: 28,
          duration: 0.55,
          stagger: 0.025,
          ease: 'sine.inOut',
        }, 1.02)
        .fromTo('.spiral-orbit-drop', { autoAlpha: 0, scale: 0 }, {
          autoAlpha: 0.85,
          scale: 1,
          duration: 0.22,
          stagger: 0.08,
        }, 1.12)

        // 1.45–3.15: ribbons pour through the rim and rise in one slow, fluid fill.
        .to('.spiral-ribbon', {
          x: (index) => [72, -55, 48, -64][index],
          y: (index) => [94, 117, 126, 101][index],
          scale: 0.42,
          rotate: (index) => [54, -42, 46, -50][index],
          duration: 0.52,
          ease: 'power1.inOut',
        }, 1.45)
        .to('.spiral-ribbon', { autoAlpha: 0, duration: 0.22 }, 1.94)
        .to('.spiral-liquid-layer', {
          scaleY: 1,
          duration: 1.08,
          stagger: 0.1,
          ease: 'sine.inOut',
        }, 1.48)
        .to('.spiral-liquid-layer', {
          skewX: 4,
          x: (index) => [-4, 3, -2, 4][index],
          duration: 0.52,
          stagger: 0.035,
          ease: 'sine.inOut',
        }, 2.18)
        .to('.spiral-liquid-layer', { autoAlpha: 0, duration: 0.5, ease: 'sine.inOut' }, 2.62)
        .to('.spiral-liquid-strawberry', {
          scaleY: 1,
          autoAlpha: 1,
          duration: 1.12,
          ease: 'power1.inOut',
        }, 2.03)
        .fromTo('.spiral-bubble', { autoAlpha: 0, y: 22, scale: 0.4 }, {
          autoAlpha: 0.75,
          y: -18,
          scale: 1,
          duration: 0.72,
          stagger: 0.09,
          ease: 'sine.inOut',
        }, 2.35)

        // 3.00–3.78: cream, syrup, fruit and straw assemble as filling settles.
        .to(toppingPaths, {
          strokeDashoffset: 0,
          duration: 0.58,
          stagger: 0.08,
          ease: 'power2.inOut',
        }, 3)
        .to('.spiral-cream, .spiral-syrup', {
          autoAlpha: 1,
          duration: 0.08,
        }, 3)
        .fromTo('.spiral-strawberry', { autoAlpha: 0, y: -48, rotate: -15, scale: 0.7 }, {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.45)',
        }, 3.28)
        .fromTo('.spiral-straw', { autoAlpha: 0, x: 45, y: -35, rotate: 12 }, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotate: 0,
          duration: 0.42,
          ease: 'power3.out',
        }, 3.32)

        // 3.78–4.12: one short branded shake and a crisp wordmark reveal.
        .to('.spiral-shake-group', {
          keyframes: [
            { rotate: -3.5, duration: 0.08 },
            { rotate: 3, duration: 0.09 },
            { rotate: -1.2, duration: 0.07 },
            { rotate: 0, duration: 0.07 },
          ],
          transformOrigin: '250px 470px',
          ease: 'sine.inOut',
        }, 3.78)
        .to('.spiral-orbit-drop', {
          x: (index) => (index % 2 ? 8 : -8),
          y: -7,
          duration: 0.16,
          yoyo: true,
          repeat: 1,
        }, 3.78)
        .fromTo('.spiral-logo-glow', { autoAlpha: 0, scale: 0.5 }, {
          autoAlpha: 0.8,
          scale: 1,
          duration: 0.2,
        }, 3.84)
        .fromTo('.spiral-logo', { autoAlpha: 0, scale: 0.78 }, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.25,
          ease: 'back.out(1.4)',
        }, 3.86)

        // 4.10–4.50: the shake pours open the already-rendered homepage.
        .fromTo('.flavour-spiral-preloader__reveal-wave', {
          scale: 0,
          yPercent: 35,
        }, {
          scale: 1,
          yPercent: 0,
          duration: 0.28,
          ease: 'expo.in',
        }, 4.1)
        .to('.flavour-spiral-preloader__scene', {
          y: -35,
          autoAlpha: 0,
          duration: 0.22,
          ease: 'power2.in',
        }, 4.1)
        .to(loader, {
          clipPath: 'inset(0 0 100% 0 round 0 0 50% 50%)',
          duration: 0.25,
          ease: 'power3.inOut',
        }, 4.25)
        .set(loader, { autoAlpha: 0 }, 4.5);
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
      <svg className="flavour-spiral-preloader__scene" viewBox="0 0 500 700">
        <defs>
          <linearGradient id="cupGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff4cb" stopOpacity=".72" />
            <stop offset=".5" stopColor="#fff4cb" stopOpacity=".18" />
            <stop offset="1" stopColor="#572e0d" stopOpacity=".1" />
          </linearGradient>
          <linearGradient id="strawberryLiquid" x1="0" y1="0" x2=".7" y2="1">
            <stop stopColor="#ffc078" />
            <stop offset=".48" stopColor="#f07f25" />
            <stop offset="1" stopColor="#c75c12" />
          </linearGradient>
          <linearGradient id="creamGradient" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#fffdf0" />
            <stop offset=".55" stopColor="#fff4cb" />
            <stop offset="1" stopColor="#edcf91" />
          </linearGradient>
          <filter id="spiralSoftShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#572e0d" floodOpacity=".25" />
          </filter>
          <filter id="spiralLiquidGlow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id="preloaderCupClip">
            <path d="M154 310 Q250 298 346 310 L326 592 Q250 620 174 592Z" />
          </clipPath>
        </defs>

        <g className="spiral-shake-group">
          <g className="preloader-cup" filter="url(#spiralSoftShadow)">
            <path className="spiral-cup-body" d="M151 307 Q250 294 349 307 L328 596 Q250 626 172 596Z" fill="url(#cupGlass)" />
            <path className="spiral-cup-outline" d="M151 307 Q250 294 349 307 L328 596 Q250 626 172 596Z" fill="none" stroke="#572e0d" strokeWidth="7" />
            <ellipse className="spiral-cup-rim" cx="250" cy="307" rx="100" ry="19" fill="#fff4cb" fillOpacity=".24" stroke="#572e0d" strokeWidth="7" />
            <path className="spiral-cup-highlight" d="M179 336 L194 550 Q200 571 218 577" fill="none" stroke="#f07f25" strokeOpacity=".48" strokeWidth="9" strokeLinecap="round" />
          </g>

          <g className="preloader-ribbons" fill="none" strokeLinecap="round" filter="url(#spiralLiquidGlow)">
            <g className="spiral-ribbon"><path className="spiral-ribbon-path" d="M48 205 C130 145 382 157 411 258 C435 343 131 348 113 426" stroke="url(#strawberryLiquid)" strokeWidth="19" /></g>
            <g className="spiral-ribbon"><path className="spiral-ribbon-path" d="M443 184 C351 121 99 195 105 287 C111 372 398 347 386 447" stroke="#572e0d" strokeWidth="18" /></g>
            <g className="spiral-ribbon"><path className="spiral-ribbon-path" d="M62 377 C100 464 394 465 430 366 C463 274 162 229 126 163" stroke="#f6a35f" strokeWidth="18" /></g>
            <g className="spiral-ribbon"><path className="spiral-ribbon-path" d="M444 396 C383 489 105 427 92 326 C83 248 364 245 394 151" stroke="#fff4cb" strokeWidth="18" /></g>
          </g>

          <g clipPath="url(#preloaderCupClip)">
            <path className="spiral-liquid-layer" d="M145 510 Q250 486 355 510 L355 625 L145 625Z" fill="#572e0d" />
            <path className="spiral-liquid-layer" d="M145 470 Q250 446 355 470 L355 625 L145 625Z" fill="#f07f25" />
            <path className="spiral-liquid-layer" d="M145 425 Q250 401 355 425 L355 625 L145 625Z" fill="#fff4cb" />
            <path className="spiral-liquid-layer" d="M145 380 Q250 352 355 380 L355 625 L145 625Z" fill="#f6a35f" />
            <path className="spiral-liquid-strawberry" d="M145 350 Q198 328 250 350 T355 350 L355 625 L145 625Z" fill="url(#strawberryLiquid)" opacity="0" />
            <g fill="#fff4cb">
              <circle className="spiral-bubble" cx="205" cy="465" r="7" />
              <circle className="spiral-bubble" cx="284" cy="495" r="5" />
              <circle className="spiral-bubble" cx="312" cy="418" r="8" />
            </g>
          </g>

          <g className="preloader-toppings">
            <path className="spiral-cream spiral-cream-path" d="M180 305 C175 278 205 272 207 252 C209 232 226 224 239 210 C247 201 248 187 250 174 C269 194 287 207 286 229 C307 231 327 250 318 271 C340 281 339 305 321 314 C285 326 210 326 180 305Z" fill="url(#creamGradient)" stroke="#572e0d" strokeWidth="7" strokeLinejoin="round" />
            <path className="spiral-syrup spiral-syrup-path" d="M205 283 C243 261 286 280 315 259 M221 244 C249 230 273 243 290 229 M241 207 C250 202 259 204 268 211" fill="none" stroke="#f07f25" strokeWidth="8" strokeLinecap="round" />
            <g className="spiral-strawberry">
              <path d="M231 177 C217 151 238 127 260 143 C279 126 300 149 286 175 C275 195 251 202 231 177Z" fill="#f07f25" stroke="#572e0d" strokeWidth="4" />
              <path d="M248 142 C247 129 258 121 263 138 C272 126 281 133 270 145" fill="#fff4cb" stroke="#572e0d" strokeWidth="3" />
              <circle cx="242" cy="164" r="2.5" fill="#fff4cb" /><circle cx="266" cy="177" r="2.5" fill="#fff4cb" /><circle cx="276" cy="158" r="2.5" fill="#fff4cb" />
            </g>
            <g className="spiral-straw">
              <path d="M300 302 L337 115" stroke="#fff4cb" strokeWidth="18" strokeLinecap="round" />
              <path d="M305 278 L312 243 M318 210 L325 175 M331 142 L337 115" stroke="#f07f25" strokeWidth="18" />
            </g>
          </g>

          <g className="spiral-logo-lockup">
            <ellipse className="spiral-logo-glow" cx="250" cy="489" rx="78" ry="37" fill="#fff4cb" opacity="0" />
            <g className="spiral-logo" opacity="0">
              <text x="250" y="476" textAnchor="middle" fill="#572e0d" fontSize="17" fontWeight="800" letterSpacing="2">THE</text>
              <text x="250" y="510" textAnchor="middle" fill="#572e0d" fontFamily="Trebuchet MS, sans-serif" fontSize="34" fontWeight="900">Shakerz</text>
            </g>
          </g>
        </g>

        <g className="spiral-drops">
          <circle className="spiral-orbit-drop" cx="88" cy="248" r="7" fill="#f07f25" />
          <circle className="spiral-orbit-drop" cx="421" cy="320" r="6" fill="#f07f25" />
          <circle className="spiral-orbit-drop" cx="111" cy="407" r="5" fill="#f07f25" />
        </g>
      </svg>
      <div className="flavour-spiral-preloader__reveal-wave" />
    </div>
  );
}

export default FlavourSpiralPreloader;
