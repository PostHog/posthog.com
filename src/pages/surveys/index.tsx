import React from 'react'
import Layout from 'components/Layout'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import ProductSidebar from 'components/Explorer/ProductSidebar'
import Product from 'components/Explorer/Product'

export default function Surveys(): JSX.Element {
    return (
        <>
            <SEO
                title="Surveys - PostHog"
                description="Get qualitative feedback from the right users at the right time"
                image={`/images/og/surveys.jpg`}
            />
            <Explorer
                template="product"
                slug="surveys"
                title="Get feedback from users"
                sidebarContent={<ProductSidebar type="surveys" />}
            >
                <p className="max-w-lg">
                    Trigger on-page surveys based on product activity – like people who use a feature or visit a certain
                    page.
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
                    type="surveys"
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
