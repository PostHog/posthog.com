import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Header from '../Header'
import RightCol from '../RightCol'
import CallToAction from '../CallToAction'
import { TwoCol, Wrapper } from '../Wrapper'
import { graphql, useStaticQuery } from 'gatsby'
import slugify from 'slugify'
import { Avatar, Login } from '../../../../pages/community'
import { useUser } from 'squeak-react'

interface ColMenuItems {
    title: string
    description: string
    url: string
}

const Profile = () => {
    const { user } = useUser()
    const profile = user?.profile
    return profile ? (
        <div>
            <div className="flex items-center space-x-2 mt-4 mb-3">
                <Avatar src={profile.avatar} className="w-[40px] h-[40px]" />
                <div>
                    {
                        <p className="m-0 font-semibold">
                            {[profile?.first_name, profile?.last_name].filter(Boolean).join(' ')}
                        </p>
                    }
                </div>
            </div>
            <CallToAction to={`/community/profiles/${profile?.id}`} className="!w-full" size="xs" type="secondary">
                Visit profile
            </CallToAction>
        </div>
    ) : (
        <Login />
    )
}

export default function Docs({ referenceElement }: { referenceElement: HTMLDivElement }) {
    const {
        topicGroups,
        questions: { allTopics },
    } = useStaticQuery(query)

    const resources: ColMenuItems[] = [
        {
            title: 'Product roadmap',
            description: "See what we're building, and help us decide what to build next.",
            url: '/roadmap',
        },
        {
            title: 'Partner directory',
            description: 'Companies and products who can help with PostHog',
            url: '/partners',
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

    const topicGroupsToShow = ['Deployment', 'Features']

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
                                <p className="mt-4 dark:text-white">
                                    Ask and answer community questions about PostHog. These questions are posted across
                                    PostHog.com and aggregated here.
                                </p>
                                <ul className="grid grid-cols-2 m-0 p-0 list-none mt-2 gap-x-6">
                                    {topicGroups.nodes
                                        .filter((node) => topicGroupsToShow.includes(node.label))
                                        .map(({ label, topics }) => {
                                            return (
                                                topics.length > 0 && (
                                                    <li>
                                                        <h3 className="text-base opacity-70 m-0 md:mr-6 text-black">
                                                            {label}
                                                        </h3>
                                                        <ul className="list-none m-0 p-0 mt-2 ">
                                                            {topics
                                                                .sort((a, b) => {
                                                                    return (
                                                                        allTopics.find(
                                                                            (topic) => topic.topic === b.label
                                                                        )?.count -
                                                                        allTopics.find(
                                                                            (topic) => topic.topic === a.label
                                                                        )?.count
                                                                    )
                                                                })
                                                                .slice(0, 4)
                                                                .map(({ label }) => {
                                                                    return (
                                                                        <li
                                                                            className="last:border-b-0 py-2 border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark"
                                                                            key={label}
                                                                        >
                                                                            <Link
                                                                                className="text-sm font-bold text-red flex w-full space-x-2"
                                                                                to={`/questions/topics/${slugify(
                                                                                    label,
                                                                                    {
                                                                                        lower: true,
                                                                                    }
                                                                                )}`}
                                                                            >
                                                                                <span>{label}</span>
                                                                                <span className="text-black dark:text-white opacity-50 font-semibold">
                                                                                    (
                                                                                    {
                                                                                        allTopics.find(
                                                                                            (topic) =>
                                                                                                topic.topic === label
                                                                                        )?.count
                                                                                    }
                                                                                    )
                                                                                </span>
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
                        <TwoCol
                            left={{
                                title: 'Roadmap',
                                cta: {
                                    url: '/roadmap',
                                    label: 'Browse roadmap',
                                },
                                children: (
                                    <p className="m-0 text-[14px] dark:text-white">
                                        See what we're building, and help us decide what to build next.
                                    </p>
                                ),
                            }}
                            right={{
                                title: 'Changelog',
                                cta: {
                                    url: '/roadmap/changelog',
                                    label: 'Browse changelog',
                                },
                                children: (
                                    <p className="m-0 text-[14px] dark:text-white">
                                        Take a trip down memory lane of our top company and product milestones.
                                    </p>
                                ),
                            }}
                        />
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
                    <RightCol title="My profile">
                        <div className="px-3">
                            <div className="mb-6">
                                <Profile />
                            </div>
                        </div>
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
        questions: allQuestion {
            allTopics: group(field: topics___topic___label) {
                topic: fieldValue
                count: totalCount
            }
        }
    }
`
