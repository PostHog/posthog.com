import React, { useEffect, useMemo, useRef, useState } from 'react'
import Tooltip from 'components/Tooltip'
import { IconCopy, IconInfo, IconLightBulb, IconPlus, IconSearch, IconStack, IconX } from '@posthog/icons'
import Toggle from 'components/Toggle'
import { formatUSD } from '../PricingSlider/pricingSliderLogic'
import { buildProductAddons, calculatePrice, getAddonsCostForProduct, getCalculatorTotal } from './calculatorLogic'
import { Link, useStaticQuery } from 'gatsby'
import { allProductsData } from '../Pricing'
import useProducts from 'hooks/useProducts'
import { LogSlider, inverseCurve, sliderCurve } from '../PricingSlider/Slider'
import { PricingTiers } from '../Plans'
import ProductAnalyticsTab, { analyticsSliders, getTotalEnhancedPersonsVolume } from './Tabs/ProductAnalytics'
import ReplayVisionTab from './Tabs/ReplayVision'
import PostHogDesktopTab from './Tabs/PostHogDesktop'
import StandaloneAddonsTab from './Tabs/StandaloneAddonsTab'
import { EXCLUDED_ADDON_TYPES } from '../../../constants/addons'
import { BROWSE_TOOLS_HANDLES } from 'constants/productNavigation'
import qs from 'qs'
import usePostHog from 'hooks/usePostHog'
import AgentEstimateLink, {
    AI_PRICING_EXPERIMENT_VARIANTS,
    AI_PRICING_FLAG,
} from 'components/Pricing/AgentEstimateLink'
import { NumericFormat } from 'react-number-format'
import AutosizeInput from 'react-input-autosize'
import { RenderInClient } from 'components/RenderInClient'
import { useApp } from '../../../context/App'
import AllProductsRatesModal, { ALL_PRODUCTS_RATES_MODAL_KEY } from './AllProductsRatesModal'

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
                    <p className="!m-0 text-sm font-bold">{name}</p>
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
                    <p className="!m-0 text-sm opacity-70">Starts at</p>
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
    posthog_code: PostHogDesktopTab,
}

export const Addons = ({ addons, setAddons, volume, activeProduct, analyticsData, hideHeading }) => {
    return activeProduct.billingData.addons.length > 0 ? (
        <div>
            {!hideHeading && <p className="opacity-70 text-sm m-0">Product add-ons</p>}
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
            <div className="mb-3">
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
                                <div className="col-span-full pr-1.5 mt-10 md:mt-8 pb-4 flex gap-3 items-center justify-between">
                                    <span className="flex gap-1 items-center min-w-0">
                                        <IconLightBulb className="size-5 inline-block text-[#4f9032] dark:text-green relative -top-px shrink-0" />
                                        <span className="text-sm text-[#4f9032] dark:text-green font-semibold">
                                            {freeAllocationText ? (
                                                freeAllocationText
                                            ) : (
                                                <>
                                                    First {Math.round(slider.min).toLocaleString()} {billingData.unit}s
                                                    free –&nbsp;
                                                    <em>every month!</em>
                                                </>
                                            )}
                                        </span>
                                    </span>
                                    {costByTier && (
                                        <button
                                            onClick={() => setShowBreakdown(!showBreakdown)}
                                            className="text-red dark:text-yellow font-semibold text-sm shrink-0"
                                        >
                                            {showBreakdown ? 'Hide how we calculate this' : 'See how we calculate this'}
                                        </button>
                                    )}
                                </div>
                            </div>
                            {costByTier && (
                                <>
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

const DEFAULT_PRODUCT_TYPES = [
    'product_analytics',
    'session_replay',
    'ai_observability',
    'replay_vision',
    'feature_flags',
    'posthog_ai',
]

const PLATFORM_PACKAGES_TYPE = 'platform_packages'
const EMPTY_STATE_STARTER_TYPES = ['product_analytics', 'session_replay', 'feature_flags']

const EmptyEstimate = ({ products, onAdd }) => {
    const starters = EMPTY_STATE_STARTER_TYPES.map((type) => products.find((product) => product.type === type)).filter(
        Boolean
    )
    return (
        <div className="p-4 border border-primary rounded-md border-dashed">
            <h3 className="m-0 text-2xl">Nothing to estimate yet</h3>
            <p className="mt-2 mb-0 text-sm text-secondary max-w-lg">
                Add what you'd actually ship. Every product has its own monthly free tier, so an estimate of $0 is a
                real answer.
            </p>
            <p className="mt-4 mb-2 text-xs font-semibold uppercase tracking-wide text-secondary">Start with</p>
            <div className="flex flex-wrap gap-2">
                {starters.map(({ type, name, categoryName, Icon, color, colorDark }) => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => onAdd(type)}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-primary bg-white dark:bg-accent-dark text-sm font-semibold click hover:bg-accent"
                    >
                        {Icon && (
                            <Icon
                                className={`w-4 h-4 shrink-0 text-${color}${
                                    colorDark ? ` dark:text-${colorDark}` : ''
                                }`}
                            />
                        )}
                        <span>{categoryName || name}</span>
                    </button>
                ))}
            </div>
        </div>
    )
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
    const [activeType, setActiveType] = useState<string | null>(DEFAULT_PRODUCT_TYPES[0])
    const [selectedTypes, setSelectedTypes] = useState<string[]>(DEFAULT_PRODUCT_TYPES)
    const [addingProduct, setAddingProduct] = useState(false)
    const [productSearch, setProductSearch] = useState('')
    const addProductRef = useRef(null)
    const { products: initialProducts, setVolume, setProduct } = useProducts()
    const { addWindow } = useApp()
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
    const selectedProducts = selectedTypes
        .map((type) => products.find((product) => product.type === type))
        .filter(Boolean)
    const availableProducts = products.filter((product) => !selectedTypes.includes(product.type))
    const platformPackagesActive = activeType === PLATFORM_PACKAGES_TYPE
    const activeProduct = platformPackagesActive
        ? undefined
        : selectedProducts.find((product) => product.type === activeType) || selectedProducts[0]
    const ActiveIcon = activeProduct?.Icon

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
    const visiblePlatformAddons = platform.addons.filter((addon) => !addon.legacy_product)
    const platformPackagesTotal = platformAddons
        .filter((addon) => addon.checked)
        .reduce((sum, addon) => sum + (addon.price || 0), 0)
    const selectedAddonTypes = new Set(
        selectedProducts.flatMap((product) => (product.billingData?.addons || []).map((addon) => addon.type))
    )
    const totalPrice = getCalculatorTotal(
        selectedProducts.reduce((total, product) => total + (product.cost || 0), 0),
        productAddons.filter((addon) => selectedAddonTypes.has(addon.type)),
        platformAddons
    )

    const generateURL = () => {
        const params = {
            ...(activeProduct && { calculator: activeProduct.type }),
        }
        selectedProducts.forEach((product) => {
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

        const volumeTypes = Object.keys(volumeParams).filter((type) =>
            products.some((product) => product.type === type)
        )
        const typesFromUrl = [calculator, ...volumeTypes].filter((type) =>
            products.some((product) => product.type === type)
        )
        if (typesFromUrl.length > 0) {
            setSelectedTypes((current) => [...current, ...typesFromUrl.filter((type) => !current.includes(type))])
            if (calculator && products.some((product) => product.type === calculator)) {
                setActiveType(calculator)
            }
        }

        volumeTypes.forEach((type) => {
            setVolume(type, volumeParams[type].volume)
        })

        const el = document.getElementById('calculator')
        if (el && products.some((product) => volumeTypes.includes(product.type))) {
            const y = el.getBoundingClientRect().top + window.scrollY - (window.innerWidth > 767 ? 108 : 57)
            window.scrollTo({ top: y, behavior: 'smooth' })
        }
    }, [])

    useEffect(() => {
        if (!addingProduct) return
        addProductRef.current?.querySelector('input')?.focus()
        const onPointerDown = (event) => {
            if (!addProductRef.current?.contains(event.target)) {
                setAddingProduct(false)
                setProductSearch('')
            }
        }
        document.addEventListener('mousedown', onPointerDown)
        return () => document.removeEventListener('mousedown', onPointerDown)
    }, [addingProduct])

    const closeProductPicker = () => {
        setAddingProduct(false)
        setProductSearch('')
    }

    const addProduct = (type) => {
        if (!type || selectedTypes.includes(type)) return
        setSelectedTypes((current) => [...current, type])
        setActiveType(type)
        closeProductPicker()
    }

    const openAllRates = () => {
        addWindow(
            (
                <AllProductsRatesModal
                    location={{ pathname: ALL_PRODUCTS_RATES_MODAL_KEY }}
                    key={ALL_PRODUCTS_RATES_MODAL_KEY}
                    newWindow
                    products={products}
                    selectedTypes={selectedTypes}
                    onAdd={addProduct}
                />
            ) as any
        )
    }

    const filteredAvailableProducts = productSearch.trim()
        ? availableProducts.filter((product) =>
              (product.categoryName || product.name).toLowerCase().includes(productSearch.trim().toLowerCase())
          )
        : availableProducts

    const removeProduct = (type) => {
        const product = products.find((item) => item.type === type)
        if (product) {
            setVolume(product.handle, 0)
            const addonTypes = new Set((product.billingData?.addons || []).map((addon) => addon.type))
            setProductAddons((addons) =>
                addons.map((addon) => (addonTypes.has(addon.type) ? { ...addon, checked: false, totalCost: 0 } : addon))
            )
        }
        if (type === 'product_analytics') {
            setAnalyticsData(
                analyticsSliders.reduce((acc, slider) => {
                    slider.types.forEach(({ type: sliderType, enhanced }) => {
                        acc[sliderType] = { volume: 0, cost: 0, enhanced: enhanced || false }
                    })
                    return acc
                }, [])
            )
        }
        const remaining = selectedTypes.filter((selectedType) => selectedType !== type)
        setSelectedTypes(remaining)
        if (activeType === type) {
            setActiveType(remaining[0] || null)
        }
    }

    const productCount = selectedProducts.length

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
                    <div className="mb-2">
                        <p className="m-0 text-sm">
                            <strong>Your estimate</strong>{' '}
                            <span className="text-secondary text-xs">
                                {productCount} {productCount === 1 ? 'product' : 'products'}
                            </span>
                        </p>
                    </div>
                    <ul className="list-none m-0 p-0 flex flex-row md:flex-col gap-px overflow-x-auto @md:w-auto -mx-4 px-4 @md:px-0 @md:mx-0">
                        {selectedProducts.map(
                            ({ name, type, Icon, cost, color, colorDark, billingData, categoryName, pricingBadge }) => {
                                const active = activeProduct?.type === type
                                const addonsPrice = getAddonsCostForProduct(productAddons, billingData)
                                return (
                                    <li key={type} className="flex-1">
                                        <button
                                            type="button"
                                            onClick={() => setActiveType(type)}
                                            className={`p-2 rounded-md font-semibold text-sm flex flex-col md:flex-row space-x-2 whitespace-nowrap items-start md:items-center justify-between w-full click ${
                                                active ? 'font-bold bg-accent' : 'hover:bg-accent'
                                            }`}
                                        >
                                            <div className="flex items-center space-x-2">
                                                {Icon && (
                                                    <span>
                                                        <Icon
                                                            className={`w-5 h-6 text-${color}${
                                                                colorDark ? ` dark:text-${colorDark}` : ''
                                                            }`}
                                                        />
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
                    {availableProducts.length > 0 && (
                        <div ref={addProductRef} className="relative mt-2">
                            <button
                                type="button"
                                onClick={() => (addingProduct ? closeProductPicker() : setAddingProduct(true))}
                                className="flex items-center justify-between gap-3 p-2 text-sm text-left w-full rounded-md hover:bg-accent"
                            >
                                <span className="flex items-center gap-1.5">
                                    <IconPlus className="size-4 shrink-0" />
                                    <span className="font-bold">Add to your estimate</span>
                                </span>
                                <span className="opacity-60">{availableProducts.length} more</span>
                            </button>
                            {addingProduct && (
                                <div className="absolute z-50 left-0 top-0 right-0 overflow-hidden rounded bg-white dark:bg-accent-dark shadow-xl border border-primary">
                                    <div className="flex items-center gap-2 px-2.5 py-2 border-b border-primary">
                                        <IconSearch className="size-4 text-muted shrink-0" />
                                        <input
                                            type="text"
                                            value={productSearch}
                                            onChange={(event) => setProductSearch(event.target.value)}
                                            placeholder="Search products"
                                            className="flex-1 min-w-0 bg-transparent border-0 outline-none ring-0 focus:ring-0 text-sm text-primary placeholder:text-muted px-0 py-0"
                                            onKeyDown={(event) => {
                                                if (event.key === 'Escape') {
                                                    event.preventDefault()
                                                    closeProductPicker()
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            aria-label="Close"
                                            onClick={closeProductPicker}
                                            className="text-muted hover:text-primary"
                                        >
                                            <IconX className="size-4" />
                                        </button>
                                    </div>
                                    <div className="p-1 max-h-60 overflow-auto">
                                        {filteredAvailableProducts.length > 0 ? (
                                            filteredAvailableProducts.map(
                                                ({
                                                    type,
                                                    name,
                                                    Icon,
                                                    color,
                                                    colorDark,
                                                    categoryName,
                                                    startsAt,
                                                    unit,
                                                }) => (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        onClick={() => addProduct(type)}
                                                        className="flex w-full items-center justify-between gap-3 rounded px-2 py-1.5 text-sm hover:bg-accent"
                                                    >
                                                        <span className="flex items-center gap-2 min-w-0">
                                                            {Icon && (
                                                                <Icon
                                                                    className={`w-5 h-6 shrink-0 text-${color}${
                                                                        colorDark ? ` dark:text-${colorDark}` : ''
                                                                    }`}
                                                                />
                                                            )}
                                                            <span className="font-semibold truncate">
                                                                {categoryName || name}
                                                            </span>
                                                        </span>
                                                        {startsAt && unit && (
                                                            <span className="text-secondary shrink-0">
                                                                ${startsAt}/{unit}
                                                            </span>
                                                        )}
                                                    </button>
                                                )
                                            )
                                        ) : (
                                            <p className="m-0 px-2 py-1.5 text-sm text-muted">No products found</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="mt-2 pt-1 border-t border-primary">
                        <button
                            type="button"
                            onClick={() => setActiveType(PLATFORM_PACKAGES_TYPE)}
                            className={`p-2 rounded-md font-semibold text-sm flex items-center justify-between w-full click ${
                                platformPackagesActive ? 'font-bold bg-accent' : 'hover:bg-accent'
                            }`}
                        >
                            <span className="flex items-center space-x-2">
                                <IconStack className="w-5 h-6 shrink-0" />
                                <span>Platform packages</span>
                            </span>
                            <span className="opacity-70">{formatUSD(platformPackagesTotal)}</span>
                        </button>
                    </div>
                    <div className="mt-1 pt-2 border-t border-primary @6xl:mb-0 mb-6">
                        <button type="button" onClick={openAllRates} className="text-sm text-secondary underline">
                            See all products and per-unit rates
                        </button>
                    </div>
                </div>
                <div className="col-span-12 @2xl:col-span-8 md:pl-0 flex flex-col">
                    {selectedProducts.length === 0 && !platformPackagesActive && (
                        <EmptyEstimate products={products} onAdd={addProduct} />
                    )}

                    {platformPackagesActive && (
                        <>
                            <div className="flex items-center gap-2.5 mb-1">
                                <IconStack className="size-6 shrink-0" />
                                <h3 className="m-0 leading-none">Platform packages</h3>
                            </div>
                            <div>
                                {visiblePlatformAddons.map(({ type, name, description }) => {
                                    const platformAddon = platformAddons.find((addon) => addon.type === type)
                                    const checked = platformAddon?.checked
                                    return (
                                        <div
                                            key={type}
                                            className="flex items-center justify-between gap-4 py-3 border-b border-primary last:border-b-0"
                                        >
                                            <div className="min-w-0 max-w-[400px]">
                                                <p className="m-0 text-sm font-bold">{name}</p>
                                                <p className="m-0 text-xs text-secondary">{description}</p>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
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
                                                        <span className="font-semibold text-sm">
                                                            ${platformAddon.price.toLocaleString()}/mo
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    )}

                    {activeProduct && (
                        <>
                            <div className="flex items-center gap-2.5 mb-4">
                                {ActiveIcon && (
                                    <ActiveIcon
                                        className={`size-6 shrink-0 text-${activeProduct.color}${
                                            activeProduct.colorDark ? ` dark:text-${activeProduct.colorDark}` : ''
                                        }`}
                                    />
                                )}
                                <h3 className="m-0 leading-none">{activeProduct.categoryName || activeProduct.name}</h3>
                                <button
                                    type="button"
                                    onClick={() => removeProduct(activeProduct.type)}
                                    className="text-xs text-secondary underline leading-none shrink-0  mt-0.5"
                                >
                                    Remove from estimate
                                </button>
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
                        </>
                    )}

                    <div className="mt-auto">
                        <div
                            data-scheme="secondary"
                            className="bg-primary rounded relative border border-primary overflow-hidden mt-2"
                        >
                            <div className="flex items-center justify-between p-3">
                                <div>
                                    <h3 className="m-0 text-[15px]">Estimated total</h3>
                                    <p className="text-sm opacity-60 mb-0">for all products & add-ons</p>
                                </div>

                                <div className="text-right">
                                    <p className="m-0 font-bold text-lg leading-none">${totalPrice.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        {/* Two ways to leave with an estimate: a link to this one, or a prompt that builds
                        one from what the visitor already pays for elsewhere. Same row, same weight. */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pr-2 md:pr-0">
                            <RenderInClient
                                render={() => {
                                    const variant = window.posthog?.getFeatureFlag?.(AI_PRICING_FLAG)
                                    return variant && variant !== AI_PRICING_EXPERIMENT_VARIANTS.control ? (
                                        <AgentEstimateLink
                                            source="calculator-total"
                                            className="text-sm font-bold text-red dark:text-yellow"
                                        />
                                    ) : (
                                        <></>
                                    )
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
