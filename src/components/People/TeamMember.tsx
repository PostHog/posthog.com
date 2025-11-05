import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Link from 'components/Link'
import ReactMarkdown from 'react-markdown'
import Stickers from 'components/Stickers/Index'
import Tooltip from 'components/RadixUI/Tooltip'
import ZoomHover from 'components/ZoomHover'
import rehypeRaw from 'rehype-raw'
import useTeamCrestMap from 'hooks/useTeamCrestMap'
import { useInView } from 'react-intersection-observer'

export default function TeamMember(props: any) {
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
                wrapperClassName={`group container-size not-prose aspect-[3/4] border border-primary bg-${color} block rounded max-w-96 relative`}
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
                                src={
                                    avatar?.url ||
                                    'https://res.cloudinary.com/dmukukwp6/image/upload/v1698231117/max_6942263bd1.png'
                                }
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
