import React, { useEffect, useMemo, useState } from 'react'
import useProducts from '../Products'
import Tooltip from 'components/Tooltip'
import { IconInfo } from '@posthog/icons'
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
        <div className="grid grid-cols-4 items-center">
            <div className="flex-grow flex space-x-2 items-center col-span-2">
                <p className="m-0 font-bold">{name}</p>
                <Tooltip content={description} tooltipClassName="max-w-[250px]" placement="bottom">
                    <span className="relative">
                        <IconInfo className="size-5 opacity-70" />
                    </span>
                </Tooltip>
            </div>
            <div>
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
            <div className="flex-shrink-0 col-span-1 text-right">
                <p className="font-bold text-lg m-0">${checked ? addon?.totalCost : 0}</p>
            </div>
        </div>
    )
}

const TabContent = ({ activeProduct, addons, setAddons }) => {
    const { slider, calcVolume, denomination, calcCost, volume } = activeProduct

    return (
        <div>
            <div className="grid grid-cols-8">
                <div className="flex-grow col-span-6">
                    <p className="mb-2">
                        <strong>{calcVolume}</strong> <span className="opacity-70 text-sm">{denomination}/month</span>
                    </p>
                    <div>{slider}</div>
                </div>
                <div className="flex-shrink-0 text-right col-span-2">
                    <p className="font-bold text-lg">${calcCost}</p>
                </div>
            </div>
            {activeProduct.addons.length > 0 && (
                <div className="mt-12">
                    <p className="opacity-70 text-sm m-0 mb-3">Product add-ons</p>
                    <ul className="list-none m-0 p-0 space-y-4">
                        {activeProduct.addons.map((addon) => {
                            return (
                                <li key={addon.type}>
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
            <div className="grid grid-cols-8 gap-x-8">
                <div className="flex-shrink-0 col-span-3">
                    <h4 className="m-0 mb-4 text-base">Products</h4>
                    <ul className="list-none m-0 p-0">
                        {products.map(({ name, icon, calcCost }, index) => {
                            const active = activeTab === index
                            return (
                                <li key={name}>
                                    <button
                                        onClick={() => setActiveTab(index)}
                                        className={`p-2 rounded-md font-bold flex space-x-2 items-center justify-between w-full click ${
                                            active ? 'bg-accent' : ''
                                        }`}
                                    >
                                        <div className="flex space-x-2">
                                            <span>{icon}</span>
                                            <span>{name}</span>
                                        </div>
                                        <div className="opacity-70">${calcCost}</div>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="flex-grow col-span-5">
                    <div className="flex space-x-12 justify-between items-center  mb-4">
                        <h3 className="m-0 text-lg">Estimate your price</h3>
                        <p className="m-0 opacity-70 text-sm font-bold">Subtotal</p>
                    </div>

                    <TabContent addons={productAddons} setAddons={setProductAddons} activeProduct={activeProduct} />
                </div>
            </div>
            <div className="grid grid-cols-8 gap-x-8 py-2 my-4 border-y border-border dark:border-dark">
                <div className="flex-shrink-0 col-span-3">
                    <h4 className="m-0 text-base opacity-70">Platform add-ons</h4>
                </div>
                <div className="flex-grow col-span-5">
                    {platform.addons.map(({ type, name, description, plans }) => {
                        const platformAddon = platformAddons.find((addon) => addon.type === type)
                        const checked = platformAddon?.checked
                        return (
                            <div key={type} className="grid grid-cols-4 items-center">
                                <div className="flex-grow flex space-x-2 items-center col-span-2">
                                    <p className="m-0 font-bold">{name}</p>
                                    <Tooltip content={description} tooltipClassName="max-w-[250px]" placement="bottom">
                                        <span className="relative">
                                            <IconInfo className="size-5 opacity-70" />
                                        </span>
                                    </Tooltip>
                                </div>
                                <div>
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
                                <div className="flex-shrink-0 col-span-1 text-right">
                                    <p className="font-bold text-lg m-0">${checked ? platformAddon?.price : 0}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex justify-between">
                <h3 className="m-0 text-base">Estimated total for all products & add-ons</h3>
                <p className="m-0 font-bold">${totalPrice.toLocaleString()}</p>
            </div>
        </div>
    )
}
