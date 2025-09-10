import React, { useEffect, useMemo, useState } from 'react'
import { IconInfo, IconLightBulb, IconX } from '@posthog/icons'
import Checkbox from 'components/Checkbox'
import { LogSlider, inverseCurve, sliderCurve } from '../../PricingSlider/Slider'
import { calculatePrice, formatUSD } from '../../PricingSlider/pricingSliderLogic'
import { PricingTiers } from '../../Plans'
import { NumericFormat } from 'react-number-format'
import AutosizeInput from 'react-input-autosize'
import Tooltip from 'components/Tooltip'

const SliderRow = ({ label = '', sliderConfig, volume, setVolume, unit, cost, billingTiers, freeAllocation }) => {
    const [currentVolume, setCurrentVolume] = useState(volume)

    useEffect(() => {
        if (billingTiers) {
            const calculatedCost = calculatePrice(currentVolume, billingTiers).total
            setVolume(currentVolume, calculatedCost)
        }
    }, [currentVolume, billingTiers])

    const handleVolumeChange = (newVolume) => {
        setCurrentVolume(Math.round(newVolume))
    }

    return (
        <div className="grid grid-cols-8 mb-4">
            <div className="col-span-6">
                <p className="mb-2">
                    <NumericFormat
                        inputClassName="bg-transparent text-center focus:ring-0 focus:border-red dark:focus:border-yellow focus:bg-white dark:focus:bg-accent-dark font-code max-w-[103px] text-sm border border-light hover:border-button dark:border-dark rounded-sm py-1 px-0 min-w-[25px] px-1"
                        value={currentVolume}
                        thousandSeparator=","
                        onValueChange={({ floatValue }) => handleVolumeChange(floatValue)}
                        customInput={AutosizeInput}
                    />{' '}
                    <span className="opacity-70 text-sm">{label}s/month</span>
                </p>
            </div>
            <div className="col-span-2 text-right pr-3">
                <p className="font-semibold mb-0">{formatUSD(cost)}</p>
            </div>
            <div className="col-span-full pr-1.5">
                <LogSlider
                    stepsInRange={100}
                    marks={sliderConfig.marks}
                    min={sliderConfig.min}
                    max={sliderConfig.max}
                    onChange={(value) => handleVolumeChange(Math.round(sliderCurve(value)))}
                    value={inverseCurve(currentVolume)}
                />
            </div>
            {freeAllocation && (
                <div className="col-span-full pr-1.5 mt-10 md:mt-8 pb-4 flex gap-1 items-center">
                    <IconLightBulb className="size-5 inline-block text-[#4f9032] dark:text-green relative -top-px" />
                    <span className="text-sm text-[#4f9032] dark:text-green font-semibold">
                        First {Math.round(freeAllocation).toLocaleString()} {unit}s free –&nbsp;
                        <em>every month!</em>
                    </span>
                </div>
            )}
        </div>
    )
}

export default function StandaloneAddonsTab({ activeProduct, setVolume, setProduct }) {
    const [mainVolume, setMainVolume] = useState(activeProduct.volume || 0)
    const [mainCost, setMainCost] = useState(0)
    const [showBreakdown, setShowBreakdown] = useState(false)
    const [mainCostByTier, setMainCostByTier] = useState([])

    // Initialize addon state for all addons
    const [addonData, setAddonData] = useState(
        () =>
            activeProduct.addonSliders?.map((addon) => ({
                volume: addon.volume || 0,
                cost: 0,
                costByTier: [],
            })) || []
    )

    const mainBillingTiers = useMemo(() => activeProduct?.billingData.plans.find((plan) => plan.tiers)?.tiers, [])

    // Get billing data for all addons
    const addonBillingData = useMemo(
        () =>
            activeProduct.addonSliders?.map((addon) => ({
                ...addon,
                billingData: activeProduct.billingData.addons?.find((billingAddon) => billingAddon.type === addon.key),
                billingTiers: activeProduct.billingData.addons
                    ?.find((billingAddon) => billingAddon.type === addon.key)
                    ?.plans.find((plan) => plan.tiers)?.tiers,
            })) || [],
        []
    )

    const totalCost = mainCost + addonData.reduce((sum, addon) => sum + addon.cost, 0)

    useEffect(() => {
        if (mainBillingTiers) {
            const { total, costByTier } = calculatePrice(mainVolume, mainBillingTiers)
            setMainCost(total)
            setMainCostByTier(costByTier)
        }
    }, [mainVolume, mainBillingTiers])

    useEffect(() => {
        // Update costs for all addons
        const updatedAddonData = addonData.map((addon, index) => {
            const addonBilling = addonBillingData[index]
            if (addonBilling?.billingTiers && addon.volume > 0) {
                const { total, costByTier } = calculatePrice(addon.volume, addonBilling.billingTiers)
                return { ...addon, cost: total, costByTier }
            }
            return { ...addon, cost: 0, costByTier: [] }
        })
        setAddonData(updatedAddonData)
    }, [addonData.map((a) => a.volume).join(','), addonBillingData])

    useEffect(() => {
        const { costByTier: mainCostByTier } = calculatePrice(mainVolume, mainBillingTiers)
        setProduct(activeProduct.handle, {
            cost: totalCost,
            volume: mainVolume,
            costByTier: mainCostByTier,
        })
    }, [totalCost, mainVolume, addonData, mainBillingTiers])

    const handleMainVolumeChange = (volume, cost) => {
        setMainVolume(volume)
        setMainCost(cost)
    }

    const handleAddonVolumeChange = (index) => (volume, cost) => {
        setAddonData((prev) => prev.map((addon, i) => (i === index ? { ...addon, volume, cost } : addon)))
    }

    return (
        <>
            <div className="mb-4">
                {/* Main Product Slider */}
                <div className="mb-4">
                    <h4 className="mb-3 text-base font-semibold">{activeProduct.name}</h4>
                    <SliderRow
                        label={activeProduct.billingData.unit}
                        sliderConfig={activeProduct.slider}
                        volume={mainVolume}
                        setVolume={handleMainVolumeChange}
                        unit={activeProduct.billingData.unit}
                        cost={mainCost}
                        billingTiers={mainBillingTiers}
                        freeAllocation={activeProduct.slider.min}
                    />
                </div>

                {/* Addon Sliders */}
                {addonBillingData.map(
                    (addon, index) =>
                        addon.billingTiers && (
                            <div key={addon.key} className="mb-4">
                                <h4 className="mb-3 text-base font-semibold">{addon.label}</h4>
                                <SliderRow
                                    label={addon.unit}
                                    sliderConfig={addon.sliderConfig}
                                    volume={addonData[index]?.volume || 0}
                                    setVolume={handleAddonVolumeChange(index)}
                                    unit={addon.unit}
                                    cost={addonData[index]?.cost || 0}
                                    billingTiers={addon.billingTiers}
                                    freeAllocation={addon.freeAllocation}
                                />
                            </div>
                        )
                )}

                <div className="grid grid-cols-6 gap-x-8 pt-4 mt-4 border-t border-primary">
                    <div className="col-span-full flex justify-between items-center">
                        <div>
                            <h3 className="m-0 text-base">Cost subtotal</h3>
                            {showBreakdown ? (
                                <button
                                    onClick={() => setShowBreakdown(false)}
                                    className="text-red dark:text-yellow font-semibold text-sm"
                                >
                                    Hide how we calculate this
                                </button>
                            ) : (
                                <button
                                    onClick={() => setShowBreakdown(true)}
                                    className="text-red dark:text-yellow font-semibold text-sm"
                                >
                                    See how we calculate this
                                </button>
                            )}
                        </div>
                        <div className="pr-3">
                            <strong>{formatUSD(totalCost)}</strong>
                        </div>
                    </div>

                    {showBreakdown && (
                        <div className="col-span-full p-4 mt-4 rounded border border-primary bg-white dark:bg-accent-dark relative">
                            <div className="absolute top-4 right-4">
                                <button
                                    onClick={() => setShowBreakdown(false)}
                                    className="text-muted hover:text-primary"
                                >
                                    <IconX className="size-5 inline-block" />
                                </button>
                            </div>
                            <h4 className="mb-1">How pricing is calculated</h4>
                            <p className="text-sm font-normal mb-2">
                                Each product is billed separately with usage-based tiers. Pricing gets cheaper as your
                                volume increases.
                            </p>
                            <p className="my-4 font-bold border-t border-primary pt-4">
                                Here's how your estimate breaks down:
                            </p>
                            <div className="space-y-8">
                                {/* Main Product Breakdown */}
                                <div>
                                    <h4 className="text-lg m-0">{activeProduct.name}</h4>
                                    <p className="opacity-70 m-0 text-sm mb-2">
                                        <strong>{mainVolume.toLocaleString()}</strong> {activeProduct.billingData.unit}s
                                    </p>
                                    <div className="overflow-auto -mx-4 px-4 md:mx-0 md:px-0">
                                        <div className="p-1 min-w-[500px] md:min-w-auto border border-input rounded-md mt-2">
                                            <PricingTiers
                                                plans={[{ tiers: mainCostByTier }]}
                                                unit={activeProduct.billingData.unit}
                                                type={activeProduct.handle}
                                                showSubtotal
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Addon Breakdowns */}
                                {addonBillingData.map(
                                    (addon, index) =>
                                        addon.billingTiers &&
                                        addonData[index]?.volume > 0 && (
                                            <div key={addon.key}>
                                                <h4 className="text-lg m-0">{addon.label}</h4>
                                                <p className="opacity-70 m-0 text-sm mb-2">
                                                    <strong>{addonData[index].volume.toLocaleString()}</strong>{' '}
                                                    {addon.unit}s
                                                </p>
                                                <div className="overflow-auto -mx-4 px-4 md:mx-0 md:px-0">
                                                    <div className="p-1 min-w-[500px] md:min-w-auto border border-input rounded-md mt-2">
                                                        <PricingTiers
                                                            plans={[{ tiers: addonData[index].costByTier }]}
                                                            unit={addon.unit}
                                                            type={addon.key}
                                                            showSubtotal
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
