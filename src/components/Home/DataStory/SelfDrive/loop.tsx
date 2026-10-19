import React from 'react'
import { motion } from 'framer-motion'
import { IconCheck, IconPerson, IconPullRequest, IconSpinner } from '@posthog/icons'
import { cn } from '../../../../utils'
import { IOS_SPRING } from '../Ingest/session'
import { transform } from '../timeline'
import { PressCursor, pressCursorBoundaries } from '../Act/report'

export const LOOP_MS = 16000
export const RESTING_MOMENT = 12500
export const LOOP_FADE_OUT_AT = LOOP_MS - 700

export const PR_OPENED_AT = 1400
export const CHECKS_SHOWN_AT = PR_OPENED_AT + 400
export const MERGE_BOX_SHOWN_AT = PR_OPENED_AT + 800
export const MERGE_PRESS_AT = 4900
export const MERGED_AT = 5100
export const MERGE_SETTLED_AT = MERGED_AT + 650
export const MERGE_BOX_EXIT_MS = 300
export const MERGED_EVENT_AT = MERGE_SETTLED_AT + MERGE_BOX_EXIT_MS + 50
export const SOAK_AT = 7000
const METRIC_REVEAL_AT = 7400
const METRIC_REVEAL_MS = 2200
export const CHECK_PASSED_AT = 9800
export const RESOLVED_AT = 10600

export const REPORT_NUMBER = 12
export const PR = { number: 482, title: 'Guard `plan` in checkout', file: 'checkout.tsx', additions: 4, deletions: 1 }

export const CHECKS = [
    { name: 'Lint', passesAt: 2300 },
    { name: 'Unit tests', passesAt: 2900 },
    { name: 'Typecheck', passesAt: 3500 },
]

const CONVERSION = [72, 73, 71, 72, 70, 44, 41, 42, 40, 58, 69, 73, 74, 74]
const MERGE_INDEX = 8
export const CONVERSION_BEFORE = 41
export const CONVERSION_AFTER = 74

export const ENTER = {
    initial: { opacity: 0, transform: transform({ y: 8 }) },
    animate: { opacity: 1, transform: transform() },
    exit: { opacity: 0, transform: transform({ y: -8 }) },
    transition: IOS_SPRING,
}

export const InlineTitle = ({ text }: { text: string }) => (
    <>
        {text.split('`').map((segment, index) =>
            index % 2 === 1 ? (
                <code key={index} className="!border-0 !bg-transparent !p-0 font-code !text-[0.95em]">
                    {segment}
                </code>
            ) : (
                <React.Fragment key={index}>{segment}</React.Fragment>
            )
        )}
    </>
)

export const StatusPill = ({ merged }: { merged: boolean }) => (
    <span
        className={cn(
            'inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold text-white transition-colors',
            merged ? 'bg-purple' : 'bg-green'
        )}
    >
        <IconPullRequest className="size-3" />
        {merged ? 'Merged' : 'Open'}
    </span>
)

export const CheckList = ({ elapsed }: { elapsed: number }) => (
    <ul className="m-0 flex list-none flex-col gap-1 p-0">
        {CHECKS.map(({ name, passesAt }) => {
            const passed = elapsed >= passesAt
            return (
                <li key={name} className="m-0 flex items-center gap-1.5 text-xs">
                    {passed ? (
                        <IconCheck className="size-3.5 text-green" />
                    ) : (
                        <IconSpinner className="size-3.5 animate-spin text-secondary" />
                    )}
                    <span className={passed ? 'text-primary' : 'text-secondary'}>{name}</span>
                </li>
            )
        })}
    </ul>
)

export const MergeButton = ({ elapsed }: { elapsed: number }) => {
    const merged = elapsed >= MERGED_AT
    const ready = CHECKS.every(({ passesAt }) => elapsed >= passesAt)
    return (
        <PressCursor elapsed={elapsed} pressAt={MERGE_PRESS_AT}>
            <span
                className={cn(
                    'inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-semibold transition-colors',
                    merged ? 'bg-purple/15 text-purple' : ready ? 'bg-green text-white' : 'bg-accent text-secondary'
                )}
            >
                <span className="grid">
                    <span className={cn('[grid-area:1/1]', merged && 'invisible')}>Merge pull request</span>
                    <span className={cn('text-center [grid-area:1/1]', !merged && 'invisible')}>Merged by you</span>
                </span>
            </span>
        </PressCursor>
    )
}

const CHART_WIDTH = 200
const CHART_HEIGHT = 64
const VALUE_FLOOR = 30
const VALUE_RANGE = 50

const chartX = (index: number): number => (index / (CONVERSION.length - 1)) * CHART_WIDTH
const chartY = (value: number): number => CHART_HEIGHT - ((value - VALUE_FLOOR) / VALUE_RANGE) * CHART_HEIGHT
const LINE = CONVERSION.map((value, index) => `${index === 0 ? 'M' : 'L'} ${chartX(index)} ${chartY(value)}`).join(' ')
const AREA = `${LINE} L ${CHART_WIDTH} ${CHART_HEIGHT} L 0 ${CHART_HEIGHT} Z`
const MERGE_X_PERCENT = (chartX(MERGE_INDEX) / CHART_WIDTH) * 100

export const CheckChart = ({ elapsed, className }: { elapsed: number; className?: string }) => {
    const revealing = elapsed >= METRIC_REVEAL_AT
    const passed = elapsed >= CHECK_PASSED_AT
    return (
        <div className={cn('flex flex-col gap-1.5', className)}>
            <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-semibold">Follow-up check · checkout conversion</span>
                <span
                    className={cn(
                        'inline-flex shrink-0 items-center gap-1 font-semibold',
                        passed ? 'text-green' : 'text-secondary'
                    )}
                >
                    {passed ? <IconCheck className="size-3.5" /> : <IconSpinner className="size-3.5 animate-spin" />}
                    {passed ? `Passed · ${CONVERSION_BEFORE}% → ${CONVERSION_AFTER}%` : 'Watching'}
                </span>
            </div>
            <div className="relative overflow-hidden rounded-md border border-primary bg-primary">
                <svg
                    viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                    className="block h-16 w-full"
                    preserveAspectRatio="none"
                >
                    <path d={AREA} className="fill-blue/10" />
                    <path
                        d={LINE}
                        fill="none"
                        className="stroke-blue"
                        strokeWidth={1.5}
                        vectorEffect="non-scaling-stroke"
                    />
                    <line
                        x1={chartX(MERGE_INDEX)}
                        x2={chartX(MERGE_INDEX)}
                        y1={0}
                        y2={CHART_HEIGHT}
                        className="stroke-purple"
                        strokeDasharray="3 3"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
                <motion.div
                    className="absolute inset-y-0 right-0 origin-right bg-primary"
                    style={{ left: `${MERGE_X_PERCENT}%` }}
                    initial={false}
                    animate={{ transform: `scaleX(${revealing ? 0 : 1})` }}
                    transition={{ duration: revealing ? METRIC_REVEAL_MS / 1000 : 0, ease: 'easeInOut' }}
                />
                <span
                    className="absolute top-1 -translate-x-1/2 rounded bg-purple px-1 text-[9px] font-semibold text-white"
                    style={{ left: `${MERGE_X_PERCENT}%` }}
                >
                    Merged
                </span>
            </div>
        </div>
    )
}

export const ALL_CHECKS_PASS_AT = Math.max(...CHECKS.map(({ passesAt }) => passesAt))

export const PostHogAvatar = ({ className }: { className?: string }) => (
    <span
        className={cn(
            'flex size-6 shrink-0 items-center justify-center rounded-full border border-primary bg-white',
            className
        )}
    >
        <img src="/brand/posthog-logomark.svg" alt="" className="w-3.5" />
    </span>
)

export const UserAvatar = ({ className }: { className?: string }) => (
    <span
        className={cn(
            'flex size-6 shrink-0 items-center justify-center rounded-full border border-primary bg-accent text-secondary',
            className
        )}
    >
        <IconPerson className="size-[65%]" />
    </span>
)

export const MergeBox = ({ elapsed }: { elapsed: number }) => {
    const merged = elapsed >= MERGED_AT
    const checksPassed = elapsed >= ALL_CHECKS_PASS_AT
    return (
        <div
            className={cn(
                'flex items-center justify-between gap-3 rounded-md border p-2.5 transition-colors',
                merged ? 'border-purple/40 bg-purple/5' : checksPassed ? 'border-green/40 bg-green/5' : 'border-primary'
            )}
        >
            <div className="min-w-0">
                <p className="m-0 text-xs font-semibold">
                    {merged ? 'Pull request merged' : checksPassed ? 'All checks have passed' : 'Checks are running'}
                </p>
                <p className="m-0 text-[11px] text-secondary">
                    {merged ? 'PostHog will measure the impact over the next week' : 'Review required · you'}
                </p>
            </div>
            <MergeButton elapsed={elapsed} />
        </div>
    )
}

export const LOOP_BOUNDARIES: number[] = [
    PR_OPENED_AT,
    CHECKS_SHOWN_AT,
    MERGE_BOX_SHOWN_AT,
    ...CHECKS.map(({ passesAt }) => passesAt),
    ...pressCursorBoundaries(MERGE_PRESS_AT),
    MERGED_AT,
    MERGE_SETTLED_AT,
    MERGED_EVENT_AT,
    SOAK_AT,
    METRIC_REVEAL_AT,
    CHECK_PASSED_AT,
    RESOLVED_AT,
    LOOP_FADE_OUT_AT,
]
