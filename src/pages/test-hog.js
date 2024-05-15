import { SEO } from 'components/seo'
import React, { useState } from 'react'
import Layout from 'components/Layout'
import { heading, section } from 'components/Home/classes'
import { CallToAction } from 'components/CallToAction'

const title = `A/B TestHog`
const description = 'Enter URL to find out what to test on your site.'

export default function TestHog() {
    const [url, setUrl] = useState('')

    const handleChange = (event) => {
        setUrl(event.target.value)
    }

    const handleAnalyze = () => {
        // Add API call here
    }

    return (
        <Layout>
            <SEO title={title} description={title} />
            <div className={section('z-10 relative md:!mb-8')}>
                <h1 className={`${heading()} overflow-hidden pb-1 home-hero-title`}>{title}</h1>
                <h2 className={`mt-2 mb-6 text-xl font-semibold text-center home-hero-subtitle`}>{description}</h2>
            </div>
            <div className="flex flex-col items-center justify-center mb-20">
                <input
                    type="text"
                    value={url}
                    onChange={handleChange}
                    className="w-60 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter URL..."
                />
                <CallToAction className="mt-4" onClick={handleAnalyze} type="primary">
                    Analyze
                </CallToAction>
            </div>
        </Layout>
    )
}
