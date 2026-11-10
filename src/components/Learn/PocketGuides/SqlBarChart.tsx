import React from 'react'

/**
 * A static horizontal bar chart of a SQL result: one bar per row sized against the largest value.
 * Drawn rather than screenshotted so the example rows can match the chapter. Text sizes and the
 * label column follow Divergence and LeakFunnel, so the guide's charts read at one scale.
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
        <div className="@container">
            <div className="space-y-3">
                {rows.map((row) => (
                    <div key={row.label} className="grid grid-cols-1 items-center gap-1 @sm:grid-cols-[12rem_1fr]">
                        <p className="m-0 text-[0.8em] leading-tight text-primary">{row.label}</p>
                        <span className="flex items-center gap-1.5">
                            <span
                                className="h-3 shrink-0 rounded-sm bg-blue"
                                style={{ width: `${Math.max(2, (row.value / max) * 80)}%` }}
                            />
                            <span className="shrink-0 text-[0.7em] leading-none text-primary">
                                {formatValue(row.value, format)}
                            </span>
                        </span>
                    </div>
                ))}
            </div>

            <p className="m-0 mt-2 flex items-center gap-1.5 text-[0.7em] leading-snug text-secondary">
                <span aria-hidden="true" className="inline-block size-2 shrink-0 rounded-full bg-blue" />
                <span className="font-code">{series}</span>
            </p>
        </div>
    )
}
