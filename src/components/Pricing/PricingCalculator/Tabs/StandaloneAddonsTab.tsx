import React, { useEffect, useMemo, useState } from 'react'
import { IconLightBulb, IconX } from '@posthog/icons'
import { LogSlider, inverseCurve, sliderCurve } from '../../PricingSlider/Slider'
import { calculatePrice, formatUSD } from '../../PricingSlider/pricingSliderLogic'
import { PricingTiers } from '../../Plans'
import { NumericFormat } from 'react-number-format'
import AutosizeInput from 'react-input-autosize'
import pluralizeWord from 'pluralize'
import { COMPUTE_RAM_DIVISOR, HOURS_PER_MONTH } from '../../../../constants/pricing'

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

const SliderRow = ({
    label = '',
    sliderConfig,
    volume,
    setVolume,
    unit,
    cost,
    billingTiers,
    freeAllocation,
    freeAllocationText,
    volumeAnnotation,
}) => {
    const [currentVolume, setCurrentVolume] = useState(volume)

    useEffect(() => {
        if (billingTiers) {
            const calculatedCost = calculatePrice(currentVolume, billingTiers).total
            setVolume(currentVolume, calculatedCost)
        }
    }, [currentVolume, billingTiers])

    const handleVolumeChange = (newVolume) => {
        const roundedVolume = Math.round(newVolume)
        setCurrentVolume(roundedVolume)

        if (billingTiers) {
            const calculatedCost = calculatePrice(roundedVolume, billingTiers).total
            setVolume(roundedVolume, calculatedCost)
        }
    }

    return (
        <div className="grid grid-cols-8 mb-4">
            <div className="col-span-6">
                <p className="mb-2">
                    <NumericFormat
                        inputClassName={numericInputClassName}
                        value={currentVolume}
                        thousandSeparator=","
                        onValueChange={({ floatValue }) => handleVolumeChange(floatValue)}
                        customInput={AutosizeInput}
                    />{' '}
                    <span className="opacity-70 text-sm">{label}s/month</span>
                </p>
                {volumeAnnotation && (
                    <p className="mb-2 -mt-1 text-sm text-primary/60 dark:text-primary-dark/60">
                        {volumeAnnotation(currentVolume)}
                    </p>
                )}
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
            {(freeAllocation || freeAllocationText) && (
                <div className="col-span-full pr-1.5 mt-10 md:mt-8 pb-4 flex gap-1 items-center">
                    <IconLightBulb className="size-5 inline-block text-[#4f9032] dark:text-green relative -top-px" />
                    <span className="text-sm text-[#4f9032] dark:text-green font-semibold">
                        {freeAllocationText ? (
                            freeAllocationText
                        ) : (
                            <>
                                First {Math.round(freeAllocation).toLocaleString()}{' '}
                                {pluralizeWord(unit, Math.round(freeAllocation))} free –&nbsp;
                                <em>every month!</em>
                            </>
                        )}
                    </span>
                </div>
            )}
        </div>
    )
}

// Shared styling for the calculator's numeric inputs (slider rows + worker configurator).
const numericInputClassName =
    'bg-transparent text-center focus:ring-0 focus:border-red dark:focus:border-yellow focus:bg-white dark:focus:bg-accent-dark font-code max-w-[103px] text-sm border border-light hover:border-button dark:border-dark rounded-sm py-1 px-0 min-w-[25px] px-1'

// Fallbacks if a product config omits fields — one merge, not per-field `??`s scattered below.
// managed_data_warehouse.tsx's computeConfigurator is the authoritative source for MDW.
const COMPUTE_CONFIGURATOR_DEFAULTS = {
    ramDivisor: COMPUTE_RAM_DIVISOR,
    presets: [] as { vcpu: number; memory: number }[],
    defaultVcpu: 8,
    defaultMemory: 16,
    defaultHours: 100,
    maxVcpu: 96,
    maxMemory: 384,
    hoursMarks: [1, 24, 168, HOURS_PER_MONTH],
    maxHours: HOURS_PER_MONTH,
}

// Compute isn't a single slider: cost = the worker you run (vCPU + memory) × how long. This lets you
// pick/size a worker + hours, derives compute-hours = (vCPU + memory/ramDivisor) × hours, and prices
// them with the same billing tiers as everything else — so the rate + free tier come from billing.
const WorkerConfigurator = ({ config: configProp, billingTiers, setVolume, persistedState, onStateChange }) => {
    const config = { ...COMPUTE_CONFIGURATOR_DEFAULTS, ...configProp }
    const ramDivisor = config.ramDivisor
    // Seed from the state persisted on the product: the calculator remounts this component on every
    // tab switch (TabContent is keyed by product type), and without restoring the inputs the mount
    // effect below would reset the user's worker back to the defaults.
    const [vcpu, setVcpu] = useState(persistedState?.vcpu ?? config.defaultVcpu)
    const [memory, setMemory] = useState(persistedState?.memory ?? config.defaultMemory)
    const [hours, setHours] = useState(persistedState?.hours ?? config.defaultHours)

    useEffect(() => {
        onStateChange?.({ vcpu, memory, hours })
    }, [vcpu, memory, hours])

    // $/compute-hour from the live billing tiers (first paid tier) — single source of truth for the
    // rate, so the worker $/hr and the cost can't drift from what billing charges.
    const perUnitRate = useMemo(() => {
        const paid = (billingTiers || []).find((t) => parseFloat(t.unit_amount_usd) > 0)
        return paid ? parseFloat(paid.unit_amount_usd) : 0
    }, [billingTiers])
    const freeUnits = useMemo(() => {
        const free = (billingTiers || []).find((t) => parseFloat(t.unit_amount_usd) === 0)
        return free?.up_to ?? 0
    }, [billingTiers])

    const computeUnits = (vcpu || 0) + (memory || 0) / ramDivisor // compute-hours per connected hour
    const workerRatePerHour = computeUnits * perUnitRate
    const monthlyComputeHours = Math.round(computeUnits * (hours || 0))
    const cost = billingTiers ? calculatePrice(monthlyComputeHours, billingTiers).total : 0

    useEffect(() => {
        if (billingTiers) {
            setVolume(monthlyComputeHours, cost)
        }
    }, [monthlyComputeHours, billingTiers])

    const isPreset = (p) => p.vcpu === vcpu && p.memory === memory

    return (
        <div className="mb-2">
            <div className="flex flex-wrap gap-2 mb-3">
                {config.presets?.map((p) => (
                    <button
                        key={`${p.vcpu}-${p.memory}`}
                        onClick={() => {
                            setVcpu(p.vcpu)
                            setMemory(p.memory)
                        }}
                        className={`text-sm px-3 py-1 rounded-sm border ${
                            isPreset(p)
                                ? 'border-red dark:border-yellow bg-red/10 dark:bg-yellow/10 font-semibold'
                                : 'border-light dark:border-dark hover:border-button'
                        }`}
                    >
                        {p.vcpu} vCPU · {p.memory} GB
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-8 gap-2 items-end mb-1">
                <div className="col-span-3">
                    <label className="text-sm opacity-70 block mb-1">vCPU</label>
                    <NumericFormat
                        inputClassName={numericInputClassName}
                        value={vcpu}
                        allowNegative={false}
                        thousandSeparator=","
                        onValueChange={({ floatValue }) => setVcpu(Math.min(config.maxVcpu, floatValue || 0))}
                        customInput={AutosizeInput}
                    />
                </div>
                <div className="col-span-3">
                    <label className="text-sm opacity-70 block mb-1">Memory (GB)</label>
                    <NumericFormat
                        inputClassName={numericInputClassName}
                        value={memory}
                        allowNegative={false}
                        thousandSeparator=","
                        onValueChange={({ floatValue }) => setMemory(Math.min(config.maxMemory, floatValue || 0))}
                        customInput={AutosizeInput}
                    />
                </div>
                <div className="col-span-2 text-right pr-3">
                    <p className="font-semibold mb-0">{formatUSD(cost)}</p>
                    <p className="text-xs opacity-60 mb-0">/month</p>
                </div>
            </div>

            <p className="mb-3 text-sm text-primary/60 dark:text-primary-dark/60">
                Worker ≈ <strong>{formatUSD(workerRatePerHour)}/hour</strong> while connected →{' '}
                {monthlyComputeHours.toLocaleString()} compute-hours/month
            </p>

            <div className="mb-2">
                <p className="mb-2">
                    <NumericFormat
                        inputClassName={numericInputClassName}
                        value={hours}
                        allowNegative={false}
                        thousandSeparator=","
                        onValueChange={({ floatValue }) => setHours(Math.min(config.maxHours, floatValue || 0))}
                        customInput={AutosizeInput}
                    />{' '}
                    <span className="opacity-70 text-sm">hours/month connected</span>
                </p>
                <div className="pr-1.5">
                    <LogSlider
                        stepsInRange={100}
                        marks={config.hoursMarks}
                        min={1}
                        max={config.maxHours}
                        onChange={(value) => setHours(Math.round(sliderCurve(value)))}
                        value={inverseCurve(hours)}
                    />
                </div>
            </div>

            {freeUnits > 0 && (
                <div className="pr-1.5 mt-10 md:mt-8 pb-4 flex gap-1 items-center">
                    <IconLightBulb className="size-5 inline-block text-[#4f9032] dark:text-green relative -top-px" />
                    <span className="text-sm text-[#4f9032] dark:text-green font-semibold">
                        First {Math.round(freeUnits).toLocaleString()} compute-hours free every month.
                    </span>
                </div>
            )}
        </div>
    )
}

const isDataPipelines = (product) =>
    product?.categoryName === 'Data pipelines' || product?.handle === 'realtime_destinations'

export default function StandaloneAddonsTab({ activeProduct, setVolume, setProduct }) {
    const [mainVolume, setMainVolume] = useState(activeProduct.volume || 0)
    const [mainCost, setMainCost] = useState(0)
    const [showBreakdown, setShowBreakdown] = useState(false)
    const [mainCostByTier, setMainCostByTier] = useState([])
    const [triggerEventsModalOpen, setTriggerEventsModalOpen] = useState(false)

    const [addonData, setAddonData] = useState(
        () =>
            activeProduct.addonSliders?.map((addon, index) => ({
                // Prefer the persisted volume so addon sliders (e.g. storage) survive tab
                // switches, like the worker configurator's persisted state.
                volume: activeProduct.addonVolumes?.[index] ?? (addon.volume || 0),
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

    const totalCost = mainCost + addonData.reduce((sum, addon) => sum + addon.cost, 0)

    useEffect(() => {
        if (mainBillingTiers) {
            const { total, costByTier } = calculatePrice(mainVolume, mainBillingTiers)
            setMainCost(total)
            setMainCostByTier(costByTier)
        }
    }, [mainVolume, mainBillingTiers])

    useEffect(() => {
        const updatedAddonData = addonData.map((addon, index) => {
            const addonBilling = addonBillingData[index]
            if (addonBilling?.billingTiers && addon.volume > 0) {
                const { total, costByTier } = calculatePrice(addon.volume, addonBilling.billingTiers)
                return { ...addon, cost: total, costByTier }
            }
            return { ...addon, cost: 0, costByTier: [] }
        })
        setAddonData(updatedAddonData)
    }, [addonBillingData])

    useEffect(() => {
        if (mainBillingTiers) {
            const { costByTier } = calculatePrice(mainVolume, mainBillingTiers)
            setProduct(activeProduct.handle, {
                cost: totalCost,
                volume: mainVolume,
                costByTier,
                addonVolumes: addonData.map((addon) => addon.volume),
            })
        }
    }, [totalCost, mainVolume, mainBillingTiers, activeProduct.handle, setProduct, addonData])

    const handleMainVolumeChange = (volume, cost) => {
        setMainVolume(volume)
        setMainCost(cost)
    }

    const handleAddonVolumeChange = (index) => (volume, cost) => {
        setAddonData((prev) => prev.map((addon, i) => (i === index ? { ...addon, volume, cost } : addon)))
    }

    return (
        <div className="mb-4">
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
            <div className="mb-4">
                <h4 className="mb-3 text-base font-semibold">
                    {activeProduct.productVariantName || activeProduct.name}
                </h4>
                {activeProduct.computeConfigurator ? (
                    <WorkerConfigurator
                        config={activeProduct.computeConfigurator}
                        billingTiers={mainBillingTiers}
                        setVolume={handleMainVolumeChange}
                        persistedState={activeProduct.configuratorState}
                        onStateChange={(state) => setProduct(activeProduct.handle, { configuratorState: state })}
                    />
                ) : (
                    <SliderRow
                        label={activeProduct.billingData.unit}
                        sliderConfig={activeProduct.slider}
                        volume={mainVolume}
                        setVolume={handleMainVolumeChange}
                        unit={activeProduct.billingData.unit}
                        cost={mainCost}
                        billingTiers={mainBillingTiers}
                        freeAllocation={activeProduct.slider.min}
                        freeAllocationText={activeProduct.freeAllocationText}
                    />
                )}
            </div>

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
                                freeAllocation={
                                    addon.freeAllocation !== undefined ? addon.freeAllocation : addon.sliderConfig.min
                                }
                                freeAllocationText={addon.freeAllocationText}
                                volumeAnnotation={addon.volumeAnnotation}
                            />
                        </div>
                    )
            )}

            <div className="grid grid-cols-6 gap-x-8 pt-4 mt-4 border-t border-primary">
                <div className="col-span-full flex justify-between items-center">
                    <div>
                        <h3 className="m-0 text-base">Cost subtotal</h3>
                        <button
                            onClick={() => setShowBreakdown(!showBreakdown)}
                            className="text-red dark:text-yellow font-semibold text-sm"
                        >
                            {showBreakdown ? 'Hide' : 'See'} how we calculate this
                        </button>
                    </div>
                    <div className="pr-3">
                        <strong>{formatUSD(totalCost)}</strong>
                    </div>
                </div>

                {showBreakdown && (
                    <div className="col-span-full p-4 mt-4 rounded border border-primary bg-white dark:bg-accent-dark relative">
                        <button
                            onClick={() => setShowBreakdown(false)}
                            className="absolute top-4 right-4 text-muted hover:text-primary"
                        >
                            <IconX className="size-5" />
                        </button>
                        <h4 className="mb-1">How pricing is calculated</h4>
                        <p className="text-sm font-normal mb-2">
                            Each product is billed separately with usage-based tiers. Pricing gets cheaper as your
                            volume increases.
                        </p>
                        <p className="my-4 font-bold border-t border-primary pt-4">
                            Here's how your estimate breaks down:
                        </p>
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-lg m-0">
                                    {activeProduct.productVariantName || activeProduct.name}
                                </h4>
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

                            {addonBillingData.map(
                                (addon: any, index: number) =>
                                    addon.billingTiers &&
                                    addonData[index]?.volume > 0 && (
                                        <div key={addon.key}>
                                            <h4 className="text-lg m-0">{addon.label}</h4>
                                            <p className="opacity-70 m-0 text-sm mb-2">
                                                <strong>{addonData[index].volume.toLocaleString()}</strong> {addon.unit}
                                                s
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
    )
}
