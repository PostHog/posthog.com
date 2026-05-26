import React, { useEffect, useState } from 'react'
import { IconInfo } from '@posthog/icons'
import Tooltip from 'components/Tooltip'
import { LogSlider, LinearSlider, prettyInt } from 'components/Pricing/PricingSlider/Slider'

type Scale = 'log' | 'linear'

type Tier = {
    up_to: number | null
    unit_amount_usd: string
}

const SECONDS_PER_MONTH = 30 * 24 * 60 * 60
const LOCAL_EVAL_MULTIPLIER = 10

const REQUEST_MIN = 1_000
const REQUEST_MAX = 10_000_000_000
const REQUEST_MARKS = [1_000, 100_000, 1_000_000, 10_000_000, 100_000_000, 1_000_000_000, 10_000_000_000]

const DEFAULT_MONTHLY_REQUESTS = 10_000_000
const DEFAULT_SERVER_COUNT = 5
const DEFAULT_POLL_INTERVAL_SEC = 60
const DEFAULT_SERVER_SHARE_PCT = 80

const FALLBACK_TIERS: Tier[] = [
    { up_to: 1_000_000, unit_amount_usd: '0' },
    { up_to: 2_000_000, unit_amount_usd: '0.0001' },
    { up_to: 10_000_000, unit_amount_usd: '0.000045' },
    { up_to: 50_000_000, unit_amount_usd: '0.000025' },
    { up_to: null, unit_amount_usd: '0.00001' },
]

const formatUSD = (n: number): string =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const calculatePrice = (events: number, tiers: Tier[]): number => {
    let total = 0
    let counted = 0
    for (const { up_to, unit_amount_usd } of tiers) {
        const remaining = Math.max(events - counted, 0)
        const inTier = up_to ? Math.min(remaining, up_to - counted) : remaining
        total += inTier * parseFloat(unit_amount_usd)
        counted = up_to ?? Number.MAX_SAFE_INTEGER
        if (events <= counted) break
    }
    return Math.round(total)
}

const clamp = (n: number, min: number, max: number): number => Math.max(min, Math.min(max, n))

const parseShorthand = (raw: string): number | null => {
    const cleaned = raw
        .replace(/[, _%]/g, '')
        .replace(/s$/i, '')
        .trim()
        .toLowerCase()
    if (!cleaned) return null
    const match = cleaned.match(/^(\d+(?:\.\d+)?)([kmb])?$/)
    if (!match) return null
    const base = parseFloat(match[1])
    const mult = match[2] === 'k' ? 1_000 : match[2] === 'm' ? 1_000_000 : match[2] === 'b' ? 1_000_000_000 : 1
    return Math.round(base * mult)
}

const fieldWrapperClassName =
    'flex items-baseline gap-1 border border-light hover:border-button dark:border-dark rounded-sm py-1 px-2 w-32 focus-within:border-red dark:focus-within:border-yellow focus-within:bg-white dark:focus-within:bg-accent-dark'

const inputClassName =
    'bg-transparent text-right font-code text-sm flex-1 min-w-0 focus:outline-none focus:ring-0 tabular-nums'

const InfoIcon = ({ tooltip }: { tooltip: string }): JSX.Element => (
    <Tooltip content={tooltip} contentContainerClassName="max-w-xs" placement="top">
        <span className="inline-block opacity-60 hover:opacity-100 cursor-help relative -top-px">
            <IconInfo className="size-4 inline-block" />
        </span>
    </Tooltip>
)

type FieldRowProps = {
    title: string
    tooltip: string
    value: number
    min: number
    max: number
    marks: number[]
    scale: Scale
    onChange: (n: number) => void
    suffix?: string
}

const FieldRow = ({ title, tooltip, value, min, max, marks, scale, onChange, suffix }: FieldRowProps): JSX.Element => {
    const [draft, setDraft] = useState<string>(prettyInt(value))

    useEffect(() => {
        setDraft(prettyInt(value))
    }, [value])

    const commit = (): void => {
        const parsed = parseShorthand(draft)
        if (parsed === null) {
            setDraft(prettyInt(value))
            return
        }
        const bounded = clamp(parsed, min, max)
        onChange(bounded)
        setDraft(prettyInt(bounded))
    }

    return (
        <div className="py-3">
            <div className="flex items-baseline justify-between gap-3 mb-2">
                <span className="text-[14px] font-semibold flex items-baseline gap-1 min-w-0">
                    <span className="truncate">{title}</span>
                    <InfoIcon tooltip={tooltip} />
                </span>
                <span className={`${fieldWrapperClassName} shrink-0`}>
                    <input
                        type="text"
                        inputMode="numeric"
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onBlur={commit}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
                        }}
                        aria-label={title}
                        className={inputClassName}
                    />
                    {suffix && <span className="text-[13px] opacity-60 shrink-0">{suffix}</span>}
                </span>
            </div>
            <div className="px-1 pb-5">
                {scale === 'log' ? (
                    <LogSlider
                        min={min}
                        max={max}
                        marks={marks}
                        stepsInRange={200}
                        value={Math.log(value)}
                        onChange={(v) => onChange(clamp(Math.round(Math.exp(v)), min, max))}
                    />
                ) : (
                    <LinearSlider
                        min={min}
                        max={max}
                        marks={marks}
                        stepsInRange={Math.max(100, max - min)}
                        value={value}
                        onChange={(v) => onChange(clamp(Math.round(v), min, max))}
                    />
                )}
            </div>
        </div>
    )
}

type CostCardProps = {
    title: string
    description: string
    cost: number
    accent: 'neutral' | 'best' | 'warning'
    badge?: string
}

const CostCard = ({ title, description, cost, accent, badge }: CostCardProps): JSX.Element => {
    const accentClass =
        accent === 'best'
            ? 'border-green/40 bg-green/5'
            : accent === 'warning'
            ? 'border-yellow/40 bg-yellow/10'
            : 'border-light dark:border-dark bg-accent dark:bg-accent-dark'
    return (
        <div className={`flex-1 min-w-0 rounded border p-4 ${accentClass}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
                <strong className="text-[13px] uppercase tracking-wide opacity-75">{title}</strong>
                {badge && (
                    <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded bg-green/20 text-green shrink-0">
                        {badge}
                    </span>
                )}
            </div>
            <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-bold tabular-nums">{formatUSD(cost)}</span>
                <span className="opacity-60 text-sm">/mo</span>
            </div>
            <p className="text-[12px] opacity-75 m-0 leading-snug">{description}</p>
        </div>
    )
}

const CalculatorBody = (): JSX.Element => {
    const [monthlyRequests, setMonthlyRequests] = useState<number>(DEFAULT_MONTHLY_REQUESTS)
    const [serverCount, setServerCount] = useState<number>(DEFAULT_SERVER_COUNT)
    const [pollIntervalSec, setPollIntervalSec] = useState<number>(DEFAULT_POLL_INTERVAL_SEC)
    const [serverSidePct, setServerSidePct] = useState<number>(DEFAULT_SERVER_SHARE_PCT)
    const [showAdvanced, setShowAdvanced] = useState<boolean>(false)
    const [tiers, setTiers] = useState<Tier[] | null>(null)

    useEffect(() => {
        const url = `${process.env.BILLING_SERVICE_URL}/api/products-v2?display_friendly=true`
        fetch(url)
            .then((r) => r.json())
            .then((data) => {
                const ff = data.products?.find((p: { type: string }) => p.type === 'feature_flags')
                const ffTiers = ff?.plans?.find((pl: { tiers?: Tier[] }) => pl.tiers)?.tiers as Tier[] | undefined
                setTiers(ffTiers && ffTiers.length > 0 ? ffTiers : FALLBACK_TIERS)
            })
            .catch(() => setTiers(FALLBACK_TIERS))
    }, [])

    const activeTiers = tiers ?? FALLBACK_TIERS
    const pollsPerServerMo = SECONDS_PER_MONTH / pollIntervalSec
    const localBillable = LOCAL_EVAL_MULTIPLIER * pollsPerServerMo * serverCount
    const serverFrac = serverSidePct / 100
    const mixedBillable = monthlyRequests * (1 - serverFrac) + localBillable

    const remoteCost = calculatePrice(monthlyRequests, activeTiers)
    const localCost = calculatePrice(mixedBillable, activeTiers)
    const savings = remoteCost - localCost
    const savingsPct = remoteCost > 0 ? Math.round((savings / remoteCost) * 100) : 0
    const localCheaper = savings > 0
    const localCostsMore = savings < 0

    const assumptions = `Assumes ${serverSidePct}% of evaluations server-side, ${serverCount} server${
        serverCount === 1 ? '' : 's'
    } polling every ${pollIntervalSec}s.`

    return (
        <div className="not-prose my-8 @container border border-light dark:border-dark rounded-md p-4 md:p-5 bg-white/40 dark:bg-accent-dark/40">
            <div className="mb-3">
                <h4 className="!mb-1 !text-xl flex items-baseline gap-1">
                    Estimate your monthly cost
                    <InfoIcon tooltip="Estimates use current usage-based pricing tiers. Local evaluation polls count as 10 flag requests each." />
                </h4>
                <p className="text-sm opacity-75 m-0">
                    See how local evaluation compares to remote at your traffic volume.
                </p>
            </div>

            <FieldRow
                title="Monthly flag requests"
                tooltip="Total flag evaluation requests across all your apps per month. Estimate as daily active users × ~5 evals/user × 30 days. Accepts shorthand: 500k, 1m, 2.5b."
                value={monthlyRequests}
                min={REQUEST_MIN}
                max={REQUEST_MAX}
                marks={REQUEST_MARKS}
                scale="log"
                onChange={setMonthlyRequests}
            />

            <div className="flex flex-col @md:flex-row gap-3 mt-2">
                <CostCard
                    title="Remote evaluation"
                    description="Every flag check is a billable request."
                    cost={remoteCost}
                    accent={localCheaper ? 'neutral' : 'best'}
                />
                <CostCard
                    title="Local evaluation"
                    description={assumptions}
                    cost={localCost}
                    accent={localCheaper ? 'best' : localCostsMore ? 'warning' : 'neutral'}
                    badge={localCheaper && savingsPct > 0 ? `Save ${savingsPct}%` : undefined}
                />
            </div>

            {localCostsMore && (
                <div className="mt-3 p-3 rounded border border-yellow text-[13px] bg-yellow/10">
                    <strong>Heads up:</strong> at this volume, local evaluation costs <em>more</em>. Try a larger poll
                    interval, a smaller fleet, or a higher server-side share below.
                </div>
            )}

            <button
                type="button"
                onClick={() => setShowAdvanced((v) => !v)}
                className="mt-4 text-[13px] font-semibold opacity-75 hover:opacity-100 inline-flex items-center gap-1"
                aria-expanded={showAdvanced}
            >
                <span className="inline-block w-3 text-center">{showAdvanced ? '−' : '+'}</span>
                Local evaluation assumptions
            </button>

            {showAdvanced && (
                <div className="mt-2 border-t border-light dark:border-dark divide-y divide-light dark:divide-dark">
                    <FieldRow
                        title="Server fleet size"
                        tooltip="Number of server-side processes/pods running the PostHog SDK. Each polls independently."
                        value={serverCount}
                        min={1}
                        max={5000}
                        marks={[1, 10, 100, 1000, 5000]}
                        scale="log"
                        onChange={setServerCount}
                    />
                    <FieldRow
                        title="Poll interval"
                        tooltip="How often each server fetches fresh flag definitions. Lower = fresher flags but more billable polls."
                        value={pollIntervalSec}
                        min={10}
                        max={3600}
                        marks={[10, 30, 60, 300, 900, 3600]}
                        scale="log"
                        onChange={setPollIntervalSec}
                        suffix="sec"
                    />
                    <FieldRow
                        title="Server-side share"
                        tooltip="Percentage of evaluations on your servers (eligible for local eval). Browser and mobile evaluations stay remote."
                        value={serverSidePct}
                        min={0}
                        max={100}
                        marks={[0, 25, 50, 75, 100]}
                        scale="linear"
                        onChange={setServerSidePct}
                        suffix="%"
                    />
                </div>
            )}

            {tiers === null && <div className="mt-3 text-[12px] opacity-60">Loading current pricing tiers…</div>}
        </div>
    )
}

export const FeatureFlagCostCalculator = (): JSX.Element | null => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) {
        return (
            <div className="not-prose my-8 border border-light dark:border-dark rounded-md p-4">
                <h4 className="!mb-2 !text-xl">Estimate your monthly cost</h4>
                <div className="text-sm opacity-70">Loading…</div>
            </div>
        )
    }
    return <CalculatorBody />
}

export default FeatureFlagCostCalculator
