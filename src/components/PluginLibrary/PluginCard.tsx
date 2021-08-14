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

const ClickWrapper = ({ children, onClick, link }) => {
    return onClick ? (
        <span onClick={onClick}>{children}</span>
    ) : link.includes('.') ? (
        <a href={link}>{children}</a>
    ) : (
        <Link to={link}>{children}</Link>
    )
}

const PluginCardStructure = ({
    name,
    description,
    imageSrc,
    isCommunityPlugin,
    onClick,
    link,
}: PluginCardStructureMeta) => {
    return (
        <Col sm={12} md={12} lg={8} xl={6} style={{ marginBottom: 20 }}>
            <Card
                style={{ height: '100%', display: 'flex', marginBottom: 20 }}
                bodyStyle={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
                className="card-elevated"
            >
                <ClickWrapper onClick={onClick} link={link}>
                    <Tag
                        color={isCommunityPlugin ? 'green' : 'blue'}
                        style={{ maxWidth: '30%', position: 'absolute', right: 15, top: 15 }}
                    >
                        {isCommunityPlugin ? 'Community' : 'Core Team'}
                    </Tag>
                    <PluginImage imageSrc={imageSrc} />
                    <div className="center" style={{ marginBottom: 16 }}>
                        <b>{name}</b>
                    </div>
                    <div style={{ flexGrow: 1, paddingBottom: 16, height: 80 }} className="center">
                        {description}
                    </div>
                </ClickWrapper>
            </Card>
        </Col>
    )
}

export const PluginCard = ({ name, description, link, imageSrc, isCommunityPlugin, onClick }: PluginCardMeta) => {
    const PluginDetails = ({ link, onClick }) => (
        <PluginCardStructure
            onClick={onClick}
            link={link}
            name={name}
            description={description}
            imageSrc={imageSrc}
            isCommunityPlugin={isCommunityPlugin}
        />
    )

    return <PluginDetails onClick={onClick} link={link} />
}
