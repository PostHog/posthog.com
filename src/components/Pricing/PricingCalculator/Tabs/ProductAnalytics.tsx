import { IconCheck, IconInfo, IconX } from '@posthog/icons'
import Checkbox from 'components/Checkbox'
import { PricingTiers } from 'components/Pricing/Plans'
import { NonLinearSlider, nonLinearCurve, reverseNonLinearCurve } from 'components/Pricing/PricingSlider/Slider'
import { calculatePrice, formatUSD } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import React, { useEffect, useMemo, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { CallToAction } from 'components/CallToAction'
import AutosizeInput from 'react-input-autosize'
import qs from 'qs'
import Tooltip from 'components/Tooltip'
import { StaticImage } from 'gatsby-plugin-image'

const getTotalAnalyticsVolume = (analyticsData: any) => {
    return Object.keys(analyticsData).reduce((acc, key) => acc + analyticsData[key].volume, 0)
}

const getTotalAnalyticsCost = (analyticsData: any) => {
    return Object.keys(analyticsData).reduce((acc, key) => acc + analyticsData[key].cost, 0)
}

export const getTotalEnhancedPersonsVolume = (analyticsData: any) => {
    return Object.keys(analyticsData).reduce(
        (acc, key) => acc + (analyticsData[key].enhanced ? analyticsData[key].volume : 0),
        0
    )
}

export const analyticsSliders = [
    {
        label: 'Website analytics',
        types: [{ type: 'websiteAnalyticsEvents', label: 'Anonymous events' }],
        checked: true,
    },
    {
        label: 'Product analytics',
        types: [{ type: 'productAnalyticsEvents', label: 'Identified events', enhanced: true }],
        checked: true,
    },
    {
        label: 'Mobile app',
        types: [
            { type: 'mobileAppAnonymousEvents', label: 'Anonymous events' },
            { type: 'mobileAppAuthenticatedEvents', label: 'Identified events', enhanced: true },
        ],
    },
    {
        label: 'LLM events',
        types: [
            { type: 'llmAnonymousEvents', label: 'Anonymous events' },
            { type: 'llmAuthenticatedEvents', label: 'Identified events', enhanced: true },
        ],
    },
    {
        label: 'API events',
        types: [
            { type: 'apiAnonymousEvents', label: 'Anonymous events' },
            { type: 'apiAuthenticatedEvents', label: 'Identified events', enhanced: true },
        ],
    },
    {
        label: 'Other events',
        types: [
            { type: 'otherAnonymousEvents', label: 'Anonymous events' },
            { type: 'otherAuthenticatedEvents', label: 'Identified events', enhanced: true },
        ],
    },
]

const getLabelByType = (key) => {
    const slider = analyticsSliders.find((slider) => slider.types.some((type) => type.type === key))
    const type = slider?.types.find((type) => type.type === key)
    return slider?.types.length > 1
        ? `${slider.label.replace('events', '')} ${type.enhanced ? 'identified' : 'anonymous'} events`
        : slider.label
}

const Modal = ({ onClose, isVisible }) => {
    return (
        <>
            <div
                className={`bg-accent-dark/50 fixed h-screen left-0 right-0 top-0 bg-opacity-40 flex justify-center items-center ${
                    !isVisible ? 'hidden' : 'z-[1000000]'
                }`}
                onClick={() => onClose()}
            ></div>
            <div
                className={`max-w-full z-[1000001] fixed left-4 md:left-8 right-4 md:right-8 rounded-tl md:rounded-tl-lg rounded-tr md:rounded-tr-lg flex flex-col bg-white dark:bg-accent-dark transition-all duration-300 ease-out
          ${isVisible ? '!opacity-100 top-4' : 'opacity-0 top-[100vh]'}`}
            >
                <div className="w-full h-fit flex justify-between p-4 border-b border-light dark:border-dark">
                    <span className="font-bold text-xl">Event types, explained</span>

                    <button onClick={() => onClose()}>
                        <IconX className="size-5" />
                    </button>
                </div>

                <div className="max-h-[calc(100vh_-_1rem_-_60px_-_122px)] md:max-h-[calc(100vh_-_1rem_-_60px)] overflow-y-auto px-4 py-4 md:pb-8">
                    {/* <h3 className="mb-2 text-lg">Save money if you don't need user properties</h3>
                    <p className="font-semibold opacity-70 text-[15px]">(Custom user properties more expensive to process)</p>
                    <p className="mb-2">The more data we store about users, the higher the cost. So the less data you need, the more you can save.</p> */}

                    <p className="mb-8 text-[15px]">
                        Events are billed at different rates based on volume and if you choose to send custom user
                        properties with the event.
                    </p>

                    <section className="grid md:grid-cols-5 gap-6 md:gap-12 pb-12">
                        <div className="col-span-1 md:col-span-2 md:flex justify-center">
                            <h3 className="mb-4 md:hidden">Anonymous events</h3>
                            <div className="max-w-md">
                                <StaticImage
                                    src="./event-anonymous.png"
                                    alt="Anonymous event example"
                                    className=""
                                    placeholder="blurred"
                                />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3 max-w-xl">
                            <h3 className="hidden md:block mb-1">Anonymous events</h3>
                            <p className="opacity-70 mb-3">
                                No individually-identifiable info, analyzed in aggregate, don't use person profiles
                            </p>
                            <p className="mb-2">
                                By default, events are anonymous, meaning they don't have any personally-identifiable
                                information attached to them.
                            </p>
                            <p className="mb-2">
                                They come with info about the browser and device, visitor's location, and any UTM
                                parameters.
                            </p>

                            <h4 className="text-base">With anonymous events, you can:</h4>
                            <ul className="list-none pl-0 mb-6 space-y-1">
                                <li className="relative pl-8">
                                    <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                                    See a Google Analytics-style dashboard
                                </li>
                                <li className="relative pl-8">
                                    <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                                    Access properties like UTMs, location, referrer, page views
                                </li>
                                <li className="relative pl-8">
                                    <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                                    <p className="mb-0">
                                        Create{' '}
                                        <strong>
                                            <em>aggregate</em>
                                        </strong>{' '}
                                        insights in <strong>Product analytics</strong>
                                    </p>
                                    <ul className="[&_li]:text-sm opacity-70 pl-4 pt-1">
                                        <li>How many times users click an element on a page</li>
                                        <li>Group visitors by device type or location</li>
                                        <li>Filter to interactions on a specific page</li>
                                        <li>Track anonymous users across sessions</li>
                                    </ul>
                                </li>
                            </ul>

                            <p className="m-0 text-sm opacity-70">Pricing starts at </p>
                            <p className="m-0">
                                <strong>$0.00005</strong>
                                <span className="opacity-70 text-sm">/event</span>
                            </p>
                            <p className="text-green m-0 text-sm font-semibold">First 1 million events/mo free</p>
                        </div>
                    </section>

                    <section className="grid md:grid-cols-5 gap-6 md:gap-12 pb-4">
                        <div className="col-span-1 md:col-span-2 md:flex justify-center">
                            <h3 className="mb-4 md:hidden">Identified events</h3>
                            <div className="max-w-md">
                                <StaticImage
                                    src="./event-identified.png"
                                    alt="Identified event example"
                                    placeholder="blurred"
                                />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3 max-w-xl">
                            <h3 className="hidden md:block mb-1">Identified events</h3>
                            <p className="opacity-70 mb-3">
                                Track usage of specific, logged in users by using person profiles.
                            </p>
                            <p className="mb-2">
                                Indentify users by their email address or other unique identifier, and attach custom
                                properties to their person profiles.
                            </p>

                            <h4 className="text-base">In addition to anonymous event capabilities, you can:</h4>
                            <ul className="list-none pl-0 mb-6 space-y-1">
                                <li className="relative pl-8">
                                    <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                                    <p className="mb-0">Merge anonymous users with their eventual identified user</p>
                                    <ul className="[&_li]:text-sm opacity-70 pl-2 pt-1 list-none">
                                        <li>
                                            Like when they sign up for your product or use different devices - enables
                                            analyzing the user's path
                                        </li>
                                    </ul>
                                </li>
                                <li className="relative pl-8">
                                    <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                                    <p className="mb-0">Store custom properties on users</p>
                                    <ul className="[&_li]:text-sm opacity-70 pl-2 pt-1 list-none">
                                        <li>
                                            Use these properties in cohorts, session replay, experiments, and feature
                                            flags
                                        </li>
                                    </ul>
                                </li>

                                <li className="relative pl-8">
                                    <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                                    <p className="mb-0">
                                        Create{' '}
                                        <strong>
                                            <em>user-specific</em>
                                        </strong>{' '}
                                        insights in <strong>Product analytics</strong>
                                    </p>
                                    <ul className="[&_li]:text-sm opacity-70 pl-4 pt-1">
                                        <li>
                                            How many times <em>specific users</em> click an element on a page
                                        </li>
                                        <li>
                                            Group <em>cohorts of users</em> by device type, location, or property
                                        </li>
                                        <li>
                                            Filter to interactions on a specific page <em>by specific users</em>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <div className="flex gap-8">
                                <div>
                                    <p className="m-0 text-sm opacity-70">Pricing starts at </p>
                                    <p className="m-0">
                                        <strong>$0.00005</strong>
                                        <span className="opacity-70 text-sm">/event</span>
                                    </p>
                                </div>
                                <div className="text-2xl font-bold pt-3">+</div>
                                <div className="flex-1">
                                    <p className="m-0 text-sm opacity-70">Person profile add-on</p>
                                    <p className="m-0">
                                        <strong>$0.000198</strong>
                                        <span className="opacity-70 text-sm">/event</span>
                                    </p>
                                    <p className="text-green m-0 text-sm font-semibold">
                                        First 1 million events/mo free
                                    </p>
                                </div>
                            </div>

                            <h4 className="mt-4 pt-4 border-t border-light dark:border-dark mb-0">Further reading</h4>
                            <p className="mb-0">Learn more about configuring person profiles in the docs.</p>

                            <CallToAction href="/docs/data/persons" size="sm" className="mt-4" external>
                                Read the docs
                            </CallToAction>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

const AnalyticsSlider = ({ marks, min, max, className = '', label, onChange, value, enhanced = '', setModalOpen }) => {
    return (
        <div className={`${className} relative ${label ? (enhanced ? 'pt-12 md:pt-7' : 'pt-7') : ''}`}>
            {label && (
                <p className="m-0 text-sm absolute left-8 top-0">
                    {label}{' '}
                    {enhanced ? (
                        <span className="text-primary/70 dark:text-primary-dark/70">
                            <Tooltip
                                content={() => (
                                    <div className="max-w-[250px]">
                                        <p className="text-sm mb-2">
                                            Typically used for authenticated users where you know their email address or
                                            want to send custom properties
                                        </p>
                                        <p className="text-sm mb-0">
                                            <button
                                                onClick={() => setModalOpen(true)}
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
                        <span className="text-primary/70 dark:text-primary-dark/70"></span>
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

const SliderToggle = ({
    label = '',
    types,
    activeProduct,
    setAnalyticsVolume,
    analyticsData,
    setModalOpen,
    ...other
}) => {
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
                                        className="col-span-4 lg:col-span-5 pl-8"
                                        label={label}
                                        enhanced={analyticsData[type].enhanced}
                                        setModalOpen={setModalOpen}
                                    />
                                    <div className="col-span-2 lg:col-span-1 text-right font-bold m-0 self-end -mb-1.5 flex justify-end">
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

export default function ProductAnalyticsTab({ activeProduct, setProduct, analyticsData, setAnalyticsData }) {
    const [showBreakdown, setShowBreakdown] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const productAnalyticsTiers = useMemo(() => activeProduct?.billingData.plans.find((plan) => plan.tiers).tiers, [])
    const enhancedPersonsAddonTiers = useMemo(
        () =>
            activeProduct?.billingData.addons
                .find((addon) => addon.type === 'enhanced_persons')
                .plans.find((plan) => plan.tiers).tiers,
        []
    )
    const totalProductAnalyticsVolume = getTotalAnalyticsVolume(analyticsData)
    const totalProductAnalyticsPrice = calculatePrice(totalProductAnalyticsVolume, productAnalyticsTiers).total
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
        <>
            <Modal onClose={() => setModalOpen(false)} isVisible={modalOpen} />
            <div className="mb-4 pr-3">
                <div className="border border-green bg-green/25 px-3 py-2 rounded italic mb-4 text-sm">
                    First 1,000,000 events free – every month!
                </div>
                <div className="grid grid-cols-6 gap-8 items-end mb-2">
                    <h3 className="col-span-4 lg:col-span-5 m-0 text-base">
                        Event usage{' '}
                        <button
                            onClick={() => setModalOpen(true)}
                            className="text-red dark:text-yellow font-semibold text-sm"
                        >
                            explain event types
                        </button>
                    </h3>
                    <p className="col-span-2 lg:col-span-1 m-0 text-right opacity-70 text-sm">Events/mo</p>
                </div>

                {analyticsSliders.map((slider) => (
                    <SliderToggle
                        key={slider.label}
                        analyticsData={analyticsData}
                        setAnalyticsVolume={setAnalyticsVolume}
                        activeProduct={activeProduct}
                        setModalOpen={setModalOpen}
                        {...slider}
                    />
                ))}
                <div className="grid grid-cols-6 gap-x-8 mt-4 py-2 border-y border-light dark:border-dark">
                    <div className="col-span-full md:col-span-3 flex justify-between">
                        <div className="flex justify-between w-full md:block">
                            <h3 className="m-0 text-base">Event cost subtotal</h3>
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
                    </div>
                    <div className="mt-1 md:mt-0 col-span-full w-full md:col-span-3 grid grid-cols-3 justify-self-end items-center gap-1">
                        <div className="text-right min-w-16 text-xl col-span-3">
                            <strong>{formatUSD(totalProductAnalyticsPrice + enhancedPersonsCost.total)}</strong>
                        </div>
                    </div>

                    {showBreakdown && (
                        <div className="col-span-full p-4 mt-4 rounded border border-light dark:border-dark bg-white dark:bg-accent-dark relative">
                            <div className="absolute top-4 right-4">
                                <button
                                    onClick={() => setShowBreakdown(false)}
                                    className="text-primary/50 hover:text-primary/100 dark:text-primary-dark/50 dark:hover:text-primary-dark/100"
                                >
                                    <IconX className="size-5 inline-block" />
                                </button>
                            </div>
                            <h4 className="mb-1">How event pricing is calculated</h4>
                            <p className="text-sm font-normal mb-2">
                                All events are billed at a single base rate. Events for users who have been identified
                                or have custom properties stored on them are charged an additional rate called Person
                                profiles.
                            </p>
                            <p className="my-4 font-bold border-t border-light dark:border-dark pt-4">
                                Here's how your estimate breaks down:
                            </p>
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
                                        <div className="p-1 min-w-[500px] md:min-w-auto border border-border dark:border-dark rounded-md mt-2">
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
                                        Person profiles are charged for events that are associated with identified
                                        users. Your first 1 million person profile events are free.
                                    </p>
                                    {identifiedUsed.length > 0 && (
                                        <p className="opacity-70 m-0 text-sm">
                                            <strong>Used for:</strong>{' '}
                                            {identifiedUsed.map((type) => getLabelByType(type)).join(', ')}
                                        </p>
                                    )}
                                    <div className="overflow-auto -mx-4 px-4 md:mx-0 md:px-0">
                                        <div className="p-1 min-w-[500px] md:min-w-auto border border-border dark:border-dark rounded-md mt-2">
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
            </div>
        </>
    )
}
