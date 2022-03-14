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
            <h1 className="text-center">AMA</h1>
            <h4 className="text-center">Ask the PostHog founders anything.</h4>

            <div id="squeak-root" style={{ maxWidth: '450px' }} />
        </div>
    </Layout>
)

export default AMA
