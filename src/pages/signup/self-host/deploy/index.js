import Contact from 'components/Contact'
import { Title } from 'components/Pricing/PricingTable/Plan'
import { SEO } from 'components/seo'
import { section } from 'components/SignUp/classes'
import DeploymentOptions from 'components/SignUp/DeploymentOptions'
import Intro from 'components/SignUp/Intro'
import Layout from 'components/SignUp/Layout'
import React from 'react'

export default function SelfHost({ location }) {
    return (
        <Layout
            crumbs={[
                {
                    title: 'Get started',
                    url: '/signup',
                },
                {
                    title: 'Self-host',
                    url: '/signup/self-host',
                },
                {
                    title: 'Deploy',
                },
            ]}
        >
            <SEO title="Deploy - PostHog" />
            <section className={section()}>
                <Intro title="Deploy PostHog" />
                <DeploymentOptions className="max-w-xl w-full mx-auto border border-dashed border-gray-accent-light rounded-md" />
            </section>
            <section>
                <Title
                    title="Questions?"
                    subtitle="Schedule a time to learn if PostHog is right for you."
                    className="text-center"
                />
                <Contact />
            </section>
        </Layout>
    )
}
