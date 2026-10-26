/**
 * MCPAnalyticsHowItWorks
 *
 * The 3-step "how MCP Analytics works" diagram on the /mcp-analytics product page: wrap your MCP server,
 * get a dashboard, ask from anywhere. A Doc Brown hedgehog walks a track between the steps.
 *
 * - Plays 1 → 2 → 3 once, when 15% of the diagram is on screen, then stays on step 3.
 * - Below 860px of container width (product pages are ~730px), it shows one step at a time with step tabs.
 *   Clicking a tab jumps to that step and stops the sequence.
 * - With `prefers-reduced-motion`, it shows step 3 and does not animate.
 *
 * Styles are scoped with an `mxa-` prefix and injected inline (like LiveSelfDrivingLoop), because the
 * phase-driven transitions and keyframes do not fit in utility classes. Colors come from the site's
 * scheme variables, Tailwind tokens, and @posthog/brand/colors. No hex values.
 */
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '@posthog/brand/colors'
import { HedgehogDocBrown } from '@posthog/brand/hoggies'
import {
    IconArrowRight,
    IconBrain,
    IconChat,
    IconCheck,
    IconCopy,
    IconLogomark,
    IconServer,
    IconSparkles,
    IconTerminal,
    IconWarning,
    IconWrench,
} from '@posthog/icons'
import { buildWizardCommand } from 'components/PlatformInstall/buildCommand'

type Phase = 0 | 1 | 2 | 3

const STEPS: { phase: Exclude<Phase, 0>; title: string }[] = [
    { phase: 1, title: 'Wrap your MCP server' },
    { phase: 2, title: 'Get a dashboard' },
    { phase: 3, title: 'Ask from anywhere' },
]

// [phase, ms to wait before the next phase]
const SEQUENCE: [Phase, number][] = [
    [0, 900],
    [1, 4300],
    [2, 4300],
    [3, 0],
]

const { displayCommand, copyCommand } = buildWizardCommand({ subcommand: 'mcp-analytics' })

const ic = 'mxa-ic'

export default function MCPAnalyticsHowItWorks({ className = '' }: { className?: string }): JSX.Element {
    const rootRef = useRef<HTMLDivElement>(null)
    // Step 3 is the finished state, so the server render and no-JS readers see the whole story.
    const [phase, setPhase] = useState<Phase>(3)
    const [moving, setMoving] = useState(false)
    const [copied, setCopied] = useState(false)
    const manual = useRef(false)
    const visible = useRef(false)
    const timers = useRef<number[]>([])

    const go = (p: Phase) => {
        setPhase(p)
        setMoving(true)
        timers.current.push(window.setTimeout(() => setMoving(false), 1350))
    }

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        setPhase(0)

        let observer: IntersectionObserver | undefined
        try {
            observer = new IntersectionObserver(([entry]) => (visible.current = entry.isIntersecting), {
                threshold: 0.15,
            })
            if (rootRef.current) observer.observe(rootRef.current)
        } catch (e) {
            visible.current = true
        }

        let i = 0
        const tick = () => {
            if (manual.current) return
            if (!visible.current) {
                timers.current.push(window.setTimeout(tick, 400))
                return
            }
            const [p, wait] = SEQUENCE[i]
            go(p)
            i++
            if (i < SEQUENCE.length) timers.current.push(window.setTimeout(tick, wait))
        }
        tick()

        return () => {
            observer?.disconnect()
            timers.current.forEach(clearTimeout)
        }
    }, [])

    const jumpTo = (p: Phase) => {
        manual.current = true
        go(p)
    }

    const copy = () => {
        navigator.clipboard?.writeText(copyCommand).then(
            () => {
                setCopied(true)
                timers.current.push(window.setTimeout(() => setCopied(false), 1600))
            },
            () => undefined
        )
    }

    return (
        <div
            ref={rootRef}
            className={`mxa not-prose text-primary [--mxa-ink:theme(colors.black)] [--mxa-paper:theme(colors.light-1)] [--mxa-btn-border:theme(colors.button-border)] [--mxa-btn-shadow:theme(colors.button-shadow)] dark:[--mxa-btn-shadow:theme(colors.button-shadow-dark)] ${className}`}
        >
            <style>{CSS}</style>
            <section
                className="mxa-diagram"
                data-phase={phase}
                aria-label="MCP Analytics in three steps: wrap your MCP server, get a pre-built dashboard, ask questions from anywhere"
            >
                <div className="mxa-flow">
                    {/* Step 1 */}
                    <div className="mxa-step mxa-s1">
                        <div className="mxa-head">
                            <span className="mxa-num">1</span>
                            <span className="mxa-title">{STEPS[0].title}</span>
                        </div>
                        <div className="mxa-stage" data-scheme="secondary">
                            <div className="mxa-ring">
                                <span className="mxa-ph-badge mxa-rv" style={{ '--d': '.7s' } as React.CSSProperties}>
                                    <IconLogomark className={ic} />
                                </span>
                                <div className="mxa-server mxa-rv" style={{ '--d': '.2s' } as React.CSSProperties}>
                                    <div className="mxa-server-top">
                                        <IconServer className={ic} />
                                        MCP server
                                    </div>
                                    {[0, 1, 2].map((n) => (
                                        <div className="mxa-tool" key={n}>
                                            <IconWrench className={ic} />
                                            <i />
                                        </div>
                                    ))}
                                    <span className="mxa-live mxa-rv" style={{ '--d': '1.5s' } as React.CSSProperties}>
                                        <IconCheck className={ic} />
                                    </span>
                                </div>
                            </div>
                            <div className="mxa-wiz mxa-rv" style={{ '--d': '1s' } as React.CSSProperties}>
                                <span className="mxa-pr">$</span>
                                <span className="mxa-cmd">{displayCommand}</span>
                                <button
                                    className={`mxa-cp ${copied ? 'mxa-done' : ''}`}
                                    type="button"
                                    aria-label="Copy command"
                                    onClick={copy}
                                >
                                    <IconCopy className={`${ic} mxa-c1`} />
                                    <IconCheck className={`${ic} mxa-c2`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mxa-arrow-wrap">
                        <span className="mxa-arrow mxa-a1">
                            <IconArrowRight className={ic} />
                        </span>
                    </div>

                    {/* Step 2 */}
                    <div className="mxa-step mxa-s2">
                        <div className="mxa-head">
                            <span className="mxa-num">2</span>
                            <span className="mxa-title">{STEPS[1].title}</span>
                        </div>
                        <div className="mxa-stage" data-scheme="secondary">
                            <div className="mxa-dash">
                                <div className="mxa-tile mxa-rv" style={{ '--d': '.1s' } as React.CSSProperties}>
                                    <span className="mxa-tile-l">
                                        <IconWrench className={ic} />
                                        Tool calls
                                    </span>
                                    <span className="mxa-big">12.4k</span>
                                    <svg className="mxa-spark" viewBox="0 0 100 28" preserveAspectRatio="none">
                                        <path
                                            className="mxa-draw"
                                            pathLength={1}
                                            stroke="var(--yellow)"
                                            d="M0 22 L11 20 L22 23 L33 15 L44 17 L55 10 L66 13 L77 6 L88 8 L100 3"
                                        />
                                    </svg>
                                </div>
                                <div className="mxa-tile mxa-rv" style={{ '--d': '.25s' } as React.CSSProperties}>
                                    <span className="mxa-tile-l">
                                        <IconBrain className={ic} />
                                        Models
                                    </span>
                                    <svg className="mxa-chart" viewBox="0 0 120 56" preserveAspectRatio="none">
                                        <line className="mxa-grid-l" x1="0" y1="14" x2="120" y2="14" />
                                        <line className="mxa-grid-l" x1="0" y1="30" x2="120" y2="30" />
                                        <line className="mxa-grid-l" x1="0" y1="46" x2="120" y2="46" />
                                        <path
                                            className="mxa-area"
                                            fill="var(--yellow)"
                                            fillOpacity=".2"
                                            d="M0 44 C12 40 20 46 32 36 S52 30 62 24 S82 26 92 14 S110 10 120 6 L120 56 L0 56 Z"
                                        />
                                        <path
                                            className="mxa-draw"
                                            pathLength={1}
                                            stroke="var(--yellow)"
                                            d="M0 44 C12 40 20 46 32 36 S52 30 62 24 S82 26 92 14 S110 10 120 6"
                                        />
                                        <path
                                            className="mxa-draw"
                                            pathLength={1}
                                            stroke="var(--blue)"
                                            d="M0 51 C14 48 24 50 36 45 S58 43 70 38 S96 37 106 31 S116 30 120 28"
                                        />
                                    </svg>
                                </div>
                                <div
                                    className="mxa-tile mxa-struggle mxa-rv"
                                    style={{ '--d': '.4s' } as React.CSSProperties}
                                >
                                    <span className="mxa-tile-l">
                                        <IconWarning className={ic} />
                                        Error rate
                                    </span>
                                    {[
                                        { tool: 'search_jobs', w: '7%', d: '.9s', pct: '4%' },
                                        { tool: 'get_listing', w: '16%', d: '1s', pct: '9%' },
                                        { tool: 'book_slot', w: '68%', d: '1.1s', pct: '38%', bad: true },
                                    ].map((r) => (
                                        <div className={`mxa-row ${r.bad ? 'mxa-bad' : ''}`} key={r.tool}>
                                            <b>{r.tool}</b>
                                            <span className="mxa-bar">
                                                <i style={{ '--w': r.w, '--d': r.d } as React.CSSProperties} />
                                            </span>
                                            <span className="mxa-pct">
                                                {r.bad && <IconWarning className={ic} />}
                                                {r.pct}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mxa-arrow-wrap">
                        <span className="mxa-arrow mxa-a2">
                            <IconArrowRight className={ic} />
                        </span>
                    </div>

                    {/* Step 3 */}
                    <div className="mxa-step mxa-s3">
                        <div className="mxa-head">
                            <span className="mxa-num">3</span>
                            <span className="mxa-title">{STEPS[2].title}</span>
                        </div>
                        <div className="mxa-stage" data-scheme="secondary">
                            <div className="mxa-chat">
                                <div className="mxa-srcs mxa-rv" style={{ '--d': '0s' } as React.CSSProperties}>
                                    <span className="mxa-src">
                                        <IconChat className={ic} />
                                        Slack
                                    </span>
                                    <span className="mxa-src">
                                        <IconTerminal className={ic} />
                                        MCP client
                                    </span>
                                    <span className="mxa-src">
                                        <IconSparkles className={ic} />
                                        PostHog AI
                                    </span>
                                </div>
                                <div
                                    className="mxa-bubble mxa-me mxa-rv"
                                    style={{ '--d': '.4s' } as React.CSSProperties}
                                >
                                    Which tools are slowest?
                                </div>
                                <div className="mxa-reply">
                                    <div className="mxa-typing">
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                    <div
                                        className="mxa-bubble mxa-ai mxa-rv"
                                        style={{ '--d': '2.4s' } as React.CSSProperties}
                                    >
                                        <div className="mxa-txt">
                                            <IconSparkles className={ic} />
                                            <span>Here’s a ranking by p95 latency over the last 30 days.</span>
                                        </div>
                                        <div className="mxa-tbl">
                                            <div className="mxa-tr mxa-th">
                                                <span>Tool</span>
                                                <span>Calls</span>
                                                <span>Errors</span>
                                                <span>p95</span>
                                            </div>
                                            <div
                                                className="mxa-tr mxa-rv"
                                                style={{ '--d': '2.8s' } as React.CSSProperties}
                                            >
                                                <b>training_runs</b>
                                                <span>122</span>
                                                <span>31</span>
                                                <span className="mxa-hi">287s</span>
                                            </div>
                                            <div
                                                className="mxa-tr mxa-rv"
                                                style={{ '--d': '3s' } as React.CSSProperties}
                                            >
                                                <b>property_defs</b>
                                                <span>30</span>
                                                <span>1</span>
                                                <span className="mxa-hi">80s</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step tabs: only shown in the narrow layout. */}
                <div className="mxa-steptabs">
                    {STEPS.map((s) => (
                        <button
                            key={s.phase}
                            type="button"
                            className="mxa-st"
                            data-p={s.phase}
                            aria-pressed={phase === s.phase || (s.phase === 1 && phase === 0)}
                            onClick={() => jumpTo(s.phase)}
                        >
                            <span className="mxa-n">{s.phase}</span>
                            <span className="mxa-t">{s.title}</span>
                        </button>
                    ))}
                </div>

                {/* Doc Brown hog travels the three steps. */}
                <div className="mxa-track" aria-hidden="true">
                    <div className="mxa-ground" />
                    <div className="mxa-fill" />
                    <span className="mxa-dot" />
                    <span className="mxa-dot" />
                    <span className="mxa-dot" />
                    <div className={`mxa-hog ${moving ? 'mxa-moving' : ''}`}>
                        <HedgehogDocBrown className="mxa-hog-img" />
                    </div>
                </div>
            </section>
        </div>
    )
}

const mono = 'ui-monospace,SFMono-Regular,Menlo,Consolas,monospace'

// Ported from the reviewed standalone diagram. Inside each `.mxa-stage` (data-scheme="secondary"), the
// scheme variables resolve to the secondary surface, so stage colors are re-read there.
const CSS = `
.mxa{container:mxa / inline-size;margin-top:28px;font-weight:500;-webkit-font-smoothing:antialiased;
  --blue:${colors.blue.core};--yellow:${colors.yellow.core};--green:${colors.green.core};--tang:${colors.tangerine.core};--tang-d:${colors.tangerine.darker};
  --page:rgb(var(--bg));--line:rgb(var(--border));--text:rgb(var(--text-primary));--text2:rgb(var(--text-secondary));--muted:rgb(var(--text-muted));
  --tab-border:rgb(var(--input-border));--tab-bg:rgb(var(--input-bg));--halo:none}
.dark .mxa{--tang-d:${colors.tangerine.core};--halo:drop-shadow(0 0 1.5px rgb(var(--text-primary))) drop-shadow(0 0 1px rgb(var(--text-primary)))}
.mxa *,.mxa *::before,.mxa *::after{box-sizing:border-box}
.mxa-ic{width:1em;height:1em;fill:currentColor;flex:none;display:block}
.mxa button:focus-visible{outline:2px solid var(--blue);outline-offset:2px}

.mxa-diagram{max-width:1080px;margin:0 auto;padding:4px 0 10px;display:flex;flex-direction:column;
  --x1:calc((100% - 80px) / 6);--x2:50%;--x3:calc(100% - (100% - 80px) / 6)}
.mxa-steptabs{display:none}

/* flow */
.mxa-flow{display:grid;grid-template-columns:1fr 40px 1fr 40px 1fr;align-items:start}
.mxa-step{--c:var(--blue);display:flex;flex-direction:column;gap:14px;opacity:.5;transition:opacity .6s ease,transform .6s ease}
.mxa-s2{--c:var(--yellow)} .mxa-s3{--c:var(--green)}
.mxa-head{display:flex;align-items:center;gap:10px;height:30px}
.mxa-num{width:28px;height:28px;border-radius:50%;background:var(--c);color:var(--mxa-ink);font-weight:700;font-size:14px;display:grid;place-items:center;flex:none}
.mxa-title{font-weight:700;font-size:20px;letter-spacing:-.01em;line-height:1.1}
.mxa-diagram[data-phase="1"] .mxa-s1,.mxa-diagram[data-phase="2"] .mxa-s2,.mxa-diagram[data-phase="3"] .mxa-s3{opacity:1;transform:translateY(-4px)}
.mxa-diagram[data-phase="2"] .mxa-s1,.mxa-diagram[data-phase="3"] .mxa-s1,.mxa-diagram[data-phase="3"] .mxa-s2{opacity:.92}

.mxa-stage{--card:rgb(var(--bg));--inner:rgb(var(--input-bg));--bd:rgb(var(--accent));--sb:rgb(var(--border));
  --text:rgb(var(--text-primary));--text2:rgb(var(--text-secondary));--muted:rgb(var(--text-muted));
  position:relative;height:252px;border:1.5px solid var(--sb);background:var(--card);color:var(--text);border-radius:12px;overflow:hidden;box-shadow:0 3px 0 var(--sb);transition:border-color .5s ease}
.mxa-diagram[data-phase="1"] .mxa-s1 .mxa-stage,.mxa-diagram[data-phase="2"] .mxa-s2 .mxa-stage,.mxa-diagram[data-phase="3"] .mxa-s3 .mxa-stage{border-color:var(--c)}

.mxa-arrow{height:30px;display:grid;place-items:center;color:var(--muted);font-size:24px;transition:color .5s ease,transform .5s ease}
.mxa-arrow-wrap{display:grid;grid-template-rows:30px 14px 252px}
.mxa-arrow-wrap .mxa-arrow{grid-row:3;align-self:center;height:auto}
.mxa-diagram:is([data-phase="2"],[data-phase="3"]) .mxa-a1,.mxa-diagram[data-phase="3"] .mxa-a2{color:var(--text);transform:translateX(3px)}

/* reveal helper */
.mxa-rv{opacity:0;transform:translateY(8px);transition:opacity .5s ease var(--d,0s),transform .5s ease var(--d,0s)}
.mxa-diagram:is([data-phase="1"],[data-phase="2"],[data-phase="3"]) .mxa-s1 .mxa-rv,
.mxa-diagram:is([data-phase="2"],[data-phase="3"]) .mxa-s2 .mxa-rv,
.mxa-diagram[data-phase="3"] .mxa-s3 .mxa-rv{opacity:1;transform:none}
.mxa-diagram[data-phase="0"] *{transition-duration:0s !important;transition-delay:0s !important;animation:none !important}

/* step 1 */
.mxa-ring{position:absolute;inset:32px 28px 78px;border:2px dashed var(--blue);border-radius:16px;display:grid;place-items:center;opacity:0;transform:scale(1.14);transition:opacity .6s ease .35s,transform .7s cubic-bezier(.2,.8,.2,1) .35s}
.mxa-diagram:is([data-phase="1"],[data-phase="2"],[data-phase="3"]) .mxa-ring{opacity:1;transform:none}
.mxa-diagram[data-phase="1"] .mxa-ring{animation:mxa-zap 1.1s ease 1s 2}
@keyframes mxa-zap{0%,100%{box-shadow:0 0 0 0 transparent}50%{box-shadow:0 0 0 6px color-mix(in srgb,var(--blue) 28%,transparent),0 0 22px 2px color-mix(in srgb,var(--blue) 45%,transparent)}}
.mxa-ph-badge{position:absolute;top:-17px;left:16px;width:32px;height:32px;border-radius:50%;background:var(--blue);color:var(--mxa-paper);display:grid;place-items:center;font-size:19px;border:3px solid var(--card)}
.mxa-server{width:72%;background:var(--inner);border:1.5px solid var(--bd);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:9px;position:relative}
.mxa-server-top{display:flex;align-items:center;gap:8px;font-weight:700;font-size:14px}
.mxa-server-top .mxa-ic{font-size:20px}
.mxa-tool{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:14px}
.mxa-tool i{display:block;height:7px;border-radius:4px;background:var(--bd);flex:1}
.mxa-tool:nth-child(3) i{max-width:70%} .mxa-tool:nth-child(4) i{max-width:48%}
.mxa-live{position:absolute;right:-12px;top:-12px;width:26px;height:26px;border-radius:50%;background:var(--green);color:var(--mxa-ink);display:grid;place-items:center;font-size:15px;border:3px solid var(--card)}
.mxa-wiz{position:absolute;left:50%;bottom:17px;translate:-50% 0;display:flex;align-items:center;gap:8px;background:var(--inner);color:var(--text);border:1.5px solid var(--mxa-btn-border);border-radius:6px;padding:4px 4px 4px 11px;font-family:${mono};font-size:11.5px;font-weight:500;white-space:nowrap;box-shadow:0 3px 0 var(--mxa-btn-shadow);transition:opacity .5s ease var(--d,0s),transform .5s ease var(--d,0s),translate .15s ease,box-shadow .15s ease}
.mxa-wiz:hover{translate:-50% -2px;box-shadow:0 5px 0 var(--mxa-btn-shadow)}
.mxa-pr{color:var(--muted);user-select:none}
.mxa-cmd{user-select:all}
.mxa-cp{appearance:none;border:0;cursor:pointer;position:relative;width:26px;height:26px;border-radius:5px;background:var(--card);color:var(--text2);display:grid;place-items:center;font-size:15px;padding:0;transition:background .2s ease,color .2s ease}
.mxa-cp:hover{background:var(--bd);color:var(--text)}
.mxa-cp .mxa-ic{grid-area:1/1;transition:opacity .2s ease}
.mxa-cp .mxa-c2{opacity:0}
.mxa-cp.mxa-done{background:var(--green);color:var(--mxa-ink)}
.mxa-cp.mxa-done .mxa-c1{opacity:0}
.mxa-cp.mxa-done .mxa-c2{opacity:1}

/* step 2 */
.mxa-dash{position:absolute;inset:14px;display:grid;grid-template-columns:1fr 1.5fr;grid-template-rows:96px 1fr;gap:10px}
.mxa-tile{background:var(--inner);border:1.5px solid var(--bd);border-radius:10px;padding:9px 11px;display:flex;flex-direction:column;min-width:0}
.mxa-tile-l{font-size:12px;color:var(--text2);display:flex;align-items:center;gap:5px}
.mxa-tile-l .mxa-ic{font-size:13px}
.mxa-big{font-weight:700;font-size:23px;letter-spacing:-.02em;line-height:1.1;margin-top:2px}
.mxa-spark,.mxa-chart{width:100%;flex:1;min-height:0;margin-top:2px;overflow:visible}
.mxa-draw{fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1;vector-effect:non-scaling-stroke;transition:stroke-dashoffset 1.2s ease .5s}
.mxa-diagram:is([data-phase="2"],[data-phase="3"]) .mxa-draw{stroke-dashoffset:0}
.mxa-area{opacity:0;transition:opacity .8s ease 1.2s}
.mxa-diagram:is([data-phase="2"],[data-phase="3"]) .mxa-area{opacity:1}
.mxa-grid-l{stroke:var(--bd);stroke-width:1;vector-effect:non-scaling-stroke}
.mxa-struggle{grid-column:1 / -1;display:flex;flex-direction:column;gap:6px;justify-content:center}
.mxa-row{display:grid;grid-template-columns:86px 1fr 38px;align-items:center;gap:8px;font-size:12px}
.mxa-row b{font-weight:500;font-family:${mono};font-size:11.5px;color:var(--text2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mxa-bar{height:8px;border-radius:4px;background:var(--bd);overflow:hidden}
.mxa-bar i{display:block;height:100%;width:0;border-radius:4px;background:var(--green);transition:width .9s ease var(--d,0s)}
.mxa-diagram:is([data-phase="2"],[data-phase="3"]) .mxa-s2 .mxa-bar i{width:var(--w)}
.mxa-row.mxa-bad b{color:var(--text);font-weight:700}
.mxa-row.mxa-bad .mxa-bar i{background:var(--tang)}
.mxa-pct{text-align:right;color:var(--text2);font-variant-numeric:tabular-nums}
.mxa-row.mxa-bad .mxa-pct{color:var(--tang-d);font-weight:700;display:flex;align-items:center;justify-content:flex-end;gap:3px}
.mxa-row.mxa-bad .mxa-pct .mxa-ic{font-size:13px}
.mxa-diagram:is([data-phase="2"],[data-phase="3"]) .mxa-row.mxa-bad .mxa-pct .mxa-ic{animation:mxa-wob 1.2s ease 2.2s 2}
@keyframes mxa-wob{0%,100%{transform:none}25%{transform:rotate(-14deg)}75%{transform:rotate(14deg)}}

/* step 3 */
.mxa-chat{position:absolute;inset:14px;display:flex;flex-direction:column;gap:9px}
.mxa-srcs{display:flex;gap:6px;flex-wrap:nowrap;margin-bottom:5px}
.mxa-src{display:inline-flex;align-items:center;gap:5px;white-space:nowrap;background:var(--inner);border:1.5px solid var(--green);border-radius:999px;padding:4px 9px 4px 7px;font-size:12px;font-weight:700;color:var(--text)}
.mxa-src .mxa-ic{font-size:14px}
.mxa-bubble{border-radius:12px;padding:9px 12px;font-size:13.5px;font-weight:700;line-height:1.25;max-width:88%}
.mxa-me{align-self:flex-end;background:var(--green);color:var(--mxa-ink);border-bottom-right-radius:4px}
.mxa-ai{align-self:flex-start;background:var(--inner);border:1.5px solid var(--bd);border-bottom-left-radius:4px;width:100%;max-width:100%;padding:10px 12px;font-weight:500;display:flex;flex-direction:column;gap:8px}
.mxa-txt{display:flex;align-items:flex-start;gap:6px;font-size:12.5px;line-height:1.3;font-weight:500;color:var(--text)}
.mxa-txt .mxa-ic{font-size:15px;color:var(--green);margin-top:1px}
.mxa-tbl{border:1.5px solid var(--bd);border-radius:8px;overflow:hidden;font-size:11px;margin-top:2px}
.mxa-tr{display:grid;grid-template-columns:1.5fr .7fr .8fr .8fr;gap:6px;padding:5px 9px;align-items:center;border-top:1px solid var(--bd);min-width:0}
.mxa-tr.mxa-th{background:var(--card);border-top:0;color:var(--text2);font-weight:700;font-size:11px}
.mxa-tr b{font-weight:500;font-family:${mono};font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mxa-tr span{color:var(--text2);font-variant-numeric:tabular-nums}
.mxa-tr span.mxa-hi{color:var(--text);font-weight:700}
.mxa-reply{display:grid;grid-template-areas:"x"}
.mxa-reply>*{grid-area:x}
.mxa-typing{align-self:flex-start;display:flex;gap:4px;padding:12px 14px;background:var(--inner);border:1.5px solid var(--bd);border-radius:12px;border-bottom-left-radius:4px;height:fit-content;opacity:0}
.mxa-typing span{width:6px;height:6px;border-radius:50%;background:var(--muted);animation:mxa-bob .7s ease infinite}
.mxa-typing span:nth-child(2){animation-delay:.12s}.mxa-typing span:nth-child(3){animation-delay:.24s}
@keyframes mxa-bob{0%,100%{transform:none}50%{transform:translateY(-4px)}}
.mxa-diagram[data-phase="3"] .mxa-typing{animation:mxa-typing 1.3s ease 1s both}
@keyframes mxa-typing{0%{opacity:0}12%,85%{opacity:1}100%{opacity:0}}

/* hog track */
.mxa-track{position:relative;height:196px;margin-top:2px}
.mxa-ground{position:absolute;left:0;right:0;bottom:16px;height:3px;border-radius:2px;background:var(--line)}
.mxa-fill{position:absolute;left:var(--x1);bottom:16px;height:3px;border-radius:2px;width:0;background:linear-gradient(90deg,var(--blue),var(--yellow),var(--green));transition:width 1.3s cubic-bezier(.6,0,.2,1)}
.mxa-diagram[data-phase="2"] .mxa-fill{width:calc(var(--x2) - var(--x1));background:linear-gradient(90deg,var(--blue),var(--yellow))}
.mxa-diagram[data-phase="3"] .mxa-fill{width:calc(var(--x3) - var(--x1))}
.mxa-dot{position:absolute;bottom:11px;width:13px;height:13px;margin-left:-6.5px;border-radius:50%;background:var(--page);border:3px solid var(--line);transition:background .4s ease,border-color .4s ease}
.mxa-dot:nth-of-type(1){left:var(--x1)} .mxa-dot:nth-of-type(2){left:var(--x2)} .mxa-dot:nth-of-type(3){left:var(--x3)}
.mxa-diagram:is([data-phase="1"],[data-phase="2"],[data-phase="3"]) .mxa-dot:nth-of-type(1){background:var(--blue);border-color:var(--blue)}
.mxa-diagram:is([data-phase="2"],[data-phase="3"]) .mxa-dot:nth-of-type(2){background:var(--yellow);border-color:var(--yellow)}
.mxa-diagram[data-phase="3"] .mxa-dot:nth-of-type(3){background:var(--green);border-color:var(--green)}
.mxa-hog{position:absolute;bottom:0;left:var(--x1);width:180px;margin-left:-90px;transition:left 1.3s cubic-bezier(.6,0,.2,1);pointer-events:none}
.mxa-diagram[data-phase="2"] .mxa-hog{left:var(--x2)}
.mxa-diagram[data-phase="3"] .mxa-hog{left:var(--x3)}
.mxa-hog-img{display:block;width:100%;height:auto;transform-origin:50% 95%;filter:var(--halo)}
.mxa-hog.mxa-moving .mxa-hog-img{animation:mxa-hop .43s ease-in-out 3}
@keyframes mxa-hop{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-14px) rotate(2.5deg)}}

/* Reader-width layout: one stage at a time, the hog walks between three step tabs. */
@container mxa (max-width: 859px){
  .mxa-diagram{--x1:16.667%;--x2:50%;--x3:83.333%}
  .mxa-track{order:1;height:118px;margin:0 auto -2px;width:100%;max-width:520px}
  .mxa-ground,.mxa-fill{bottom:12px}
  .mxa-dot{bottom:7px}
  .mxa-hog{width:104px;margin-left:-52px;bottom:-2px}
  .mxa-steptabs{order:2;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;width:100%;max-width:520px;margin:0 auto 10px}
  .mxa-flow{order:3;display:grid;grid-template-columns:minmax(0,1fr);width:100%;max-width:520px;margin:0 auto}
  .mxa-arrow-wrap{display:none}
  .mxa-step{grid-area:1/1;opacity:0 !important;visibility:hidden;transform:none !important;transition:opacity .35s ease}
  .mxa-step .mxa-head{display:none}
  .mxa-diagram:is([data-phase="0"],[data-phase="1"]) .mxa-s1,.mxa-diagram[data-phase="2"] .mxa-s2,.mxa-diagram[data-phase="3"] .mxa-s3{opacity:1 !important;visibility:visible}
  .mxa-stage{width:100%}
  .mxa-st{--c:var(--blue);appearance:none;font:inherit;display:flex;align-items:center;gap:7px;min-width:0;padding:7px 9px;border-radius:9px;
    border:1.5px solid var(--tab-border);background:transparent;color:var(--text2);cursor:pointer;text-align:left;font-size:13px;font-weight:700;line-height:1.15}
  .mxa-st[data-p="2"]{--c:var(--yellow)} .mxa-st[data-p="3"]{--c:var(--green)}
  .mxa-st .mxa-n{width:22px;height:22px;border-radius:50%;flex:none;display:grid;place-items:center;font-size:12px;background:var(--tab-bg);color:var(--text2);transition:background .3s ease,color .3s ease}
  .mxa-st .mxa-t{min-width:0;overflow-wrap:anywhere}
  .mxa-diagram:is([data-phase="0"],[data-phase="1"]) .mxa-st[data-p="1"],.mxa-diagram[data-phase="2"] .mxa-st[data-p="2"],.mxa-diagram[data-phase="3"] .mxa-st[data-p="3"]{border-color:var(--c);background:var(--tab-bg);color:var(--text)}
  .mxa-diagram:is([data-phase="0"],[data-phase="1"]) .mxa-st[data-p="1"] .mxa-n,.mxa-diagram[data-phase="2"] .mxa-st[data-p="2"] .mxa-n,.mxa-diagram[data-phase="3"] .mxa-st[data-p="3"] .mxa-n{background:var(--c);color:var(--mxa-ink)}
}
@container mxa (max-width: 420px){
  .mxa-st{flex-direction:column;align-items:flex-start;gap:4px;font-size:12px;padding:7px 8px}
  .mxa-stage{height:272px}
  .mxa-srcs{flex-wrap:wrap}
  .mxa-chat{gap:7px}
  .mxa-dash{grid-template-rows:88px 1fr}
  .mxa-row{grid-template-columns:76px 1fr 34px}
  .mxa-hog{width:92px;margin-left:-46px}
  .mxa-track{height:104px}
}
@container mxa (max-width: 340px){
  .mxa-st .mxa-t{font-size:11px}
  .mxa-src{font-size:11px;padding:3px 7px 3px 6px}
  .mxa-tr{grid-template-columns:1.4fr .6fr .7fr .7fr;padding:5px 7px}
}
@media (prefers-reduced-motion: reduce){
  .mxa *,.mxa *::before,.mxa *::after{animation:none !important;transition:none !important}
}
`
