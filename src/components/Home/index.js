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
import Libraries from './Libraries'
import OnePlatform from './OnePlatform'
import NoHatingAllowed from './../NoHatingAllowed'
import { RenderInClient } from 'components/RenderInClient'
import BillboardTruck from './BillboardTruck'
import Spinner from 'components/Spinner'
import { HomepageCards } from '../NoHatingAllowed/data.js'
import TimelineNew from './TimelineNew'

const Home = () => {
    const posthog = usePostHog()

    return (
        <>
            <StarUsBanner />
            <Layout>
                <SEO
                    title="PostHog - How developers build successful products"
                    description="PostHog is the only all-in-one platform for product analytics, feature flags, session replays, experiments, and surveys that's built for developers."
                    image="/images/home.png"
                />
                <Hero />
                <Customers />
                <AllInOne />
                <TimelineNew />
                <Libraries />
                <CodeBlocks />
                <NoHatingAllowed data={HomepageCards} youllHate="PostHog" size="text-4xl lg:text-6xl" />

                <RenderInClient
                    render={() => {
                        return posthog?.getFeatureFlag?.('homepage-billboard-truck') === true ? (
                            <BillboardTruck leftHandDrive />
                        ) : (
                            <BillboardTruck />
                        )
                    }}
                    placeholder={
                        <div>
                            <Spinner className="w-7 h-7 mx-auto my-12" />
                        </div>
                    }
                />

                <ApiExamples />
                <HogQL />
                <Community />
                <OnePlatform />
                <CustomerData />
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
