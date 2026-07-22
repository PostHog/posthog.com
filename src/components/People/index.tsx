import CloudinaryImage from 'components/CloudinaryImage'
import { AVATAR_FALLBACK_URL } from 'constants/index'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useState, useMemo } from 'react'
import Link from 'components/Link'
import { SEO } from '../seo'
import ReactMarkdown from 'react-markdown'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Stickers from 'components/Stickers/Index'
import Tooltip from 'components/RadixUI/Tooltip'
import ZoomHover from 'components/ZoomHover'
import rehypeRaw from 'rehype-raw'
import useTeamCrestMap from 'hooks/useTeamCrestMap'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { useInView } from 'react-intersection-observer'
import PeopleMap from 'components/HogMap/PeopleMap'
import { IconMapPin, IconList } from '@posthog/icons'
import ViewerFilters from 'components/Viewer/ViewerFilters'
import { OSInput } from 'components/OSForm'

export const TeamMember = (props: any) => {
    const {
        avatar,
        lastName,
        firstName,
        companyRole,
        country,
        squeakId,
        color,
        location,
        biography,
        teams,
        pineappleOnPizza,
        startDate,
        isTeamLead,
        viewingOwnTeam,
    } = props
    const [ref, inView] = useInView({
        threshold: 0,
    })
    const teamCrestMap = useTeamCrestMap()
    const name = [firstName, lastName].filter(Boolean).join(' ')

    // Calculate years of service
    const yearsOfService = startDate
        ? Math.floor((Date.now() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25))
        : 0
    const longEnoughTenure = yearsOfService >= 1

    // Format start date for tooltip
    const formattedStartDate = startDate
        ? new Date(startDate).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
          })
        : null

    // Check role for custom tooltip text (customer-facing roles take priority)
    const roleToCheck = companyRole?.toLowerCase() || ''
    const roleType =
        roleToCheck.includes('sales') || roleToCheck.includes('customers') || roleToCheck.includes('support')
    const isEngineer = roleToCheck.includes('engineer') || roleToCheck.includes('developer')

    const tooltipPrefix = roleType ? "Helpin' customers" : isEngineer ? "Slingin' code" : 'Here'

    // Get bio placeholder text based on role
    const getBioPlaceholder = () => {
        if (roleType) return "I've been too busy helping customers to fill out my bio."
        if (isEngineer) return "I've been too busy shipping features to fill out my bio."
        return "I haven't had a chance to fill out my bio yet."
    }

    // Extract team data
    const teamData = teams?.data || []

    // Determine length category for CSS scaling
    const getTextLength = (text: string, usage: 'name' | 'companyRole' | 'teamText') => {
        const length = text.length

        // Configuration for different usage types - same for now, can be customized later
        const lengthConfig = {
            name: { medium: 16, long: 19 },
            companyRole: { medium: 20, long: 26 },
            teamText: { medium: 15, long: 22 },
        }

        const config = lengthConfig[usage]
        if (length <= config.medium) return 'medium'
        if (length <= config.long) return 'long'
        return 'extra-long'
    }

    return (
        <div ref={ref}>
            <Link
                to={`/community/profiles/${squeakId}`}
                wrapperClassName={`group container-size not-prose aspect-[3/4] border border-primary bg-${color} block rounded max-w-96 relative z-0`}
                state={{ newWindow: true }}
            >
                {inView && (
                    <>
                        <div className="absolute z-20 top-2 left-2 flex flex-col gap-2">
                            <ZoomHover size="lg" className="cursor-default">
                                <Tooltip
                                    trigger={
                                        <Stickers
                                            name={
                                                pineappleOnPizza === true
                                                    ? 'StickerPineappleYes'
                                                    : pineappleOnPizza === false
                                                    ? 'StickerPineappleNo'
                                                    : 'StickerPineappleUnknown'
                                            }
                                        />
                                    }
                                >
                                    {pineappleOnPizza === true
                                        ? 'Loves'
                                        : pineappleOnPizza === false
                                        ? 'Hates'
                                        : 'Undecided about'}{' '}
                                    pineapple on pizza
                                </Tooltip>
                            </ZoomHover>
                            {longEnoughTenure && (
                                <ZoomHover size="lg" className="cursor-default">
                                    <Tooltip
                                        trigger={<Stickers name="StickerTrophy" label={yearsOfService.toString()} />}
                                    >
                                        {tooltipPrefix} since {formattedStartDate}
                                    </Tooltip>
                                </ZoomHover>
                            )}
                            {isTeamLead && teamData.length > 0 && (
                                <ZoomHover size="lg" className="cursor-default">
                                    <Tooltip trigger={<Stickers name="StickerCrown" />}>
                                        {viewingOwnTeam ? (
                                            'Small team lead'
                                        ) : (
                                            <>
                                                Leads the{' '}
                                                <Link
                                                    to={`/teams/${teamData[0].attributes.slug}`}
                                                    state={{ newWindow: true }}
                                                    className="font-semibold underline"
                                                >
                                                    {teamData[0].attributes.name} Team
                                                </Link>
                                            </>
                                        )}
                                    </Tooltip>
                                </ZoomHover>
                            )}
                        </div>

                        <div className="relative w-full flex justify-end aspect-square -translate-y-12 z-10 group-hover:-translate-y-20 transition-all">
                            <CloudinaryImage
                                width={350}
                                src={avatar?.url || AVATAR_FALLBACK_URL}
                                imgClassName="w-full h-[calc(50cqh_+_3rem)] object-contain object-right-bottom pl-4 z-10 relative top-[-2px]"
                                alt={name}
                            />
                        </div>

                        <div className="absolute bottom-[calc(50cqh_-_2rem)] group-hover:bottom-[calc(50cqh_+_0rem)] translate-y-1/2 inset-x-0 overflow-hidden z-10 py-2 transition-all">
                            <div className="relative -rotate-3 font-squeak uppercase">
                                <div className="bg-white border-y-3 border-black text-black relative -mx-1 py-0.5 pl-2 pr-4 flex flex-col items-end text-right">
                                    <h3
                                        className="person-name m-0 leading-tight -mb-0.5"
                                        data-length={getTextLength(name, 'name')}
                                    >
                                        {name}
                                    </h3>
                                    <h4
                                        className="person-role text-base m-0 !leading-tight text-secondary dark:text-black/75"
                                        data-length={getTextLength(companyRole, 'companyRole')}
                                    >
                                        {companyRole}
                                    </h4>
                                </div>
                                <div className="flex justify-end items-center gap-1 text-sm @[16rem]:text-base pt-1 pr-3 relative top-0 group-hover:-top-12 transition-all text-black -z-10">
                                    <Stickers country={country} location={location} />{' '}
                                    {country === 'world' ? 'Planet Earth' : location || country}
                                </div>
                            </div>
                        </div>

                        <div className="container-size absolute bottom-0 left-0 right-0 h-[calc(50cqh_-_2rem)] group-hover:h-[calc(50cqh_-_0rem)] transition-all bg-white/50 flex items-end overflow-hidden">
                            <div
                                className={`absolute left-0 w-full -bottom-24 @[18rem]:-bottom-36 group-hover:bottom-0 z-20 rounded-b bg-gradient-to-b from-transparent to-${color} h-24 @[18rem]:h-36 transition-all`}
                            ></div>
                            <div
                                className={`absolute left-0 w-full -bottom-24 @[18rem]:-bottom-36 group-hover:bottom-0 z-30 rounded-b bg-gradient-to-b from-transparent to-white h-24 @[18rem]:h-36 transition-all opacity-50`}
                            ></div>
                            {teamData.length > 0 ? (
                                <div
                                    className={`bg-${color} w-full flex flex-col justify-center px-2 min-h-[30cqh] relative top-[0%] group-hover:top-full transition-all`}
                                >
                                    <div className="relative flex h-full items-center">
                                        {/* Show first team */}
                                        <div className="@container w-full pr-16">
                                            <div
                                                className="team-font-size font-squeak uppercase text-white leading-tight"
                                                data-length={getTextLength(
                                                    teamData.length > 1
                                                        ? `${teamData[0].attributes.name} Team +${teamData.length - 1}`
                                                        : `${teamData[0].attributes.name} Team`,
                                                    'teamText'
                                                )}
                                            >
                                                {teamData[0].attributes.name} Team
                                                {teamData.length > 1 && (
                                                    <Tooltip
                                                        trigger={
                                                            <>
                                                                {' '}
                                                                <span className="">+{teamData.length - 1}</span>
                                                            </>
                                                        }
                                                    >
                                                        <div className="space-y-2">
                                                            {teamData.slice(1).map((team: any) => {
                                                                const teamName = team.attributes.name
                                                                const crestUrl = teamCrestMap[teamName]

                                                                return (
                                                                    <div
                                                                        key={team.id}
                                                                        className="flex items-center gap-2"
                                                                    >
                                                                        {crestUrl && (
                                                                            <CloudinaryImage
                                                                                width={50}
                                                                                src={crestUrl}
                                                                                alt={`${teamName} Team`}
                                                                                imgClassName="size-4 object-contain"
                                                                            />
                                                                        )}
                                                                        <span className="text-sm">{teamName} Team</span>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </Tooltip>
                                                )}
                                            </div>
                                        </div>

                                        {/* Show first team's crest */}
                                        {teamData[0] && teamCrestMap?.[teamData[0].attributes.name] && (
                                            <CloudinaryImage
                                                width={160}
                                                src={teamCrestMap[teamData[0].attributes.name]}
                                                alt={`${teamData[0].attributes.name} Team`}
                                                imgClassName="absolute -right-1 bottom-0 size-16 @[15rem]:size-20 object-contain transition-all"
                                            />
                                        )}
                                    </div>
                                </div>
                            ) : (
                                ''
                            )}

                            <div className="absolute left-0 w-full top-full pt-8 px-4 group-hover:top-[0%] transition-all text-black">
                                <ReactMarkdown
                                    className="text-sm bio-preview"
                                    rehypePlugins={[rehypeRaw] as any}
                                    components={{
                                        a: ({ children }) => <span>{children}</span>,
                                    }}
                                >
                                    {biography || getBioPlaceholder() + ' Ask me if hot dogs are a form of taco!'}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </>
                )}
            </Link>
        </div>
    )
}

export default function People() {
    const [activeTab, setActiveTab] = useState<'list' | 'map'>('list')
    const [searchQuery, setSearchQuery] = useState('')
    const [filterBaseMembers, setFilterBaseMembers] = useState<any[] | null>(null)

    const {
        team: { teamMembers },
        allTeams,
    } = useStaticQuery(teamQuery)

    const teamSize = teamMembers.length - 1

    const teamCrestMap = allTeams.nodes.reduce((acc: any, team: any) => {
        acc[team.name] = team.crest?.data?.attributes?.url
        return acc
    }, {})

    const availableFilters = useMemo(
        () => [
            {
                label: 'Pineapple on pizza',
                operator: 'is',
                options: [
                    { label: 'All', value: 'all' },
                    { label: 'True', value: 'true' },
                    { label: 'False', value: 'false' },
                    { label: 'Undecided', value: 'undecided' },
                ],
                filter: (person: any, value: string) => {
                    if (value === 'all') return true
                    if (value === 'true') return person.pineappleOnPizza
                    if (value === 'false') return person.pineappleOnPizza === false
                    if (value === 'undecided') {
                        return person.pineappleOnPizza === null || person.pineappleOnPizza === undefined
                    }
                    return true
                },
            },
        ],
        []
    )

    const filteredTeamMembers = useMemo(() => {
        const base = filterBaseMembers ?? teamMembers
        const query = searchQuery.trim().toLowerCase()
        if (!query) return base

        return base.filter((person: any) => {
            const name = [person.firstName, person.lastName].filter(Boolean).join(' ').toLowerCase()
            return name.includes(query)
        })
    }, [filterBaseMembers, teamMembers, searchQuery])

    const handleFilterChange = (filteredData: any[]) => {
        setFilterBaseMembers(filteredData)
    }

    return (
        <div data-scheme="primary" className="@container h-full pt-12 pb-4 @xl:pb-8 px-4 @xl:px-8 pr-14">
            <SEO title="Team - PostHog" />
            <div className="flex flex-wrap items-center gap-2 justify-between">
                <h1 className="m-0">People</h1>
                <div className="flex flex-wrap items-center gap-2">
                    <OSInput
                        label="Search people"
                        showLabel={false}
                        placeholder="Search people..."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        onClear={() => setSearchQuery('')}
                        showClearButton
                        size="sm"
                        width="fit"
                        name="people-search"
                        className="min-w-[12rem] !h-[34px] !box-border !px-2 !py-0 !text-sm !leading-none"
                    />
                    <ViewerFilters
                        availableFilters={availableFilters}
                        dataToFilter={teamMembers}
                        onFilterChange={handleFilterChange}
                    />
                    <ToggleGroup
                        title=""
                        hideTitle
                        options={[
                            {
                                label: (
                                    <>
                                        <IconList className="size-4 mr-1" />
                                        List
                                    </>
                                ),
                                value: 'list',
                            },
                            {
                                label: (
                                    <>
                                        <IconMapPin className="size-4 mr-1" />
                                        Map
                                    </>
                                ),
                                value: 'map',
                            },
                        ]}
                        onValueChange={(value) => setActiveTab(value as 'list' | 'map')}
                        value={activeTab}
                    />
                </div>
            </div>
            <ScrollArea className="h-full">
                {activeTab === 'list' && (
                    <>
                        <div className="@lg:columns-2 gap-4 mb-4">
                            <p className="mt-0">
                                We're proud to be a team of <strong>{teamSize}</strong> misfits. Why?
                            </p>

                            <p>Building an unusually great company starts with an unusual team.</p>

                            <p>
                                We don't care if you haven't finished (or attended) school, if you were super important
                                at a "Big Tech" company, or if you ran a startup that crashed and burned.
                            </p>

                            <p>
                                What we <em>do</em> care about is your ability to learn, iterate, and ship.
                            </p>

                            <p>
                                That's why we've hired in Belgium, the East and West coasts of the US, Canada, Germany,
                                the United Kingdom, Finland, Poland, and Colombia (among other places).
                            </p>

                            <p>
                                Interested in a hand-drawn sketch of your face?{' '}
                                <Link to={`/careers`} state={{ newWindow: true }}>
                                    We're hiring.
                                </Link>
                            </p>
                        </div>
                        <ul className="not-prose list-none mt-12 mx-0 p-0 flex flex-col @xs:grid grid-cols-2 @2xl:grid-cols-3 @4xl:grid-cols-4 @6xl:grid-cols-5 @[84rem]:grid-cols-6 @[104rem]:grid-cols-7 @[112rem]:grid-cols-8 @[120rem]:grid-cols-9 gap-4 @md:gap-x-6 gap-y-12">
                            {filteredTeamMembers.map((teamMember: any) => {
                                // Calculate if this person is a team lead of any team
                                const isTeamLead = teamMember.leadTeams?.data?.length > 0

                                return (
                                    <TeamMember
                                        key={teamMember.squeakId}
                                        {...teamMember}
                                        isTeamLead={isTeamLead}
                                        teamCrestMap={teamCrestMap}
                                    />
                                )
                            })}
                        </ul>
                    </>
                )}
                {activeTab === 'map' && (
                    <div className="h-[70vh] min-h-[480px] mt-2">
                        <PeopleMap members={filteredTeamMembers} />
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}

export const teamQuery = graphql`
    query TeamQuery {
        team: allSqueakProfile(
            filter: { teams: { data: { elemMatch: { id: { ne: null } } } }, squeakId: { ne: 28378 } }
            sort: { fields: startDate, order: ASC }
        ) {
            teamMembers: nodes {
                squeakId
                avatar {
                    url
                }
                biography
                lastName
                firstName
                companyRole
                country
                color
                location
                pronouns
                pineappleOnPizza
                startDate
                teams {
                    data {
                        id
                        attributes {
                            name
                            slug
                        }
                    }
                }
                leadTeams {
                    data {
                        attributes {
                            name
                        }
                    }
                }
            }
        }
        allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) {
            nodes {
                id
                name
                crest {
                    data {
                        attributes {
                            url
                        }
                    }
                }
                miniCrest {
                    gatsbyImageData(width: 20, height: 20)
                }
            }
        }
    }
`
