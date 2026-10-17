import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IOS_SPRING, SourceKey } from '../Ingest/session'
import { DesktopComposer, DesktopShell, DesktopToolRows, LINE_ENTER, ScrollToLatest } from '../Query/AgentWindow'
import { InlineCode, SourceIcon } from '../Query/trace'

export const REPORT_LOOP_MS = 15500
export const REPORT_RESTING_MOMENT = 13000

const NIGHT_ENDS_AT = 4400
const NIGHT_STARTS_MINUTES = 23 * 60
const NIGHT_LENGTH_MINUTES = 7 * 60
export const REPORT_AT = 4400
export const PRESS_AT = 6100
export const HANDOFF_AT = 6500
const EVIDENCE_STAGGER_MS = 180
const READING_ENDS_AT = 7500
const ANSWER_AT = 9800
const ANSWER_MS_PER_CHAR = 18
const CURSOR_LEAD_MS = 900
const PRESS_HOLD_MS = 160

export const REPORT = {
    number: 12,
    scout: 'Revenue scout',
    title: 'Checkout TypeError is blocking Pro upgrades',
}

export const OTHER_REPORTS = [
    { scout: 'Retention scout', title: 'Weekly actives up 12% after the new onboarding', at: 1100 },
    { scout: 'Funnel scout', title: 'Safari signups dropped 8% after the redesign', at: 2200 },
    { scout: 'Product scout', title: 'Docs search returns nothing for "flags"', at: 3300 },
]

interface Evidence {
    id: string
    source: SourceKey
    label: string
}

const EVIDENCE: Evidence[] = [
    { id: 'replays', source: 'replay', label: '23 replays' },
    { id: 'error', source: 'errors', label: 'TypeError' },
    { id: 'charges', source: 'stripe', label: '31 failed charges' },
    { id: 'tickets', source: 'zendesk', label: '4 tickets' },
]

const AGENT_ROWS = [
    {
        id: 'replays',
        source: 'replay' as SourceKey,
        label: 'Watched 3 replays',
        result: 'Pay throws before redirect',
        at: 7500,
    },
    {
        id: 'trace',
        source: 'errors' as SourceKey,
        label: 'Read the stack trace',
        result: 'plan is undefined at checkout.tsx:142',
        at: 8600,
    },
]
const AGENT_ROW_RUN_MS = 900

const ANSWER =
    "`plan` is undefined when checkout loads before pricing. I'll guard it, add a test, and open a PR behind a flag."
const ANSWER_DONE_AT = ANSWER_AT + ANSWER.length * ANSWER_MS_PER_CHAR

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value))

export const nightProgress = (elapsed: number): number => clamp01(elapsed / NIGHT_ENDS_AT)

export const formatNightClock = (elapsed: number): string => {
    const minutes = NIGHT_STARTS_MINUTES + Math.floor(nightProgress(elapsed) * NIGHT_LENGTH_MINUTES)
    const hour12 = Math.floor(minutes / 60) % 12 || 12
    return `${hour12}:${String(minutes % 60).padStart(2, '0')}`
}

const arrivedEvidence = (elapsed: number): Evidence[] =>
    EVIDENCE.filter((_, index) => elapsed >= HANDOFF_AT + 300 + index * EVIDENCE_STAGGER_MS)

export const PressCursor = ({
    elapsed,
    pressAt,
    children,
}: {
    elapsed: number
    pressAt: number
    children: React.ReactNode
}) => {
    const visible = elapsed >= pressAt - CURSOR_LEAD_MS && elapsed < pressAt + 600
    const arrived = elapsed >= pressAt - 250
    const pressing = elapsed >= pressAt && elapsed < pressAt + PRESS_HOLD_MS
    return (
        <div className="relative">
            <motion.div
                animate={{ scale: pressing ? 0.95 : 1 }}
                transition={
                    pressing ? { duration: 0.12, ease: 'easeOut' } : { type: 'spring', stiffness: 500, damping: 14 }
                }
            >
                {children}
            </motion.div>
            <AnimatePresence>
                {visible && (
                    <motion.svg
                        key="cursor"
                        viewBox="0 0 16 20"
                        className="pointer-events-none absolute left-1/2 top-1/2 h-5 w-4 drop-shadow"
                        initial={{ opacity: 0, x: 60, y: 48 }}
                        animate={{ opacity: 1, x: arrived ? 0 : 60, y: arrived ? 0 : 48, scale: pressing ? 0.85 : 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 110, damping: 18 }}
                    >
                        <path
                            d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11 Z"
                            fill="black"
                            stroke="white"
                            strokeWidth="1.4"
                            strokeLinejoin="round"
                        />
                    </motion.svg>
                )}
            </AnimatePresence>
        </div>
    )
}

const EvidenceChip = ({ evidence }: { evidence: Evidence }) => (
    <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={IOS_SPRING}
        className="flex items-center gap-1.5 rounded-md border border-primary bg-primary px-1.5 py-0.5 text-[11px] shadow-sm"
    >
        <SourceIcon source={evidence.source} className="size-3.5 shrink-0" />
        <span className="font-semibold">{evidence.label}</span>
    </motion.span>
)

export const HandoffDesktop = ({ elapsed, className }: { elapsed: number; className?: string }) => {
    const rows = AGENT_ROWS.filter(({ at }) => elapsed >= at).map((row) => ({
        ...row,
        done: elapsed >= row.at + AGENT_ROW_RUN_MS,
    }))
    const answer = ANSWER.slice(0, Math.max(0, Math.floor((elapsed - ANSWER_AT) / ANSWER_MS_PER_CHAR)))
    const status =
        elapsed < READING_ENDS_AT
            ? `Reading report #${REPORT.number}…`
            : elapsed < ANSWER_DONE_AT
            ? 'Investigating…'
            : 'Writing the fix…'
    return (
        <DesktopShell chats={[`Report #${REPORT.number}`, 'Acme churn risk', 'Signup funnel']} className={className}>
            <ScrollToLatest className="px-3 pt-3">
                <motion.div
                    {...LINE_ENTER}
                    className="mb-3 ml-auto flex w-[85%] flex-col gap-1.5 rounded-lg rounded-br-sm bg-accent p-2"
                >
                    <p className="m-0 truncate text-xs font-semibold">
                        Report #{REPORT.number} · {REPORT.title}
                    </p>
                    <div className="flex min-h-[3.25rem] flex-wrap content-start gap-1">
                        {arrivedEvidence(elapsed).map((evidence) => (
                            <EvidenceChip key={evidence.id} evidence={evidence} />
                        ))}
                    </div>
                </motion.div>
                {rows.length > 0 && <DesktopToolRows rows={rows} />}
                {answer && (
                    <p className="m-0 mb-2">
                        <InlineCode text={answer} codeClassName="rounded bg-accent !px-1" />
                    </p>
                )}
            </ScrollToLatest>
            <DesktopComposer status={status} sendActive={false}>
                <span className="text-muted">Ask PostHog anything…</span>
            </DesktopComposer>
        </DesktopShell>
    )
}
