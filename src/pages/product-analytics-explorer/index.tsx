import React from 'react'
import Layout from 'components/Layout'
import ProductProductAnalytics from 'components/Product/ProductAnalytics'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import ProductSidebar from 'components/Explorer/ProductSidebar'
import Product from 'components/Explorer/Product'

export default function ProductAnalytics(): JSX.Element {
    return (
        <>
            <SEO
                title="Product Analytics - PostHog"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Explorer
                template="product"
                slug="product-analytics"
                title="Product analytics with autocapture"
                // options below only needed to override matching the slug
                // teamName="product-analytics"
                // roadmapCategory="product-analytics"
                // changelogCategory="product-analytics"
                accentImage={
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-product-analytics.png"
                        alt="Screenshot of PostHog Product Analytics"
                        className="w-full"
                        placeholder="none"
                    />
                }
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
                leftSidebarContent={<ProductSidebar type="product_analytics" />}
            >
                <p className="max-w-lg">
                    PostHog is the only product analytics platform built to natively work with{' '}
                    <Link to="/session-replay">session replays</Link>, <Link to="/feature-flags">feature flags</Link>,{' '}
                    <Link to="/experiments">experiments</Link>, and <Link to="/surveys">surveys</Link>.
                </p>

                <p className="flex gap-2">
                    <CallToAction href="/signup" type="primary" size="md">
                        Get started
                    </CallToAction>
                    <CallToAction href="/talk-to-a-human" type="secondary" size="md">
                        Talk to a human
                    </CallToAction>
                </p>
                <Product
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
                    type="product_analytics"
                />
            </Explorer>
        </>
    )
}
