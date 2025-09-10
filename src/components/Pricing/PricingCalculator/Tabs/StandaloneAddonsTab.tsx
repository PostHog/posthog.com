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
    const [addonVolume, setAddonVolume] = useState(activeProduct.addonSliders?.[0]?.volume || 0)
    const [addonCost, setAddonCost] = useState(0)
    const [showBreakdown, setShowBreakdown] = useState(false)
    const [mainCostByTier, setMainCostByTier] = useState([])
    const [addonCostByTier, setAddonCostByTier] = useState([])

    const mainBillingTiers = useMemo(() => activeProduct?.billingData.plans.find((plan) => plan.tiers)?.tiers, [])

    const addonSlider = activeProduct.addonSliders?.[0]
    const addonBillingData = activeProduct.billingData.addons?.find((addon) => addon.type === addonSlider?.key)
    const addonBillingTiers = useMemo(() => addonBillingData?.plans.find((plan) => plan.tiers)?.tiers, [])

    const totalCost = mainCost + addonCost

    useEffect(() => {
        if (mainBillingTiers) {
            const { total, costByTier } = calculatePrice(mainVolume, mainBillingTiers)
            setMainCost(total)
            setMainCostByTier(costByTier)
        }
    }, [mainVolume, mainBillingTiers])

    useEffect(() => {
        if (addonBillingTiers && addonVolume > 0) {
            const { total, costByTier } = calculatePrice(addonVolume, addonBillingTiers)
            setAddonCost(total)
            setAddonCostByTier(costByTier)
        }
    }, [addonVolume, addonBillingTiers])

    useEffect(() => {
        const { costByTier: mainCostByTier } = calculatePrice(mainVolume, mainBillingTiers)
        setProduct(activeProduct.handle, {
            cost: totalCost,
            volume: mainVolume,
            costByTier: mainCostByTier,
        })
    }, [totalCost, mainVolume, addonVolume, mainBillingTiers])

    const handleMainVolumeChange = (volume, cost) => {
        setMainVolume(volume)
        setMainCost(cost)
    }

    const handleAddonVolumeChange = (volume, cost) => {
        setAddonVolume(volume)
        setAddonCost(cost)
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

                {/* Addon Slider */}
                {addonSlider && addonBillingTiers && (
                    <div className="mb-4">
                        <h4 className="mb-3 text-base font-semibold">{addonSlider.label}</h4>
                        <SliderRow
                            label={addonSlider.unit}
                            sliderConfig={addonSlider.sliderConfig}
                            volume={addonVolume}
                            setVolume={handleAddonVolumeChange}
                            unit={addonSlider.unit}
                            cost={addonCost}
                            billingTiers={addonBillingTiers}
                            freeAllocation={addonSlider.freeAllocation}
                        />
                    </div>
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
                        <div>
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

                                {/* Addon Breakdown */}
                                {addonSlider && addonVolume > 0 && (
                                    <div>
                                        <h4 className="text-lg m-0">{addonSlider.label}</h4>
                                        <p className="opacity-70 m-0 text-sm mb-2">
                                            <strong>{addonVolume.toLocaleString()}</strong> {addonSlider.unit}s
                                        </p>
                                        <div className="overflow-auto -mx-4 px-4 md:mx-0 md:px-0">
                                            <div className="p-1 min-w-[500px] md:min-w-auto border border-input rounded-md mt-2">
                                                <PricingTiers
                                                    plans={[{ tiers: addonCostByTier }]}
                                                    unit={addonSlider.unit}
                                                    type={addonSlider.key}
                                                    showSubtotal
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
