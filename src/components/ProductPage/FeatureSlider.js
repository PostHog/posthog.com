import {
    Annotations,
    Autocapture,
    Compliance,
    Dashboards,
    Extensibility,
    OpenSource,
    Pipelines,
    SelfHost,
    Warehouse,
} from 'components/Icons/Icons'
import React from 'react'

const features = [
    {
        title: 'Event pipelines',
        icon: <Pipelines />,
    },
    {
        title: 'Export to data warehouse',
        icon: <Warehouse />,
    },
    {
        title: 'Open source',
        icon: <OpenSource />,
    },
    { title: 'Self-hostable', icon: <SelfHost /> },
    {
        title: 'Autocapture',
        icon: <Autocapture />,
    },
    {
        title: 'Compliance-friendly',
        icon: <Compliance />,
    },
    {
        title: 'Dashboards',
        icon: <Dashboards className="w-6" />,
    },
    {
        title: 'Annotations',
        icon: <Annotations className="w-6" />,
    },
    {
        title: 'Extensibility',
        icon: <Extensibility className="w-6" />,
    },
]

export default function FeatureSlider() {
    return (
        <section className="overflow-hidden mt-7 mb-12">
            <ul className="text-primary dark:text-white opacity-50 font-bold flex infinite-features-ticker list-none p-0 space-x-16">
                {[...features, ...features].map(({ title, icon }, index) => {
                    return (
                        <li className="flex-shrink-0 flex space-x-2 items-center justify-center" key={index}>
                            {icon}
                            <p className="m-0 text-sm">{title}</p>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
