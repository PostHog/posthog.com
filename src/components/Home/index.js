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
import Timeline from './Timeline'
import Quote from './Quote'
import Tutorials from './Tutorials'

const Home = () => {
    useValues(posthogAnalyticsLogic) // mount this logic

    return (
        <>
            <StarUsBanner />
            <Layout>
                <SEO
                    title="PostHog - The self-hosted product analytics platform"
                    description="PostHog is the all-in-one, open-source analytics platform for building better products. Try for free."
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
                <Timeline />
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
