import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import { useStaticQuery } from 'gatsby'
import OSTable from 'components/OSTable'
import { Link } from 'gatsby'
import { IconArrowRight, IconCalendar, IconThumbsUp, IconUndo } from '@posthog/icons'
import OSTabs from 'components/OSTabs'
import Markdown from 'markdown-to-jsx'
import { useRoadmaps } from 'hooks/useRoadmaps'
import { useApp } from '../../../context/App'
import { CallToAction } from 'components/CallToAction'
import { useUser } from 'hooks/useUser'
import ProgressBar from 'components/ProgressBar'
import { preparePreviewText } from 'components/Editor/SearchUtils'
const Table = ({ columns, rows }: { columns: any; rows: any }) => {
    return (
        <div>
            <OSTable columns={columns} rows={rows} />
            <div className="bg-accent p-1 text-left text-xs border-primary border-x border-b flex justify-end">
                <Link to="/roadmap" state={{ newWindow: true }} className="hover:underline">
                    open <IconCalendar className="inline-block size-4 text-primary" /> Roadmap{' '}
                    <IconArrowRight className="inline-block -rotate-45 size-4 text-primary" />
                </Link>
            </div>
        </div>
    )
}

const VoteButton = ({ roadmap, onLike }: { roadmap: any; onLike: () => void }) => {
    const {
        id,
        attributes: { title },
    } = roadmap
    const { likeRoadmap, user } = useUser()
    const { openSignIn } = useApp()
    const [loading, setLoading] = React.useState(false)
    const liked = user?.profile?.roadmapLikes?.some(({ id: roadmapID }) => roadmapID === id)

    useEffect(() => {
        setLoading(false)
    }, [liked])

    const like = async () => {
        setLoading(true)
        await likeRoadmap({ id, title, user, unlike: liked })
        onLike?.()
    }

    return (
        <CallToAction
            disabled={loading}
            onClick={() => {
                if (user) {
                    like()
                } else {
                    openSignIn()
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
    )
}

const UnderConsiderationTable = ({ data }: { data: any }) => {
    const {
        roadmaps: initialRoadmaps,
        mutate,
        isLoading,
    } = useRoadmaps({
        limit: 100,
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

    const roadmaps = React.useMemo(() => {
        return initialRoadmaps.map((roadmap) => {
            const likeCount = roadmap?.attributes?.likes?.data?.length || 0
            const staticLikeCount =
                data.nodes.find((node: any) => node.squeakId === roadmap.id)?.githubPages?.[0]?.reactions
                    ?.total_count || 0
            return { ...roadmap, likes: likeCount + staticLikeCount }
        })
    }, [initialRoadmaps, data])

    return isLoading ? (
        <ProgressBar />
    ) : (
        <Table
            columns={[
                { name: '', width: '120px', align: 'center' as const },
                { name: 'votes', width: '60px', align: 'center' as const },
                { name: 'idea', width: '140px', align: 'left' as const },
                { name: 'description', width: 'minmax(200px,2fr)', align: 'left' as const },
            ]}
            rows={[...roadmaps]
                .sort((a, b) => b.likes - a.likes)
                .slice(0, 5)
                .map((roadmap: any, idx: number) => {
                    return {
                        cells: [
                            { content: <VoteButton onLike={mutate} roadmap={roadmap} /> },
                            { content: roadmap.likes },
                            {
                                content: roadmap.attributes.title,
                            },
                            {
                                content: (
                                    <div className="community-post-markdown">
                                        <Description
                                            buttonClassName="ml-1"
                                            description={roadmap.attributes.description}
                                        />
                                    </div>
                                ),
                            },
                        ],
                    }
                })}
        />
    )
}

const Description = ({ description, buttonClassName = '' }: { description: string; buttonClassName?: string }) => {
    const [showMore, setShowMore] = React.useState(false)
    const canShowMore = description.length > 68
    return (
        <div className="community-post-markdown !pb-0">
            <Markdown>{showMore ? description : preparePreviewText(description, 68)}</Markdown>
            {!showMore && canShowMore && (
                <button
                    className={`text-sm font-semibold text-red dark:text-yellow inline-block ${buttonClassName}`}
                    onClick={() => setShowMore(!showMore)}
                >
                    Show more
                </button>
            )}
        </div>
    )
}

export default function Roadmap({ frame }: { frame: boolean }) {
    const { wip, underConsideration } = useStaticQuery(graphql`
        {
            wip: allSqueakRoadmap(
                filter: { complete: { ne: true }, projectedCompletion: { ne: null } }
                sort: { fields: createdAt }
            ) {
                nodes {
                    id
                    title
                    betaAvailable
                    description
                }
            }
            underConsideration: allSqueakRoadmap(
                filter: { dateCompleted: { eq: null }, projectedCompletion: { eq: null } }
            ) {
                nodes {
                    id
                    squeakId
                    title
                    betaAvailable
                    description
                }
            }
        }
    `)
    return (
        <OSTabs
            className="relative flex flex-col h-full min-h-0 mt-4"
            border={frame}
            contentPadding={frame}
            tabs={[
                {
                    label: `wip (${wip.nodes.length})`,
                    value: 'wip',
                    content: (
                        <Table
                            columns={[
                                { name: '', width: '50px', align: 'center' as const },
                                { name: 'idea', width: 'minmax(150px,1fr)', align: 'left' as const },
                                { name: 'description', width: 'minmax(200px,2fr)', align: 'left' as const },
                            ]}
                            rows={wip.nodes.slice(0, 5).map((node, idx) => ({
                                cells: [
                                    { content: idx + 1 },
                                    {
                                        content: node.title + (node.betaAvailable ? ' (beta)' : ''),
                                    },
                                    {
                                        content: <Description description={node.description} />,
                                    },
                                ],
                            }))}
                        />
                    ),
                },
                {
                    label: `under consideration (${underConsideration.nodes.length})`,
                    value: 'under-consideration',
                    content: <UnderConsiderationTable data={underConsideration} />,
                },
            ]}
        />
    )
}
