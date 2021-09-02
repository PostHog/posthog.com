import React from 'react'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import { useValues } from 'kea'
import { SEO } from '../seo'
import Layout from '../Layout'
import Hero from './Hero'
import ClimatePledge from '../HostHogHub/ClimatePledge'
import CodeOfConduct from '../HostHogHub/CodeOfConduct'
import Agenda from './Agenda'

const HostHog = () => {
    useValues(posthogAnalyticsLogic) // mount this logic

    return (
        <Layout>
            <SEO title="HostHog London 2021" description="" />
            <main>
                <Hero />
                <Agenda />
                <ClimatePledge />
                <CodeOfConduct />
            </main>
        </Layout>
    )
}

export default HostHog
