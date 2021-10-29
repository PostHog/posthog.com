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
            <div className="flex justify-center flex-col md:flex-row divide-y-1 md:divide-y-0 md:divide-x-1 divide-dashed divide-gray-accent-light">
                <div className="md:pr-12 pb-12 md:pb-0">
                    <h2 className="text-[15px] font-semibold mb-4 text-gray">Self-serve plans</h2>
                    <div className="flex flex-col space-y-4">
                        <Title title="Open Source" subtitle="Self-hosted, free" badge="SELF-HOSTED" />
                        <Title title="PostHog Cloud" subtitle="Turnkey solution, pay per event" badge="HOSTED" />
                    </div>
                    <CallToAction
                        width="full"
                        className="mt-7"
                        onClick={() => setDemoType('group')}
                        event={{ name: 'book a demo: clicked group demo' }}
                    >
                        Join a group demo
                    </CallToAction>
                </div>
                <div className="md:pl-12 pt-12 md:pt-0">
                    <h2 className="text-[15px] font-semibold mb-4 text-gray">Full-service plans</h2>
                    <div className="flex flex-col space-y-4">
                        <Title title="Scale" subtitle="For large userbases or event volumes" badge="SELF-HOSTED" />
                        <Title title="Enterprise" subtitle="A focus on compliance and security" badge="SELF-HOSTED" />
                    </div>
                    <CallToAction
                        width="full"
                        className="mt-7"
                        onClick={() => setDemoType('personal')}
                        event={{ name: 'book a demo: clicked 1:1 demo' }}
                    >
                        Book a 1:1 demo
                    </CallToAction>
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
        <Layout
            crumbs={[
                {
                    title: 'PostHog',
                    url: '/',
                },
                ...crumbs,
            ]}
        >
            <SEO title="Select edition - PostHog" />
            <section className="px-4">
                {demoType ? <Book demoType={demoType} /> : <Editions setDemoType={setDemoType} />}
            </section>
        </Layout>
    )
}
