import React, { useEffect, useMemo, useState } from 'react'
import { IconInfo, IconX } from '@posthog/icons'
import { calculatePrice } from '../../PricingSlider/pricingSliderLogic'
import { PricingTiers } from '../../Plans'
import { afterFirstFree, pluralizeUnit, unitWhenNotInLabel } from '../../utils'
import { calculateRetentionPrice, getRetentionMonths } from '../calculatorLogic'
import UsageSliderRow, { UsageSliderHeader } from '../UsageSliderRow'
import { RetentionMonthsInput, RetentionSlider, retentionInputUnit } from '../RetentionControls'
import Tooltip from 'components/Tooltip'

const TriggerEventsModal = ({ onClose, isVisible }) => {
    return (
        <>
            <div
                className={`bg-accent-dark/50 fixed h-screen left-0 right-0 top-0 bg-opacity-40 flex justify-center items-center ${
                    !isVisible ? 'hidden' : 'z-[1000000]'
                }`}
                onClick={() => onClose()}
            />
            <div
                className={`max-w-full z-[1000001] fixed left-4 md:left-8 right-4 md:right-8 rounded-tl md:rounded-tl-lg rounded-tr md:rounded-tr-lg flex flex-col bg-white dark:bg-accent-dark transition-all duration-300 ease-out
          ${isVisible ? '!opacity-100 top-4' : 'opacity-0 top-[100vh]'}`}
            >
                <div className="w-full h-fit flex justify-between p-4 border-b border-primary">
                    <span className="font-bold text-xl">Trigger events, explained</span>
                    <button onClick={() => onClose()}>
                        <IconX className="size-5" />
                    </button>
                </div>
                <div className="max-h-[calc(100vh_-_1rem_-_60px_-_122px)] md:max-h-[calc(100vh_-_1rem_-_60px)] overflow-y-auto px-4 py-4 md:pb-8">
                    <p className="mb-4 text-[15px]">
                        Trigger Events are the events that actually kick off destinations in your pipelines.
                    </p>
                    <p className="text-[15px]">
                        As an example lets say a <em>sign up event</em> is the trigger for 5 different slack
                        destinations you have configured. Every time a sign up event is processed, it will trigger 5
                        different slack messages but you will be charged only once not five times. The sign up event is
                        a trigger event in this case.
                    </p>
                </div>
            </div>
        </>
    )
}

const firstPaidUnitAmount = (tiers) => tiers?.find((tier) => parseFloat(tier.unit_amount_usd) > 0)?.unit_amount_usd

const isDestinations = (product) => product?.handle === 'realtime_destinations'

export default function StandaloneAddonsTab({ activeProduct, setVolume, setProduct }) {
    const [mainVolume, setMainVolume] = useState(activeProduct.volume || 0)
    const [mainCost, setMainCost] = useState(0)
    const [showBreakdown, setShowBreakdown] = useState(false)
    const [mainCostByTier, setMainCostByTier] = useState([])
    const [triggerEventsModalOpen, setTriggerEventsModalOpen] = useState(false)

    const [addonData, setAddonData] = useState(
        () =>
            activeProduct.addonSliders?.map((addon) => ({
                volume: activeProduct.addons?.[addon.key]?.volume ?? addon.volume ?? addon.sliderConfig?.min ?? 0,
                cost: 0,
                costByTier: [],
            })) || []
    )

    const mainBillingTiers = useMemo(
        () => activeProduct?.billingData.plans.find((plan) => plan.tiers)?.tiers,
        [activeProduct]
    )

    const addonBillingData = useMemo(
        () =>
            activeProduct.addonSliders?.map((addon) => {
                const billingAddon = activeProduct.billingData.addons?.find((ba) => ba.type === addon.key)
                return {
                    ...addon,
                    billingData: billingAddon,
                    billingTiers: billingAddon?.plans.find((plan) => plan.tiers)?.tiers,
                }
            }) || [],
        [activeProduct]
    )

    // Retention (Logs) bills every GB ingested again for each month kept, so it follows the main volume
    const { retention } = activeProduct
    const [retentionMonths, setRetentionMonths] = useState(() =>
        retention ? getRetentionMonths(retention, activeProduct.retentionMonths) : 0
    )
    const retentionBilling = retention && activeProduct.billingData.addons?.find((ba) => ba.type === retention.key)
    const retentionTiers = retentionBilling?.plans.find((plan) => plan.tiers)?.tiers
    const retentionPrice = calculateRetentionPrice(retentionTiers, mainVolume, retentionMonths)

    const totalCost = mainCost + retentionPrice.total + addonData.reduce((sum, addon) => sum + addon.cost, 0)

    useEffect(() => {
        if (mainBillingTiers) {
            const { total, costByTier } = calculatePrice(mainVolume, mainBillingTiers)
            setMainCost(total)
            setMainCostByTier(costByTier)
        }
    }, [mainVolume, mainBillingTiers])

    useEffect(() => {
        setAddonData((prev) =>
            prev.map((addon, index) => {
                const addonBilling = addonBillingData[index]
                if (addonBilling?.billingTiers && addon.volume > 0) {
                    const { total, costByTier } = calculatePrice(addon.volume, addonBilling.billingTiers)
                    return { ...addon, cost: total, costByTier }
                }
                return { ...addon, cost: 0, costByTier: [] }
            })
        )
    }, [addonBillingData])

    const addonVolumes = addonData.map((addon) => addon.volume).join(',')
    useEffect(() => {
        if (mainBillingTiers) {
            const { costByTier } = calculatePrice(mainVolume, mainBillingTiers)
            setProduct(activeProduct.handle, {
                cost: totalCost,
                volume: mainVolume,
                addons: Object.fromEntries(
                    addonBillingData.map((addon, index) => [addon.key, { volume: addonData[index].volume }])
                ),
                ...(retention && { retentionMonths }),
                costByTier,
            })
        }
        // Omit setProduct: it is a new function every render and would retrigger this
        // effect, rebuild addonBillingData, and race a just-clicked volume.
    }, [totalCost, mainVolume, mainBillingTiers, activeProduct.handle, addonVolumes, retentionMonths])

    const handleMainVolumeChange = (volume) => {
        setMainVolume(volume)
    }

    const handleAddonVolumeChange = (index) => (volume) => {
        const tiers = addonBillingData[index]?.billingTiers
        const cost = tiers && volume > 0 ? calculatePrice(volume, tiers).total : 0
        setAddonData((prev) => prev.map((addon, i) => (i === index ? { ...addon, volume, cost } : addon)))
    }

    const mainUnitLabel = pluralizeUnit(activeProduct.billingData.unit, 2)
    // With a retention input the volume is every GB ingested, so it gets its own label
    const volumeLabel = retention?.volumeLabel || activeProduct.productVariantName
    const retentionUnitPrice = firstPaidUnitAmount(retentionTiers)
    const retentionInfo = [retention?.note, retentionBilling?.no_billing_limit === true && retention.noBillingLimitNote]
        .filter(Boolean)
        .join(' ')
    const mainStartsAt = firstPaidUnitAmount(mainBillingTiers)
    const mainFree = activeProduct.freeLimit || activeProduct.slider.min

    return (
        <div className="@container mb-4">
            <TriggerEventsModal onClose={() => setTriggerEventsModalOpen(false)} isVisible={triggerEventsModalOpen} />
            {isDestinations(activeProduct) && (
                <div className="border border-green bg-green/25 px-3 py-2 rounded italic mb-4 text-sm">
                    Trigger Events are the events that actually kick off destinations in your pipelines (
                    <button
                        onClick={() => setTriggerEventsModalOpen(true)}
                        className="text-red dark:text-yellow font-semibold text-sm not-italic"
                    >
                        see explanation
                    </button>
                    ).
                </div>
            )}
            <UsageSliderHeader unit={mainUnitLabel} />
            <div className="divide-y divide-primary border-t border-primary">
                <UsageSliderRow
                    label={volumeLabel || mainUnitLabel}
                    subtitle={
                        mainStartsAt
                            ? `$${mainStartsAt} each${afterFirstFree(
                                  mainFree,
                                  activeProduct.billingData.unit,
                                  volumeLabel || mainUnitLabel
                              )}`
                            : undefined
                    }
                    value={mainVolume}
                    onChange={handleMainVolumeChange}
                    marks={activeProduct.slider.marks}
                    min={0}
                    max={activeProduct.slider.max}
                    scaleMin={activeProduct.slider.scaleMin}
                />
                {retention && retentionTiers && (
                    <div className="flex items-center gap-4 pt-3 pb-9">
                        <div className="w-48 shrink-0">
                            <div className="flex items-center gap-1 mb-0.5">
                                <p className="m-0 text-sm font-bold">{retention.label}</p>
                                {retentionInfo && (
                                    <Tooltip content={retentionInfo} tooltipClassName="max-w-[250px]" placement="top">
                                        <span className="relative inline-block">
                                            <IconInfo className="size-4 opacity-70 inline-block" />
                                        </span>
                                    </Tooltip>
                                )}
                            </div>
                            {retentionUnitPrice && (
                                <p className="m-0 text-xs text-secondary">
                                    ${retentionUnitPrice} per {activeProduct.billingData.unit} for each month kept
                                </p>
                            )}
                        </div>
                        {/* Laid out like UsageSliderRow: the slider hides on narrow screens, the input stays */}
                        <div className="hidden @md:flex flex-1 justify-end min-w-0">
                            <div className="w-full @md:w-3/4 pb-5">
                                <RetentionSlider
                                    retention={retention}
                                    value={retentionMonths}
                                    onChange={setRetentionMonths}
                                />
                            </div>
                        </div>
                        {/* As wide as the volume inputs, so both sliders line up; the unit hangs below the input */}
                        <div className="relative ml-auto shrink-0">
                            <RetentionMonthsInput
                                retention={retention}
                                value={retentionMonths}
                                onChange={setRetentionMonths}
                                className="w-14 bg-transparent text-center font-bold text-sm border border-light dark:border-dark rounded-md py-1 px-1.5 focus:ring-0 focus:border-red dark:focus:border-yellow focus:bg-white dark:focus:bg-accent-dark"
                            />
                            <span className="absolute left-1/2 top-full -translate-x-1/2 mt-1 w-20 text-center text-xs leading-tight text-secondary">
                                {retentionInputUnit(retention, retentionMonths)}
                            </span>
                        </div>
                    </div>
                )}
                {addonBillingData.map((addon, index) => {
                    if (!addon.billingTiers) return null
                    const price = firstPaidUnitAmount(addon.billingTiers)
                    const free = addon.freeAllocation ?? addon.sliderConfig.min
                    const unit = addon.unit || activeProduct.billingData.unit
                    const info = addon.note || addon.pricingDescription
                    return (
                        <UsageSliderRow
                            key={addon.key}
                            label={addon.label}
                            labelAccessory={
                                info ? (
                                    <Tooltip content={info} tooltipClassName="max-w-[250px]" placement="top">
                                        <span className="relative inline-block">
                                            <IconInfo className="size-4 opacity-70 inline-block" />
                                        </span>
                                    </Tooltip>
                                ) : null
                            }
                            subtitle={
                                price
                                    ? `$${price} each${
                                          free
                                              ? afterFirstFree(free, unit, addon.label)
                                              : unitWhenNotInLabel(unit, addon.label)
                                      }`
                                    : undefined
                            }
                            value={addonData[index]?.volume || 0}
                            onChange={handleAddonVolumeChange(index)}
                            marks={addon.sliderConfig.marks}
                            min={0}
                            max={addon.sliderConfig.max}
                            scaleMin={addon.sliderConfig.scaleMin}
                        />
                    )
                })}
            </div>
            <div className="pr-1.5 pt-3 border-t border-primary">
                <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="text-sm text-red dark:text-yellow font-semibold underline"
                >
                    {showBreakdown ? 'Hide breakdown' : 'Show breakdown'}
                </button>
            </div>

            {showBreakdown && (
                <div className="p-4 mt-4 rounded border border-primary bg-white dark:bg-accent-dark relative">
                    <button
                        onClick={() => setShowBreakdown(false)}
                        className="absolute top-4 right-4 text-muted hover:text-primary"
                    >
                        <IconX className="size-5" />
                    </button>
                    <h4 className="mb-1">How pricing is calculated</h4>
                    <p className="text-sm font-normal mb-2">
                        Each product is billed separately with usage-based tiers. Pricing gets cheaper as your volume
                        increases.
                    </p>
                    <p className="my-4 font-bold border-t border-primary pt-4">Here's how your estimate breaks down:</p>
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-lg m-0">
                                {volumeLabel || activeProduct.categoryName || activeProduct.name}
                            </h4>
                            <p className="opacity-70 m-0 text-sm mb-2">
                                <strong>{mainVolume.toLocaleString()}</strong>{' '}
                                {pluralizeUnit(activeProduct.billingData.unit, mainVolume)}
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

                        {retention && retentionMonths > 0 && retentionTiers && (
                            <div>
                                <h4 className="text-lg m-0">{retention.label}</h4>
                                <p className="opacity-70 m-0 text-sm mb-2">
                                    <strong>{mainVolume.toLocaleString()}</strong>{' '}
                                    {pluralizeUnit(activeProduct.billingData.unit, mainVolume)} kept for{' '}
                                    <strong>{retentionMonths}</strong> {retentionMonths === 1 ? 'month' : 'months'}
                                </p>
                                <div className="overflow-auto -mx-4 px-4 md:mx-0 md:px-0">
                                    <div className="p-1 min-w-[500px] md:min-w-auto border border-input rounded-md mt-2">
                                        <PricingTiers
                                            plans={[{ tiers: retentionPrice.costByTier }]}
                                            unit={retentionBilling?.unit || `${activeProduct.billingData.unit}-month`}
                                            type={retention.key}
                                            showSubtotal
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {addonBillingData.map(
                            (addon: any, index: number) =>
                                addon.billingTiers &&
                                addonData[index]?.volume > 0 && (
                                    <div key={addon.key}>
                                        <h4 className="text-lg m-0">{addon.label}</h4>
                                        <p className="opacity-70 m-0 text-sm mb-2">
                                            <strong>{addonData[index].volume.toLocaleString()}</strong>{' '}
                                            {pluralizeUnit(addon.unit, addonData[index].volume)}
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
    )
}
