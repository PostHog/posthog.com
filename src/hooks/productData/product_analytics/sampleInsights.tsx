import React from 'react'
import { motion } from 'framer-motion'

/**
 * Simplified, animated insights for the "Ask PostHog about" section. HTML and
 * SVG, not screenshots, so they follow the theme. Sample data.
 */

const AXIS = 'text-[11px] text-secondary'
const GROW = { duration: 0.6, ease: 'easeOut' } as const

const FunnelInsight = () => (
    <div className="flex h-48 items-end gap-3">
        {[
            { label: 'Signed up', value: 100 },
            { label: 'Completed profile', value: 72 },
            { label: 'Created project', value: 41 },
            { label: 'Finished onboarding', value: 33 },
        ].map(({ label, value }, i) => (
            <div key={label} className="flex h-full flex-1 flex-col items-center gap-1">
                <motion.span
                    className="text-xs font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                >
                    {value}%
                </motion.span>
                <div className="relative w-full flex-1 rounded-t-sm bg-orange/15">
                    <motion.div
                        className="absolute inset-x-0 bottom-0 rounded-t-sm bg-orange"
                        initial={{ height: '0%' }}
                        animate={{ height: `${value}%` }}
                        transition={{ ...GROW, delay: i * 0.15 }}
                    />
                </div>
                <span className={`${AXIS} text-center leading-tight`}>{label}</span>
            </div>
        ))}
    </div>
)

const StickinessInsight = () => (
    <div className="grid gap-2.5 text-xs">
        <span className={AXIS}>Average days used per week</span>
        {[
            { label: 'Dashboards', days: 4.2 },
            { label: 'Search', days: 3.1 },
            { label: 'Comments', days: 1.8 },
            { label: 'Exports', days: 0.6 },
        ].map(({ label, days }, i) => (
            <div key={label} className="grid grid-cols-[6rem_minmax(0,1fr)_2.5rem] items-center gap-2">
                <span>{label}</span>
                <span className="h-4 rounded-sm bg-accent">
                    <motion.span
                        className="block h-full rounded-sm bg-seagreen"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(days / 7) * 100}%` }}
                        transition={{ ...GROW, delay: i * 0.15 }}
                    />
                </span>
                <span className="text-right font-bold">{days}</span>
            </div>
        ))}
    </div>
)

const TrendsInsight = () => {
    const points = [70, 74, 68, 72, 52, 50, 48]
    const path = points.map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * 50} ${y}`).join(' ')
    return (
        <svg viewBox="-15 0 330 145" className="h-44 w-full" aria-hidden>
            {[30, 70, 110].map((y) => (
                <line key={y} x1="-10" x2="310" y1={y} y2={y} stroke="currentColor" className="text-border" />
            ))}
            <line x1="175" x2="175" y1="10" y2="120" stroke="currentColor" strokeDasharray="4 4" className="text-red" />
            <text x="181" y="20" className="fill-red text-[10px] font-bold">
                Launch
            </text>
            <motion.path
                d={path}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
                className="text-blue"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
            {points.map((_, i) => (
                <text key={i} x={i * 50} y="140" textAnchor="middle" className="fill-secondary text-[10px]">
                    W{i + 1}
                </text>
            ))}
        </svg>
    )
}

const RetentionInsight = () => {
    const rows = [
        { label: 'Invited a teammate', values: [100, 81, 72, 64] },
        { label: 'Used it alone', values: [100, 48, 31, 22] },
    ]
    return (
        <div className="grid gap-1 text-[11px]">
            <div className="grid grid-cols-[7rem_repeat(4,minmax(0,1fr))] gap-1 text-secondary">
                <span />
                {['Week 0', 'Week 2', 'Week 4', 'Week 8'].map((week) => (
                    <span key={week} className="text-center">
                        {week}
                    </span>
                ))}
            </div>
            {rows.map(({ label, values }, i) => (
                <div key={label} className="grid grid-cols-[7rem_repeat(4,minmax(0,1fr))] gap-1">
                    <span className="text-secondary">{label}</span>
                    {values.map((value, j) => (
                        <motion.span
                            key={j}
                            className="rounded-sm bg-green py-2 text-center font-bold text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.25 + (value / 100) * 0.75 }}
                            transition={{ delay: (i + j) * 0.12 }}
                        >
                            {value}%
                        </motion.span>
                    ))}
                </div>
            ))}
        </div>
    )
}

const CorrelationInsight = () => (
    <div className="grid gap-2.5 text-xs">
        {[
            { label: 'Connected GitHub', odds: 3.1, good: true },
            { label: 'Invited a teammate', odds: 2.4, good: true },
            { label: 'Created a dashboard', odds: 1.7, good: true },
            { label: 'Skipped onboarding', odds: 0.4, good: false },
        ].map(({ label, odds, good }, i) => (
            <div key={label} className="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_2.5rem] items-center gap-2">
                <span className="truncate">{label}</span>
                <span className="h-3 rounded-sm bg-accent">
                    <motion.span
                        className={`block h-full rounded-sm ${good ? 'bg-purple' : 'bg-red'}`}
                        initial={{ width: '0%' }}
                        animate={{ width: `${(odds / 3.1) * 100}%` }}
                        transition={{ ...GROW, delay: i * 0.15 }}
                    />
                </span>
                <span className={`text-right font-bold ${good ? 'text-purple' : 'text-red'}`}>{odds}x</span>
            </div>
        ))}
    </div>
)

const SQLInsight = () => {
    const query = [
        'SELECT persons.properties.plan AS plan,',
        '       sum(stripe_invoice.amount_paid) / 100 AS revenue',
        'FROM stripe_invoice',
        'JOIN persons ON persons.properties.email = stripe_invoice.customer_email',
        'GROUP BY plan ORDER BY revenue DESC',
    ]
    const results = [
        ['Pro', '$48,210'],
        ['Team', '$22,940'],
        ['Starter', '$7,860'],
    ]
    return (
        <div className="grid gap-3">
            <div className="overflow-x-auto rounded border border-primary bg-accent p-3 font-mono text-xs leading-relaxed text-primary">
                {query.map((line, i) => (
                    <motion.span
                        key={line}
                        className="block whitespace-pre"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.12 }}
                    >
                        {line}
                    </motion.span>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-y-1 font-mono text-xs text-primary">
                <span className="font-bold text-secondary">plan</span>
                <span className="text-right font-bold text-secondary">revenue</span>
                {results.map(([plan, revenue], i) => (
                    <React.Fragment key={plan}>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 + i * 0.12 }}
                        >
                            {plan}
                        </motion.span>
                        <motion.span
                            className="text-right"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 + i * 0.12 }}
                        >
                            {revenue}
                        </motion.span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export const SAMPLE_INSIGHTS: Record<string, React.ComponentType> = {
    Funnels: FunnelInsight,
    Stickiness: StickinessInsight,
    Trends: TrendsInsight,
    Retention: RetentionInsight,
    Correlation: CorrelationInsight,
    SQL: SQLInsight,
}
