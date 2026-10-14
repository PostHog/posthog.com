import React, { useState } from 'react'
import { SERIES, Tooltip, columnPath, delayStyle } from '../charts'
import type { ChartProps, TooltipState } from '../charts'

const STEPS = [
    { label: 'Signed up', users: 4820 },
    { label: 'Installed snippet', users: 3420 },
    { label: 'Invited a teammate', users: 2140 },
    { label: 'Connected Stripe', users: 920 },
    { label: 'Paid', users: 670 },
]

const SERIES_COLOR = SERIES.blue
const VALUE_SPACE = 22
const LABEL_SPACE = 34
const WIDE_BAR = 24
const NARROW_BAR = 16
const WIDE_SLOT = 72
const STAGGER_MS = 90
const RIBBON_DELAY_MS = 320
const CALLOUT_DELAY_MS = 900

const conversion = (index: number): number => STEPS[index].users / STEPS[0].users
const dropFromPrevious = (index: number): number => 1 - STEPS[index].users / STEPS[index - 1].users
const percent = (value: number): string => `${Math.round(value * 100)}%`

const WORST_STEP = STEPS.reduce(
    (worst, _, index) => (index > 0 && dropFromPrevious(index) > dropFromPrevious(worst) ? index : worst),
    1
)

export default function TrialFunnel({ width, height, isAnswered }: ChartProps): JSX.Element {
    const [tooltip, setTooltip] = useState<TooltipState | null>(null)
    const slot = width / STEPS.length
    const barWidth = slot >= WIDE_SLOT ? WIDE_BAR : NARROW_BAR
    const baseline = height - LABEL_SPACE
    const plotHeight = baseline - VALUE_SPACE
    const bars = STEPS.map((step, index) => {
        const center = slot * (index + 0.5)
        const top = baseline - plotHeight * conversion(index)
        return { ...step, index, center, top, left: center - barWidth / 2, right: center + barWidth / 2 }
    })

    return (
        <div className="relative size-full" onPointerLeave={() => setTooltip(null)}>
            <svg width={width} height={height} className="absolute inset-0 overflow-visible">
                {bars.slice(1).map((bar, offset) => {
                    const previous = bars[offset]
                    const isWorst = bar.index === WORST_STEP
                    return (
                        <path
                            key={bar.label}
                            d={`M${previous.right},${previous.top}L${bar.left},${bar.top}L${bar.left},${baseline}L${previous.right},${baseline}Z`}
                            className={`data-story-fade transition-[fill-opacity] duration-500 ${SERIES_COLOR.fill}`}
                            style={{
                                ...delayStyle(RIBBON_DELAY_MS + offset * STAGGER_MS),
                                fillOpacity: isAnswered && isWorst ? 0.28 : 0.1,
                            }}
                        />
                    )
                })}
                <line
                    x1={0}
                    x2={width}
                    y1={baseline + 0.5}
                    y2={baseline + 0.5}
                    style={{ stroke: 'rgb(var(--border))' }}
                />
                {bars.map((bar) => (
                    <path
                        key={bar.label}
                        d={columnPath(bar.left, bar.top, barWidth, baseline)}
                        className={`data-story-grow-y ${SERIES_COLOR.fill}`}
                        style={delayStyle(bar.index * STAGGER_MS)}
                    />
                ))}
                {bars.map((bar) => (
                    <text
                        key={bar.label}
                        x={bar.center}
                        y={bar.top - 7}
                        textAnchor="middle"
                        className="data-story-fade fill-current text-[11px] font-semibold tabular-nums text-primary"
                        style={delayStyle(RIBBON_DELAY_MS + bar.index * STAGGER_MS)}
                    >
                        {percent(conversion(bar.index))}
                    </text>
                ))}
            </svg>
            {bars.map((bar) => (
                <span
                    key={bar.label}
                    className="absolute -translate-x-1/2 text-center text-[10px] leading-[1.2] text-secondary"
                    style={{ left: bar.center, top: baseline + 6, width: slot - 6 }}
                >
                    {bar.label}
                </span>
            ))}
            {isAnswered && (
                <span
                    className="data-story-pop absolute flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-primary bg-primary px-1.5 font-mono text-[11px] font-semibold leading-5 text-primary shadow-sm"
                    style={{
                        ...delayStyle(CALLOUT_DELAY_MS),
                        left: (bars[WORST_STEP - 1].right + bars[WORST_STEP].left) / 2,
                        top: (bars[WORST_STEP - 1].top + bars[WORST_STEP].top) / 2 - 30,
                    }}
                >
                    −{percent(dropFromPrevious(WORST_STEP))}
                </span>
            )}
            {bars.map((bar) => (
                <span
                    key={bar.label}
                    aria-hidden
                    className="absolute top-0"
                    style={{ left: bar.center - slot / 2, width: slot, height: baseline }}
                    onPointerEnter={() =>
                        setTooltip({
                            x: bar.center,
                            y: bar.top,
                            title: bar.label,
                            rows: [
                                { label: 'Users', value: bar.users.toLocaleString('en-US') },
                                { label: 'Of signups', value: percent(conversion(bar.index)) },
                                ...(bar.index > 0
                                    ? [{ label: 'Lost at this step', value: percent(dropFromPrevious(bar.index)) }]
                                    : []),
                            ],
                        })
                    }
                />
            ))}
            <Tooltip state={tooltip} width={width} />
        </div>
    )
}

export const TRIAL_FUNNEL_WORST_STEP = STEPS[WORST_STEP].label
export const TRIAL_FUNNEL_WORST_DROP = percent(dropFromPrevious(WORST_STEP))
