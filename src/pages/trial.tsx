import React from 'react'
import Layout from 'components/Layout'
import { CallToAction } from 'components/CallToAction'
import { Cloud, ServerIcon } from 'components/Icons/Icons'
import { SEO } from '../components/seo'

const TrialPage = () => (
    <Layout>
        <div className="mx-auto max-w-4xl p-6">
            <SEO title="PostHog Trial" description="Get started, for free." />

            <h1 className="text-center py-8 found-bold">Try PostHog - free for 30 days</h1>

            <div className="md:grid md:grid-cols-2 md:grid-flow-row-dense auto-rows-min gap-x-16 mt-8 md:mt-16">
                <h2 className="flex items-center space-x-2 col-start-1">
                    <Cloud /> <span>Cloud</span>
                </h2>
                <h3 className="col-start-1">Just create an account.</h3>
                <p className="col-start-1">
                    Select this option if you want to quickly try the PostHog features and don't want to worry about
                    installing it yourself.
                </p>
                <CallToAction
                    type="primary"
                    width="56"
                    to="/https://app.posthog.com/signup"
                    className="col-start-1 h-12"
                >
                    Sign Up
                </CallToAction>

                <h2 className="flex items-center space-x-2 mt-16 md:mt-0">
                    <ServerIcon /> <span>Open Source</span>
                </h2>
                <h3>Host your own instance.</h3>
                <p className="h-16">
                    Select this option if you want to install our open source platform on your own infrastructure.
                </p>
                <CallToAction type="primary" width="56" className="h-12" to="/https://app.posthog.com/signup">
                    Self Deploy
                </CallToAction>
            </div>

            <div className="w-full py-16" />
        </div>
    </Layout>
)

export default TrialPage
