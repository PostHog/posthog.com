import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import { useStaticQuery } from 'gatsby'
import OSTable from 'components/OSTable'
import { Link } from 'gatsby'
import { IconArrowRight, IconCalendar, IconThumbsUp, IconUndo } from '@posthog/icons'
import OSTabs from 'components/OSTabs'
import Markdown from 'markdown-to-jsx'
import { useRoadmaps } from 'hooks/useRoadmaps'
import { Authentication } from 'components/Squeak/components/Authentication'
import SideModal from 'components/Modal/SideModal'
import { CallToAction } from 'components/CallToAction'
import { User, useUser } from 'hooks/useUser'
import ProgressBar from 'components/ProgressBar'
const Table = ({
    headerLabel,
    columns,
    rows,
    headerMargin = '50px',
}: {
    headerLabel: string
    columns: any
    rows: any
    headerMargin?: string
}) => {
    return (
        <div>
            <div className="bg-accent border-primary border-x border-t font-semibold flex">
                <div style={{ width: headerMargin }} className="border-r border-primary py-1" />
                <div className="py-1 px-2">{headerLabel}</div>
            </div>
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
    const [loading, setLoading] = React.useState(false)
    const [authModalOpen, setAuthModalOpen] = React.useState(false)
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
            <SideModal title={roadmap.attributes.name} open={authModalOpen} setOpen={setAuthModalOpen}>
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
            <CallToAction
                disabled={loading}
                onClick={() => {
                    if (user) {
                        like(user)
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
        </>
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
            headerMargin="120px"
            headerLabel="under consideration"
            columns={[
                { name: '', width: '120px', align: 'center' as const },
                { name: 'votes', width: '60px', align: 'center' as const },
                { name: 'team', width: '140px', align: 'left' as const },
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
                                content: roadmap.attributes.teams?.data?.[0]?.attributes?.name || '',
                            },
                            {
                                content: (
                                    <div className="community-post-markdown">
                                        <Markdown>{roadmap.attributes.description}</Markdown>
                                    </div>
                                ),
                            },
                        ],
                    }
                })}
        />
    )
}

export default function Roadmap({ frame }) {
    const { wip, underConsideration } = useStaticQuery(graphql`
        {
            wip: allSqueakRoadmap(
                filter: { complete: { ne: true }, projectedCompletion: { ne: null } }
                sort: { fields: createdAt }
                limit: 5
            ) {
                nodes {
                    id
                    teams {
                        name
                    }
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
                    teams {
                        name
                    }
                    betaAvailable
                    description
                }
            }
        }
    `)
    return (
        <OSTabs
            className="relative flex flex-col h-full min-h-0"
            frame={frame}
            tabs={[
                {
                    label: 'wip',
                    value: 'wip',
                    content: (
                        <Table
                            headerLabel="wip"
                            columns={[
                                { name: '', width: '50px', align: 'center' as const },
                                { name: 'team', width: '120px', align: 'left' as const },
                                { name: 'status', width: '70px' },
                                { name: 'description', width: 'minmax(200px,2fr)', align: 'left' as const },
                            ]}
                            rows={wip.nodes.map((node, idx) => ({
                                cells: [
                                    { content: idx + 1 },
                                    {
                                        content: node.teams?.[0]?.name || 'Unknown',
                                    },
                                    {
                                        content: node.betaAvailable ? 'beta' : '',
                                    },
                                    {
                                        content: (
                                            <div className="community-post-markdown">
                                                <Markdown>{node.description}</Markdown>
                                            </div>
                                        ),
                                    },
                                ],
                            }))}
                        />
                    ),
                },
                {
                    label: 'under consideration',
                    value: 'under-consideration',
                    content: <UnderConsiderationTable data={underConsideration} />,
                },
            ]}
        />
    )
}
