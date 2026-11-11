/**
 * TraceExplorerCallout
 *
 * "Become a trace explorer" callout for the Claude Platform docs page.
 * Clicking the map in the Explorer hedgehog's hand unfolds it into a pop-up
 * that streams three example Claude calls. Closes with ×, Escape, "Set it up" or after `autoCloseMs`.
 *
 * Self-contained: no Tailwind, styles are injected with a scoped `tec-` prefix. The unfold/fold motion is measured at runtime
 * (map hotspot → pop-up box), so it keeps working at any layout width.
 *
 * Used by ClaudePlatformBanner in ./claude-platform.tsx.
 */
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { IconMultiply, IconPiggyBank } from '@posthog/icons'
import { Logo } from '@posthog/brand/logo'

type Phase = 'idle' | 'opening' | 'open' | 'closing'

export interface TraceExplorerCalloutProps {
    /** Explorer hoggie (1000×1000 transparent PNG). The map hotspot is tuned to this artwork. */
    hedgehogSrc: string
    /** Claude logo for the eyebrow. Prefer the one the existing callout already renders. */
    claudeLogo?: React.ReactNode
    /** PostHog logomark for the eyebrow. Defaults to the brand logomark. */
    posthogLogo?: React.ReactNode
    /** Where "Set it up" goes. If omitted it renders a button that calls `onSetUp`. */
    setUpHref?: string
    onSetUp?: () => void
    /** Auto-close delay once the map is fully open. Default 10s. */
    autoCloseMs?: number
    className?: string
}

const UNFOLD_MS = 900
const FOLD_MS = 720
const ROW_TIMES = [1000, 1900, 2800] // after click: newest call slides in at the top

const CALLS = [
    { id: 'hog', prompt: 'Tell me about hedgehogs', meta: '24 → 690 tokens · $0.017', latency: '4.2s', order: 3 },
    {
        id: 'sql',
        prompt: 'Write a SQL query for weekly signups',
        meta: '842 → 506 tokens · $0.017',
        latency: '3.4s',
        order: 2,
    },
    {
        id: 'ticket',
        prompt: 'Summarize this support ticket',
        meta: '1,204 → 318 tokens · $0.014',
        latency: '2.1s',
        order: 1,
    },
]

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function TraceExplorerCallout({
    hedgehogSrc,
    claudeLogo,
    posthogLogo,
    setUpHref,
    onSetUp,
    autoCloseMs = 10000,
    className = '',
}: TraceExplorerCalloutProps): JSX.Element {
    const [phase, setPhase] = useState<Phase>('idle')
    const [shown, setShown] = useState(0)
    const rootRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<HTMLButtonElement>(null)
    const shellRef = useRef<HTMLDivElement>(null)
    const closeRef = useRef<HTMLButtonElement>(null)
    const timers = useRef<number[]>([])

    const clearTimers = (): void => {
        timers.current.forEach((t) => window.clearTimeout(t))
        timers.current = []
    }
    const later = (fn: () => void, ms: number): void => {
        timers.current.push(window.setTimeout(fn, ms))
    }
    useEffect(() => clearTimers, [])

    // Map the pop-up's box onto the folded map in the hedgehog's hand.
    // Uses layout boxes (offset*), so in-flight transforms don't skew the numbers.
    const measureFold = useCallback((): void => {
        const root = rootRef.current
        const map = mapRef.current
        const shell = shellRef.current
        if (!root || !map || !shell) return
        const r = root.getBoundingClientRect()
        const m = map.getBoundingClientRect()
        const mx = m.left - r.left + m.width / 2
        const my = m.top - r.top + m.height / 2
        const cx = shell.offsetLeft + shell.offsetWidth / 2
        const cy = shell.offsetTop + shell.offsetHeight / 2
        shell.style.setProperty('--tec-tx', `${mx - cx}px`)
        shell.style.setProperty('--tec-ty', `${my - cy}px`)
        shell.style.setProperty('--tec-sx', String(m.width / shell.offsetWidth))
        shell.style.setProperty('--tec-sy', String(m.height / shell.offsetHeight))
    }, [])

    // Runs before paint when the pop-up mounts, so the first frame starts on the map.
    useIsoLayoutEffect(() => {
        if (phase === 'opening') measureFold()
    }, [phase, measureFold])

    const phaseRef = useRef<Phase>('idle')
    const go = (p: Phase): void => {
        phaseRef.current = p
        setPhase(p)
    }

    const close = useCallback((): void => {
        const p = phaseRef.current
        if (p === 'idle' || p === 'closing') return
        clearTimers()
        measureFold() // layout may have changed since opening
        go('closing')
        later(() => {
            go('idle')
            setShown(0)
        }, FOLD_MS + 10)
    }, [measureFold])

    const open = (): void => {
        if (phaseRef.current !== 'idle') return
        clearTimers()
        setShown(0)
        go('opening')
        later(() => go('open'), UNFOLD_MS)
        ROW_TIMES.forEach((t, i) => later(() => setShown(i + 1), t))
        later(close, UNFOLD_MS + autoCloseMs)
    }

    const handleSetUp = (): void => {
        onSetUp?.()
        close()
    }

    const showShell = phase !== 'idle'

    // The map button is disabled while the pop-up shows, so focus moves to × and Escape is caught on the document.
    useEffect(() => {
        if (!showShell) return
        closeRef.current?.focus({ preventScroll: true })
        const onKeyDown = (e: KeyboardEvent): void => {
            if (e.key === 'Escape') close()
        }
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
            // Runs once the map button is enabled again. Focus goes back to it unless the visitor moved on.
            const active = document.activeElement
            if (!active || active === document.body) mapRef.current?.focus({ preventScroll: true })
        }
    }, [showShell, close])

    return (
        // The wrapper is a size container, so the layout follows the window width, not the viewport.
        <div className={`tec-wrap ${className}`}>
            <div ref={rootRef} className="tec-root">
                <style>{CSS}</style>

                <div className="tec-text">
                    <div className="tec-eyebrow">
                        <span className="tec-brand">
                            <span className="tec-logo">{claudeLogo}</span>
                            Claude Platform
                        </span>
                        <span aria-hidden="true" className="tec-plus">
                            +
                        </span>
                        <span className="tec-brand">
                            <span className="tec-logo">{posthogLogo ?? <Logo layout="logomark" width="auto" />}</span>
                            PostHog
                        </span>
                    </div>
                    <h3 className="tec-heading">Become a trace explorer</h3>
                    <p className="tec-body">
                        Send OpenTelemetry traces from Claude to PostHog with no extra code. Add PostHog as a
                        destination in the Claude Console and run evals on live traces and ship fixes that actually make
                        a difference.
                    </p>
                    <div>
                        <span className="tec-pill">
                            <IconPiggyBank aria-hidden="true" />
                            100K free events, every month
                        </span>
                    </div>
                </div>

                <div className="tec-hog-col">
                    <div className={`tec-hog${phase === 'opening' ? ' tec-nudge' : ''}`}>
                        <img
                            src={hedgehogSrc}
                            alt="Explorer hedgehog holding a folded map"
                            width={1000}
                            height={1000}
                        />
                        <button
                            ref={mapRef}
                            type="button"
                            className="tec-map-hit"
                            aria-label="Unfold the map to see live Claude calls"
                            aria-expanded={showShell}
                            aria-controls="tec-map-panel"
                            onClick={open}
                            disabled={showShell}
                        />
                    </div>
                    <span className={`tec-hint${showShell ? ' tec-hidden' : ''}`} aria-hidden="true">
                        <span className="tec-hint-dot" />
                        Click the map
                    </span>
                </div>

                {showShell && (
                    <div
                        ref={shellRef}
                        id="tec-map-panel"
                        role="region"
                        aria-label="Map every call with AI Observability"
                        className={`tec-shell tec-${phase}`}
                    >
                        <div className="tec-paper">
                            <div className="tec-strips" aria-hidden="true">
                                <div className="tec-strip tec-odd" />
                                <div className="tec-strip tec-even" />
                                <div className="tec-strip tec-odd" />
                                <div className="tec-strip tec-even" />
                            </div>
                            <svg
                                className="tec-trail"
                                aria-hidden="true"
                                viewBox="0 0 540 410"
                                preserveAspectRatio="none"
                            >
                                <path d="M-10 372 C 80 332 130 394 216 354 S 356 302 410 342 S 506 332 550 282" />
                                <path d="M456 34 C 486 60 506 40 540 70" />
                            </svg>

                            <div className="tec-content">
                                <div className="tec-top">
                                    <span className="tec-live">
                                        <span className="tec-live-dot" />
                                        Live
                                    </span>
                                    <button
                                        ref={closeRef}
                                        type="button"
                                        className="tec-close"
                                        aria-label="Close map"
                                        onClick={close}
                                    >
                                        <IconMultiply aria-hidden="true" />
                                    </button>
                                </div>

                                <h4 className="tec-title">Map every call with AI Observability</h4>

                                <div className="tec-card">
                                    {CALLS.map((c, i) => (
                                        <div
                                            key={c.id}
                                            className={`tec-row tec-r-${c.id}${shown >= c.order ? ' tec-in' : ''}${
                                                i === CALLS.length - 1 ? ' tec-last' : ''
                                            }`}
                                        >
                                            <div className="tec-row-inner">
                                                <div className="tec-row-text">
                                                    <span className="tec-prompt">“{c.prompt}”</span>
                                                    <span className="tec-meta">{c.meta}</span>
                                                </div>
                                                <div className="tec-bar">
                                                    <div className="tec-fill" />
                                                </div>
                                                <span className="tec-lat">{c.latency}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="tec-actions">
                                    {setUpHref ? (
                                        <a className="tec-btn" href={setUpHref} onClick={handleSetUp}>
                                            <span className="tec-btn-face">Set it up</span>
                                        </a>
                                    ) : (
                                        <button type="button" className="tec-btn" onClick={handleSetUp}>
                                            <span className="tec-btn-face">Set it up</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="tec-progress-track" aria-hidden="true">
                                <div
                                    className={`tec-progress${phase === 'open' ? ' tec-run' : ''}`}
                                    style={{ animationDuration: `${autoCloseMs}ms` }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const CSS = `
.tec-wrap{container-type:inline-size; margin:24px 0}
.tec-root{
  --tec-bg:#F7EBD0; --tec-border:#E5E7E0; --tec-heading:#23251D; --tec-body:#4D4F46; --tec-muted:#65675E;
  --tec-pill-bg:rgba(235,157,42,.22); --tec-pill-border:rgba(205,132,7,.45); --tec-pill-icon:#9A5B04;
  --tec-hint-bg:#FDFDF8; --tec-hint-border:#BFC1B7;
  position:relative; display:flex; align-items:center; gap:20px; box-sizing:border-box;
  padding:28px 32px; background:var(--tec-bg); border:1px solid var(--tec-border); border-radius:8px;
  color:var(--tec-heading);
}
.dark .tec-root{
  --tec-bg:#2C2A22; --tec-border:#4D4F46; --tec-heading:#EEEFE9; --tec-body:#D2D3CC; --tec-muted:#9EA096;
  --tec-pill-bg:rgba(235,157,42,.18); --tec-pill-border:rgba(235,157,42,.45); --tec-pill-icon:#F7A501;
  --tec-hint-bg:#23251D; --tec-hint-border:#4D4F46;
}
.tec-text{flex:1 1 auto; min-width:0; max-width:560px; display:flex; flex-direction:column; gap:8px}
.tec-eyebrow{display:flex; align-items:center; flex-wrap:wrap; gap:8px; font-size:14px; font-weight:600; color:var(--tec-muted)}
.tec-brand{display:inline-flex; align-items:center; gap:8px; white-space:nowrap}
.tec-logo{display:inline-flex; align-items:center}
.tec-logo img,.tec-logo svg{display:block; height:16px; width:auto}
.tec-plus{color:#9EA096; font-weight:500}
.tec-heading{margin:0; font-size:22px; line-height:1.25; font-weight:800; color:var(--tec-heading)}
.tec-body{margin:0; font-size:15px; line-height:1.5; color:var(--tec-body)}
.tec-pill{margin-top:4px; display:inline-flex; align-items:center; gap:6px; padding:5px 12px 5px 8px; border-radius:999px;
  background:var(--tec-pill-bg); border:1px solid var(--tec-pill-border); font-size:13px; font-weight:700; color:var(--tec-heading)}
.tec-pill svg{width:16px; height:16px; color:var(--tec-pill-icon); flex:none}

.tec-hog-col{flex:none; width:160px; display:flex; flex-direction:column; align-items:center; margin:-16px 0 -12px}
.tec-hog{position:relative; width:160px; height:160px}
.tec-hog img{display:block; width:100%; height:100%}
.tec-nudge{animation:tec-nudge 520ms cubic-bezier(.3,1.6,.5,1)}
@keyframes tec-nudge{0%{transform:none}35%{transform:translateY(-8px) rotate(1.5deg)}100%{transform:none}}
/* Hotspot over the folded map in the Explorer artwork (1000×1000). */
.tec-map-hit{position:absolute; left:48%; top:30%; width:35%; height:43%; padding:0; border:0; border-radius:10px;
  background:transparent; cursor:pointer; transition:transform 180ms ease}
.tec-map-hit:hover{transform:scale(1.04)}
.tec-map-hit:disabled{cursor:default}
.tec-map-hit:focus-visible{outline:3px solid #2F80FA; outline-offset:4px}
.tec-hint{display:inline-flex; align-items:center; gap:8px; margin-top:-6px; padding:5px 10px 5px 8px; border-radius:999px;
  background:var(--tec-hint-bg); border:1.5px solid var(--tec-hint-border); box-shadow:0 2px 0 var(--tec-hint-border);
  font-size:12px; font-weight:600; color:var(--tec-heading); white-space:nowrap; animation:tec-float 2.4s ease-in-out infinite;
  transition:opacity 200ms ease}
.tec-hint.tec-hidden{opacity:0}
.tec-hint-dot{position:relative; width:8px; height:8px; border-radius:50%; background:#EB9D2A}
.tec-hint-dot::after{content:""; position:absolute; inset:-4px; border-radius:50%; border:2px solid #EB9D2A; animation:tec-ring 1.6s ease-out infinite}
@keyframes tec-float{0%,100%{transform:none}50%{transform:translateY(-4px)}}
@keyframes tec-ring{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.8);opacity:0}}

/* Pop-up. Desktop: floats left of the hedgehog, overlapping the text and spilling below the callout. */
.tec-shell{position:absolute; z-index:30; top:24px; right:max(16px, min(212px, calc(100% - 476px)));
  width:min(460px, calc(100% - 32px)); height:340px; transform-origin:50% 50%;
  --tec-tx:0px; --tec-ty:0px; --tec-sx:.2; --tec-sy:.3}
.tec-paper{position:absolute; inset:0; box-sizing:border-box; overflow:hidden; border:2px solid #E6CFA3; border-radius:16px;
  background:#FFF3DA; box-shadow:0 22px 44px -18px rgba(50,6,1,.38); transform-origin:50% 50%; color:#111}
/* Two layers, one continuous curve each: width leads (expo-out), height trails slightly. */
.tec-shell.tec-opening{animation:tec-open-x ${UNFOLD_MS}ms cubic-bezier(.16,1,.3,1) both, tec-appear 140ms linear both}
.tec-shell.tec-opening .tec-paper{animation:tec-open-y ${UNFOLD_MS}ms cubic-bezier(.33,.9,.25,1) both}
.tec-shell.tec-closing{animation:tec-close-x ${FOLD_MS}ms cubic-bezier(.65,0,.35,1) both, tec-vanish ${FOLD_MS}ms linear both}
.tec-shell.tec-closing .tec-paper{animation:tec-close-y ${FOLD_MS}ms cubic-bezier(.5,0,.25,1) both}
@keyframes tec-open-x{from{transform:translate(var(--tec-tx),var(--tec-ty)) scaleX(var(--tec-sx))}to{transform:none}}
@keyframes tec-open-y{from{transform:scaleY(var(--tec-sy));border-radius:3px;border-color:#320601}to{transform:none;border-radius:16px;border-color:#E6CFA3}}
@keyframes tec-close-x{from{transform:none}to{transform:translate(var(--tec-tx),var(--tec-ty)) scaleX(var(--tec-sx))}}
@keyframes tec-close-y{from{transform:none;border-radius:16px;border-color:#E6CFA3}to{transform:scaleY(var(--tec-sy));border-radius:3px;border-color:#320601}}
@keyframes tec-appear{from{opacity:0}to{opacity:1}}
@keyframes tec-vanish{0%,86%{opacity:1}100%{opacity:0}}

.tec-strips{position:absolute; inset:0; display:flex}
.tec-strip{flex:1 1 0; background:#FFF3DA; border-right:1px solid rgba(50,6,1,.06)}
.tec-strip:last-child{border-right:0}
.tec-opening .tec-strip.tec-odd{animation:tec-s-odd ${UNFOLD_MS}ms cubic-bezier(.16,1,.3,1) both}
.tec-opening .tec-strip.tec-even{animation:tec-s-even ${UNFOLD_MS}ms cubic-bezier(.16,1,.3,1) both}
.tec-closing .tec-strip.tec-odd{animation:tec-s-odd-back ${FOLD_MS}ms cubic-bezier(.65,0,.35,1) both}
.tec-closing .tec-strip.tec-even{animation:tec-s-even-back ${FOLD_MS}ms cubic-bezier(.65,0,.35,1) both}
@keyframes tec-s-odd{from{background:#FFEAC8;transform:skewY(-12deg)}to{background:#FFF3DA;transform:none}}
@keyframes tec-s-even{from{background:#CEB398;transform:skewY(12deg)}to{background:#FFF3DA;transform:none}}
@keyframes tec-s-odd-back{from{background:#FFF3DA;transform:none}to{background:#FFEAC8;transform:skewY(-12deg)}}
@keyframes tec-s-even-back{from{background:#FFF3DA;transform:none}to{background:#CEB398;transform:skewY(12deg)}}

.tec-trail{position:absolute; inset:0; width:100%; height:100%; opacity:0}
.tec-trail path{fill:none; stroke:#4E7A45; stroke-opacity:.2; stroke-width:3; stroke-linecap:round; stroke-dasharray:2 10; vector-effect:non-scaling-stroke}
.tec-opening .tec-trail{animation:tec-fade-in 450ms 380ms ease both}
.tec-open .tec-trail{opacity:1}
.tec-closing .tec-trail{animation:tec-fade-out 160ms ease both}

.tec-content{position:relative; height:100%; box-sizing:border-box; padding:14px 16px 18px 20px; display:flex; flex-direction:column; opacity:0}
.tec-opening .tec-content{animation:tec-content-in 380ms 440ms cubic-bezier(.2,.8,.2,1) both}
.tec-open .tec-content{opacity:1}
.tec-closing .tec-content{animation:tec-fade-out 160ms ease both}
@keyframes tec-content-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes tec-fade-in{from{opacity:0}to{opacity:1}}
@keyframes tec-fade-out{from{opacity:1}to{opacity:0}}

.tec-top{display:flex; align-items:center; justify-content:space-between; gap:12px}
.tec-live{display:inline-flex; align-items:center; gap:8px; padding:4px 10px 4px 8px; border-radius:999px;
  background:rgba(71,200,97,.12); border:1px solid rgba(53,177,78,.35); font-size:12px; font-weight:700; color:#1F5A2B}
.tec-live-dot{position:relative; width:9px; height:9px; border-radius:50%; background:#47C861; animation:tec-glow 1.8s ease-in-out infinite}
.tec-live-dot::after{content:""; position:absolute; inset:0; border-radius:50%; background:#47C861; animation:tec-ring 1.8s ease-out infinite}
@keyframes tec-glow{0%,100%{box-shadow:0 0 6px 1px rgba(71,200,97,.45)}50%{box-shadow:0 0 12px 4px rgba(71,200,97,.75)}}
.tec-close{width:32px; height:32px; display:inline-flex; align-items:center; justify-content:center; padding:0; border:0;
  border-radius:8px; background:transparent; color:#65675E; cursor:pointer; transition:background 150ms ease,color 150ms ease}
.tec-close svg{width:18px; height:18px}
.tec-close:hover{background:rgba(50,6,1,.07); color:#111}
.tec-close:focus-visible{outline:2px solid #2F80FA; outline-offset:2px}
.tec-title{margin:6px 0 0; font-size:20px; line-height:1.2; font-weight:800; letter-spacing:-.01em; color:#111}

.tec-card{margin-top:12px; height:168px; box-sizing:border-box; padding:2px 14px; background:#FDFDF8; border:1px solid #E5E7E0;
  border-radius:10px; box-shadow:0 1px 0 rgba(50,6,1,.04)}
.tec-row{max-height:0; opacity:0; overflow:hidden; transform:translateY(-8px);
  transition:max-height 420ms cubic-bezier(.2,.8,.2,1),opacity 300ms 120ms ease,transform 420ms cubic-bezier(.2,.8,.2,1)}
.tec-row.tec-in{max-height:72px; opacity:1; transform:none}
.tec-row-inner{display:grid; grid-template-columns:minmax(0,1fr) 100px 36px; align-items:center; column-gap:12px; padding:9px 0;
  border-bottom:1px solid #EEEFE9}
.tec-last .tec-row-inner{border-bottom:0}
.tec-row-text{min-width:0; display:flex; flex-direction:column; gap:3px}
.tec-prompt{font-size:13px; font-weight:700; color:#111; white-space:nowrap; overflow:hidden; text-overflow:ellipsis}
.tec-meta{font-size:12px; color:#65675E; font-variant-numeric:tabular-nums; white-space:nowrap; overflow:hidden; text-overflow:ellipsis}
.tec-bar{height:8px; border-radius:999px; background:#E5E7E0; overflow:hidden}
.tec-fill{height:100%; width:0; border-radius:999px; background:#EB9D2A; transition-property:width;
  transition-timing-function:cubic-bezier(.3,.7,.3,1); transition-delay:260ms}
.tec-r-hog.tec-in .tec-fill{width:84%; transition-duration:1260ms}
.tec-r-sql.tec-in .tec-fill{width:68%; transition-duration:1020ms}
.tec-r-ticket.tec-in .tec-fill{width:42%; transition-duration:630ms}
.tec-lat{font-size:13px; color:#4D4F46; text-align:right; font-variant-numeric:tabular-nums; opacity:0; transition:opacity 240ms ease}
.tec-r-hog.tec-in .tec-lat{opacity:1; transition-delay:1500ms}
.tec-r-sql.tec-in .tec-lat{opacity:1; transition-delay:1260ms}
.tec-r-ticket.tec-in .tec-lat{opacity:1; transition-delay:880ms}

/* posthog.com primary button look (OSButton variant="primary"). */
.tec-actions{margin-top:auto; display:flex}
.tec-btn{display:inline-block; padding:0; border:0; border-radius:6px; background:#CD8407; cursor:pointer; text-decoration:none}
.tec-btn-face{display:inline-flex; align-items:center; height:34px; padding:0 14px; box-sizing:border-box; background:#EB9D2A;
  border:1.5px solid #B17816; border-radius:6px; font-size:14px; font-weight:700; color:#111; transform:translateY(-2px);
  transition:transform 120ms ease}
.tec-btn:hover .tec-btn-face{transform:translateY(-4px)}
.tec-btn:active .tec-btn-face{transform:none}
.tec-btn:focus-visible{outline:2px solid #2F80FA; outline-offset:3px}

.tec-progress-track{position:absolute; left:0; right:0; bottom:0; height:4px; background:rgba(235,157,42,.18)}
.tec-progress{height:100%; width:100%; background:#EB9D2A}
.tec-progress.tec-run{animation-name:tec-drain; animation-timing-function:linear; animation-fill-mode:forwards}
@keyframes tec-drain{from{width:100%}to{width:0}}

/* Narrow: stack, hedgehog under the copy, pop-up spans the callout. */
@container (max-width: 639px){
  .tec-root{flex-direction:column; align-items:stretch; padding:20px}
  .tec-hog-col{align-self:center; margin:0}
  .tec-heading{font-size:20px}
  .tec-shell{left:12px; right:12px; width:auto; top:10px; height:440px}
  .tec-title{font-size:18px}
  .tec-card{height:236px; padding:4px 14px}
  .tec-row.tec-in{max-height:90px}
  .tec-row-inner{grid-template-columns:minmax(0,1fr) 32px; column-gap:10px; row-gap:8px}
  .tec-row-text{grid-column:1 / -1}
}

@media (prefers-reduced-motion: reduce){
  .tec-shell,.tec-paper,.tec-strip,.tec-content,.tec-trail,.tec-hint,.tec-nudge{animation-duration:1ms !important; animation-delay:0ms !important}
  .tec-row,.tec-fill,.tec-lat{transition-duration:1ms !important; transition-delay:0ms !important}
}
`
