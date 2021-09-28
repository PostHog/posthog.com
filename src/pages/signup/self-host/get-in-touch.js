import Contact from 'components/Contact'
import { heading, section } from 'components/Home/classes'
import Logo from 'components/Logo'
import { SEO } from 'components/seo'
import Layout from 'components/SignUp/Layout'
import React from 'react'

export default function SelfHost() {
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
                <div className={section('md:my-[87px]')}>
                    <Logo className="mx-auto" />
                    <h1 className={heading('md', 'primary', 'mt-16')}>Get in touch</h1>
                    <Contact />
                </div>
            </section>
        </Layout>
    )
}
