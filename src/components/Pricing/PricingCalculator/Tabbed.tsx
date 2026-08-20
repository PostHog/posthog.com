import React, { useEffect, useMemo, useRef, useState } from 'react'
import Tooltip from 'components/Tooltip'
import { IconCopy, IconInfo, IconLightBulb } from '@posthog/icons'
import Toggle from 'components/shared/forms/Toggle'
import { formatUSD } from '../PricingSlider/pricingSliderLogic'
import { buildProductAddons, calculatePrice, getAddonsCostForProduct, getCalculatorTotal } from './calculatorLogic'
import { Link, useStaticQuery } from 'gatsby'
import { allProductsData } from '../Pricing'
import useProducts from 'hooks/useProducts'
import { LogSlider, inverseCurve, sliderCurve } from '../PricingSlider/Slider'
import { PricingTiers } from '../Plans'
import ProductAnalyticsTab, { analyticsSliders, getTotalEnhancedPersonsVolume } from './Tabs/ProductAnalytics'
import ReplayVisionTab from './Tabs/ReplayVision'
import StandaloneAddonsTab from './Tabs/StandaloneAddonsTab'
import { EXCLUDED_ADDON_TYPES } from '../../../constants/addons'
import { BROWSE_TOOLS_HANDLES } from 'constants/productNavigation'
import qs from 'qs'
import { useUser } from 'hooks/useUser'
import usePostHog from 'hooks/usePostHog'
import { NumericFormat } from 'react-number-format'
import AutosizeInput from 'react-input-autosize'

export const Addon = ({ type, name, description, plans, addons, setAddons, volume, inclusion_only }) => {
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
    replay_vision: ReplayVisionTab,
}

export const Addons = ({ addons, setAddons, volume, activeProduct, analyticsData }) => {
    return activeProduct.billingData.addons.length > 0 ? (
        <div>
            <p className="opacity-70 text-sm m-0">Product add-ons</p>
            <ul className="list-none m-0 p-0 divide-y divide-primary">
                {activeProduct.billingData.addons
                    .filter((addon) => !addon.inclusion_only && !EXCLUDED_ADDON_TYPES.includes(addon.type))
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

export const TabContent = ({
    activeProduct,
    addons,
    setVolume,
    setAddons,
    setProduct,
    analyticsData,
    setAnalyticsData,
}) => {
    const { type, cost, volume, billingData, slider, costByTier, freeAllocationText } = activeProduct
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
                        <div className="bg-accent border border-primary rounded-md px-4 py-3 mb-2 text-sm">
                            Experiments is currently bundled with Feature flags and share a free tier and volume
                            pricing.
                        </div>
                    ) : activeProduct.addonSliders ? (
                        <StandaloneAddonsTab
                            activeProduct={activeProduct}
                            setVolume={setVolume}
                            setProduct={setProduct}
                        />
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
                                        {freeAllocationText ? (
                                            freeAllocationText
                                        ) : (
                                            <>
                                                First {Math.round(slider.min).toLocaleString()} {billingData.unit}s free
                                                –&nbsp;
                                                <em>every month!</em>
                                            </>
                                        )}
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
                                        <div className="mb-4 p-1 border border-input rounded-md">
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
    const { products: initialProducts, setVolume, setProduct, monthlyTotal } = useProducts()
    // Listed in the same order as the taskbar's "Browse tools" menu, so the tools appear where
    // people have already learned to look for them. Metered products missing from that curated
    // list (Managed warehouse, PostHog AI, Inbox) fall to the end, keeping their relative order —
    // `sort` is stable, so the `Infinity` bucket stays in `useProducts` order.
    const products = useMemo(() => {
        const navOrder = (product) => {
            const index = BROWSE_TOOLS_HANDLES.indexOf(product.handle)
            return index === -1 ? Infinity : index
        }
        return initialProducts
            .filter(
                (product) => !!product.unit && !product.hideFromPricingTableAndCalculator && !product.hideFromCalculator
            )
            .sort((a, b) => navOrder(a) - navOrder(b))
    }, [initialProducts])
    const activeProduct = products[activeTab]

    // Capture pricing calculator interactions for the experiment.
    const posthog = usePostHog()
    const hasCapturedInteraction = useRef(false)
    const trackInteraction = (kind: string) => (event: React.SyntheticEvent) => {
        if (hasCapturedInteraction.current) return
        // Clicks land on padding and labels as much as on controls; only count the real ones.
        const control = (event.target as HTMLElement)?.closest?.(
            'button, input, select, textarea, [role="slider"], [role="switch"]'
        )
        if (!control) return
        hasCapturedInteraction.current = true
        posthog?.capture('pricing_calculator_interacted', {
            interaction: kind,
            // Which tool was on screen when they first touched it — the tab list is the most
            // likely first interaction, so this is usually the product they went looking for.
            product: activeProduct?.handle,
        })
    }

    const initialProductAddons = useMemo(() => buildProductAddons(products, addonDefaults), [])
    const initialPlatformAddons = useMemo(() => {
        const initialAddons = []
        platform.addons.forEach((addon) => {
            initialAddons.push({
                type: addon.type,
                checked: false,
                price: Number(addon.plans[addon.plans.length - 1].unit_amount_usd.split('.')[0]),
                legacy_product: addon.legacy_product,
            })
        })
        return initialAddons
    }, [])
    const [productAddons, setProductAddons] = useState(initialProductAddons)
    const [platformAddons, setPlatformAddons] = useState(initialPlatformAddons)
    const totalPrice = useMemo(
        () => getCalculatorTotal(monthlyTotal, productAddons, platformAddons),
        [monthlyTotal, productAddons, platformAddons]
    )

    const generateURL = () => {
        const params = {
            ...(activeProduct && { calculator: activeProduct.type }),
        }
        products.forEach((product) => {
            if (product.volume) {
                params[product.type] = { volume: product.volume }
                if (product.type === 'product_analytics') {
                    const types = {}
                    Object.keys(analyticsData).forEach((type) => {
                        const volume = analyticsData[type].volume
                        if (volume) {
                            types[type] = { volume: analyticsData[type].volume }
                        }
                    })
                    params['product_analytics'].types = types
                }
            }
        })
        const URL = `${window.location.origin}${window.location.pathname}?${qs.stringify(params, {
            encodeValuesOnly: true,
        })}`
        navigator.clipboard.writeText(URL)
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const params = qs.parse(urlParams.toString())
        const { calculator, ...volumeParams } = params

        if (calculator) {
            const productIndex = products.findIndex((product) => product.type === calculator)
            if (productIndex !== -1) {
                setActiveTab(productIndex)
            }
        }

        const volumeTypes = Object.keys(volumeParams)
        volumeTypes.forEach((type) => {
            setVolume(type, volumeParams[type].volume)
        })

        const el = document.getElementById('calculator')
        if (el && products.some((product) => volumeTypes.includes(product.type))) {
            const y = el.getBoundingClientRect().top + window.scrollY - (window.innerWidth > 767 ? 108 : 57)
            window.scrollTo({ top: y, behavior: 'smooth' })
        }
    }, [])

    return (
        // Capture-phase handlers so an interaction still registers if a control stops propagation.
        // Keyboard is covered separately: slider handles move on arrow keys without firing either
        // of the other two.
        <div
            className="w-full flex-1"
            onClickCapture={trackInteraction('click')}
            onChangeCapture={trackInteraction('change')}
            onKeyDownCapture={trackInteraction('keyboard')}
        >
            <div className="grid grid-cols-12 mb-1">
                <div className="col-span-12 @2xl:col-span-4 md:pr-6 mb-4 md:mb-0">
                    <ul className="list-none m-0 p-0 pb-2 flex flex-row md:flex-col gap-px overflow-x-auto @md:w-auto -mx-4 px-4 @md:px-0 @md:mx-0">
                        {products.map(
                            ({ name, Icon, cost, color, billingData, handle, categoryName, pricingBadge }, index) => {
                                const active = activeTab === index
                                const addonsPrice = getAddonsCostForProduct(productAddons, billingData)
                                return (
                                    <li key={name} className="flex-1">
                                        <button
                                            onClick={() => setActiveTab(index)}
                                            className={`p-2 rounded-md font-semibold text-sm flex flex-col md:flex-row space-x-2 whitespace-nowrap items-start md:items-center justify-between w-full click ${
                                                active ? 'font-bold bg-accent' : 'hover:bg-accent'
                                            }`}
                                        >
                                            <div className="flex items-center space-x-2">
                                                {Icon && (
                                                    <span>
                                                        <Icon className={`w-5 h-6 text-${color}`} />
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1.5">
                                                    <span>{categoryName || name}</span>
                                                    {pricingBadge && (
                                                        <span className="bg-yellow uppercase text-2xs rounded-xs px-0.5 py-0.5 font-semibold text-black leading-none">
                                                            {pricingBadge}
                                                        </span>
                                                    )}
                                                </span>
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
                            }
                        )}
                    </ul>
                </div>
                <div className="col-span-12 @2xl:col-span-8 md:pl-0">
                    <div className="flex space-x-12 justify-between items-center mb-2">
                        <h3>Estimate your price</h3>
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

                <div className="hidden @2xl:block col-span-4" />
                <div className="col-span-12 @2xl:col-span-8 py-2 md:border-t border-primary">
                    <h4 className="mb-0.5 md:mb-1 font-normal text-sm opacity-70">Platform packages</h4>

                    {platform.addons
                        .filter((a) => !a.legacy_product)
                        .map(({ type, name, description }) => {
                            const platformAddon = platformAddons.find((addon) => addon.type === type)
                            const checked = platformAddon?.checked
                            return (
                                <div key={type} className="grid grid-cols-6 gap-8 items-center">
                                    <div className="col-span-3 sm:col-span-4 flex items-center justify-between">
                                        <div className="flex space-x-1 items-center">
                                            <p className="m-0 text-sm font-bold">{name}</p>
                                            <Tooltip
                                                content={description}
                                                tooltipClassName="max-w-[250px]"
                                                placement="top"
                                            >
                                                <span className="relative">
                                                    <IconInfo className="size-5 opacity-70" />
                                                </span>
                                            </Tooltip>
                                        </div>
                                        {type !== 'enterprise' && (
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
                                        )}
                                    </div>
                                    <div className="col-span-3 sm:col-span-2 flex justify-between">
                                        {type === 'enterprise' ? (
                                            <Link
                                                to="/talk-to-a-human?edition=enterprise"
                                                className="text-red dark:text-yellow font-semibold text-sm"
                                                state={{ newWindow: true }}
                                            >
                                                Contact us
                                            </Link>
                                        ) : (
                                            <>
                                                <div>
                                                    <strong className="text-[15px] md:text-base">
                                                        ${platformAddon.price.toLocaleString()}
                                                    </strong>
                                                    <span className="text-sm opacity-70">/mo</span>
                                                </div>
                                                <div className="text-right">
                                                    <p
                                                        className={`font-semibold m-0 pr-3 ${
                                                            checked ? '' : 'opacity-50'
                                                        }`}
                                                    >
                                                        ${checked ? platformAddon?.price : 0}
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
            <div
                data-scheme="secondary"
                className="flex items-center justify-between p-3 bg-primary rounded relative border border-primary"
            >
                <div>
                    <h3 className="m-0 text-[15px]">Estimated total</h3>
                    <p className="text-sm opacity-60 mb-0">for all products & add-ons</p>
                </div>

                <div className="text-right">
                    <p className="m-0 font-bold text-lg leading-none">${totalPrice.toLocaleString()}</p>
                </div>
            </div>
            <div className="flex justify-end gap-0.5 mt-2 pr-2 md:pr-0">
                <IconCopy className="size-5 inline-block text-muted relative -top-px" />
                <CopyURLButton onClick={generateURL} />
            </div>
        </div>
    )
}
