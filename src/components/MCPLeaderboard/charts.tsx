import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart,
    CategoryScale,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    ChartOptions,
} from 'chart.js'
import { Series, Share, Theme, formatDay, formatPct } from './data'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const axisColors = (theme: Theme) =>
    theme === 'dark'
        ? { text: 'rgba(238, 239, 233, 0.7)', grid: 'rgba(238, 239, 233, 0.12)' }
        : { text: 'rgba(35, 37, 29, 0.7)', grid: 'rgba(35, 37, 29, 0.1)' }

// Y-axis formats by name, so a chart's options only change when its theme or format does.
const Y_FORMATS = {
    share: (value: number) => `${Math.round(value)}%`,
    rate: (value: number) => `${value.toFixed(1)}%`,
    multiple: (value: number) => `${(value / 100).toFixed(1)}x`,
    seconds: (value: number) => `${(value / 1000).toFixed(1)}s`,
}

function chartOptions(
    theme: Theme,
    format: keyof typeof Y_FORMATS,
    stacked: boolean,
    legend: boolean
): ChartOptions<'line'> {
    const colors = axisColors(theme)
    const formatY = Y_FORMATS[format]
    return {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: {
                display: legend,
                position: 'bottom',
                labels: { color: colors.text, boxWidth: 10, boxHeight: 10, font: { size: 11 } },
            },
            tooltip: {
                // Series order (the legend order) on every hover, so a name never moves between periods.
                itemSort: (a, b) => a.datasetIndex - b.datasetIndex,
                callbacks: {
                    label: (item) => `${item.dataset.label}: ${formatY(item.parsed.y ?? 0)}`,
                },
            },
        },
        scales: {
            x: { ticks: { color: colors.text, font: { size: 11 } }, grid: { display: false } },
            y: {
                beginAtZero: true,
                stacked,
                max: stacked ? 100 : undefined,
                ticks: { color: colors.text, font: { size: 11 }, callback: (value) => formatY(Number(value)) },
                grid: { color: colors.grid },
            },
        },
    }
}

// A line chart, or with `stacked` a 100% stacked area where each period's series add up to 100.
export function LineChart({
    periods,
    series,
    theme,
    format = 'share',
    stacked = false,
    height = 260,
    legend = true,
}: {
    periods: string[]
    series: Series[]
    theme: Theme
    format?: keyof typeof Y_FORMATS
    stacked?: boolean
    height?: number
    legend?: boolean
}): JSX.Element {
    const options = useMemo(() => chartOptions(theme, format, stacked, legend), [theme, format, stacked, legend])
    const data = useMemo(() => {
        // In a stacked share chart, a period where every series is zero has no data. The chart starts at
        // the first period with data, and a later empty period shows as a gap instead of 0%.
        const empty = periods.map((_, i) => stacked && series.every((s) => !s.data[i]))
        const start = Math.max(0, empty.indexOf(false))
        return {
            labels: periods.slice(start).map(formatDay),
            datasets: series.map((s) =>
                stacked
                    ? {
                          label: s.label,
                          data: s.data.slice(start).map((value, i) => (empty[start + i] ? null : value)),
                          borderColor: s.color,
                          backgroundColor: `${s.color}CC`,
                          borderWidth: 1,
                          pointRadius: 0,
                          fill: true,
                          stack: 'share',
                      }
                    : {
                          label: s.label,
                          data: s.data.slice(start),
                          borderColor: s.color,
                          backgroundColor: s.color,
                          borderWidth: 2,
                          pointRadius: 2,
                          tension: 0.25,
                      }
            ),
        }
    }, [periods, series, stacked])
    return (
        <div style={{ height }}>
            <Line options={options} data={data} />
        </div>
    )
}

// Horizontal share bars. Bars scale to the largest value so small shares stay readable.
export function ShareBars({
    items,
    detail,
}: {
    items: Share[]
    detail?: (item: Share) => React.ReactNode
}): JSX.Element {
    const max = Math.max(...items.map((item) => item.value), 0.0001)
    return (
        <ul className="list-none m-0 p-0 flex flex-col gap-1.5">
            {items.map((item) => (
                <li key={item.label} className="grid grid-cols-[minmax(0,10rem)_1fr_auto] items-center gap-2 text-sm">
                    <span className="truncate text-primary" title={item.label}>
                        {item.label}
                    </span>
                    <span className="h-3 rounded-sm bg-accent overflow-hidden">
                        <span
                            className="block h-full rounded-sm"
                            style={{
                                width: `${Math.max((item.value / max) * 100, 0.5)}%`,
                                backgroundColor: item.color,
                            }}
                        />
                    </span>
                    <span className="tabular-nums text-secondary text-right min-w-[4.5rem]">
                        {formatPct(item.value)}
                        {detail && <span className="block text-xs text-muted">{detail(item)}</span>}
                    </span>
                </li>
            ))}
        </ul>
    )
}

// One 100% bar split into segments, with an inline legend.
export function SplitBar({ items, caption }: { items: Share[]; caption?: React.ReactNode }): JSX.Element {
    const visible = items.filter((item) => item.value >= 0.05)
    return (
        <div>
            <div className="flex h-4 w-full overflow-hidden rounded-sm bg-accent">
                {visible.map((item) => (
                    <span
                        key={item.label}
                        title={`${item.label}: ${formatPct(item.value)}`}
                        className="h-full"
                        style={{ width: `${item.value}%`, backgroundColor: item.color }}
                    />
                ))}
            </div>
            <ul className="list-none m-0 p-0 mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-secondary">
                {visible.map((item) => (
                    <li key={item.label} className="flex items-center gap-1">
                        <span className="inline-block size-2 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.label} <span className="tabular-nums">{formatPct(item.value)}</span>
                    </li>
                ))}
            </ul>
            {caption && <p className="text-xs text-muted m-0 mt-1">{caption}</p>}
        </div>
    )
}
