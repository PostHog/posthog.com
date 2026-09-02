import { IconInfo, IconLightBulb, IconX } from '@posthog/icons'
import Checkbox from 'components/Checkbox'
import { PricingTiers } from 'components/Pricing/Plans'
import { NonLinearSlider, nonLinearCurve, reverseNonLinearCurve } from 'components/Pricing/PricingSlider/Slider'
import { calculatePrice } from 'components/Pricing/PricingCalculator/calculatorLogic'
import React, { useEffect, useMemo, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import AutosizeInput from 'react-input-autosize'
import qs from 'qs'
import Tooltip from 'components/Tooltip'
import { Addons } from '../Tabbed'
import { useApp } from '../../../../context/App'
import EventTypesModal, { EVENT_TYPES_MODAL_KEY } from '../EventTypesModal'

const getTotalAnalyticsVolume = (analyticsData: any) => {
    return Object.keys(analyticsData).reduce((acc, key) => acc + analyticsData[key].volume, 0)
}

const getTotalAnalyticsCost = (analyticsData: any) => {
    return Object.keys(analyticsData).reduce((acc, key) => acc + analyticsData[key].cost, 0)
}

export const getTotalEnhancedPersonsVolume = (analyticsData: any) => {
    return analyticsData
        ? Object.keys(analyticsData).reduce(
              (acc, key) => acc + (analyticsData[key].enhanced ? analyticsData[key].volume : 0),
              0
          )
        : null
}

export const analyticsSliders = [
    {
        label: 'Product analytics',
        types: [{ type: 'productAnalyticsEvents', label: 'Identified events', enhanced: true }],
        checked: true,
    },
    {
        label: 'Website analytics',
        types: [{ type: 'websiteAnalyticsEvents', label: 'Anonymous events' }],
        checked: true,
    },
]

const getLabelByType = (key) => {
    const slider = analyticsSliders.find((slider) => slider.types.some((type) => type.type === key))
    const type = slider?.types.find((type) => type.type === key)
    return slider?.types.length > 1
        ? `${slider.label.replace('events', '')} ${type.enhanced ? 'identified' : 'anonymous'} events`
        : slider.label
}

const AnalyticsSlider = ({ marks, min, max, className = '', label, onChange, value, enhanced = '' }) => {
    const { addWindow } = useApp()

    const openEventTypes = () => {
        addWindow(
            (
                <EventTypesModal location={{ pathname: EVENT_TYPES_MODAL_KEY }} key={EVENT_TYPES_MODAL_KEY} newWindow />
            ) as any
        )
    }
    return (
        <div className={`${className} relative ${label ? 'pt-7' : ''}`}>
            {label && (
                <p className="m-0 text-sm absolute left-8 top-0">
                    {label}{' '}
                    {enhanced ? (
                        <span className="text-secondary">
                            <Tooltip
                                content={() => (
                                    <div className="max-w-[250px]">
                                        <p className="text-sm mb-2">
                                            Typically used for authenticated users where you know their email address or
                                            want to send custom properties
                                        </p>
                                        <p className="text-sm mb-0">
                                            <button
                                                onClick={openEventTypes}
                                                className="text-red dark:text-yellow font-semibold text-sm"
                                            >
                                                Explain event types
                                            </button>
                                        </p>
                                    </div>
                                )}
                                placement="right"
                            >
                                <IconInfo className="size-4 inline-block relative -top-0.5" />
                            </Tooltip>
                        </span>
                    ) : (
                        <span className="text-secondary"></span>
                    )}
                </p>
            )}
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
        <div className={`mt-2 grid grid-cols-6 gap-8 ${checked ? 'mb-10' : 'mb-2'}`}>
            <div className={`space-y-3 ${checked ? 'col-span-6' : 'col-span-5'}`}>
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
                                        className="col-span-5 pl-8"
                                        label={label}
                                        enhanced={analyticsData[type].enhanced}
                                    />
                                    <div className="col-span-1 text-right font-bold m-0 self-end -mb-1.5 flex justify-end">
                                        <NumericFormat
                                            inputClassName="bg-transparent text-center focus:ring-0 focus:border-red dark:focus:border-yellow focus:bg-white dark:focus:bg-accent-dark font-code max-w-[103px] text-sm border border-light hover:border-button dark:border-dark rounded-sm py-1 px-0 min-w-[25px] px-1"
                                            value={analyticsData[type].volume}
                                            thousandSeparator=","
                                            onValueChange={({ floatValue }) => setAnalyticsVolume(type, floatValue)}
                                            customInput={AutosizeInput}
                                        />
                                        {/* {formatUSD(analyticsData[type].cost)} */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {!checked && (
                <>
                    <span className="opacity-25 text-right">--&nbsp;</span>
                </>
            )}
        </div>
    )
}

export default function ProductAnalyticsTab({
    activeProduct,
    setProduct,
    analyticsData,
    setAnalyticsData,
    setAddons,
    addons,
}) {
    const [showBreakdown, setShowBreakdown] = useState(false)
    const productAnalyticsTiers = useMemo(() => activeProduct?.billingData.plans.find((plan) => plan.tiers).tiers, [])
    const enhancedPersonsAddonTiers = useMemo(
        () =>
            activeProduct?.billingData.addons
                .find((addon) => addon.type === 'enhanced_persons')
                .plans.find((plan) => plan.tiers).tiers,
        []
    )
    const totalProductAnalyticsVolume = getTotalAnalyticsVolume(analyticsData)
    const totalEnhancedPersonsVolume = getTotalEnhancedPersonsVolume(analyticsData)
    const enhancedPersonsCost = calculatePrice(totalEnhancedPersonsVolume, enhancedPersonsAddonTiers)

    const anonymousUsed = Object.keys(analyticsData).filter((key) => analyticsData[key].volume > 0)
    const identifiedUsed = Object.keys(analyticsData).filter(
        (key) => analyticsData[key].enhanced && analyticsData[key].volume > 0
    )

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
            const totalEnhancedPersonsVolume = getTotalEnhancedPersonsVolume(newAnalyticsData)
            const enhancedPersonsCost = calculatePrice(totalEnhancedPersonsVolume, enhancedPersonsAddonTiers)
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
        const urlParams = new URLSearchParams(window.location.search)
        const volumes = qs.parse(urlParams.toString())
        if (volumes['product_analytics']?.types) {
            Object.keys(volumes['product_analytics'].types).forEach((subtype) => {
                const volume = volumes['product_analytics'].types[subtype]?.volume
                if (volume) {
                    setAnalyticsVolume(subtype, Number(volume))
                }
            })
        }
    }, [])

    return (
        <div>
            {analyticsSliders.map((slider) => (
                <SliderToggle
                    key={slider.label}
                    analyticsData={analyticsData}
                    setAnalyticsVolume={setAnalyticsVolume}
                    activeProduct={activeProduct}
                    {...slider}
                />
            ))}
            <div className="pr-1.5 mt-2 flex gap-3 items-center justify-between">
                <span className="flex gap-1 items-center min-w-0">
                    <IconLightBulb className="size-5 inline-block text-[#4f9032] dark:text-green relative -top-px shrink-0" />
                    <span className="text-sm text-[#4f9032] dark:text-green font-semibold">
                        {activeProduct.freeAllocationText ? (
                            activeProduct.freeAllocationText
                        ) : (
                            <>
                                First {Math.round(activeProduct.slider.min).toLocaleString()}{' '}
                                {activeProduct.billingData.unit}s free –&nbsp;
                                <em>every month!</em>
                            </>
                        )}
                    </span>
                </span>
                <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="text-red dark:text-yellow font-semibold text-sm shrink-0"
                >
                    {showBreakdown ? 'Hide how we calculate this' : 'See how we calculate this'}
                </button>
            </div>
            {showBreakdown && (
                <div className="p-4 mt-4 rounded border border-primary bg-white dark:bg-accent-dark relative">
                    <h4 className="mb-1">How event pricing is calculated</h4>
                    <p className="text-sm font-normal mb-2">
                        All events are billed at a single base rate. Events for users who have been identified or have
                        custom properties stored on them are charged an additional rate called Person profiles.
                    </p>
                    <p className="my-4 font-bold border-t border-primary pt-4">Here's how your estimate breaks down:</p>
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-lg m-0">All events (base rate)</h4>
                            {anonymousUsed.length > 0 && (
                                <p className="opacity-70 m-0 text-sm">
                                    <strong>Used for:</strong>{' '}
                                    {anonymousUsed.map((type) => getLabelByType(type)).join(', ')}
                                </p>
                            )}
                            <div className="overflow-auto -mx-4 px-4 md:mx-0 md:px-0">
                                <div className="p-1 min-w-[500px] md:min-w-auto border border-input rounded-md mt-2">
                                    <PricingTiers
                                        plans={[{ tiers: activeProduct.costByTier }]}
                                        unit={activeProduct.billingData.unit}
                                        type={'product_analytics'}
                                        showSubtotal
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg m-0">Person profiles (charged on identified events)</h4>
                            <p className="text-sm mb-1">
                                Person profiles are charged for events that are associated with identified users. Your
                                first 1 million person profile events are free.
                            </p>
                            {identifiedUsed.length > 0 && (
                                <p className="opacity-70 m-0 text-sm">
                                    <strong>Used for:</strong>{' '}
                                    {identifiedUsed.map((type) => getLabelByType(type)).join(', ')}
                                </p>
                            )}
                            <div className="overflow-auto -mx-4 px-4 md:mx-0 md:px-0">
                                <div className="p-1 min-w-[500px] md:min-w-auto border border-input rounded-md mt-2">
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
                </div>
            )}
            <div className="mt-4 border-t border-primary -mb-3">
                <Addons
                    activeProduct={activeProduct}
                    addons={addons}
                    setAddons={setAddons}
                    volume={totalProductAnalyticsVolume || 0}
                    analyticsData={analyticsData}
                    hideHeading
                />
            </div>
        </div>
    )
}
