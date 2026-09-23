import React, { useState, useMemo, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ProductGrid from './ProductGrid'
import { getProduct } from './transforms'
import { CollectionPageContext } from './types'
import SEO from 'components/seo'
import { ProductPanel } from './ProductPanel'
import { Cart } from './Cart'
import { getProductMetafieldByNamespace } from './utils'
import HeaderBar from 'components/OSChrome/HeaderBar'
import ReaderView from 'components/ReaderView'
import ViewerFilters from 'components/Viewer/ViewerFilters'
import { useWindow } from '../../context/Window'
import Fuse from 'fuse.js'
import { useApp } from '../../context/App'
import OrderHistory from 'components/Merch/OrderHistory'
import { useUser } from 'hooks/useUser'
import MobileDrawer from 'components/MobileDrawer'
import { useCartStore } from './store'

// Category configuration with display order
type CategoryKey = 'Apparel' | 'Stickers' | 'Goods' | 'Novelty'

const categoryConfig: Record<CategoryKey, { label: string; order: number; slug: string }> = {
    Apparel: { label: 'Apparel', order: 1, slug: 'apparel' },
    Stickers: { label: 'Stickers', order: 2, slug: 'stickers' },
    Goods: { label: 'Goods', order: 3, slug: 'goods' },
    Novelty: { label: 'Novelty', order: 4, slug: 'novelty' },
}

type CollectionProps = {
    pageContext: CollectionPageContext
}

// Helper function to get product by handle
function getProductFromHandle(products: any[], handle: string) {
    return products.find((p) => p.handle === handle) || null
}

// Category of a product, from its metafield if it has one, otherwise from its category or type
function getProductCategory(product: any): string | undefined {
    const metafieldCategory = getProductMetafieldByNamespace(product, 'product', 'category')
    if (typeof metafieldCategory === 'string') {
        return metafieldCategory
    }
    const directCategorySearch = product.metafields?.find((m: any) => m.key === 'category')
    if (typeof directCategorySearch?.value === 'string') {
        return directCategorySearch.value
    }
    return product.category?.name || product.type
}

function getProductCategorySlug(product: any): string | undefined {
    const category = getProductCategory(product)
    return category ? categoryConfig[category as CategoryKey]?.slug : undefined
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
        if (params.category) {
            url.searchParams.set('category', params.category)
        }

        window.history.pushState({}, '', url.toString())
    }
}

const defaultAsideWidth = 396

export default function Collection(props: CollectionProps): React.ReactElement {
    const { pageContext } = props
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [cartIsOpen, setCartIsOpen] = useState(false)
    const [orderHistoryIsOpen, setOrderHistoryIsOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
    const [hasInitialized, setHasInitialized] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [asideWidth, setAsideWidth] = useState(defaultAsideWidth)
    const [orders, setOrders] = useState([])
    const { appWindow } = useWindow()
    const { isMobile: appIsMobile } = useApp()
    const { getJwt, user } = useUser()
    const isMobile = appIsMobile || (appWindow?.size?.width && appWindow.size.width <= 768)
    const addToCart = useCartStore((state) => state.update)
    const hasProcessedAddToCart = useRef(false)

    const products = pageContext.productsForCurrentPage
    const transformedProducts = useMemo(() => products?.map((p) => getProduct(p)), [products])
    const fuse = useMemo(
        () =>
            new Fuse(transformedProducts || [], {
                keys: ['title', 'description', 'id'],
                includeMatches: true,
                threshold: 0.3,
            }),
        [transformedProducts]
    )

    // Initialize state from URL parameters on mount only
    useEffect(() => {
        if (typeof window !== 'undefined' && transformedProducts && !hasInitialized) {
            const urlParams = new URLSearchParams(window.location.search)
            const productHandle = urlParams.get('product')
            const state = urlParams.get('state')
            const addProductHandle = urlParams.get('add')
            const variantId = urlParams.get('variant')
            const quantity = parseInt(urlParams.get('qty') || '1', 10) || 1

            // Handle add to cart parameter (only once per page load)
            if (addProductHandle && !hasProcessedAddToCart.current) {
                const productToAdd = getProductFromHandle(transformedProducts, addProductHandle)
                if (productToAdd && productToAdd.variants?.length > 0) {
                    // Find the specific variant if provided, otherwise use first variant
                    let variantToAdd = productToAdd.variants[0]
                    if (variantId) {
                        const foundVariant = productToAdd.variants.find(
                            (v: any) => v.shopifyId === variantId || v.id === variantId
                        )
                        if (foundVariant) {
                            variantToAdd = foundVariant
                        }
                    }

                    // Add to cart
                    addToCart(variantToAdd, quantity)
                    hasProcessedAddToCart.current = true

                    // Open cart and clear the add parameter from URL
                    setCartIsOpen(true)
                    setSelectedProduct(null)

                    // Clean up the URL by removing add-related params
                    const cleanUrl = new URL(window.location.href)
                    cleanUrl.searchParams.delete('add')
                    cleanUrl.searchParams.delete('variant')
                    cleanUrl.searchParams.delete('qty')
                    cleanUrl.searchParams.set('state', 'cart')
                    window.history.replaceState({}, '', cleanUrl.toString())
                }
            } else if (productHandle) {
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
    }, [transformedProducts, hasInitialized, addToCart])

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

    // Only offer the categories that the products of this collection use
    const availableFilters = useMemo(() => {
        const foundCategories = new Set<string>()

        transformedProducts?.forEach((product) => {
            const category = getProductCategory(product)
            if (category && categoryConfig[category as CategoryKey]) {
                foundCategories.add(category)
            }
        })

        const categoryList = Array.from(foundCategories).sort(
            (a, b) => categoryConfig[a as CategoryKey].order - categoryConfig[b as CategoryKey].order
        )

        return [
            {
                label: 'Category',
                options: [
                    { label: 'All products', value: undefined },
                    ...categoryList.map((category) => ({
                        label: categoryConfig[category as CategoryKey].label,
                        value: categoryConfig[category as CategoryKey].slug,
                    })),
                ],
                filter: (product: any, value: any) => getProductCategorySlug(product) === value,
                operator: 'equals',
            },
        ]
    }, [transformedProducts])

    // Filter products based on selected category and search query
    const filteredProducts = useMemo(() => {
        let products = transformedProducts

        if (selectedCategory) {
            products = products?.filter((product) => getProductCategorySlug(product) === selectedCategory)
        }

        if (searchQuery.trim() !== '' && products) {
            return fuse.search(searchQuery).map((result) => result.item)
        }

        return products
    }, [transformedProducts, selectedCategory, searchQuery, fuse])

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

    const handleFilterChange = (filters: Record<string, { value: any }>) => {
        setSelectedCategory(filters.Category?.value)
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query)
    }

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

    const asidePanel = cartIsOpen ? (
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
    ) : null

    return (
        <div className="@container w-full h-full flex flex-col min-h-1 border-t border-primary">
            <SEO title="Merch - PostHog" image="/images/merch.png" />
            <HeaderBar
                showBack
                showForward
                showCustomLeft={<h1 className="text-primary">Merch store</h1>}
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
            <div data-scheme="secondary" className="flex flex-col @3xl:flex-row-reverse flex-grow min-h-0">
                {!isMobile && (cartIsOpen || selectedProduct || orderHistoryIsOpen) && (
                    <motion.aside
                        data-scheme="secondary"
                        className="not-prose bg-primary border-l border-primary h-full text-primary relative"
                        style={{ width: asideWidth }}
                        initial={false}
                    >
                        <div className="h-full flex flex-col">
                            <div className="flex-1 overflow-auto">{asidePanel}</div>
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

                {/* Mobile: use MobileDrawer */}
                {isMobile && (
                    <MobileDrawer
                        isOpen={cartIsOpen || selectedProduct !== null || orderHistoryIsOpen}
                        onClose={() => {
                            if (cartIsOpen) handleCartClose()
                            if (selectedProduct) setSelectedProduct(null)
                            if (orderHistoryIsOpen) handleOrderHistoryClose()
                        }}
                        title={
                            cartIsOpen
                                ? 'Cart'
                                : orderHistoryIsOpen
                                ? 'Order History'
                                : selectedProduct?.title || 'Product'
                        }
                    >
                        {asidePanel}
                    </MobileDrawer>
                )}

                <div className="flex-1 min-w-0 min-h-0">
                    <ReaderView
                        hideTitle
                        proseSize="lg"
                        showQuestions={false}
                        hideRightSidebar
                        hideLeftSidebar
                        hideMenu
                        defaultNavVisible={false}
                    >
                        <div className="w-full">
                            <ViewerFilters
                                availableFilters={availableFilters}
                                dataToFilter={transformedProducts || []}
                                handleFilterChange={handleFilterChange}
                            />
                            <div className="@container not-prose">
                                <ProductGrid
                                    products={filteredProducts}
                                    onProductClick={handleProductSelect}
                                    selectedProduct={selectedProduct}
                                />
                            </div>
                        </div>
                    </ReaderView>
                </div>
            </div>
        </div>
    )
}
