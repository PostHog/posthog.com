import CloudinaryImage from 'components/CloudinaryImage'
import { MDXProvider } from '@mdx-js/react'
import { graphql, useStaticQuery } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { kebabCase } from 'lib/utils'
import React, { useState, useMemo } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { shortcodes } from '../../mdxGlobalComponents'
import Link from 'components/Link'
import Layout from 'components/Layout'
import { SEO } from '../seo'
import TeamStat, { pineappleOnPizzaStat } from './TeamStat'
import { StaticImage } from 'gatsby-plugin-image'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import ReactMarkdown from 'react-markdown'
import SideModal from 'components/Modal/SideModal'
import Profile from 'components/Team/Profile'
import ScrollArea from 'components/RadixUI/ScrollArea'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { companyMenu } from '../../navs'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import Stickers from 'components/Stickers/Index'
import { Toolbar } from 'radix-ui'
import Tooltip from 'components/RadixUI/Tooltip'

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
        setActiveProfile,
        teams,
        teamMiniCrestMap,
        pineappleOnPizza,
    } = props
    const name = [firstName, lastName].filter(Boolean).join(' ')

    // Extract team data
    const teamData = teams?.data || []

    return (
        <>
            <div
                className={`@container not-prose aspect-[3/4] border border-primary bg-${color} inline-block rounded max-w-96 relative`}
            >
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <div>
                        <Tooltip trigger={<Stickers name="StickerTrophy" label="5" />}>Here since 2019</Tooltip>
                    </div>
                    <div>
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
                                : 'Is undecided on'}{' '}
                            pineapple on pizza
                        </Tooltip>
                    </div>
                </div>

                <div className="relative w-full flex justify-end aspect-square -translate-y-12 z-10">
                    <img
                        src={
                            avatar?.url ||
                            'https://res.cloudinary.com/dmukukwp6/image/upload/v1698231117/max_6942263bd1.png'
                        }
                        className="w-full h-full object-contain pl-4 object-bottom z-10 relative top-[-2px]"
                        alt={name}
                    />
                    <div className="absolute -bottom-20 inset-x-0 overflow-hidden z-10 py-2">
                        <div className="relative -rotate-3 font-squeak uppercase">
                            <div className="bg-white border-y-3 border-black relative -mx-1 py-0.5 px-4 flex flex-col items-end text-right">
                                <h3 className="m-0 !leading-tight !text-xl @[16rem]:!text-2xl -mb-1">{name}</h3>
                                <h4 className="text-base @[16rem]:!text-lg m-0 !leading-tight text-secondary">
                                    {companyRole}
                                </h4>
                            </div>
                            <div className="flex justify-end items-center gap-1 text-sm @[16rem]:text-base pt-1 pr-3">
                                <Stickers country={country} location={location} />{' '}
                                {country === 'world' ? 'Planet Earth' : location || country}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-white/50 flex items-end">
                    {teamData.length > 0 ? (
                        <div className={`bg-${color} flex flex-wrap gap-2 items-center w-full p-2`}>
                            {teamData.map((team: any) => {
                                const teamName = team.attributes.name
                                const miniCrest = teamMiniCrestMap[teamName]
                                const gatsbyImageMiniCrest = getImage(miniCrest)
                                return (
                                    <div
                                        className="flex items-center gap-1 font-squeak uppercase text-sm text-white"
                                        key={team.id}
                                    >
                                        {gatsbyImageMiniCrest && (
                                            <GatsbyImage
                                                image={gatsbyImageMiniCrest}
                                                alt={`${teamName} Team`}
                                                className="size-5"
                                            />
                                        )}
                                        <span>{teamName} Team</span>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        'No team assigned'
                    )}
                </div>
            </div>

            <li className="hidden h-40 relative @container group click [perspective:1000px]">
                <button
                    onClick={() => setActiveProfile({ ...props, id: squeakId })}
                    className={`flex justify-between h-full relative text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark w-full transition-transform preserve-3d text-left ${
                        biography ? 'group-hover:[transform:rotateY(-180deg)]' : ''
                    }`}
                >
                    <div className="flex flex-col justify-between px-4 md:px-6 py-4 w-full absolute h-full [backface-visibility:hidden] bg-accent border border-primary rounded">
                        <div className="mr-32 xl:mr-40">
                            <h3
                                className="mb-0.5 text-[15px] @sm:text-base @md:text-[17px] leading-tight"
                                id={kebabCase(name) + '-' + kebabCase(companyRole)}
                            >
                                {name}
                            </h3>
                            <p className="text-muted text-sm @md:text-[15px] @lg:text-base  leading-tight">
                                {companyRole}
                            </p>
                        </div>

                        <span className="flex items-center gap-2">
                            {country === 'world' ? '🌎' : <ReactCountryFlag svg countryCode={country} />}
                            <span className="opacity-50 text-sm">
                                {country === 'world' ? 'Planet Earth' : location || country}
                            </span>
                        </span>
                        <figure className="m-0 -mt-8 p-0 absolute right-0 bottom-0 pointer-events-none">
                            <img
                                src={
                                    avatar?.url ||
                                    'https://res.cloudinary.com/dmukukwp6/image/upload/v1698231117/max_6942263bd1.png'
                                }
                                className="w-[200px]"
                            />
                        </figure>
                    </div>
                    <div className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(-180deg)] bg-accent border border-primary rounded">
                        <figure className="m-0 -mt-8 p-0 absolute left-0 bottom-0 [transform:rotateY(-180deg)]">
                            <img
                                src={
                                    avatar?.url ||
                                    'https://res.cloudinary.com/dmukukwp6/image/upload/v1698231117/max_6942263bd1.png'
                                }
                                className="w-[200px] grayscale brightness-0 opacity-20"
                            />
                        </figure>
                        <div className="overflow-hidden absolute h-full w-full inset-0 p-4 bg-accent">
                            <ReactMarkdown className="text-sm bio-preview">{biography}</ReactMarkdown>
                            <div className="bg-gradient-to-t from-accent dark:from-accent-dark to-transparent absolute inset-0 w-full h-full" />
                        </div>
                    </div>
                </button>
            </li>
        </>
    )
}

export default function People() {
    const {
        team: { teamMembers },
        allTeams,
    } = useStaticQuery(teamQuery)

    const [activeProfile, setActiveProfile] = useState<any>(null)

    const teamSize = teamMembers.length - 1

    // Create a map of team names to miniCrest data for quick lookup
    const teamMiniCrestMap = allTeams.nodes.reduce((acc: any, team: any) => {
        acc[team.name] = team.miniCrest
        return acc
    }, {})

    // Calculate unique countries represented by all team members
    const uniqueCountriesCount = useMemo(() => {
        const countries = new Set<string>()

        teamMembers.forEach((member: any) => {
            const country = member.country
            if (country && country.trim() && country !== 'world') {
                countries.add(country.trim())
            }
        })

        return countries.size
    }, [teamMembers])

    // Some Stats were used as fallback until the actual data is added to the GraphQL Server
    const teamStats = [
        {
            data: pineappleOnPizzaStat(teamMembers) ? pineappleOnPizzaStat(teamMembers) : [60, 40],
            caption: '(Correctly) think pineapple belongs on pizza',
            icon: '🍍 + 🍕',
        },
        {
            data: [45, 55],
            caption: 'Are a former founder',
            icon: '💻',
        },
        {
            data: [100, 0],
            caption: 'Write code',
            icon: '☕️',
        },
        {
            data: [80, 20],
            caption: 'See themselves working at PostHog in 2 years',
            icon: '',
        },
    ]

    return (
        <ReaderView
            title="People"
            leftSidebar={<TreeMenu items={companyMenu.children.map((child) => ({ ...child, children: [] }))} />}
        >
            <div data-scheme="primary" className="bg-primary h-full">
                <SEO title="Team - PostHog" />
                <SideModal open={!!activeProfile} setOpen={() => setActiveProfile(null)}>
                    {activeProfile && <Profile profile={activeProfile} />}
                </SideModal>
                <ScrollArea className="h-full">
                    <div className="columns-2 gap-4 mb-4">
                        <p>
                            We're proud to be a team of <strong>{teamSize}</strong> misfits. Why?
                        </p>

                        <p>Building an unusually great company starts with an unusual team.</p>

                        <p>
                            We don't care if you haven't finished (or attended) school, if you were super important at a
                            "Big Tech" company, or if you ran a startup that crashed and burned.
                        </p>

                        <p>
                            What we <em>do</em> care about is your ability to learn, iterate, and ship.
                        </p>

                        <p>
                            That's why we've hired in Belgium, the East and West coasts of the US, Canada, Germany, the
                            United Kingdom, Finland, Poland, and Colombia (among other places).
                        </p>

                        <p>
                            Interested in a hand-drawn sketch of your face? <Link to={`/careers`}>We're hiring.</Link>
                        </p>
                    </div>

                    <aside className="">
                        <h3 className="text-lg mb-2">Team members who... </h3>
                        <div className="grid grid-cols-2 @md:grid-cols-4 justify-start @md:justify-center overflow-x-auto">
                            {teamStats.map((teamStat, index) => {
                                return (
                                    <TeamStat
                                        key={index}
                                        teamStatData={teamStat.data}
                                        caption={teamStat.caption}
                                        icon={teamStat.icon}
                                    />
                                )
                            })}
                        </div>

                        <dl>
                            <dt>Countries represented</dt>
                            <dd>{uniqueCountriesCount}</dd>
                        </dl>
                    </aside>

                    <DebugContainerQuery />
                    <ul className="not-prose list-none mt-12 mx-0 p-0 flex flex-col @md:grid grid-cols-2 @md:grid-cols-3 @4xl:grid-cols-4 gap-x-6 gap-y-12 max-w-screen-2xl">
                        {teamMembers.map((teamMember: any, index: number) => {
                            return (
                                <TeamMember
                                    key={index}
                                    {...teamMember}
                                    setActiveProfile={setActiveProfile}
                                    teamMiniCrestMap={teamMiniCrestMap}
                                />
                            )
                        })}
                    </ul>
                </ScrollArea>
            </div>
        </ReaderView>
    )
}

export const teamQuery = graphql`
    query TeamQuery {
        team: allSqueakProfile(
            filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }
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
                teams {
                    data {
                        id
                        attributes {
                            name
                            slug
                        }
                    }
                }
            }
        }
        allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) {
            nodes {
                id
                name
                miniCrest {
                    gatsbyImageData(width: 20, height: 20)
                }
            }
        }
    }
`
