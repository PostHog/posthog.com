import Layout from 'components/Layout'
import React, { useEffect, useState } from 'react'
import { SEO } from 'components/seo'
import Markdown from 'markdown-to-jsx'
import { useUser } from 'hooks/useUser'
import { CallToAction } from 'components/CallToAction'
import { useRoadmaps } from 'hooks/useRoadmaps'
import { IconThumbsUp } from '@posthog/icons'
import { graphql, useStaticQuery } from 'gatsby'

const Feature = ({ title, teams, description, likeCount, liked, onLike }) => {
    const [loading, setLoading] = useState(false)
    const teamName = teams?.data?.[0]?.attributes?.name

    useEffect(() => {
        setLoading(false)
    }, [liked])

    return (
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
                            setLoading(true)
                            onLike()
                        }}
                        size="md"
                        type={liked ? 'outline' : 'primary'}
                    >
                        {liked ? 'Unvote' : 'Vote'}
                    </CallToAction>
                </div>
            </div>
        </div>
    )
}
export default function Roadmap() {
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

    const { roadmaps: initialRoadmaps, mutate } = useRoadmaps({
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
    const { user, likeRoadmap } = useUser()
    const roadmaps = initialRoadmaps.map(({ id, attributes }) => {
        const likeCount = attributes?.likes?.data?.length || 0
        const staticLikeCount =
            staticRoadmaps.nodes.find((node) => node.squeakId === id)?.githubPages?.[0]?.reactions?.total_count || 0
        return { id, attributes: { ...attributes, likeCount: likeCount + staticLikeCount } }
    })

    return (
        <Layout>
            <SEO title="PostHog Roadmap" />
            <section className="max-w-4xl mx-auto py-12">
                <h1 className="m-0 mb-1">Roadmap</h1>
                <p>
                    Here's what we're thinking about building next. Vote for your favorites, or request a new feature on
                    GitHub.
                </p>
                <ul className="m-0 p-0 list-none mt-8 space-y-8">
                    {[...roadmaps]
                        .sort((a, b) => b.attributes.likeCount - a.attributes.likeCount)
                        .map((roadmap) => {
                            const liked = user?.profile?.roadmapLikes?.some(({ id }) => id === roadmap.id)

                            return (
                                <li key={roadmap.id}>
                                    <Feature
                                        {...roadmap.attributes}
                                        onLike={async () => {
                                            await likeRoadmap(roadmap.id, liked, roadmap.attributes.title)
                                            mutate()
                                        }}
                                        liked={liked}
                                    />
                                </li>
                            )
                        })}
                </ul>
            </section>
        </Layout>
    )
}
