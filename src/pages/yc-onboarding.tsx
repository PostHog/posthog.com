import React, { useState } from 'react'
import Layout from '../components/Layout'
import { DemoScheduler } from '../components/DemoScheduler'
import { Spacer } from '../components/Spacer'
import { Link } from 'gatsby'
import './styles/yc-onboarding.scss'

export const YCOnboarding = () => {
    const [showInfo, setShowInfo] = useState(false)
    return (
        <Layout>
            <div className="get-in-touch-wrapper">
                <Spacer />
                <h1 className="centered">PostHog YC Onboarding</h1>
                <Spacer height={25} />
                <DemoCallInfo />
                <DemoScheduler iframeSrc="https://calendly.com/d/dsb-3y3-9v9" />
            </div>
        </Layout>
    )
}

export default YCOnboarding
