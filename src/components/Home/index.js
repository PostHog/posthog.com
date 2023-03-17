import StarUsBanner from 'components/StarUsBanner'
import React from 'react'
import Layout from '../Layout'
import { SEO } from '../seo'
import Community from './Community'
import CTA from './CTA'
import Customers from './Customers'
import Hero from './Hero'
import Pipelines from './Pipelines'
import Timeline from './Timeline'
import Roadmap from './Roadmap'
import Quote from './Quote'
import Tutorials from './Tutorials'
import usePostHog from '../../hooks/usePostHog'
import AllInOne from './AllInOne'
import Builders from './Builders'
import Pricing from './Pricing'
import CustomerData from './CustomerData'

const Home = () => {
    usePostHog()

    return (
        <>
            <StarUsBanner />
            <Layout>
                <SEO
                    title="PostHog - The open source Product OS"
                    description="PostHog is the all-in-one platform for building better products - with product analytics, feature flags, session recordings, a/b testing, heatmaps, and more."
                    image="/images/home.png"
                />
                <Hero />
                <Customers />
                <AllInOne />
                <Builders />
                <Pricing />
                <CustomerData />
                <Timeline />
                <Roadmap />
                <Quote />
                <Community />
                <Tutorials
                    title="Tutorials"
                    subtitle="See PostHog in action"
                    cta={{ url: '/tutorials', title: 'Explore all tutorials' }}
                />
                <CTA />
            </Layout>
        </>
    )
}

export default Home
