import React from 'react'
import Layout from '../components/Layout'
import { Spacer } from '../components/Spacer'
import { PluginCard } from '../components/PluginLibrary/PluginCard'
import { Row, Tabs } from 'antd'
import { useActions, useValues } from 'kea'
import { pluginLibraryLogic } from '../logic/pluginLibraryLogic'
import { Spin } from 'antd'
import { getPluginImageSrc } from '../lib/utils'
import { LibraryPluginType } from '../types'
import { SEO } from '../components/seo'
import { Link } from 'gatsby'
import pluginLibraryOgImage from '../images/posthog-plugins.png'
import './styles/contributors.scss'
import { ContributorCard } from 'components/ContributorCard'


export const ContributorsPage = () => {

    return (
        <div className='contributors-page-wrapper'>
            <Layout>
                <SEO
                    title="Contributors • PostHog"
                    description="Plugins for getting data in and out of PostHog, the open source product analytics platform."
                    image={pluginLibraryOgImage}
                />
                <div className="centered" style={{ margin: 'auto' }}>
                    <Spacer />
                    <h1 className="center">Contributors</h1>
                    <Row gutter={16} style={{ marginTop: 16, marginRight: 10, marginLeft: 10, minHeight: 600 }}>
                        <ContributorCard
                            key='cool-hedgehog'
                            name='the-cool-hedgehog'
                            link='https://github.com/PostHog/posthog'
                            imageSrc='https://posthog.com/static/cool-hedgehog-2e771b8385a05bfe25cfdea4bbb775a3.svg'
                            contributions={['code', 'doc', 'plugin', 'bug']}
                            mvpWins={2}
                        />

                    </Row>
                </div>
                <Spacer />
            </Layout>
        </div>
    )
}

export default ContributorsPage
