import Layout from 'components/Layout'
import React, { useState, useMemo, useEffect } from 'react'
import { Nav } from './Nav'
import ProductGrid from './ProductGrid'
import { getProduct } from './transforms'
import { CollectionPageContext } from './types'
import SEO from 'components/seo'
import ShippingBanner from './ShippingBanner'
import Explorer from 'components/Explorer'
import OSButton from 'components/OSButton'
import * as Icons from '@posthog/icons'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import { ProductPanel } from './ProductPanel'
import { Cart } from './Cart'
import { getProductMetafieldByNamespace } from './utils'
import { IconShop, IconShirt, IconSticker, IconMug, IconCouch } from 'components/OSIcons/Icons'

// Category configuration with icons and display order
type CategoryKey = 'all' | 'Apparel' | 'Stickers' | 'Goods' | 'Novelty'

const categoryConfig: Record<CategoryKey, { label: string; icon: string; color: string; order: number }> = {
    'all': { label: 'All products', icon: 'IconShop', color: 'blue', order: 1 },
    'Apparel': { label: 'Apparel', icon: 'IconShirt', color: 'purple', order: 2 },
    'Stickers': { label: 'Stickers', icon: 'IconSticker', color: 'yellow', order: 3 },
    'Goods': { label: 'Goods', icon: 'IconMug', color: 'orange', order: 4 },
    'Novelty': { label: 'Novelty', icon: 'IconCouch', color: 'teal', order: 5 },
}

type CollectionProps = {
    pageContext: CollectionPageContext
}

// Helper function to get product by handle
function getProductFromHandle(products: any[], handle: string) {
    return products.find((p) => p.handle === handle) || null
}

// Helper function to update URL without triggering navigation
function updateURL(params: { product?: string; state?: string }) {
    if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)

        // Clear existing params
        url.searchParams.delete('product')
        url.searchParams.delete('state')

        // Set new params
        if (params.product) {
            url.searchParams.set('product', params.product)
        }
        if (params.state) {
            url.searchParams.set('state', params.state)
        }

        window.history.pushState({}, '', url.toString())
    }
}

export default function Collection(props: CollectionProps): React.ReactElement {
    const { pageContext } = props
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [cartIsOpen, setCartIsOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [hasInitialized, setHasInitialized] = useState(false)

    const products = pageContext.productsForCurrentPage
    const transformedProducts = products?.map((p) => getProduct(p))

    // Initialize state from URL parameters on mount only
    useEffect(() => {
        if (typeof window !== 'undefined' && transformedProducts && !hasInitialized) {
            const urlParams = new URLSearchParams(window.location.search)
            const productHandle = urlParams.get('product')
            const state = urlParams.get('state')

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

    // Update URL when selectedProduct or cartIsOpen changes (only after initialization)
    useEffect(() => {
        if (typeof window !== 'undefined' && hasInitialized) {
            if (selectedProduct) {
                updateURL({ product: selectedProduct.handle })
            } else if (cartIsOpen) {
                updateURL({ state: 'cart' })
            } else {
                updateURL({})
            }
        }
    }, [selectedProduct, cartIsOpen, hasInitialized])

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
                const directCategorySearch = product.metafields?.find(m => m.key === 'category')
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
            .filter(category => categoryConfig[category as CategoryKey]) // Only include configured categories
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

    // Filter products based on selected category
    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'all') {
            return transformedProducts
        }

        return transformedProducts?.filter((product) => {
            // Try metafield first (product namespace, category key)
            const metafieldCategory = getProductMetafieldByNamespace(product, 'product', 'category')
            if (metafieldCategory && typeof metafieldCategory === 'string') {
                return metafieldCategory === selectedCategory
            }
            // Try direct search for category key regardless of namespace
            const directCategorySearch = product.metafields?.find(m => m.key === 'category')
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
    }, [transformedProducts, selectedCategory])

    // Product handlers - close cart when product is opened
    const handleProductSelect = (product: any) => {
        setSelectedProduct(product)
        setCartIsOpen(false) // Close cart when product is opened
    }
    const handleProductClose = () => setSelectedProduct(null)

    // Cart handlers - close product when cart is opened
    const handleCartOpen = () => {
        setCartIsOpen(true)
        setSelectedProduct(null) // Close product when cart is opened
    }
    const handleCartClose = () => setCartIsOpen(false)

    return (
        <>
            <Explorer
                template="generic"
                slug={pageContext.handle}
                headerBarOptions={['showBack', 'showForward', 'showSearch', 'showCart']}
                padding={false}
                showTitle={false}
                selectOptions={selectOptions}
                onCategoryChange={setSelectedCategory}
                selectedCategory={selectedCategory}
                cartHandlers={{
                    onCartOpen: handleCartOpen,
                    onCartClose: handleCartClose,
                    isCartOpen: cartIsOpen
                }}
                cartContent={<Cart className="h-full overflow-y-auto" />}
                productHandlers={{
                    onProductClose: handleProductClose,
                    selectedProduct: selectedProduct
                }}
                productContent={selectedProduct && (
                    <ProductPanel
                        product={selectedProduct}
                        setIsCart={() => { }} // Not used in sidebar mode
                        onClick={() => { }} // Not used in sidebar mode
                        updateURL={handleProductSelect} // Allow navigation between products (URL will be updated automatically)
                        onCartOpen={handleCartOpen} // Allow opening cart from product panel
                        className="!p-4 !pt-4" // Override default padding
                    />
                )}
                sidebarContent={[
                    {
                        title: 'About our merch',
                        content: (
                            <>
                                <p className="text-sm mb-2">
                                    A tech startup with merch you actually want to wear? Now that's a novel idea...
                                </p>
                                <p className="text-sm mb-0">
                                    <OSButton
                                        variant="underline"
                                        asLink
                                        align="left"
                                        width="full"
                                        size="md"
                                        to="/why"
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
                    {
                        title: 'Missing a product?',
                        content: (
                            <>
                                <p className="text-sm mb-2">
                                    Submit a product request on GitHub.
                                </p>

                                <OSButton
                                    variant="underline"
                                    asLink
                                    align="left"
                                    width="full"
                                    size="md"
                                    to="/product-os"
                                    icon={<Icons.IconStack className="text-salmon" />}
                                >
                                    RFP (request for product)
                                </OSButton>
                            </>
                        ),
                    },
                ]}
            >
                <SEO title="Merch - PostHog" image="/images/merch.png" />
                <Nav currentCollectionHandle={pageContext.handle} />
                <ShippingBanner />
                <div className="flex gap-4">
                    <div className="@container flex-1 not-prose">
                        <DebugContainerQuery />
                        <ProductGrid
                            products={filteredProducts}
                            onProductClick={handleProductSelect}
                            selectedProduct={selectedProduct}
                        />
                    </div>
                </div>
            </Explorer>
        </>
    )
}
