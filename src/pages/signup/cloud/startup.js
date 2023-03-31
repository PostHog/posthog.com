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
            if (event.data.id === 'aa91765b-e790-4e90-847e-46c7ebf43705') {
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
                    title: 'Cloud',
                },
                {
                    title: 'Startups',
                },
            ]}
        >
            <SEO title="Get in touch - PostHog" />
            <section className="px-4">
                <Intro>
                    <div className="max-w-xl mx-auto mt-12">
                        <h2>Apply for the PostHog for startups program</h2>
                        {submitted ? (
                            <p className="pt-2 pb-4">Thanks for applying - we will be in touch soon.</p>
                        ) : (
                            <>
                                <p className="pt-2 pb-4">
                                    Just fill out this painless form once you've subscribed to PostHog and we will be in
                                    touch.
                                </p>
                                <HubspotForm
                                    portalId="6958578"
                                    formId="aa91765b-e790-4e90-847e-46c7ebf43705"
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
