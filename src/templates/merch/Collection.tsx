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
                sidebarContent={[
                    {
                        title: 'About PostHog',
                        content: (
                            <>
                                <p className="text-sm mb-2">
                                    <strong>We have 10+ products today</strong> – but even if we don't have it yet, we
                                    will eventually. We are going to build every piece of SaaS you need to make your
                                    product successful.
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
                        title: 'Product OS',
                        content: (
                            <>
                                <p className="text-sm mb-2">
                                    Build and scale your product with our complete open source product operating system.
                                </p>
                                <p className="text-sm mb-2">
                                    All our products are built on it, and it offers many features available to all of
                                    our products, like:
                                </p>
                                <ul className="pl-4 mb-4 [&_li]:text-sm">
                                    <li>Autocapture</li>
                                    <li>Webhooks</li>
                                    <li>Reverse proxy</li>
                                    <li>API</li>
                                    <li>SQL access</li>
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
                        title: 'Add-ons',
                        content: (
                            <>
                                <p className="text-sm mb-2">
                                    Our a-la-carte model means you can pick and choose the features you need without
                                    paying for anything you don't.
                                </p>
                                <p className="mb-2">
                                    <strong>Available add-ons:</strong>
                                </p>
                                <ul className="pl-4 mb-4 [&_li]:text-sm">
                                    <li>Teams features</li>
                                    <li>Person profiles (identify users)</li>
                                    <li>Group analytics</li>
                                    <li>Data pipelines</li>
                                </ul>
                                <OSButton
                                    variant="underline"
                                    asLink
                                    align="left"
                                    width="full"
                                    size="md"
                                    to="/addons"
                                    icon={<Icons.IconPuzzle className="text-purple" />}
                                >
                                    Learn about add-ons
                                </OSButton>
                            </>
                        ),
                    },
                ]}
            >
                <SEO title="Merch - PostHog" image="/images/merch.png" />
                <Nav currentCollectionHandle={pageContext.handle} />
                <div className="p-4 flex gap-4">
                    <div className="flex-1">
                        <DebugContainerQuery />
                        <ShippingBanner />
                        <ProductGrid products={transformedProducts} onProductClick={handleProductSelect} />
                    </div>
                    {selectedProduct && (
                        <aside className="w-[400px] bg-accent border-l border-primary">
                            <div className="h-full flex flex-col">
                                <div className="flex items-center justify-between p-4 border-b border-primary">
                                    <h3 className="font-semibold text-lg">Product Details</h3>
                                    <button
                                        onClick={handleProductClose}
                                        className="text-primary hover:text-red transition-colors text-xl"
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <ProductPanel
                                        product={selectedProduct}
                                        setIsCart={() => { }} // Not used in sidebar mode
                                        onClick={() => { }} // Not used in sidebar mode
                                        updateURL={handleProductSelect} // Allow navigation between products
                                        className="!p-4 !pt-4" // Override default padding
                                    />
                                </div>
                            </div>
                        </aside>
                    )}
                </div>
            </Explorer>
        </>
    )
}
