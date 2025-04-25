import React from 'react'
import Layout from 'components/Layout'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import ProductSidebar from 'components/Explorer/ProductSidebar'
import Product from 'components/Explorer/Product'

export default function ErrorTracking(): JSX.Element {
    return (
        <>
            <SEO
                title="Error Tracking - PostHog"
                description="Find and track errors in your product"
                image={`/images/og/error-tracking.jpg`}
            />
            <Explorer
                template="product"
                slug="error-tracking"
                title="Find and fix errors"
                sidebarContent={<ProductSidebar type="error_tracking" />}
            >
                <p className="max-w-lg">Find and track errors in your product.</p>

                <p className="flex gap-2">
                    <CallToAction href="/signup" type="primary" size="md">
                        Get started
                    </CallToAction>
                    <CallToAction href="/talk-to-a-human" type="secondary" size="md">
                        Talk to a human
                    </CallToAction>
                </p>
                <Product
                    type="error_tracking"
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
