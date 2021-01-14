import React from 'react'
import Layout from '../components/Layout'
import { Spacer } from '../components/Spacer'
import { PluginCard } from '../components/PluginLibrary/PluginCard'
import { Row, Tabs } from 'antd'
import { useActions, useValues } from 'kea'
import { pluginLibraryLogic } from '../logic/pluginLibraryLogic'
import { Spin } from 'antd'
import { PluginModal } from '../components/PluginLibrary/PluginModal'
import { pluginInstallationMd } from '../pages-content/plugin-installation'
import './styles/plugin-library.scss'

const { TabPane } = Tabs

export const PluginLibraryPage = () => {
    const { filteredPlugins, filter, modalOpen, activePlugin } = useValues(pluginLibraryLogic)
    const { setFilter, setModalOpen, setActivePlugin } = useActions(pluginLibraryLogic)

    const handlePluginClick = async (e, plugin) => {
        let markdown = `# ${plugin.name} \n ${plugin.description} \n ${pluginInstallationMd}`
        if (plugin.url.includes('github')) {
            e.stopPropagation()
            const response = await window.fetch(
                `https://raw.githubusercontent.com/${plugin.url.split('hub.com/')[1]}/main/README.md`
            )
            if (response.status === 200) {
                markdown = await response.text()
            }
        }
        if (!markdown.includes('Installation')) {
            markdown += pluginInstallationMd
        }
        plugin['markdown'] = markdown.split(/!\[.*\]\(.*\)/).join('')
        plugin['imageSrc'] = getPluginImageSrc(plugin)
        setActivePlugin(plugin)
        setModalOpen(true)
    }

    const getPluginImageSrc = (plugin) =>
        plugin.imageLink
            ? plugin.imageLink
            : plugin.url.includes('github')
            ? `https://raw.githubusercontent.com/${plugin.url.split('hub.com/')[1]}/main/logo.png`
            : null

    return (
        <Layout>
            <div className="centered" style={{ margin: 'auto' }}>
                <PluginModal
                    modalOpen={modalOpen}
                    pluginImageSrc={activePlugin.imageSrc}
                    modalMarkdown={activePlugin.markdown}
                    setModalOpen={setModalOpen}
                />
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
                    {filteredPlugins.length > 0 ? (
                        filteredPlugins.map((plugin) => (
                            <PluginCard
                                key={plugin.name}
                                name={plugin.name}
                                description={plugin.description}
                                link={plugin.url}
                                imageSrc={getPluginImageSrc(plugin)}
                                isCommunityPlugin={plugin.maintainer === 'community'}
                                onClick={(e) => {
                                    handlePluginClick(e, { ...plugin })
                                }}
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
