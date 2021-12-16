import { CallToAction } from 'components/CallToAction'
import { Cloud, ServerIcon } from 'components/Icons/Icons'
import React from 'react'
import Layout from '../components/Layout'
import { SEO } from '../components/seo'
import './styles/trial.scss'

const TrialPage = () => (
    <Layout>
        <div className="trial-page-wrapper">
            <div className="trial-page-container">
                <SEO title="PostHog Trial" description="Get started, for free." />
                <h1>Try PostHog - free for 30 days</h1>
                <div className="grid grid-cols-2 gap-5">
                    <div className="card-col">
                        <h2 className="flex space-x-4 items-center">
                            <Cloud /> <span>Cloud</span>
                        </h2>
                        <h3>Just create an account.</h3>
                        <p>
                            Select this option if you want to quickly try the PostHog features and don't want to worry
                            about installing it yourself.
                        </p>
                        <p>
                            <CallToAction to="https://app.posthog.com/signup">Sign Up</CallToAction>
                        </p>
                    </div>
                    <div className="card-col">
                        <h2 className="flex space-x-4 items-center">
                            <ServerIcon /> <span>Open Source</span>
                        </h2>
                        <h3>Host your own instance.</h3>
                        <p>
                            Select this option if you want to install our open source platform on your own
                            infrastructure.
                        </p>
                        <p>
                            <CallToAction to="/docs/self-host">Self Deploy</CallToAction>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
)

export default TrialPage
