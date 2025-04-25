import React from 'react'
import Layout from 'components/Layout'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import ProductSidebar from 'components/Explorer/ProductSidebar'
import Product from 'components/Explorer/Product'

export default function DataWarehouse(): JSX.Element {
    return (
        <>
            <SEO
                title="Data Warehouse - PostHog"
                description="Query your data with SQL in our lightning-fast data warehouse"
                image={`/images/og/data-warehouse.jpg`}
            />
            <Explorer
                template="product"
                slug="data-warehouse"
                title="Query your data with SQL"
                sidebarContent={<ProductSidebar type="data_warehouse" />}
            >
                <p className="max-w-lg">A single source for all your important data.</p>

                <p className="flex gap-2">
                    <CallToAction href="/signup" type="primary" size="md">
                        Get started
                    </CallToAction>
                    <CallToAction href="/talk-to-a-human" type="secondary" size="md">
                        Talk to a human
                    </CallToAction>
                </p>
                <Product
                    type="data_warehouse"
                    indexLinks={[
                        'features',
                        'pricing',
                        'customers',
                        'comparison',
                        'docs',
                        'tutorials',
                        'questions',
                        'team',
                        'roadmap',
                        'changelog',
                    ]}
                />
            </Explorer>
        </>
    )
}
