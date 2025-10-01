import React, { useState, useRef, useMemo, useEffect } from 'react'
import { graphql, useStaticQuery, navigate } from 'gatsby'
import { useUser } from 'hooks/useUser'
import { IconPencil, IconInfo, IconX, IconCrown } from '@posthog/icons'
import OSButton from 'components/OSButton'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { useFormik } from 'formik'
import * as yup from 'yup'
import slugify from 'slugify'
import useTeam from 'hooks/useTeam'
import useTeamUpdates from 'hooks/useTeamUpdates'
import usePostHog from 'hooks/usePostHog'
import uploadImage from 'components/Squeak/util/uploadImage'
import { Question } from 'components/Squeak'
import { InProgress } from 'components/Roadmap/InProgress'
import SideModal from 'components/Modal/SideModal'
import TeamUpdate from 'components/TeamUpdate'
import { PrivateLink } from 'components/PrivateLink'
import TeamMemberComponent, { FutureTeamMember } from 'components/TeamMember'
import { TeamMember } from 'components/People'
import { AddTeamMember } from 'components/TeamMembers'
import Tooltip from 'components/RadixUI/Tooltip'
import { Fieldset } from 'components/OSFieldset'
import ZoomHover from 'components/ZoomHover'
import Link from 'components/Link'
import TeamPatch from 'components/TeamPatch'
import Header from 'components/Team/Header'
import Profile, { ProfileData } from 'components/Team/Profile'
import Roadmap from 'components/Team/Roadmap'
import TeamImage from 'components/Team/TeamImage'
import {
    StickerPineappleYes,
    StickerPineappleNo,
    StickerPineappleUnknown,
    StickerPineapple,
} from 'components/Stickers/Index'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

const hedgehogImageWidth = 30
const hedgehogLengthInches = 7

const Hedgehog = ({ className = '' }) => {
    return (
        <img
            style={{ width: hedgehogImageWidth, height: hedgehogImageWidth }}
            className={className}
            src="/images/hedgehog.svg"
        />
    )
}

const PineapplePieChart = ({ percentage }: { percentage: number | false }) => {
    if (percentage === undefined) {
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

const JobCard = ({ job }: { job: any }) => {
    const locationField = job.parent.customFields.find((field: any) => field.title === 'Location(s)')
    const timezoneField = job.parent.customFields.find((field: any) => field.title === 'Timezone(s)')

    return (
        <ZoomHover size="lg" className="!flex h-full w-full aspect-[3/4]">
            <div className="group container-size not-prose aspect-[3/4] border border-primary bg-teal block rounded max-w-96 relative hover:z-20">
                <Link
                    to={`${job.fields.slug}`}
                    state={{ newWindow: true }}
                    className="h-full w-full p-4 flex flex-col justify-between"
                >
                    <div className="flex flex-col h-full">
                        <div className="mb-auto">
                            <div className="mb-2">
                                <span className="inline-block px-2 py-1 text-xs font-semibold bg-black/10 text-black rounded">
                                    Open role
                                </span>
                            </div>
                            <h3 className="text-black font-squeak uppercase text-xl leading-tight mb-1">
                                {job.fields.title}
                            </h3>
                            <div className="text-black/80 text-sm space-y-1">
                                {locationField?.value && <p className="m-0">📍 {locationField.value}</p>}
                                {timezoneField?.value && <p className="m-0">🕒 {timezoneField.value}</p>}
                            </div>
                        </div>
                        <div className="mt-auto">
                            <span className="text-black font-semibold text-sm">Read description</span>
                        </div>
                    </div>
                </Link>
            </div>
        </ZoomHover>
    )
}

type TeamPageProps = {
    params: {
        slug: string
    }
}

export default function TeamPage(props: TeamPageProps) {
    const { slug } = props?.params || {}
    const [editing, setEditing] = useState(false)
    const [saving, setSaving] = useState(false)
    const [activeProfile, setActiveProfile] = useState<boolean | ProfileData>(false)
    const { user, getJwt } = useUser()
    const isModerator = user?.role?.type === 'moderator'
    const onSaveRef = useRef<(() => void) | null>(null)
    const posthog = usePostHog()

    const { team, updateTeam, loading } = useTeam({ slug })
    const { name, crest, crestOptions, description, tagline, profiles, leadProfiles, teamImage, miniCrest } =
        (team as any)?.attributes || {}

    const data = useStaticQuery(graphql`
        {
            allTeams: allMdx(filter: { fields: { slug: { regex: "/^/teams/[^/]+$/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    body
                }
            }
            allObjectives: allMdx(filter: { fields: { slug: { regex: "/^/teams/[^/]+/objectives$/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    body
                }
            }
            allSqueakTeam(filter: { name: { ne: "Hedgehogs" } }) {
                nodes {
                    id
                    name
                    slug
                    emojis {
                        name
                        localFile {
                            publicURL
                        }
                    }
                    roadmaps {
                        squeakId
                        betaAvailable
                        complete
                        dateCompleted
                        title
                        description
                        media {
                            gatsbyImageData
                            publicId
                            data {
                                attributes {
                                    mime
                                }
                            }
                        }
                        githubPages {
                            title
                            html_url
                            number
                            closed_at
                            reactions {
                                hooray
                                heart
                                eyes
                                plus1
                            }
                        }
                        projectedCompletion
                        cta {
                            label
                            url
                        }
                    }
                }
            }
            allSlackEmoji {
                totalCount
            }
            allTeamsData: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) {
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
                }
            }
            allAshbyJobPosting(filter: { isListed: { eq: true } }) {
                nodes {
                    fields {
                        title
                        slug
                    }
                    parent {
                        ... on AshbyJob {
                            customFields {
                                value
                                title
                            }
                        }
                    }
                }
            }
        }
    `)

    const body = data?.allTeams?.nodes?.find((node: any) => node?.fields?.slug === `/teams/${slug}`)?.body
    const objectives = data?.allObjectives?.nodes?.find(
        (node: any) => node?.fields?.slug === `/teams/${slug}/objectives`
    )?.body
    const teamData = data?.allSqueakTeam?.nodes?.find((node: any) => node?.slug === slug)
    const { totalCount: totalSlackEmojis } = data?.allSlackEmoji || {}
    const allTeams = data?.allTeamsData || { nodes: [] }
    const allAshbyJobPosting = data?.allAshbyJobPosting || { nodes: [] }

    // Form handling
    const { handleChange, values, submitForm, setFieldValue } = useFormik({
        enableReinitialize: true,
        validateOnMount: true,
        validationSchema: yup.object({
            name: yup.string().required('Name is required'),
        }),
        initialValues: {
            name,
            description,
            tagline,
            teamImage: teamImage?.image?.data
                ? { file: null, objectURL: teamImage?.image?.data?.attributes?.url }
                : undefined,
            teamImageCaption: teamImage?.caption,
            crestImage: crest?.data ? { file: null, objectURL: crest?.data?.attributes?.url } : undefined,
            crestOptions: crestOptions || {
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
            },
            teamMembers: team?.attributes?.profiles?.data || [],
            teamLeads: team?.attributes?.leadProfiles?.data || [],
            miniCrest: miniCrest?.data ? { file: null, objectURL: miniCrest?.data?.attributes?.url } : undefined,
        },
        onSubmit: async ({
            name,
            description,
            tagline,
            teamImageCaption,
            crestImage,
            crestOptions,
            teamMembers,
            teamLeads,
            miniCrest,
            ...other
        }) => {
            const jwt = await getJwt()
            const profileID = user?.profile?.id
            if (!profileID || !jwt) return
            setSaving(true)
            const uploadedTeamImage =
                other.teamImage?.file &&
                (await uploadImage(other.teamImage.file, jwt, {
                    field: 'images',
                    id: profileID,
                    type: 'api::profile.profile',
                }))
            const uploadedCrestImage =
                crestImage?.file &&
                (await uploadImage(crestImage.file, jwt, {
                    field: 'images',
                    id: profileID,
                    type: 'api::profile.profile',
                }))
            const uploadedMiniCrestImage =
                miniCrest?.file &&
                (await uploadImage(miniCrest.file, jwt, {
                    field: 'images',
                    id: profileID,
                    type: 'api::profile.profile',
                }))
            const updatedTeam = {
                name,
                description,
                tagline,
                teamImage: {
                    image: uploadedTeamImage
                        ? uploadedTeamImage.id
                        : other.teamImage === null
                        ? null
                        : teamImage?.image?.data?.id,
                    caption: teamImageCaption,
                },
                crestOptions,
                ...(uploadedCrestImage ? { crest: uploadedCrestImage.id } : {}),
                ...(teamMembers ? { profiles: teamMembers.map(({ id }: any) => ({ id })) } : {}),
                ...(teamLeads ? { leadProfiles: teamLeads.map(({ id }: any) => ({ id })) } : {}),
                ...(uploadedMiniCrestImage ? { miniCrest: uploadedMiniCrestImage.id } : {}),
            }
            if (!team) {
                await createTeam(updatedTeam)
            } else {
                await updateTeam(updatedTeam)
            }
            setSaving(false)
            setEditing(false)
        },
    })

    // Connect submitForm to parent ref
    useEffect(() => {
        if (onSaveRef) {
            onSaveRef.current = submitForm
        }
    }, [onSaveRef, submitForm])

    const createTeam = async (team: any) => {
        const jwt = await getJwt()
        const body = JSON.stringify({ data: { ...team, slug: slugify(team.name, { lower: true, remove: /and/ }) } })
        const {
            data: {
                attributes: { slug },
            },
        } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/teams`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'content-type': 'application/json',
            },
            method: 'POST',
            body,
        }).then((res) => res.json())

        navigate(`/teams/${slug}`)
    }

    function isTeamLead(id: string) {
        return editing
            ? values.teamLeads?.some(({ id: leadID }: any) => leadID === id)
            : leadProfiles?.data?.some(({ id: leadID }: any) => leadID === id)
    }

    const addTeamMember = (profile: any) => {
        setFieldValue('teamMembers', [...values.teamMembers, { id: profile.id, attributes: profile }])
    }

    const removeTeamMember = (profileID: string) => {
        const teamMembers = values.teamMembers.filter((teamMember: any) => teamMember.id !== profileID)
        setFieldValue('teamMembers', teamMembers)
    }

    const handleTeamLead = (profileID: string, isTeamLead: boolean) => {
        if (isTeamLead) {
            setFieldValue(
                'teamLeads',
                values.teamLeads.filter((teamLead: any) => teamLead.id !== profileID)
            )
        } else {
            setFieldValue('teamLeads', [...values.teamLeads, { id: profileID }])
        }
    }

    // Create teams navigation for sidebar
    const teamsNavigation = useMemo(() => {
        const teams = data?.allSqueakTeam?.nodes || []
        return [
            {
                name: 'Teams',
            },
            ...teams
                .filter((t: any) => t.name)
                .sort((a: any, b: any) => a.name.localeCompare(b.name))
                .map((t: any) => ({
                    name: t.name,
                    url: `/teams/${t.slug}`,
                    active: t.slug === slug,
                })),
        ]
    }, [data?.allSqueakTeam?.nodes, slug])

    const handleSave = async () => {
        if (onSaveRef.current) {
            onSaveRef.current()
        }
    }

    const handleCancel = () => {
        setEditing(false)
    }

    // Data calculations
    const teamLength = profiles?.data?.length
    const pineapplePercentage =
        teamLength &&
        teamLength > 0 &&
        Math.round(
            (profiles?.data?.filter(({ attributes: { pineappleOnPizza } }) => pineappleOnPizza).length / teamLength) *
                100
        )

    const underConsideration = teamData?.roadmaps?.filter(
        (roadmap) =>
            !roadmap.dateCompleted &&
            !roadmap.projectedCompletion &&
            roadmap.githubPages &&
            roadmap.githubPages.length > 0
    )

    const inProgress = teamData?.roadmaps?.filter((roadmap) => !roadmap.complete && roadmap.projectedCompletion)

    const [recentlyShipped] =
        teamData?.roadmaps
            ?.filter((roadmap) => roadmap.complete)
            .sort((a, b) => (new Date(a.dateCompleted).getTime() > new Date(b.dateCompleted).getTime() ? -1 : 1)) || []

    const { updates } = useTeamUpdates({
        teamName: name,
        filters: {
            roadmap: {
                id: {
                    $null: true,
                },
            },
        },
    })

    const hasUnderConsideration = underConsideration?.length > 0
    const hasInProgress = inProgress?.length > 0
    const hasBody = !!body
    const heightToHedgehogs =
        profiles?.data?.reduce((acc, curr) => acc + (curr?.attributes?.height || 0), 0) / hedgehogLengthInches || 0
    const hedgehogPercentage =
        (heightToHedgehogs % 1 !== 0 &&
            Math.round(hedgehogImageWidth * (heightToHedgehogs - Math.floor(heightToHedgehogs)))) ||
        0

    const teamEmojis = teamData?.emojis?.filter((emoji) => !!emoji?.name && !!emoji?.localFile?.publicURL)

    // Create a map of team names to crest data for quick lookup
    const teamCrestMap = allTeams.nodes.reduce((acc: any, team: any) => {
        acc[team.name] = team.crest?.data?.attributes?.url
        return acc
    }, {})

    // Filter jobs that are assigned to this team
    const teamJobs = allAshbyJobPosting.nodes.filter((job: any) => {
        const teamsField = job.parent.customFields.find((field: any) => field.title === 'Teams')
        if (!teamsField) return false
        const teams = JSON.parse(teamsField.value || '[]')
        return teams.includes(name)
    })

    const editButton = isModerator ? (
        <>{!editing && <OSButton size="md" icon={<IconPencil />} onClick={() => setEditing(true)} />}</>
    ) : null

    const editActions =
        editing && isModerator ? (
            <>
                <OSButton size="md" variant="secondary" onClick={handleCancel}>
                    Cancel
                </OSButton>
                <OSButton size="md" variant="primary" onClick={handleSave} disabled={saving}>
                    Save
                </OSButton>
            </>
        ) : null

    return (
        <>
            <SEO
                title={`${name || teamData?.name || slug} - PostHog`}
                description="We're organized into multi-disciplinary small teams."
                image={`/images/small-teams.png`}
            />
            <SideModal open={!!activeProfile} setOpen={setActiveProfile as any}>
                {activeProfile && <Profile profile={{ ...(activeProfile as ProfileData) }} />}
            </SideModal>
            <ReaderView
                title={`${(team as any)?.name || slug} Team`}
                hideTitle={true}
                leftSidebar={
                    <div className="pb-6">
                        <TreeMenu items={teamsNavigation} />
                    </div>
                }
                homeURL="/teams"
                description={`Learn about the ${(team as any)?.name || slug} team at PostHog`}
                proseSize="sm"
                rightActionButtons={editing ? editActions : editButton}
                showQuestions={false}
                {...({
                    header: (
                        <Header
                            loading={loading}
                            teamName={values.name}
                            description={values.description}
                            tagline={values.tagline}
                            teamImage={teamImage}
                            hasInProgress={hasInProgress}
                            handleChange={handleChange}
                            values={values}
                            editing={editing}
                            setFieldValue={setFieldValue}
                        />
                    ),
                } as any)}
            >
                {/* <DebugContainerQuery />
                <DebugContainerQuery name="reader-content" /> */}

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
                                    {hedgehogPercentage && (
                                        <li
                                            style={{
                                                width: hedgehogPercentage,
                                            }}
                                            className="overflow-hidden relative m-0.5"
                                        >
                                            <Hedgehog className="absolute object-none object-left" />
                                        </li>
                                    )}
                                </ul>
                            </Fieldset>
                        </div>
                    )}
                    <div
                        className={`col-span-2 grid @lg/reader-content:grid-cols-2 gap-4 @2xl/reader-content:gap-8 ${
                            !teamImage?.image?.data && !editing ? '' : ''
                        }`}
                    >
                        <div className="@container/team-stats">
                            <div className="grid @lg/team-stats:grid-cols-2 gap-4">
                                <div>
                                    <Fieldset legend="Pineapple on pizza">
                                        <PineapplePieChart percentage={pineapplePercentage} />
                                    </Fieldset>
                                </div>
                                <div>
                                    {teamEmojis?.length > 0 && (
                                        <Fieldset legend="Custom emojis">
                                            <ul className="list-none m-0 p-0 mt-2 flex flex-wrap gap-2">
                                                {teamEmojis?.map(({ name, localFile }) => (
                                                    <li key={name}>
                                                        <Tooltip
                                                            trigger={<img className="h-8" src={localFile?.publicURL} />}
                                                            delay={0}
                                                        >
                                                            :{name}:
                                                        </Tooltip>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Fieldset>
                                    )}
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="max-w-md w-full aspect-video bg-accent rounded rotate-2" />
                        ) : (
                            <TeamImage
                                values={values}
                                setFieldValue={setFieldValue}
                                teamImage={teamImage}
                                editing={editing}
                            />
                        )}
                    </div>
                </div>

                <Fieldset legend="Members">
                    <div className="@container flex-1">
                        <ul className="not-prose list-none mt-12 mx-0 p-0 flex flex-col @xs/reader-content:grid grid-cols-2 @xl/reader-content:grid-cols-3 @4xl/reader-content:grid-cols-4 @5xl/reader-content:grid-cols-5 gap-4 @md/reader-content:gap-x-6 gap-y-12 max-w-screen-2xl">
                            {loading
                                ? new Array(4).fill(0).map((_, i) => (
                                      <li key={i}>
                                          <div className="w-full border border-primary rounded-md bg-accent flex flex-col p-4 relative overflow-hidden h-64 animate-pulse" />
                                      </li>
                                  ))
                                : profiles?.data || values.teamMembers
                                ? [...((editing ? values.teamMembers : profiles?.data) || [])]
                                      .sort((a, b) => isTeamLead(b.id) - isTeamLead(a.id))
                                      .map((profile) => {
                                          const {
                                              id,
                                              attributes: {
                                                  avatar,
                                                  firstName,
                                                  lastName,
                                                  country,
                                                  location,
                                                  companyRole,
                                                  pineappleOnPizza,
                                                  teams,
                                              },
                                          } = profile
                                          // const name = [firstName, lastName].filter(Boolean).join(' ')
                                          return (
                                              <li key={id} className="rounded-md relative">
                                                  <TeamMember
                                                      avatar={{
                                                          url: avatar?.data?.attributes?.url || avatar?.url,
                                                      }}
                                                      firstName={firstName}
                                                      lastName={lastName}
                                                      companyRole={companyRole}
                                                      country={country}
                                                      location={location}
                                                      squeakId={id}
                                                      color={profile.attributes.color || 'yellow'}
                                                      biography={profile.attributes.biography || ''}
                                                      teamCrestMap={teamCrestMap}
                                                      pineappleOnPizza={pineappleOnPizza}
                                                      startDate={profile.attributes.startDate}
                                                      isTeamLead={isTeamLead(id)}
                                                      teams={teams}
                                                  />
                                                  {editing && (
                                                      <div className="absolute -top-2 -right-2 z-20 flex flex-col gap-1">
                                                          <button
                                                              onClick={() => removeTeamMember(id)}
                                                              className="w-7 h-7 rounded-full border border-input flex items-center justify-center bg-white text-black"
                                                              title="Remove team member"
                                                          >
                                                              <IconX className="w-4 h-4" />
                                                          </button>
                                                          <button
                                                              onClick={() => handleTeamLead(id, isTeamLead(id))}
                                                              className={`w-7 h-7 rounded-full border border-input flex items-center justify-center ${
                                                                  isTeamLead(id)
                                                                      ? 'bg-yellow text-white'
                                                                      : 'bg-accent text-black dark:text-white'
                                                              }`}
                                                              title={
                                                                  isTeamLead(id) ? 'Remove team lead' : 'Make team lead'
                                                              }
                                                          >
                                                              <IconCrown className="w-4 h-4" />
                                                          </button>
                                                      </div>
                                                  )}
                                              </li>
                                          )
                                      })
                                : new Array(4).fill(0).map((_, i) => (
                                      <li key={i}>
                                          <div className="w-full border border-primary rounded-md bg-accent flex flex-col p-4 relative overflow-hidden h-64 animate-pulse" />
                                      </li>
                                  ))}
                            {/* Add job cards for open roles */}
                            {teamJobs.map((job: any) => (
                                <li key={job.fields.slug} className="rounded-md relative">
                                    <JobCard job={job} />
                                </li>
                            ))}
                        </ul>
                        {editing && <AddTeamMember handleChange={(user) => addTeamMember(user.profile)} />}
                    </div>
                </Fieldset>

                {(hasInProgress || hasUnderConsideration || recentlyShipped) && (
                    <>
                        <h2 id="roadmap">Roadmap</h2>

                        {hasInProgress && (
                            <Fieldset legend="What we're building">
                                <div className="">
                                    <ul className="list-none m-0 p-0 flex flex-col gap-4">
                                        {inProgress.map((roadmap) => (
                                            <InProgress key={roadmap.squeakId} {...roadmap} />
                                        ))}
                                    </ul>
                                    {(updates.length > 0 || isModerator) && (
                                        <div className="lg:max-w-[340px] w-full flex-shrink-0">
                                            {isModerator && (
                                                <div
                                                    className={`${updates.length > 0 ? 'mb-8 pb-8 border-input ' : ''}`}
                                                >
                                                    <TeamUpdate teamName={name} hideTeamSelect />
                                                </div>
                                            )}
                                            {updates.length > 0 && (
                                                <Question
                                                    key={(updates[0] as any).question}
                                                    id={(updates[0] as any).question}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Fieldset>
                        )}
                        <Roadmap
                            hasUnderConsideration={hasUnderConsideration}
                            underConsideration={underConsideration}
                            recentlyShipped={recentlyShipped}
                        />
                    </>
                )}

                {objectives && (
                    <>
                        <h2>Goals</h2>
                        <MDXProvider components={{ TeamMember: TeamMemberComponent, FutureTeamMember }}>
                            <MDXRenderer>{objectives}</MDXRenderer>
                        </MDXProvider>
                    </>
                )}

                {body && (
                    <>
                        <h2>Handbook</h2>
                        <MDXProvider components={{ PrivateLink }}>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                    </>
                )}
            </ReaderView>
        </>
    )
}
