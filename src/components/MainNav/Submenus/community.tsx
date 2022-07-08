import { CallToAction } from 'components/CallToAction'
import { GitHub, LinkedIn, YouTube, Slack, Twitter } from 'components/Icons/Icons'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Squeak } from 'squeak-react'

interface Social {
    Icon: React.ReactNode
    url: string
}

interface ColMenuItems {
    title: string
    description: string
    url: string
}

export default function Docs() {
    const social: Social[] = [
        {
            Icon: <Slack className="w-[24px]" />,
            url: '/slack',
        },
        {
            Icon: <Twitter className="w-[24px]" />,
            url: 'https://twitter.com/posthog',
        },
        {
            Icon: (
                <span className="text-[#0A66C2]">
                    <LinkedIn className="w-[24px]" />
                </span>
            ),
            url: 'https://www.linkedin.com/company/posthog',
        },
        {
            Icon: (
                <span className="text-[#ED1D24]">
                    <YouTube className="w-[24px]" />
                </span>
            ),
            url: 'https://www.youtube.com/channel/UCn4mJ4kK5KVSvozJre645LA',
        },
        {
            Icon: (
                <span className="text-black">
                    <GitHub className="w-[24px]" />
                </span>
            ),
            url: 'https://github.com/PostHog',
        },
    ]

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
            <div className="flex justify-between items-center p-4 border-b border-gray-accent-light border-dashed">
                <h2 className="text-lg m-0 opacity-70 text-black">Community</h2>
                <ul className="list-none flex space-x-2">
                    {social.map(({ Icon, url }: Social) => {
                        return (
                            <li key={url}>
                                <Link to={url}>{Icon}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="flex">
                <div className="border-r border-gray-accent-light border-dashed w-[500px]">
                    <div className="p-4 ">
                        <div className="flex justify-between items-center">
                            <h3 className="text-[18px] opacity-70 m-0 text-black">Recent questions</h3>
                            <CallToAction to="/questions" type="outline" size="sm" className="!bg-transparent">
                                Ask a question
                            </CallToAction>
                        </div>
                        <div className=" h-[300px] overflow-auto overflow-x-hidden mt-4">
                            <Squeak
                                apiHost="https://squeak.cloud"
                                apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4aXBrcXV2d3FhYXVudXpqb2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk3MjE3ODUsImV4cCI6MTk2NTI5Nzc4NX0.SxdOpxHjVwap7sDUptK2TFJl7WK3v3HLuKbzb0JKeKg"
                                url="https://pxipkquvwqaaunuzjoge.supabase.co"
                                organizationId="a898bcf2-c5b9-4039-82a0-a00220a8c626"
                            />
                        </div>
                        <CallToAction
                            to="/questions"
                            width="full"
                            type="outline"
                            size="sm"
                            className="!bg-transparent mt-4"
                        >
                            Browse recent questions
                        </CallToAction>
                    </div>
                    <div className="py-7 px-4 border-t border-gray-accent-light border-dashed">
                        <div className="grid grid-cols-2 items-center">
                            <div>
                                <h3 className="text-[18px] opacity-70 mt-0 text-black">Merch</h3>
                                <p className="text-[14px]">
                                    Did you happen to be looking for hedgehog-themed merch? We’ve got just the thing...
                                </p>
                            </div>
                            <div>
                                <StaticImage width={280} alt="PostHog merch" src="../images/merch.png" />
                            </div>
                        </div>
                        <p className="text-[14px]">
                            P.S. Get free merch by{' '}
                            <Link className="text-red font-bold" to="https://github.com/PostHog">
                                contributing
                            </Link>{' '}
                            or{' '}
                            <Link className="text-red font-bold" to="/questions">
                                answering community questions
                            </Link>
                            .
                        </p>
                        <CallToAction
                            to="https://merch.posthog.com/collections/all"
                            width="full"
                            type="outline"
                            size="sm"
                            className="!bg-transparent mt-4"
                        >
                            Visit the merch store
                        </CallToAction>
                    </div>
                </div>
                <div className="bg-gray-accent-light bg-opacity-10 p-4">
                    <h2 className="text-[18px] opacity-70 font-bold m-0 mb-2 text-black">Resources</h2>
                    <ol className="m-0 list-none p-0 max-w-[225px]">
                        {resources.map(({ title, description, url }: ColMenuItems) => {
                            return (
                                <li key={title}>
                                    <Link className="rounded-md py-2 block" to={url}>
                                        <h3 className="text-base m-0 opacity-70 text-black">{title}</h3>
                                        <p className="text-[14px] opacity-50 m-0 text-black font-medium">
                                            {description}
                                        </p>
                                    </Link>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        </section>
    )
}
