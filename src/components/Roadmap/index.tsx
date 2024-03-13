import Layout from 'components/Layout'
import React, { useEffect, useState } from 'react'
import { SEO } from 'components/seo'
import Markdown from 'markdown-to-jsx'
import { User, useUser } from 'hooks/useUser'
import { CallToAction } from 'components/CallToAction'
import { useRoadmaps } from 'hooks/useRoadmaps'
import { IconThumbsUp, IconUndo } from '@posthog/icons'
import { graphql, useStaticQuery } from 'gatsby'
import { Skeleton } from 'components/Questions/QuestionsTable'
import SideModal from 'components/Modal/SideModal'
import { Authentication } from 'components/Squeak'
import groupBy from 'lodash.groupby'

const Feature = ({ id, title, teams, description, likeCount, onLike }) => {
    const { user, likeRoadmap } = useUser()
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const teamName = teams?.data?.[0]?.attributes?.name
    const liked = user?.profile?.roadmapLikes?.some(({ id: roadmapID }) => roadmapID === id)

    useEffect(() => {
        setLoading(false)
    }, [liked])

    const like = async (user?: User) => {
        setLoading(true)
        await likeRoadmap({ id, title, user, unlike: liked })
        onLike?.()
    }

    const onAuth = (user: User) => {
        like(user)
        setAuthModalOpen(false)
    }

    return (
        <>
            <SideModal title={title} open={authModalOpen} setOpen={setAuthModalOpen}>
                <h4 className="mb-4">Sign into PostHog.com</h4>
                <div className="bg-border dark:bg-border-dark p-4 mb-2">
                    <p className="text-sm mb-2">
                        <strong>Note: PostHog.com authentication is separate from your PostHog app.</strong>
                    </p>

                    <p className="text-sm mb-0">
                        We suggest signing up with your personal email. Soon you'll be able to link your PostHog app
                        account.
                    </p>
                </div>

                <Authentication initialView="sign-in" onAuth={onAuth} showBanner={false} showProfile={false} />
            </SideModal>
            <div className="flex space-x-4">
                <div className="text-center w-16 h-16 flex flex-col justify-center items-center bg-accent flex-shrink-0 relative">
                    <p className="m-0 leading-tight">
                        <strong>{likeCount}</strong>
                        <br />
                        vote{likeCount !== 1 && 's'}
                    </p>
                    {liked && <IconThumbsUp className="text-red w-5 h-5 absolute -top-2 -right-2" />}
                </div>
                <div>
                    <h3 className="text-lg m-0 leading-tight">{title}</h3>
                    {teamName && <p className="m-0 text-sm opacity-70 mt-0.5">{teamName} Team</p>}
                    <div className="mt-2">
                        <Markdown>{description}</Markdown>
                    </div>
                    <div className="mt-2">
                        <CallToAction
                            disabled={loading}
                            onClick={() => {
                                if (user) {
                                    like()
                                } else {
                                    setAuthModalOpen(true)
                                }
                            }}
                            size="sm"
                            type={liked ? 'outline' : 'primary'}
                        >
                            <span className="flex items-center space-x-1">
                                {liked ? (
                                    <>
                                        <IconUndo className="w-4 h-4" />
                                        <span>Unvote</span>
                                    </>
                                ) : (
                                    <>
                                        <IconThumbsUp className="w-4 h-4" />
                                        <span>Vote</span>
                                    </>
                                )}
                            </span>
                        </CallToAction>
                    </div>
                </div>
            </div>
        </>
    )
}

const Sort = ({ setSortBy, sortBy, className = '' }) => {
    return (
        <div className={`space-x-2 items-center ${className}`}>
            <p className="m-0 font-bold opacity-70 leading-none">Sort by</p>
            <div className="flex items-center">
                <SortButton
                    className="rounded-tl-md rounded-bl-md"
                    active={sortBy === 'votes'}
                    onClick={() => setSortBy('votes')}
                >
                    Votes
                </SortButton>
                <SortButton className="border-x-0" active={sortBy === 'team'} onClick={() => setSortBy('team')}>
                    Team
                </SortButton>
                <SortButton
                    className="rounded-tr-md rounded-br-md"
                    active={sortBy === 'new'}
                    onClick={() => setSortBy('new')}
                >
                    New
                </SortButton>
            </div>
        </div>
    )
}

const SortButton = ({ active, onClick, children, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-1 border text-sm border-border dark:border-dark ${
                active ? 'bg-accent dark:bg-accent-dark font-bold' : ''
            } ${className}`}
        >
            {children}
        </button>
    )
}

export default function Roadmap() {
    const [sortBy, setSortBy] = useState('votes')
    const { staticRoadmaps } = useStaticQuery(graphql`
        {
            staticRoadmaps: allSqueakRoadmap {
                nodes {
                    githubPages {
                        reactions {
                            total_count
                        }
                    }
                    squeakId
                }
            }
        }
    `)

    const {
        roadmaps: initialRoadmaps,
        mutate,
        isLoading,
    } = useRoadmaps({
        params: {
            filters: {
                dateCompleted: {
                    $null: true,
                },
                projectedCompletion: {
                    $null: true,
                },
            },
        },
    })
    const roadmaps = initialRoadmaps.map(({ id, attributes }) => {
        const likeCount = attributes?.likes?.data?.length || 0
        const staticLikeCount =
            staticRoadmaps.nodes.find((node) => node.squeakId === id)?.githubPages?.[0]?.reactions?.total_count || 0
        return { id, attributes: { ...attributes, likeCount: likeCount + staticLikeCount } }
    })
    const roadmapsGroupedByTeam = groupBy(
        roadmaps,
        (roadmap) => roadmap.attributes.teams?.data?.[0]?.attributes?.name ?? 'Any'
    )

    return (
        <Layout>
            <SEO title="PostHog Roadmap" />
            <section className="max-w-[700px] mx-auto px-5 mt-8 mb-12">
                <div className="relative ">
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-3xl sm:text-5xl my-0">Roadmap</h1>
                        <Sort className="hidden sm:flex" setSortBy={setSortBy} sortBy={sortBy} />
                    </div>
                    <p className="my-0 font-semibold opacity-70 mt-2">
                        Here's what we're thinking about building next. Vote for your favorites, or request a new
                        feature on GitHub.
                    </p>
                    <Sort className="sm:hidden flex mt-4" setSortBy={setSortBy} sortBy={sortBy} />
                </div>
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <ul className="m-0 p-0 list-none mt-6 space-y-8">
                        {sortBy === 'votes' || sortBy === 'new' ? (
                            [...roadmaps]
                                .sort((a, b) => {
                                    return sortBy === 'votes'
                                        ? b.attributes.likeCount - a.attributes.likeCount
                                        : b.attributes.createdAt - a.attributes.createdAt
                                })
                                .map((roadmap) => {
                                    return (
                                        <li
                                            className="first:pt-8 first:border-t border-border dark:border-dark"
                                            key={roadmap.id}
                                        >
                                            <Feature id={roadmap.id} {...roadmap.attributes} onLike={mutate} />
                                        </li>
                                    )
                                })
                        ) : (
                            <ul className="m-0 p-0 list-none mt-6 space-y-10">
                                {Object.keys(roadmapsGroupedByTeam)
                                    .sort()
                                    .map((team) => {
                                        const roadmaps = roadmapsGroupedByTeam[team]
                                        return (
                                            <li className="relative" key={team}>
                                                <h4 className="m-0 mb-6 pr-2 inline-flex items-center bg-tan after:-z-10 after:absolute after:w-full after:h-[1px] after:bg-border after:dark:bg-border-dark after:translate-y-[2px]">
                                                    {team} Team
                                                </h4>
                                                <ul className="m-0 p-0 list-none space-y-8">
                                                    {[...roadmaps]
                                                        .sort((a, b) => b.attributes.likeCount - a.attributes.likeCount)
                                                        .map((roadmap) => {
                                                            return (
                                                                <li key={roadmap.id}>
                                                                    <Feature
                                                                        id={roadmap.id}
                                                                        {...roadmap.attributes}
                                                                        onLike={mutate}
                                                                    />
                                                                </li>
                                                            )
                                                        })}
                                                </ul>
                                            </li>
                                        )
                                    })}
                            </ul>
                        )}
                    </ul>
                )}
            </section>
        </Layout>
    )
}
