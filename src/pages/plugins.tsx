import React from 'react'
import Layout from '../components/Layout'
import { Spacer } from '../components/Spacer'
import { PluginCard } from '../components/PluginLibrary/PluginCard'
import { Tabs } from 'antd'
import { useActions, useValues } from 'kea'
import { pluginLibraryLogic } from '../logic/pluginLibraryLogic'
import { Spin } from 'antd'
import { PluginModal } from '../components/PluginLibrary/PluginModal'
import { getPluginImageSrc } from '../lib/utils'
import { LibraryPluginType } from '../types'
import { SEO } from '../components/seo'
import { Link } from 'gatsby'
import pluginLibraryOgImage from '../images/posthog-plugins.png'
import './styles/plugins.scss'

const { TabPane } = Tabs

export const PluginLibraryPage = () => {
    const { filteredPlugins, filter } = useValues(pluginLibraryLogic)
    const { setFilter, openPlugin } = useActions(pluginLibraryLogic)

    return (
        <div className="plugins-page-wrapper">
            <Layout>
                <SEO
                    title="Plugin Library • PostHog"
                    description="Plugins for getting data in and out of PostHog, the open source product analytics platform."
                    image={pluginLibraryOgImage}
                />
                <div className="centered px-4" style={{ margin: 'auto' }}>
                    <PluginModal />
                    <Spacer />
                    <h1 className="center">Plugin Library</h1>
                    <p className="center">
                        Learn more about plugins on our dedicated <Link to="/docs/plugins/overview">Docs section</Link>.
                    </p>
                    <Tabs
                        activeKey={!filter ? 'default' : filter}
                        onChange={(key) => {
                            setFilter(key)
                        }}
                    >
                        <TabPane tab="All" key="all" />
                        <TabPane tab="Data Importing" key="data_in" />
                        <TabPane tab="Data Exporting" key="data_out" />
                        <TabPane tab="Ingestion Filtering" key="ingestion_filtering" />
                    </Tabs>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-stretch">
                        {filteredPlugins.length > 0 ? (
                            filteredPlugins.map((plugin: LibraryPluginType) => (
                                <PluginCard
                                    key={plugin.name}
                                    name={plugin.name}
                                    description={plugin.description || ''}
                                    link={plugin.url}
                                    imageSrc={getPluginImageSrc(plugin) || ''}
                                    isCommunityPlugin={plugin.maintainer === 'community'}
                                    onClick={() => openPlugin(plugin.name)}
                                />
                            ))
                        ) : (
                            <div className="col-span-full">
                                <Spin />
                            </div>
                        )}
                    </div>
                </div>
                <Spacer />
            </Layout>
        </div>
    )
}

export default PluginLibraryPage
