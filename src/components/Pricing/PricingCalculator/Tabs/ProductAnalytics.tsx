import { IconInfo } from '@posthog/icons'
import { PricingTiers } from 'components/Pricing/Plans'
import { calculatePrice } from 'components/Pricing/PricingCalculator/calculatorLogic'
import React, { useEffect, useMemo, useState } from 'react'
import qs from 'qs'
import Tooltip from 'components/Tooltip'
import { Addons } from '../Tabbed'
import UsageSliderRow, { UsageSliderHeader } from '../UsageSliderRow'
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

const IDENTIFIED_TYPE = 'productAnalyticsEvents'
const ANONYMOUS_TYPE = 'websiteAnalyticsEvents'

const SIZE_PRESETS = [
    { id: 'side_project', label: 'Side project', identified: 200_000, anonymous: 800_000 },
    { id: 'startup', label: 'Startup', identified: 3_000_000, anonymous: 1_000_000 },
    { id: 'scale_up', label: 'High volume', identified: 15_000_000, anonymous: 4_000_000 },
    { id: 'custom', label: 'Custom' },
]

const DEFAULT_SIZE_PRESET = SIZE_PRESETS[0]

export const getDefaultAnalyticsData = () =>
    analyticsSliders.reduce((acc, slider) => {
        slider.types.forEach(({ type, enhanced }) => {
            acc[type] = {
                volume: enhanced ? DEFAULT_SIZE_PRESET.identified : DEFAULT_SIZE_PRESET.anonymous,
                cost: 0,
                enhanced: enhanced || false,
            }
        })
        return acc
    }, {})

const presetIdForVolumes = (data) =>
    SIZE_PRESETS.find(
        (preset) =>
            preset.identified === data[IDENTIFIED_TYPE]?.volume && preset.anonymous === data[ANONYMOUS_TYPE]?.volume
    )?.id ?? 'custom'

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

const firstPaidUnitAmount = (tiers) => tiers?.find((tier) => parseFloat(tier.unit_amount_usd) > 0)?.unit_amount_usd

const getLabelByType = (key) => {
    const slider = analyticsSliders.find((slider) => slider.types.some((type) => type.type === key))
    const type = slider?.types.find((type) => type.type === key)
    return slider?.types.length > 1
        ? `${slider.label.replace('events', '')} ${type.enhanced ? 'identified' : 'anonymous'} events`
        : slider.label
}

const EventTypeInfo = ({ enhanced }) => {
    const { addWindow } = useApp()

    const openEventTypes = () => {
        addWindow(
            (
                <EventTypesModal location={{ pathname: EVENT_TYPES_MODAL_KEY }} key={EVENT_TYPES_MODAL_KEY} newWindow />
            ) as any
        )
    }

    return (
        <span className="text-secondary">
            <Tooltip
                content={() => (
                    <div className="max-w-[250px]">
                        <p className="text-sm mb-2">
                            {enhanced
                                ? 'Typically used for authenticated users where you know their email address or want to send custom properties'
                                : "No individually-identifiable info, analyzed in aggregate. These don't use person profiles."}
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
    )
}

const SliderToggle = ({
    types,
    activeProduct,
    setAnalyticsVolume,
    analyticsData,
    anonymousUnitPrice,
    identifiedUnitPrice,
}) => {
    return (
        <>
            {types.map(({ type, label }) => {
                const unitPrice = analyticsData[type].enhanced ? identifiedUnitPrice : anonymousUnitPrice
                return (
                    <UsageSliderRow
                        key={type}
                        label={label}
                        labelAccessory={<EventTypeInfo enhanced={analyticsData[type].enhanced} />}
                        subtitle={unitPrice ? `$${unitPrice} each after the first 1M` : undefined}
                        value={analyticsData[type].volume}
                        onChange={(value) => setAnalyticsVolume(type, value)}
                        marks={activeProduct.slider.marks}
                        min={0}
                        max={activeProduct.slider.max}
                        curve="nonlinear"
                    />
                )
            })}
        </>
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
    const [sizePreset, setSizePreset] = useState(() => presetIdForVolumes(analyticsData))
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
    const anonymousUnitPrice = firstPaidUnitAmount(productAnalyticsTiers)
    const identifiedUnitPrice = firstPaidUnitAmount(enhancedPersonsAddonTiers)

    const anonymousUsed = Object.keys(analyticsData).filter((key) => analyticsData[key].volume > 0)
    const identifiedUsed = Object.keys(analyticsData).filter(
        (key) => analyticsData[key].enhanced && analyticsData[key].volume > 0
    )

    const priceAnalyticsData = (data) => {
        const totalProductAnalyticsVolume = getTotalAnalyticsVolume(data)
        const totalCost = calculatePrice(totalProductAnalyticsVolume, productAnalyticsTiers).total
        const totalEnhancedPersonsVolume = getTotalEnhancedPersonsVolume(data)
        const totalEnhancedPersonsCost = calculatePrice(totalEnhancedPersonsVolume, enhancedPersonsAddonTiers).total
        const priced = {}
        Object.keys(data).forEach((key) => {
            const volume = data[key].volume
            const percentageOfTotalVolume = (volume / totalProductAnalyticsVolume) * 100
            let cost = (percentageOfTotalVolume / 100) * totalCost
            if (data[key].enhanced) {
                const percentageOfEnhancedPersonsVolume = (volume / totalEnhancedPersonsVolume) * 100
                cost += (percentageOfEnhancedPersonsVolume / 100) * totalEnhancedPersonsCost
            }
            priced[key] = { ...data[key], cost: cost || 0 }
        })
        return priced
    }

    const setAnalyticsVolume = (type: string, volume: number) => {
        setSizePreset('custom')
        setAnalyticsData((data) =>
            priceAnalyticsData({
                ...data,
                [type]: {
                    ...data[type],
                    volume: Math.round(volume || 0),
                },
            })
        )
    }

    const applySizePreset = (id: string) => {
        setSizePreset(id)
        const preset = SIZE_PRESETS.find((item) => item.id === id)
        if (!preset || id === 'custom') return
        setAnalyticsData((data) =>
            priceAnalyticsData({
                ...data,
                [IDENTIFIED_TYPE]: { ...data[IDENTIFIED_TYPE], volume: preset.identified },
                [ANONYMOUS_TYPE]: { ...data[ANONYMOUS_TYPE], volume: preset.anonymous },
            })
        )
    }

    useEffect(() => {
        const totalAnalyticsCost = getTotalAnalyticsCost(analyticsData)
        const totalAnalyticsVolume = getTotalAnalyticsVolume(analyticsData)
        const { costByTier } = calculatePrice(totalAnalyticsVolume, productAnalyticsTiers)
        setProduct('product_analytics', { cost: totalAnalyticsCost, volume: totalAnalyticsVolume, costByTier })
    }, [analyticsData])

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const volumes = qs.parse(urlParams.toString())
        if (volumes['product_analytics']?.types) {
            Object.keys(volumes['product_analytics'].types).forEach((subtype) => {
                const volume = volumes['product_analytics'].types[subtype]?.volume
                if (volume) {
                    setAnalyticsVolume(subtype, Number(volume))
                }
            })
            return
        }
        setAnalyticsData((data) => priceAnalyticsData(data))
    }, [])

    return (
        <div className="@container">
            <div className="flex flex-wrap items-center gap-2 pb-4">
                <span className="text-sm text-secondary">Roughly your size</span>
                <div className="flex flex-wrap">
                    {SIZE_PRESETS.map(({ id, label }) => {
                        const selected = sizePreset === id
                        return (
                            <button
                                key={id}
                                type="button"
                                onClick={() => applySizePreset(id)}
                                className={`px-2 py-0.5 text-sm rounded-md border border-transparent ${
                                    selected ? 'bg-accent font-bold border-primary' : ''
                                }`}
                            >
                                {label}
                            </button>
                        )
                    })}
                </div>
            </div>
            <UsageSliderHeader unit="Events" />
            <div className="divide-y divide-primary border-t border-primary">
                {analyticsSliders.map((slider) => (
                    <SliderToggle
                        key={slider.label}
                        analyticsData={analyticsData}
                        setAnalyticsVolume={setAnalyticsVolume}
                        activeProduct={activeProduct}
                        anonymousUnitPrice={anonymousUnitPrice}
                        identifiedUnitPrice={identifiedUnitPrice}
                        {...slider}
                    />
                ))}
                <Addons
                    activeProduct={activeProduct}
                    addons={addons}
                    setAddons={setAddons}
                    volume={totalProductAnalyticsVolume || 0}
                    analyticsData={analyticsData}
                    hideHeading
                />
            </div>
            <div className="pr-1.5 pt-3 border-t border-primary">
                <span className="text-sm text-secondary">
                    The first 1M events are free, every month.{' '}
                    <button
                        onClick={() => setShowBreakdown(!showBreakdown)}
                        className="text-red dark:text-yellow font-semibold underline"
                    >
                        {showBreakdown ? 'Hide how we calculate this' : 'See how we calculate this'}
                    </button>
                </span>
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
        </div>
    )
}
