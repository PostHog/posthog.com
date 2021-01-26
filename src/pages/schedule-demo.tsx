import React from 'react'
import Layout from '../components/Layout'
import { DemoScheduler } from '../components/DemoScheduler'
import { Spacer } from '../components/Spacer'
import './styles/yc-onboarding.scss'

export const ScheduleDemo = () => {
    return (
        <Layout>
            <div className="yc-onboarding-wrapper">
                <Spacer />
                <h1 className="centered">Schedule Demo</h1>
                <p>
                    Use the widget below to schedule a demo call with Yakko, one of our engineers. During this slot we
                    can we can help you set up and give you access to a demo PostHog instance to play around with. If
                    you're already using PostHog, we can also help you create some useful dashboards or clarify any
                    questions you may have.
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
