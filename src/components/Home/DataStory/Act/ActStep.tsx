import React, { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IOS_SPRING, useSessionClock } from '../Ingest/session'
import { PostHogMark } from '../Query/AgentWindow'
import {
    HANDOFF_AT,
    HandoffDesktop,
    OTHER_REPORTS,
    PRESS_AT,
    PressCursor,
    REPORT,
    REPORT_AT,
    REPORT_LOOP_MS,
    REPORT_RESTING_MOMENT,
    formatNightClock,
    nightProgress,
} from './report'

const NOTIFICATION_ENTER = {
    initial: { opacity: 0, y: -16, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: IOS_SPRING,
}

const NightSky = ({ elapsed }: { elapsed: number }) => (
    <>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0B1020,#1E2747)]" />
        <div
            className="absolute inset-0 bg-[linear-gradient(180deg,#34477A_0%,#8C7AA8_55%,#F0A97E_100%)]"
            style={{ opacity: nightProgress(elapsed) }}
        />
    </>
)

const Notification = ({ scout, title }: { scout: string; title: string }) => (
    <div className="rounded-xl bg-light/90 px-3 py-2 text-primary shadow-lg backdrop-blur dark:bg-dark/90">
        <p className="m-0 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-secondary">
            <PostHogMark className="h-2.5" />
            Inbox · {scout}
            <span className="ml-auto normal-case tracking-normal">now</span>
        </p>
        <p className="m-0 mt-0.5 text-xs font-semibold leading-snug">{title}</p>
    </div>
)

const MorningStack = ({ elapsed }: { elapsed: number }) => (
    <div className="relative">
        <div className="relative h-[28rem] overflow-hidden rounded-xl [mask-image:linear-gradient(black_15%,rgba(0,0,0,0.85)_38%,rgba(0,0,0,0.55)_58%,rgba(0,0,0,0.25)_76%,rgba(0,0,0,0.08)_88%,transparent_97%)]">
            <NightSky elapsed={elapsed} />
            <div className="relative flex h-full flex-col items-center px-4 pt-6">
                <p className="m-0 text-xs font-semibold text-white/70">Tuesday</p>
                <p className="m-0 text-5xl font-bold tabular-nums leading-tight text-white">
                    {formatNightClock(elapsed)}
                </p>
                <div className="mt-5 flex w-full max-w-sm flex-col gap-2">
                    <AnimatePresence initial={false}>
                        {elapsed >= REPORT_AT && (
                            <motion.div key={REPORT.title} layout {...NOTIFICATION_ENTER}>
                                <PressCursor elapsed={elapsed} pressAt={PRESS_AT}>
                                    <Notification scout={REPORT.scout} title={REPORT.title} />
                                </PressCursor>
                            </motion.div>
                        )}
                        {OTHER_REPORTS.filter(({ at }) => elapsed >= at)
                            .reverse()
                            .map(({ scout, title }) => (
                                <motion.div key={title} layout {...NOTIFICATION_ENTER}>
                                    <Notification scout={scout} title={title} />
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
        <AnimatePresence>
            {elapsed >= HANDOFF_AT && (
                <motion.div
                    key="desktop"
                    initial={{ opacity: 0, y: 40, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={IOS_SPRING}
                    className="absolute -right-6 top-28 w-[78%]"
                >
                    <HandoffDesktop elapsed={elapsed} className="!h-[20rem]" />
                </motion.div>
            )}
        </AnimatePresence>
    </div>
)

export default function ActStep({
    index,
    title,
    description,
}: {
    index: number
    title: string
    description: React.ReactNode
}): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null)
    const elapsed = useSessionClock(containerRef, REPORT_LOOP_MS, REPORT_RESTING_MOMENT)

    return (
        <div className="@container mt-16">
            <div
                ref={containerRef}
                className="relative mx-auto grid max-w-[58rem] gap-6 @3xl:grid-cols-12 @3xl:items-center @3xl:gap-x-8"
            >
                <div className="@3xl:order-last @3xl:col-span-5">
                    <h3 className="!mt-0">
                        {index + 1}. {title}
                    </h3>
                    <p>{description}</p>
                </div>
                <div className="not-prose @container @3xl:col-span-7" aria-hidden="true">
                    <MorningStack elapsed={elapsed} />
                </div>
            </div>
        </div>
    )
}
