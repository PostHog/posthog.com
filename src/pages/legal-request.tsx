import React from 'react'
import Layout from 'components/Layout'
import SEO from 'components/seo'

export default function LegalRequest() {
    return (
        <Layout>
            <SEO title="Legal Request" description="Submit your legal request to PostHog." />
            <div className="max-w-xl mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Legal Request Received</h1>
                <p className="text-lg mb-6">Our legal hogs are working on generating a legal document for you.</p>
                <p>
                    If you have any questions, or don't hear back, please contact{' '}
                    <a href="mailto:privacy@posthog.com" className="text-primary underline">
                        privacy@posthog.com
                    </a>
                    .
                </p>
            </div>
        </Layout>
    )
}
