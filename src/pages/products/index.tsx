import React, { useState, useCallback } from 'react'
import Layout from 'components/Layout'
import ProductProductAnalytics from 'components/Product/ProductAnalytics'
import Explorer from 'components/Explorer'
import { navigate } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import useProduct from '../../hooks/useProduct'
import OSButton from 'components/OSButton'
import * as Icons from '@posthog/icons'
import { AppIcon, AppIconName, AppLink } from 'components/OSIcons/AppIcon'
import { Accordion } from 'components/RadixUI/Accordion'
import ZoomHover from 'components/ZoomHover'
import { IconPresentation } from 'components/OSIcons'
import { productMenu } from '../../navs'
import { PRODUCT_COUNT } from '../../constants'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'

// Create selectOptions for the address bar
const selectOptions = [
    {
        label: 'Platform',
        items: [
            { value: 'products', label: 'Products', icon: productMenu.icon, color: productMenu.color },
            ...productMenu.children.flatMap((item) => {
                // Skip items without valid slugs
                if (!item.slug) return []

                // Add the base product
                return [
                    {
                        value: item.slug,
                        label: item.name,
                        icon: item.icon,
                        color: item.color,
                    },
                ]
            }),
        ],
    },
]

const layoutOptions = [
    { label: 'List', value: 'list', default: true },
    { label: 'Grid', value: 'grid' },
]

export default function Products(): JSX.Element {
    const allProducts = useProduct() as any[]
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [lastClickTime, setLastClickTime] = useState(0)
    const [lastClickedProduct, setLastClickedProduct] = useState<string | null>(null)
    const [isListLayout, setIsListLayout] = useState(true)

    const handleProductClick = useCallback(
        (product: any, e: React.MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()

            const currentTime = Date.now()
            const timeSinceLastClick = currentTime - lastClickTime
            const isSameProduct = lastClickedProduct === product.slug

            // Double-click detection (within 500ms on the same product)
            if (isSameProduct && timeSinceLastClick < 500) {
                // Double-click: open the product page in PostHog window
                navigate(`/${product.slug}`, { state: { newWindow: true } })
            } else {
                // Single-click: select the product
                setSelectedProduct(product)
                setLastClickedProduct(product.slug)
            }

            setLastClickTime(currentTime)
        },
        [lastClickTime, lastClickedProduct]
    )

    const handleRightSidebarClose = useCallback(() => {
        setSelectedProduct(null)
    }, [])

    return (
        <>
            <SEO
                title="Product OS suite - PostHog"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/product-analytics.jpg`}
            />
            <Explorer
                template="generic"
                slug="products"
                title="Product OS"
                showTitle={false}
                headerBarOptions={['showBack', 'showForward', 'showSearch']}
                selectOptions={selectOptions}
                doubleClickToOpen={true}
                isRightSidebarOpen={true}
                onRightSidebarClose={handleRightSidebarClose}
                rightActionButtons={
                    <ToggleGroup
                        title="Layout"
                        hideTitle={true}
                        options={layoutOptions}
                        onValueChange={(value) => setIsListLayout(value === 'list')}
                        value={isListLayout ? 'list' : 'grid'}
                        className="-my-1 ml-2"
                    />
                }
                rightSidebarPanel={
                    selectedProduct ? (
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">{selectedProduct.name}</h2>
                                <button
                                    onClick={handleRightSidebarClose}
                                    className="p-1 hover:bg-accent rounded-sm transition-colors"
                                    aria-label="Close sidebar"
                                >
                                    <Icons.IconX className="size-4" />
                                </button>
                            </div>
                            <ScrollArea className="h-[calc(100vh-12rem)]">
                                <div className="space-y-4">
                                    {/* Product icon */}
                                    <div className="flex justify-center py-4">
                                        {selectedProduct.parentIcon ? (
                                            <div className="relative">
                                                {selectedProduct.Icon &&
                                                    React.createElement(selectedProduct.Icon, {
                                                        className: `size-16`,
                                                    })}
                                            </div>
                                        ) : selectedProduct.Icon ? (
                                            <div className={`relative size-16`}>
                                                <IconPresentation
                                                    className={`size-16 [&_.bg-front]:fill-${selectedProduct.color} [&_.bg-rear]:fill-${selectedProduct.colorSecondary}`}
                                                />
                                                {React.createElement(selectedProduct.Icon, {
                                                    className: `size-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`,
                                                })}
                                            </div>
                                        ) : (
                                            <IconPresentation className="size-16" />
                                        )}
                                    </div>

                                    {/* Product info */}
                                    <div className="space-y-2">
                                        <p className="text-sm text-secondary">
                                            <strong>Slug:</strong> {selectedProduct.slug}
                                        </p>
                                        {selectedProduct.description && (
                                            <p className="text-sm text-secondary">
                                                <strong>Description:</strong> {selectedProduct.description}
                                            </p>
                                        )}
                                        {selectedProduct.category && (
                                            <p className="text-sm text-secondary">
                                                <strong>Category:</strong> {selectedProduct.category}
                                            </p>
                                        )}
                                        {selectedProduct.status && (
                                            <p className="text-sm text-secondary">
                                                <strong>Status:</strong>{' '}
                                                <span className="uppercase">{selectedProduct.status}</span>
                                            </p>
                                        )}
                                    </div>

                                    {/* SEO info if available */}
                                    {selectedProduct.seo && (
                                        <div className="space-y-2">
                                            <h3 className="text-sm font-semibold">SEO Information</h3>
                                            {selectedProduct.seo.title && (
                                                <p className="text-sm text-secondary">
                                                    <strong>Title:</strong> {selectedProduct.seo.title}
                                                </p>
                                            )}
                                            {selectedProduct.seo.description && (
                                                <p className="text-sm text-secondary">
                                                    <strong>Description:</strong> {selectedProduct.seo.description}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Screenshots if available */}
                                    {selectedProduct.screenshots && selectedProduct.screenshots.length > 0 && (
                                        <div className="space-y-2">
                                            <h3 className="text-sm font-semibold">Screenshot</h3>
                                            <img
                                                src={selectedProduct.screenshots[0].src}
                                                alt={selectedProduct.screenshots[0].alt || 'Product screenshot'}
                                                className="w-full rounded-md border border-primary"
                                            />
                                        </div>
                                    )}

                                    {/* Open product button */}
                                    <div className="pt-4">
                                        <OSButton
                                            variant="primary"
                                            width="full"
                                            size="md"
                                            asLink
                                            to={`/${selectedProduct.slug}`}
                                            state={{ newWindow: true }}
                                            icon={<Icons.IconArrowRight />}
                                            iconPosition="right"
                                        >
                                            Open {selectedProduct.name}
                                        </OSButton>
                                        <p className="text-xs text-muted text-center mt-2">
                                            Tip: Double-click the icon to open directly
                                        </p>
                                    </div>
                                </div>
                            </ScrollArea>
                        </div>
                    ) : (
                        <div className="p-4 h-full flex items-center justify-center">
                            <div className="text-center text-muted">
                                <Icons.IconInfo className="size-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Click an icon to see details</p>
                            </div>
                        </div>
                    )
                }
                leftSidebarContent={[
                    {
                        title: 'About Product OS',
                        content: (
                            <>
                                <p className="text-sm mb-2">
                                    Our toolkit helps product engineers build and scale products. It has everything you
                                    need to build features, analyze usage, and talk to customers.
                                </p>
                                <p className="text-sm mb-2">There are four main components:</p>
                                <ul className="pl-4 mb-4 [&_li]:text-sm">
                                    <li>Customer data platform</li>
                                    <li>Analytics</li>
                                    <li>Development tools</li>
                                    <li>AI</li>
                                </ul>
                                <OSButton
                                    variant="underline"
                                    asLink
                                    align="left"
                                    width="full"
                                    size="md"
                                    to="/product-os"
                                    icon={<Icons.IconStack className="text-salmon" />}
                                >
                                    Learn about Product OS
                                </OSButton>
                            </>
                        ),
                    },
                    {
                        title: 'About PostHog',
                        content: (
                            <>
                                <p className="text-sm mb-2">
                                    <strong>We have {PRODUCT_COUNT}+ products today</strong> (and loads more in
                                    development) – but even if we don't have it yet, we will eventually. We are going to
                                    build every piece of SaaS you need to make your product successful.
                                </p>
                                <p className="text-sm mb-2">Why picking PostHog is a no-brainer?</p>
                                <p className="text-sm mb-0">
                                    <OSButton
                                        variant="underline"
                                        asLink
                                        align="left"
                                        width="full"
                                        size="md"
                                        to="/why"
                                        state={{ newWindow: true }}
                                        icon={<Icons.IconArrowRight className="text-salmon" />}
                                        iconPosition="right"
                                        className="font-semibold !px-0"
                                    >
                                        Read about it
                                    </OSButton>
                                </p>
                            </>
                        ),
                    },
                ]}
            >
                {(() => {
                    // Filter out products without a category, then group by category
                    const categoryOrder = [
                        'ai',
                        'data',
                        'analytics',
                        'dataviz',
                        'product',
                        'engineering',
                        'product_engineering',
                        'communication',
                        'product_os',
                    ]

                    // Category display names
                    const categoryDisplayNames: Record<string, string> = {
                        ai: 'PostHog AI',
                        data: 'Customer data infrastructure',
                        analytics: 'Analytics dashboards',
                        dataviz: 'Data visualization',
                        product: 'Product',
                        engineering: 'Engineering',
                        product_engineering: 'Product engineering',
                        communication: 'Communication',
                        product_os: 'Utilities & add-ons',
                    }

                    // Custom product order by category - if not specified, products will be sorted alphabetically
                    const productOrder: Record<string, string[]> = {
                        ai: ['ai', 'max', 'raquel', 'annika', 'marius'],
                        data: ['cdp-manifesto.md', 'cdp', 'data-warehouse', 'sql', 'capture_api', 'webhooks'],
                        analytics: [
                            'bi',
                            'web-analytics',
                            'product-analytics',
                            'revenue-analytics',
                            'llm-analytics',
                            'group_analytics',
                            'heatmaps',
                        ],
                        // product: ['session-replay', 'experiments', 'early_access'],
                        // engineering: ['feature-flags', 'error-tracking'],
                        product_engineering: [
                            'session-replay',
                            'experiments',
                            'feature-flags',
                            'error-tracking',
                            'early_access',
                        ],
                        communication: ['surveys', 'broadcasts', 'user-interviews'],
                        product_os: ['api', 'dashboards', 'notebooks', 'activity', 'toolbar', 'teams', 'profiles'],
                    }
                    const productsWithCategory = allProducts.filter((product: any) => product.category)
                    const groupedProducts = productsWithCategory.reduce((acc: Record<string, any[]>, product: any) => {
                        const category = product.category
                        if (!acc[category]) {
                            acc[category] = []
                        }
                        acc[category].push(product)
                        return acc
                    }, {} as Record<string, any[]>)

                    // Sort products by custom order if specified, otherwise alphabetically
                    Object.keys(groupedProducts).forEach((category) => {
                        const customOrder = productOrder[category]
                        if (customOrder && customOrder.length > 0) {
                            groupedProducts[category].sort((a: any, b: any) => {
                                const aIndex = customOrder.indexOf(a.slug)
                                const bIndex = customOrder.indexOf(b.slug)

                                // If both products are in custom order, sort by that order
                                if (aIndex !== -1 && bIndex !== -1) {
                                    return aIndex - bIndex
                                }
                                // If only one is in custom order, prioritize it
                                if (aIndex !== -1) return -1
                                if (bIndex !== -1) return 1
                                // If neither is in custom order, sort alphabetically
                                return a.name.localeCompare(b.name)
                            })
                        } else {
                            // Fall back to alphabetical sorting
                            groupedProducts[category].sort((a: any, b: any) => a.name.localeCompare(b.name))
                        }
                    })

                    return (
                        <div className="@container not-prose space-y-2">
                            {categoryOrder.map((category) => {
                                const products = groupedProducts[category]
                                if (!products || products.length === 0) return null

                                const count = products.length

                                return (
                                    <Accordion
                                        skin={false}
                                        key={category}
                                        triggerClassName="flex-row-reverse [&>svg]:!-rotate-90 [&[data-state=open]>svg]:!rotate-0 [&>span]:relative [&>span]:after:absolute [&>span]:after:right-0 [&>span]:after:top-1/2 [&>span]:after:h-px [&>span]:after:w-full [&>span]:after:bg-border [&>span]:after:content-['']"
                                        items={[
                                            {
                                                value: category,
                                                trigger: (
                                                    <span className="bg-primary pr-2 relative z-10 select-none">
                                                        {categoryDisplayNames[category] ||
                                                            category.charAt(0).toUpperCase() + category.slice(1)}{' '}
                                                        ({count})
                                                    </span>
                                                ),
                                                content: (
                                                    <div
                                                        className={`@md:pl-4 grid ${
                                                            isListLayout
                                                                ? '@lg:grid-cols-2 @3xl:grid-cols-3'
                                                                : 'grid-cols-[repeat(auto-fit,minmax(7rem,7rem))] gap-y-4'
                                                        } gap-x-1 @md:gap-x-4 relative [&>div]:mx-auto [&_figure]:text-center`}
                                                    >
                                                        {products.map((product) => (
                                                            <ZoomHover
                                                                key={product.slug}
                                                                width="full"
                                                                className={`justify-center ${
                                                                    product.status == 'WIP'
                                                                        ? 'opacity-50 hover:opacity-100'
                                                                        : ''
                                                                }`}
                                                            >
                                                                <div
                                                                    onClick={(e) => handleProductClick(product, e)}
                                                                    className={`cursor-default p-1 border-[1.5px] rounded-md transition-colors ${
                                                                        selectedProduct?.slug === product.slug
                                                                            ? 'border-blue bg-blue/10'
                                                                            : 'border-transparent hover:border-border'
                                                                    }`}
                                                                    style={{ pointerEvents: 'auto' }}
                                                                >
                                                                    <div style={{ pointerEvents: 'none' }}>
                                                                        <AppLink
                                                                            label={product.name}
                                                                            url={`#`}
                                                                            Icon={
                                                                                product.parentIcon ? (
                                                                                    product.Icon
                                                                                ) : (
                                                                                    <IconPresentation />
                                                                                )
                                                                            }
                                                                            orientation={
                                                                                isListLayout ? 'row' : 'column'
                                                                            }
                                                                            parentIcon={product.parentIcon}
                                                                            background="bg-primary"
                                                                            className={`size-12 [&_.bg-front]:fill-${product.color} [&_.bg-rear]:fill-${product.colorSecondary}`}
                                                                        >
                                                                            {!product.parentIcon &&
                                                                                product.Icon &&
                                                                                React.createElement(product.Icon, {
                                                                                    className: `size-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-.125rem]`,
                                                                                })}
                                                                            {product.status == 'beta' && (
                                                                                <span className="absolute bg-yellow top-0 left-1/2 -translate-1/2 uppercase text-2xs rounded-xs px-0.5 py-0.5 font-semibold text-black leading-none">
                                                                                    Beta
                                                                                </span>
                                                                            )}
                                                                            {product.status == 'WIP' && (
                                                                                <span className="absolute bg-salmon text-white top-0 left-1/2 -translate-1/2 uppercase text-2xs rounded-xs px-0.5 py-0.5 font-semibold leading-none">
                                                                                    WIP
                                                                                </span>
                                                                            )}
                                                                        </AppLink>
                                                                    </div>
                                                                </div>
                                                            </ZoomHover>
                                                        ))}
                                                    </div>
                                                ),
                                            },
                                        ]}
                                        defaultValue={category}
                                    />
                                )
                            })}
                        </div>
                    )
                })()}
            </Explorer>
        </>
    )
}
