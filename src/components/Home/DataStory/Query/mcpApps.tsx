import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconChevronDown, IconChevronRight, IconExpand45, IconGear } from '@posthog/icons'
import { cn } from '../../../../utils'
import { transform } from '../timeline'

const CHART_PALETTE = ['#1d4aff', '#621da6']
const CARD_ENTER = {
    initial: { opacity: 0, transform: transform({ y: 8, scale: 0.98 }) },
    animate: { opacity: 1, transform: transform() },
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
} as const
const DRAW_EASE = [0.22, 1, 0.36, 1] as const

export const McpAppFrame = ({
    className,
    children,
    PostHogMark,
}: {
    className?: string
    children: React.ReactNode
    PostHogMark: React.ComponentType<{ className?: string }>
}) => (
    <motion.div {...CARD_ENTER} className={cn('mb-3 overflow-hidden rounded-xl border', className)}>
        <div className="p-3">{children}</div>
        <div className="flex items-center justify-between border-t border-inherit px-3 py-1.5 text-[11px] @3xl:text-[13.5px] opacity-80">
            <IconExpand45 className="size-3.5 @3xl:size-[17px] opacity-60" />
            <span className="flex items-center gap-1.5">
                <PostHogMark className="h-2.5 @3xl:h-3" />
                <span className="underline underline-offset-2">View in PostHog</span>
            </span>
        </div>
    </motion.div>
)

const AppHeader = ({ title, children }: { title: string; children?: React.ReactNode }) => (
    <div className="mb-2 flex items-center gap-2 text-xs @3xl:text-[15px]">
        <span className="font-semibold">{title}</span>
        <span className="ml-auto flex items-center gap-1.5">{children}</span>
    </div>
)

const HeaderButton = ({ children, open }: { children: React.ReactNode; open?: boolean }) => (
    <span
        className={cn(
            'flex items-center gap-1 rounded-md border border-black/10 dark:border-white/15 px-1.5 py-0.5 text-[11px] @3xl:text-[13.5px]',
            open && 'bg-black/5 dark:bg-white/10'
        )}
    >
        {children}
    </span>
)

export type TrendsChart = 'Line' | 'Bar'

const TREND_DAYS = ['Oct 7', 'Oct 10', 'Oct 13', 'Oct 16', 'Oct 20']
const TREND_SERIES = [
    { label: 'Pro', values: [2, 3, 2, 4, 3, 2, 3, 4, 3, 5, 18, 26, 31, 29] },
    { label: 'Free and Starter', values: [3, 2, 4, 3, 3, 4, 2, 3, 4, 3, 4, 3, 2, 3] },
]
const TREND_MAX = 34
const TREND_TOOLTIP_INDEX = 12
const CHART_OPTIONS: TrendsChart[] = ['Line', 'Bar']
const CHART_MENU = ['Line', 'Area', 'Bar', 'Stacked bar']

const trendX = (index: number): number => (index / (TREND_SERIES[0].values.length - 1)) * 100
const trendY = (value: number): number => 100 - (value / TREND_MAX) * 100

const trendPath = (values: number[]): string =>
    values.map((value, index) => `${index === 0 ? 'M' : 'L'} ${trendX(index)} ${trendY(value)}`).join(' ')

const TrendLines = () => (
    <motion.svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full overflow-visible"
        initial={{ clipPath: 'inset(-10% 100% -10% 0)' }}
        animate={{ clipPath: 'inset(-10% 0% -10% 0)' }}
        transition={{ duration: 0.9, ease: DRAW_EASE }}
    >
        {TREND_SERIES.map(({ label, values }, series) => (
            <path
                key={label}
                d={trendPath(values)}
                fill="none"
                stroke={CHART_PALETTE[series]}
                strokeWidth={2}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
        ))}
        <line
            x1={trendX(TREND_TOOLTIP_INDEX)}
            x2={trendX(TREND_TOOLTIP_INDEX)}
            y1={0}
            y2={100}
            stroke="currentColor"
            strokeOpacity={0.25}
            strokeDasharray="2 2"
            vectorEffect="non-scaling-stroke"
        />
    </motion.svg>
)

const TrendBars = () => (
    <div className="absolute inset-0 flex items-end gap-[3%]">
        {TREND_SERIES[0].values.map((_, day) => (
            <div key={day} className="flex h-full flex-1 items-end gap-px">
                {TREND_SERIES.map(({ label, values }, series) => (
                    <motion.span
                        key={label}
                        className="block flex-1 origin-bottom rounded-t-[2px]"
                        style={{
                            height: `${(values[day] / TREND_MAX) * 100}%`,
                            backgroundColor: CHART_PALETTE[series],
                        }}
                        initial={{ transform: 'scaleY(0)' }}
                        animate={{ transform: 'scaleY(1)' }}
                        transition={{ duration: 0.45, ease: DRAW_EASE, delay: day * 0.025 }}
                    />
                ))}
            </div>
        ))}
    </div>
)

const TrendTooltip = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="pointer-events-none absolute top-1 z-10 -translate-x-full rounded-md border border-black/10 bg-white px-2 py-1 text-[10px] @3xl:text-[12.5px] leading-tight text-[#101828] shadow-md"
        style={{ left: `calc(${trendX(TREND_TOOLTIP_INDEX)}% - 6px)` }}
    >
        <p className="m-0 mb-0.5 font-semibold">Oct 19</p>
        {TREND_SERIES.map(({ label, values }, series) => (
            <p key={label} className="m-0 flex items-center gap-1.5 whitespace-nowrap">
                <span className="size-1.5 rounded-full" style={{ backgroundColor: CHART_PALETTE[series] }} />
                {label}
                <span className="ml-auto pl-2 font-semibold">{values[TREND_TOOLTIP_INDEX]}</span>
            </p>
        ))}
    </motion.div>
)

export const TrendsApp = ({
    chart,
    menuOpen,
    hovered,
    wrapPicker,
    wrapOption,
}: {
    chart: TrendsChart
    menuOpen: boolean
    hovered: string | null
    wrapPicker: (picker: React.ReactNode) => React.ReactNode
    wrapOption: (option: string, item: React.ReactNode) => React.ReactNode
}) => (
    <>
        <AppHeader title="Trends">
            <span className="relative">
                {wrapPicker(
                    <HeaderButton open={menuOpen}>
                        {chart} <IconChevronDown className="size-3 @3xl:size-[15px]" />
                    </HeaderButton>
                )}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.span
                            key="menu"
                            initial={{ opacity: 0, transform: transform({ y: -4 }) }}
                            animate={{ opacity: 1, transform: transform() }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-full z-20 mt-1 flex w-28 @3xl:w-32 flex-col rounded-md border border-black/10 bg-white p-1 text-[11px] @3xl:text-[13.5px] text-[#101828] shadow-lg"
                        >
                            {CHART_MENU.map((option) => (
                                <React.Fragment key={option}>
                                    {wrapOption(
                                        option,
                                        <span
                                            className={cn(
                                                'block rounded px-1.5 py-0.5 transition-colors',
                                                option === hovered && 'bg-[#1d4aff]/10'
                                            )}
                                        >
                                            {option}
                                        </span>
                                    )}
                                </React.Fragment>
                            ))}
                        </motion.span>
                    )}
                </AnimatePresence>
            </span>
            <HeaderButton>
                <IconGear className="size-3 @3xl:size-[15px]" /> Options
            </HeaderButton>
        </AppHeader>
        <div className="mb-1.5 flex gap-3 text-[10.5px] @3xl:text-[13px] opacity-80">
            {TREND_SERIES.map(({ label }, series) => (
                <span key={label} className="flex items-center gap-1">
                    <span className="size-2 rounded-full" style={{ backgroundColor: CHART_PALETTE[series] }} />
                    {label}
                </span>
            ))}
        </div>
        <div className="relative h-[110px] @3xl:h-[150px] border-b border-l border-black/10 dark:border-white/15">
            {[25, 50, 75].map((line) => (
                <span
                    key={line}
                    className="absolute inset-x-0 border-t border-black/5 dark:border-white/10"
                    style={{ top: `${line}%` }}
                />
            ))}
            {chart === CHART_OPTIONS[0] ? <TrendLines key="line" /> : <TrendBars key="bar" />}
            {chart === 'Line' && <TrendTooltip />}
        </div>
        <div className="mt-1 flex justify-between text-[10px] @3xl:text-[12.5px] opacity-60">
            {TREND_DAYS.map((day) => (
                <span key={day}>{day}</span>
            ))}
        </div>
    </>
)

const FUNNEL_STEPS = [
    { label: 'Viewed pricing', count: 640 },
    { label: 'Started checkout', count: 214 },
    { label: 'Clicked Pay', count: 52 },
    { label: 'Upgraded to Pro', count: 21 },
]
const FUNNEL_TOOLTIP_STEP = 3

const percentOf = (count: number, total: number): string => `${((count / total) * 100).toFixed(1)}%`

export const FunnelApp = () => {
    const first = FUNNEL_STEPS[0].count
    const last = FUNNEL_STEPS[FUNNEL_STEPS.length - 1].count
    return (
        <>
            <AppHeader title="Funnel" />
            <div className="relative flex h-[120px] @3xl:h-[160px] items-end gap-2 border-b border-black/10 dark:border-white/15">
                {FUNNEL_STEPS.map(({ label, count }, step) => (
                    <div key={label} className="relative flex h-full flex-1 flex-col justify-end">
                        <span className="absolute inset-x-0 bottom-0 top-0 rounded-t bg-[#1d4aff]/10" />
                        <motion.span
                            className="relative block origin-bottom rounded-t bg-[#1d4aff]"
                            style={{ height: `${(count / first) * 100}%` }}
                            initial={{ transform: 'scaleY(0)' }}
                            animate={{ transform: 'scaleY(1)' }}
                            transition={{ duration: 0.55, ease: DRAW_EASE, delay: step * 0.12 }}
                        />
                        {step === FUNNEL_TOOLTIP_STEP && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="absolute bottom-1/3 right-full z-10 mr-1.5 whitespace-nowrap rounded-md border border-black/10 bg-white px-2 py-1 text-[10px] @3xl:text-[12.5px] leading-tight text-[#101828] shadow-md"
                            >
                                <span className="block font-semibold">{label}</span>
                                <span className="block">
                                    {count} · {percentOf(count, FUNNEL_STEPS[step - 1].count)} from previous
                                </span>
                            </motion.span>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-1.5 flex gap-2 text-[10px] @3xl:text-[12.5px] leading-tight">
                {FUNNEL_STEPS.map(({ label, count }) => (
                    <span key={label} className="min-w-0 flex-1">
                        <span className="block truncate opacity-70">{label}</span>
                        <span className="block font-semibold">
                            {count} <span className="font-normal opacity-60">{percentOf(count, first)}</span>
                        </span>
                    </span>
                ))}
            </div>
            <p className="m-0 mt-2 text-[11px] @3xl:text-[13.5px]">
                <span className="opacity-70">Overall conversion</span>{' '}
                <span className="font-semibold">{percentOf(last, first)}</span>{' '}
                <span className="opacity-60">
                    · {last} of {first}
                </span>
            </p>
        </>
    )
}

const STACK_SOURCE = [
    { line: 141, code: '' },
    { line: 142, code: '    const price = plan.tier.price', error: true },
    { line: 143, code: '' },
]

export const ErrorStackApp = () => (
    <>
        <div className="mb-2 flex flex-wrap items-center gap-1.5 text-xs @3xl:text-[15px]">
            <span className="rounded bg-[#f14f58] px-1.5 py-px text-[10.5px] @3xl:text-[13px] font-semibold text-white">
                TypeError
            </span>
            <span className="font-code">Cannot read properties of undefined (reading 'plan')</span>
        </div>
        <dl className="m-0 mb-2 grid grid-cols-[auto_1fr] gap-x-3 text-[10.5px] @3xl:text-[13px]">
            {[
                ['Person', 'jo@acme.com'],
                ['Browser', 'Chrome 141 · macOS'],
                ['URL', 'acme.com/checkout'],
            ].map(([term, value]) => (
                <React.Fragment key={term}>
                    <dt className="opacity-60">{term}</dt>
                    <dd className="m-0 truncate">{value}</dd>
                </React.Fragment>
            ))}
        </dl>
        <div className="overflow-hidden rounded-md border border-black/10 dark:border-white/15 text-[10.5px] @3xl:text-[13px]">
            <p className="m-0 flex items-center gap-1 border-b border-black/10 dark:border-white/15 px-2 py-1">
                <IconChevronDown className="size-3 @3xl:size-[15px]" />
                <span className="font-semibold">Checkout</span>
                <span className="truncate font-code opacity-70">src/checkout.tsx:142:23</span>
            </p>
            <div className="py-1 font-code">
                {STACK_SOURCE.map(({ line, code, error }) => (
                    <p
                        key={line}
                        className={cn('m-0 flex whitespace-pre', error && 'bg-[#f14f58]/15 font-medium text-[#d42f3a]')}
                    >
                        <span className="w-9 shrink-0 pr-2 text-right opacity-50">{line}</span>
                        {code || ' '}
                    </p>
                ))}
            </div>
            <p className="m-0 flex items-center gap-1 border-t border-black/10 dark:border-white/15 px-2 py-1 opacity-60">
                <IconChevronRight className="size-3 @3xl:size-[15px]" />
                <span className="font-code">renderWithHooks</span>
                <span className="ml-auto rounded border border-black/15 dark:border-white/20 px-1 text-[9px] @3xl:text-[11px]">
                    vendor
                </span>
            </p>
        </div>
    </>
)
