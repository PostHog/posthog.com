import React from 'react'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import { useValues } from 'kea'
import { SEO } from '../seo'
import Layout from '../Layout'
import Hero from './Hero'
import ClimatePledge from '../HostHogHub/ClimatePledge'
import CodeOfConduct from '../HostHogHub/CodeOfConduct'

const HostHog = () => {
    useValues(posthogAnalyticsLogic) // mount this logic

    return (
        <Layout>
            <SEO title="HostHog London 2021" description="" />
            <main>
                <Hero />
                <ClimatePledge />
                <CodeOfConduct />
            </main>
        </Layout>
    )
}

export default HostHog
