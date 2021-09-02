import React from 'react'
import { Card, Col, Tag } from 'antd'
import { PluginImage } from './PluginImage'
import { Link } from 'gatsby'

interface PluginCardStructureMeta {
    name: string
    description: string
    imageSrc: string
    isCommunityPlugin: boolean
}

interface PluginCardMeta extends PluginCardStructureMeta {
    link: string
    onClick?: () => void | undefined
}

const PluginCardStructure = ({ name, description, imageSrc, isCommunityPlugin }: PluginCardStructureMeta) => {
    return (
        <Col sm={12} md={12} lg={8} xl={6} style={{ marginBottom: 20 }}>
            <Card
                style={{ height: '100%', display: 'flex', marginBottom: 20 }}
                bodyStyle={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
                className="text-center"
            >
                <Tag
                    color={isCommunityPlugin ? 'green' : 'blue'}
                    style={{ maxWidth: '30%', position: 'absolute', right: 15, top: 15 }}
                >
                    {isCommunityPlugin ? 'Community' : 'Core Team'}
                </Tag>
                <PluginImage imageSrc={imageSrc} />
                <div className="flex-grow">
                    <h5>{name}</h5>
                    <p className="text-sm">{description}</p>
                </div>
            </Card>
        </Col>
    )
}

export const PluginCard = ({ name, description, link, imageSrc, isCommunityPlugin, onClick }: PluginCardMeta) => {
    const PluginDetails = () => (
        <PluginCardStructure
            name={name}
            description={description}
            imageSrc={imageSrc}
            isCommunityPlugin={isCommunityPlugin}
        />
    )

    return (
        <>
            {onClick ? (
                <span onClick={onClick}>
                    <PluginDetails />
                </span>
            ) : link.includes('.') ? (
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
