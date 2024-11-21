import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'

export default function JobsPage() {
    return (
        <Layout>
            <SEO title="Product Engineers Jobs Board" />
            <div className="max-w-screen-2xl px-5 md:px-10 mx-auto">
                <h1 className="text-4xl">Get a job as a product engineer</h1>
                <div className="mt-4">
                    {/* Add your jobs content here */}
                    <p>here are awesome companies to work for</p>
                </div>
            </div>
        </Layout>
    )
}
