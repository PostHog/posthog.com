import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Tooltip from 'components/RadixUI/Tooltip'
import Link from 'components/Link'

export interface SmallTeamProps {
    slug: string
    children?: JSX.Element
    noMiniCrest?: boolean
    inline?: boolean
    className?: string
    /**
     * `'pill'` (default) renders the inline mini-crest pill with the full crest
     * in a hover tooltip. `'crest'` renders the full crest at size, next to the
     * team name and tagline — for when the team is the point, not an aside.
     */
    variant?: 'pill' | 'crest'
    /** Sizing for the large crest in `variant="crest"`. */
    crestClassName?: string
}

export default function SmallTeam({
    slug,
    children,
    inline = false,
    noMiniCrest = false,
    className = '',
    variant = 'pill',
    crestClassName = '',
}: SmallTeamProps): JSX.Element | null {
    const {
        allSqueakTeam: { nodes },
    } = useStaticQuery(graphql`
        {
            allSqueakTeam {
                nodes {
                    id
                    name
                    tagline
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
        // If team not found, just return the children or slug as text
        return children ? children : <span>{slug}</span>
    }

    const miniCrestImage = getImage(team.miniCrest)
    const fullCrestUrl = team.crest?.data?.attributes?.url

    if (variant === 'crest') {
        return (
            <Link
                to={`/teams/${team.slug}`}
                state={{ newWindow: true }}
                className={`group not-prose flex items-center gap-4 no-underline text-primary ${className}`}
            >
                {fullCrestUrl ? (
                    <img
                        src={fullCrestUrl}
                        alt={`${team.name} team crest`}
                        loading="lazy"
                        className={`shrink-0 object-contain transition-transform group-hover:scale-105 ${
                            crestClassName || 'size-20 @lg/reader-content:size-24'
                        }`}
                    />
                ) : (
                    miniCrestImage && (
                        <GatsbyImage
                            image={miniCrestImage}
                            alt={`${team.name} mini crest`}
                            className="size-8 shrink-0"
                        />
                    )
                )}
                <span className="min-w-0">
                    <strong className="block text-[15px] text-primary group-hover:underline">{team.name} Team</strong>
                    {team.tagline && (
                        <em className="block text-sm text-secondary text-balance mt-0.5">{team.tagline}</em>
                    )}
                </span>
            </Link>
        )
    }

    // The invisible block is necessary to make sure we have the proper width
    // with the `relative inline-block` parent when we include a mini crest
    const triggerContent = (
        <span className="relative inline-block">
            <Link to={`/teams/${team.slug}`} className={`group text-primary ${className}`} state={{ newWindow: true }}>
                {!noMiniCrest && miniCrestImage && (
                    <span
                        className={`invisible max-h-4 inline-flex items-center gap-1.5 ${
                            !inline && 'p-0.5 pr-1.5 border border-primary rounded-full'
                        }`}
                    >
                        <span className="h-6 shrink-0 rounded-full overflow-hidden">
                            <GatsbyImage
                                image={miniCrestImage}
                                alt={`${team.name} mini crest`}
                                className="size-5 shrink-0"
                            />
                        </span>
                        <span className="!text-sm text-red dark:text-yellow font-semibold inline-block truncate">
                            {children ? children : <>{team.name} Team</>}
                        </span>
                    </span>
                )}
                <span
                    className={`inline-flex items-center ${
                        !noMiniCrest && miniCrestImage
                            ? [
                                  'absolute top-0 left-0 whitespace-nowrap gap-1.5',
                                  !inline ? 'p-0.5 pr-1.5 border border-primary rounded-full' : '',
                              ]
                                  .filter(Boolean)
                                  .join(' ')
                            : ''
                    }`}
                >
                    {!noMiniCrest && miniCrestImage && (
                        <GatsbyImage
                            image={miniCrestImage}
                            alt={`${team.name} mini crest`}
                            className="size-5 shrink-0"
                        />
                    )}
                    <span
                        className={`!text-sm ${
                            inline ? 'underline' : 'group-hover:underline'
                        } font-semibold inline-block truncate`}
                    >
                        {children ? children : <>{team.name} Team</>}
                    </span>
                </span>
            </Link>
        </span>
    )

    const tooltipContent = () => {
        return (
            <Link
                data-scheme="secondary"
                to={`/teams/${team.slug}`}
                state={{ newWindow: true }}
                className="no-underline pt-2 px-2 block max-w-60"
            >
                <div className="text-center max-w-xs flex flex-col items-center">
                    {fullCrestUrl && (
                        <div className="inline-block size-24 rounded-lg overflow-hidden p-2 mb-2">
                            <img
                                src={fullCrestUrl}
                                alt={`${team.name} crest`}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                    <strong className="text-[15px]">{team.name} Team</strong>
                    <em className="text-sm text-secondary mt-1 text-balance">{team.tagline}</em>
                </div>
            </Link>
        )
    }

    return (
        <>
            <Tooltip trigger={triggerContent} delay={0}>
                <>{tooltipContent()}</>
            </Tooltip>
        </>
    )
}
