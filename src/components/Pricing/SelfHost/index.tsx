import { CallToAction } from 'components/CallToAction'
import { GitHub, Info } from 'components/Icons'
import Tooltip from 'components/Tooltip'
import React from 'react'

const descriptionClassName = `list-none m-0 p-0 grid gap-y-1`
const descriptionItemClassName = `text-sm opacity-80`

const OpenSourceDescription = () => {
    return (
        <ul className={descriptionClassName}>
            <li className={descriptionItemClassName}>Deploy with Docker on your own server. </li>
            <li className={descriptionItemClassName}>Made for hobby projects with {'<100k'} events/month. </li>
            <li className={descriptionItemClassName}>
                <strong>MIT licensed without guarantee.</strong>
            </li>
        </ul>
    )
}

interface ISection {
    title: string
    icon: React.ReactNode
    description: React.ReactNode
    cta: { url: string; label: string }
}

const sections: ISection[] = [
    {
        title: 'Open-Source',
        icon: <GitHub />,
        description: <OpenSourceDescription />,
        cta: {
            url: '/docs/self-host',
            label: 'Read the docs',
        },
    },
]

const Section = ({ title, icon, description, cta }: ISection) => {
    return (
        <div className="flex space-x-4">
            <div>{icon}</div>
            <div className="flex flex-col">
                <h4 className="m-0 mb-4 leading-tight">{title}</h4>
                <div className="mb-6">{description}</div>
                <CallToAction size="sm" type="secondary" className="mt-auto self-start sm:w-auto !w-full" to={cta.url}>
                    {cta.label}
                </CallToAction>
            </div>
        </div>
    )
}

export default function SelfHost() {
    return (
        <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-y-0 gap-y-6 sm:gap-x-4 my-6">
            {sections.map((section, index) => {
                return <Section key={index} {...section} />
            })}
        </div>
    )
}
