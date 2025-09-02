import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import Explorer from 'components/Explorer'
import { navigate } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import SEO from 'components/seo'
import useProduct from '../../hooks/useProduct'
import OSButton from 'components/OSButton'
import * as Icons from '@posthog/icons'
import { AppLink } from 'components/OSIcons/AppIcon'
import { Accordion } from 'components/RadixUI/Accordion'
import { IconPresentation } from 'components/OSIcons'
import { productMenu } from '../../navs'
import { PRODUCT_COUNT } from '../../constants'
import { explorerLayoutOptions } from '../../constants/explorerLayoutOptions'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import usePostHog from 'hooks/usePostHog'
import { useWindow } from '../../context/Window'
import { categoryOrder, categoryDisplayNames, getProductsForCategory } from '../../constants/productNavigation'
import Fuse from 'fuse.js'
import debounce from 'lodash/debounce'
import { explorerGridColumns } from '../../constants'
import { useExplorerLayout } from '../../hooks/useExplorerLayout'

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
            Thanks! We'll email you when <strong>{selectedProduct.name}</strong> is ready.
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
    const [hoveredProduct, setHoveredProduct] = useState<any>(null)
    const { isListLayout, setLayoutValue, currentLayout } = useExplorerLayout('grid')
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredProducts, setFilteredProducts] = useState<any[]>(allProducts)
    const { appWindow } = useWindow()
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const appWindowWidth = appWindow?.size?.width || 0

    // Set up fuzzy search with Fuse.js
    const fuse = useMemo(() => {
        return new Fuse(allProducts, {
            keys: ['name', 'slug', 'description', 'category'],
            threshold: 0.3,
        })
    }, [allProducts])

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((query: string) => {
            if (!query.trim()) {
                setFilteredProducts(allProducts)
                return
            }

            const results = fuse.search(query)
            const filtered = results.map((result) => result.item)
            setFilteredProducts(filtered)
        }, 300),
        [fuse, allProducts]
    )

    // Handle search changes
    const handleSearchChange = useCallback(
        (query: string) => {
            setSearchTerm(query)
            debouncedSearch(query)
        },
        [debouncedSearch]
    )

    // Update filtered products when allProducts changes
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredProducts(allProducts)
        }
    }, [allProducts, searchTerm])

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current)
            }
        }
    }, [])

    const handleProductClick = useCallback(
        (product: any, e: React.MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            // Single-click opens the product page
            navigate(`/${product.slug}`, { state: { newWindow: true } })
        },
        [appWindowWidth]
    )

    const handleRightSidebarClose = useCallback(() => {
        setSelectedProduct(null)
        setHoveredProduct(null)
    }, [])

    const sidePanelProduct = hoveredProduct || selectedProduct

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
                isRightSidebarOpen={true}
                onRightSidebarClose={handleRightSidebarClose}
                onSearch={handleSearchChange}
                rightActionButtons={
                    <ToggleGroup
                        title="Layout"
                        hideTitle={true}
                        options={explorerLayoutOptions}
                        onValueChange={setLayoutValue}
                        value={currentLayout}
                        className="-my-1 ml-2"
                    />
                }
                rightSidebarPanel={
                    sidePanelProduct ? (
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">{sidePanelProduct.name}</h2>
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
                                                {sidePanelProduct.parentIcon ? (
                                                    <div className="relative">
                                                        {sidePanelProduct.Icon &&
                                                            React.createElement(sidePanelProduct.Icon, {
                                                                className: `size-16`,
                                                            })}
                                                    </div>
                                                ) : sidePanelProduct.Icon ? (
                                                    <div className={`relative size-16`}>
                                                        <IconPresentation
                                                            className={`size-16 [&_.bg-front]:fill-${sidePanelProduct.color} [&_.bg-rear]:fill-${sidePanelProduct.colorSecondary}`}
                                                        />
                                                        {React.createElement(sidePanelProduct.Icon, {
                                                            className: `size-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`,
                                                        })}
                                                    </div>
                                                ) : (
                                                    <IconPresentation className="size-16" />
                                                )}
                                            </div>
                                        )

                                        // If screenshots exist, show screenshot with icon overlay
                                        if (sidePanelProduct.screenshots && sidePanelProduct.screenshots.overview) {
                                            return (
                                                <div className="space-y-2">
                                                    <h3 className="text-sm font-semibold">Screenshot</h3>
                                                    <div
                                                        className={`bg-${sidePanelProduct.color} rounded-md p-2 relative`}
                                                    >
                                                        <img
                                                            src={sidePanelProduct.screenshots.overview.src}
                                                            alt={sidePanelProduct.screenshots.overview.alt}
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
                                    {sidePanelProduct.seo && (
                                        <div className="space-y-2">
                                            <h3 className="text-sm font-semibold">SEO Information</h3>
                                            {sidePanelProduct.seo.title && (
                                                <p className="text-sm text-secondary">
                                                    <strong>Title:</strong> {sidePanelProduct.seo.title}
                                                </p>
                                            )}
                                            {sidePanelProduct.seo.description && (
                                                <p className="text-sm text-secondary">
                                                    <strong>Description:</strong> {sidePanelProduct.seo.description}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Open product button */}
                                    {sidePanelProduct.status == 'WIP' ? (
                                        <Subscribe key={sidePanelProduct.slug} selectedProduct={sidePanelProduct} />
                                    ) : (
                                        <div className="pt-4">
                                            <OSButton
                                                variant="primary"
                                                width="full"
                                                size="md"
                                                asLink
                                                to={`/${sidePanelProduct.slug}`}
                                                state={{ newWindow: true }}
                                                icon={<Icons.IconArrowRight />}
                                                iconPosition="right"
                                            >
                                                Open {sidePanelProduct.name}
                                            </OSButton>
                                        </div>
                                    )}

                                    {/* Product info */}
                                    <div className="space-y-2">
                                        <p className="text-sm text-secondary">
                                            <strong>Slug:</strong>{' '}
                                            <pre className="inline">/{sidePanelProduct.slug}</pre>
                                        </p>
                                        {sidePanelProduct.description && (
                                            <p className="text-sm text-secondary">
                                                <strong>Description:</strong> {sidePanelProduct.description}
                                            </p>
                                        )}
                                        {sidePanelProduct.category && (
                                            <p className="text-sm text-secondary">
                                                <strong>Category:</strong> {sidePanelProduct.category}
                                            </p>
                                        )}
                                        {sidePanelProduct.status && (
                                            <p className="text-sm text-secondary">
                                                <strong>Status:</strong>{' '}
                                                <span className="uppercase">{sidePanelProduct.status}</span>
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
                    const productsWithCategory = filteredProducts.filter((product: any) => product.category)
                    const groupedProducts = productsWithCategory.reduce((acc: Record<string, any[]>, product: any) => {
                        const category = product.category
                        if (!acc[category]) {
                            acc[category] = []
                        }
                        acc[category].push(product)
                        return acc
                    }, {} as Record<string, any[]>)

                    // Sort products using the shared helper function
                    Object.keys(groupedProducts).forEach((category) => {
                        groupedProducts[category] = getProductsForCategory(category, productsWithCategory)
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
                                                            : explorerGridColumns + 'gap-y-4 items-start justify-items-center'
                                                            } gap-x-1 @md:gap-x-4 relative [&>div]:mx-auto [&_figure]:text-center`}
                                                    >
                                                        {products.map((product) => (
                                                            <button
                                                                key={product.slug}
                                                                onClick={(e) => handleProductClick(product, e)}
                                                                onMouseEnter={() => {
                                                                    // Clear any pending timeout
                                                                    if (hoverTimeoutRef.current) {
                                                                        clearTimeout(hoverTimeoutRef.current)
                                                                        hoverTimeoutRef.current = null
                                                                    }

                                                                    // If there's already a panel open, delay switching
                                                                    if (hoveredProduct || selectedProduct) {
                                                                        hoverTimeoutRef.current = setTimeout(() => {
                                                                            setHoveredProduct(product)
                                                                        }, 100)
                                                                    } else {
                                                                        // No panel open, show immediately
                                                                        setHoveredProduct(product)
                                                                    }
                                                                }}
                                                                onMouseLeave={() => {
                                                                    // Don't hide the panel on mouse leave - keep it open
                                                                    // Clear any pending timeout to prevent delayed switching
                                                                    if (hoverTimeoutRef.current) {
                                                                        clearTimeout(hoverTimeoutRef.current)
                                                                        hoverTimeoutRef.current = null
                                                                    }
                                                                }}
                                                                className={`w-full cursor-pointer p-1 border-[1.5px] rounded-md border-transparent hover:border-border focus:border-blue focus:bg-blue/10 focus-visible:bg-blue/10 focus:outline-none ${selectedProduct?.slug === product.slug ? '' : ''
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
