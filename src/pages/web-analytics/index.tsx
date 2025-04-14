import React from 'react'
import Layout from 'components/Layout'
import ProductProductAnalytics from 'components/Product/ProductAnalytics'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import ProductSidebar from 'components/Explorer/ProductSidebar'

export default function WebAnalytics(): JSX.Element {
    return (
        <>
            <SEO
                title="Web analytics - PostHog"
                description="It's like Google Analytics 3, but it still exists..."
                image={`/images/og/web-analytics.jpg`}
            />
            <Explorer
                template="product"
                slug="web-analytics"
                title="Monitor your website traffic"
                // options below only needed to override matching the slug
                // teamName="product-analytics"
                // roadmapCategory="product-analytics"
                // changelogCategory="product-analytics"
                accentImage={
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_web_analytics_2a101a8558.png"
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
                sidebarContent={<ProductSidebar type="web_analytics" />}
            >
                <p className="max-w-lg">Web analytics for people who really liked GA3...</p>

                <p className="flex gap-2">
                    <CallToAction href="/signup" type="primary" size="md">
                        Get started
                    </CallToAction>
                    <CallToAction href="/talk-to-a-human" type="secondary" size="md">
                        Talk to a human
                    </CallToAction>
                </p>
            </Explorer>
        </>
    )
}
