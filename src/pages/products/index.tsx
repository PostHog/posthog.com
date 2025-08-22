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
import { PRODUCT_COUNT, APP_COUNT } from '../../constants'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { IconGrid, IconListSquare } from 'components/OSIcons/Icons'
import usePostHog from 'hooks/usePostHog'

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
    { label: <IconListSquare className="size-4" />, value: 'list', default: true },
    { label: <IconGrid className="size-4" />, value: 'grid' },
]

const Subscribe = ({ selectedProduct }: { selectedProduct: any }) => {
    const posthog = usePostHog()
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = () => {
        if (!email) return
        posthog?.capture('subscribe_to_product_updates', { email, selectedProduct })
        setSubmitted(true)
    }

    return submitted ? (
        <p className="text-sm m-0 mb-2 border border-input rounded-md p-2 bg-accent">
            Thanks! We'll email you when <strong>{selectedProduct.name}</strong> is ready
        </p>
    ) : (
        <div className="pb-2">
            <p className="text-sm m-0 mb-2">
                Enter your email to get notified when <strong>{selectedProduct.name}</strong> is ready
            </p>
            <form
                className="m-0 space-y-2"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}
            >
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-light dark:bg-dark rounded-md border border-input py-1.5 px-2 text-base w-full"
                />
                <CallToAction size="sm" width="full" onClick={handleSubmit}>
                    Subscribe
                </CallToAction>
            </form>
        </div>
    )
}

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
                                    {/* Product icon component */}
                                    {(() => {
                                        const ProductIcon = () => (
                                            <div className="flex justify-center">
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
                                        )

                                        // If screenshots exist, show screenshot with icon overlay
                                        if (selectedProduct.screenshots && selectedProduct.screenshots.overview) {
                                            return (
                                                <div className="space-y-2">
                                                    <h3 className="text-sm font-semibold">Screenshot</h3>
                                                    <div
                                                        className={`bg-${selectedProduct.color} rounded-md p-2 relative`}
                                                    >
                                                        <img
                                                            src={selectedProduct.screenshots.overview.src}
                                                            alt={selectedProduct.screenshots.overview.alt}
                                                            className="w-full rounded-md border border-primary"
                                                        />
                                                        <div className="absolute bottom-0 left-0">
                                                            <ProductIcon />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }

                                        // If no screenshots, show icon by itself
                                        return <ProductIcon />
                                    })()}

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

                                    {/* Open product button */}
                                    {selectedProduct.status == 'WIP' ? (
                                        <Subscribe key={selectedProduct.slug} selectedProduct={selectedProduct} />
                                    ) : (
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
                                    )}

                                    {/* Product info */}
                                    <div className="space-y-2">
                                        <p className="text-sm text-secondary">
                                            <strong>Slug:</strong> <pre className="inline">/{selectedProduct.slug}</pre>
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
                                    Our suite of tools are designed to help product engineers build and scale products.
                                </p>
                                <p className="text-sm mb-2">
                                    There are four main components to the Product OS toolkit:
                                </p>
                                <ul className="pl-4 mb-4 [&_li]:text-sm">
                                    <li>Customer data infrastructure</li>
                                    <li>Analytics/data viz</li>
                                    <li>Product engineering tools</li>
                                    <li>
                                        AI <Icons.IconSparkles className="inline-block size-4 relative -top-px" />
                                    </li>
                                </ul>
                                {/* 
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
                                 */}
                            </>
                        ),
                    },
                    {
                        title: 'How pricing works',
                        content: (
                            <>
                                <p className="text-sm mb-2">
                                    <strong>We have {PRODUCT_COUNT} paid products</strong> and dozens of data analysis
                                    tools that are free to use.
                                </p>
                                <p className="text-sm mb-2">
                                    Our paid products offer usage-based pricing. Generally you only pay for data
                                    ingress, <em>not</em> any monthly or storage fees.
                                </p>
                                <p className="text-sm mb-0">
                                    <OSButton
                                        variant="underline"
                                        asLink
                                        align="left"
                                        width="full"
                                        size="md"
                                        to="/pricing"
                                        state={{ newWindow: true }}
                                        icon={<Icons.IconArrowRight className="text-salmon" />}
                                        iconPosition="right"
                                        className="font-semibold !px-0"
                                    >
                                        Explore pricing
                                    </OSButton>
                                </p>
                            </>
                        ),
                    },
                    {
                        title: 'Roadmap',
                        content: (
                            <>
                                <p className="text-sm mb-2">
                                    We're working on a bunch of new products. If you don't see what you're looking for,
                                    let us know – either we're already building it, or we will soon.
                                </p>
                                <p className="text-sm mb-0">
                                    <OSButton
                                        variant="underline"
                                        asLink
                                        align="left"
                                        width="full"
                                        size="md"
                                        to="/roadmap"
                                        state={{ newWindow: true }}
                                        icon={<Icons.IconArrowRight className="text-salmon" />}
                                        iconPosition="right"
                                        className="font-semibold !px-0"
                                    >
                                        Explore the roadmap
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
                        data: [
                            'customer-data-infrastructure',
                            'cdp',
                            'data_in',
                            'transformations',
                            'data_warehouse',
                            'data_out',
                            // 'data-warehouse',
                            // 'sql',
                            // 'capture_api',
                            // 'webhooks',
                        ],
                        analytics: [
                            'web_analytics',
                            'product_analytics',
                            'revenue_analytics',
                            'llm_analytics',
                            'custom_dashboards',
                            'group_analytics',
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
                                const aIndex = customOrder.indexOf(a.handle)
                                const bIndex = customOrder.indexOf(b.handle)

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
                        <div className="@container not-prose space-y-2 @md:-ml-3">
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
                                                        className={`@md:pl-4 grid ${isListLayout
                                                            ? '@lg:grid-cols-2 @3xl:grid-cols-3'
                                                            : 'grid-cols-[repeat(auto-fit,minmax(7rem,7rem))] gap-y-4'
                                                            } gap-x-1 @md:gap-x-4 relative [&>div]:mx-auto [&_figure]:text-center`}
                                                    >
                                                        {products.map((product) => (
                                                            <button
                                                                key={product.slug}
                                                                onClick={(e) => handleProductClick(product, e)}
                                                                className={`w-full cursor-default p-1 border-[1.5px] rounded-md border-transparent hover:border-border focus:border-blue focus:bg-blue/10 focus-visible:bg-blue/10 focus:outline-none ${selectedProduct?.slug === product.slug ? '' : ''
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
                                                                        orientation={isListLayout ? 'row' : 'column'}
                                                                        parentIcon={product.parentIcon}
                                                                        color={product.color}
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
                                                            </button>
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
