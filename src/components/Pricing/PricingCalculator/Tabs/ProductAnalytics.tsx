import { IconX } from '@posthog/icons'
import Checkbox from 'components/Checkbox'
import { PricingTiers } from 'components/Pricing/Plans'
import { NonLinearSlider, nonLinearCurve, reverseNonLinearCurve } from 'components/Pricing/PricingSlider/Slider'
import { calculatePrice, formatUSD } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import React, { useEffect, useMemo, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import Link from 'components/Link'

const getTotalAnalyticsVolume = (analyticsData: any) => {
    return Object.keys(analyticsData).reduce((acc, key) => acc + analyticsData[key].volume, 0)
}

const getTotalAnalyticsCost = (analyticsData: any) => {
    return Object.keys(analyticsData).reduce((acc, key) => acc + analyticsData[key].cost, 0)
}

const getTotalEnhancedPersonsVolume = (analyticsData: any) => {
    return Object.keys(analyticsData).reduce(
        (acc, key) => acc + (analyticsData[key].enhanced ? analyticsData[key].volume : 0),
        0
    )
}

const analyticsSliders = [
    {
        label: 'Website analytics',
        types: [{ type: 'websiteAnalyticsEvents' }],
        checked: true,
    },
    {
        label: 'Product analytics',
        types: [{ type: 'productAnalyticsEvents', enhanced: true }],
        checked: true,
    },
    {
        label: 'Mobile app',
        types: [
            { type: 'mobileAppAnonymousEvents', label: 'Anonymous events' },
            { type: 'mobileAppAuthenticatedEvents', label: 'Events from authenticated users', enhanced: true },
        ],
    },
    {
        label: 'LLM events',
        types: [
            { type: 'llmAnonymousEvents', label: 'Anonymous events' },
            { type: 'llmAuthenticatedEvents', label: 'Events from authenticated users', enhanced: true },
        ],
    },
    {
        label: 'API events',
        types: [
            { type: 'apiAnonymousEvents', label: 'Anonymous events' },
            { type: 'apiAuthenticatedEvents', label: 'Events from authenticated users', enhanced: true },
        ],
    },
    {
        label: 'Other events',
        types: [
            { type: 'otherAnonymousEvents', label: 'Anonymous events' },
            { type: 'otherAuthenticatedEvents', label: 'Events from authenticated users', enhanced: true },
        ],
    },
]

const AnalyticsSlider = ({ marks, min, max, className = '', label, onChange, value, enhanced = '' }) => {
    return (
        <div className={`${className} relative ${label ? 'pt-7' : ''}`}>
            {label && <p className="m-0 text-sm absolute left-8 top-0">{label} {enhanced && <span className="text-primary/70 dark:text-primary-dark/70">– uses <Link href="#" className="text-red dark:text-yellow font-semibold">person profiles</Link></span>}</p>}
            <NonLinearSlider
                stepsInRange={100}
                marks={marks}
                min={min}
                max={max}
                onChange={(value) => onChange(reverseNonLinearCurve(value))}
                value={nonLinearCurve(value)}
            />
        </div>
    )
}

const SliderToggle = ({ label = '', types, activeProduct, setAnalyticsVolume, analyticsData, ...other }) => {
    const [volume, setVolume] = useState({})
    const [checked, setChecked] = useState(other.checked || false)

    const handleCheck = () => {
        if (checked) {
            const volume = {}
            types.forEach(({ type }) => {
                volume[type] = analyticsData[type].volume
                setAnalyticsVolume(type, 0)
            })
            setVolume(volume)
        } else {
            types.forEach(({ type }) => {
                setAnalyticsVolume(type, volume[type] || 0)
            })
        }
        setChecked(!checked)
    }

    return (
        <div className={`mt-2 grid grid-cols-6 ${checked ? 'mb-10' : 'mb-2'}`}>
            <div className={`space-y-3 ${checked ? 'col-span-6' : 'col-span-4'}`}>
                <Checkbox className="!text-base" checked={checked} onChange={handleCheck} value={label} />
                {checked && (
                    <div className="space-y-12">
                        {types.map(({ type, label }) => (
                            <div key={type}>
                                <div className="grid grid-cols-6 gap-8">
                                    <AnalyticsSlider
                                        {...activeProduct.slider}
                                        onChange={(value) => setAnalyticsVolume(type, value)}
                                        value={analyticsData[type].volume}
                                        className="col-span-4 pl-8"
                                        label={label}
                                        enhanced={analyticsData[type].enhanced}
                                    />
                                    <div className="text-right font-bold m-0 self-end -mb-1.5 flex justify-center">
                                        <NumericFormat
                                            className="bg-transparent text-center focus:ring-0 focus:border-red dark:focus:border-yellow focus:bg-white dark:focus:bg-accent-dark font-code max-w-[103px] text-sm border border-light hover:border-button dark:border-dark rounded-sm py-1 px-0"
                                            value={analyticsData[type].volume}
                                            thousandSeparator=","
                                            onValueChange={({ floatValue }) => setAnalyticsVolume(type, floatValue)}
                                        />
                                    </div>
                                    <p className="text-right font-bold m-0 self-end -mb-1.5">
                                        {formatUSD(analyticsData[type].cost)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {!checked && (
                <>
                    <span className="opacity-25 text-center">--</span>
                    <span className="opacity-25 text-right">--</span>
                </>
            )}
        </div>
    )
}

export default function ProductAnalyticsTab({ activeProduct, setProduct }) {
    const [analyticsData, setAnalyticsData] = useState(
        analyticsSliders.reduce((acc, slider) => {
            slider.types.forEach(({ type, enhanced }) => {
                acc[type] = { volume: 0, cost: 0, enhanced: enhanced || false }
            })
            return acc
        }, [])
    )
    const [showBreakdown, setShowBreakdown] = useState(false)

    const productAnalyticsTiers = useMemo(() => activeProduct?.billingData.plans.find((plan) => plan.tiers).tiers, [])
    const enhancedPersonsAddonTiers = useMemo(
        () =>
            activeProduct?.billingData.addons
                .find((addon) => addon.type === 'enhanced_persons')
                .plans.find((plan) => plan.tiers).tiers,
        []
    )
    const totalEnhancedPersonsVolume = getTotalEnhancedPersonsVolume(analyticsData)
    const enhancedPersonsCost = calculatePrice(totalEnhancedPersonsVolume, enhancedPersonsAddonTiers)

    const setAnalyticsVolume = (type: string, volume: number) => {
        setAnalyticsData((data) => {
            const newAnalyticsData = {
                ...data,
                [type]: {
                    ...data[type],
                    volume: Math.round(volume),
                },
            }
            const totalProductAnalyticsVolume = getTotalAnalyticsVolume(newAnalyticsData)
            const totalCost = calculatePrice(totalProductAnalyticsVolume, productAnalyticsTiers).total
            const totalEnhancedPersonsCost = enhancedPersonsCost.total
            Object.keys(newAnalyticsData).forEach((key) => {
                const volume = newAnalyticsData[key].volume
                const percentageOfTotalVolume = (volume / totalProductAnalyticsVolume) * 100
                let cost = (percentageOfTotalVolume / 100) * totalCost
                if (newAnalyticsData[key].enhanced) {
                    const percentageOfEnhancedPersonsVolume = (volume / totalEnhancedPersonsVolume) * 100
                    const enhancedPersonsCost = (percentageOfEnhancedPersonsVolume / 100) * totalEnhancedPersonsCost
                    cost += enhancedPersonsCost
                }
                newAnalyticsData[key].cost = cost || 0
            })
            return newAnalyticsData
        })
    }

    useEffect(() => {
        const totalAnalyticsCost = getTotalAnalyticsCost(analyticsData)
        const totalAnalyticsVolume = getTotalAnalyticsVolume(analyticsData)
        const { costByTier } = calculatePrice(totalAnalyticsVolume, productAnalyticsTiers)
        setProduct('product_analytics', { cost: totalAnalyticsCost, volume: totalAnalyticsVolume, costByTier })
    }, [analyticsData])

    useEffect(() => {
        Object.keys(analyticsData).forEach((key) => setAnalyticsVolume(key, analyticsData[key].volume))
    }, [])

    return (
        <div className="mb-4 pr-3">
            <div className="border border-green bg-green/25 px-3 py-2 rounded italic mb-4 text-sm">
                First 1,000,000 events free – every month!
            </div>
            <div className="grid grid-cols-6 gap-8 items-end mb-2">
                <h3 className="m-0 text-base col-span-4">Event usage</h3>
                <p className="m-0 text-center opacity-70 text-sm">Events/mo</p>
                <p className="m-0 text-right opacity-70 text-sm">Subtotal</p>
            </div>

            {analyticsSliders.map((slider) => (
                <SliderToggle
                    key={slider.label}
                    analyticsData={analyticsData}
                    setAnalyticsVolume={setAnalyticsVolume}
                    activeProduct={activeProduct}
                    {...slider}
                />
            ))}
            {!showBreakdown && (
                <div className="text-right">
                    <button onClick={() => setShowBreakdown(true)} className="text-red dark:text-yellow font-semibold text-sm">
                        See how we calculate this
                    </button>
                </div>
            )}
            {showBreakdown && (
                <div className="p-4 mt-4 rounded border border-light dark:border-dark bg-white dark:bg-accent-dark relative">
                    <div className="absolute top-4 right-4">
                        <button onClick={() => setShowBreakdown(false)} className="text-primary/50 hover:text-primary/100 dark:text-primary-dark/50 dark:hover:text-primary-dark/100">
                            <IconX className="size-5 inline-block" />
                        </button>
                    </div>
                    <h4 className="mb-1">How event pricing is calculated</h4>
                    <p className="text-sm font-normal">Events are billed at different rates based on volume and if you choose to attach a <Link href="#">person profile</Link> to the event. (This allows you to send custom properties like email address or plan name.)</p>
                    <div className="my-4 grid grid-cols-2 gap-8 border border-light dark:border-dark p-4 bg-tan dark:bg-accent-dark rounded">
                        <div>
                            <h4 className="m-0 text-base mb-0">Anonymous events</h4>
                            <p className="m-0 text-sm opacity-70 italic mb-2">Base event price</p>

                            <p className="m-0 text-sm opacity-70">Starts at </p>
                            <p className="m-0">
                                <strong>
                                    $
                                    {
                                        activeProduct.costByTier.find((tier) => tier.unit_amount_usd !== '0')
                                            .unit_amount_usd
                                    }
                                </strong>
                                <span className="opacity-70 text-sm">/event</span>
                            </p>
                            <p className="text-green m-0 text-sm font-bold">First 1 million events/mo free</p>
                        </div>
                        <div>
                            <h4 className="m-0 text-base mb-0">Identified events</h4>
                            <p className="m-0 text-sm opacity-70 italic mb-2">Base event price + person profile add-on</p>
                            <p className="m-0 text-sm opacity-70">Starts at </p>
                            <p className="m-0">


                                <strong>
                                    $
                                    {
                                        activeProduct.costByTier.find((tier) => tier.unit_amount_usd !== '0')
                                            .unit_amount_usd
                                    }
                                </strong>
                                <span className="opacity-70 text-sm">/event +{' '}</span>
                                <strong>
                                    $
                                    {
                                        enhancedPersonsCost.costByTier.find((tier) => tier.unit_amount_usd !== '0')
                                            .unit_amount_usd
                                    }
                                </strong>
                                <span className="opacity-70 text-sm">/event</span>
                            </p>
                            <p className="text-green m-0 text-sm font-bold">First 1 million events/mo free</p>
                        </div>
                    </div>
                    <p className="my-4 font-bold">Here's how your estimate breaks down:</p>
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-lg m-0">Anonymous events</h4>
                            <p className="opacity-70 m-0"><strong>Used for:</strong> Website analytics, Anonymous mobile events</p>
                            <div className="p-1 border border-border dark:border-dark rounded-md mt-2">
                                <PricingTiers
                                    plans={[{ tiers: activeProduct.costByTier }]}
                                    unit={activeProduct.billingData.unit}
                                    type={'product_analytics'}
                                    showSubtotal
                                />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg m-0">Identified events (with person profiles)</h4>
                            <p className="opacity-70 m-0"><strong>Used for:</strong> authenticated users</p>
                            <div className="p-1 border border-border dark:border-dark rounded-md mt-2">
                                <PricingTiers
                                    plans={[{ tiers: enhancedPersonsCost.costByTier }]}
                                    unit={activeProduct.billingData.unit}
                                    type={'product_analytics'}
                                    showSubtotal
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
