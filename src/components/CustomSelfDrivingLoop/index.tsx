import React from 'react'

/**
 * CustomSelfDrivingLoop
 *
 * A prop-driven, static sibling of LiveSelfDrivingLoop. Same visual language – circular stage
 * badges with icon + color, a flowing-dashes connector, responsive horizontal→vertical via
 * @container – but the stages are passed in, and there's no live PR data, autoplay, or narration.
 * Use it to tailor the loop diagram for a specific context (e.g. the Support signal source) without
 * touching the canonical, GitHub-wired LiveSelfDrivingLoop.
 *
 * Stages fill the card width via an inline grid template (Tailwind can't purge dynamic grid-cols),
 * and the forward connector inset is derived from the stage count so it always lines up under the
 * badge centers. Pass `loop` to close the cycle with a return arc.
 */

const FLOW_CSS = `
@keyframes csdlFlow { to { background-position: 15px 0; } }
@keyframes csdlFlowV { to { background-position: 0 15px; } }
.csdl-flow { background-image: repeating-linear-gradient(90deg, currentColor 0 9px, transparent 9px 15px); animation: csdlFlow 0.9s linear infinite; }
.csdl-flow-v { background-image: repeating-linear-gradient(180deg, currentColor 0 9px, transparent 9px 15px); animation: csdlFlowV 0.9s linear infinite; }
@media (prefers-reduced-motion: reduce) { .csdl-flow, .csdl-flow-v { animation: none; } }
`

type LoopStage = {
    label: string
    icon: React.ComponentType<{ className?: string }>
    color: string
    description?: string
}

type CustomSelfDrivingLoopProps = {
    stages: LoopStage[]
    loop?: boolean
    loopLabel?: string
    header?: string
}

const StageBadge = ({ stage }: { stage: LoopStage }): JSX.Element => {
    const Icon = stage.icon
    return (
        <span
            className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-primary"
            aria-hidden
        >
            <span className="absolute inset-0 rounded-full" style={{ backgroundColor: stage.color }} />
            <span className="relative text-white">
                <Icon className="size-[22px]" />
            </span>
        </span>
    )
}

const CustomSelfDrivingLoop = ({
    stages,
    loop = false,
    loopLabel = 'the outcome becomes new signals',
    header,
}: CustomSelfDrivingLoopProps): JSX.Element => {
    const n = stages.length
    const inset = `${50 / n}%`

    return (
        <div className="not-prose @container my-6 text-primary">
            <style>{FLOW_CSS}</style>
            <div className="rounded-2xl border border-primary bg-primary px-5 py-6 shadow-sm @[600px]:px-8 @[600px]:py-7">
                {header && <div className="mb-7 text-[13px] font-semibold text-primary">{header}</div>}

                {/* ---------- Wide layout: horizontal row + flowing connector ---------- */}
                <div className="hidden @[600px]:block">
                    <div className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
                        <div
                            className="absolute top-[22px] h-px overflow-hidden"
                            style={{ left: inset, right: inset }}
                            aria-hidden
                        >
                            <div className="csdl-flow absolute inset-0" style={{ color: 'rgb(var(--border))' }} />
                        </div>
                        {stages.map((stage, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center gap-2.5 px-1 text-center">
                                <StageBadge stage={stage} />
                                <span className="text-[12.5px] font-semibold leading-tight">{stage.label}</span>
                                {stage.description && (
                                    <span className="text-[11.5px] leading-tight text-secondary">
                                        {stage.description}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {loop && (
                        <div
                            className="relative mt-2 h-9"
                            style={{ marginLeft: inset, marginRight: inset }}
                            aria-hidden
                        >
                            <div className="absolute inset-x-0 top-0 bottom-[14px] rounded-b-[36px] border-x border-b border-input" />
                            <span
                                className="absolute left-0 top-0 size-0 border-x-[5px] border-b-[7px] border-x-transparent"
                                style={{
                                    borderBottomColor: 'rgb(var(--input-border))',
                                    transform: 'translate(calc(-50% + 0.5px), -100%)',
                                }}
                            />
                            <span className="absolute bottom-[14px] left-1/2 -translate-x-1/2 translate-y-1/2 bg-primary px-2 text-[11px] text-secondary">
                                {loopLabel}
                            </span>
                        </div>
                    )}
                </div>

                {/* ---------- Narrow layout: vertical stepper + flowing vertical connector ---------- */}
                <div className="@[600px]:hidden">
                    <div className="relative flex flex-col gap-4">
                        <div className="absolute left-[22px] top-5 bottom-5 w-px overflow-hidden" aria-hidden>
                            <div className="csdl-flow-v absolute inset-0" style={{ color: 'rgb(var(--border))' }} />
                        </div>
                        {stages.map((stage, i) => (
                            <div key={i} className="relative z-10 flex items-center gap-3 text-left">
                                <StageBadge stage={stage} />
                                <span>
                                    <span className="block text-[13.5px] font-semibold leading-tight">
                                        {stage.label}
                                    </span>
                                    {stage.description && (
                                        <span className="block text-[12px] leading-tight text-secondary">
                                            {stage.description}
                                        </span>
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                    {loop && (
                        <p className="mt-4 flex items-center gap-1.5 pl-[6px] text-[11.5px] text-secondary">
                            <span aria-hidden>↻</span> {loopLabel}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CustomSelfDrivingLoop
export { CustomSelfDrivingLoop }
