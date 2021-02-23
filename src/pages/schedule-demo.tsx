import React from 'react'
import Layout from '../components/Layout'
import { DemoScheduler } from '../components/DemoScheduler'
import { Spacer } from '../components/Spacer'
import './styles/yc-onboarding.scss'
import { SEO } from '../components/seo'

export const ScheduleDemo = () => {
    return (
        <Layout>
            <SEO title="Schedule Demo • PostHog" />
            <div className="yc-onboarding-wrapper">
                <Spacer />
                <h1 className="centered">Schedule Demo</h1>
                <p>
                    Use the widget below to schedule a demo call with one of our engineers. We will discuss what you
                    need, show you the platform, get you set up if possible, and can also give you access to a demo
                    instance so you can try out PostHog yourself.
                </p>
                <br />
                <p>
                    If none of these times suits you, email <i>yakko@posthog.com</i> and we'll figure something out!
                </p>
                <br />
                <DemoScheduler iframeSrc="https://calendly.com/yakko/demo" />
            </div>
        </Layout>
    )
}

export default ScheduleDemo
