import React from 'react'
import Layout from '../components/Layout'
import { Spacer } from '../components/Spacer'
import './styles/yc-onboarding.scss'
import { SEO } from '../components/seo'
import Contact from 'components/Contact'

export const ScheduleDemo = () => (
    <Layout>
        <SEO title="Schedule Demo • PostHog" />
        <div className="get-in-touch-wrapper">
            <Spacer />
            <h1 className="centered">Get in touch</h1>
            <Contact />
        </div>
    </Layout>
)

export default ScheduleDemo
