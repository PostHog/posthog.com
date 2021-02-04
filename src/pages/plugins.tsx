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

import './styles/plugin-library.scss'
import { Link } from 'gatsby'

const { TabPane } = Tabs

export const PluginLibraryPage = () => {
    const { filteredPlugins, filter } = useValues(pluginLibraryLogic)
    const { setFilter, openPlugin } = useActions(pluginLibraryLogic)

    return (
        <Layout>
            <div className="centered" style={{ margin: 'auto' }}>
                <PluginModal />
                <Spacer />
                <h1 className="center">Plugin Library</h1>
                <p className="center">
                    <Link to="/docs/plugins/overview">Learn more about plugins on our dedicated Docs section.</Link>
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
                <Row gutter={16} style={{ marginTop: 16, marginRight: 10, marginLeft: 10, minHeight: 600 }}>
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
                        <Spin />
                    )}
                </Row>
            </div>
            <Spacer />
        </Layout>
    )
}

export default PluginLibraryPage
