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
import Startups from './Startups'
import Tutorials from './Tutorials'
import usePostHog from '../../hooks/usePostHog'
import AllInOne from './AllInOne'
import ApiExamples from './ApiExamples'
import HogQL from './HogQL'
import CustomerData from './CustomerData'
import CodeBlocks from './CodeBlocks'
import OnePlatform from './OnePlatform'
import NoHatingAllowed from './NoHatingAllowed'
import BillboardTruck from './BillboardTruck'

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
                <CodeBlocks />
                <OnePlatform />
                <NoHatingAllowed />
                <BillboardTruck /> {/* leftHandDrive={true} */}
                <ApiExamples />
                <HogQL />
                <Community />
                <CustomerData />
                <Timeline />
                <Roadmap />
                <Startups />
                {/*<Tutorials
                    title="Latest tutorials"
                    subtitle="Fresh from our keyboards"
                    cta={{ url: '/tutorials', title: 'Explore all tutorials' }}
                />*/}
                <div className="relative">
                    <CTA />
                </div>
            </Layout>
        </>
    )
}

export default Home
