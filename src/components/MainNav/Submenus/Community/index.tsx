import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import { Squeak } from 'squeak-react'
import Header from '../Header'
import RightCol from '../RightCol'
import CallToAction from '../CallToAction'
import { Wrapper } from '../Wrapper'
import { graphql, useStaticQuery } from 'gatsby'
import slugify from 'slugify'
import { labelOverrides } from '../../../../templates/SqueakTopic'
import { sentenceCase } from 'lib/utils'

interface ColMenuItems {
    title: string
    description: string
    url: string
}

export default function Docs({ referenceElement }: { referenceElement: HTMLDivElement }) {
    const { topicGroups } = useStaticQuery(query)

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
        <Wrapper referenceElement={referenceElement} placement="bottom-end">
            <section className="flex md:flex-col flex-col-reverse">
                <Header title="Community" />
                <div className="md:flex md:p-0 p-5">
                    <div className="md:border-r border-gray-accent-light border-dashed w-full md:w-[500px] lg:w-[650px]">
                        <div className="md:p-6 lg:px-9 md:pr-3 md:mb-0 mb-4">
                            <div>
                                <div className="flex justify-between items-center mr-2">
                                    <h3 className="text-[18px] opacity-70 m-0 md:mr-6 text-black">
                                        Community questions
                                    </h3>
                                    <CallToAction to="/questions">Ask a question</CallToAction>
                                </div>
                                <ul className="grid grid-cols-3 m-0 p-0 list-none mt-2">
                                    {topicGroups.nodes.map(({ label, topics }) => {
                                        return (
                                            topics.length > 0 && (
                                                <li>
                                                    <h3 className="text-base opacity-70 m-0 md:mr-6 text-black">
                                                        {label}
                                                    </h3>
                                                    <ul className="list-none m-0 p-0 mt-2 ">
                                                        {topics.map(({ label }) => {
                                                            return (
                                                                <li key={label}>
                                                                    <Link
                                                                        className="text-sm font-bold text-red"
                                                                        to={`/questions/${slugify(label, {
                                                                            lower: true,
                                                                        })}`}
                                                                    >
                                                                        {labelOverrides[label.toLowerCase()] ||
                                                                            sentenceCase(label)}
                                                                    </Link>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </li>
                                            )
                                        )
                                    })}
                                </ul>
                            </div>

                            <div className="md:mr-2 mt-2">
                                <CallToAction to="/questions" className="!w-full mt-4">
                                    Browse recent questions
                                </CallToAction>
                            </div>
                        </div>
                        <div className="py-7 md:px-6 lg:px-9 border-t md:border-b-0 border-b md:mb-0 mb-4 border-gray-accent-light border-dashed">
                            <div className="grid sm:grid-cols-2 items-center">
                                <div>
                                    <h3 className="text-[18px] opacity-70 mt-0 text-black">Merch</h3>
                                    <p className="text-[14px] dark:text-white">
                                        Did you happen to be looking for hedgehog-themed merch? We've got just the
                                        thing...
                                    </p>
                                </div>
                                <div>
                                    <StaticImage
                                        className="pointer-events-none"
                                        width={280}
                                        alt="PostHog merch"
                                        src="../../images/merch.png"
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
                                        <Link
                                            className="rounded-sm py-2 px-3 block hover:bg-tan/50 relative active:top-[1px] active:scale-[.99]"
                                            to={url}
                                        >
                                            <h3 className="text-base m-0 opacity-70 text-black">{title}</h3>
                                            <p className="text-sm opacity-50 m-0 text-black font-medium dark:text-white">
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
        </Wrapper>
    )
}

const query = graphql`
    {
        topicGroups: allSqueakTopicGroup {
            nodes {
                label
                topics {
                    id
                    label
                }
            }
        }
    }
`
