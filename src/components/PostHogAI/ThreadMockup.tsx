import React from 'react'
import { IconChevronDown, IconExternal, IconGraph, IconHide, IconNotebook, IconPin, IconSort } from '@posthog/icons'

export interface ThreadScenario {
    question: string
    /** The count in the "N tool calls" line. */
    toolCalls: number
    /** The calls shown as collapsed rows under the count. */
    calls: { tool: string; detail: string }[]
    /** A SQL result card. Leave it out when the answer does not need one. */
    table?: { head: string[]; rows: string[][]; source?: string }
    /** A line chart card. Each series is drawn in order: the first muted, the second in the accent color. */
    insight?: { title: string; legend: { label: string; value: string }[]; series: number[][] }
    intro: string
    bullets: { lead: string; text: string }[]
    ending:
        | { type: 'notebook'; recommendation: string; notebook: string }
        | { type: 'offer'; recommendation: string; offer: string }
        | { type: 'ask'; closing: string }
    /** Screen reader summary of the whole conversation. */
    summary: string
}

const ToolLine = ({ children, aside }: { children: React.ReactNode; aside?: string }): JSX.Element => (
    <p className="m-0 flex min-w-0 items-center gap-2 text-xs text-secondary">
        <IconGraph className="size-3.5 shrink-0" />
        <span className="min-w-0 truncate">{children}</span>
        {aside && <span className="ml-auto shrink-0">{aside}</span>}
    </p>
)

const SeriesChart = ({ series }: { series: number[][] }): JSX.Element => {
    const all = series.flat()
    const min = Math.min(...all)
    const max = Math.max(...all)
    const point = (value: number, index: number, length: number): string =>
        `${(index / (length - 1)) * 300},${72 - ((value - min) / (max - min)) * 64 - 4}`

    return (
        <svg viewBox="0 0 300 72" preserveAspectRatio="none" className="block h-16 w-full">
            {[0, 1, 2].map((line) => (
                <line
                    key={line}
                    x1="0"
                    x2="300"
                    y1={4 + line * 32}
                    y2={4 + line * 32}
                    stroke="currentColor"
                    strokeDasharray="3 3"
                    strokeOpacity="0.2"
                    vectorEffect="non-scaling-stroke"
                />
            ))}
            {series.map((values, index) => (
                <polyline
                    key={index}
                    points={values.map((value, i) => point(value, i, values.length)).join(' ')}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    className={index === 0 ? 'text-secondary' : 'text-red dark:text-yellow'}
                    vectorEffect="non-scaling-stroke"
                />
            ))}
        </svg>
    )
}

/** A static picture of a PostHog Code conversation. It shows sample data and never submits a request. */
export default function ThreadMockup({ scenario }: { scenario: ThreadScenario }): JSX.Element {
    const { question, toolCalls, calls, table, insight, intro, bullets, ending, summary } = scenario

    return (
        <div
            className="@container not-prose relative w-full overflow-hidden rounded-b border border-primary text-primary shadow-2xl [background-color:color-mix(in_srgb,rgb(var(--bg))_60%,rgb(var(--accent)))]"
            role="group"
            aria-label="PostHog AI conversation"
        >
            <p className="sr-only">{summary}</p>
            {/* Tall enough for the longest scenario, so the content below does not move when the slide changes */}
            <div aria-hidden="true" className="flex min-h-[29.5rem] flex-col gap-2.5 p-3 text-sm @md:p-4">
                <div className="ml-auto mr-11 max-w-[75%] rounded-md bg-accent px-3 py-1.5">{question}</div>

                <div className="grid gap-1.5">
                    <ToolLine aside="Sample data">{toolCalls} tool calls</ToolLine>
                    {calls.map(({ tool, detail }) => (
                        <ToolLine key={tool}>
                            <strong>Call {tool}</strong> · {detail}
                        </ToolLine>
                    ))}
                </div>

                {table && (
                    <div className="overflow-hidden rounded-md border border-primary bg-light dark:bg-dark">
                        <table className="m-0 w-full table-fixed border-collapse text-xs">
                            <thead>
                                <tr>
                                    {table.head.map((heading) => (
                                        <th
                                            key={heading}
                                            className="border-b border-primary px-2 py-1.5 text-left text-xs font-semibold"
                                        >
                                            <span className="flex items-center gap-1">
                                                <span className="truncate">{heading}</span>
                                                <IconPin className="size-3 shrink-0 text-secondary" />
                                                <IconSort className="size-3 shrink-0 text-secondary" />
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {table.rows.map((row) => (
                                    <tr key={row[0]}>
                                        {row.map((cell, index) => (
                                            <td
                                                key={index}
                                                className="truncate border-b border-primary px-2 py-1 text-xs tabular-nums"
                                            >
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-secondary">
                            <strong>{table.source ?? 'SQL'}</strong>
                            <IconExternal className="ml-auto size-3.5" />
                            <IconHide className="size-3.5" />
                        </div>
                    </div>
                )}

                {insight && (
                    <div className="overflow-hidden rounded-md border border-primary bg-light dark:bg-dark">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 px-2 pt-1.5 text-xs">
                            <strong className="truncate">{insight.title}</strong>
                            <span className="ml-auto flex gap-3 text-secondary">
                                {insight.legend.map(({ label, value }, index) => (
                                    <span key={label} className="flex items-center gap-1">
                                        <span
                                            className={`size-2 rounded-full bg-current ${
                                                index === 0 ? 'text-secondary' : 'text-red dark:text-yellow'
                                            }`}
                                        />
                                        {label} {value}
                                    </span>
                                ))}
                            </span>
                        </div>
                        <div className="px-2 py-1.5 text-secondary">
                            <SeriesChart series={insight.series} />
                        </div>
                        <div className="flex items-center gap-2 border-t border-primary px-2 py-1.5 text-xs text-secondary">
                            <strong>Trends</strong>
                            <IconExternal className="ml-auto size-3.5" />
                            <IconHide className="size-3.5" />
                        </div>
                    </div>
                )}

                <p className="m-0">{intro}</p>
                <ul
                    className={`m-0 pl-5 [&>li]:mt-1 [&>li:first-child]:mt-0 ${
                        ending.type === 'ask' ? '[&>li]:list-decimal' : '[&>li]:list-disc'
                    }`}
                >
                    {bullets.map(({ lead, text }) => (
                        <li key={lead}>
                            <strong>{lead}</strong> {text}
                        </li>
                    ))}
                </ul>

                {ending.type === 'notebook' && (
                    <>
                        <p className="m-0">
                            <strong>My recommendation:</strong> {ending.recommendation}
                        </p>
                        <div className="flex items-center gap-2.5 rounded-md border border-primary bg-light px-3 py-2 dark:bg-dark">
                            <IconNotebook className="size-4 shrink-0 text-red dark:text-yellow" />
                            <div className="min-w-0 text-xs">
                                <strong className="block">Save this conversation as a notebook</strong>
                                <span className="block truncate text-secondary">{ending.notebook}</span>
                            </div>
                            <IconChevronDown className="ml-auto size-3.5 shrink-0 text-secondary" />
                        </div>
                    </>
                )}
                {ending.type === 'offer' && (
                    <>
                        <p className="m-0">
                            <strong>My recommendation:</strong> {ending.recommendation}
                        </p>
                        <p className="m-0">{ending.offer}</p>
                    </>
                )}
                {ending.type === 'ask' && <p className="m-0">{ending.closing}</p>}
            </div>
        </div>
    )
}
