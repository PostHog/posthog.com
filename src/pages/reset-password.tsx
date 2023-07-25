import Layout from 'components/Layout'
import SEO from 'components/seo'
import { Authentication } from 'components/Squeak'
import React from 'react'

export default function ForgotPassword() {
    return (
        <Layout>
            <SEO title="Reset password - PostHog.com" noindex />
            <div className="max-w-xl mx-auto mt-12 mb-16">
                <Authentication initialView="reset-password" showBanner={false} showProfile={false} />
            </div>
        </Layout>
    )
}
