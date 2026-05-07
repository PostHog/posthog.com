import React, { useEffect, useMemo, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import useProducts from 'hooks/useProducts'
import useProduct from 'hooks/useProduct'
import { LogSlider, sliderCurve, inverseCurve } from 'components/Pricing/PricingSlider/Slider'
import { calculatePrice, formatUSD } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { NumericFormat } from 'react-number-format'
import AutosizeInput from 'react-input-autosize'
import OSButton from 'components/OSButton'
import { SectionComponentProps } from '../types'

const formatCompactNumber = (n: number) =>
    Intl.NumberFormat('en', { notation: 'compact', compactDisplay: n < 999999 ? 'short' : 'long' })
        .format(n)
        .toLowerCase()

const getMaxDecimalPlaces = (tiers: any[]) =>
    tiers.reduce((max: number, tier: any) => {
        const price = parseFloat(tier.unit_amount_usd)
        if (price === 0) return max
        const str = tier.unit_amount_usd.toString()
        const dot = str.indexOf('.')
        return dot === -1 ? max : Math.max(max, str.length - dot - 1)
    }, 0)

const ProductRateBlock = ({
    name,
    billingTiers,
    sliderConfig,
    initialVolume,
    unit,
    onCostChange,
}: {
    name: string
    billingTiers: any[]
    sliderConfig: { min: number; max: number; marks: number[] }
    initialVolume: number
    unit: string
    onCostChange: (cost: number) => void
}) => {
    const [volume, setVolume] = useState(initialVolume)
    const dp = useMemo(() => getMaxDecimalPlaces(billingTiers), [billingTiers])

    const { total: cost } = useMemo(
        () => (billingTiers ? calculatePrice(volume, billingTiers) : { total: 0 }),
        [volume, billingTiers]
    )

    useEffect(() => {
        onCostChange(cost)
    }, [cost])

    const getActiveTierIndex = () => {
        for (let i = 0; i < billingTiers.length; i++) {
            if (billingTiers[i].up_to === null || volume <= billingTiers[i].up_to) return i
        }
        return billingTiers.length - 1
    }
    const activeTierIndex = getActiveTierIndex()

    const prevTierIndex = useRef<number | null>(null)
    useEffect(() => {
        if (prevTierIndex.current !== null && activeTierIndex > prevTierIndex.current) {
            confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } })
        }
        prevTierIndex.current = activeTierIndex
    }, [activeTierIndex])

    const formatPrice = (str: string) => {
        const n = parseFloat(str)
        return n === 0 ? 'Free' : `$${n.toFixed(dp)}`
    }

    return (
        <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-6 @2xl:gap-10 items-start">
            <div className="space-y-px">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-black/50 backdrop-blur-md rounded-md text-white">
                    <span className="text-sm font-bold text-primary-inverse">{name}</span>
                    <span className="text-sm font-bold">/{unit}</span>
                </div>
                {/* Rows */}
                {billingTiers.map((tier: any, i: number) => {
                    const isFree = parseFloat(tier.unit_amount_usd) === 0
                    const isActive = i === activeTierIndex
                    const prev = i > 0 ? billingTiers[i - 1] : null
                    const isLast = !tier.up_to

                    let label = ''
                    if (i === 0) label = `First ${formatCompactNumber(tier.up_to)}/mo`
                    else if (isLast) label = `${formatCompactNumber(prev?.up_to)}+`
                    else label = `${formatCompactNumber(prev?.up_to)} – ${formatCompactNumber(tier.up_to)}`

                    return (
                        <div
                            key={i}
                            className={`flex items-center justify-between px-4 py-1.5 rounded-md ${
                                isActive ? 'bg-yellow/30 dark:bg-yellow/30 ' : 'transition-colors'
                            }`}
                        >
                            <span className={`text-sm ${isActive ? 'font-bold text-primary' : 'text-primary/70'}`}>
                                {label}
                            </span>
                            <span
                                className={`text-sm font-bold tabular-nums font-mono ${
                                    isFree ? 'text-green' : isActive ? 'text-primary' : 'text-primary/70'
                                }`}
                            >
                                {isFree ? 'Free' : formatPrice(tier.unit_amount_usd)}
                            </span>
                        </div>
                    )
                })}
            </div>

            {/* Right: slider */}
            <div>
                <div className="flex items-center justify-between mb-2 pr-4">
                    <div className="flex items-center gap-1.5">
                        <NumericFormat
                            inputClassName="bg-primary text-center text-lg font-bold border border-primary hover:border-button dark:border-dark rounded-sm py-1 px-1 min-w-[30px] max-w-[150px]"
                            value={volume}
                            thousandSeparator=","
                            onValueChange={({ floatValue }) => {
                                if (floatValue !== undefined) setVolume(Math.round(floatValue))
                            }}
                            customInput={AutosizeInput}
                        />
                        <span className="text-sm text-primary/60">{unit}s/mo</span>
                    </div>
                    <span className="text-base font-bold text-primary tabular-nums">{formatUSD(cost)}</span>
                </div>
                <LogSlider
                    stepsInRange={100}
                    marks={sliderConfig.marks}
                    min={sliderConfig.min}
                    max={sliderConfig.max}
                    onChange={(value) => setVolume(Math.round(sliderCurve(value)))}
                    value={inverseCurve(volume)}
                />
                <p className="text-sm text-green font-semibold mt-8">
                    First {sliderConfig.min.toLocaleString()} {unit}s free –&nbsp;<em>every month!</em>
                </p>
            </div>
        </div>
    )
}

const PricingCalculator = ({ id, productData }: SectionComponentProps) => {
    const billingHandle = productData?.sharesFreeTier || productData?.handle
    const productHook = useProduct({ handle: billingHandle })
    const billing = productHook?.billingData

    const { products } = useProducts()
    const activeProduct = useMemo(
        () => products.find((p: any) => p.handle === billingHandle || p.type === billingHandle),
        [products, billingHandle]
    )

    const [mainCost, setMainCost] = useState(0)
    const [addonCosts, setAddonCosts] = useState<number[]>([])

    if (!billing?.plans?.length || !activeProduct) return null

    const freePlan = billing.plans.find((p: any) => p.free_allocation)
    const paidPlan = billing.plans.find((p: any) => !p.free_allocation)
    const mainTiers = paidPlan?.tiers || []
    const unit = billing.unit || 'unit'
    const dp = getMaxDecimalPlaces(mainTiers)
    const firstPaidTier = mainTiers.find((t: any) => parseFloat(t.unit_amount_usd) > 0)

    const addonSliders = activeProduct.addonSliders || []
    const addonBillingData = addonSliders.map((addon: any) => {
        const ba = billing.addons?.find((a: any) => a.type === addon.key)
        return { ...addon, billingData: ba, tiers: ba?.plans?.find((p: any) => p.tiers)?.tiers }
    })

    const totalCost = mainCost + addonCosts.reduce((sum: number, c: number) => sum + c, 0)

    const handleAddonCostChange = (index: number) => (cost: number) => {
        setAddonCosts((prev) => {
            const next = [...prev]
            next[index] = cost
            return next
        })
    }

    return (
        <section id={id} className="scroll-mt-20 not-prose @container">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-10">Pricing</h2>

            {/* Primary: pricing numbers (left) + aside (right) */}
            <div className="grid grid-cols-1 @2xl:grid-cols-[3fr_2fr] gap-10 @2xl:gap-16 mb-12 pb-12 border-b border-light">
                {/* Left: the pricing as a single mixed-weight headline */}
                <div>
                    <p className="text-base text-secondary mb-3">TL;DR:</p>
                    <p className="text-2xl leading-snug font-normal text-primary mb-3">
                        {freePlan?.free_allocation && (
                            <>
                                <strong className="font-bold">
                                    {freePlan.free_allocation.toLocaleString()} {unit}s free
                                </strong>{' '}
                                every month
                            </>
                        )}
                        {firstPaidTier && (
                            <>
                                <br />
                                {'then starting at '}
                                <strong className="font-bold tabular-nums">
                                    ${parseFloat(firstPaidTier.unit_amount_usd).toFixed(dp)}/{unit}
                                </strong>
                            </>
                        )}
                    </p>
                    {mainTiers.length > 0 &&
                        (() => {
                            const lastPaidTier = [...mainTiers]
                                .reverse()
                                .find((t: any) => parseFloat(t.unit_amount_usd) > 0)
                            return lastPaidTier && lastPaidTier !== firstPaidTier ? (
                                <p className="text-base text-primary/50 mb-4">
                                    Pricing decreases with volume — as low as{' '}
                                    <strong className="font-semibold text-primary/70">
                                        ${parseFloat(lastPaidTier.unit_amount_usd).toFixed(dp)}/{unit}
                                    </strong>
                                </p>
                            ) : (
                                <div className="mb-4" />
                            )
                        })()}
                    <div className="flex flex-wrap items-center gap-3">
                        <OSButton variant="primary" asLink to="https://app.posthog.com/signup" size="lg">
                            Get started — free
                        </OSButton>
                        <OSButton variant="secondary" asLink to="/talk-to-a-human" size="lg">
                            Talk to a human
                        </OSButton>
                    </div>
                </div>

                {/* Right: aside — how the model works */}
                <div className="self-start">
                    <p className="text-sm font-semibold text-primary mb-3">How our pricing works</p>
                    <ul className="pl-5 space-y-2">
                        <li className="list-disc text-sm text-primary/80">
                            <strong className="text-primary font-semibold">Pay per use</strong>, not per seat. Your bill
                            scales with usage, not headcount.
                        </li>
                        <li className="list-disc text-sm text-primary/80">
                            <strong className="text-primary font-semibold">Volume discounts</strong> kick in
                            automatically — no negotiations needed.
                        </li>
                        <li className="list-disc text-sm text-primary/80">
                            <strong className="text-primary font-semibold">Set billing limits</strong> per product.
                            Never get an unexpected bill.
                        </li>
                        <li className="list-disc text-sm text-primary/80">
                            <strong className="text-primary font-semibold">We &lt;3 startups:</strong> Under 2 years old
                            and pre-series B?{' '}
                            <a href="/startups" className="underline">
                                Apply for $50k in credits
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <h3 className="text-xl font-bold text-primary mb-5">Calculate your cost</h3>

            {/* Main product: rates left, slider right */}
            {mainTiers.length > 0 && (
                <ProductRateBlock
                    name={activeProduct.name || productData.name}
                    billingTiers={mainTiers}
                    sliderConfig={
                        activeProduct.slider || {
                            min: freePlan?.free_allocation || 0,
                            max: 500000,
                            marks: [],
                        }
                    }
                    initialVolume={activeProduct.volume || freePlan?.free_allocation || 0}
                    unit={unit}
                    onCostChange={setMainCost}
                />
            )}

            {/* Add-on rate blocks */}
            {addonBillingData
                .filter((a: any) => a.tiers?.length)
                .map((addon: any, i: number) => (
                    <div key={addon.key} className="mt-8 pt-8 border-t-2 border-primary/20">
                        <ProductRateBlock
                            name={addon.label}
                            billingTiers={addon.tiers}
                            sliderConfig={addon.sliderConfig}
                            initialVolume={addon.volume || addon.sliderConfig?.min || 0}
                            unit={addon.unit || unit}
                            onCostChange={handleAddonCostChange(i)}
                        />
                    </div>
                ))}

            {/* Total */}
            <div className="mt-6 border-t-3 border-primary">
                <div className="flex items-center justify-between px-4 py-3">
                    <p className="font-black text-lg text-primary-inverse m-0">Estimated monthly cost</p>
                    <span className="text-base font-black text-primary-inverse tabular-nums">
                        {formatUSD(totalCost)}
                    </span>
                </div>
            </div>
        </section>
    )
}

export default PricingCalculator
