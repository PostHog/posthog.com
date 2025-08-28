import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Tooltip from 'components/Tooltip'
import Link from 'components/Link'

export interface SmallTeamProps {
    slug: string
    noMiniCrest?: boolean
    className?: string
}

export default function SmallTeam({ slug, noMiniCrest = false, className = '' }: SmallTeamProps): JSX.Element | null {
    const {
        allSqueakTeam: { nodes },
    } = useStaticQuery(graphql`
        {
            allSqueakTeam {
                nodes {
                    id
                    name
                    slug
                    miniCrest {
                        gatsbyImageData(width: 20, height: 20)
                    }
                    crest {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                }
            }
        }
    `)

    const team = nodes.find((node: any) => node.slug === slug)

    if (!team) {
        // If team not found, just return the slug as text
        return <span>{slug}</span>
    }

    const miniCrestImage = getImage(team.miniCrest)
    const fullCrestUrl = team.crest?.data?.attributes?.url

    const content = (
        <span
            className={`inline-flex items-center gap-1.5 ${
                noMiniCrest ? className : `p-0.5 pr-1.5 border border-primary rounded-full ${className}`
            }`}
        >
            {!noMiniCrest && miniCrestImage && (
                <GatsbyImage image={miniCrestImage} alt={`${team.name} mini crest`} className="size-5 shrink-0" />
            )}
            <span className="text-red dark:text-yellow font-semibold">{team.name} Team</span>
        </span>
    )

    const tooltipContent = () => (
        <Link to={`/teams/${team.slug}`} state={{ newWindow: true }} className="no-underline">
            <div className="text-center max-w-xs flex flex-col items-center">
                {fullCrestUrl && (
                    <div className="inline-block size-24 rounded-lg overflow-hidden p-2 mb-2">
                        <img src={fullCrestUrl} alt={`${team.name} crest`} className="w-full h-full object-contain" />
                    </div>
                )}
                <strong className="text-[15px]">{team.name} Team</strong>
            </div>
        </Link>
    )

    return (
        <Link to={`/teams/${team.slug}`} className="no-underline">
            <Tooltip content={tooltipContent} placement="top">
                {content}
            </Tooltip>
        </Link>
    )
}
