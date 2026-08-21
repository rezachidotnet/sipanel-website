'use client';

import {useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode} from 'react';

type Props = {
  heading: ReactNode;
  previousLabel: string;
  nextLabel: string;
  progressLabel: string;
  children: ReactNode;
};

/**
 * scrollLeft sign/range conventions diverge across browsers in RTL:
 * "negative" (Chrome/Firefox: 0 -> -max), "reverse" (Safari/older WebKit:
 * max -> 0), or "default" (rare: 0 -> max, same as LTR). Detected once via a
 * throwaway probe element rather than assumed, so progress<->scrollLeft
 * conversion is correct on every engine without ever reversing the DOM order
 * or mirroring content.
 */
type RtlScrollType = 'default' | 'negative' | 'reverse';

function detectRtlScrollType(): RtlScrollType {
  if (typeof document === 'undefined') return 'negative';

  const probe = document.createElement('div');
  probe.dir = 'rtl';
  probe.style.cssText = 'position:absolute; visibility:hidden; overflow:scroll; width:1px; height:1px;';
  probe.innerHTML = '<div style="width:2px;height:1px;"></div>';
  document.body.appendChild(probe);

  let type: RtlScrollType;
  if (probe.scrollLeft > 0) {
    type = 'default';
  } else {
    probe.scrollLeft = 1;
    type = probe.scrollLeft === 0 ? 'negative' : 'reverse';
  }

  document.body.removeChild(probe);
  return type;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function progressToScrollLeft(progress: number, maxScroll: number, isRtl: boolean, rtlType: RtlScrollType) {
  if (!isRtl || rtlType === 'default') return progress * maxScroll;
  if (rtlType === 'negative') return -progress * maxScroll;
  return (1 - progress) * maxScroll; // 'reverse'
}

function scrollLeftToProgress(scrollLeft: number, maxScroll: number, isRtl: boolean, rtlType: RtlScrollType) {
  if (maxScroll <= 0) return 0;
  if (!isRtl || rtlType === 'default') return clamp01(scrollLeft / maxScroll);
  if (rtlType === 'negative') return clamp01(-scrollLeft / maxScroll);
  return clamp01(1 - scrollLeft / maxScroll); // 'reverse'
}

/**
 * Stage-mode horizontal position, expressed as a `translateX` px offset
 * rather than `scrollLeft`. Transforms are always physical-pixel and
 * direction-agnostic (unlike `scrollLeft`, whose sign/range conventions
 * diverge across browsers in RTL), so the first DOM card stays flush at the
 * inline-start edge in both directions without ever reversing DOM order or
 * mirroring content: LTR shifts content left (negative) to reveal later
 * cards to the right; RTL shifts content right (positive) to reveal later
 * cards to the left.
 */
function progressToOffsetPx(progress: number, maxScroll: number, isRtl: boolean) {
  const magnitude = progress * maxScroll;
  return isRtl ? magnitude : -magnitude;
}

/** Slightly-compressed vertical scroll budget relative to the horizontal travel distance. */
const SCROLL_COMPRESSION = 0.85;
const STAGE_ACTIVE_QUERY = '(min-width: 768px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function ArrowIcon({direction}: {direction: 'start' | 'end'}) {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={direction === 'start' ? {transform: 'scaleX(-1)'} : undefined}>
      <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SystemsShowcaseScrollStage({heading, previousLabel, nextLabel, progressLabel, children}: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const rtlTypeRef = useRef<RtlScrollType>('negative');
  const headerHeightRef = useRef(0);
  const stickyHeightRef = useRef(0);
  const progressRef = useRef(0);

  const [stageActive, setStageActive] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  // Progressive enhancement: default (SSR + pre-hydration + no-JS) markup is
  // the plain native-scroll carousel. Stage mode is only added once JS
  // confirms viewport + motion preference allow it, and it is re-evaluated
  // live so resizing across the breakpoint or toggling OS reduced-motion
  // updates behavior without a reload. This also gives reduced-motion users
  // the native-scroll fallback for free.
  useLayoutEffect(() => {
    const desktopMq = window.matchMedia(STAGE_ACTIVE_QUERY);
    const motionMq = window.matchMedia(REDUCED_MOTION_QUERY);

    function evaluate() {
      setStageActive(desktopMq.matches && !motionMq.matches);
    }

    evaluate();
    desktopMq.addEventListener('change', evaluate);
    motionMq.addEventListener('change', evaluate);

    return () => {
      desktopMq.removeEventListener('change', evaluate);
      motionMq.removeEventListener('change', evaluate);
    };
  }, []);

  const applyProgress = useCallback((progress: number) => {
    const clamped = clamp01(progress);
    progressRef.current = clamped;
    if (progressFillRef.current) {
      progressFillRef.current.style.transform = `scaleX(${clamped})`;
    }
    const percent = Math.round(clamped * 100);
    setProgressPercent((prev) => (prev === percent ? prev : percent));
  }, []);

  // Stage-mode: vertical page scroll drives horizontal card position.
  // Section progress is read straight from actual layout (getBoundingClientRect),
  // never guessed, and applied via a single rAF-throttled tick per scroll/resize.
  useLayoutEffect(() => {
    if (!stageActive) return;

    const stage = stageRef.current;
    const sticky = stickyRef.current;
    const rail = railRef.current;
    const track = trackRef.current;
    if (!stage || !sticky || !rail || !track) return;

    const isRtl = getComputedStyle(track).direction === 'rtl';

    let maxScroll = 0;

    function measure() {
      const header = document.querySelector<HTMLElement>('.site-header');
      headerHeightRef.current = header?.getBoundingClientRect().height ?? 0;
      sticky!.style.minHeight = `calc(100svh - ${headerHeightRef.current}px)`;
      stickyHeightRef.current = sticky!.offsetHeight;
      maxScroll = track!.scrollWidth - rail!.clientWidth;

      sticky!.style.top = `${headerHeightRef.current}px`;
      const travel = Math.max(0, maxScroll) * SCROLL_COMPRESSION;
      stage!.style.height = maxScroll > 1 ? `${stickyHeightRef.current + travel}px` : '';
    }

    measure();

    let rafId: number | null = null;

    function tick() {
      rafId = null;
      if (maxScroll <= 1) {
        applyProgress(0);
        return;
      }

      const header = document.querySelector<HTMLElement>('.site-header');
      headerHeightRef.current = header?.getBoundingClientRect().height ?? 0;
      sticky!.style.top = `${headerHeightRef.current}px`;
      const rect = stage!.getBoundingClientRect();
      const pinRange = stage!.offsetHeight - stickyHeightRef.current;
      const raw = pinRange > 0 ? (headerHeightRef.current - rect.top) / pinRange : 0;
      const progress = clamp01(raw);

      // transform, not scrollLeft: composites on the GPU with no layout/paint
      // and is immune to the track's `scroll-behavior: smooth` (used by the
      // native-scroll fallback), so every rAF tick lands instantly with no
      // easing fighting the 1:1 scroll-driven motion.
      track!.style.transform = `translateX(${progressToOffsetPx(progress, maxScroll, isRtl)}px)`;
      applyProgress(progress);
    }

    function onScroll() {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(tick);
    }

    function onResize() {
      measure();
      onScroll();
    }

    tick();

    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onResize);

    const ro = new ResizeObserver(onResize);
    ro.observe(sticky);
    ro.observe(track);
    const header = document.querySelector<HTMLElement>('.site-header');
    if (header) ro.observe(header);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      stage.style.height = '';
      sticky.style.top = '';
      sticky.style.minHeight = '';
      track.style.transform = '';
    };
  }, [stageActive, applyProgress]);

  // Fallback-mode: native horizontal scroll on the track drives progress
  // (mobile, reduced-motion, or pre-hydration/no-JS via plain CSS scroll).
  useEffect(() => {
    if (stageActive) return;
    const track = trackRef.current;
    if (!track) return;

    const isRtl = getComputedStyle(track).direction === 'rtl';
    rtlTypeRef.current = isRtl ? detectRtlScrollType() : 'default';

    function update() {
      const el = track!;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 1) {
        applyProgress(0);
        return;
      }
      applyProgress(scrollLeftToProgress(el.scrollLeft, maxScroll, isRtl, rtlTypeRef.current));
    }

    update();

    let rafId: number | null = null;
    function onScroll() {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    }

    track.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);

    return () => {
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [stageActive, applyProgress]);

  const stepScroll = useCallback(
    (direction: 'start' | 'end') => {
      const track = trackRef.current;
      if (!track) return;

      const firstCard = track.firstElementChild as HTMLElement | null;
      const gap = parseFloat(getComputedStyle(track).columnGap || '0') || 0;
      const cardStep = (firstCard?.getBoundingClientRect().width ?? track.clientWidth * 0.8) + gap;
      const maxScroll = stageActive && railRef.current ? track.scrollWidth - railRef.current.clientWidth : track.scrollWidth - track.clientWidth;
      if (maxScroll <= 1) return;

      const stepProgress = cardStep / maxScroll;

      if (stageActive && stageRef.current) {
        // progressRef (written every scroll-driven tick) is the single
        // source of truth here, not track.scrollLeft: stage mode positions
        // cards via transform, so scrollLeft is never written in this mode.
        const stage = stageRef.current;
        const rect = stage.getBoundingClientRect();
        const stageAbsoluteTop = rect.top + window.scrollY;
        const pinRange = stage.offsetHeight - stickyHeightRef.current;
        const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
        const targetProgress = clamp01(progressRef.current + stepProgress * (direction === 'end' ? 1 : -1));
        const targetScrollY = stageAbsoluteTop - headerHeightRef.current + targetProgress * pinRange;

        window.scrollTo({top: targetScrollY, behavior: reducedMotion ? 'auto' : 'smooth'});
        // The scroll listener picks this up and drives the transform + the
        // progress bar as the page animates, keeping one source of truth.
      } else {
        const isRtl = getComputedStyle(track).direction === 'rtl';
        const currentProgress = scrollLeftToProgress(track.scrollLeft, maxScroll, isRtl, rtlTypeRef.current);
        const targetProgress = clamp01(currentProgress + stepProgress * (direction === 'end' ? 1 : -1));
        const targetScrollLeft = progressToScrollLeft(targetProgress, maxScroll, isRtl, rtlTypeRef.current);
        track.scrollTo({left: targetScrollLeft, behavior: 'smooth'});
      }
    },
    [stageActive]
  );

  const handlePointerDown = useCallback(
    (e: React.MouseEvent) => {
      if (stageActive) return;
      const el = trackRef.current;
      if (!el) return;
      isDragging.current = true;
      el.style.cursor = 'grabbing';
      startX.current = e.pageX - el.offsetLeft;
      scrollLeftPos.current = el.scrollLeft;
    },
    [stageActive]
  );

  const handlePointerUp = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = false;
    el.style.cursor = '';
  }, []);

  const handlePointerMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = trackRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    el.scrollLeft = scrollLeftPos.current - walk;
  }, []);

  const tolerance = 1;
  const atStart = progressPercent <= tolerance;
  const atEnd = progressPercent >= 100 - tolerance;

  return (
    <div ref={stageRef} className={stageActive ? 'systems-showcase__stage is-stage-active' : 'systems-showcase__stage'}>
      <div ref={stickyRef} className={stageActive ? 'systems-showcase__sticky is-stage-active' : 'systems-showcase__sticky'}>
        <div className="container-shell systems-showcase__inner">
          {heading}

          <div className="systems-showcase__controls">
            <button
              type="button"
              className="systems-showcase__arrow systems-showcase__arrow--start"
              onClick={() => stepScroll('start')}
              aria-label={previousLabel}
              disabled={atStart}
            >
              <ArrowIcon direction="start" />
            </button>

            <div
              className="systems-showcase__progress-track"
              role="progressbar"
              aria-label={progressLabel}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
            >
              <div ref={progressFillRef} className="systems-showcase__progress-fill" />
            </div>

            <button
              type="button"
              className="systems-showcase__arrow systems-showcase__arrow--end"
              onClick={() => stepScroll('end')}
              aria-label={nextLabel}
              disabled={atEnd}
            >
              <ArrowIcon direction="end" />
            </button>
          </div>

          <div ref={railRef} className={stageActive ? 'systems-showcase__rail is-stage-active' : 'systems-showcase__rail'}>
            <div
              ref={trackRef}
              className={stageActive ? 'systems-showcase__track is-stage-active' : 'systems-showcase__track'}
              onMouseDown={handlePointerDown}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onMouseMove={handlePointerMove}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
