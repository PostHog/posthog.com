import StarUsBanner from 'components/StarUsBanner'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import React from 'react'
import Layout from '../Layout'
import { SEO } from '../seo'
import BeforeAndAfter from './BeforeAndAfter'
import Community from './Community'
import CTA from './CTA'
import Customers from './Customers'
import Features from './Features'
import Hero from './Hero'
import Pipelines from './Pipelines'
import Quote from './Quote'
import Tutorials from './Tutorials'

const Home = () => {
    useValues(posthogAnalyticsLogic) // mount this logic

    return (
        <>
            <StarUsBanner />
            <Layout>
                <SEO
                    title="PostHog - Host your own product analytics"
                    description="PostHog is the all-in-one platform for building better products. Heatmaps, funnels, feature flags, session replays and more. Try for free."
                    image="/images/home.png"
                />
                <Hero />
                <Customers />
                <BeforeAndAfter />
                <Features
                    title={
                        <>
                            Everything product-led teams need <span className="text-yellow">in one place</span>
                        </>
                    }
                />
                <Pipelines />
                <Quote />
                <Community />
                <Tutorials
                    title="Tutorials"
                    subtitle="See PostHog in action."
                    cta={{ url: '/docs/tutorials', title: 'Explore all tutorials' }}
                />
                <CTA />
            </Layout>
        </>
    )
}

export default Home
