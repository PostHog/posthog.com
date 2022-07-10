import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Squeak } from 'squeak-react'
import Header from './Header'
import RightCol from './RightCol'
import CallToAction from './CallToAction'

interface ColMenuItems {
    title: string
    description: string
    url: string
}

export default function Docs() {
    const resources: ColMenuItems[] = [
        {
            title: 'Marketplace',
            description: 'Companies and products who can help with PostHog',
            url: '/marketplace',
        },
        {
            title: 'Contributors',
            description: 'Fix a bug, get credit for the merch store (and warm fuzzies)',
            url: '/contributors',
        },
        {
            title: 'Issues',
            description: 'Browse recent issues on GitHub',
            url: 'https://github.com/PostHog/posthog/issues',
        },
        {
            title: 'Get involved',
            description: 'Explore “good first issues” on GitHub',
            url: 'https://github.com/PostHog/posthog/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22',
        },
        {
            title: 'Slack community',
            description: 'Chat in realtime with the team and other community members',
            url: '/slack',
        },
        {
            title: 'PostHog FM',
            description: 'An ever-evolving selection of the PostHog team’s top tracks',
            url: 'https://open.spotify.com/playlist/7A2H2J3WhpJmMEwAhKahWH?si=47418915a8d0447b',
        },
    ]

    return (
        <section>
            <Header title="Community" />
            <div className="md:flex md:p-0 p-5">
                <div className="md:border-r border-gray-accent-light border-dashed md:w-[500px]">
                    <div className="md:p-4 md:mb-0 mb-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-[18px] opacity-70 m-0 text-black">Recent questions</h3>
                            <CallToAction to="/questions">Ask a question</CallToAction>
                        </div>
                        <div className=" h-[300px] overflow-auto overflow-x-hidden mt-4">
                            <Squeak
                                slug={null}
                                apiHost="https://squeak.cloud"
                                apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4aXBrcXV2d3FhYXVudXpqb2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk3MjE3ODUsImV4cCI6MTk2NTI5Nzc4NX0.SxdOpxHjVwap7sDUptK2TFJl7WK3v3HLuKbzb0JKeKg"
                                url="https://pxipkquvwqaaunuzjoge.supabase.co"
                                organizationId="a898bcf2-c5b9-4039-82a0-a00220a8c626"
                            />
                        </div>
                        <CallToAction to="/questions" className="!w-full mt-4">
                            Browse recent questions
                        </CallToAction>
                    </div>
                    <div className="py-7 md:px-4 border-t md:border-b-0 border-b md:mb-0 mb-4 border-gray-accent-light border-dashed">
                        <div className="grid sm:grid-cols-2 items-center">
                            <div>
                                <h3 className="text-[18px] opacity-70 mt-0 text-black">Merch</h3>
                                <p className="text-[14px] dark:text-white">
                                    Did you happen to be looking for hedgehog-themed merch? We’ve got just the thing...
                                </p>
                            </div>
                            <div>
                                <StaticImage
                                    className="pointer-events-none"
                                    width={280}
                                    alt="PostHog merch"
                                    src="../images/merch.png"
                                />
                            </div>
                        </div>
                        <p className="text-[14px] dark:text-white">
                            P.S. Get free merch by{' '}
                            <Link className="text-red hover:text-red font-bold" to="https://github.com/PostHog">
                                contributing
                            </Link>{' '}
                            or{' '}
                            <Link className="text-red hover:text-red font-bold" to="/questions">
                                answering community questions
                            </Link>
                            .
                        </p>
                        <CallToAction to="https://merch.posthog.com/collections/all" className="!w-full mt-4">
                            Visit the merch store
                        </CallToAction>
                    </div>
                </div>
                <RightCol title="Resources">
                    <ol className="m-0 list-none p-0">
                        {resources.map(({ title, description, url }: ColMenuItems) => {
                            return (
                                <li key={title}>
                                    <Link className="rounded-md py-2 block" to={url}>
                                        <h3 className="text-base m-0 opacity-70 text-black">{title}</h3>
                                        <p className="text-[14px] opacity-50 m-0 text-black font-medium dark:text-white">
                                            {description}
                                        </p>
                                    </Link>
                                </li>
                            )
                        })}
                    </ol>
                </RightCol>
            </div>
        </section>
    )
}
