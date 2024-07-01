import StarUsBanner from 'components/StarUsBanner'
import React, { lazy, Suspense } from 'react'
import Layout from '../Layout'
import { SEO } from '../seo'
import Customers from './Customers'
import Hero from './Hero'
import { RenderInClient } from 'components/RenderInClient'
import Spinner from 'components/Spinner'
import usePostHog from '../../hooks/usePostHog'
import BillboardTruck from './BillboardTruck'

const Community = lazy(() => import('./Community'))
const CTA = lazy(() => import('./CTA'))
const Timeline = lazy(() => import('./Timeline'))
const Roadmap = lazy(() => import('./Roadmap'))
const Startups = lazy(() => import('./Startups'))
const AllInOne = lazy(() => import('./AllInOne'))
const ApiExamples = lazy(() => import('./ApiExamples'))
const HogQL = lazy(() => import('./HogQL'))
const CustomerData = lazy(() => import('./CustomerData'))
const CodeBlocks = lazy(() => import('./CodeBlocks'))
const Libraries = lazy(() => import('./Libraries'))
const OnePlatform = lazy(() => import('./OnePlatform'))
const NoHatingAllowed = lazy(() => import('./NoHatingAllowed'))

const Home = () => {
    const posthog = usePostHog()

    return (
        <>
            <StarUsBanner />
            <Layout>
                <SEO
                    title="PostHog - How developers build successful products"
                    description="PostHog is the only all-in-one platform for product analytics, feature flags, session replays, A/B testing, and surveys that's built for developers."
                    image="/images/home.png"
                />
                <Hero />
                <Customers />
                <Suspense fallback={<Spinner className="w-7 h-7 mx-auto my-12" />}>
                    <AllInOne />
                    <Libraries />
                    <CodeBlocks />
                    <NoHatingAllowed />
                </Suspense>

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

                <Suspense fallback={<Spinner className="w-7 h-7 mx-auto my-12" />}>
                    <ApiExamples />
                    <HogQL />
                    <Community />
                    <OnePlatform />
                    <CustomerData />
                    <Timeline />
                    <Roadmap />
                    <Startups />
                    <CTA />
                </Suspense>
            </Layout>
        </>
    )
}

export default Home
