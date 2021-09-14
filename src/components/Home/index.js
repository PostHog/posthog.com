import React from 'react'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import { useValues } from 'kea'
import { SEO } from '../seo'
import Layout from '../Layout'
import Hero from './Hero'
import Customers from './Customers'
import BeforeAndAfter from './BeforeAndAfter'
import Features from './Features'
import Pipelines from './Pipelines'
import Quote from './Quote'
import Community from './Community'
import CTA from './CTA'

const Home = () => {
    useValues(posthogAnalyticsLogic) // mount this logic

    return (
        <Layout>
            <SEO
                title="PostHog - Open-Source Product Analytics"
                description="Self-hosted product analytics stack, to deploy on your infrastructure."
            />
            <main>
                <Hero />
                <Customers />
                <BeforeAndAfter />
                <Features />
                <Pipelines />
                <Quote />
                <Community />
                <CTA />
            </main>
        </Layout>
    )
}

export default Home
