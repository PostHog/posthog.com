import React, { useEffect, useMemo, useState } from 'react'
import Tooltip from 'components/Tooltip'
import { IconInfo, IconLightBulb, IconX } from '@posthog/icons'
import Toggle from 'components/Toggle'
import { calculatePrice, formatUSD, pricingSliderLogic } from '../PricingSlider/pricingSliderLogic'
import { useStaticQuery } from 'gatsby'
import { allProductsData } from '../Pricing'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import useProducts from 'hooks/useProducts'
import { LogSlider, inverseCurve, sliderCurve } from '../PricingSlider/Slider'
import { PricingTiers } from '../Plans'
import ProductAnalyticsTab from './Tabs/ProductAnalytics'

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

const Addon = ({ type, name, description, plans, addons, setAddons, volume, inclusion_only, unit }) => {
    const addon = addons.find((addon) => addon.type === type)
    const checked = addon?.checked
    const [percentage, setPercentage] = useState(50)
    useEffect(() => {
        setAddons((addons) => {
            return addons.map((addon) => {
                if (addon.type === type) {
                    return {
                        ...addon,
                        totalCost: checked
                            ? calculatePrice(
                                inclusion_only ? (percentage / 100) * volume : volume,
                                plans[plans.length - 1].tiers
                            ).total
                            : 0,
                    }
                }
                return addon
            })
        })
    }, [volume, checked, percentage])

    const handleToggle = (checked: boolean) => {
        setAddons((addons) => {
            return addons.map((addon) => {
                if (addon.type === type) {
                    return { ...addon, checked }
                }
                return addon
            })
        })
    }

    const [isVisible, updateVisible] = useState(false)

    return (
        <div className="grid grid-cols-6 gap-8 items-center">
            <div className="col-span-3 md:col-span-4 flex justify-between items-center">
                <div className="flex space-x-1 items-center">
                    <p className="m-0 text-sm font-bold">{name}</p>
                    <Tooltip content={description} tooltipClassName="max-w-[250px]" placement="top">
                        <span className="relative">
                            <IconInfo className="size-5 opacity-70" />
                        </span>
                    </Tooltip>
                </div>
                {inclusion_only && (
                    <div>
                        <p className="m-0 flex space-x-1 text-sm">
                            <span>on</span>
                            <span className="border-b border-black dark:border-white/20">
                                <input
                                    onChange={(e) => {
                                        if (!checked) {
                                            handleToggle(true)
                                        }
                                        setPercentage(e.target.value)
                                    }}
                                    type="number"
                                    min={1}
                                    max={99}
                                    className="p-0 pr-0.5 bg-tan dark:bg-dark border-none hide-number-arrows text-sm font-bold text-center -mr-0.5 focus:ring-0"
                                    value={percentage}
                                />
                                <strong>%</strong>
                            </span>
                            <span>of total {unit} volume</span>
                        </p>
                        <div>
                            <button
                                onClick={() => updateVisible(!isVisible)}
                                className="text-red dark:text-yellow font-semibold text-sm"
                            >
                                {isVisible ? 'Help me calculate this' : 'Help me calculate this'}
                            </button>
                        </div>
                        <Modal onClose={() => updateVisible(false)} isVisible={isVisible} />
                    </div>
                )}
                <Toggle checked={checked} onChange={handleToggle} />
            </div>
            <div className="col-span-2 md:col-span-1">
                <p className="m-0 text-sm opacity-70">Starts at</p>
                <strong>$@todo</strong><span className="text-sm opacity-70">/event</span>
            </div>
            <div className="text-right">
                <p className={`font-semibold m-0 pr-3 ${checked ? '' : 'opacity-50'}`}>
                    {formatUSD(checked ? addon?.totalCost : 0)}
                </p>
            </div>
        </div>
    )
}

const productTabs = {
    product_analytics: ProductAnalyticsTab,
}

const TabContent = ({ activeProduct, addons, setVolume, setAddons, setProduct }) => {
    const { type, cost, volume, billingData, slider, costByTier } = activeProduct
    const [showBreakdown, setShowBreakdown] = useState(false)

    return (
        <>
            <div>
                {productTabs[activeProduct.type]?.({ activeProduct, setVolume, setProduct }) ||
                    (activeProduct.name == 'A/B testing' ? (
                        <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded-md px-4 py-3 mb-2 text-sm">
                            A/B testing is currently bundled with Feature flags and shares a free tier and volume
                            pricing.
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-8">
                                <div className="col-span-6">
                                    <p className="mb-2">
                                        <strong>{Math.round(volume).toLocaleString()}</strong>{' '}
                                        <span className="opacity-70 text-sm">{billingData.unit}s/month</span>
                                    </p>
                                </div>
                                <div className="col-span-2 text-right pr-3">
                                    <p className="font-semibold mb-0">{formatUSD(cost)}</p>
                                </div>
                                {slider && (
                                    <div className="col-span-full pr-1.5">
                                        <LogSlider
                                            stepsInRange={100}
                                            marks={slider.marks}
                                            min={slider.min}
                                            max={slider.max}
                                            onChange={(value) => setVolume(type, sliderCurve(value))}
                                            value={inverseCurve(volume)}
                                        />
                                    </div>
                                )}
                                <div className="col-span-full pr-1.5 mt-10 md:mt-8 pb-4 flex gap-1 items-center">
                                    <IconLightBulb className="size-5 inline-block text-[#4f9032] dark:text-green relative -top-px" />
                                    <span className="text-sm text-[#4f9032] dark:text-green font-semibold">
                                        First {Math.round(slider.min).toLocaleString()} {billingData.unit}s free –&nbsp;
                                        <em>every month!</em>
                                    </span>
                                </div>
                            </div>
                            {costByTier && (
                                <>
                                    {!showBreakdown && (
                                        <button
                                            onClick={() => setShowBreakdown(true)}
                                            className="text-red dark:text-yellow font-bold"
                                        >
                                            Show breakdown
                                        </button>
                                    )}
                                    {showBreakdown && (
                                        <div className="mb-4 p-1 border border-border dark:border-dark rounded-md">
                                            <PricingTiers
                                                plans={[{ tiers: costByTier }]}
                                                unit={billingData.unit}
                                                type={type}
                                                showSubtotal
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    ))}
                {activeProduct.billingData.addons.length > 0 && (
                    <div className="">
                        <p className="opacity-70 text-sm m-0">Product add-ons</p>
                        <ul className="list-none m-0 p-0 divide-y divide-light dark:divide-dark">
                            {activeProduct.billingData.addons
                                .filter((addon) => !addon.inclusion_only)
                                .map((addon) => {
                                    return (
                                        <li key={addon.type} className="py-2">
                                            <Addon
                                                key={addon.type}
                                                addons={addons}
                                                setAddons={setAddons}
                                                volume={volume || slider.min}
                                                {...addon}
                                            />
                                        </li>
                                    )
                                })}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

const addonDefaults = {
    enhanced_persons: {
        checked: true,
    },
}

export default function Tabbed() {
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)
    const platform = billingProducts.find((product) => product.type === 'platform_and_support')
    const [activeTab, setActiveTab] = useState(0)
    const { products, setVolume, setProduct, monthlyTotal } = useProducts()
    const activeProduct = products[activeTab]
    const initialProductAddons = useMemo(() => {
        const initialAddons = []
        for (const product of products) {
            if (product.billingData.addons.length > 0) {
                product.billingData.addons.forEach((addon) => {
                    initialAddons.push({
                        type: addon.type,
                        checked: addonDefaults[addon.type]?.checked || false,
                        totalCost: 0,
                    })
                })
            }
        }
        return initialAddons
    }, [])
    const initialPlatformAddons = useMemo(() => {
        const initialAddons = []
        platform.addons.forEach((addon) => {
            initialAddons.push({
                type: addon.type,
                checked: false,
                price: Number(addon.plans[addon.plans.length - 1].unit_amount_usd.split('.')[0]),
            })
        })
        return initialAddons
    }, [])
    const [productAddons, setProductAddons] = useState(initialProductAddons)
    const [platformAddons, setPlatformAddons] = useState(initialPlatformAddons)
    const totalPrice = useMemo(
        () =>
            monthlyTotal +
            productAddons.reduce((acc, addon) => acc + addon.totalCost, 0) +
            platformAddons.reduce((acc, addon) => acc + (addon.checked ? addon.price : 0), 0),
        [monthlyTotal, productAddons, platformAddons]
    )

    return (
        <div>
            <div className="grid md:grid-cols-12 mb-1 md:mb-0 pt-2">
                <div className="md:col-span-4 lg:col-span-3 md:pr-6 mb-4 md:mb-0">
                    <h4 className="m-0 md:pl-3 pb-1 font-normal text-sm opacity-70">Products</h4>
                    <ul className="list-none m-0 p-0 pb-2 flex flex-row md:flex-col gap-px overflow-x-auto w-screen md:w-auto -mx-4 px-4">
                        {products.map(({ name, Icon, cost, color, billingData }, index) => {
                            const active = activeTab === index
                            const addonsPrice = productAddons
                                .filter(
                                    (addon) =>
                                        addon.checked &&
                                        billingData.addons.some((billingAddon) => addon.type === billingAddon.type)
                                )
                                .reduce((acc, addon) => acc + addon.totalCost, 0)
                            return (
                                <li key={name} className="flex-1">
                                    <button
                                        onClick={() => setActiveTab(index)}
                                        className={`p-2 rounded-md font-semibold text-sm flex flex-col md:flex-row space-x-2 whitespace-nowrap items-start md:items-center justify-between w-full click ${active
                                            ? 'font-bold bg-accent dark:bg-accent-dark'
                                            : 'hover:bg-accent dark:hover:bg-accent/15'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <span>
                                                <Icon className={`w-5 h-6 text-${color}`} />
                                            </span>
                                            <span>{name}</span>
                                        </div>
                                        {name == 'A/B testing' ? (
                                            <span className="opacity-25">--</span>
                                        ) : (
                                            <div className="opacity-70 pl-5 md:pl-0">
                                                {formatUSD(cost + addonsPrice)}
                                            </div>
                                        )}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="md:col-span-8 lg:col-span-9 md:pl-0">
                    <div className="flex space-x-12 justify-between items-center mb-2">
                        <h3 className="m-0 text-lg">Estimate your price</h3>
                        {!activeProduct.name == 'A/B testing' && (
                            <p className="m-0 opacity-70 text-sm font-bold pr-3">Subtotal</p>
                        )}
                    </div>

                    <TabContent
                        key={activeProduct.type}
                        addons={productAddons}
                        setAddons={setProductAddons}
                        activeProduct={activeProduct}
                        setVolume={setVolume}
                        setProduct={setProduct}
                    />
                </div>
                <div className="md:col-span-4 lg:col-span-3 pt-2 pb-0 md:pt-2.5 md:pb-2 pl-4 md:pl-3 md:pr-6 border-t border-light dark:border-dark"></div>
                <div className="md:col-span-8 lg:col-span-9 py-2 md:border-t border-light dark:border-dark">
                    <h4 className="mb-0.5 md:mb-1 font-normal text-sm opacity-70">Platform add-ons</h4>

                    {platform.addons.map(({ type, name, description, plans }) => {
                        const platformAddon = platformAddons.find((addon) => addon.type === type)
                        const checked = platformAddon?.checked
                        return (
                            <div key={type} className="grid grid-cols-6 gap-8 items-center">
                                <div className="col-span-3 md:col-span-4 flex items-center justify-between">
                                    <div className="flex space-x-1 items-center">
                                        <p className="m-0 text-sm font-bold">{name}</p>
                                        <Tooltip content={description} tooltipClassName="max-w-[250px]" placement="top">
                                            <span className="relative">
                                                <IconInfo className="size-5 opacity-70" />
                                            </span>
                                        </Tooltip>
                                    </div>
                                    <Toggle
                                        checked={checked}
                                        onChange={(checked) =>
                                            setPlatformAddons(
                                                platformAddons.map((addon) => {
                                                    if (addon.type === type) {
                                                        return { ...addon, checked }
                                                    }
                                                    return addon
                                                })
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <strong>$450</strong><span className="text-sm opacity-70">/mo</span>
                                </div>
                                <div className="text-right">
                                    <p className={`font-semibold m-0 pr-3 ${checked ? '' : 'opacity-50'}`}>
                                        ${checked ? platformAddon?.price : 0}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-accent dark:bg-accent-dark rounded">
                <div>
                    <h3 className="m-0 text-[15px]">Estimated total</h3>
                    <p className="text-sm opacity-60 mb-0">for all products & add-ons</p>
                </div>
                <p className="m-0 font-bold">${totalPrice.toLocaleString()}</p>
            </div>
        </div>
    )
}
