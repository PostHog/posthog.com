import React, { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { IconInfo } from '@posthog/icons'
import Tooltip from 'components/Tooltip'
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
            <span className="text-[14px] font-semibold">{title}</span>
            {tooltip && (
                <Tooltip placement="top" content={() => <div className="max-w-xs text-sm">{tooltip}</div>}>
                    <span className="inline-block p-0.5 opacity-60 hover:opacity-100 cursor-help relative -top-px">
                        <IconInfo className="size-4 inline-block" />
                    </span>
                </Tooltip>
            )}
        </div>
        <span className="text-[14px] font-mono tabular-nums">{value}</span>
    </div>
)

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
            <h3 className="!mt-0 !mb-4 !text-lg">Feature flag cost calculator</h3>

            <div className="space-y-5">
                <div>
                    <Label
                        title="Monthly flag requests"
                        value={prettyInt(monthlyRequests)}
                        tooltip="Total flag evaluation requests across all your apps per month. If unsure, estimate as daily active users × ~5 evals/user × 30 days."
                    />
                    <LogSlider
                        min={REQUEST_MIN}
                        max={REQUEST_MAX}
                        marks={REQUEST_MARKS}
                        stepsInRange={200}
                        value={Math.log(monthlyRequests)}
                        onChange={(v) => setMonthlyRequests(Math.round(Math.exp(v)))}
                    />
                </div>

                <div>
                    <div className="text-[14px] font-semibold mb-2">Evaluation mode</div>
                    <RadioGroup value={mode} onChange={setMode} className="flex gap-2">
                        {(['remote', 'local'] as Mode[]).map((option) => (
                            <RadioGroup.Option
                                key={option}
                                value={option}
                                className={({ checked }) =>
                                    `cursor-pointer flex-1 text-center py-2 px-3 rounded border text-[14px] ${
                                        checked
                                            ? 'bg-red text-white border-red'
                                            : 'border-light dark:border-dark hover:border-red/50'
                                    }`
                                }
                            >
                                {option === 'remote' ? 'Remote' : 'Local'}
                            </RadioGroup.Option>
                        ))}
                    </RadioGroup>
                </div>

                {mode === 'local' && (
                    <div className="space-y-4 pl-3 border-l-2 border-red/30">
                        <div>
                            <Label
                                title="Server fleet size"
                                value={prettyInt(serverCount)}
                                tooltip="Number of server-side processes/pods running the PostHog SDK. Each polls independently."
                            />
                            <LinearSlider
                                min={1}
                                max={5000}
                                marks={[1, 10, 100, 1000, 5000]}
                                stepsInRange={500}
                                value={serverCount}
                                onChange={(v) => setServerCount(Math.round(v))}
                            />
                        </div>

                        <div>
                            <Label
                                title="Poll interval (seconds)"
                                value={`${pollIntervalSec}s`}
                                tooltip="How often each server fetches fresh flag definitions. Lower = fresher flags but more billable polls."
                            />
                            <LinearSlider
                                min={10}
                                max={3600}
                                marks={[10, 30, 60, 300, 900, 3600]}
                                stepsInRange={359}
                                value={pollIntervalSec}
                                onChange={(v) => setPollIntervalSec(Math.round(v))}
                            />
                        </div>

                        <div>
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
                )}
            </div>

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
