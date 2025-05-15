import { graphql } from 'gatsby'
import React from 'react'
import { useStaticQuery } from 'gatsby'
import OSTable from 'components/OSTable'
import { Link } from 'gatsby'
import { IconArrowRight, IconCalendar } from '@posthog/icons'
import OSTabs from 'components/OSTabs'
import Markdown from 'markdown-to-jsx'

const Table = ({ headerLabel, columns, rows }: { headerLabel: string; columns: any; rows: any }) => {
    return (
        <div>
            <div className="bg-accent border-primary border-x border-t font-semibold flex">
                <div className="w-[50px] border-r border-primary py-1" />
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

export default function Roadmap() {
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
        }
    `)
    return (
        <OSTabs
            className="relative flex flex-col h-full min-h-0"
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
                    content: (
                        <Table
                            headerLabel="under consideration"
                            columns={[
                                { name: '', width: '50px', align: 'center' as const },
                                { name: 'team', width: '140px', align: 'left' as const },
                                { name: 'description', width: 'minmax(200px,2fr)', align: 'left' as const },
                            ]}
                            rows={underConsideration.nodes.map((node, idx) => ({
                                cells: [
                                    { content: idx + 1 },
                                    {
                                        content: node.teams?.[0]?.name || 'Unknown',
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
            ]}
        />
    )
}
