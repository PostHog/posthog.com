import Contact from 'components/Contact'
import { heading, section } from 'components/Home/classes'
import Logo from 'components/Logo'
import { SEO } from 'components/seo'
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
                    url: '/sign-up',
                },
                {
                    title: 'Self-host',
                    url: '/sign-up/self-host',
                },
                {
                    title: 'Get in touch',
                },
            ]}
        >
            <SEO title="Get in touch - PostHog" />
            <section className="px-4">
                <div className={section()}>
                    <Logo className="mx-auto" />
                    <h1 className={heading('md', 'primary', 'mt-16')}>Get in touch</h1>
                    <Contact />
                </div>
            </section>
        </Layout>
    )
}
