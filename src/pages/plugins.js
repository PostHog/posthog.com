import React from 'react'
import Layout from '../components/Layout'
import { Spacer } from '../components/Spacer'
import { PluginCard } from '../components/PluginLibrary/PluginCard'
import { plugins } from '../pages-content/plugins'
import { Row } from 'antd'

export const PluginLibraryPage = () => {
    return (
        <Layout>
            <div className="centered" style={{ margin: 'auto' }}>
                <Spacer />
                <h1 className="center">Plugin Library</h1>
                <Row gutter={16} style={{ marginTop: 16, marginRight: 10, marginLeft: 10 }}>
                    {plugins.map((plugin) => (
                        <PluginCard
                            key={plugin.name}
                            name={plugin.name}
                            description={plugin.description}
                            link={plugin.link}
                            imageSrc={plugin.image}
                        />
                    ))}
                </Row>
            </div>
            <Spacer />
        </Layout>
    )
}

export default PluginLibraryPage
