import { FeatureFlags, Funnels, Heatmaps, Platform, SessionRecordings } from 'components/Icons/Icons'
import React from 'react'
import { Link } from 'react-scroll'
import Scrollspy from 'react-scrollspy'

const features = [
    {
        title: 'Product analytics',
        icon: <Funnels />,
        url: 'product-analytics',
    },
    {
        title: 'Session recording',
        icon: <SessionRecordings />,
        url: 'session-recording',
    },
    {
        title: 'Feature flags',
        icon: <FeatureFlags />,
        url: 'feature-flags',
    },
    {
        title: 'Heatmaps',
        icon: <Heatmaps />,
        url: 'heatmaps',
    },
    {
        title: 'Platform',
        icon: <Platform />,
        url: 'platform',
    },
]

export default function Navigation() {
    return (
        <nav className="flex justify-center z-50 mt-12 mb-14 sticky top-5">
            <Scrollspy
                offset={-90}
                className="list-none m-0 p-0 inline-flex font-semibold bg-white dark:bg-gray-accent-dark rounded shadow-md overflow-hidden"
                items={features.map(({ url }) => url)}
                currentClassName="bg-gray-accent-light dark:bg-primary dark:bg-opacity-80"
            >
                {features.map(({ title, icon, url }) => (
                    <li key={title}>
                        <Link
                            offset={-110}
                            smooth
                            to={url}
                            className="text-primary dark:text-white hover:text-primary dark:hover:text-white opacity-80 flex items-center space-x-2 px-4 py-4 md:px-6 md:py-4"
                        >
                            {icon}
                            <span className="hidden lg:inline-block">{title}</span>
                        </Link>
                    </li>
                ))}
            </Scrollspy>
        </nav>
    )
}
