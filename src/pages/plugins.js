import React from 'react'
import Layout from '../components/Layout'
import { Spacer } from '../components/Spacer'
import { PluginCard } from '../components/PluginLibrary/PluginCard'
import { Row, Tabs } from 'antd'
import Markdown from 'react-markdown'
import { useActions, useValues } from 'kea'
import { pluginLibraryLogic } from '../logic/pluginLibraryLogic'
import { Spin, Button } from 'antd'
import Modal from 'react-modal'
import './styles/plugin-library.scss'

const { TabPane } = Tabs

export const PluginLibraryPage = () => {
    const { filteredPlugins, filter, modalMarkdown, modalOpen, pluginImageSrc } = useValues(pluginLibraryLogic)
    const { setFilter, setModalMarkdown, setModalOpen, setPluginImageSrc } = useActions(pluginLibraryLogic)

    const handlePluginClick = async (e, plugin) => {
        let markdown = `# ${plugin.name} \n ${plugin.description}`
        if (plugin.url.includes('github')) {
            e.stopPropagation()
            const response = await window.fetch(
                `https://raw.githubusercontent.com/${plugin.url.split('hub.com/')[1]}/main/README.md`
            )
            if (response.status === 200) {
                markdown = await response.text()
            }
        }
        setPluginImageSrc(getPluginImageSrc(plugin))
        setModalMarkdown(markdown.split(/!\[.*\]\(.*\)/).join('')) // Remove images from MD
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
                <Modal
                    isOpen={modalOpen}
                    onRequestClose={() => setModalOpen(false)}
                    className="pluginModalContent"
                    overlayClassName="modalOverlay"
                >
                    <div>
                        <Spacer />
                        <img src={pluginImageSrc} />
                        <Markdown source={modalMarkdown} linkTarget="_blank" />
                    </div>
                    <Button icon="close" onClick={() => setModalOpen(false)} className="modalClose" />
                </Modal>
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
