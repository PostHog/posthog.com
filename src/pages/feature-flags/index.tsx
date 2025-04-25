import React from 'react'
import Layout from 'components/Layout'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import ProductSidebar from 'components/Explorer/ProductSidebar'
import Product from 'components/Explorer/Product'

export default function FeatureFlags(): JSX.Element {
    return (
        <>
            <SEO
                title="Feature Flags - PostHog"
                description="Release features safely with targeted rollouts"
                image={`/images/og/feature-flags.jpg`}
            />
            <Explorer
                template="product"
                slug="feature-flags"
                title="Release features safely"
                sidebarContent={<ProductSidebar type="feature_flags" />}
            >
                <p className="max-w-lg">Release features safely with targeted rollouts.</p>

                <p className="flex gap-2">
                    <CallToAction href="/signup" type="primary" size="md">
                        Get started
                    </CallToAction>
                    <CallToAction href="/talk-to-a-human" type="secondary" size="md">
                        Talk to a human
                    </CallToAction>
                </p>
                <Product
                    type="feature_flags"
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
