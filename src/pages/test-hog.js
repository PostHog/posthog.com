import { SEO } from 'components/seo'
import React from 'react'
import Layout from 'components/Layout'
import { heading, section } from 'components/Home/classes'

const title = `A/B TestHog`
const description = 'Enter your URL to find out what to test on your site.'

export default function TestHog() {
    return (
        <Layout>
            <SEO
                title={title}
                description={title}
                // image={`/images/enterprise.png`}
            />
            <div className={section('z-10 relative md:!mb-8')}>
                <h1 className={`${heading()} overflow-hidden pb-1 home-hero-title`}>{title}</h1>
                <h2 className={`mt-2 mb-6 text-xl font-semibold text-center home-hero-subtitle`}>{description}</h2>
            </div>
        </Layout>
    )
}
