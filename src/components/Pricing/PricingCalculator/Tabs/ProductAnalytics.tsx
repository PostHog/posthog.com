import Checkbox from 'components/Checkbox'
import { PricingTiers } from 'components/Pricing/Plans'
import { NonLinearSlider, nonLinearCurve, reverseNonLinearCurve } from 'components/Pricing/PricingSlider/Slider'
import { calculatePrice, formatUSD } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import React, { useEffect, useMemo, useState } from 'react'
import { NumericFormat } from 'react-number-format'

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

const AnalyticsSlider = ({ marks, min, max, className = '', label, onChange, value }) => {
    return (
        <div className={`${className} ml-6 relative ${label ? 'pt-7' : ''}`}>
            {label && <p className="m-0 text-sm absolute left-0 top-0">{label}</p>}
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
        <div className={`mt-2 grid ${checked ? 'mb-10' : 'mb-2 grid-cols-5'}`}>
            <div className="space-y-3 col-span-3">
                <Checkbox className="!text-base" checked={checked} onChange={handleCheck} value={label} />
                {checked && (
                    <div className="space-y-8">
                        {types.map(({ type, label }) => (
                            <div key={type}>
                                <div className="grid grid-cols-5">
                                    <AnalyticsSlider
                                        {...activeProduct.slider}
                                        onChange={(value) => setAnalyticsVolume(type, value)}
                                        value={analyticsData[type].volume}
                                        className="col-span-3"
                                        label={label}
                                    />
                                    <div className="text-right font-bold m-0 self-end -mb-1.5 flex justify-end">
                                        <NumericFormat
                                            className="bg-transparent text-right p-0 focus:ring-0 max-w-[103px] border-t-0 border-x-0 border-dashed border-border dark:border-dark"
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
                    <span className="opacity-25 text-right">--</span>
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
            <div className="grid grid-cols-5 items-end mb-2">
                <h3 className="m-0 text-base col-span-3">Event types</h3>
                <p className="m-0 text-right opacity-70 text-sm">Events/month</p>
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
                <button onClick={() => setShowBreakdown(true)} className="text-red dark:text-yellow font-bold mt-2">
                    Show breakdown
                </button>
            )}
            {showBreakdown && (
                <div className="pt-4 mt-4 border-t border-border dark:border-dark">
                    <h5 className="m-0 text-base font-normal">There are two types of events:</h5>
                    <div className="my-4 grid grid-cols-2">
                        <div>
                            <h4 className="m-0 text-lg mb-1">Anonymous</h4>
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
                            <p className="text-green m-0">First 1 million events/mo free</p>
                        </div>
                        <div>
                            <h4 className="m-0 text-lg mb-1">Identified</h4>
                            <p className="m-0 text-sm opacity-70">Starts at </p>
                            <p className="m-0">
                                <strong>
                                    $
                                    {
                                        enhancedPersonsCost.costByTier.find((tier) => tier.unit_amount_usd !== '0')
                                            .unit_amount_usd
                                    }
                                </strong>
                                <span className="opacity-70 text-sm">/event</span>
                            </p>
                            <p className="text-green m-0">First 1 million events/mo free</p>
                        </div>
                    </div>
                    <p className="my-4">Here's how your estimate breaks down:</p>
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-lg m-0">Anonymous events</h4>
                            <p className="opacity-70 m-0">Used for Website analytics, Anonymous mobile events</p>
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
                            <h4 className="text-lg m-0">Identified events</h4>
                            <p className="opacity-70 m-0">Used for authenticated users</p>
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
