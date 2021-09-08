import React from 'react'
import { PluginImage } from './PluginImage'
import { Link } from 'gatsby'
import cntl from 'cntl'

const wrapper = cntl`
    bg-white
    rounded
    cursor-pointer
    p-4
    relative
`

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

const Tag = ({ color, children }: { color: string; children: string }) => {
    return (
        <div className={`bg-${color} text-white px-3 py-1 absolute right-2 top-2 rounded-full text-xs`}>{children}</div>
    )
}

const PluginCardStructure = ({ name, description, imageSrc, isCommunityPlugin }: PluginCardStructureMeta) => {
    return (
        <div>
            <Tag color={isCommunityPlugin ? 'yellow' : 'blue'}>{isCommunityPlugin ? 'Community' : 'Core Team'}</Tag>
            <PluginImage imageSrc={imageSrc} />
            <div>
                <h5>{name}</h5>
                <p className="text-sm">{description}</p>
            </div>
        </div>
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
                <span onClick={onClick} className={wrapper}>
                    <PluginDetails />
                </span>
            ) : link.includes('.') ? (
                <a href={link} className={wrapper}>
                    <PluginDetails />
                </a>
            ) : (
                <Link to={link} className={wrapper}>
                    <PluginDetails />
                </Link>
            )}
        </>
    )
}
