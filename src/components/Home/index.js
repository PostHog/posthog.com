import StarUsBanner from 'components/StarUsBanner'
import React from 'react'
import Layout from '../Layout'
import { SEO } from '../seo'
import BeforeAndAfter from './BeforeAndAfter'
import Community from './Community'
import CTA from './CTA'
import Customers from './Customers'
import Features from './Features'
import Hero from './Hero'
import Apps from './Apps'
import Pipelines from './Pipelines'
import Timeline from './Timeline'
import Roadmap from './Roadmap'
import Quote from './Quote'
import Tutorials from './Tutorials'
import usePostHog from '../../hooks/usePostHog'

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
                <BeforeAndAfter />
                <Apps />
                <Pipelines />
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
