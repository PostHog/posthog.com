import React from 'react'
import Layout from '../components/Layout'
import { Spacer } from '../components/Spacer'
import './styles/ama.scss'
import { SEO } from '../components/seo'

export const AMA = () => (
    <Layout>
        <SEO title="Ask me anything • PostHog" />
        <div className="ama-wrapper">
            <Spacer />
            <h1 className="centered">AMA</h1>
            <h2>Ask the PostHog founders anything.</h2>

            <div id="squeak-root" style={{ maxWidth: '450px' }} />
        </div>
    </Layout>
)

export default AMA
