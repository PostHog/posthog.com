import CallToAction from '../CallToAction'
import Link from 'components/Link'
import React from 'react'
import SearchBar from '../../../../templates/Handbook/SearchBar'
import { Wrapper } from '../Wrapper'

interface ColMenuItems {
    title: string
    description: string
    url: string
}

export default function Docs({ referenceElement }: { referenceElement: HTMLDivElement }) {
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
        <Wrapper referenceElement={referenceElement} placement="bottom-start">
            <div className="rounded-md md:flex">
                <section className="p-6 border-r border-gray-accent-light border-dashed">
                    <div className="flex items-center w-full justify-between opacity-70">
                        <h3 className="text-[18px] font-bold m-0 text-black pl-2">Table of contents</h3>
                        <SearchBar label={false} className="flex-grow-0 !p-0 w-auto dark:text-white" base={'docs'} />
                    </div>
                    <ol className="m-0 list-none p-0 mt-2">
                        {leftColMenuItems.map(({ title, description, url }: ColMenuItems, index) => {
                            return (
                                <li key={title}>
                                    <Link
                                        className="rounded-sm md:px-2 py-2 hover:bg-tan hover:bg-opacity-50 flex items-start space-x-2 relative active:top-[1px] active:scale-[.99]"
                                        to={url}
                                    >
                                        <span className="text-[14px] text-black/30 text-center leading-none font-semibold dark:text-white mt-[2px] w-4">
                                            {index + 1}.
                                        </span>
                                        <div>
                                            <h3 className="text-base m-0 opacity-70">{title}</h3>
                                            <p className="text-[14px] opacity-50 m-0 text-black font-medium dark:text-white">
                                                {description}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })}
                    </ol>
                    <CallToAction className="inline-block mt-4 !w-full" to="/docs">
                        Visit the docs
                    </CallToAction>
                </section>
                <section className="bg-gray-accent-light bg-opacity-10 pt-6 px-3 pb-3">
                    <h3 className="text-[18px] font-bold m-0 text-black/70 pl-3">PostHog platform</h3>
                    <ol className="m-0 list-none p-0 max-w-[250px] mt-2">
                        {rightColMenuItems.map(({ title, description, url }: ColMenuItems) => {
                            return (
                                <li key={title}>
                                    <Link
                                        className="rounded-sm py-2 px-3 block hover:bg-tan hover:bg-opacity-50 relative active:top-[1px] active:scale-[.99]"
                                        to={url}
                                    >
                                        <h3 className="text-base m-0 opacity-70">{title}</h3>
                                        <p className="text-[14px] opacity-50 m-0 text-black font-medium dark:text-white">
                                            {description}
                                        </p>
                                    </Link>
                                </li>
                            )
                        })}
                    </ol>
                </section>
            </div>
        </Wrapper>
    )
}
