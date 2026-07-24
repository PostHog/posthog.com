import React from 'react'
import { SEO } from 'components/seo'
import { CallToAction } from 'components/CallToAction'
import ResourceItem from 'components/Docs/ResourceItem'
import { docsMenu } from '../../navs'
import { useLayoutData } from 'components/Layout/hooks'
import QuickLinks from 'components/QuickLinks'
import { useStaticQuery } from 'gatsby'
import { graphql } from 'gatsby'
import AskMax from 'components/AskMax'
import Intro from 'components/Docs/Intro'
import ReaderView from 'components/ReaderView'
import { buildProductMenuTabs, ProductSwitcher } from 'components/Products/ReaderViewProduct'
import useProduct from 'hooks/useProduct'

type ProductAnalyticsProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    const {
        allDocsPages: { totalDocsCount },
    } = useStaticQuery(graphql`
        query {
            allDocsPages: allMdx(filter: { slug: { regex: "^/docs/" } }) {
                totalDocsCount: totalCount
            }
        }
    `)

    return (
        <>
            <Intro
                subheader="Getting started"
                title="Product analytics"
                description="Learn how to use product analytics to understand your users."
                buttonText="Installation guide"
                buttonLink="/docs/product-analytics/installation"
                imageColumnClasses="max-w-96"
                imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/PRODUCT_ANALYTICS_hog_23b2808c18.png"
            />

            <AskMax
                quickQuestions={[
                    "Why aren't my events showing up?",
                    'How do I send custom properties with an event?',
                    "What's the difference between events and actions?",
                    'What are person profiles and how are they billed?',
                ]}
            />

            {(quickLinks || compact) && (
                <QuickLinks
                    items={docsMenu.children.find(({ name }) => name.toLowerCase() === 'product analytics')?.children}
                />
            )}
            <section className="mb-12">
                <h3 className="mb-1 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="The complete guide to event tracking"
                        description="Set up your analytics foundation"
                        url="/tutorials/event-tracking-guide"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Track performance marketing"
                        description="Optimize ads and marketing channels"
                        url="/tutorials/performance-marketing"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Reduce churn"
                        description="The bread and butter of long-term growth"
                        url="/tutorials/churn-rate"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Track new and returning users"
                        description="Build cohorts and compare users"
                        url="/tutorials/track-new-returning-users"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Identify and analyze power users"
                        description="Find and understand your most engaged users"
                        url="/tutorials/power-users"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Calculate DAU/MAU ratio"
                        description="Popular engagement metrics that measure stickiness"
                        url="/tutorials/dau-mau-ratio"
                    />
                </ul>
                <CallToAction
                    to="/docs/product-analytics/tutorials"
                    type="custom"
                    size="md"
                    className="group !bg-accent dark:!bg-accent-dark !border-light dark:!border-dark"
                    childClassName="text-secondary group-hover:text-primary !bg-white dark:!bg-dark !border-light dark:!border-dark"
                    width="[calc(100%_+_3px)]"
                >
                    Explore guides
                </CallToAction>
            </section>
        </>
    )
}

const ProductAnalytics: React.FC<ProductAnalyticsProps> = () => {
    // PA has no contents/docs/.../index.mdx (unlike session replay), so Handbook
    // never serves this route – opt into the shared product tabs here instead.
    const productData = useProduct({ handle: 'product_analytics' })
    const menuTabs = buildProductMenuTabs({ productData, activeSurface: 'docs' })

    return (
        <ReaderView menuTabs={menuTabs} productSelect={<ProductSwitcher activeHandle="product_analytics" />}>
            <SEO title="Product analytics - Documentation - PostHog" />

            <Content />
        </ReaderView>
    )
}

export default ProductAnalytics
