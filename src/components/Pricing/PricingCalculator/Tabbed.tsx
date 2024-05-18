import React, { useEffect, useMemo, useState } from 'react'
import useProducts from '../Products'
import Tooltip from 'components/Tooltip'
import { IconInfo, IconLightBulb, IconPercentage } from '@posthog/icons'
import Toggle from 'components/Toggle'
import { calculatePrice, pricingSliderLogic } from '../PricingSlider/pricingSliderLogic'
import { useStaticQuery } from 'gatsby'
import { allProductsData } from '../Pricing'
import { useValues } from 'kea'

const Addon = ({ type, name, description, plans, addons, setAddons, volume }) => {
    const addon = addons.find((addon) => addon.type === type)
    const checked = addon?.checked

    useEffect(() => {
        setAddons((addons) => {
            return addons.map((addon) => {
                if (addon.type === type) {
                    return {
                        ...addon,
                        totalCost: checked ? calculatePrice(volume, plans[plans.length - 1].tiers) : 0,
                    }
                }
                return addon
            })
        })
    }, [volume, checked])

    return (
        <div className="grid grid-cols-12 items-center">
            <div className="col-span-7 flex space-x-1 items-center">
                <p className="m-0 text-sm font-bold">{name}</p>
                <Tooltip content={description} tooltipClassName="max-w-[250px]" placement="top">
                    <span className="relative">
                        <IconInfo className="size-5 opacity-70" />
                    </span>
                </Tooltip>
            </div>
            <div className="col-span-2 md:col-span-3 flex justify-end">
                <Toggle
                    checked={checked}
                    onChange={(checked) =>
                        setAddons(
                            addons.map((addon) => {
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
                    ${checked ? addon?.totalCost.toLocaleString() : 0}
                </p>
            </div>
        </div>
    )
}

const TabContent = ({ activeProduct, addons, setAddons }) => {
    const { slider, calcVolume, denomination, calcCost, volume } = activeProduct

    return (
        <div>
            {activeProduct.name == 'A/B testing' ? (
                <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded-md px-4 py-3 mb-2 text-sm">
                    A/B testing is currently packaged with Feature flags and shares a free tier and volume pricing.
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
                                            active ? 'font-bold bg-accent dark:bg-accent-dark' : 'hover:bg-accent'
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
                <div className="md:col-span-3 pt-2 pb-0 md:pt-2.5 md:pb-2 pl-4 md:pl-3 md:pr-6 border-t border-light dark:border-dark">
                    <h4 className="m-0 font-normal text-sm opacity-70">Platform add-ons</h4>
                </div>
                <div className="md:col-span-5 py-2 pl-4 md:pl-0 md:border-t border-light dark:border-dark">
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
