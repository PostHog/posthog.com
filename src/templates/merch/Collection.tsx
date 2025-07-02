import Layout from 'components/Layout'
import React from 'react'
import { Nav } from './Nav'
import ProductGrid from './ProductGrid'
import { getProduct } from './transforms'
import { CollectionPageContext } from './types'
import SEO from 'components/seo'
import ShippingBanner from './ShippingBanner'
import Explorer from 'components/Explorer'
import OSButton from 'components/OSButton'
import * as Icons from '@posthog/icons'

type CollectionProps = {
    pageContext: CollectionPageContext
}

export default function Collection(props: CollectionProps): React.ReactElement {
    const { pageContext } = props

    const products = pageContext.productsForCurrentPage
    const transformedProducts = products?.map((p) => getProduct(p))

    return (
        <>
            <Explorer
                template="generic"
                slug={pageContext.handle}
                headerBarOptions={['showBack', 'showForward', 'showSearch', 'showCart']}
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
                <div className="w-full px-4 mx-auto max-w-7xl">
                    <ShippingBanner />
                    <ProductGrid products={transformedProducts} />
                </div>
            </Explorer>
        </>
    )
}
