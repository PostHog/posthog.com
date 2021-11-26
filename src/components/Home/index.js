import GiveBackFriday from 'components/GiveBackFriday'
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
        <Layout>
            <SEO
                title="PostHog - Open-Source Product Analytics"
                description="Self-hosted product analytics stack, to deploy on your infrastructure."
            />
            <GiveBackFriday />
            <Hero />
            <Customers />
            <BeforeAndAfter />
            <Features />
            <Pipelines />
            <Quote />
            <Community />
            <Tutorials />
            <CTA />
        </Layout>
    )
}

export default Home
