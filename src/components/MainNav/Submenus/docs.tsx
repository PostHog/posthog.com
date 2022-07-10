import { CallToAction } from 'components/CallToAction'
import { Search } from 'components/Icons/Icons'
import Link from 'components/Link'
import React from 'react'
import SearchBar from '../../../templates/Handbook/SearchBar'

interface ColMenuItems {
    title: string
    description: string
    url: string
}

export default function Docs() {
    const leftColMenuItems: ColMenuItems[] = [
        {
            title: 'Overview',
            description: 'Getting started',
            url: '/docs',
        },
        {
            title: 'Deploy PostHog',
            description: 'Cloud or self-host',
            url: '/docs/cloud',
        },
        {
            title: 'Integrate PostHog',
            description: 'Track events and identify users',
            url: '/docs/integrate',
        },
        {
            title: 'Connect your stack',
            description: 'Send data between PostHog and other services',
            url: '/apps',
        },
        {
            title: 'Data privacy',
            description: 'Compliance for all privacy regulations',
            url: '/docs/privacy/',
        },
    ]

    const rightColMenuItems: ColMenuItems[] = [
        {
            title: 'Build an app',
            description: 'Add functionality to PostHog or integrate with another product',
            url: '/docs/apps/build',
        },
        {
            title: 'API',
            description: 'Do literally anything with your data',
            url: '/docs/api',
        },
        {
            title: 'Webhooks',
            description: 'Hook it real good',
            url: '/docs/integrate/webhooks/message-formatting',
        },
    ]

    return (
        <div className="rounded-md md:flex">
            <section className="p-4 border-r border-gray-accent-light border-dashed">
                <div className="flex justify-between items-center opacity-50 mb-4">
                    <h2 className="text-sm font-semibold m-0 flex-shrink-0">Table of contents</h2>
                    <SearchBar className="flex-grow-0 !p-0 w-auto" base={'docs'} />
                </div>
                <ol className="m-0 list-none p-0">
                    {leftColMenuItems.map(({ title, description, url }: ColMenuItems) => {
                        return (
                            <li key={title}>
                                <Link className="rounded-md px-2 py-2 block hover:bg-tan hover:bg-opacity-50" to={url}>
                                    <h3 className="text-base m-0 opacity-70">{title}</h3>
                                    <p className="text-[14px] opacity-50 m-0 text-black font-medium">{description}</p>
                                </Link>
                            </li>
                        )
                    })}
                </ol>
                <CallToAction
                    className="inline-block mt-4 !bg-transparent"
                    width="full"
                    size="sm"
                    to="/docs"
                    type="outline"
                >
                    Visit Docs
                </CallToAction>
            </section>
            <section className="bg-gray-accent-light bg-opacity-10 p-4">
                <h2 className="text-sm opacity-50 font-semibold m-0 mb-4">PostHog platform</h2>
                <ol className="m-0 list-none p-0 max-w-[225px]">
                    {rightColMenuItems.map(({ title, description, url }: ColMenuItems) => {
                        return (
                            <li key={title}>
                                <Link className="rounded-md py-2 block" to={url}>
                                    <h3 className="text-base m-0 opacity-70">{title}</h3>
                                    <p className="text-[14px] opacity-50 m-0 text-black font-medium">{description}</p>
                                </Link>
                            </li>
                        )
                    })}
                </ol>
            </section>
        </div>
    )
}
