import React from 'react'
import Layout from '../components/Layout'
import { DemoScheduler } from '../components/DemoScheduler'
import { Spacer } from '../components/Spacer'
import './styles/yc-onboarding.scss'
import { SEO } from '../components/seo'
import { Link } from 'gatsby'

export const ScheduleDemo = () => {
    return (
        <Layout>
            <SEO title="Schedule Demo • PostHog" />
            <div className="yc-onboarding-wrapper">
                <Spacer />
                <h1 className="centered">Schedule Demo</h1>
                <p>
                    Use the widget below to schedule a demo call with one of our engineers. Please note that this is not
                    a Sales call. For sales enquiries, please{' '}
                    <a href="https://share.hsforms.com/1-IVCY9gNRvaZBajMt_UPIg4559u">contact us</a>.
                </p>
                <br />
                <p>
                    PostHog demos are done in group sessions and are an introduction to the platform. You can also find
                    a lot of information about the product in our <Link to="/docs">Docs</Link> and{' '}
                    <a href="https://www.youtube.com/channel/UCoP6ql8QkyOoVpBU4P8LM6w">secondary YouTube channel</a>.
                </p>
                <br />
                <DemoScheduler iframeSrc="https://calendly.com/jamesefhawkins/posthog-demo" />
            </div>
        </Layout>
    )
}

export default ScheduleDemo
