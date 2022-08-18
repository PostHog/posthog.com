import Contact from 'components/Contact'
import { SEO } from 'components/seo'
import Layout from 'components/SignUp/Layout'
import React, { useEffect, useState } from 'react'
import HubspotForm from 'react-hubspot-form'
import { Plan } from 'components/Pricing/PricingTable/Plan'
import { CallToAction } from 'components/CallToAction'
import { StaticImage } from 'gatsby-plugin-image'

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

                <div className="max-w-5xl mx-auto mt-12">

                    <div className="md:flex gap-8">
                        <aside className="grow-0 shrink-0 basis-[428px]">
                
                            <StaticImage
                                width={428}
                                height={503}
                                alt="PostHog Cloud EU"
                                outputPixelDensities={[1, 2]}
                                src="../../../contents/images/posthog-cloud-eu.png"
                            />
                        </aside>
                        <div className="flex-1">
                            {submitted ? (
                                <Plan
                                    className="px-0"
                                    title="While you're waiting..."
                                    subtitle="We'll get back to you when PostHog Cloud EU is ready, but you can get started today on PostHog Cloud (US), or you can self-hostm, then migrate your event data when we're ready for you."
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
                                <>
                                    <h1 className="text-4xl md:text-5xl mb-2">
                                        PostHog Cloud <span className="inline-block rounded px-2 py-1 text-[#FFCC00] bg-[#003399]">EU</span>
                                    </h1>
                                    <h2 className="text-xl md:text-2xl opacity-70 font-semibold mb-4">Same product suite. New hosting option.</h2>
                                    <p className="font-semibold opacity-70">Estimated arrival: Winter 2022</p>

                                    <h3 className="leading-tight">Get notified when PostHog Cloud EU is ready</h3>
                                    <HubspotForm portalId="6958578" formId="c2c88e03-449d-464f-b98e-5b84d9f504ab" />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
