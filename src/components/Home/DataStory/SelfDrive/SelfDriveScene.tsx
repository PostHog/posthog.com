import React, { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconCheck, IconCheckCircle, IconComment, IconPullRequest } from '@posthog/icons'
import { cn } from '../../../../utils'
import { useEventClock } from '../timeline'
import { InlineCode, ScrollToLatest, WINDOW_HEIGHT } from '../sceneParts'
import {
    CHECKS_SHOWN_AT,
    CheckChart,
    CheckList,
    ENTER,
    LOOP_BOUNDARIES,
    LOOP_FADE_OUT_AT,
    LOOP_MS,
    MERGE_BOX_SHOWN_AT,
    MERGE_BOX_EXIT_MS,
    MERGED_EVENT_AT,
    MERGE_SETTLED_AT,
    MERGED_AT,
    MergeBox,
    PR,
    PR_OPENED_AT,
    PostHogAvatar,
    REPORT_NUMBER,
    RESOLVED_AT,
    RESTING_MOMENT,
    SOAK_AT,
    StatusPill,
    UserAvatar,
} from './loop'
import { SCENE_SIZE, SCENE_TEXT } from '../sceneScale'

const MERGE_COMMIT = '3f9a1c2'

const PR_TABS = [
    { label: 'Conversation', count: 3, active: true },
    { label: 'Commits', count: 1, active: false },
    { label: 'Files changed', count: 1, active: false },
]

const DIFFSTAT_BLOCKS = 5

const DiffStat = () => {
    const addedBlocks = Math.round((PR.additions / (PR.additions + PR.deletions)) * DIFFSTAT_BLOCKS)
    return (
        <span className="ml-auto flex shrink-0 items-center gap-1.5 py-2 font-semibold">
            <span className="text-green">+{PR.additions}</span>
            <span className="text-red">−{PR.deletions}</span>
            <span className="flex gap-px">
                {Array.from({ length: DIFFSTAT_BLOCKS }, (_, index) => (
                    <span
                        key={index}
                        className={cn(SCENE_SIZE[8], 'rounded-[1px]', index < addedBlocks ? 'bg-green' : 'bg-red')}
                    />
                ))}
            </span>
        </span>
    )
}

const PrHeader = ({ elapsed }: { elapsed: number }) => {
    const merged = elapsed >= MERGED_AT
    return (
        <div className="shrink-0 border-b border-primary bg-accent">
            <div className="flex items-start gap-2 px-4 pb-2 pt-3">
                <div className="min-w-0 flex-1">
                    <p className={cn(SCENE_TEXT[14], 'm-0 font-bold leading-snug')}>
                        <InlineCode text={PR.title} codeClassName="!text-[0.95em]" />{' '}
                        <span className="font-normal text-secondary">#{PR.number}</span>
                    </p>
                    <p className={cn(SCENE_TEXT[12], 'm-0 mt-0.5 flex flex-wrap items-center gap-1 text-secondary')}>
                        <PostHogAvatar className={cn(SCENE_SIZE[16], '[&_img]:w-2.5')} />
                        <span className="font-semibold text-primary">PostHog</span>
                        {merged ? ' · merged into ' : ' wants to merge into '}
                        <code className="!border-0 !bg-primary !px-1 font-code">main</code>
                        {merged && ' by you'}
                    </p>
                </div>
                <StatusPill merged={merged} />
            </div>
            <div className={cn(SCENE_TEXT[12], 'flex gap-3 overflow-hidden px-4')}>
                {PR_TABS.map(({ label, count, active }) => (
                    <span
                        key={label}
                        className={cn(
                            'flex shrink-0 items-center gap-1 border-b-2 py-2',
                            active ? 'border-[#F54E00] font-semibold text-primary' : 'border-transparent text-secondary'
                        )}
                    >
                        {label}
                        <span className={cn(SCENE_TEXT[10], 'rounded-full bg-primary px-1.5')}>{count}</span>
                    </span>
                ))}
                <DiffStat />
            </div>
        </div>
    )
}

const RailItem = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
    <motion.div {...ENTER} className="relative flex gap-2.5 pb-3">
        <span
            className={cn(
                SCENE_SIZE[24],
                'relative z-10 flex shrink-0 items-center justify-center rounded-full border border-primary bg-primary'
            )}
        >
            {icon}
        </span>
        <div className="min-w-0 flex-1 pt-0.5">{children}</div>
    </motion.div>
)

const PullRequestConversation = ({ elapsed }: { elapsed: number }) => {
    const mergeSettled = elapsed >= MERGE_SETTLED_AT
    return (
        <div
            className={cn(
                'flex flex-col overflow-hidden rounded-lg border border-primary bg-primary shadow-xl',
                WINDOW_HEIGHT
            )}
        >
            <PrHeader elapsed={elapsed} />
            <motion.div
                className="flex min-h-0 flex-1 flex-col"
                initial={false}
                animate={{ opacity: elapsed >= LOOP_FADE_OUT_AT ? 0 : 1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
                <ScrollToLatest className="px-4 pt-3">
                    <div className="relative">
                        <span className="absolute bottom-3 left-3 top-3 border-l border-primary" aria-hidden="true" />
                        {elapsed >= PR_OPENED_AT && (
                            <RailItem icon={<PostHogAvatar className={cn(SCENE_SIZE[24], 'border-0')} />}>
                                <div className="overflow-hidden rounded-md border border-primary">
                                    <p
                                        className={cn(
                                            SCENE_TEXT[12],
                                            'm-0 border-b border-primary bg-accent px-2.5 py-1'
                                        )}
                                    >
                                        <span className="font-semibold">PostHog</span> opened this from Inbox report #
                                        {REPORT_NUMBER}
                                    </p>
                                    <p className={cn(SCENE_TEXT[12], 'm-0 px-2.5 py-2')}>
                                        <code className="font-code">plan</code> is undefined when checkout loads before
                                        pricing, so Pro upgrades throw. Adds a guard and a test.
                                    </p>
                                </div>
                            </RailItem>
                        )}
                        {elapsed >= CHECKS_SHOWN_AT && (
                            <RailItem icon={<IconCheckCircle className={cn(SCENE_SIZE[14], 'text-green')} />}>
                                <CheckList elapsed={elapsed} />
                            </RailItem>
                        )}
                        {elapsed >= MERGED_EVENT_AT && (
                            <RailItem icon={<IconPullRequest className={cn(SCENE_SIZE[14], 'text-purple')} />}>
                                <p className={cn(SCENE_TEXT[12], 'm-0 flex items-center gap-1.5 text-secondary')}>
                                    <UserAvatar className={SCENE_SIZE[16]} />
                                    <span className="font-semibold text-primary">You</span> merged commit{' '}
                                    <code className="font-code">{MERGE_COMMIT}</code> into main
                                </p>
                            </RailItem>
                        )}
                        {elapsed >= SOAK_AT && (
                            <RailItem icon={<IconComment className={cn(SCENE_SIZE[14], 'text-secondary')} />}>
                                <p className={cn(SCENE_TEXT[12], 'm-0 mb-1.5 text-secondary')}>
                                    <span className="font-semibold text-primary">PostHog</span> commented 1 week later
                                </p>
                                <CheckChart elapsed={elapsed} />
                            </RailItem>
                        )}
                        {elapsed >= RESOLVED_AT && (
                            <RailItem icon={<IconCheck className={cn(SCENE_SIZE[14], 'text-green')} />}>
                                <p className={cn(SCENE_TEXT[12], 'm-0 text-secondary')}>
                                    <span className="font-semibold text-primary">PostHog</span> resolved Inbox report #
                                    {REPORT_NUMBER}
                                </p>
                            </RailItem>
                        )}
                    </div>
                    <AnimatePresence initial={false}>
                        {!mergeSettled && elapsed >= MERGE_BOX_SHOWN_AT && (
                            <motion.div
                                key="merge-box"
                                {...ENTER}
                                exit={{
                                    ...ENTER.exit,
                                    transition: { duration: MERGE_BOX_EXIT_MS / 1000, ease: 'easeIn' },
                                }}
                                className="pb-3"
                            >
                                <MergeBox elapsed={elapsed} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </ScrollToLatest>
            </motion.div>
        </div>
    )
}

export default function SelfDriveScene(): JSX.Element {
    const sceneRef = useRef<HTMLDivElement>(null)
    const elapsed = useEventClock(sceneRef, {
        loopMs: LOOP_MS,
        boundaries: LOOP_BOUNDARIES,
        restingMs: RESTING_MOMENT,
    })
    return (
        <div ref={sceneRef} className="not-prose @container" aria-hidden="true">
            <PullRequestConversation elapsed={elapsed} />
        </div>
    )
}
