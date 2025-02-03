import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState } from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import List from 'components/List'
import ResourceItem from 'components/Docs/ResourceItem'
import { CallToAction } from 'components/CallToAction'
import { docsMenu } from '../../navs'
import { useLayoutData } from 'components/Layout/hooks'
import QuickLinks from 'components/QuickLinks'
import Intro from 'components/Docs/Intro'
import AskMax from 'components/AskMax'

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    return (
        <>
            {(quickLinks || compact) && <QuickLinks items={docsMenu.children[7].children} />}
            <section className="mb-12">
                <h3 className="m-0 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="How to set up Stripe reports"
                        description="Connect your revenue data from Stripe to PostHog"
                        url="/tutorials/stripe-reports"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to set up Hubspot reports"
                        description="Connect your sales data from Hubspot to PostHog"
                        url="/tutorials/hubspot-reports"
                    />
                    <ResourceItem
                        type="Guide"
                        title="The power of HogQL’s sum() aggregation"
                        description="Unlock a new level of aggregation customization"
                        url="/tutorials/hogql-sum-aggregation"
                    />
                </ul>
            </section>
        </>
    )
}

const DataWarehouse: React.FC = () => {
    return (
        <Layout>
            <SEO title="Data warehouse - Docs - PostHog" />

            <PostLayout title={'Data warehouse'} hideSurvey hideSidebar>
                <Intro
                    subheader="Getting started"
                    title="Data warehouse"
                    description="A single source for all your important data."
                    buttonText="Link your first source"
                    buttonLink="/docs/cdp/sources"
                    imageColumnClasses="mt-4 md:-mt-8"
                    imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/data-warehouse/warehouse-hog.png"
                    imageClasses="max-h-48 md:max-h-64"
                />

                <AskMax
                    quickQuestions={[
                        'What are some cool things I can do?',
                        'What is HogQL and why should I use it?',
                        'How can I get external data into PostHog?',
                    ]}
                />
                <Content />
                <CallToAction to="/docs/data-warehouse/query" width="full">
                    Visit the manual
                </CallToAction>
            </PostLayout>
        </Layout>
    )
}

export default DataWarehouse
