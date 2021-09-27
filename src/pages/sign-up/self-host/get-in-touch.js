import { heading, section } from 'components/Home/classes'
import Logo from 'components/Logo'
import { SEO } from 'components/seo'
import Layout from 'components/SignUp/Layout'
import React, { useState } from 'react'

export default function SelfHost() {
    const [open, setOpen] = useState(false)
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
                </div>
            </section>
        </Layout>
    )
}
