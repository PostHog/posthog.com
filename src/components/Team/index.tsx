import { CallToAction } from 'components/CallToAction'
import { PineappleText } from 'components/Job/Sidebar'
import { InProgress } from 'components/Roadmap/InProgress'
import { Question } from 'components/Squeak'
import useTeamUpdates from 'hooks/useTeamUpdates'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import { kebabCase } from 'lib/utils'
import React, { useState } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { SmoothScroll } from 'components/Products/SmoothScroll'
import Tooltip from 'components/Tooltip'
import SEO from 'components/seo'
import SideModal from 'components/Modal/SideModal'
import TeamMember, { FutureTeamMember } from 'components/TeamMember'
import { AddTeamMember } from 'components/TeamMembers'
import useTeam from 'hooks/useTeam'
import { IconInfo, IconSpinner, IconX } from '@posthog/icons'
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

const SidebarSection = ({ title, tooltip, children }) => {
    return (
        <div>
            <h5 className="m-0 text-[15px] opacity-75 font-normal mb-2">
                {title}
                {tooltip && (
                    <Tooltip content={tooltip}>
                        <IconInfo className="w-4 h-4 ml-0.5 relative -top-px inline-block" />
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
}) => {
    return (
        <div className="text-left w-full border border-border dark:border-border-dark rounded-md h-full flex flex-col p-4 relative hover:-top-0.5 active:top-[.5px] hover:transition-all z-10 overflow-hidden max-h-64">
            <div className="mb-auto">
                <h3 className="mb-0 text-base leading-tight" id={kebabCase(name) + '-' + kebabCase(companyRole)}>
                    {name}
                </h3>
                <p className="text-primary/50 text-sm dark:text-primary-dark/50 m-0">{companyRole}</p>

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

export default function Team({ body, roadmaps, objectives, emojis, newTeam, slug }: TeamProps): JSX.Element {
    const [saving, setSaving] = useState(false)
    const [editing, setEditing] = useState(newTeam || false)
    const [activeProfile, setActiveProfile] = useState<boolean | ProfileData>(false)
    const { team, updateTeam, loading } = useTeam({
        slug,
    })

    const { name, crest, crestOptions, description, profiles, leadProfiles, teamImage, miniCrest } =
        team?.attributes || {}
    const { user, getJwt } = useUser()
    const isModerator = user?.role?.type === 'moderator'
    const {
        allSlackEmoji: { totalCount: totalSlackEmojis },
    } = useStaticQuery(graphql`
        {
            allSlackEmoji {
                totalCount
            }
        }
    `)

    const { handleChange, values, submitForm, setFieldValue, errors, resetForm } = useFormik({
        enableReinitialize: true,
        validateOnMount: true,
        validationSchema: yup.object({
            name: yup.string().required('Name is required'),
        }),
        initialValues: {
            name,
            description,
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

    const posthog = usePostHog()

    const tabs = [
        {
            value: 'overview',
            label: 'Overview',
            content: (
                <>
                    <Header
                        loading={loading}
                        teamName={values.name}
                        description={description}
                        teamImage={teamImage}
                        hasInProgress={hasInProgress}
                        handleChange={handleChange}
                        values={values}
                        editing={editing}
                        setFieldValue={setFieldValue}
                    />
                    <Fieldset legend="Members">
                        <div className="@container flex-1">
                            <ul className="list-none p-0 m-0 grid grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 @4xl:grid-cols-5 gap-4">
                                {loading
                                    ? new Array(4).fill(0).map((_, i) => (
                                          <li key={i}>
                                              <div className="w-full border border-border dark:border-border-dark rounded-md bg-accent dark:bg-accent-dark flex flex-col p-4 relative overflow-hidden h-64 animate-pulse" />
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
                                                      <button
                                                          className="size-full"
                                                          onClick={() =>
                                                              setActiveProfile({
                                                                  ...profile.attributes,
                                                                  isTeamLead: isTeamLead(id),
                                                                  id,
                                                              })
                                                          }
                                                      >
                                                          <TeamMemberCard
                                                              name={name}
                                                              companyRole={companyRole}
                                                              country={country}
                                                              location={location}
                                                              isTeamLead={isTeamLead}
                                                              pineappleOnPizza={pineappleOnPizza}
                                                              handleTeamLead={handleTeamLead}
                                                              editing={editing}
                                                              id={id}
                                                              avatar={avatar}
                                                          />
                                                      </button>
                                                      {editing && (
                                                          <button
                                                              onClick={() => removeTeamMember(id)}
                                                              className="w-7 h-7 rounded-full border border-border dark:border-dark absolute -right-2 flex items-center justify-center -top-2 z-10 bg-accent dark:bg-accent-dark"
                                                          >
                                                              <Tooltip content="Remove team member" placement="top">
                                                                  <IconX className="w-4 h-4" />
                                                              </Tooltip>
                                                          </button>
                                                      )}
                                                  </li>
                                              )
                                          })
                                    : new Array(4).fill(0).map((_, i) => (
                                          <li key={i}>
                                              <div className="w-full border border-border dark:border-border-dark rounded-md bg-accent dark:bg-accent-dark flex flex-col p-4 relative overflow-hidden h-64 animate-pulse" />
                                          </li>
                                      ))}
                            </ul>
                            {editing && <AddTeamMember handleChange={(user) => addTeamMember(user.profile)} />}
                        </div>
                    </Fieldset>
                    <div className="grid grid-cols-2 gap-4">
                        <Fieldset legend="Pineapple on pizza">{PineappleText(pineapplePercentage)}</Fieldset>
                        {teamEmojis?.length > 0 && (
                            <Fieldset legend="Custom emojis">
                                <ul className="list-none m-0 p-0 mt-2 flex flex-wrap gap-2">
                                    {teamEmojis?.map(({ name, localFile }) => (
                                        <li key={name}>
                                            <Tooltip content={`:${name}:`}>
                                                <img className="h-8" src={localFile?.publicURL} />
                                            </Tooltip>
                                        </li>
                                    ))}
                                </ul>
                            </Fieldset>
                        )}
                    </div>
                    <Fieldset
                        legend={
                            <span className="flex items-center gap-1">
                                Team length in hedgehogs{' '}
                                <Tooltip
                                    placement="right"
                                    content={`The average hedgehog is ${
                                        posthog?.getFeatureFlag?.('are-you-in-the-us') ? '7 inches' : '17 centimeters'
                                    } long`}
                                >
                                    <IconInfo className="w-4" />
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
                </>
            ),
        },
        {
            value: 'roadmap',
            label: 'Roadmap',
            content: (
                <>
                    {hasInProgress && (
                        <Fieldset legend="What we're building">
                            <div className="lg:flex lg:space-x-12 space-y-8 lg:space-y-0 items-start">
                                <ul className="list-none m-0 p-0 flex flex-col gap-4">
                                    {inProgress.map((roadmap) => (
                                        <InProgress key={roadmap.squeakId} {...roadmap} />
                                    ))}
                                </ul>
                                {(updates.length > 0 || isModerator) && (
                                    <div className="lg:max-w-[340px] w-full flex-shrink-0">
                                        {isModerator && (
                                            <div
                                                className={`${
                                                    updates.length > 0
                                                        ? 'mb-8 pb-8 border-border dark:border-dark '
                                                        : ''
                                                }`}
                                            >
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
            ),
        },
        ...(objectives
            ? [
                  {
                      value: 'goals',
                      label: 'Goals',
                      content: (
                          <div className="article-content team-page-content">
                              <MDXProvider components={{ TeamMember, FutureTeamMember }}>
                                  <MDXRenderer>{objectives}</MDXRenderer>
                              </MDXProvider>
                          </div>
                      ),
                  },
              ]
            : []),
        ...(hasBody
            ? [
                  {
                      value: 'handbook',
                      label: 'Handbook',
                      content: (
                          <div className="article-content team-page-content">
                              <MDXProvider components={{ PrivateLink }}>
                                  <MDXRenderer>{body}</MDXRenderer>
                              </MDXProvider>
                          </div>
                      ),
                  },
              ]
            : []),
    ]

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
            <OSTabs tabs={tabs} triggerDataScheme="primary" defaultValue="overview">
                {isModerator && (
                    <div className="flex justify-end space-x-2 absolute bottom-4 right-4 z-50">
                        <CallToAction
                            disabled={saving || !!errors.name}
                            size="sm"
                            onClick={() => {
                                if (editing) {
                                    submitForm()
                                } else {
                                    setEditing(true)
                                }
                            }}
                        >
                            {saving ? (
                                <IconSpinner className="size-5 animate-spin" />
                            ) : editing ? (
                                newTeam ? (
                                    'Save & publish'
                                ) : (
                                    'Save'
                                )
                            ) : (
                                'Edit'
                            )}
                        </CallToAction>
                        {!newTeam && editing && (
                            <CallToAction
                                type="secondary"
                                size="sm"
                                onClick={() => {
                                    setEditing(false)
                                    resetForm()
                                }}
                            >
                                Cancel
                            </CallToAction>
                        )}
                    </div>
                )}
            </OSTabs>
        </>
    )
}
