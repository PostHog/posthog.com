import StarUsBanner from 'components/StarUsBanner'
import React, { useState } from 'react'
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
import { CallToAction } from 'components/CallToAction'
import { RadioGroup } from 'components/RadixUI/RadioGroup'
import { navigate } from 'gatsby'
import { Link } from 'gatsby'
import Logo from 'components/Logo'

const menuOptions = [
    {
        label: 'Try it – free',
        value: '/signup',
        default: true,
    },
    {
        label: 'Install with AI',
        value: '/ai-install',
    },
    {
        label: 'Talk to a human',
        value: '/contact-sales',
    },
]

const Home = () => {
    const posthog = usePostHog()
    const [selectedOption, setSelectedOption] = useState(menuOptions[0].value)

    const handleContinue = () => {
        if (selectedOption) {
            navigate(selectedOption)
        }
    }

    return (
        <>
            <StarUsBanner />
            <SEO
                title="PostHog - How developers build successful products"
                description="PostHog is the only all-in-one platform for product analytics, feature flags, session replays, experiments, and surveys that's built for developers."
                image="/images/home.png"
            />

            <div data-scheme="secondary" className="w-full h-full bg-primary flex flex-col">
                <div className="flex flex-1 w-full border-y border-primary">
                    <div
                        data-scheme="primary"
                        className="w-[40%] flex items-center justify-center p-2 border-r border-primary"
                    >
                        <div className="w-full bg-accent flex items-center justify-center h-full text-sm relative border border-primary overflow-hidden">
                            <img
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/3000_773e0d4c49.png"
                                className=""
                            />
                            <img
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/yc_approved_347c12b8e6.png"
                                className="absolute -right-24 top-6 rotate-[45deg]"
                            />
                        </div>
                    </div>
                    <div className="w-[60%] flex flex-col justify-center px-8 py-4">
                        <Logo className="h-10 mb-4" />
                        <h1 className="text-xl font-bold mb-1">The toolkit for building successful products</h1>
                        <p className="text-secondary text-[15px]">
                            PostHog is the single platform to build products, talk to users, and ship new features
                        </p>
                        <div className="mt-4">
                            <RadioGroup
                                title="Menu options"
                                options={menuOptions}
                                value={selectedOption}
                                onValueChange={setSelectedOption}
                            />

                            <div className="mt-6 text-sm border-t border-primary pt-6">
                                You can also{' '}
                                <Link to="/tour" className="text-red font-semibold">
                                    take a tour
                                </Link>{' '}
                                or learn{' '}
                                <Link to="/#" className="text-red font-semibold">
                                    why our website looks like this
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-scheme="primary" className="w-full flex justify-end p-2 bg-accent">
                    <CallToAction type="secondary" size="sm" onClick={handleContinue}>
                        Continue
                    </CallToAction>
                </div>
            </div>

            {/* 
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
                <div className="relative">
                    <CTA />
                </div>
                 */}
        </>
    )
}

export default Home
