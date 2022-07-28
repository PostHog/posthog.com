import Contact from 'components/Contact'
import { SEO } from 'components/seo'
import Intro from 'components/SignUp/Intro'
import Layout from 'components/SignUp/Layout'
import React, { useEffect, useState } from 'react'
import HubspotForm from 'react-hubspot-form'
import { Plan } from 'components/Pricing/PricingTable/Plan'
import { CallToAction } from 'components/CallToAction'

export default function SelfHost() {
    const [submitted, setSubmitted] = useState(false)
    useEffect(() => {
        typeof window !== 'undefined' && window.scrollTo(0, 0)
    })
    return (
        <Layout
            crumbs={[
                {
                    title: 'Get started',
                    url: '/signup',
                },
                {
                    title: 'Cloud',
                },
                {
                    title: 'Enterprise',
                },
            ]}
        >
            <SEO title="Get in touch - PostHog" />
            <section className="px-4">
                <Intro>
                    <div className="max-w-xl mx-auto mt-12">
                        {submitted ? (
                            <Plan
                                className="px-0"
                                title="While you're waiting"
                                subtitle="We'll get back to you soon, but you can get started today without paying anything! (Your first 1 million events are free - every month.)"
                            >
                                <div className="mt-6 flex justify-between items-center bg-gray-accent-light px-[18px] py-[16px] rounded-md flex-col xl:flex-row space-y-2 xl:space-y-0 ">
                                    <p className="m-0 font-bold">Create a free PostHog Cloud account</p>
                                    <CallToAction
                                        size="sm"
                                        type="primary"
                                        className="shadow-md"
                                        to="https://app.posthog.com/signup"
                                    >
                                        Get started - free
                                    </CallToAction>
                                </div>
                            </Plan>
                        ) : (
                            <>
                                <h2>Get more info about PostHog Enterprise Cloud</h2>
                                <p className="pt-2 pb-4">Just fill out this painless form and we'll be in touch.</p>
                                <HubspotForm
                                    portalId="6958578"
                                    formId="3aa5d0ac-60e2-469a-a57b-e0c209a15b5b"
                                    onSubmit={() => setSubmitted(true)}
                                />
                            </>
                        )}
                    </div>
                </Intro>
            </section>
        </Layout>
    )
}
