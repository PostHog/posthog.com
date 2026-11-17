import React from 'react'
import { motion } from 'framer-motion'

/**
 * Simplified, animated insights about this page, for the "Ask PostHog about"
 * section. HTML and SVG, not screenshots, so they follow the theme.
 * Illustrative data for now.
 */

const AXIS = 'text-[11px] text-secondary'
const GROW = { duration: 0.6, ease: 'easeOut' }

const FunnelInsight = () => (
    <div className="flex h-48 items-end gap-3">
        {[
            { label: 'Landed here', value: 100 },
            { label: 'Saw the diagram', value: 64 },
            { label: 'Reached the FAQ', value: 22 },
            { label: 'Signed up', value: 7 },
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

const TrendsInsight = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const points = [96, 40, 78, 70, 82, 112, 104]
    const path = points.map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * 50} ${y}`).join(' ')
    return (
        <div>
            <svg viewBox="-10 0 320 130" className="h-40 w-full" aria-hidden>
                {[30, 70, 110].map((y) => (
                    <line key={y} x1="-10" x2="310" y1={y} y2={y} stroke="currentColor" className="text-border" />
                ))}
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
                <motion.circle
                    cx="50"
                    cy="40"
                    r="6"
                    fill="currentColor"
                    className="text-blue"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.4, 1] }}
                    transition={{ delay: 1.2, duration: 0.4 }}
                />
            </svg>
            <div className="flex justify-between px-1">
                {days.map((day) => (
                    <span key={day} className={AXIS}>
                        {day}
                    </span>
                ))}
            </div>
        </div>
    )
}

const RetentionInsight = () => {
    const rows = [[100, 70, 64, 61], [100, 68, 60], [100, 72], [100]]
    return (
        <div className="grid gap-1 text-[11px]">
            <div className="grid grid-cols-[4.5rem_repeat(4,minmax(0,1fr))] gap-1 text-secondary">
                <span />
                {['Week 0', 'Week 1', 'Week 2', 'Week 3'].map((week) => (
                    <span key={week} className="text-center">
                        {week}
                    </span>
                ))}
            </div>
            {rows.map((row, i) => (
                <div key={i} className="grid grid-cols-[4.5rem_repeat(4,minmax(0,1fr))] gap-1">
                    <span className="text-secondary">Signed up wk {i + 1}</span>
                    {row.map((value, j) => (
                        <motion.span
                            key={j}
                            className="rounded-sm bg-green py-1.5 text-center font-bold text-white"
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
            { label: 'Clicked a question here', odds: 2.8, good: true },
            { label: 'Watched the diagram', odds: 1.9, good: true },
            { label: 'Opened the FAQ', odds: 1.4, good: true },
            { label: 'Went to pricing first', odds: 0.6, good: false },
        ].map(({ label, odds, good }, i) => (
            <div key={label} className="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_2.5rem] items-center gap-2">
                <span className="truncate">{label}</span>
                <span className="h-3 rounded-sm bg-accent">
                    <motion.span
                        className={`block h-full rounded-sm ${good ? 'bg-purple' : 'bg-red'}`}
                        initial={{ width: '0%' }}
                        animate={{ width: `${(odds / 2.8) * 100}%` }}
                        transition={{ ...GROW, delay: i * 0.15 }}
                    />
                </span>
                <span className={`text-right font-bold ${good ? 'text-purple' : 'text-red'}`}>{odds}x</span>
            </div>
        ))}
    </div>
)

const PathsInsight = () => {
    const exits = [
        { label: 'Signed up', value: 31, y: 20 },
        { label: 'Read the docs', value: 24, y: 60 },
        { label: 'Checked pricing', value: 18, y: 100 },
        { label: 'Closed the tab', value: 27, y: 140 },
    ]
    return (
        <svg viewBox="0 0 320 160" className="h-48 w-full text-seagreen" aria-hidden>
            <rect x="0" y="50" width="14" height="60" rx="2" fill="currentColor" />
            <text x="20" y="84" className="fill-primary text-[11px] font-bold">
                This page
            </text>
            {exits.map(({ label, value, y }, i) => (
                <g key={label}>
                    <motion.path
                        d={`M 14 80 C 120 80, 120 ${y}, 200 ${y}`}
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity="0.35"
                        strokeWidth={value / 2}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: i * 0.15 }}
                    />
                    <motion.text
                        x="206"
                        y={y + 4}
                        className="fill-primary text-[11px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 + i * 0.15 }}
                    >
                        {label} · {value}%
                    </motion.text>
                </g>
            ))}
        </svg>
    )
}

const SQLInsight = () => {
    const query = [
        'SELECT properties.$geoip_country_name AS country,',
        '       count() AS views',
        'FROM events',
        "WHERE event = '$pageview'",
        "  AND properties.$pathname = '/product-analytics'",
        'GROUP BY country ORDER BY views DESC',
    ]
    const results = [
        ['United States', '4,812'],
        ['Germany', '1,377'],
        ['United Kingdom', '1,104'],
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
                <span className="font-bold text-secondary">country</span>
                <span className="text-right font-bold text-secondary">views</span>
                {results.map(([country, views], i) => (
                    <React.Fragment key={country}>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 + i * 0.12 }}
                        >
                            {country}
                        </motion.span>
                        <motion.span
                            className="text-right"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 + i * 0.12 }}
                        >
                            {views}
                        </motion.span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export const PAGE_INSIGHTS: Record<string, React.ComponentType> = {
    Funnels: FunnelInsight,
    Trends: TrendsInsight,
    Retention: RetentionInsight,
    Correlation: CorrelationInsight,
    Paths: PathsInsight,
    SQL: SQLInsight,
}
