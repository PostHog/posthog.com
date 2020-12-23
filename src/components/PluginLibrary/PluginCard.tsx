import React from 'react'
import { Card, Col } from 'antd'
import { PluginImage } from './PluginImage'
import { Link } from 'gatsby'

interface PluginCardStructureMeta {
    name: string
    description: string
    imageSrc: string
}

interface PluginCardMeta extends PluginCardStructureMeta {
    link: string
}

const PluginCardStructure = ({ name, description, imageSrc }: PluginCardStructureMeta) => {
    return (
        <Col sm={12} md={12} lg={8} xl={6} style={{ marginBottom: 20 }}>
            <Card
                style={{ height: '100%', display: 'flex', marginBottom: 20 }}
                bodyStyle={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
                className="card-elevated"
            >
                <PluginImage imageSrc={imageSrc} />
                <div className="center" style={{ marginBottom: 16 }}>
                    <b>{name}</b>
                </div>
                <div style={{ flexGrow: 1, paddingBottom: 16, height: 80 }} className="center">
                    {description}
                </div>
            </Card>
        </Col>
    )
}

export const PluginCard = ({ name, description, link, imageSrc }: PluginCardMeta) => {
    const PluginDetails = () => <PluginCardStructure name={name} description={description} imageSrc={imageSrc} />

    return (
        <>
            {link.includes('.') ? (
                <a href={link}>
                    <PluginDetails />
                </a>
            ) : (
                <Link to={link}>
                    <PluginDetails />
                </Link>
            )}
        </>
    )
}
