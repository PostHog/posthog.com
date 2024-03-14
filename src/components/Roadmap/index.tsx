import Layout from 'components/Layout'
import React, { useEffect, useMemo, useState } from 'react'
import { SEO } from 'components/seo'
import Markdown from 'markdown-to-jsx'
import { User, useUser } from 'hooks/useUser'
import { CallToAction } from 'components/CallToAction'
import { useRoadmaps } from 'hooks/useRoadmaps'
import { IconThumbsUp, IconUndo } from '@posthog/icons'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import { Skeleton } from 'components/Questions/QuestionsTable'
import SideModal from 'components/Modal/SideModal'
import { Authentication } from 'components/Squeak'
import groupBy from 'lodash.groupby'
import UpdateWrapper from './UpdateWrapper'
import RoadmapForm from 'components/RoadmapForm'
import Link from 'components/Link'
import slugify from 'slugify'
import { useLocation } from '@reach/router'
import Slider from 'components/Slider'
import CommunityLayout from 'components/Community/Layout'
import { companyMenu } from '../../navs'
import Fuse from 'fuse.js'

const Feature = ({ id, title, teams, description, likeCount, onLike, onUpdate }) => {
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
            <UpdateWrapper
                id={id}
                status="under-consideration"
                editButtonClassName="absolute bottom-0 right-0"
                onSubmit={() => onUpdate()}
            >
                <div className="flex space-x-4">
                    <div className="text-center w-16 h-16 flex flex-col justify-center items-center bg-accent dark:bg-accent-dark flex-shrink-0 relative">
                        <p className="m-0 leading-none">
                            <strong className="text-lg leading-none">{likeCount}</strong>
                            <br />
                            <span className="text-sm">vote{likeCount !== 1 && 's'}</span>
                        </p>
                        {liked && <IconThumbsUp className="text-red w-5 h-5 absolute -top-2 -right-2" />}
                    </div>
                    <div>
                        <h3 className="text-lg m-0 leading-tight">{title}</h3>
                        {teamName && (
                            <Link
                                to={`/teams/${slugify(teamName.toLowerCase().replace('ops', ''), {
                                    remove: /and/,
                                })}`}
                                className="text-sm opacity-70 text-inherit hover:opacity-100 hover:text-red dark:hover:text-yellow mt-0.5"
                            >
                                {teamName} Team
                            </Link>
                        )}
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
            </UpdateWrapper>
        </>
    )
}

const Sort = ({ sortBy, className = '' }) => {
    return (
        <div className={`space-x-2 items-center ${className}`}>
            <p className="m-0 font-bold opacity-70 leading-none">Sort by</p>
            <div className="flex items-center">
                <SortButton
                    className="rounded-tl-md rounded-bl-md"
                    active={sortBy === 'popular'}
                    onClick={() => navigate(`?sort=popular`)}
                >
                    Popular
                </SortButton>
                <SortButton className="border-x-0" active={sortBy === 'team'} onClick={() => navigate(`?sort=team`)}>
                    Team
                </SortButton>
                <SortButton
                    className="rounded-tr-md rounded-br-md"
                    active={sortBy === 'latest'}
                    onClick={() => navigate(`?sort=latest`)}
                >
                    Latest
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
    const { search } = useLocation()
    const { user } = useUser()
    const [sortBy, setSortBy] = useState('popular')
    const [adding, setAdding] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState('All teams')
    const [roadmapSearch, setRoadmapSearch] = useState('')
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

    const fuse = useMemo(
        () => new Fuse(initialRoadmaps, { keys: ['attributes.title', 'attributes.description'], includeMatches: true }),
        [initialRoadmaps]
    )
    const filteredRoadmaps = useMemo(() => {
        const results = fuse.search(roadmapSearch).map(({ item }) => item)
        return results.length > 0 ? results : null
    }, [fuse, roadmapSearch])

    useEffect(() => {
        const params = new URLSearchParams(search)
        const sort = params.get('sort')
        const team = params.get('team')
        if (sort) {
            setSortBy(sort)
        }
        if (team) {
            setSelectedTeam(team)
        }
    }, [search])

    const roadmaps = (filteredRoadmaps || initialRoadmaps).map(({ id, attributes }) => {
        const likeCount = attributes?.likes?.data?.length || 0
        const staticLikeCount =
            staticRoadmaps.nodes.find((node) => node.squeakId === id)?.githubPages?.[0]?.reactions?.total_count || 0
        return { id, attributes: { ...attributes, likeCount: likeCount + staticLikeCount } }
    })
    const roadmapsGroupedByTeam = groupBy(
        roadmaps,
        (roadmap) => `${roadmap.attributes.teams?.data?.[0]?.attributes?.name ?? 'Any'} Team`
    )
    const teams = Object.keys(roadmapsGroupedByTeam).sort()
    const isModerator = user?.role?.type === 'moderator'

    return (
        <CommunityLayout
            parent={companyMenu}
            activeInternalMenu={companyMenu.children.find(({ name }) => name.toLowerCase() === 'roadmap')}
            title="Roadmap"
        >
            <section>
                <div className="relative">
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-3xl sm:text-5xl my-0">Roadmap</h1>
                        <Sort className="hidden sm:flex" setSortBy={setSortBy} sortBy={sortBy} />
                    </div>
                    <p className="my-0 font-semibold mt-2">
                        <span className="opacity-70">
                            Here's what we're thinking about building next. Vote for your favorites, or request a new
                            feature{' '}
                        </span>
                        <Link externalNoIcon to="https://github.com/PostHog/posthog">
                            on GitHub
                        </Link>
                        <span className="opacity-70">.</span>
                    </p>
                    <Sort className="sm:hidden flex mt-4" setSortBy={setSortBy} sortBy={sortBy} />
                </div>
                <div className="mt-4">
                    {isModerator &&
                        (adding ? (
                            <RoadmapForm
                                status="under-consideration"
                                onSubmit={() => {
                                    mutate()
                                    setAdding(false)
                                }}
                            />
                        ) : (
                            <CallToAction onClick={() => setAdding(true)} size="sm" type="primary">
                                New feature request
                            </CallToAction>
                        ))}
                </div>
                <input
                    onChange={(e) => setRoadmapSearch(e.target.value)}
                    placeholder="Type to search..."
                    className="w-full p-2 rounded-md border border-border dark:border-dark"
                />
                {sortBy === 'team' && teams.length > 0 && (
                    <Slider activeIndex={teams.indexOf(selectedTeam)} className="whitespace-nowrap space-x-2 mt-4">
                        {['All teams', ...teams].map((team) => {
                            return (
                                <button
                                    key={team}
                                    onClick={() => navigate(`?sort=team&team=${encodeURIComponent(team)}`)}
                                    className={`px-4 py-1 text-sm border border-border dark:border-dark rounded-md ${
                                        selectedTeam === team ? 'bg-accent' : ''
                                    }`}
                                >
                                    {team}
                                </button>
                            )
                        })}
                    </Slider>
                )}
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <ul className="m-0 p-0 list-none mt-6 space-y-8">
                        {sortBy === 'popular' || sortBy === 'latest' ? (
                            [...roadmaps]
                                .sort((a, b) => {
                                    return sortBy === 'popular'
                                        ? b.attributes.likeCount - a.attributes.likeCount
                                        : b.attributes.createdAt - a.attributes.createdAt
                                })
                                .map((roadmap) => {
                                    return (
                                        <li
                                            className="first:pt-8 first:border-t border-border dark:border-dark"
                                            key={roadmap.id}
                                        >
                                            <Feature
                                                id={roadmap.id}
                                                {...roadmap.attributes}
                                                onLike={mutate}
                                                onUpdate={mutate}
                                            />
                                        </li>
                                    )
                                })
                        ) : (
                            <ul className="m-0 p-0 list-none mt-6 space-y-10">
                                {teams
                                    .filter((team) => selectedTeam === 'All teams' || team === selectedTeam)
                                    .map((team) => {
                                        const roadmaps = roadmapsGroupedByTeam[team]
                                        return (
                                            <li className="relative" key={team}>
                                                <h4 className="m-0 mb-6 pr-2 inline-flex items-center bg-light dark:bg-dark after:-z-10 after:absolute after:w-full after:h-[1px] after:bg-border after:dark:bg-border-dark after:translate-y-[2px]">
                                                    {team}
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
                                                                        onUpdate={mutate}
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
        </CommunityLayout>
    )
}
