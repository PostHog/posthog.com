import { PineappleText } from 'components/Job/Sidebar'
import { InProgress } from 'components/Roadmap/InProgress'
import { Question } from 'components/Squeak'
import useTeamUpdates from 'hooks/useTeamUpdates'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import { kebabCase } from 'lib/utils'
import React, { useState, useEffect } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { SmoothScroll } from 'components/Products/SmoothScroll'
import Tooltip from 'components/RadixUI/Tooltip'
import SEO from 'components/seo'
import SideModal from 'components/Modal/SideModal'
import { TeamMember } from 'components/People'
import TeamMemberComponent, { FutureTeamMember } from 'components/TeamMember'
import { AddTeamMember } from 'components/TeamMembers'
import useTeam from 'hooks/useTeam'
import { IconInfo, IconX, IconCrown, IconPlus } from '@posthog/icons'
import { useUser } from 'hooks/useUser'
import { useFormik } from 'formik'
import TeamUpdate from 'components/TeamUpdate'
import usePostHog from '../../hooks/usePostHog'
import { PrivateLink } from 'components/PrivateLink'
import Stickers from 'components/ProfileStickers'
import uploadImage from 'components/Squeak/util/uploadImage'
import slugify from 'slugify'
import * as yup from 'yup'
import Section from './Section'
import Header from './Header'
import Profile, { ProfileData } from './Profile'
import Roadmap from './Roadmap'
import { Tabs } from 'radix-ui'
import { Fieldset } from 'components/OSFieldset'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSTabs from 'components/OSTabs'
import TeamImage from './TeamImage'
import Link from 'components/Link'
import {
    StickerPineappleYes,
    StickerPineappleNo,
    StickerPineappleUnknown,
    StickerPineapple,
} from 'components/Stickers/Index'
import ZoomHover from 'components/ZoomHover'
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
    if (!percentage) {
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
            <div className="flex-1">
                <p className="text-sm text-secondary mb-0">Does pineapple belong on pizza?</p>
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

const SidebarSection = ({
    title,
    tooltip,
    children,
}: {
    title: React.ReactNode
    tooltip?: string
    children: React.ReactNode
}) => {
    return (
        <div>
            <h5 className="m-0 text-[15px] opacity-75 font-normal mb-2">
                {title}
                {tooltip && (
                    <Tooltip trigger={<IconInfo className="w-4 h-4 ml-0.5 relative -top-px inline-block" />}>
                        {tooltip}
                    </Tooltip>
                )}
            </h5>
            <div>{children}</div>
        </div>
    )
}

interface TeamProps {
    body: string
    roadmaps?: any[]
    objectives?: string
    emojis?: any[]
    newTeam?: boolean
    slug: string
    editing?: boolean
    setEditing?: (editing: boolean) => void
    saving?: boolean
    setSaving?: (saving: boolean) => void
    onSaveRef?: React.MutableRefObject<(() => void) | null>
}

export const TeamMemberCard = ({
    name,
    companyRole,
    country,
    location,
    isTeamLead,
    pineappleOnPizza,
    handleTeamLead,
    editing,
    id,
    avatar,
}: {
    name: string
    companyRole: string
    country: string
    location: string
    isTeamLead: boolean
    pineappleOnPizza: boolean | null
    handleTeamLead?: (id: string, isTeamLead: boolean) => void
    editing: boolean
    id: string
    avatar: any
}) => {
    return (
        <div className="text-left w-full border border-primary rounded-md h-full flex flex-col p-4 relative hover:-top-0.5 active:top-[.5px] hover:transition-all z-10 overflow-hidden max-h-64">
            <div className="mb-auto">
                <h3 className="mb-0 text-base leading-tight" id={kebabCase(name) + '-' + kebabCase(companyRole)}>
                    {name}
                </h3>
                <p className="text-muted text-sm  m-0">{companyRole}</p>

                <div className="mt-1 flex space-x-1 items-center">
                    <Stickers
                        country={country}
                        location={location}
                        isTeamLead={isTeamLead}
                        pineappleOnPizza={pineappleOnPizza}
                        handleTeamLead={handleTeamLead}
                        editing={editing}
                        id={id}
                    />
                </div>
            </div>
            <div className="ml-auto -mb-4 -mr-4 mt-2">
                <img
                    src={
                        avatar?.data?.attributes?.url ||
                        avatar?.url ||
                        'https://res.cloudinary.com/dmukukwp6/image/upload/v1698231117/max_6942263bd1.png'
                    }
                    className="w-[165px]"
                />
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

export default function Team({
    body,
    roadmaps,
    objectives,
    emojis,
    newTeam,
    slug,
    editing: editingProp,
    setEditing: setEditingProp,
    saving: savingProp,
    setSaving: setSavingProp,
    onSaveRef,
}: TeamProps): JSX.Element {
    const [localSaving, setLocalSaving] = useState(false)
    const [localEditing, setLocalEditing] = useState(newTeam || false)

    // Use prop values if provided, otherwise use local state
    const editing = editingProp !== undefined ? editingProp : localEditing
    const setEditing = setEditingProp || setLocalEditing
    const saving = savingProp !== undefined ? savingProp : localSaving
    const setSaving = setSavingProp || setLocalSaving
    const [activeProfile, setActiveProfile] = useState<boolean | ProfileData>(false)
    const { team, updateTeam, loading } = useTeam({
        slug,
    })

    const { name, crest, crestOptions, description, tagline, profiles, leadProfiles, teamImage, miniCrest } =
        team?.attributes || {}
    const { user, getJwt } = useUser()
    const isModerator = user?.role?.type === 'moderator'
    const {
        allSlackEmoji: { totalCount: totalSlackEmojis },
        allTeams,
        allAshbyJobPosting,
    } = useStaticQuery(graphql`
        {
            allSlackEmoji {
                totalCount
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
                ...(teamMembers ? { profiles: teamMembers.map(({ id }) => ({ id })) } : {}),
                ...(teamLeads ? { leadProfiles: teamLeads.map(({ id }) => ({ id })) } : {}),
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

    // Connect submitForm to parent ref if provided
    useEffect(() => {
        if (onSaveRef) {
            onSaveRef.current = submitForm
        }
    }, [onSaveRef, submitForm])

    const teamLength = profiles?.data?.length
    const pineapplePercentage =
        teamLength &&
        teamLength > 0 &&
        Math.round(
            (profiles?.data?.filter(({ attributes: { pineappleOnPizza } }) => pineappleOnPizza).length / teamLength) *
                100
        )

    const underConsideration = roadmaps?.filter(
        (roadmap) =>
            !roadmap.dateCompleted &&
            !roadmap.projectedCompletion &&
            roadmap.githubPages &&
            roadmap.githubPages.length > 0
    )

    const inProgress = roadmaps?.filter((roadmap) => !roadmap.complete && roadmap.projectedCompletion)

    const [recentlyShipped] =
        roadmaps
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

    function isTeamLead(id) {
        return editing
            ? values.teamLeads?.some(({ id: leadID }) => leadID === id)
            : leadProfiles?.data?.some(({ id: leadID }) => leadID === id)
    }

    const addTeamMember = (profile) => {
        setFieldValue('teamMembers', [...values.teamMembers, { id: profile.id, attributes: profile }])
    }

    const removeTeamMember = (profileID) => {
        const teamMembers = values.teamMembers.filter((teamMember) => teamMember.id !== profileID)
        setFieldValue('teamMembers', teamMembers)
    }

    const handleTeamLead = (profileID, isTeamLead) => {
        if (isTeamLead) {
            setFieldValue(
                'teamLeads',
                values.teamLeads.filter((teamLead) => teamLead.id !== profileID)
            )
        } else {
            setFieldValue('teamLeads', [...values.teamLeads, { id: profileID }])
        }
    }

    const hasUnderConsideration = underConsideration?.length > 0
    const hasInProgress = inProgress?.length > 0
    const hasBody = !!body
    const heightToHedgehogs =
        profiles?.data?.reduce((acc, curr) => acc + (curr?.attributes?.height || 0), 0) / hedgehogLengthInches || 0
    const hedgehogPercentage =
        (heightToHedgehogs % 1 !== 0 &&
            Math.round(hedgehogImageWidth * (heightToHedgehogs - Math.floor(heightToHedgehogs)))) ||
        0

    const teamEmojis = emojis?.filter((emoji) => !!emoji?.name && !!emoji?.localFile?.publicURL)

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

    const posthog = usePostHog()

    return (
        <>
            {name && (
                <SEO
                    title={`${name} - PostHog`}
                    description="We're organized into multi-disciplinary small teams."
                    image={`/images/small-teams.png`}
                />
            )}
            <SideModal open={!!activeProfile} setOpen={setActiveProfile}>
                {activeProfile && <Profile profile={{ ...activeProfile }} />}
            </SideModal>

            <Header
                loading={loading}
                teamName={values.name}
                description={description}
                tagline={tagline}
                teamImage={teamImage}
                hasInProgress={hasInProgress}
                handleChange={handleChange}
                values={values}
                editing={editing}
                setFieldValue={setFieldValue}
            />

            <div className="not-prose grid @2xl/reader-content:grid-cols-2 gap-8 mb-8">
                <div className={!teamImage?.image?.data && !editing ? 'col-span-2' : ''}>
                    <div className="@container/team-stats">
                        <div className="grid @xl/team-stats:grid-cols-2 gap-4">
                            {/* <DebugContainerQuery /> */}
                            <div>
                                <Fieldset legend="Pineapple on pizza">
                                    <PineapplePieChart percentage={pineapplePercentage} />
                                </Fieldset>
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
                            {heightToHedgehogs > 0 && (
                                <div>
                                    <Fieldset
                                        legend={
                                            <span className="flex items-center gap-1">
                                                Team height in hedgehogs{' '}
                                                <Tooltip trigger={<IconInfo className="w-4" />} delay={0}>
                                                    The average hedgehog is{' '}
                                                    {posthog?.getFeatureFlag?.('are-you-in-the-us')
                                                        ? '7 inches'
                                                        : '17 centimeters'}{' '}
                                                    long
                                                </Tooltip>
                                            </span>
                                        }
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
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="max-w-md w-full aspect-video bg-accent rounded rotate-2" />
                ) : (
                    <TeamImage values={values} setFieldValue={setFieldValue} teamImage={teamImage} editing={editing} />
                )}
            </div>

            <Fieldset legend="Members">
                <div className="@container flex-1">
                    <ul className="not-prose list-none mt-12 mx-0 p-0 flex flex-col @xs:grid grid-cols-2 @2xl:grid-cols-3 @5xl:grid-cols-4 gap-4 @md:gap-x-6 gap-y-12 max-w-screen-2xl">
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
                                          },
                                      } = profile
                                      const name = [firstName, lastName].filter(Boolean).join(' ')
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
                                              />
                                              {editing && (
                                                  <div className="absolute -top-2 -right-2 z-20 flex flex-col gap-1">
                                                      <button
                                                          onClick={() => removeTeamMember(id)}
                                                          className="w-7 h-7 rounded-full border border-input flex items-center justify-center bg-red-500 text-white hover:bg-red-600"
                                                          title="Remove team member"
                                                      >
                                                          <IconX className="w-4 h-4" />
                                                      </button>
                                                      <button
                                                          onClick={() => handleTeamLead(id, isTeamLead(id))}
                                                          className={`w-7 h-7 rounded-full border border-input flex items-center justify-center text-white hover:opacity-80 ${
                                                              isTeamLead(id) ? 'bg-yellow-500' : 'bg-gray-500'
                                                          }`}
                                                          title={isTeamLead(id) ? 'Remove team lead' : 'Make team lead'}
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
                                            <div className={`${updates.length > 0 ? 'mb-8 pb-8 border-input ' : ''}`}>
                                                <TeamUpdate teamName={name} hideTeamSelect />
                                            </div>
                                        )}
                                        {updates.length > 0 && (
                                            <Question key={updates[0].question} id={updates[0].question} />
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
                    <div className="article-content team-page-content">
                        <MDXProvider components={{ TeamMember: TeamMemberComponent, FutureTeamMember }}>
                            <div dangerouslySetInnerHTML={{ __html: objectives }} />
                        </MDXProvider>
                    </div>
                </>
            )}

            {body && (
                <>
                    <h2>Handbook</h2>
                    <div className="article-content team-page-content">
                        <MDXProvider components={{ PrivateLink }}>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                </>
            )}
        </>
    )
}
