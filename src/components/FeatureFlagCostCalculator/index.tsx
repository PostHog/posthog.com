import React, { useEffect, useState } from 'react'
import { IconInfo } from '@posthog/icons'
import Tooltip from 'components/RadixUI/Tooltip'
import { LogSlider, LinearSlider, prettyInt } from 'components/Pricing/PricingSlider/Slider'

type Mode = 'remote' | 'local'

type Tier = {
    up_to: number | null
    unit_amount_usd: string
}

const SECONDS_PER_MONTH = 30 * 24 * 60 * 60
const LOCAL_EVAL_MULTIPLIER = 10

const REQUEST_MIN = 1_000
const REQUEST_MAX = 10_000_000_000
const REQUEST_MARKS = [1_000, 100_000, 1_000_000, 10_000_000, 100_000_000, 1_000_000_000, 10_000_000_000]

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

const Label = ({ title, value, tooltip }: { title: string; value: string; tooltip?: string }): JSX.Element => (
    <div className="flex items-baseline justify-between mb-1">
        <div className="flex items-baseline gap-1">
            <span className="text-[13px] font-semibold">{title}</span>
            {tooltip && (
                <Tooltip
                    side="top"
                    trigger={
                        <span className="inline-block p-0.5 opacity-60 hover:opacity-100 cursor-help relative -top-px">
                            <IconInfo className="size-3.5 inline-block" />
                        </span>
                    }
                >
                    <div className="max-w-xs text-sm">{tooltip}</div>
                </Tooltip>
            )}
        </div>
        <span className="text-[13px] font-mono tabular-nums opacity-80">{value}</span>
    </div>
)

const ModeToggle = ({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }): JSX.Element => (
    <div
        role="radiogroup"
        aria-label="Evaluation mode"
        className="inline-flex p-0.5 rounded-full border border-light dark:border-dark bg-light dark:bg-dark text-[12px] font-semibold"
    >
        {(['remote', 'local'] as Mode[]).map((option) => {
            const checked = mode === option
            return (
                <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={checked}
                    onClick={() => onChange(option)}
                    className={`px-3 py-1 rounded-full transition-colors ${
                        checked
                            ? 'bg-red text-white'
                            : 'text-primary/70 dark:text-primary-dark/70 hover:text-primary dark:hover:text-primary-dark'
                    }`}
                >
                    {option === 'remote' ? 'Remote' : 'Local'}
                </button>
            )
        })}
    </div>
)

const parseRequests = (raw: string): number | null => {
    const cleaned = raw.replace(/[, _]/g, '').trim().toLowerCase()
    if (!cleaned) return null
    const match = cleaned.match(/^(\d+(?:\.\d+)?)([kmb])?$/)
    if (!match) return null
    const base = parseFloat(match[1])
    const mult = match[2] === 'k' ? 1_000 : match[2] === 'm' ? 1_000_000 : match[2] === 'b' ? 1_000_000_000 : 1
    return Math.round(base * mult)
}

const clamp = (n: number, min: number, max: number): number => Math.max(min, Math.min(max, n))

const Row = ({ label, value, emphasis = false }: { label: string; value: string; emphasis?: boolean }): JSX.Element => (
    <div className="flex items-baseline justify-between py-1">
        <span className={emphasis ? 'text-[15px] font-semibold' : 'text-[14px]'}>{label}</span>
        <span className={`font-mono tabular-nums ${emphasis ? 'text-[15px] font-semibold' : 'text-[14px]'}`}>
            {value}
        </span>
    </div>
)

const CalculatorBody = (): JSX.Element => {
    const [monthlyRequests, setMonthlyRequests] = useState<number>(1_000_000)
    const [requestsInput, setRequestsInput] = useState<string>(prettyInt(1_000_000))
    const [mode, setMode] = useState<Mode>('remote')
    const [serverCount, setServerCount] = useState<number>(10)
    const [pollIntervalSec, setPollIntervalSec] = useState<number>(30)
    const [serverSidePct, setServerSidePct] = useState<number>(50)
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

    const updateRequests = (n: number): void => {
        const bounded = clamp(n, REQUEST_MIN, REQUEST_MAX)
        setMonthlyRequests(bounded)
        setRequestsInput(prettyInt(bounded))
    }

    const handleInputBlur = (): void => {
        const parsed = parseRequests(requestsInput)
        if (parsed === null) {
            setRequestsInput(prettyInt(monthlyRequests))
            return
        }
        updateRequests(parsed)
    }

    const activeTiers = tiers ?? FALLBACK_TIERS
    const pollsPerServerMo = SECONDS_PER_MONTH / pollIntervalSec
    const localBillable = LOCAL_EVAL_MULTIPLIER * pollsPerServerMo * serverCount
    const serverFrac = serverSidePct / 100
    const mixedBillable = monthlyRequests * (1 - serverFrac) + localBillable

    const remoteCost = calculatePrice(monthlyRequests, activeTiers)
    const localCost = calculatePrice(mixedBillable, activeTiers)
    const savings = remoteCost - localCost
    const savingsPct = remoteCost > 0 ? Math.round((savings / remoteCost) * 100) : 0
    const localCostsMore = mode === 'local' && localCost > remoteCost

    return (
        <div className="border border-light dark:border-dark rounded p-5 my-6 bg-accent dark:bg-accent-dark not-prose">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                <h3 className="!my-0 !text-lg">Feature flag cost calculator</h3>
                <ModeToggle mode={mode} onChange={setMode} />
            </div>

            <div>
                <div className="flex items-baseline justify-between mb-1.5 gap-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-[13px] font-semibold">Monthly flag requests</span>
                        <Tooltip
                            side="top"
                            trigger={
                                <span className="inline-block p-0.5 opacity-60 hover:opacity-100 cursor-help relative -top-px">
                                    <IconInfo className="size-3.5 inline-block" />
                                </span>
                            }
                        >
                            <div className="max-w-xs text-sm">
                                Total flag evaluation requests across all your apps per month. If unsure, estimate as
                                daily active users × ~5 evals/user × 30 days. Accepts shorthand: 500k, 1m, 2.5b.
                            </div>
                        </Tooltip>
                    </div>
                    <input
                        type="text"
                        inputMode="numeric"
                        value={requestsInput}
                        onChange={(e) => setRequestsInput(e.target.value)}
                        onBlur={handleInputBlur}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
                        }}
                        aria-label="Monthly flag requests"
                        className="w-32 px-2 py-1 text-right text-[13px] font-mono tabular-nums rounded border border-light dark:border-dark bg-white dark:bg-accent-dark focus:outline-none focus:border-red"
                    />
                </div>
                <LogSlider
                    min={REQUEST_MIN}
                    max={REQUEST_MAX}
                    marks={REQUEST_MARKS}
                    stepsInRange={200}
                    value={Math.log(monthlyRequests)}
                    onChange={(v) => updateRequests(Math.round(Math.exp(v)))}
                />
            </div>

            {mode === 'local' && (
                <div className="mt-6 pt-4 border-t border-light dark:border-dark">
                    <div className="text-[11px] font-semibold uppercase tracking-wide opacity-60 mb-3">
                        Local evaluation settings
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                            <Label
                                title="Server fleet size"
                                value={prettyInt(serverCount)}
                                tooltip="Number of server-side processes/pods running the PostHog SDK. Each polls independently."
                            />
                            <LogSlider
                                min={1}
                                max={5000}
                                marks={[1, 10, 100, 1000, 5000]}
                                stepsInRange={200}
                                value={Math.log(serverCount)}
                                onChange={(v) => setServerCount(clamp(Math.round(Math.exp(v)), 1, 5000))}
                            />
                        </div>

                        <div>
                            <Label
                                title="Poll interval"
                                value={`${pollIntervalSec}s`}
                                tooltip="How often each server fetches fresh flag definitions. Lower = fresher flags but more billable polls."
                            />
                            <LogSlider
                                min={10}
                                max={3600}
                                marks={[10, 30, 60, 300, 900, 3600]}
                                stepsInRange={200}
                                value={Math.log(pollIntervalSec)}
                                onChange={(v) => setPollIntervalSec(clamp(Math.round(Math.exp(v)), 10, 3600))}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Label
                                title="Server-side share of requests"
                                value={`${serverSidePct}%`}
                                tooltip="Percentage of evaluations on your servers (eligible for local eval). Browser and mobile evaluations stay remote."
                            />
                            <LinearSlider
                                min={0}
                                max={100}
                                marks={[0, 25, 50, 75, 100]}
                                stepsInRange={100}
                                value={serverSidePct}
                                onChange={(v) => setServerSidePct(Math.round(v))}
                            />
                        </div>
                    </div>
                </div>
            )}

            <hr className="my-5 border-light dark:border-dark" />

            <div>
                <Row label="Remote-only cost" value={`${formatUSD(remoteCost)} / mo`} emphasis={mode === 'remote'} />
                {mode === 'local' && (
                    <>
                        <Row label="With local evaluation" value={`${formatUSD(localCost)} / mo`} emphasis />
                        <Row
                            label="Estimated savings"
                            value={
                                savings > 0
                                    ? `${formatUSD(savings)} / mo (${savingsPct}%)`
                                    : savings < 0
                                    ? `${formatUSD(-savings)} more / mo`
                                    : '$0 / mo'
                            }
                        />
                        <Row label="Annualized savings" value={savings > 0 ? formatUSD(savings * 12) : '—'} />
                    </>
                )}

                {localCostsMore && (
                    <div className="mt-4 p-3 rounded border border-yellow text-[13px] bg-yellow/10">
                        <strong>Heads up:</strong> with these settings, local evaluation would cost <em>more</em> than
                        remote. Try a larger poll interval or a smaller fleet.
                    </div>
                )}

                {tiers === null && <div className="mt-3 text-[12px] opacity-60">Loading current pricing tiers…</div>}
            </div>
        </div>
    )
}

export const FeatureFlagCostCalculator = (): JSX.Element | null => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) {
        return (
            <div className="border border-light dark:border-dark rounded p-5 my-6 bg-accent dark:bg-accent-dark not-prose">
                <h3 className="!mt-0 !mb-4 !text-lg">Feature flag cost calculator</h3>
                <div className="text-sm opacity-70">Loading…</div>
            </div>
        )
    }
    return <CalculatorBody />
}

export default FeatureFlagCostCalculator
