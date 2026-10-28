import React from 'react'
import {
    BarChart as QuillBarChart,
    BarList as QuillBarList,
    ComboChart as QuillComboChart,
    LineChart as QuillLineChart,
    PieChart as QuillPieChart,
    Sparkline as QuillSparkline,
    TimeSeriesBarChart as QuillTimeSeriesBarChart,
    TimeSeriesLineChart as QuillTimeSeriesLineChart,
    themeFromCssVars,
} from '@posthog/quill-charts'
import type { ChartTheme } from '@posthog/quill-charts'
import { cn } from '../../../utils'

export type { ChartTheme, Series } from '@posthog/quill-charts'

const chartTokens = [
    '[--data-color-1:theme(colors.brand.blue.DEFAULT)]',
    '[--data-color-2:theme(colors.brand.yellow.DEFAULT)]',
    '[--data-color-3:theme(colors.brand.teal.DEFAULT)]',
    '[--data-color-4:theme(colors.brand.violet.DEFAULT)]',
    '[--data-color-5:theme(colors.brand.coral.DEFAULT)]',
    '[--data-color-6:theme(colors.brand.green.DEFAULT)]',
    '[--data-color-7:theme(colors.brand.purple.DEFAULT)]',
    '[--data-color-8:theme(colors.brand.tangerine.DEFAULT)]',
    '[--data-color-9:theme(colors.brand.corn-blue.DEFAULT)]',
    '[--data-color-10:theme(colors.brand.lime.DEFAULT)]',
    '[--data-color-11:theme(colors.brand.cobalt.DEFAULT)]',
    '[--data-color-12:theme(colors.brand.lemon.DEFAULT)]',
    '[--foreground:rgb(var(--text-primary))]',
    '[--card:rgb(var(--bg))]',
    '[--color-graph-axis-label:rgb(var(--text-secondary))]',
].join(' ')

const PALETTE_SIZE = 12

const themeAttributes = ['class', 'theme', 'data-theme', 'data-scheme']

function useSiteChartTheme(frame: React.RefObject<HTMLElement>): ChartTheme | null {
    const [theme, setTheme] = React.useState<ChartTheme | null>(null)
    React.useEffect(() => {
        const root = frame.current
        if (!root) return
        const read = () => setTheme(themeFromCssVars({ root, colorCount: PALETTE_SIZE }))
        read()
        const observer = new MutationObserver(read)
        const watched = new Set<Element>([document.documentElement, document.body])
        let scheme = root.closest('[data-scheme]')
        while (scheme) {
            watched.add(scheme)
            scheme = scheme.parentElement?.closest('[data-scheme]') ?? null
        }
        watched.forEach((element) => observer.observe(element, { attributes: true, attributeFilter: themeAttributes }))
        return () => observer.disconnect()
    }, [frame])
    return theme
}

type ThemedProps = { theme: ChartTheme; className?: string }

export type SiteChartProps<Props extends ThemedProps> = Omit<Props, 'theme' | 'className'> & {
    theme?: ChartTheme
    className?: string
    chartClassName?: string
}

function withSiteTheme<Props extends ThemedProps>(
    QuillChart: (props: Props) => React.ReactElement | null,
    displayName: string
): (props: SiteChartProps<Props>) => JSX.Element {
    function SiteChart({ theme: themeOverride, className, chartClassName, ...props }: SiteChartProps<Props>) {
        const frame = React.useRef<HTMLDivElement>(null)
        const siteTheme = useSiteChartTheme(frame)
        const theme = themeOverride ?? siteTheme
        return (
            <div ref={frame} className={cn('flex min-w-0 flex-col text-primary', chartTokens, className)}>
                {theme && (
                    <QuillChart
                        {...(props as unknown as Props)}
                        theme={theme}
                        className={cn('size-full', chartClassName)}
                    />
                )}
            </div>
        )
    }
    SiteChart.displayName = displayName
    return SiteChart
}

export const LineChart = withSiteTheme(QuillLineChart, 'LineChart')
export const BarChart = withSiteTheme(QuillBarChart, 'BarChart')
export const ComboChart = withSiteTheme(QuillComboChart, 'ComboChart')
export const TimeSeriesLineChart = withSiteTheme(QuillTimeSeriesLineChart, 'TimeSeriesLineChart')
export const TimeSeriesBarChart = withSiteTheme(QuillTimeSeriesBarChart, 'TimeSeriesBarChart')
export const Sparkline = withSiteTheme(QuillSparkline, 'Sparkline')
export const PieChart = withSiteTheme(QuillPieChart, 'PieChart')
export const BarList = withSiteTheme(QuillBarList, 'BarList')
