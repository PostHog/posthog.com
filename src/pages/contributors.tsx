import React from 'react'
import Layout from '../components/Layout'
import { Spacer } from '../components/Spacer'
import { PluginCard } from '../components/PluginLibrary/PluginCard'
import { Row, Tabs } from 'antd'
import { useActions, useValues } from 'kea'
import { pluginLibraryLogic } from '../logic/pluginLibraryLogic'
import { Spin } from 'antd'
import { PluginModal } from '../components/PluginLibrary/PluginModal'
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
                    <PluginModal />
                    <Spacer />
                    <h1 className="center">Contributors</h1>
                    <Row gutter={16} style={{ marginTop: 16, marginRight: 10, marginLeft: 10, minHeight: 600 }}>
                        <ContributorCard
                            key='yakkomajuri'
                            name='yakkomajuri'
                            description='lorem ipsum lorem ipsum lorem ipsum'
                            link=''
                            imageSrc=''
                            onClick={() => {}}
                        />


                    </Row>
                </div>
                <Spacer />
            </Layout>
        </div>
    )
}

export default ContributorsPage
