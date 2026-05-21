import React, { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { IconInfo } from '@posthog/icons'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import usePostHog from 'hooks/usePostHog'
import Tooltip from 'components/RadixUI/Tooltip'
import { Fieldset } from 'components/OSFieldset'
import Link from 'components/Link'
import Header from 'components/Team/Header'
import TeamImage from 'components/Team/TeamImage'
import { TeamMember } from 'components/People'
import {
    StickerPineappleYes,
    StickerPineappleNo,
    StickerPineappleUnknown,
    StickerPineapple,
} from 'components/Stickers/Index'

const hedgehogImageWidth = 30
const hedgehogLengthInches = 7

const Hedgehog = ({ className = '' }) => (
    <img
        style={{ width: hedgehogImageWidth, height: hedgehogImageWidth }}
        className={className}
        src="/images/hedgehog.svg"
    />
)

const PineapplePieChart = ({ percentage }: { percentage: number | false }) => {
    if (percentage === undefined || percentage === false) {
        return (
            <div className="flex flex-col items-center space-y-3">
                <p className="text-sm opacity-75">No data available</p>
                <div className="w-32 h-32 border-2 border-dashed border-primary rounded-full flex items-center justify-center">
                    <StickerPineappleUnknown className="w-12 h-12 opacity-50" />
                </div>
            </div>
        )
    }

    return (
        <div className="w-full flex gap-4">
            <div className="w-12">
                {percentage > 50 ? (
                    <StickerPineappleYes className="w-12 h-12" />
                ) : percentage == 50 ? (
                    <StickerPineapple className="w-12 h-12" />
                ) : (
                    <StickerPineappleNo className="w-12 h-12" />
                )}
            </div>
            <div className="flex-1 leading-tight">
                <p className="text-sm text-secondary mb-1">Does pineapple belong on pizza?</p>
                {percentage > 50 ? (
                    <>
                        <strong>{percentage}%</strong> of this team say <strong className="text-green">yes</strong>!
                    </>
                ) : percentage == 50 ? (
                    <>This team is evenly split.</>
                ) : (
                    <>
                        Shockingly, <strong>{100 - percentage}%</strong> of this team say{' '}
                        <strong className="text-red">no</strong>!
                    </>
                )}
            </div>
        </div>
    )
}

type RoadmapItem = { title: string; description: string; eta?: string }

const inProgress: RoadmapItem[] = [
    {
        title: 'Reach Ben singularity',
        description: 'Rename every PostHog employee to Ben. Drafting the HR change request now.',
        eta: 'When HR caves',
    },
    {
        title: 'Settle the Ben vs Benn vs Benjamin spelling war',
        description: 'Currently blocked on consensus. A working group has been formed.',
        eta: 'Q3 (optimistic)',
    },
    {
        title: 'Standardize beard length across the team',
        description: 'A ruler has been ordered. Clean-shaven Bens granted a 90-day grace period.',
        eta: 'Q3',
    },
    {
        title: 'Establish an official spirit beverage',
        description: 'Leading candidates: tea, lager, espresso. Tasting underway.',
        eta: 'TBD',
    },
]

const underConsideration: RoadmapItem[] = [
    {
        title: "Petition Unicode to add a 'Ben' emoji",
        description: 'Initial draft circulating. Visual reference: see header photo.',
    },
    {
        title: 'Mandatory annual Ben census',
        description: 'With matching nametags. Sponsor candidates being interviewed.',
    },
    {
        title: 'At least one Ben on every call',
        description: 'Pending PostHog policy review.',
    },
]

const recentlyShipped: RoadmapItem[] = [
    {
        title: 'Matching baseball caps procured',
        description: 'Five out of five Bens compliant. See evidence above.',
    },
    {
        title: 'Inaugural Ben group photo',
        description: 'Barbados, 2026. Filed under permanent record.',
    },
]

const RoadmapList = ({ items }: { items: RoadmapItem[] }) => (
    <ul className="list-none m-0 p-0 flex flex-col gap-4">
        {items.map((item) => (
            <li key={item.title} className="border-t first:border-t-0 border-primary pt-3 first:pt-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <strong className="font-semibold">{item.title}</strong>
                    {item.eta && <span className="text-xs text-secondary">ETA: {item.eta}</span>}
                </div>
                <p className="m-0 text-sm">{item.description}</p>
            </li>
        ))}
    </ul>
)

const TEAM_NAME = 'Ben'
const TEAM_SLUG = 'team-ben'
const TEAM_TAGLINE = 'A more perfect union of Bens.'
const TEAM_DESCRIPTION =
    'The secret society of Bens. United by name, divided by spelling preferences. If you know, you know.'

const teamImage = {
    image: {
        data: {
            attributes: {
                url: 'https://res.cloudinary.com/dmukukwp6/image/upload/team_bens_5642fdbf03.jpg',
            },
        },
    },
    caption: 'The Bens, assembled at the 2026 offsite. Proof of life.',
}

const crestOptions = {
    fontSize: 'base',
    textColor: 'black',
    textShadow: 'light',
    frameColor: 'gold',
    plaqueColor: 'pale-blue',
    plaque: 'downward-curve',
    frame: 'half-round',
    imageScale: '50',
    imageXOffset: '0',
    imageYOffset: '0',
}

const noop = () => {
    /* readonly page, no form handlers */
}

export default function TeamBenPage(): JSX.Element {
    const posthog = usePostHog()

    const data = useStaticQuery(graphql`
        {
            bens: allSqueakProfile(
                filter: { firstName: { regex: "/^Ben/i" } }
                sort: { fields: startDate, order: ASC }
            ) {
                nodes {
                    id
                    squeakId
                    firstName
                    lastName
                    companyRole
                    country
                    location
                    color
                    biography
                    pineappleOnPizza
                    startDate
                    avatar {
                        url
                    }
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
            allSqueakTeam(filter: { name: { ne: "Hedgehogs" } }) {
                nodes {
                    name
                    slug
                }
            }
        }
    `)

    const bens = (data?.bens?.nodes || []).filter((profile: any) => {
        // Only show people whose given name is actually "Ben" (or starts with "Ben " — like "Ben-Jamin").
        // Excludes "Benedict", "Benjamin", etc. unless the user goes by Ben — adjust filter as needed.
        const first = (profile?.firstName || '').trim()
        return /^Ben\b/i.test(first) || /^Benjamin\b/i.test(first)
    })

    const teamLength = bens.length
    const pineapplePercentage =
        teamLength > 0 && Math.round((bens.filter((p: any) => p.pineappleOnPizza).length / teamLength) * 100)

    const heightToHedgehogs = 0
    const hedgehogPercentage = 0

    const teamsNavigation = useMemo(() => {
        const teams = data?.allSqueakTeam?.nodes || []
        return [
            { name: 'Teams' },
            ...teams
                .filter((t: any) => t.name)
                .sort((a: any, b: any) => a.name.localeCompare(b.name))
                .map((t: any) => ({
                    name: t.name,
                    url: `/teams/${t.slug}`,
                    active: false,
                })),
        ]
    }, [data?.allSqueakTeam?.nodes])

    const headerValues = {
        name: TEAM_NAME,
        description: TEAM_DESCRIPTION,
        tagline: TEAM_TAGLINE,
        crestOptions,
        crestImage: undefined,
        miniCrest: undefined,
        teamImage,
        teamImageCaption: teamImage.caption,
        slug: TEAM_SLUG,
    }

    return (
        <>
            <SEO title={`${TEAM_NAME} - PostHog`} description={TEAM_DESCRIPTION} image="/images/small-teams.png" />
            <ReaderView
                title={`${TEAM_NAME} Team`}
                hideTitle={true}
                leftSidebar={
                    <div className="pb-6">
                        <TreeMenu items={teamsNavigation} />
                    </div>
                }
                homeURL="/teams"
                description={`Learn about the ${TEAM_NAME} team at PostHog`}
                proseSize="sm"
                showQuestions={false}
                {...({
                    header: (
                        <Header
                            loading={false}
                            teamName={TEAM_NAME}
                            description={TEAM_DESCRIPTION}
                            tagline={TEAM_TAGLINE}
                            teamImage={teamImage}
                            hasInProgress={inProgress.length > 0}
                            handleChange={noop}
                            onBlur={noop}
                            values={headerValues}
                            editing={false}
                            touched={{}}
                            errors={{}}
                            setFieldValue={noop}
                        />
                    ),
                } as any)}
            >
                <div className="not-prose grid @lg/reader-content:grid-cols-2 gap-8 mb-8">
                    {heightToHedgehogs > 0 && (
                        <div className="col-span-2">
                            <Fieldset
                                legend={
                                    (
                                        <span className="flex items-center gap-1">
                                            Team height in hedgehogs{' '}
                                            <Tooltip trigger={<IconInfo className="w-4" />} delay={0}>
                                                The average hedgehog is{' '}
                                                {(posthog as any)?.getFeatureFlag?.('are-you-in-the-us')
                                                    ? '7 inches'
                                                    : '17 centimeters'}{' '}
                                                long
                                            </Tooltip>
                                        </span>
                                    ) as any
                                }
                                className="mb-0"
                            >
                                <ul className="list-none m-0 p-0 flex flex-wrap">
                                    {new Array(Math.floor(heightToHedgehogs)).fill(0).map((_, i) => (
                                        <li className="m-0.5" key={i}>
                                            <Hedgehog />
                                        </li>
                                    ))}
                                </ul>
                            </Fieldset>
                        </div>
                    )}
                    <div className="col-span-2 grid @lg/reader-content:grid-cols-2 gap-4 @2xl/reader-content:gap-8">
                        <div className="@container/team-stats">
                            <div className="grid @lg/team-stats:grid-cols-2 gap-4">
                                <div>
                                    <Fieldset legend="Pineapple on pizza">
                                        <PineapplePieChart percentage={pineapplePercentage} />
                                    </Fieldset>
                                </div>
                                <div>
                                    <Fieldset legend="Spirit animal">
                                        <h4 className="!m-0">🧔 Ben</h4>
                                        <p className="m-0 text-sm">
                                            Charming. Bearded (sometimes). Goes by one syllable.
                                        </p>
                                    </Fieldset>
                                </div>
                            </div>
                        </div>

                        <TeamImage values={headerValues} setFieldValue={noop} teamImage={teamImage} editing={false} />
                    </div>
                </div>

                <h2 id="roadmap">Roadmap</h2>

                <Fieldset legend="What we're building">
                    <RoadmapList items={inProgress} />
                </Fieldset>

                <Fieldset legend="Under consideration" className="mt-4">
                    <RoadmapList items={underConsideration} />
                </Fieldset>

                <Fieldset legend="Recently shipped" className="mt-4 mb-8">
                    <RoadmapList items={recentlyShipped} />
                </Fieldset>

                <h2>Handbook</h2>
                <h3>Slack channel</h3>
                <p>
                    All Ben-related business occurs in{' '}
                    <Link to="https://posthog.slack.com/messages/club-benquin">#club-benquin</Link>. Membership is
                    self-evident.
                </p>

                <Fieldset legend="Members">
                    <div className="@container flex-1">
                        <ul className="not-prose list-none mt-12 mx-0 p-0 flex flex-col @xs/reader-content:grid grid-cols-2 @xl/reader-content:grid-cols-3 @4xl/reader-content:grid-cols-4 @5xl/reader-content:grid-cols-5 gap-4 @md/reader-content:gap-x-6 gap-y-12 max-w-screen-2xl">
                            {bens.map((profile: any) => (
                                <li key={profile.id} className="rounded-md relative">
                                    <TeamMember
                                        avatar={{ url: profile.avatar?.url }}
                                        firstName={profile.firstName}
                                        lastName={profile.lastName}
                                        companyRole={profile.companyRole}
                                        country={profile.country}
                                        location={profile.location}
                                        squeakId={profile.squeakId}
                                        color={profile.color || 'yellow'}
                                        biography={profile.biography || ''}
                                        pineappleOnPizza={profile.pineappleOnPizza}
                                        startDate={profile.startDate}
                                        isTeamLead={false}
                                        teams={profile.teams}
                                        viewingOwnTeam={true}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </Fieldset>
            </ReaderView>
        </>
    )
}
