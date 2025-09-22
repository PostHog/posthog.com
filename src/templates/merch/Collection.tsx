import React, { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductGrid from './ProductGrid'
import { getProduct } from './transforms'
import { CollectionPageContext } from './types'
import SEO from 'components/seo'
import OSButton from 'components/OSButton'
import * as Icons from '@posthog/icons'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import { ProductPanel } from './ProductPanel'
import { Cart } from './Cart'
import { getProductMetafieldByNamespace } from './utils'
import HeaderBar from 'components/OSChrome/HeaderBar'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { Accordion } from 'components/RadixUI/Accordion'
import { useWindow } from '../../context/Window'
import { getProseClasses } from '../../constants'
import AddressBar from 'components/OSChrome/AddressBar'
import Fuse from 'fuse.js'
import { useApp } from '../../context/App'
import OrderHistory from 'components/Merch/OrderHistory'
import { useUser } from 'hooks/useUser'

// Category configuration with icons and display order
type CategoryKey = 'all' | 'Apparel' | 'Stickers' | 'Goods' | 'Novelty'

const categoryConfig: Record<CategoryKey, { label: string; icon: string; color: string; order: number; slug: string }> =
    {
        all: { label: 'All products', icon: 'IconShop', color: 'blue', order: 1, slug: 'all' },
        Apparel: { label: 'Apparel', icon: 'IconShirt', color: 'purple', order: 2, slug: 'apparel' },
        Stickers: { label: 'Stickers', icon: 'IconSticker', color: 'yellow', order: 3, slug: 'stickers' },
        Goods: { label: 'Goods', icon: 'IconMug', color: 'orange', order: 4, slug: 'goods' },
        Novelty: { label: 'Novelty', icon: 'IconCouch', color: 'teal', order: 5, slug: 'novelty' },
    }

type CollectionProps = {
    pageContext: CollectionPageContext
}

// Helper function to get product by handle
function getProductFromHandle(products: any[], handle: string) {
    return products.find((p) => p.handle === handle) || null
}

// Helper function to update URL without triggering navigation
function updateURL(params: { product?: string; state?: string; category?: string }) {
    if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)

        // Clear existing params
        url.searchParams.delete('product')
        url.searchParams.delete('state')
        url.searchParams.delete('category')

        // Set new params
        if (params.product) {
            url.searchParams.set('product', params.product)
        }
        if (params.state) {
            url.searchParams.set('state', params.state)
        }
        if (params.category && params.category !== 'all') {
            url.searchParams.set(
                'category',
                categoryConfig[params.category as CategoryKey]?.slug || params.category.toLowerCase()
            )
        }

        window.history.pushState({}, '', url.toString())
    }
}

// Add inline SidebarContent component (from Explorer)
interface AccordionItem {
    title: string
    content: React.ReactNode
}

const leftSidebarContent = [
    {
        title: 'About our merch',
        content: (
            <>
                <p className="text-sm mb-2">
                    A tech startup with merch you actually want to wear? Now that's a novel idea...
                </p>
                <p className="text-sm mb-0">We won't stop until our merch store reaches product-market fit.</p>
            </>
        ),
    },
    {
        title: 'Shipping',
        content: (
            <>
                <p className="prose dark:prose-invert text-primary text-sm mb-2">
                    Merch is shipped from Ohio via our fulfillment partner,{' '}
                    <a href="https://www.micromerch.com/" target="_blank" rel="noopener noreferrer">
                        MicroMerch
                    </a>
                    .
                </p>
                <p>
                    <strong>Estimated shipping times:</strong>
                </p>
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <strong>Within the US:</strong>
                    <span>1 week</span>
                    <strong>Outside the US:</strong>
                    <span>2 weeks</span>
                </div>
            </>
        ),
    },
    {
        title: 'Returns',
        content: (
            <>
                <p>
                    Returns?? We've literally never had a return. Not sure if it's because our products are that awesome
                    or because we don't have an official return policy.
                </p>
                <p>Until then, just email merch@posthog.com if you have any issues and we'll get you squared away.</p>
            </>
        ),
    },
    {
        title: 'Missing a product?',
        content: (
            <>
                <p className="text-sm mb-2">
                    Is our merch store missing something vital that you need for your closet or desk? Share your product
                    idea with us on GitHub.
                </p>

                <p className="text-sm mb-0">
                    <OSButton
                        variant="underline"
                        asLink
                        align="left"
                        width="full"
                        size="md"
                        to="https://github.com/posthog/posthog.com/issues"
                        icon={<Icons.IconArrowRight className="text-salmon" />}
                        iconPosition="right"
                        className="font-semibold !px-0"
                        external
                    >
                        Submit a product idea
                    </OSButton>
                </p>
            </>
        ),
    },
]

const SidebarContent = ({ content }: { content: React.ReactNode | AccordionItem[] }): JSX.Element | null => {
    if (!content) return null

    if (Array.isArray(content)) {
        return (
            <>
                {content.map((item, index) => (
                    <Accordion
                        key={index}
                        data-scheme="primary"
                        className=""
                        defaultValue="item-0"
                        items={[
                            {
                                trigger: item.title,
                                content: item.content,
                            },
                        ]}
                    />
                ))}
            </>
        )
    }

    return <>{content}</>
}

const defaultAsideWidth = 396

export default function Collection(props: CollectionProps): React.ReactElement {
    const { pageContext } = props
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [cartIsOpen, setCartIsOpen] = useState(false)
    const [orderHistoryIsOpen, setOrderHistoryIsOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [hasInitialized, setHasInitialized] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [asideWidth, setAsideWidth] = useState(defaultAsideWidth)
    const [orders, setOrders] = useState([])
    const { appWindow } = useWindow()
    const { isMobile } = useApp()
    const { getJwt, user } = useUser()

    const currentPath = appWindow?.path?.replace(/^\//, '') || '' // Remove leading slash, default to empty string
    const products = pageContext.productsForCurrentPage
    const transformedProducts = useMemo(() => products?.map((p) => getProduct(p)), [products])
    const fuse = useMemo(
        () =>
            new Fuse(products, {
                keys: ['title', 'description', 'id'],
                includeMatches: true,
                threshold: 0.3,
            }),
        [products]
    )

    // Initialize state from URL parameters on mount only
    useEffect(() => {
        if (typeof window !== 'undefined' && transformedProducts && !hasInitialized) {
            const urlParams = new URLSearchParams(window.location.search)
            const productHandle = urlParams.get('product')
            const state = urlParams.get('state')
            const category = urlParams.get('category')

            // Handle category parameter
            if (category) {
                // Find the category key that matches the slug
                const properCategory = Object.entries(categoryConfig).find(
                    ([key, config]) => config.slug === category.toLowerCase()
                )?.[0]
                if (properCategory && categoryConfig[properCategory as CategoryKey]) {
                    setSelectedCategory(properCategory)
                }
            }

            if (productHandle) {
                const product = getProductFromHandle(transformedProducts, productHandle)
                if (product) {
                    setSelectedProduct(product)
                    setCartIsOpen(false)
                }
            } else if (state === 'cart') {
                setCartIsOpen(true)
                setSelectedProduct(null)
            }

            setHasInitialized(true)
        }
    }, [transformedProducts, hasInitialized])

    // Update URL when selectedProduct, cartIsOpen, or selectedCategory changes (only after initialization)
    useEffect(() => {
        if (typeof window !== 'undefined' && hasInitialized) {
            if (selectedProduct) {
                updateURL({ product: selectedProduct.handle, category: selectedCategory })
            } else if (cartIsOpen) {
                updateURL({ state: 'cart', category: selectedCategory })
            } else {
                updateURL({ category: selectedCategory })
            }
        }
    }, [selectedProduct, cartIsOpen, selectedCategory, hasInitialized])

    // Extract unique categories from products and create selectOptions
    const selectOptions = useMemo(() => {
        const foundCategories = new Set<string>()

        // Always include "all" as the default
        foundCategories.add('all')

        // Extract categories from products
        transformedProducts?.forEach((product) => {
            // Try metafield first (product namespace, category key)
            const metafieldCategory = getProductMetafieldByNamespace(product, 'product', 'category')
            if (metafieldCategory && typeof metafieldCategory === 'string') {
                foundCategories.add(metafieldCategory)
            }
            // Try the direct search if namespace search fails
            else {
                const directCategorySearch = product.metafields?.find((m) => m.key === 'category')
                if (directCategorySearch && typeof directCategorySearch.value === 'string') {
                    foundCategories.add(directCategorySearch.value)
                }
                // Fall back to product.category.name if available
                else if (product.category?.name) {
                    foundCategories.add(product.category.name)
                }
                // Fall back to product.type if available
                else if (product.type) {
                    foundCategories.add(product.type)
                }
            }
        })

        // Filter to only include configured categories and sort by order
        const categoryList = Array.from(foundCategories)
            .filter((category) => categoryConfig[category as CategoryKey]) // Only include configured categories
            .sort((a, b) => categoryConfig[a as CategoryKey].order - categoryConfig[b as CategoryKey].order) // Sort by configured order

        return [
            {
                label: 'Categories',
                items: categoryList.map((category) => {
                    const config = categoryConfig[category as CategoryKey]
                    return {
                        value: category,
                        label: config.label,
                        icon: config.icon,
                        color: config.color,
                    }
                }),
            },
        ]
    }, [transformedProducts])

    // Filter products based on selected category and search query
    const filteredProducts = useMemo(() => {
        let products = transformedProducts

        // First filter by category
        if (selectedCategory !== 'all') {
            products = products?.filter((product) => {
                // Try metafield first (product namespace, category key)
                const metafieldCategory = getProductMetafieldByNamespace(product, 'product', 'category')
                if (metafieldCategory && typeof metafieldCategory === 'string') {
                    return metafieldCategory === selectedCategory
                }
                // Try direct search for category key regardless of namespace
                const directCategorySearch = product.metafields?.find((m) => m.key === 'category')
                if (directCategorySearch && typeof directCategorySearch.value === 'string') {
                    return directCategorySearch.value === selectedCategory
                }
                // Fall back to product.category.name
                if (product.category?.name) {
                    return product.category.name === selectedCategory
                }
                // Fall back to product.type
                if (product.type) {
                    return product.type === selectedCategory
                }
                return false
            })
        }

        if (searchQuery.trim() !== '' && products) {
            return fuse.search(searchQuery).map((result) => result.item)
        }

        return products
    }, [transformedProducts, selectedCategory, searchQuery])

    // Product handlers - close cart when product is opened
    const handleProductSelect = (product: any) => {
        setSelectedProduct(product)
        setOrderHistoryIsOpen(false)
        setCartIsOpen(false) // Close cart when product is opened
    }

    // Cart handlers - close product when cart is opened
    const handleCartOpen = () => {
        setCartIsOpen(true)
        setOrderHistoryIsOpen(false)
        setSelectedProduct(null) // Close product when cart is opened
    }
    const handleCartClose = () => setCartIsOpen(false)

    const handleOrderHistoryOpen = () => {
        setOrderHistoryIsOpen(true)
        setCartIsOpen(false)
        setSelectedProduct(null)
    }

    const handleOrderHistoryClose = () => {
        setOrderHistoryIsOpen(false)
        setCartIsOpen(false)
        setSelectedProduct(null)
    }

    const handleValueChange = (value: string) => {
        // Use custom category change handler for filtering
        setSelectedCategory(value)
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query)
    }

    const ContentWrapper = useMemo(
        () => (appWindow?.size?.width && appWindow.size.width <= 768 ? ScrollArea : React.Fragment),
        [appWindow]
    )

    const fetchOrders = async () => {
        try {
            const { data } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/orders`, {
                headers: {
                    Authorization: `Bearer ${await getJwt()}`,
                },
            }).then((res) => res.json())
            setOrders(data)
        } catch (error) {
            console.error('Failed to fetch orders:', error)
            setOrders([])
        }
    }

    useEffect(() => {
        if (user) {
            fetchOrders()
        }
    }, [user])

    return (
        <div className="@container w-full h-full flex flex-col min-h-1">
            <HeaderBar
                showBack
                showForward
                onCartOpen={handleCartOpen}
                onCartClose={handleCartClose}
                isCartOpen={cartIsOpen}
                isOrderHistoryOpen={orderHistoryIsOpen}
                onOrderHistoryOpen={handleOrderHistoryOpen}
                onOrderHistoryClose={handleOrderHistoryClose}
                showCart
                showOrderHistory={orders?.length > 0}
                showSearch
                onSearch={handleSearch}
            />
            <AddressBar
                selectOptions={selectOptions}
                currentPath={currentPath}
                handleValueChange={handleValueChange}
                selectedCategory={selectedCategory}
            />
            {/* <DebugContainerQuery /> */}
            <ContentWrapper>
                <div data-scheme="secondary" className="flex flex-col @3xl:flex-row-reverse flex-grow min-h-0">
                    {(cartIsOpen || selectedProduct || orderHistoryIsOpen) && (
                        <motion.aside
                            data-scheme="secondary"
                            className="not-prose bg-primary border-l border-primary h-full text-primary relative"
                            style={{ width: asideWidth }}
                            initial={false}
                        >
                            <div className="h-full flex flex-col">
                                <div className="flex-1 overflow-auto">
                                    {cartIsOpen ? (
                                        <Cart className="h-full overflow-y-auto" />
                                    ) : orderHistoryIsOpen ? (
                                        <div className="h-full overflow-y-auto @container">
                                            <OrderHistory orders={orders} />
                                        </div>
                                    ) : selectedProduct ? (
                                        <ProductPanel
                                            product={selectedProduct}
                                            setIsCart={() => undefined} // Fix linter error - return undefined instead of empty function
                                            onClick={() => undefined} // Fix linter error - return undefined instead of empty function
                                            updateURL={handleProductSelect} // Allow navigation between products (URL will be updated automatically)
                                            onCartOpen={handleCartOpen} // Allow opening cart from product panel
                                            className="!p-4 !pt-4" // Override default padding
                                            containerWidth={asideWidth}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <motion.div
                                data-scheme="tertiary"
                                className="w-1.5 cursor-ew-resize top-0 left-0 !transform-none absolute z-20 h-full hover:bg-accent active:bg-accent"
                                drag="x"
                                dragMomentum={false}
                                dragConstraints={{ left: 0, right: 0 }}
                                onDrag={(_event, info) => {
                                    const newWidth = Math.max(
                                        Math.min(asideWidth - info.delta.x, (appWindow?.size?.width || 0) / 2),
                                        defaultAsideWidth
                                    )
                                    setAsideWidth(newWidth)
                                }}
                            />
                        </motion.aside>
                    )}

                    <main
                        data-app="Explorer"
                        data-scheme="primary"
                        className="@container flex-1 bg-primary relative h-full"
                    >
                        <ScrollArea className="h-full">
                            {/* <DebugContainerQuery /> */}
                            <div className={`${getProseClasses()} max-w-none h-full`}>
                                <SEO title="Merch - PostHog" image="/images/merch.png" />
                                {/* <Nav currentCollectionHandle={pageContext.handle} /> */}
                                {/* <ShippingBanner /> */}
                                <div className="flex gap-4">
                                    <div className="@container flex-1 not-prose">
                                        <ProductGrid
                                            products={filteredProducts}
                                            onProductClick={handleProductSelect}
                                            selectedProduct={selectedProduct}
                                        />
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </main>
                    {leftSidebarContent && (
                        <aside data-scheme="secondary" className="w-64 bg-primary border-r border-primary h-full">
                            <ScrollArea className="p-2">
                                <div className="space-y-3">
                                    <SidebarContent content={leftSidebarContent} />
                                </div>
                            </ScrollArea>
                        </aside>
                    )}
                </div>
            </ContentWrapper>
        </div>
    )
}
