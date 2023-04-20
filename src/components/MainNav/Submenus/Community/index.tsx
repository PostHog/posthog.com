import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Header from '../Header'
import RightCol from '../RightCol'
import CallToAction from '../CallToAction'
import { Block, TwoCol, Wrapper } from '../Wrapper'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import slugify from 'slugify'
import { Avatar, Login } from '../../../../pages/community/Dashboard'
import { useUser } from 'hooks/useUser'
import getAvatarURL from '../../../Squeak/util/getAvatar'
import { AbTesting, Analytics, FeatureFlags, SessionRecording } from 'components/ProductIcons'
import { More } from 'components/NotProductIcons'

interface ColMenuItems {
    title: string
    description: string
    url: string
}

const ProductItem = ({ title, icon, url }) => {
    return (
        <li className="md:max-w-[100px]">
            <Link
                className="group h-full cursor-pointer rounded-sm md:px-2 py-2 hover:bg-tan hover:bg-opacity-50 flex flex-col justify-start items-center space-y-2 relative hover:scale-[1.01] hover:top-[-.5px] active:top-[.5px] active:scale-[.99]"
                to={url}
            >
                <span className="w-7 h-7 text-black dark:text-white opacity-60 group-hover:opacity-100">{icon}</span>
                <h3 className="text-sm m-0 opacity-70 font-bold text-center leading-none">{title}</h3>
            </Link>
        </li>
    )
}

const Profile = () => {
    const { user } = useUser()
    const profile = user?.profile

    return profile ? (
        <div>
            <div className="flex items-center space-x-2 mt-4 mb-3">
                <Avatar src={getAvatarURL(profile)} className="w-[40px] h-[40px]" />
                <div>
                    {
                        <p className="m-0 font-semibold dark:text-white">
                            {[profile.firstName, profile.lastName].filter(Boolean).join(' ')}
                        </p>
                    }
                </div>
            </div>
            <CallToAction to={`/community/profiles/${profile?.id}`} className="!w-full" size="xs" type="secondary">
                Visit profile
            </CallToAction>
        </div>
    ) : (
        <Login onSubmit={() => navigate('/community')} />
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

    const topicGroupsToShow = ['Product features', 'Setup & platform']

    return (
        <Wrapper referenceElement={referenceElement} placement="bottom-end">
            <section className="flex md:flex-col flex-col-reverse">
                <Header title="Community" />
                <div className="md:flex md:p-0 p-5">
                    <div className="md:border-r border-gray-accent-light border-dashed w-full md:w-[500px] lg:w-[650px]">
                        <div className="md:p-6 lg:px-9 md:pr-3 md:mb-0">
                            <div>
                                <div className="flex justify-between items-center mr-2">
                                    <h3 className="text-[18px] opacity-70 m-0 md:mr-6 text-black">
                                        Community questions
                                    </h3>
                                </div>
                                <p className="mt-2 text-sm dark:text-primary-dark">
                                    Ask and answer community questions about PostHog.
                                </p>

                                <h3 className="text-base font-bold m-0 text-black pl-2">Topics</h3>
                                <ol className="grid grid-cols-2 md:grid-cols-5 space-x-[1px] list-none p-0 pb-4 mt-2 -mx-6 px-6">
                                    <ProductItem
                                        title="Product analytics"
                                        icon={<Analytics />}
                                        url="/questions/topic/product-analytics"
                                    />
                                    <ProductItem
                                        title="Session replay"
                                        icon={<SessionRecording />}
                                        url="/questions/topic/session-replay"
                                    />
                                    <ProductItem
                                        title="Feature flags"
                                        icon={<FeatureFlags />}
                                        url="/questions/topic/feature-flags"
                                    />
                                    <ProductItem
                                        title="A/B testing"
                                        icon={<AbTesting />}
                                        url="/questions/topic/ab-testing"
                                    />
                                    <ProductItem title="More" icon={<More />} url="/questions" />
                                </ol>
                            </div>

                            <div className="md:mr-2">
                                <CallToAction to="/questions" className="!w-full mt-4">
                                    Browse topics
                                </CallToAction>
                            </div>
                        </div>

                        <div className="border-t border-gray-accent-light border-dashed">
                            <div className="max-w-3xl mx-auto xl:max-w-auto">
                                <Block title="Roadmap" cta={{ url: '/roadmap', label: 'Browse roadmap' }}>
                                    <p className="m-0 text-[14px] dark:text-white">
                                        See what we're building, and help us decide what to build next.
                                    </p>
                                </Block>
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
                            <CallToAction to="https://merch.posthog.com" className="!w-full mt-4">
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
        questions: allSqueakQuestion {
            allTopics: group(field: topics___label) {
                topic: fieldValue
                count: totalCount
            }
        }
    }
`
