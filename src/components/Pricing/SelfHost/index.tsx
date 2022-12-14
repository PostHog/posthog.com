import { CallToAction } from 'components/CallToAction'
import { GitHub, Info } from 'components/Icons'
import NotProductIcons from 'components/NotProductIcons'
import Tooltip from 'components/Tooltip'
import React from 'react'

const EnterpriseIcon = () => NotProductIcons.enterprise

const descriptionClassName = `list-none m-0 p-0 grid gap-y-1`
const descriptionItemClassName = `text-sm opacity-80`

const OpenSourceDescription = () => {
    return (
        <ul className={descriptionClassName}>
            <li className={descriptionItemClassName}>Deploy with Docker on your own sever. </li>
            <li className={descriptionItemClassName}>Made for hobby projects with {'<100k'} events/month. </li>
            <li className={descriptionItemClassName}>
                <strong>Not recommended for production.</strong>
            </li>
        </ul>
    )
}

const EnterpriseSelfHosted = () => {
    return (
        <ul className={descriptionClassName}>
            <li className={descriptionItemClassName}>Deploy on your private cloud or infrastructure.</li>
            <li className="flex items-center space-x-2 text-sm">
                <strong className={descriptionItemClassName}>Starting at $5,000/month</strong>
                <span>
                    <Tooltip
                        title={
                            <>
                                <p className="text-sm m-0">The $5,000/month plan includes:</p>
                                <ul className="mt-1 pt-0">
                                    <li className="text-sm"> 40m events</li>
                                    <li className="text-sm">80k sessions</li>
                                    <li className="text-sm">Self-hosted enterprise support</li>
                                </ul>
                            </>
                        }
                    >
                        <span>
                            <Info className="w-2 h-2" />
                        </span>
                    </Tooltip>
                </span>
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
    {
        title: 'Enterprise Self-Hosted',
        icon: <EnterpriseIcon />,
        description: <EnterpriseSelfHosted />,
        cta: {
            url: '/book-a-demo',
            label: 'Book a call',
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
