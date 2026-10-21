import React, { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
    IconApps,
    IconChat,
    IconChevronDown,
    IconGear,
    IconHome,
    IconRocket,
    IconSearch,
    IconTrends,
} from '@posthog/icons'
import { cn } from '../../../../utils'
import { IOS_SPRING, transform, useEventClock } from '../timeline'
import { WINDOW_DRAG } from '../Query/AgentWindow'
import { PostHogMark } from '../Query/appIcons'
import { SourceIcon } from '../Query/trace'
import { PressCursor } from '../PressCursor'
import {
    EARLIER_REPORTS,
    HANDOFF_AT,
    HandoffAgent,
    InboxReport,
    OVERNIGHT_REPORTS,
    PRESS_AT,
    Priority,
    REPORT,
    REPORT_BOUNDARIES,
    REPORT_LOOP_MS,
    REPORT_RESTING_MOMENT,
    ReportSource,
} from './report'
import { SCENE_SIZE, SCENE_TEXT } from '../sceneScale'

const REPORT_ENTER = {
    initial: { opacity: 0, transform: transform({ y: -12, scale: 0.98 }) },
    animate: { opacity: 1, transform: transform() },
    exit: { opacity: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
    transition: IOS_SPRING,
}

const PRIORITY_STYLES: Record<Priority, string> = {
    P1: 'border-red/40 bg-red/10 text-red',
    P2: 'border-orange/40 bg-orange/10 text-orange',
    P3: 'border-orange/25 bg-orange/5 text-orange/80',
}

const ReportSourceIcon = ({ source }: { source: ReportSource }) =>
    source === 'scout' ? (
        <IconRocket className={cn(SCENE_SIZE[14], 'shrink-0 text-orange')} />
    ) : (
        <SourceIcon source={source} />
    )

const ReportCard = React.memo(function ReportCard({ report }: { report: InboxReport }) {
    return (
        <div className="flex gap-2.5 rounded-md border border-primary bg-primary p-2.5">
            <span
                className={cn(
                    SCENE_TEXT[10],
                    'mt-px h-fit shrink-0 rounded border px-1 font-bold leading-4',
                    PRIORITY_STYLES[report.priority]
                )}
            >
                {report.priority}
            </span>
            <div className="min-w-0 flex-1">
                <p className={cn(SCENE_TEXT[12.5], 'm-0 flex min-w-0 items-center gap-1.5 font-semibold leading-snug')}>
                    <code
                        className={cn(
                            SCENE_TEXT[10],
                            'shrink-0 rounded border border-primary !bg-transparent px-1 font-code font-normal'
                        )}
                    >
                        {report.scope}
                    </code>
                    <span className="truncate">{report.title}</span>
                </p>
                <p className={cn(SCENE_TEXT[11.5], 'm-0 mt-1 truncate text-secondary')}>{report.description}</p>
                <div className={cn(SCENE_TEXT[11], 'mt-1.5 flex items-center gap-1.5 text-secondary')}>
                    {report.sources.slice(0, 2).map((source) => (
                        <ReportSourceIcon key={source} source={source} />
                    ))}
                    <span className="truncate">{report.sourceLabel}</span>
                </div>
            </div>
            <div className={cn(SCENE_TEXT[11], 'flex shrink-0 flex-col items-end justify-between pl-1 text-secondary')}>
                {report.users !== undefined ? (
                    <span className="hidden flex-col items-center pt-1 @md:flex">
                        <span className={cn(SCENE_TEXT[14], 'font-bold leading-none text-primary')}>
                            {report.users}
                        </span>
                        <span className={cn(SCENE_TEXT[10], 'font-code')}>users</span>
                    </span>
                ) : (
                    <span />
                )}
                <span className="whitespace-nowrap leading-4">{report.age}</span>
            </div>
        </div>
    )
})

const FilterChip = ({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) => (
    <span
        className={cn(
            SCENE_TEXT[11],
            'flex shrink-0 items-center gap-1 rounded-md border px-2 py-1 font-semibold',
            highlight ? 'border-orange bg-orange/10 text-primary' : 'border-primary bg-primary text-secondary'
        )}
    >
        {children}
    </span>
)

const RAIL_ITEMS = [
    { label: 'Home', Icon: IconHome, active: false },
    { label: 'Chats', Icon: IconChat, active: false },
    { label: 'Analytics', Icon: IconTrends, active: false },
    { label: 'Products', Icon: IconApps, active: true },
]

const RailItem = ({
    label,
    Icon,
    active,
}: {
    label: string
    Icon: React.ComponentType<{ className?: string }>
    active: boolean
}) => (
    <span
        className={cn(
            SCENE_TEXT[8.5],
            'flex flex-col items-center gap-0.5',
            active ? 'text-primary' : 'text-secondary'
        )}
    >
        <span className={cn(SCENE_SIZE[28], 'flex items-center justify-center rounded-md', active && 'bg-primary')}>
            <Icon className={SCENE_SIZE[16]} />
        </span>
        {label}
    </span>
)

const NEWEST_REPORTS_FIRST = [REPORT, ...OVERNIGHT_REPORTS.slice().reverse()]

const InboxWindow = ({ elapsed }: { elapsed: number }) => {
    const arrived = NEWEST_REPORTS_FIRST.filter(({ at = 0 }) => elapsed >= at)
    const reports = [...arrived, ...EARLIER_REPORTS]
    return (
        <div className="flex h-[clamp(28rem,66cqw,46rem)] overflow-hidden rounded-lg border border-primary bg-accent text-primary shadow-xl">
            <div className="hidden w-14 shrink-0 flex-col items-center gap-2.5 border-r border-primary py-3 @md:flex">
                <PostHogMark className="mb-1 h-3.5" />
                {RAIL_ITEMS.map((item) => (
                    <RailItem key={item.label} {...item} />
                ))}
                <span className="mt-auto">
                    <RailItem label="Settings" Icon={IconGear} active={false} />
                </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
                <div
                    className={cn(SCENE_TEXT[12], 'flex shrink-0 items-center gap-2 border-b border-primary px-3 py-2')}
                >
                    <span className="font-semibold">Acme</span>
                    <IconChevronDown className={cn(SCENE_SIZE[12], 'text-secondary')} />
                    <span
                        className={cn(
                            SCENE_TEXT[11],
                            'ml-auto flex items-center gap-1.5 rounded-md border border-primary bg-primary px-2 py-0.5 text-secondary'
                        )}
                    >
                        <IconSearch className={SCENE_SIZE[12]} /> Search
                    </span>
                </div>
                <div className="shrink-0 border-b border-primary px-3 pt-2">
                    <p className={cn(SCENE_TEXT[12], 'm-0 flex items-center gap-1.5')}>
                        <IconRocket className={SCENE_SIZE[14]} />
                        <span className="font-semibold">Self-driving inbox</span>
                        <span className={cn(SCENE_TEXT[10], 'rounded-full border border-orange/60 px-1.5 text-orange')}>
                            beta
                        </span>
                    </p>
                    <div className={cn(SCENE_TEXT[12], 'mt-2 flex gap-4')}>
                        <span className="border-b-2 border-[#F54E00] pb-1.5 font-semibold text-[#F54E00]">Reports</span>
                        <span className="pb-1.5 text-secondary">Scouts</span>
                        <span className="pb-1.5 text-secondary">Settings</span>
                    </div>
                </div>
                <div className="flex shrink-0 gap-1.5 overflow-hidden px-3 py-2">
                    <FilterChip>
                        All priorities <IconChevronDown className={SCENE_SIZE[12]} />
                    </FilterChip>
                    <FilterChip>
                        Newest first <IconChevronDown className={SCENE_SIZE[12]} />
                    </FilterChip>
                    <span className="ml-auto" />
                    <FilterChip highlight>
                        Triage mode{' '}
                        <span className={cn(SCENE_TEXT[9], 'rounded border border-primary px-1 font-code')}>T</span>
                    </FilterChip>
                </div>
                <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden px-3 pb-3 [mask-image:linear-gradient(black_80%,transparent)]">
                    <AnimatePresence initial={false}>
                        {reports.map((report) => (
                            <motion.div
                                key={report.id}
                                layout="position"
                                layoutDependency={arrived.length}
                                {...REPORT_ENTER}
                                className="relative"
                            >
                                {report.id === REPORT.id ? (
                                    <PressCursor elapsed={elapsed} pressAt={PRESS_AT}>
                                        <ReportCard report={report} />
                                    </PressCursor>
                                ) : (
                                    <ReportCard report={report} />
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

const InboxHandoff = ({ elapsed }: { elapsed: number }) => {
    const boundsRef = useRef<HTMLDivElement>(null)
    return (
        <div className="relative">
            <InboxWindow elapsed={elapsed} />
            <div
                ref={boundsRef}
                className="pointer-events-none absolute -bottom-4 -left-4 -top-4 right-0 @3xl:-right-6"
            />
            <AnimatePresence>
                {elapsed >= HANDOFF_AT && (
                    <motion.div
                        key="agent"
                        initial={{ opacity: 0, transform: transform({ y: 40, scale: 0.94 }) }}
                        animate={{ opacity: 1, transform: transform() }}
                        exit={{ opacity: 0, transform: transform({ y: 20 }) }}
                        transition={IOS_SPRING}
                        className="absolute right-0 top-32 w-[62%] @3xl:-right-6"
                    >
                        <motion.div {...WINDOW_DRAG} dragConstraints={boundsRef}>
                            <HandoffAgent elapsed={elapsed} className="h-[20rem] @3xl:h-[25rem]" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function ActScene(): JSX.Element {
    const sceneRef = useRef<HTMLDivElement>(null)
    const elapsed = useEventClock(sceneRef, {
        loopMs: REPORT_LOOP_MS,
        boundaries: REPORT_BOUNDARIES,
        restingMs: REPORT_RESTING_MOMENT,
        loop: false,
    })
    return (
        <div ref={sceneRef} className="not-prose @container" aria-hidden="true">
            <InboxHandoff elapsed={elapsed} />
        </div>
    )
}
