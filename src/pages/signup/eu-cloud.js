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

    useEffect(() => {
        window.addEventListener('message', handler)
        return () => {
            window.removeEventListener('message', handler)
        }
    }, [])

    function handler(event) {
        if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
            if (event.data.id === 'c2c88e03-449d-464f-b98e-5b84d9f504ab') {
                setSubmitted(true)
            }
        }
    }

    return (
        <Layout
            crumbs={[
                {
                    title: 'Get started',
                    url: '/signup',
                },
                {
                    title: 'PostHog Cloud EU',
                },
            ]}
        >
            <SEO title="Get in touch - PostHog" />
            <section className="px-4">
                <Intro title="Want to know when PostHog Cloud EU is ready?">
                    <div className="max-w-xl mx-auto mt-12">
                        {submitted ? (
                            <Plan
                                className="px-0"
                                title="While you're waiting"
                                subtitle="We'll get back to you when PostHog Cloud EU is ready, but you can get started today on our US Cloud or Self-host deployment then migrate your event data when we are ready for you."
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
                                <div className="mt-6 flex justify-between items-center bg-gray-accent-light px-[18px] py-[16px] rounded-md flex-col xl:flex-row space-y-2 xl:space-y-0 ">
                                    <p className="m-0 font-bold">Deploy a self-hosted instance</p>
                                    <CallToAction
                                        size="sm"
                                        type="primary"
                                        className="shadow-md"
                                        to="/signup/self-host/deploy"
                                    >
                                        Get started - free
                                    </CallToAction>
                                </div>
                            </Plan>
                        ) : (
                            <HubspotForm portalId="6958578" formId="c2c88e03-449d-464f-b98e-5b84d9f504ab" />
                        )}
                    </div>
                </Intro>
            </section>
        </Layout>
    )
}
