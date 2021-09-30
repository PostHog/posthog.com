import Contact from 'components/Contact'
import { SEO } from 'components/seo'
import Intro from 'components/SignUp/Intro'
import Layout from 'components/SignUp/Layout'
import React, { useEffect } from 'react'

export default function SelfHost() {
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
                    title: 'Self-host',
                    url: '/signup/self-host',
                },
                {
                    title: 'Get in touch',
                },
            ]}
        >
            <SEO title="Get in touch - PostHog" />
            <section className="px-4">
                <Intro title="Get in touch">
                    <Contact />
                </Intro>
            </section>
        </Layout>
    )
}
