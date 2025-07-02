import Layout from 'components/Layout'
import React, { useState } from 'react'
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


type CollectionProps = {
    pageContext: CollectionPageContext
}

export default function Collection(props: CollectionProps): React.ReactElement {
    const { pageContext } = props
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [cartIsOpen, setCartIsOpen] = useState(false)

    const products = pageContext.productsForCurrentPage
    const transformedProducts = products?.map((p) => getProduct(p))

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
                        updateURL={handleProductSelect} // Allow navigation between products
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
                            products={transformedProducts}
                            onProductClick={handleProductSelect}
                            selectedProduct={selectedProduct}
                        />
                    </div>
                </div>
            </Explorer>
        </>
    )
}
