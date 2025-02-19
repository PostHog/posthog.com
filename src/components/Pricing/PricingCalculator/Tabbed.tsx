import React, { useEffect, useMemo, useState } from 'react'
import Tooltip from 'components/Tooltip'
import { IconCopy, IconInfo, IconLightBulb } from '@posthog/icons'
import Toggle from 'components/Toggle'
import { calculatePrice, formatUSD } from '../PricingSlider/pricingSliderLogic'
import { useStaticQuery } from 'gatsby'
import { allProductsData } from '../Pricing'
import useProducts from 'hooks/useProducts'
import { LogSlider, inverseCurve, sliderCurve } from '../PricingSlider/Slider'
import { PricingTiers } from '../Plans'
import ProductAnalyticsTab, { analyticsSliders, getTotalEnhancedPersonsVolume } from './Tabs/ProductAnalytics'
import qs from 'qs'
import { useUser } from 'hooks/useUser'
import { NumericFormat } from 'react-number-format'
import AutosizeInput from 'react-input-autosize'

const Addon = ({ type, name, description, plans, addons, setAddons, volume, inclusion_only }) => {
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

    return (
        <div className="grid grid-cols-6 gap-8 items-center">
            <div className="col-span-3 sm:col-span-4 flex justify-between items-center">
                <div className="flex space-x-1 items-center">
                    <p className="m-0 text-sm font-bold">{name}</p>
                    <Tooltip content={description} tooltipClassName="max-w-[250px]" placement="top">
                        <span className="relative">
                            <IconInfo className="size-5 opacity-70" />
                        </span>
                    </Tooltip>
                </div>
                <Toggle checked={checked} onChange={handleToggle} />
            </div>
            <div className="col-span-3 sm:col-span-2 flex justify-between">
                <div>
                    <p className="m-0 text-sm opacity-70">Starts at</p>
                    <strong className="text-[15px] md:text-base">
                        ${plans[plans.length - 1].tiers.find((tier) => tier.unit_amount_usd !== '0').unit_amount_usd}
                    </strong>
                    <span className="text-sm opacity-70">/event</span>
                </div>
                <div className="text-right">
                    <p className={`font-semibold m-0 ${checked ? '' : 'opacity-50'}`}>
                        {formatUSD(checked ? addon?.totalCost : 0)}
                    </p>
                </div>
            </div>
        </div>
    )
}

const productTabs = {
    product_analytics: ProductAnalyticsTab,
}

export const Addons = ({ addons, setAddons, volume, activeProduct, analyticsData }) => {
    return activeProduct.billingData.addons.length > 0 ? (
        <div>
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
                                    volume={
                                        addon.type != 'group_analytics'
                                            ? volume
                                            : getTotalEnhancedPersonsVolume(analyticsData)
                                    }
                                    {...addon}
                                />
                            </li>
                        )
                    })}
            </ul>
        </div>
    ) : null
}

const TabContent = ({ activeProduct, addons, setVolume, setAddons, setProduct, analyticsData, setAnalyticsData }) => {
    const { type, cost, volume, billingData, slider, costByTier } = activeProduct
    const [showBreakdown, setShowBreakdown] = useState(false)

    return (
        <>
            <div>
                {productTabs[activeProduct.type]?.({
                    activeProduct,
                    setVolume,
                    setProduct,
                    analyticsData,
                    setAnalyticsData,
                    setAddons,
                    addons,
                }) ||
                    (activeProduct.name == 'Experiments' ? (
                        <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded-md px-4 py-3 mb-2 text-sm">
                            Experiments is currently bundled with Feature flags and share a free tier and volume
                            pricing.
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-8">
                                <div className="col-span-6">
                                    <p className="mb-2">
                                        <NumericFormat
                                            inputClassName="bg-transparent text-center focus:ring-0 focus:border-red dark:focus:border-yellow focus:bg-white dark:focus:bg-accent-dark font-code max-w-[103px] text-sm border border-light hover:border-button dark:border-dark rounded-sm py-1 px-0 min-w-[25px] px-1"
                                            value={volume}
                                            thousandSeparator=","
                                            onValueChange={({ floatValue }) => setVolume(type, floatValue)}
                                            customInput={AutosizeInput}
                                        />{' '}
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
                                    <Addons
                                        activeProduct={activeProduct}
                                        addons={addons}
                                        setAddons={setAddons}
                                        volume={volume || slider.min}
                                        analyticsData={analyticsData}
                                    />
                                </>
                            )}
                        </>
                    ))}
            </div>
        </>
    )
}

const addonDefaults = {
    enhanced_persons: {
        checked: true,
    },
}

const CopyURLButton = ({ onClick }) => {
    const [copied, setCopied] = useState(false)
    const copyURL = () => {
        onClick()
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button className="text-sm font-bold text-red dark:text-yellow" onClick={copyURL}>
            {copied ? 'Copied!' : 'Generate calculator URL'}
        </button>
    )
}

export default function Tabbed() {
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)
    const { user } = useUser()
    const [analyticsData, setAnalyticsData] = useState(
        analyticsSliders.reduce((acc, slider) => {
            slider.types.forEach(({ type, enhanced }) => {
                acc[type] = { volume: 0, cost: 0, enhanced: enhanced || false }
            })
            return acc
        }, [])
    )
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

    const generateURL = () => {
        const volumes = {}
        products.forEach((product) => {
            if (product.volume) {
                volumes[product.type] = { volume: product.volume }
                if (product.type === 'product_analytics') {
                    const types = {}
                    Object.keys(analyticsData).forEach((type) => {
                        const volume = analyticsData[type].volume
                        if (volume) {
                            types[type] = { volume: analyticsData[type].volume }
                        }
                    })
                    volumes['product_analytics'].types = types
                }
            }
        })
        const URL = `${window.location.origin}${window.location.pathname}?${qs.stringify(volumes, {
            encodeValuesOnly: true,
        })}`
        navigator.clipboard.writeText(URL)
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const volumes = qs.parse(urlParams.toString())
        const volumeTypes = Object.keys(volumes)
        volumeTypes.forEach((type) => {
            setVolume(type, volumes[type].volume)
        })
        const el = document.getElementById('calculator')
        if (el && products.some((product) => volumeTypes.includes(product.type))) {
            const y = el.getBoundingClientRect().top + window.scrollY - (window.innerWidth > 767 ? 108 : 57)
            window.scrollTo({ top: y, behavior: 'smooth' })
        }
    }, [])

    return (
        <div className="w-full flex-1 max-w-6xl">
            <div className="grid md:grid-cols-12 mb-1">
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
                                        className={`p-2 rounded-md font-semibold text-sm flex flex-col md:flex-row space-x-2 whitespace-nowrap items-start md:items-center justify-between w-full click ${
                                            active
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
                                        {name == 'Experiments' ? (
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
                        {!activeProduct.name == 'Experiments' && (
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
                        analyticsData={analyticsData}
                        setAnalyticsData={setAnalyticsData}
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
                                <div className="col-span-3 sm:col-span-4 flex items-center justify-between">
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
                                <div className="col-span-3 sm:col-span-2 flex justify-between">
                                    <div>
                                        <strong className="text-[15px] md:text-base">$450</strong>
                                        <span className="text-sm opacity-70">/mo</span>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-semibold m-0 pr-3 ${checked ? '' : 'opacity-50'}`}>
                                            ${checked ? platformAddon?.price : 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-accent dark:bg-accent-dark rounded relative">
                <div>
                    <h3 className="m-0 text-[15px]">Estimated total</h3>
                    <p className="text-sm opacity-60 mb-0">for all products & add-ons</p>
                </div>

                <div className="text-right">
                    <p className="m-0 font-bold text-lg leading-none">${totalPrice.toLocaleString()}</p>
                </div>
            </div>
            {user?.role.type === 'moderator' && (
                <div className="flex justify-end gap-0.5 mt-2 pr-2 md:pr-0">
                    <IconCopy className="size-5 inline-block text-primary/50 dark:text-primary-dark/50 relative -top-px" />
                    <CopyURLButton onClick={generateURL} />
                </div>
            )}
        </div>
    )
}
