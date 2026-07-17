import React, { useEffect, useMemo, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import useProducts from 'hooks/useProducts'
import useProduct from 'hooks/useProduct'
import { LogSlider, sliderCurve, inverseCurve } from 'components/Pricing/PricingSlider/Slider'
import { calculatePrice, formatUSD } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { NumericFormat } from 'react-number-format'
import AutosizeInput from 'react-input-autosize'
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

const fireConfettiFromElement = (el: HTMLElement | null) => {
    if (!el || typeof window === 'undefined') return
    const rect = el.getBoundingClientRect()
    const vw = window.innerWidth || 1
    const vh = window.innerHeight || 1
    const x = (rect.left + rect.width / 2) / vw
    const y = (rect.top + rect.height / 2) / vh
    confetti({ particleCount: 80, spread: 70, origin: { x, y }, disableForReducedMotion: true })
}

const ProductRateBlock = ({
    name,
    description,
    billingTiers,
    sliderConfig,
    initialVolume,
    unit,
    onCostChange,
}: {
    name: string
    description?: string
    billingTiers: any[]
    sliderConfig: { min: number; max: number; marks: number[] }
    initialVolume: number
    unit: string
    onCostChange: (cost: number) => void
}) => {
    const [volume, setVolume] = useState(initialVolume)
    const dp = useMemo(() => getMaxDecimalPlaces(billingTiers), [billingTiers])

    const { total: cost, costByTier } = useMemo(
        () =>
            billingTiers
                ? calculatePrice(volume, billingTiers)
                : { total: 0, costByTier: [] as { eventsInThisTier: number; tierCost: number }[] },
        [volume, billingTiers]
    )

    const hasFractionalSubtotal = costByTier?.some((t) => t.tierCost % 1 !== 0) ?? false

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
    const tierRefs = useRef<(HTMLSpanElement | null)[]>([])
    useEffect(() => {
        if (prevTierIndex.current !== null && activeTierIndex > prevTierIndex.current) {
            fireConfettiFromElement(tierRefs.current[activeTierIndex])
        }
        prevTierIndex.current = activeTierIndex
    }, [activeTierIndex])

    const formatPrice = (str: string) => {
        const n = parseFloat(str)
        return n === 0 ? 'Free' : `$${n.toFixed(dp)}`
    }

    return (
        <div>
            <div className="border-b-2 border-dark dark:border-white pb-2 mb-4">
                <span className="font-bold text-primary">{name}</span>
            </div>
            <div className="grid grid-cols-1 @2xl:grid-cols-10 gap-6 @2xl:gap-8 items-start">
                {description && (
                    <div className="@2xl:col-span-3 text-sm text-primary/80 leading-relaxed">{description}</div>
                )}
                <div className={`space-y-6 ${description ? '@2xl:col-span-7' : '@2xl:col-span-10'}`}>
                    {/* Tier table — collapses to 2 cols on narrow, expands to 12 cols at @md */}
                    <div className="space-y-px">
                        {/* Header (hidden on narrow — rows are self-labeling) */}
                        <div className="hidden @md:grid grid-cols-12 items-center px-4 py-2 bg-black/10 dark:bg-white/10 rounded-md font-bold gap-2">
                            <span className="col-span-4 text-sm text-black dark:text-white">Allocation</span>
                            <span className="col-span-3 text-sm text-black dark:text-white">Unit price</span>
                            <span className="col-span-3 text-sm text-right text-black dark:text-white">
                                Your selection
                            </span>
                            <span className="col-span-2 text-sm text-right text-black dark:text-white">Subtotal</span>
                        </div>

                        {billingTiers.map((tier: any, i: number) => {
                            const isFree = parseFloat(tier.unit_amount_usd) === 0
                            const isActive = i === activeTierIndex
                            const prev = i > 0 ? billingTiers[i - 1] : null
                            const isLast = !tier.up_to

                            let label = ''
                            if (i === 0) label = `First ${formatCompactNumber(tier.up_to)} ${unit}s/mo`
                            else if (isLast) label = `${formatCompactNumber(prev?.up_to)}+`
                            else label = `${formatCompactNumber(prev?.up_to)}-${formatCompactNumber(tier.up_to)}`

                            const tierBreakdown = costByTier?.[i]
                            const tierEvents = tierBreakdown?.eventsInThisTier ?? 0
                            const tierCost = tierBreakdown?.tierCost ?? 0

                            return (
                                <div
                                    key={i}
                                    className={`grid grid-cols-2 @md:grid-cols-12 items-center gap-x-2 gap-y-1 px-4 py-1.5 rounded-md ${
                                        isActive ? 'bg-yellow/30 dark:bg-yellow/30 ' : 'transition-colors'
                                    }`}
                                >
                                    {/* Allocation — narrow: row 1 left | @md: col 1 */}
                                    <span
                                        ref={(el) => {
                                            tierRefs.current[i] = el
                                        }}
                                        className={`order-1 col-span-1 @md:col-span-4 text-sm ${
                                            isActive ? 'font-bold text-primary' : 'text-primary/70'
                                        }`}
                                    >
                                        {label}
                                    </span>

                                    {/* Your selection — narrow: row 1 right | @md: col 3 */}
                                    <span
                                        className={`order-2 @md:order-3 col-span-1 @md:col-span-3 text-sm text-right font-code tabular-nums ${
                                            isActive ? 'text-primary' : 'text-primary/70'
                                        }`}
                                    >
                                        {tierEvents.toLocaleString()}
                                    </span>

                                    {/* Price — narrow: row 2 left | @md: col 2 */}
                                    <span
                                        className={`order-3 @md:order-2 col-span-1 @md:col-span-3 text-sm tabular-nums ${
                                            isFree ? 'text-green' : isActive ? 'text-primary' : 'text-primary/70'
                                        }`}
                                    >
                                        {isFree ? (
                                            <strong>Free</strong>
                                        ) : (
                                            <>
                                                <strong>{formatPrice(tier.unit_amount_usd)}</strong>
                                                <span className="opacity-70">/{unit}</span>
                                            </>
                                        )}
                                    </span>

                                    {/* Subtotal — narrow: row 2 right | @md: col 4 */}
                                    <span
                                        className={`order-4 col-span-1 @md:col-span-2 text-sm text-right font-bold tabular-nums ${
                                            isActive ? 'text-primary' : 'text-primary/70'
                                        }`}
                                    >
                                        {formatUSD(tierCost, hasFractionalSubtotal)}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    {/* Slider + input + per-block total (sits below the matrix so the running subtotal trails the breakdown) */}
                    <div className="pl-4 pr-1">
                        <div className="flex items-center justify-between mb-2">
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
                        <p className="text-sm text-green font-semibold mt-8 mb-0">
                            First {sliderConfig.min.toLocaleString()} {unit}s free –&nbsp;<em>every month!</em>
                        </p>
                    </div>
                </div>
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
        <section id={id} className="scroll-mt-40 not-prose @container">
            <h2 className="text-3xl font-bold text-primary mt-0 !mb-4">Calculate your cost</h2>

            {/* Main product */}
            {mainTiers.length > 0 && (
                <ProductRateBlock
                    name={activeProduct.label || activeProduct.name || productData.label || productData.name}
                    description={activeProduct.pricingDescription || productData?.pricingDescription}
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
                    <div key={addon.key} className="mt-8">
                        <ProductRateBlock
                            name={addon.label}
                            description={addon.pricingDescription}
                            billingTiers={addon.tiers}
                            sliderConfig={addon.sliderConfig}
                            initialVolume={addon.volume || addon.sliderConfig?.min || 0}
                            unit={addon.unit || unit}
                            onCostChange={handleAddonCostChange(i)}
                        />
                    </div>
                ))}

            {/* Total */}
            <div className="mt-6 border-t-2 border-dark dark:border-white">
                <div className="flex items-center justify-between py-3">
                    <p className="font-black text-xl text-primary m-0">Estimated monthly cost</p>
                    <span className="text-2xl font-black text-primary tabular-nums">{formatUSD(totalCost)}</span>
                </div>
            </div>
        </section>
    )
}

export default PricingCalculator
