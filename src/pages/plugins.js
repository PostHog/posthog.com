import React from 'react'
import Layout from '../components/Layout'
import { Spacer } from '../components/Spacer'
import { PluginCard } from '../components/PluginLibrary/PluginCard'
import { Row, Tabs } from 'antd'
import { useActions, useValues } from 'kea'
import { pluginLibraryLogic } from '../logic/pluginLibraryLogic'

const { TabPane } = Tabs

export const PluginLibraryPage = () => {
    const { filteredPlugins, filter } = useValues(pluginLibraryLogic)
    const { setFilter } = useActions(pluginLibraryLogic)

    return (
        <Layout>
            <div className="centered" style={{ margin: 'auto' }}>
                <Spacer />
                <h1 className="center">Plugin Library</h1>
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
                    {filteredPlugins.map((plugin) => (
                        <PluginCard
                            key={plugin.name}
                            name={plugin.name}
                            description={plugin.description}
                            link={plugin.url}
                            imageSrc={
                                plugin.imageLink
                                    ? plugin.imageLink
                                    : plugin.url.includes('github')
                                    ? `https://raw.githubusercontent.com/${
                                          plugin.url.split('hub.com/')[1]
                                      }/main/logo.png`
                                    : null
                            }
                            isCommunityPlugin={plugin.maintainer === 'community'}
                        />
                    ))}
                </Row>
            </div>
            <Spacer />
        </Layout>
    )
}

export default PluginLibraryPage
