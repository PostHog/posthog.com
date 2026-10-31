import React from 'react'

import AnatomyFrame from './AnatomyFrame'

/**
 * The SQL editor's Visualization tab in miniature, set to a horizontal bar chart: the label column
 * on the left, one bar per row sized against the largest value. Drawn rather than screenshotted so
 * the example rows can match the chapter.
 */

interface SqlBarChartRow {
    /** The X-axis column's value, printed beside the bar. */
    label: string
    /** The Y-axis column's value. */
    value: number
}

export interface SqlBarChartProps {
    rows: SqlBarChartRow[]
    /** The Y-axis column name, as the series picker shows it. */
    series: string
    /** Formats a value for the bar's end, e.g. as dollars. */
    format?: 'currency' | 'number'
}

const formatValue = (value: number, format: SqlBarChartProps['format']) =>
    format === 'currency' ? `$${value.toLocaleString('en-US')}` : value.toLocaleString('en-US')

export default function SqlBarChart({ rows, series, format = 'number' }: SqlBarChartProps): JSX.Element {
    const max = Math.max(...rows.map((row) => row.value))

    return (
        <AnatomyFrame className="rounded border border-primary bg-accent p-3 dark:bg-accent-dark @md:p-4">
            <div className="flex items-center justify-between gap-2 border-b border-primary pb-2 text-[0.7em] leading-none">
                <span className="flex items-center gap-3">
                    <span className="text-secondary">Results</span>
                    <span className="font-bold text-primary underline decoration-orange decoration-2 underline-offset-[6px]">
                        Visualization
                    </span>
                </span>
                <span className="rounded border border-primary bg-primary px-2 py-1 text-primary">
                    Horizontal bar chart
                </span>
            </div>

            <div className="mt-3 space-y-2 rounded border border-primary bg-primary p-3">
                {rows.map((row) => (
                    <div key={row.label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-2">
                        <span className="truncate text-right font-code text-[0.62em] leading-snug text-secondary">
                            {row.label}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span
                                className="h-3 shrink-0 rounded-sm bg-blue"
                                style={{ width: `${Math.max(2, (row.value / max) * 80)}%` }}
                            />
                            <span className="shrink-0 text-[0.62em] leading-none text-primary">
                                {formatValue(row.value, format)}
                            </span>
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-[0.62em] leading-none text-secondary">
                <span className="size-2 rounded-full bg-blue" />
                <span className="font-code">{series}</span>
            </div>
        </AnatomyFrame>
    )
}
