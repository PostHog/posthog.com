import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Spacer } from '../components/Spacer'
import { PluginCard } from '../components/PluginLibrary/PluginCard'
import { plugins } from '../pages-content/plugins'
import { Row, Tabs } from 'antd'

const { TabPane } = Tabs

export const PluginLibraryPage = () => {
    const [filter, setFilter] = useState('all')

    const filterPlugins = (plugin) => {
        return filter === 'all' ? true : filter === plugin.type
    }

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
                    {plugins
                        .filter((plugin) => filterPlugins(plugin))
                        .map((plugin) => (
                            <PluginCard
                                key={plugin.name}
                                name={plugin.name}
                                description={plugin.description}
                                link={plugin.link}
                                imageSrc={plugin.image}
                                isCommunityPlugin={plugin.isCommunity}
                            />
                        ))}
                </Row>
            </div>
            <Spacer />
        </Layout>
    )
}

export default PluginLibraryPage
