import { CallToAction } from 'components/CallToAction/index.tsx'
import { SEO } from 'components/seo'
import React from 'react'
import Layout from 'components/Layout'
import { SignupCTA } from 'components/SignupCTA'

export default function BookADemo() {
    return (
        <Layout>
            <SEO title="Book a demo – PostHog" />
            <section className="px-4 lg:py-12 py-4 text-center max-w-6xl mx-auto">
                <h1 className="text-5xl m-0">Demo</h1>
                <p className="my-5">PostHog Cloud is self-serve, but we’re here to chat if you have bespoke needs.</p>
                <div className="flex space-x-4 justify-center mb-12">
                    <SignupCTA>Get started - free</SignupCTA>
                    <CallToAction type="secondary" to="/contact-sales">
                        Talk to sales
                    </CallToAction>
                </div>
                <iframe src="https://www.youtube-nocookie.com/embed/BPDmpepEwSY" />
            </section>
        </Layout>
    )
}
