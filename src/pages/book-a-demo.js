import { CallToAction } from 'components/CallToAction/index.tsx'
import Contact from 'components/Contact'
import { Title } from 'components/Pricing/PricingTable/Plan'
import { SEO } from 'components/seo'
import Intro from 'components/SignUp/Intro'
import Layout from 'components/SignUp/Layout'
import { useValues } from 'kea'
import usePostHog from '../hooks/usePostHog'
import React, { useEffect, useState } from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const Editions = ({ setDemoType }) => {
    return (
        <>
            <Intro title="Book a PostHog demo" />
            <div className="max-w-[600px] mx-auto grid md:grid-cols-2 grid-cols-1 gap-x-6">
                <div className="pb-6 md:pt-0 pt-6 justify-self-end w-full">
                    <div className="flex flex-col space-y-4">
                        <Title
                            title="Open Source (free)"
                            subtitle="No event limit. Self-hosted product that includes basic analytics."
                        />
                    </div>
                    <CallToAction
                        width="full"
                        className="mt-4 pt-6 box-border"
                        type="secondary"
                        onClick={() => open('https://www.loom.com/share/a75bad1edd1f4a97b90dc8d50e69e98d')}
                        event={{ name: 'book a demo: clicked recorded demo' }}
                    >
                        <StaticImage src="../images/loom-screenshot.gif" alt="Loom demo" />
                        <div className="pt-1">Watch a recorded demo</div>
                    </CallToAction>
                </div>
                <div className="md:order-none order-first md:pl-6 pb-6 md:border-l md:border-b-0 border-b border-gray-accent-light border-dashed">
                    <div className="flex flex-col md:space-y-10 space-y-6">
                        <div className="space-y-4 w-full">
                            <Title
                                title="Full feature set (paid)"
                                subtitle="First million events per month free. Cloud (Saas). All of PostHog's advanced analytics tools."
                            />
                            <CallToAction
                                width="full"
                                className="box-border"
                                type="primary"
                                onClick={() => setDemoType('demo')}
                                event={{ name: 'book a demo: clicked paid demo' }}
                            >
                                Request a personalized demo
                            </CallToAction>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-2 pt-6 border-t border-dashed border-gray-accent-light text-center">
                    <h3 className="m-0">Have a few questions?</h3>
                    <h3 className="m-0"> Want to self-host?</h3>
                    <p className="m-0 mt-1 text-black/50 font-medium text-sm">
                        Book a quick Q&A with someone from the PostHog team!
                    </p>
                    <div className="md:max-w-[280px] w-full mx-auto">
                        <CallToAction
                            width="full"
                            className="mt-4 box-border"
                            type="secondary"
                            onClick={() => setDemoType('qa')}
                            event={{ name: 'book a demo: clicked qa' }}
                        >
                            Book 15 minutes
                        </CallToAction>
                    </div>
                </div>
            </div>
        </>
    )
}

const Book = ({ demoType }) => {
    return (
        <>
            <Intro>
                <Contact activeTab={demoType} />
            </Intro>
        </>
    )
}

export default function SelfHost({ location }) {
    const initialCrumbs = [
        {
            title: 'Select edition',
        },
    ]
    const posthog = usePostHog()
    const [demoType, setDemoType] = useState(location.state?.demoType)
    const [crumbs, setCrumbs] = useState(initialCrumbs)

    useEffect(() => {
        if (demoType) {
            setCrumbs((crumbs) => [
                {
                    title: 'Select edition',
                    onClick: () => setDemoType(null),
                },
                { title: 'Book a demo' },
            ])
        } else {
            setCrumbs(initialCrumbs)
        }
    }, [demoType])
    return (
        <Layout crumbs={[...crumbs]}>
            <SEO title="Book a demo – PostHog" />
            <section className="px-4">
                {demoType ? <Book demoType={demoType} /> : <Editions setDemoType={setDemoType} />}
            </section>
        </Layout>
    )
}
