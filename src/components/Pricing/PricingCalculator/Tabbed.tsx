import React, { useEffect, useMemo, useState } from 'react'
import useProducts from '../Products'
import Tooltip from 'components/Tooltip'
import { IconInfo, IconLightBulb, IconX } from '@posthog/icons'
import Toggle from 'components/Toggle'
import { calculatePrice, pricingSliderLogic } from '../PricingSlider/pricingSliderLogic'
import { useStaticQuery } from 'gatsby'
import { allProductsData } from '../Pricing'
import { useValues } from 'kea'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'

const Modal = ({ onClose, isVisible }) => {
    return (
        <>
            <div
                className={`bg-accent-dark/50 fixed left-0 w-screen h-screen top-0 bg-opacity-40 flex justify-center items-center ${
                    !isVisible ? 'hidden' : 'z-[1000000]'
                }`}
                onClick={() => onClose()}
            ></div>
            <div
                className={`w-[500px] max-w-full h-[calc(100vh_-_123px)] md:h-screen z-[1000001] fixed overflow-y-auto top-0 flex flex-col bg-white transition-all duration-500 ease-out
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
                        Person profiles let you track users with personally identifiable info (like an email address).
                        This enables a deeper level of insights that isn't available when analyzing anonymous traffic
                        (like in Google Analytics).
                    </p>
                    <p className="mb-2">
                        It also provides attribution data and lets you track users across devices and sessions.
                    </p>
                    <p className="mb-2">
                        <strong>With person profiles, you can:</strong>
                    </p>
                    <ul className="[&_li]:text-[15px] pl-4 mb-2">
                        <li>
                            View detailed person information in the{' '}
                            <Link href="https://us.posthog.com/persons" external>
                                People tab
                            </Link>
                        </li>
                        <li>Filter on user properties</li>
                        <li>
                            Merge identities across <code className="text-sm">distinct_id</code> values (i.e. merging an
                            anonymous user with a logged in user)
                        </li>
                        <li>Create cohorts</li>
                        <li>Feature flag, experimentation, and survey targeting on user properties</li>
                        <li>Tracking initial UTM values and referrers across anonymous and identified users</li>
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
                                    <strong>"I want to track ALL my users"</strong>
                                    <span>
                                        <div className="border border-green rounded px-1 py-0.5 text-green font-bold uppercase text-sm">
                                            Yes
                                        </div>
                                    </span>
                                </div>
                                <p className="text-sm opacity-75 pl-4 mb-0">
                                    Anonymous website traffic <em>AND</em> signed in users
                                </p>
                            </summary>
                            <div className="ml-4 my-2 border border-light dark:border-dark bg-accent dark:bg-accent-dark p-2 rounded [&_p]:text-sm">
                                <p className="mb-0">
                                    <strong className="text-green">Yes, you should enable this.</strong> It will allow
                                    you to track visitors from the first time they visit your site and merge them with
                                    an identified user record once they become a customer.
                                </p>
                            </div>
                        </details>

                        <details>
                            <summary className="cursor-pointer">
                                <div className="inline-flex items-center justify-between w-[95%]">
                                    <strong>"I ONLY want to track website visits"</strong>
                                    <span>
                                        <div className="border border-red rounded px-1 py-0.5 text-red font-bold uppercase text-sm">
                                            No
                                        </div>
                                    </span>
                                </div>
                                <p className="text-sm opacity-75 pl-4 mb-0">Anonymous website traffic only</p>
                            </summary>
                            <div className="ml-4 my-2 border border-light dark:border-dark bg-accent dark:bg-accent-dark p-2 rounded [&_p]:text-sm">
                                <p className="mb-0">
                                    <strong>No, you don't need person profiles</strong> to track anonymous users. You'll
                                    only get basic attribution info (like UTM source) but it can't be used to analyze
                                    things like top performing marketing channels as there's no way to know who signed
                                    up.
                                </p>
                            </div>
                        </details>

                        <details>
                            <summary className="cursor-pointer">
                                <div className="inline-flex items-center justify-between w-[95%]">
                                    <strong>"I ONLY want to track logged in users"</strong>
                                    <span>
                                        <div className="border border-green rounded px-1 py-0.5 text-green font-bold uppercase text-sm">
                                            Yes
                                        </div>
                                    </span>
                                </div>
                                <p className="text-sm opacity-75 pl-4 mb-0">Authenticated, identified users only</p>
                            </summary>
                            <div className="ml-4 my-2 border border-light dark:border-dark bg-accent dark:bg-accent-dark p-2 rounded [&_p]:text-sm">
                                <p className="mb-0">
                                    <strong className="text-green">Yes, you should enable this</strong> as you'll need
                                    to identify users with personal info (like an email address or internal ID).
                                </p>
                            </div>
                        </details>
                    </div>

                    <h3 className="text-xl border-b border-light dark:border-dark pb-1 mb-2">Calculating usage</h3>
                    <p className="text-[15px] mb-2">
                        If you're already tracking website traffic, the best way to gauge person profile usage is to
                        determine what percentage of event volume is <em>anonymous traffic</em> vs. events being sent by
                        an identified (authencated) user.
                    </p>
                    <p className="text-[15px]">
                        For example, if 75% of your total event volume is anonymous website traffic when factoring in
                        all in-product usage from identified users, you'll need person profiles for the remaining 25% of
                        event volume triggered in-app.
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
                              )
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
        <div className="grid grid-cols-12 items-center">
            <div className="col-span-7">
                <div className="flex space-x-1 items-center">
                    <p className="m-0 text-sm font-bold">{name}</p>
                    <Tooltip content={description} tooltipClassName="max-w-[250px]" placement="top">
                        <span className="relative">
                            <IconInfo className="size-5 opacity-70" />
                        </span>
                    </Tooltip>
                </div>
                <div>
                    {inclusion_only && (
                        <>
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
                        </>
                    )}
                </div>
            </div>
            <div className="col-span-2 md:col-span-3 flex justify-end">
                <Toggle checked={checked} onChange={handleToggle} />
            </div>
            <div className="col-span-3 md:col-span-2 text-right">
                <p className={`font-semibold m-0 pr-3 ${checked ? '' : 'opacity-50'}`}>
                    ${checked ? addon?.totalCost.toLocaleString() : 0}
                </p>
            </div>
        </div>
    )
}

const TabContent = ({ activeProduct, addons, setAddons }) => {
    const { slider, calcVolume, denomination, calcCost, volume } = activeProduct

    return (
        <>
            <div>
                {activeProduct.name == 'A/B testing' ? (
                    <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded-md px-4 py-3 mb-2 text-sm">
                        A/B testing is currently bundled with Feature flags and shares a free tier and volume pricing.
                    </div>
                ) : (
                    <div className="grid grid-cols-8">
                        <div className="col-span-6">
                            <p className="mb-2">
                                <strong>{calcVolume}</strong>{' '}
                                <span className="opacity-70 text-sm">{denomination}/month</span>
                            </p>
                        </div>
                        <div className="col-span-2 text-right pr-3">
                            <p className="font-semibold mb-0">${calcCost}</p>
                        </div>
                        <div className="col-span-full pr-1.5">{slider}</div>
                        <div className="col-span-full pr-1.5 mt-10 md:mt-8 pb-4 flex gap-1 items-center">
                            <IconLightBulb className="size-5 inline-block text-[#4f9032] dark:text-green relative -top-px" />
                            <span className="text-sm text-[#4f9032] dark:text-green font-semibold">
                                First {activeProduct.freeLimit} {denomination}s free –&nbsp;<em>every month!</em>
                            </span>
                        </div>
                    </div>
                )}
                {activeProduct.addons.length > 0 && (
                    <div className="">
                        <p className="opacity-70 text-sm m-0">Product add-ons</p>
                        <ul className="list-none m-0 p-0 divide-y divide-light dark:divide-dark">
                            {activeProduct.addons.map((addon) => {
                                return (
                                    <li key={addon.type} className="py-2">
                                        <Addon
                                            key={addon.type}
                                            addons={addons}
                                            setAddons={setAddons}
                                            volume={volume}
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

export default function Tabbed() {
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)
    const { monthlyTotal } = useValues(pricingSliderLogic)
    const platform = billingProducts.find((product) => product.type === 'platform_and_support')
    const [activeTab, setActiveTab] = useState(0)
    const products = useProducts()
    const activeProduct = products[activeTab]
    const initialProductAddons = useMemo(() => {
        const initialAddons = []
        for (const product of products) {
            if (product.addons.length > 0) {
                product.addons.forEach((addon) => {
                    initialAddons.push({
                        type: addon.type,
                        checked: false,
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
            <div className="grid md:grid-cols-8 mb-1 md:mb-0">
                <div className="md:col-span-3 md:pr-6 mb-4 md:mb-0">
                    <h4 className="m-0 md:pl-3 pb-1 font-normal text-sm opacity-70">Products</h4>
                    <ul className="list-none m-0 p-0 pb-2 flex flex-row md:flex-col gap-px overflow-x-auto w-screen md:w-auto -mx-4 px-4">
                        {products.map(({ name, icon, calcCost }, index) => {
                            const active = activeTab === index
                            return (
                                <li key={name}>
                                    <button
                                        onClick={() => setActiveTab(index)}
                                        className={`p-2 rounded-md font-semibold text-sm flex flex-col md:flex-row space-x-2 whitespace-nowrap items-start md:items-center justify-between w-full click ${
                                            active
                                                ? 'font-bold bg-accent dark:bg-accent-dark'
                                                : 'hover:bg-accent dark:hover:bg-accent/15'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <span>{icon}</span>
                                            <span>{name}</span>
                                        </div>
                                        {name == 'A/B testing' ? (
                                            <span className="opacity-25">--</span>
                                        ) : (
                                            <div className="opacity-70 pl-5 md:pl-0">${calcCost}</div>
                                        )}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="md:col-span-5 pl-4 md:pl-0">
                    <div className="flex space-x-12 justify-between items-center mb-2">
                        <h3 className="m-0 text-lg">Estimate your price</h3>
                        {!activeProduct.name == 'A/B testing' && (
                            <p className="m-0 opacity-70 text-sm font-bold pr-3">Subtotal</p>
                        )}
                    </div>

                    <TabContent addons={productAddons} setAddons={setProductAddons} activeProduct={activeProduct} />
                </div>
                <div className="md:col-span-3 pt-2 pb-0 md:pt-2.5 md:pb-2 pl-4 md:pl-3 md:pr-6 border-t border-light dark:border-dark"></div>
                <div className="md:col-span-5 py-2 pl-4 md:pl-0 md:border-t border-light dark:border-dark">
                    <h4 className="mb-0.5 md:mb-1 font-normal text-sm opacity-70">Platform add-ons</h4>

                    {platform.addons.map(({ type, name, description, plans }) => {
                        const platformAddon = platformAddons.find((addon) => addon.type === type)
                        const checked = platformAddon?.checked
                        return (
                            <div key={type} className="grid grid-cols-12 items-center">
                                <div className="flex space-x-1 items-center col-span-7">
                                    <p className="m-0 text-sm font-bold">{name}</p>
                                    <Tooltip content={description} tooltipClassName="max-w-[250px]" placement="top">
                                        <span className="relative">
                                            <IconInfo className="size-5 opacity-70" />
                                        </span>
                                    </Tooltip>
                                </div>
                                <div className="flex justify-end col-span-2 md:col-span-3">
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
                                <div className="col-span-3 md:col-span-2 text-right">
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
