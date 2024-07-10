import { IconX } from '@posthog/icons'
import Checkbox from 'components/Checkbox'
import { PricingTiers } from 'components/Pricing/Plans'
import { NonLinearSlider, nonLinearCurve, reverseNonLinearCurve } from 'components/Pricing/PricingSlider/Slider'
import { calculatePrice, formatUSD } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import React, { useEffect, useMemo, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import AutosizeInput from 'react-input-autosize'
import qs from 'qs'

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

export const analyticsSliders = [
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
                className={`bg-accent-dark/50 fixed left-0 w-screen h-screen top-0 bg-opacity-40 flex justify-center items-center ${!isVisible ? 'hidden' : 'z-[1000000]'
                    }`}
                onClick={() => onClose()}
            ></div>
            <div
                className={`w-[500px] max-w-full h-[calc(100vh_-_123px)] md:h-screen z-[1000001] fixed overflow-y-auto top-0 flex flex-col bg-white dark:bg-accent-dark transition-all duration-500 ease-out
          ${isVisible ? '!opacity-100 right-[0px]' : 'opacity-0 right-[-500px]'}`}
            >
                <div className="w-full h-fit flex justify-between p-4 md:px-8">
                    <span className="font-bold text-xl">What are person profiles?</span>

                    <button onClick={() => onClose()}>
                        <IconX className="size-5" />
                    </button>
                </div>
                <div className="px-4 pb-4 md:px-8 md:pb-8 [&_p]:text-[15px]">
                    <p className="mb-2">
                        Person profiles let you store detailed information about a user (like an email address, plan
                        name, or custom properties). This enables a deeper level of insights that isn't available when
                        analyzing anonymous traffic (like in Google Analytics).
                    </p>
                    <p className="mb-2">
                        It also provides attribution data and lets you track users across devices and sessions.
                    </p>
                    <p className="mb-2">
                        <strong>With person profiles, you can:</strong>
                    </p>
                    <ul className="[&_li]:text-[15px] pl-4 mb-2">
                        <li>
                            View detailed person info in the{' '}
                            <Link href="https://us.posthog.com/persons" external>
                                People tab
                            </Link>
                        </li>
                        <li>
                            Merge identities across <code className="text-sm">distinct_id</code> values (i.e. merge
                            anonymous user and logged in users)
                        </li>
                        <li>Track UTMs and referrers for anonymous and identified users</li>
                        <li>Target flags, experiments, and surveys by user properties</li>
                        <li>Filter on user properties</li>
                        <li>Create cohorts</li>
                    </ul>

                    <p className="text-[15px] mb-0">
                        Person profiles are split out from standard event prices so you don't have to pay for them if
                        you don't need them.
                    </p>

                    <div className="mb-8">
                        <CallToAction href="/docs/data/persons" size="sm" className="mt-4" external>
                            Read the docs
                        </CallToAction>
                    </div>

                    <h3 className="text-xl border-b border-light dark:border-dark pb-1 mb-2">
                        Do you need events with person profiles?
                    </h3>

                    <div className="space-y-2 mb-8">
                        <details>
                            <summary className="cursor-pointer">
                                <div className="inline-flex items-center justify-between w-[95%]">
                                    <strong>"I want to store properties on anonymous users"</strong>
                                    <span>
                                        <div className="border border-green rounded px-1 py-0.5 text-green font-bold uppercase text-sm">
                                            Yes
                                        </div>
                                    </span>
                                </div>
                                <p className="text-sm text-primary/75 dark:text-primary-dark/75 pl-4 mb-0">
                                    <span className="border border-red dark:border-yellow text-xs text-red dark:text-yellow font-semibold uppercase px-1 py-0.5 rounded-sm">
                                        Most common
                                    </span>{' '}
                                    Read how to calculate this below
                                </p>
                            </summary>
                            <div className="ml-4 my-2 border border-light dark:border-dark bg-accent dark:bg-accent-dark p-2 rounded [&_p]:text-sm">
                                <p className="mb-2">
                                    <strong className="text-green">
                                        Yes, you'll use person profiles any time you provide person information to
                                        store.
                                    </strong>{' '}
                                    This will allow you to store things like site preferences (eg. dark mode) and more
                                    on non-identified users and still leverage all the benefits of person profiles.
                                </p>
                                <p className="mb-0">
                                    It also allows you to merge anonymous and identified users, so you can track the
                                    same user from the first time they visit your site through to when they sign up.
                                </p>
                            </div>
                        </details>

                        <details>
                            <summary className="cursor-pointer">
                                <div className="inline-flex items-center justify-between w-[95%]">
                                    <strong>"I only want to track website visits (like Google Analytics)"</strong>
                                    <span>
                                        <div className="border border-red rounded px-1 py-0.5 text-red font-bold uppercase text-sm">
                                            No
                                        </div>
                                    </span>
                                </div>
                                <p className="text-sm opacity-75 pl-4 mb-0">
                                    Set <em>Enhanced persons</em> to <strong>0%</strong>
                                </p>
                            </summary>
                            <div className="ml-4 my-2 border border-light dark:border-dark bg-accent dark:bg-accent-dark p-2 rounded [&_p]:text-sm">
                                <p className="mb-0">
                                    <strong>No, you don't need events with person profiles</strong> to track anonymous
                                    users. You'll get basic attribution info (like UTM source) but it can't be used to
                                    analyze things like top performing marketing channels as there's no way to know who
                                    signed up.
                                </p>
                            </div>
                        </details>

                        <details>
                            <summary className="cursor-pointer">
                                <div className="inline-flex items-center justify-between w-[95%]">
                                    <strong>"I only want to track logged in users"</strong>
                                    <span>
                                        <div className="border border-green rounded px-1 py-0.5 text-green font-bold uppercase text-sm">
                                            Yes
                                        </div>
                                    </span>
                                </div>
                                <p className="text-sm opacity-75 pl-4 mb-0">
                                    Set <em>Enhanced persons</em> to <strong>100%</strong>
                                </p>
                            </summary>
                            <div className="ml-4 my-2 border border-light dark:border-dark bg-accent dark:bg-accent-dark p-2 rounded [&_p]:text-sm">
                                <p className="mb-0">
                                    <strong className="text-green">
                                        Yes, you will use person profiles with any identified users
                                    </strong>{' '}
                                    so you can store information about the person (like an email address or internal
                                    ID).
                                </p>
                            </div>
                        </details>
                    </div>

                    <h3 className="text-xl border-b border-light dark:border-dark pb-1 mb-2">Calculating usage</h3>
                    <p className="text-[15px] mb-2">
                        If you already track website visits, the best way to gauge person profile usage is to determine
                        what percentage of event volume is <em>anonymous traffic</em> vs. identified product users.
                    </p>
                    <p className="text-[15px] mb-2">
                        If you currently use Google Analytics in conjunction with a product analytics tool, you can
                        compare the traffic volume (page views) in Google Analytics and the event volume in your product
                        anaytics solution to find what percentage of your event volume is anonymous.
                    </p>
                    <p className="text-[15px] mb-2">
                        For example, if 75% of your total event volume (between website and product) is anonymous
                        website traffic, you'll need person profiles for the remaining 25% of events.
                    </p>
                    <p className="text-[15px]">
                        Note that you'll need to adjust this ratio if you want to store custom properties on anonymous
                        users, as these require person profiles even if you don't know their email address yet.
                    </p>
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
                    {enhanced && (
                        <span className="text-primary/70 dark:text-primary-dark/70">
                            – uses{' '}
                            <button
                                onClick={() => setModalOpen(true)}
                                className="text-red dark:text-yellow font-semibold"
                            >
                                person profiles
                            </button>
                        </span>
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
                    <h3 className="col-span-4 lg:col-span-5 m-0 text-base">Event usage</h3>
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
                        <div className="col-span-2 text-sm md:text-[15px] md:text-right">
                            Anonymous events
                        </div>
                        <div className="text-right min-w-16">
                            <strong>{formatUSD(totalProductAnalyticsPrice)}</strong>
                        </div>
                        <div className="col-span-2 text-sm md:text-[15px] md:text-right">
                            Identified events
                        </div>
                        <div className="text-right min-w-16">
                            <strong>{formatUSD(enhancedPersonsCost.total)}</strong>
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
                            <p className="text-sm font-normal">
                                Events are billed at different rates based on volume and if you choose to attach a{' '}
                                <Link href="#">person profile</Link> to the event. (This allows you to send custom
                                properties like email address or plan name.)
                            </p>
                            <div className="my-4 grid divide-y divide-border dark:divide-border-dark md:grid-cols-2 gap-4 md:gap-8 border border-light dark:border-dark p-4 bg-tan dark:bg-accent-dark rounded">
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
                                <div className="pt-4 md:pt-0">
                                    <h4 className="m-0 text-base mb-0">Identified events</h4>
                                    <p className="m-0 text-sm opacity-70 italic mb-2">
                                        Base event price + person profile add-on
                                    </p>
                                    <p className="m-0 text-sm opacity-70">Starts at </p>
                                    <p className="m-0">
                                        <strong>
                                            $
                                            {
                                                activeProduct.costByTier.find((tier) => tier.unit_amount_usd !== '0')
                                                    .unit_amount_usd
                                            }
                                        </strong>
                                        <span className="opacity-70 text-sm">/event + </span>
                                        <strong>
                                            $
                                            {
                                                enhancedPersonsCost.costByTier.find(
                                                    (tier) => tier.unit_amount_usd !== '0'
                                                ).unit_amount_usd
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
                                    <h4 className="text-lg m-0">Identified events (with person profiles)</h4>
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
