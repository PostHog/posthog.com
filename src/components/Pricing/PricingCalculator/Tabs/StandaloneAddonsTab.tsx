import React, { useEffect, useMemo, useState } from 'react'
import { IconInfo, IconX } from '@posthog/icons'
import { calculatePrice } from '../../PricingSlider/pricingSliderLogic'
import { PricingTiers } from '../../Plans'
import { afterFirstFree, pluralizeUnit, unitWhenNotInLabel } from '../../utils'
import { calculateAddonPrice, getAddonInputs, getAddonMonths, getParentMeteredVolume } from '../calculatorLogic'
import UsageSliderRow, { UsageSliderHeader } from '../UsageSliderRow'
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

const isDataPipelines = (product) =>
    product?.categoryName === 'Data pipelines' || product?.handle === 'realtime_destinations'

export default function StandaloneAddonsTab({ activeProduct, setVolume, setProduct }) {
    const [mainVolume, setMainVolume] = useState(activeProduct.volume || 0)
    const [mainCost, setMainCost] = useState(0)
    const [showBreakdown, setShowBreakdown] = useState(false)
    const [mainCostByTier, setMainCostByTier] = useState([])
    const [triggerEventsModalOpen, setTriggerEventsModalOpen] = useState(false)

    const [addonData, setAddonData] = useState(() => {
        const inputs = getAddonInputs(activeProduct.addonSliders || [], activeProduct.addons)
        return activeProduct.addonSliders?.map((addon) => ({ ...inputs[addon.key], cost: 0, costByTier: [] })) || []
    })

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

    const totalCost = mainCost + addonData.reduce((sum, addon) => sum + addon.cost, 0)

    // Add-ons like Logs custom retention meter their volume through the main product's tiers too
    // (the add-on price is only the premium), so the main product is billed on the combined volume.
    const parentMeteredAddonVolume = getParentMeteredVolume(
        addonBillingData,
        Object.fromEntries(addonBillingData.map((addon, index) => [addon.key, addonData[index]]))
    )
    const billedMainVolume = mainVolume + parentMeteredAddonVolume

    useEffect(() => {
        if (mainBillingTiers) {
            const { total, costByTier } = calculatePrice(billedMainVolume, mainBillingTiers)
            setMainCost(total)
            setMainCostByTier(costByTier)
        }
    }, [billedMainVolume, mainBillingTiers])

    // Retention-style add-ons bill each GB again for every month you keep it (`multiplier`)
    const priceAddon = (index, input) => {
        const addon = addonBillingData[index]
        if (!addon?.billingTiers || !(input.volume > 0)) return { ...input, cost: 0, costByTier: [] }
        const { total, costByTier } = calculateAddonPrice(addon.billingTiers, input, addon.multiplier)
        return { ...input, cost: total, costByTier }
    }

    useEffect(() => {
        setAddonData((prev) => prev.map((addon, index) => priceAddon(index, addon)))
    }, [addonBillingData])

    const addonVolumes = addonData.map((addon) => `${addon.volume}x${addon.months ?? 1}`).join(',')
    useEffect(() => {
        if (mainBillingTiers) {
            const { costByTier } = calculatePrice(billedMainVolume, mainBillingTiers)
            setProduct(activeProduct.handle, {
                cost: totalCost,
                volume: mainVolume,
                addons: Object.fromEntries(
                    addonBillingData.map((addon, index) => [
                        addon.key,
                        {
                            volume: addonData[index].volume,
                            ...(addon.multiplier && { months: addonData[index].months }),
                        },
                    ])
                ),
                costByTier,
            })
        }
        // Omit setProduct: it is a new function every render and would retrigger this
        // effect, rebuild addonBillingData, and race a just-clicked volume.
    }, [totalCost, mainVolume, billedMainVolume, mainBillingTiers, activeProduct.handle, addonVolumes])

    // Cost is derived from billedMainVolume in the effect above — the cost SliderRow reports only
    // covers its own volume, which undercounts when an add-on meters through the main product.
    const handleMainVolumeChange = (volume) => {
        setMainVolume(volume)
    }

    const handleAddonVolumeChange = (index) => (volume) => {
        setAddonData((prev) => prev.map((addon, i) => (i === index ? priceAddon(index, { ...addon, volume }) : addon)))
    }

    const handleAddonMonthsChange = (index) => (months) => {
        const multiplier = addonBillingData[index]?.multiplier
        setAddonData((prev) =>
            prev.map((addon, i) =>
                i === index ? priceAddon(index, { ...addon, months: getAddonMonths(multiplier, months) }) : addon
            )
        )
    }

    const mainUnitLabel = pluralizeUnit(activeProduct.billingData.unit, 2)
    const mainStartsAt = firstPaidUnitAmount(mainBillingTiers)
    const mainFree = activeProduct.freeLimit || activeProduct.slider.min

    return (
        <div className="@container mb-4">
            <TriggerEventsModal onClose={() => setTriggerEventsModalOpen(false)} isVisible={triggerEventsModalOpen} />
            {isDataPipelines(activeProduct) && (
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
                    label={activeProduct.productVariantName || mainUnitLabel}
                    subtitle={
                        mainStartsAt
                            ? `$${mainStartsAt} each${afterFirstFree(
                                  mainFree,
                                  activeProduct.billingData.unit,
                                  activeProduct.productVariantName || mainUnitLabel
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
                {addonBillingData.map((addon, index) => {
                    if (!addon.billingTiers) return null
                    const price = firstPaidUnitAmount(addon.billingTiers)
                    const free = addon.freeAllocation ?? addon.sliderConfig.min
                    const unit = addon.unit || activeProduct.billingData.unit
                    // Billing sets `no_billing_limit` when billing limits stop capping the add-on
                    const info = [
                        addon.note || addon.pricingDescription,
                        addon.billingData?.no_billing_limit === true && addon.noBillingLimitNote,
                    ]
                        .filter(Boolean)
                        .join(' ')
                    const { multiplier } = addon
                    return (
                        <React.Fragment key={addon.key}>
                            <UsageSliderRow
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
                                        ? multiplier
                                            ? `$${price} per ${unit} for each ${multiplier.unit} kept`
                                            : `$${price} each${
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
                            {multiplier && (
                                <UsageSliderRow
                                    label={`${multiplier.unit}s kept`}
                                    subtitle={`Up to ${multiplier.max} ${multiplier.unit}s`}
                                    value={addonData[index]?.months ?? multiplier.initial}
                                    onChange={handleAddonMonthsChange(index)}
                                    marks={multiplier.marks}
                                    min={1}
                                    max={multiplier.max}
                                />
                            )}
                        </React.Fragment>
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
                            <h4 className="text-lg m-0">{activeProduct.productVariantName || activeProduct.name}</h4>
                            <p className="opacity-70 m-0 text-sm mb-2">
                                <strong>{billedMainVolume.toLocaleString()}</strong>{' '}
                                {pluralizeUnit(activeProduct.billingData.unit, billedMainVolume)}
                                {parentMeteredAddonVolume > 0 && (
                                    <>
                                        {' '}
                                        (includes{' '}
                                        {addonBillingData
                                            .filter(
                                                (addon, index) =>
                                                    addon.countsTowardParentVolume && addonData[index]?.volume > 0
                                            )
                                            .map((addon) => addon.label.toLowerCase())
                                            .join(', ')}{' '}
                                        volume)
                                    </>
                                )}
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

                        {addonBillingData.map(
                            (addon: any, index: number) =>
                                addon.billingTiers &&
                                addonData[index]?.volume > 0 && (
                                    <div key={addon.key}>
                                        <h4 className="text-lg m-0">{addon.label}</h4>
                                        <p className="opacity-70 m-0 text-sm mb-2">
                                            <strong>{addonData[index].volume.toLocaleString()}</strong>{' '}
                                            {pluralizeUnit(addon.unit, addonData[index].volume)}
                                            {addon.multiplier && (
                                                <>
                                                    {' '}
                                                    kept for <strong>{addonData[index].months}</strong>{' '}
                                                    {pluralizeUnit(addon.multiplier.unit, addonData[index].months)}
                                                </>
                                            )}
                                        </p>
                                        <div className="overflow-auto -mx-4 px-4 md:mx-0 md:px-0">
                                            <div className="p-1 min-w-[500px] md:min-w-auto border border-input rounded-md mt-2">
                                                <PricingTiers
                                                    plans={[{ tiers: addonData[index].costByTier }]}
                                                    // Retention tiers apply to GB-months: GB kept × months kept
                                                    unit={
                                                        addon.multiplier
                                                            ? `${addon.unit}-${addon.multiplier.unit}`
                                                            : addon.unit
                                                    }
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
