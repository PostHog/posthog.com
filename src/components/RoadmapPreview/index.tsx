import React, { useState } from 'react'
import { useRoadmaps } from 'hooks/useRoadmaps'
import Link from 'components/Link'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
import slugify from 'slugify'
import CloudinaryImage from 'components/CloudinaryImage'
import removeMarkdown from 'remove-markdown'

const RoadmapPreview = () => {
    const [expandedItems, setExpandedItems] = useState<number[]>([])

    const { roadmaps, isLoading } = useRoadmaps({
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

    const { allTeams } = useStaticQuery(graphql`
        {
            allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) {
                nodes {
                    id
                    name
                    miniCrest {
                        gatsbyImageData(width: 64, height: 64)
                    }
                }
            }
        }
    `)

    if (isLoading) return <div>Loading...</div>

    const topRoadmaps = [...roadmaps]
        .sort((a, b) => (b.attributes?.likes?.data?.length || 0) - (a.attributes?.likes?.data?.length || 0))
        .slice(0, 5)

    const toggleDescription = (id: number) => {
        setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }

    return (
        <div className="overflow-x-auto -mx-5 md:mx-0">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-accent dark:bg-accent-dark">
                        <th className="p-2 !pl-5 md:!pl-2 w-18 text-center">Votes</th>
                        <th className="p-2 text-left">Feature</th>
                        <th className="p-2 text-left hidden sm:table-cell">Team</th>
                    </tr>
                </thead>
                <tbody>
                    {topRoadmaps.map((roadmap) => {
                        const { id, attributes } = roadmap
                        const teamName = attributes.teams?.data?.[0]?.attributes?.name
                        const team = allTeams.nodes.find((team) => team.name === teamName)
                        const gatsbyImageMiniCrest = team?.miniCrest && getImage(team.miniCrest)
                        const isExpanded = expandedItems.includes(id)
                        const plainDescription = removeMarkdown(attributes.description || '')
                        const shouldShowExpandButton = plainDescription.length > 125

                        return (
                            <tr key={id} className="border-b last:border-b-0 border-light dark:border-dark">
                                <td className="p-2 !pl-5 md:!pl-2 align-top text-center">
                                    <div className="leading-none text-xl font-bold bg-accent dark:bg-accent-dark flex flex-col items-center justify-center p-2">
                                        {attributes.likes?.data?.length || 0}
                                        <div className="text-sm opacity-80 font-normal">votes</div>
                                    </div>
                                </td>
                                <td className="p-2">
                                    <div className="font-bold">{attributes.title}</div>
                                    <div className="sm:hidden pt-0.5 pb-1">
                                        {teamName && (
                                            <Link
                                                to={`/teams/${slugify(teamName.toLowerCase().replace('ops', ''), {
                                                    remove: /and/,
                                                })}`}
                                                className="flex items-center gap-1"
                                            >
                                                <div className="w-6 h-6">
                                                    {gatsbyImageMiniCrest ? (
                                                        <GatsbyImage
                                                            image={gatsbyImageMiniCrest}
                                                            alt={`${teamName} Team`}
                                                            className="w-6 h-6"
                                                        />
                                                    ) : (
                                                        <CloudinaryImage
                                                            alt={`${teamName} Team`}
                                                            className="w-6 h-6"
                                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/crest_mini_default_def12aa14a.png"
                                                        />
                                                    )}
                                                </div>
                                                <span className="whitespace-nowrap">{teamName} Team</span>
                                            </Link>
                                        )}
                                    </div>
                                    <div className={`text-sm opacity-75 ${!isExpanded ? 'line-clamp-2' : ''}`}>
                                        {plainDescription}
                                    </div>
                                    {shouldShowExpandButton &&
                                        (isExpanded ? (
                                            <Link
                                                to={`/roadmap`}
                                                className="text-red dark:text-yellow font-semibold text-sm"
                                            >
                                                Visit roadmap
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={() => toggleDescription(id)}
                                                className="text-red dark:text-yellow font-semibold text-sm"
                                            >
                                                Read more
                                            </button>
                                        ))}
                                </td>
                                <td className="hidden sm:table-cell p-2 align-top">
                                    {teamName && (
                                        <Link
                                            to={`/teams/${slugify(teamName.toLowerCase().replace('ops', ''), {
                                                remove: /and/,
                                            })}`}
                                            className="flex items-center gap-1"
                                        >
                                            <div className="w-6 h-6">
                                                {gatsbyImageMiniCrest ? (
                                                    <GatsbyImage
                                                        image={gatsbyImageMiniCrest}
                                                        alt={`${teamName} Team`}
                                                        className="w-6 h-6"
                                                    />
                                                ) : (
                                                    <CloudinaryImage
                                                        alt={`${teamName} Team`}
                                                        className="w-6 h-6"
                                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/crest_mini_default_def12aa14a.png"
                                                    />
                                                )}
                                            </div>
                                            <span className="whitespace-nowrap">{teamName}</span>
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RoadmapPreview
