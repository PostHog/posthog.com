import { CallToAction } from 'components/CallToAction/index.js'
import Contact from 'components/Contact'
import { Title } from 'components/Pricing/PricingTable/Plan'
import { SEO } from 'components/seo'
import Intro from 'components/SignUp/Intro'
import Layout from 'components/SignUp/Layout'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import React, { useEffect, useState } from 'react'

const Editions = ({ setDemoType }) => {
    return (
        <>
            <Intro title="Select edition" />
            <div className="max-w-[600px] mx-auto grid md:grid-cols-2 grid-cols-1 gap-x-6">
                <div className="pb-6 md:pt-0 pt-6 justify-self-end w-full">
                    <div className="flex flex-col space-y-4">
                        <Title title="Open Source" subtitle="Free, limited to one project" />
                    </div>
                    <CallToAction
                        width="full"
                        className="mt-4 box-border"
                        type="secondary"
                        onClick={() => setDemoType('group')}
                        event={{ name: 'book a demo: clicked group demo' }}
                    >
                        Join a group demo
                    </CallToAction>
                </div>
                <div className="md:order-none order-first md:pl-6 pb-6 md:border-l md:border-b-0 border-b border-gray-accent-light border-dashed">
                    <div className="flex flex-col md:space-y-10 space-y-6">
                        <div className="space-y-4 w-full">
                            <Title title="PostHog Cloud" subtitle="For large userbases or event volumes" />
                            <CallToAction
                                width="full"
                                className="box-border"
                                type="primary"
                                onClick={() => setDemoType('scale')}
                                event={{ name: 'book a demo: clicked scale demo' }}
                            >
                                Book a personalized demo
                            </CallToAction>
                        </div>
                        <div className="space-y-4 w-full">
                            <Title title="Self-Hosted" subtitle="A focus on compliance and security" />
                            <CallToAction
                                width="full"
                                className="box-border"
                                type="primary"
                                onClick={() => setDemoType('enterprise')}
                                event={{ name: 'book a demo: clicked enterprise demo' }}
                            >
                                Book a personalized demo
                            </CallToAction>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-2 pt-6 border-t border-dashed border-gray-accent-light text-center">
                    <h3 className="m-0">Not sure if PostHog is right for you?</h3>
                    <p className="m-0 mt-1 text-black/50 font-medium text-sm">
                        Book a quick QA with someone from the PostHog team!
                    </p>
                    <div className="md:max-w-[280px] w-full mx-auto">
                        <CallToAction
                            width="full"
                            className="mt-4 box-border"
                            type="secondary"
                            onClick={() => setDemoType('qa')}
                            event={{ name: 'book a demo: clicked qa' }}
                        >
                            Meet PostHog
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
            <Intro title="Book a demo">
                <Contact hideTabs demoType={demoType} />
            </Intro>
        </>
    )
}

export default function SelfHost() {
    const initialCrumbs = [
        {
            title: 'Select edition',
        },
    ]
    const { posthog } = useValues(posthogAnalyticsLogic)
    const [demoType, setDemoType] = useState(null)
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
            <SEO title="Select edition - PostHog" />
            <section className="px-4">
                {demoType ? <Book demoType={demoType} /> : <Editions setDemoType={setDemoType} />}
            </section>
        </Layout>
    )
}
