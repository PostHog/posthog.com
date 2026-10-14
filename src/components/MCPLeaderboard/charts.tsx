import React, { useEffect, useMemo, useState } from 'react'
import {
    BarChart,
    BarChartConfig,
    ChartTheme,
    DEFAULT_CHART_COLORS,
    DefaultTooltip,
    Series as ChartSeries,
    TimeSeriesLineChart,
    TimeSeriesLineChartConfig,
    TooltipContext,
} from '@posthog/quill-charts'
import Link from 'components/Link'
import { Series, Share, Theme, formatPct } from './data'

// Every series has its own color, so `colors` is only the library's fallback.
const CHART_THEMES: Record<Theme, ChartTheme> = {
    light: {
        colors: [...DEFAULT_CHART_COLORS],
        axisColor: 'rgba(35, 37, 29, 0.7)',
        gridColor: 'rgba(35, 37, 29, 0.1)',
    },
    dark: {
        colors: [...DEFAULT_CHART_COLORS],
        axisColor: 'rgba(238, 239, 233, 0.7)',
        gridColor: 'rgba(238, 239, 233, 0.12)',
    },
}

const Y_FORMATS = {
    share: (value: number) => `${Math.round(value)}%`,
    rate: (value: number) => `${value.toFixed(1)}%`,
    seconds: (value: number) => `${(value / 1000).toFixed(1)}s`,
}

// ponytail: quill-charts 0.3.0-beta.30 reads `document` while it renders, which breaks the Gatsby build, so the
// charts render in the browser only. Remove this when a published version guards that read.
const useIsClient = (): boolean => {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => setIsClient(true), [])
    return isClient
}

// A line chart, or with `stacked` a 100% stacked area where each period's series add up to 100. Stacked
// bands are opaque, so a band is exactly its legend color.
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
    const isClient = useIsClient()
    const config = useMemo((): TimeSeriesLineChartConfig => {
        const formatY = Y_FORMATS[format]
        return {
            xAxis: { timezone: 'UTC' },
            // A percent stack labels its own 0-100% axis.
            yAxis: stacked ? undefined : { tickFormatter: formatY },
            percentStackView: stacked,
            showGrid: true,
            legend: { show: legend },
            // A percent stack gives tooltip values as 0-1 fractions.
            tooltip: { valueFormatter: stacked ? (value: number) => formatPct(value * 100) : formatY },
        }
    }, [format, stacked, legend])
    const { labels, chartSeries } = useMemo(() => {
        // In a stacked share chart, a period where every series is zero has no data. The chart starts at
        // the first period with data, and a later empty period shows as a gap instead of 0%.
        const empty = periods.map((_, i) => stacked && series.every((s) => !s.data[i]))
        const start = Math.max(0, empty.indexOf(false))
        return {
            labels: periods.slice(start),
            chartSeries: series.map(
                (s): ChartSeries => ({
                    key: s.label,
                    label: s.label,
                    color: s.color,
                    data: s.data.slice(start).map((value, i) => (value === null || empty[start + i] ? NaN : value)),
                    fill: stacked ? { opacity: 1 } : undefined,
                })
            ),
        }
    }, [periods, series, stacked])
    return (
        <div className="flex flex-col" style={{ height }}>
            {isClient && (
                <TimeSeriesLineChart labels={labels} series={chartSeries} theme={CHART_THEMES[theme]} config={config} />
            )}
        </div>
    )
}

// Horizontal share bars. Bars scale to the largest value so small shares stay readable.
export function ShareBars({
    items,
    detail,
    icon,
    href,
    labelOf = (item) => item.label,
    labelClassName = '',
}: {
    items: Share[]
    detail?: (item: Share) => React.ReactNode
    icon?: (item: Share) => React.ReactNode
    // Makes a row's label a link, for example to the docs for a tool category.
    href?: (item: Share) => string | undefined
    // The text shown for a row, when it differs from `item.label`, which stays the hover title.
    labelOf?: (item: Share) => string
    labelClassName?: string
}): JSX.Element {
    const max = Math.max(...items.map((item) => item.value), 0.0001)
    return (
        <ul className="list-none m-0 p-0 flex flex-col gap-1.5">
            {items.map((item) => (
                <li key={item.label} className="grid grid-cols-[minmax(0,10rem)_1fr_auto] items-center gap-2 text-sm">
                    <span className="flex items-center gap-1.5 min-w-0 text-primary" title={item.label}>
                        {icon && <span className="size-4 shrink-0 flex items-center justify-center">{icon(item)}</span>}
                        {href?.(item) ? (
                            <Link
                                to={href(item) as string}
                                state={{ newWindow: true }}
                                className={`truncate text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid ${labelClassName}`}
                            >
                                {labelOf(item)}
                            </Link>
                        ) : (
                            <span className={`truncate ${labelClassName}`}>{labelOf(item)}</span>
                        )}
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

// One 100% bar, set up like quill's `ProportionBar`, which the published package does not have yet.
const SPLIT_BAR_CONFIG: BarChartConfig = {
    barLayout: 'percent',
    axisOrientation: 'horizontal',
    hideXAxis: true,
    hideYAxis: true,
    showGrid: false,
    showAxisLines: false,
    showTickMarks: false,
    showCrosshair: false,
    margins: { top: 0, right: 0, bottom: 0, left: 0 },
    barCornerRadius: 2,
    bars: { bandPadding: 0, minBandSize: 0, roundStackEnds: true },
}
const SPLIT_BAR_LABELS = ['share']

// Only the hovered segment. A percent layout gives each value as a 0-1 fraction.
const splitBarTooltip = (ctx: TooltipContext): React.ReactNode => {
    const hovered = ctx.seriesData.filter((entry) => entry.series.key === ctx.hoveredSeriesKey)
    return hovered.length ? (
        <DefaultTooltip
            {...ctx}
            seriesData={hovered}
            showHeader={false}
            valueFormatter={(value) => formatPct(value * 100)}
        />
    ) : null
}

// One 100% bar split into segments, with an inline legend.
export function SplitBar({ items, theme }: { items: Share[]; theme: Theme }): JSX.Element {
    const isClient = useIsClient()
    const visible = items.filter((item) => item.value >= 0.05)
    return (
        <div>
            <div className="relative flex flex-col h-4">
                {isClient && (
                    <BarChart
                        labels={SPLIT_BAR_LABELS}
                        series={visible.map((item) => ({
                            key: item.label,
                            label: item.label,
                            color: item.color,
                            data: [item.value],
                        }))}
                        theme={CHART_THEMES[theme]}
                        config={SPLIT_BAR_CONFIG}
                        tooltip={splitBarTooltip}
                    />
                )}
            </div>
            <ul className="list-none m-0 p-0 mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-secondary">
                {visible.map((item) => (
                    <li key={item.label} className="flex items-center gap-1">
                        <span className="inline-block size-2 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.label} <span className="tabular-nums">{formatPct(item.value)}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
