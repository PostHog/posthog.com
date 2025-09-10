import React from 'react'
import Link from 'components/Link'
import TeamPatch from 'components/TeamPatch'
import { StickerPineappleYes, StickerPineappleNo, StickerPineapple } from 'components/Stickers/Stickers'
import { TeamMembers } from 'components/Job/Sidebar'
import { Accordion } from 'components/RadixUI/Accordion'

// Helper function to parse HTML and replace anchor tags with Link components
const parseDescriptionWithLinks = (htmlString: string) => {
    if (!htmlString) return null

    // Check if we're in a browser environment (not SSR)
    if (typeof document === 'undefined') {
        return htmlString
    }

    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlString

    // Find all anchor tags and replace them
    const anchorTags = tempDiv.querySelectorAll('a')
    const result: React.ReactNode[] = []
    let lastIndex = 0

    // Process each anchor tag
    anchorTags.forEach((anchor, index) => {
        const href = anchor.getAttribute('href')
        const text = anchor.textContent || ''

        // Add text before this anchor
        const beforeText = htmlString.substring(lastIndex, htmlString.indexOf(anchor.outerHTML, lastIndex))
        if (beforeText) {
            result.push(beforeText)
        }

        // Add the Link component
        if (href) {
            result.push(
                <Link key={`link-${index}`} to={href} state={{ newWindow: true }}>
                    {text}
                </Link>
            )
        } else {
            result.push(text)
        }

        lastIndex = htmlString.indexOf(anchor.outerHTML, lastIndex) + anchor.outerHTML.length
    })

    // Add any remaining text after the last anchor
    if (lastIndex < htmlString.length) {
        result.push(htmlString.substring(lastIndex))
    }

    // If no anchors were found, return the original HTML as a string
    if (anchorTags.length === 0) {
        return htmlString
    }

    return result
}

// Fallback team data for roles without teams
const fallbackTeam = {
    name: 'Mystery',
    description:
        "This role hasn't been assigned to a team yet. You'll be placed on a team that match your skills and interests.",
    slug: '',
    crest: {
        data: {
            attributes: {
                url: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730806654/exec_8be5c3a342.png',
            },
        },
    },
    crestOptions: {
        textColor: 'brown',
        textShadow: 'Light',
        frame: 'square',
        plaque: 'stepped',
        imageXOffset: -5,
        imageYOffset: -10,
        imageScale: 90,
        frameColor: 'burntOrange',
        plaqueColor: 'white',
    },
    profiles: { data: [] },
}

// Team info display component
export const TeamInfoDisplay = ({
    team,
    multipleTeams = false,
    isCompact = false,
}: {
    team: any
    multipleTeams?: boolean
    isCompact?: boolean
}) => {
    // Use fallback team if no team is provided
    const displayTeam = team || fallbackTeam
    const isFallback = !team

    const teamLength = displayTeam?.profiles?.data?.length
    const teamURL = displayTeam?.slug ? `/teams/${displayTeam.slug}` : null
    const pineapplePercentage =
        teamLength &&
        teamLength > 0 &&
        Math.round(
            (displayTeam.profiles?.data?.filter(({ attributes: { pineappleOnPizza } }: any) => pineappleOnPizza)
                .length /
                teamLength) *
            100
        )

    if (isCompact) {
        // Compact version for Job template
        return (
            <div className="flex flex-col @md:flex-row @md:gap-4">
                <div className="flex justify-center mb-4 max-w-48 mx-auto">
                    {isFallback || !teamURL ? (
                        // Don't link the fallback team or teams without slug
                        <TeamPatch
                            name={displayTeam.name}
                            imageUrl={displayTeam.crest?.data?.attributes?.url}
                            {...displayTeam.crestOptions}
                            className="w-full"
                        />
                    ) : (
                        // Link real teams with valid slug
                        <Link to={teamURL} state={{ newWindow: true }}>
                            <TeamPatch
                                name={displayTeam.name}
                                imageUrl={displayTeam.crest?.data?.attributes?.url}
                                {...displayTeam.crestOptions}
                                className="w-full"
                            />
                        </Link>
                    )}
                </div>
                <div className="flex-1">
                    {displayTeam.description && (
                        <p className="text-sm text-secondary !my-0">
                            {parseDescriptionWithLinks(displayTeam.description)}
                        </p>
                    )}

                    {teamLength > 0 && (
                        <>
                            <div>
                                <p className="text-sm font-semibold !mb-1">Team members</p>
                                <div className="flex justify-start">
                                    <TeamMembers
                                        size="!size-12"
                                        profiles={displayTeam.profiles}
                                        teamName={displayTeam.name}
                                    />
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-semibold !mb-1">Does pineapple belong on pizza?</p>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-8">
                                        {pineapplePercentage > 50 ? (
                                            <StickerPineappleYes className="size-8" />
                                        ) : pineapplePercentage == 50 ? (
                                            <StickerPineapple className="size-8" />
                                        ) : (
                                            <StickerPineappleNo className="size-8" />
                                        )}
                                    </div>
                                    <div className="flex-1 leading-tight text-xs">
                                        {pineapplePercentage > 50 ? (
                                            <>
                                                <strong>{pineapplePercentage}%</strong> say{' '}
                                                <strong className="text-green">YES</strong>!
                                            </>
                                        ) : pineapplePercentage == 50 ? (
                                            <>Team is evenly split</>
                                        ) : (
                                            <>
                                                <strong>{100 - pineapplePercentage}%</strong> say{' '}
                                                <strong className="text-red">NO!</strong>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        )
    }

    // Full version for JobListings (careers page)
    return (
        <div
            data-scheme="secondary"
            className={`${multipleTeams ? 'p-2' : 'border border-primary rounded-md p-4 bg-primary'}`}
        >
            <div className="flex flex-col @md:grid @md:grid-cols-6 @md:grid-rows-[repeat(3,auto)] @lg:grid-rows-[repeat(4,auto)] gap-4 @2xl:gap-y-0">
                <div className="order-2 @md:order-none col-start-1 row-start-2 @md:col-span-4 @md:col-start-auto @md:row-span-2 @md:row-start-auto @2xl:row-span-1 @md:self-center">
                    {multipleTeams && <h3 className="text-sm font-bold mt-0 mb-1">{displayTeam.name} Team</h3>}
                    {displayTeam.description && (
                        <p className="text-[15px] @5xl:text-sm text-secondary !my-0">
                            {parseDescriptionWithLinks(displayTeam.description)}
                        </p>
                    )}
                </div>
                <div className="order-1 @md:order-none col-start-1 row-start-1 @md:col-span-2 @md:col-start-5 @md:row-span-2 @md:row-start-auto @xl:row-span-3 @md:self-start @md:justify-self-center @xl:row-start-1 @2xl:self-start">
                    <div className="w-48 @md:w-full @3xl:max-w-60 mx-auto">
                        {isFallback || !teamURL ? (
                            // Don't link the fallback team or teams without slug
                            <TeamPatch
                                name={displayTeam.name}
                                imageUrl={displayTeam.crest?.data?.attributes?.url}
                                {...displayTeam.crestOptions}
                                className="w-full"
                            />
                        ) : (
                            // Link real teams with valid slug
                            <Link to={teamURL} state={{ newWindow: true }}>
                                <TeamPatch
                                    name={displayTeam.name}
                                    imageUrl={displayTeam.crest?.data?.attributes?.url}
                                    {...displayTeam.crestOptions}
                                    className="w-full"
                                />
                            </Link>
                        )}
                    </div>
                </div>
                {teamLength > 0 && (
                    <>
                        <div className="order-3 @md:order-none col-start-1 row-start-3 @md:row-start-3 @md:col-span-full @xl:row-span-1 @xl:row-start-3 @2xl:row-span-4 @2xl:row-start-2">
                            <p className="text-sm font-semibold !mb-1 @2xl:pt-2">Team members</p>
                            <div className="flex justify-start">
                                <TeamMembers
                                    size="!size-16"
                                    profiles={displayTeam.profiles}
                                    teamName={displayTeam.name}
                                />
                            </div>
                        </div>
                        <div className="order-4 @md:order-none col-start-1 row-start-4 @md:col-start-1 @md:row-start-4 @md:col-span-full @xl:row-span-1 @2xl:col-span-4">
                            <p className="text-sm font-semibold !mb-1">Does pineapple belong on pizza?</p>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-10">
                                    {pineapplePercentage > 50 ? (
                                        <StickerPineappleYes className="size-10" />
                                    ) : pineapplePercentage == 50 ? (
                                        <StickerPineapple className="size-10" />
                                    ) : (
                                        <StickerPineappleNo className="size-10" />
                                    )}
                                </div>
                                <div className="flex-1 leading-tight">
                                    {pineapplePercentage > 50 ? (
                                        <>
                                            <strong>{pineapplePercentage}%</strong> of this team say{' '}
                                            <strong className="text-green">YES</strong>!
                                        </>
                                    ) : pineapplePercentage == 50 ? (
                                        <>This team is evenly split. (You could break the tie!)</>
                                    ) : (
                                        <>
                                            <strong>{100 - pineapplePercentage}%</strong> of this team say{' '}
                                            <strong className="text-red">NO!</strong>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

interface TeamsSidebarProps {
    teams: any[]
    allTeams?: any[]
    multipleTeams: boolean
    isCompact?: boolean
}

export const TeamsSidebar: React.FC<TeamsSidebarProps> = ({
    teams,
    allTeams = [],
    multipleTeams,
    isCompact = false,
}) => {
    const hasTeams = teams && teams.length > 0

    if (!hasTeams) {
        // Show fallback team when no teams are assigned
        return (
            <div className={isCompact ? 'mt-4 p-4 rounded border border-primary bg-accent' : ''}>
                <TeamInfoDisplay team={null} multipleTeams={false} isCompact={isCompact} />
            </div>
        )
    }

    if (multipleTeams) {
        return (
            <Accordion
                items={teams.map((team: any) => {
                    // Handle both team objects and team name strings
                    const teamObj =
                        typeof team === 'string'
                            ? allTeams?.find((t: any) => t.name.toLowerCase() === team.toLowerCase())
                            : team

                    const teamName = typeof team === 'string' ? team : team.name

                    return {
                        value: teamName,
                        trigger: <span className="font-semibold">{teamName} Team</span>,
                        content: <TeamInfoDisplay team={teamObj} multipleTeams={true} isCompact={isCompact} />,
                    }
                })}
                defaultValue={teams[0]?.name || teams[0]}
                className="mt-4"
                contentClassName="px-4"
            />
        )
    }

    // Single team
    const team =
        typeof teams[0] === 'string'
            ? allTeams?.find((t: any) => t.name.toLowerCase() === teams[0].toLowerCase())
            : teams[0]

    return (
        <div className={isCompact ? 'p-4 rounded border border-primary bg-accent' : ''}>
            <TeamInfoDisplay team={team} multipleTeams={false} isCompact={isCompact} />
        </div>
    )
}
