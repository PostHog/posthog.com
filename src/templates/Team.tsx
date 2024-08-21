import { CallToAction } from 'components/CallToAction'
import { PineappleText } from 'components/Job/Sidebar'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { InProgress } from 'components/Roadmap/InProgress'
import { Question } from 'components/Squeak'
import useTeamUpdates from 'hooks/useTeamUpdates'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { kebabCase } from 'lib/utils'
import React, { useState } from 'react'
import {
    StickerMayor,
    StickerFlagAT,
    StickerFlagBE,
    StickerFlagCA,
    StickerFlagCO,
    StickerFlagDE,
    StickerFlagIE,
    StickerFlagES,
    StickerFlagFI,
    StickerFlagFR,
    StickerFlagGB,
    StickerFlagHU,
    StickerFlagNL,
    StickerFlagPL,
    StickerFlagUnknown,
    StickerFlagUS,
    StickerPineappleYes,
    StickerPineappleNo,
    StickerPineappleUnknown,
} from 'components/Stickers/Index'
import { UnderConsideration } from 'components/Roadmap/UnderConsideration'
import { Change } from './Changelog'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { SmoothScroll } from 'components/Products/SmoothScroll'
import Tooltip from 'components/Tooltip'
import SEO from 'components/seo'
import SideModal from 'components/Modal/SideModal'
import { Avatar } from 'components/MainNav'
import getAvatarURL from 'components/Squeak/util/getAvatar'
import Markdown from 'markdown-to-jsx'
import { AddTeamMember } from 'components/TeamMembers'
import useTeam from 'hooks/useTeam'
import { IconInfo, IconX } from '@posthog/icons'
import { useUser } from 'hooks/useUser'
import { useFormik } from 'formik'
import TeamUpdate from 'components/TeamUpdate'
import { RenderInClient } from 'components/RenderInClient'
import usePostHog from '../hooks/usePostHog'
import { companyMenu } from '../navs'
import { PrivateLink } from 'components/PrivateLink'

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

const Section = ({ children, cta, title, className = '', id = '' }) => {
    return (
        <section id={id} className={`max-w-screen-xl mx-auto px-5 mt-6 mb-12 ${className}`}>
            {title && (
                <div className="flex flex-col md:flex-row justify-between items-baseline w-full mb-6 md:mb-8 relative after:h-px after:bg-border dark:after:bg-border-dark after:absolute after:top-1/2 after:left-0 after:w-full">
                    <h4 className="m-0 bg-light dark:bg-dark relative z-10 pr-2">{title}</h4>
                    {cta && (
                        <aside className="bg-light dark:bg-dark relative z-10 md:pl-2 leading-tight -top-1">
                            {cta}
                        </aside>
                    )}
                </div>
            )}
            <div>{children}</div>
        </section>
    )
}

const Stickers = ({ country, pineappleOnPizza, isTeamLead, isModerator, id, handleTeamLead }) => {
    const TeamLeadContainer = isModerator && handleTeamLead ? 'span' : 'button'

    const handleTeamLeadClick = (e) => {
        e.stopPropagation()
        handleTeamLead(id, isTeamLead)
    }

    return (
        <>
            <span>
                {country === 'BE' ? (
                    <StickerFlagBE className="w-8 h-8" />
                ) : country === 'US' ? (
                    <StickerFlagUS className="w-8 h-8" />
                ) : country === 'GB' ? (
                    <StickerFlagGB className="w-8 h-8" />
                ) : country === 'DE' ? (
                    <StickerFlagDE className="w-8 h-8" />
                ) : country === 'ES' ? (
                    <StickerFlagES className="w-8 h-8" />
                ) : country === 'FI' ? (
                    <StickerFlagFI className="w-8 h-8" />
                ) : country === 'HU' ? (
                    <StickerFlagHU className="w-8 h-8" />
                ) : country === 'IE' ? (
                    <StickerFlagIE className="w-8 h-8" />
                ) : country === 'FR' ? (
                    <StickerFlagFR className="w-8 h-8" />
                ) : country === 'NL' ? (
                    <StickerFlagNL className="w-8 h-8" />
                ) : country === 'AT' ? (
                    <StickerFlagAT className="w-8 h-8" />
                ) : country === 'CA' ? (
                    <StickerFlagCA className="w-8 h-8" />
                ) : country === 'CO' ? (
                    <StickerFlagCO className="w-8 h-8" />
                ) : country === 'PL' ? (
                    <StickerFlagPL className="w-8 h-8" />
                ) : (
                    <StickerFlagUnknown className="w-8 h-8" />
                )}
            </span>
            <span>
                {pineappleOnPizza === null ? (
                    <Tooltip content="We're not sure if they like pineapple on pizza (yet)!">
                        <StickerPineappleUnknown className="w-8 h-8" />
                    </Tooltip>
                ) : pineappleOnPizza ? (
                    <Tooltip content="Prefers pineapple on pizza!">
                        <StickerPineappleYes className="w-8 h-8" />
                    </Tooltip>
                ) : (
                    <Tooltip content="Does not believe pineapple belongs on pizza">
                        <StickerPineappleNo className="w-8 h-8" />
                    </Tooltip>
                )}
            </span>
            {isTeamLead || isModerator ? (
                <TeamLeadContainer {...(isModerator && handleTeamLead ? { onClick: handleTeamLeadClick } : {})}>
                    <Tooltip content={isTeamLead ? 'Team lead' : 'Make team lead?'}>
                        <span>
                            <StickerMayor
                                active={isTeamLead}
                                className={`w-8 h-8 ${isTeamLead ? '' : 'opacity-40 hover:opacity-75'}`}
                            />
                        </span>
                    </Tooltip>
                </TeamLeadContainer>
            ) : (
                ''
            )}
        </>
    )
}

export const Profile = (profile) => {
    const { firstName, lastName, country, companyRole, pineappleOnPizza, biography, isTeamLead, id } = profile
    const name = [firstName, lastName].filter(Boolean).join(' ')
    return (
        <div>
            <div className="flex space-x-2 mb-6">
                <Avatar
                    className="w-24 h-24 bg-accent dark:bg-dark rounded-full border border-border dark:border-dark"
                    src={getAvatarURL(profile)}
                />
                <div>
                    <h2 className="m-0">{name}</h2>
                    <p className="text-primary/50 text-sm dark:text-primary-dark/50 m-0">{companyRole}</p>
                    <div className="flex space-x-1 items-center mt-1">
                        <Stickers
                            className="w-8 h-8"
                            country={country}
                            pineappleOnPizza={pineappleOnPizza}
                            isTeamLead={isTeamLead}
                        />
                    </div>
                </div>
            </div>

            {biography ? (
                <Markdown className="bio-sidebar">{biography}</Markdown>
            ) : (
                <p className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded p-4 text-sm">
                    {firstName} has been too busy writing code to fill out a bio!
                </p>
            )}
            <div className="mt-4">
                <CallToAction
                    to={`/community/profiles/${id}`}
                    type="secondary"
                    size="sm"
                    width="full [&_span]:w-[calc(100%_+_3px)]"
                >
                    Visit full profile
                </CallToAction>
            </div>
        </div>
    )
}

const DescriptionForm = ({ onSubmit, initialValues = { description: '' } }) => {
    const [loading, setLoading] = useState(false)
    const { handleChange, values, submitForm, handleSubmit } = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
            setLoading(true)
            onSubmit(values)
        },
    })
    return (
        <form onSubmit={handleSubmit} className="grid mt-4 max-w-md">
            <textarea
                rows={5}
                name="description"
                onChange={handleChange}
                placeholder="Description"
                value={values.description}
                className="w-full p-2 text-[15px] rounded-md bg-white border border-border dark:border-dark mb-2 resize-none"
            />
            <CallToAction disabled={loading} onClick={submitForm} size="sm">
                Update
            </CallToAction>
        </form>
    )
}

export default function Team({
    data: {
        mdx: { body },
        allSlackEmoji: { totalCount: totalSlackEmojis },
        team: { crest, name, roadmaps, teamImage, ...other },
        objectives,
    },
    pageContext,
}) {
    const { user } = useUser()
    const isModerator = user?.role?.type === 'moderator'
    const { team, addTeamMember, removeTeamMember, handleTeamLead, updateDescription } = useTeam({ teamName: name })
    const [editingDescription, setEditingDescription] = useState(false)
    const description = team?.attributes?.description
    const profiles = team?.attributes?.profiles
    const leadProfiles = team?.attributes?.leadProfiles
    const teamName = `${name} Team`
    const teamLength = profiles?.data?.length
    const pineapplePercentage =
        teamLength &&
        teamLength > 0 &&
        Math.round(
            (profiles?.data?.filter(({ attributes: { pineappleOnPizza } }) => pineappleOnPizza).length / teamLength) *
                100
        )

    const underConsideration = roadmaps.filter(
        (roadmap) =>
            !roadmap.dateCompleted &&
            !roadmap.projectedCompletion &&
            roadmap.githubPages &&
            roadmap.githubPages.length > 0
    )

    const inProgress = roadmaps.filter((roadmap) => !roadmap.complete && roadmap.projectedCompletion)

    const [recentlyShipped] = roadmaps
        .filter((roadmap) => roadmap.complete)
        .sort((a, b) => (new Date(a.dateCompleted).getTime() > new Date(b.dateCompleted).getTime() ? -1 : 1))

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

    function isTeamLead(id) {
        return leadProfiles?.data?.some(({ id: leadID }) => leadID === id)
    }

    const hasUnderConsideration = underConsideration.length > 0
    const hasInProgress = inProgress.length > 0
    const hasBody = !['/teams/exec', '/teams/data-warehouse'].includes(pageContext.slug)
    const [activeProfile, setActiveProfile] = useState(false)
    const heightToHedgehogs =
        profiles?.data?.reduce((acc, curr) => acc + (curr?.attributes?.height || 0), 0) / hedgehogLengthInches || 0
    const hedgehogPercentage =
        (heightToHedgehogs % 1 !== 0 &&
            Math.round(hedgehogImageWidth * (heightToHedgehogs - Math.floor(heightToHedgehogs)))) ||
        0

    const emojis = other?.emojis?.filter((emoji) => !!emoji?.name && !!emoji?.localFile?.publicURL)

    const posthog = usePostHog()

    return (
        <Layout
            parent={companyMenu}
            activeInternalMenu={companyMenu.children.find((menu) => menu.name.toLowerCase() === 'teams')}
        >
            <SEO
                title={`${teamName} - PostHog`}
                description="We're organized into multi-disciplinary small teams."
                image={`/images/small-teams.png`}
            />
            <SideModal open={!!activeProfile} setOpen={setActiveProfile}>
                <Profile {...activeProfile} />
            </SideModal>
            <Section className="mb-6">
                <div className="flex flex-col md:flex-row space-x-4 items-center">
                    <GatsbyImage image={getImage(crest)} alt={teamName} />
                    <div className="max-w-xl w-full">
                        <h1 className="m-0">{teamName}</h1>
                        {editingDescription ? (
                            <DescriptionForm
                                initialValues={{ description }}
                                onSubmit={async ({ description }) => {
                                    await updateDescription(description)
                                    setEditingDescription(false)
                                }}
                            />
                        ) : description ? (
                            <p className="my-2 md:mb-4 text-[15px]" dangerouslySetInnerHTML={{ __html: description }} />
                        ) : (
                            <div className="my-4 h-[22px] max-w-md bg-accent dark:bg-accent-dark animate-pulse rounded-md" />
                        )}
                        {isModerator && !editingDescription && (
                            <button
                                className="text-red dark:text-yellow block -mt-2 mb-4 text-sm font-bold"
                                onClick={() => setEditingDescription(true)}
                            >
                                Edit mission
                            </button>
                        )}
                        {hasInProgress && !editingDescription && (
                            <CallToAction type="secondary" size="md" to="#in-progress">
                                See what we're building
                            </CallToAction>
                        )}
                    </div>
                    {teamImage?.caption && (
                        <figure className="rotate-2 max-w-sm flex flex-col gap-2 mt-8 md:mt-0 ml-auto">
                            <div className="bg-accent aspect-video rounded-md flex justify-center items-center shadow-xl">
                                <GatsbyImage image={getImage(teamImage)} className="border-8 border-white rounded-md" />
                            </div>
                            <div className="text-right text-[13px] mr-2">{teamImage.caption}</div>
                        </figure>
                    )}
                </div>
            </Section>
            <SmoothScroll
                menuItems={[
                    {
                        label: 'People',
                        id: 'people',
                    },
                    ...(hasInProgress
                        ? [
                              {
                                  label: "What we're building",
                                  id: 'in-progress',
                              },
                          ]
                        : []),
                    ...(hasUnderConsideration || !!recentlyShipped
                        ? [
                              {
                                  label: 'Roadmap & recently shipped',
                                  id: 'roadmap',
                              },
                          ]
                        : []),
                    ...(objectives?.body
                        ? [
                              {
                                  label: 'Goals',
                                  id: 'goals',
                              },
                          ]
                        : []),
                    ...(hasBody
                        ? [
                              {
                                  label: 'Handbook',
                                  id: 'handbook',
                              },
                          ]
                        : []),
                ]}
            />
            <Section title="People" id="people">
                <div className="lg:flex lg:space-x-12 space-y-12 lg:space-y-0">
                    <div className="@container flex-1">
                        <ul className="list-none p-0 m-0 grid grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 @4xl:grid-cols-5 gap-4">
                            {profiles?.data
                                ? [...profiles.data]
                                      .sort((a, b) => isTeamLead(b.id) - isTeamLead(a.id))
                                      .map((profile) => {
                                          const {
                                              id,
                                              attributes: {
                                                  avatar,
                                                  firstName,
                                                  lastName,
                                                  country,
                                                  companyRole,
                                                  pineappleOnPizza,
                                              },
                                          } = profile
                                          const name = [firstName, lastName].filter(Boolean).join(' ')
                                          return (
                                              <li
                                                  key={id}
                                                  className="bg-border dark:bg-border-dark rounded-md relative"
                                              >
                                                  <button
                                                      onClick={() =>
                                                          setActiveProfile({
                                                              ...profile.attributes,
                                                              isTeamLead: isTeamLead(id),
                                                              id,
                                                          })
                                                      }
                                                      className="text-left w-full border border-border dark:border-border-dark rounded-md h-full bg-accent dark:bg-accent-dark flex flex-col p-4 relative hover:-top-0.5 active:top-[.5px] hover:transition-all z-10 overflow-hidden max-h-64"
                                                  >
                                                      <div className="mb-auto">
                                                          <h3
                                                              className="mb-0 text-base leading-tight"
                                                              id={kebabCase(name) + '-' + kebabCase(companyRole)}
                                                          >
                                                              {name}
                                                          </h3>
                                                          <p className="text-primary/50 text-sm dark:text-primary-dark/50 m-0">
                                                              {companyRole}
                                                          </p>

                                                          <div className="mt-1 flex space-x-1 items-center">
                                                              <Stickers
                                                                  country={country}
                                                                  isTeamLead={isTeamLead(id)}
                                                                  pineappleOnPizza={pineappleOnPizza}
                                                                  handleTeamLead={handleTeamLead}
                                                                  isModerator={isModerator}
                                                                  id={id}
                                                              />
                                                          </div>
                                                      </div>
                                                      <div className="ml-auto -mb-4 -mr-4 mt-2">
                                                          <img
                                                              src={
                                                                  avatar?.data?.attributes?.url ||
                                                                  'https://res.cloudinary.com/dmukukwp6/image/upload/v1698231117/max_6942263bd1.png'
                                                              }
                                                              className="w-[165px]"
                                                          />
                                                      </div>
                                                  </button>
                                                  {isModerator && (
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
                        {isModerator && <AddTeamMember handleChange={(user) => addTeamMember(user.profile.id)} />}
                    </div>

                    {profiles?.data?.length > 0 && (
                        <div className="@container w-full lg:max-w-[420px] shrink-1 basis-sm space-y-4 divide-y divide-border dark:divide-border-dark">
                            <SidebarSection title="Small team FAQ">
                                <p className="font-bold m-0 text-[15px]">Q: Does pineapple belong on pizza?</p>
                                <p className="m-0 mt-2 text-sm">A: {PineappleText(pineapplePercentage)}.</p>
                            </SidebarSection>
                            <div className="grid @xl:grid-cols-2 gap-6 pt-4 divide-y @xl:divide-y-0 divide-border dark:divide-border-dark">
                                <div>
                                    <SidebarSection
                                        title="Total team height as measured in hedgehogs"
                                        tooltip={`The average hedgehog is ${
                                            posthog?.getFeatureFlag?.('are-you-in-the-us')
                                                ? '7 inches'
                                                : '17 centimeters'
                                        } long`}
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
                                    </SidebarSection>
                                </div>
                                {emojis?.length > 0 && (
                                    <div className="pt-6 @xl:pt-0">
                                        <h5 className="m-0 text-base font-normal">
                                            PostHog has created <strong>{totalSlackEmojis}</strong> custom Slack emojis.
                                        </h5>
                                        <p className="text-[15px] mb-4">
                                            Here's some of this small team's best contributions.
                                        </p>
                                        <ul className="list-none m-0 p-0 mt-2 flex flex-wrap gap-2">
                                            {emojis?.map(({ name, localFile }) => (
                                                <li key={name}>
                                                    <Tooltip content={`:${name}:`}>
                                                        <img className="w-8 h-8" src={localFile?.publicURL} />
                                                    </Tooltip>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Section>
            {hasInProgress && (
                <Section title="What we're building" id="in-progress">
                    <div className="lg:flex lg:space-x-12 space-y-8 lg:space-y-0 items-start">
                        <ul className="list-none m-0 p-0 flex flex-col gap-4">
                            {inProgress.map((roadmap) => (
                                <InProgress key={roadmap.squeakId} {...roadmap} />
                            ))}
                        </ul>
                        {(updates.length > 0 || isModerator) && (
                            <div className="lg:max-w-[340px] w-full flex-shrink-0">
                                {isModerator && (
                                    <div className="mb-8 pb-8 border-b border-border dark:border-dark">
                                        <SidebarSection title="Post an update">
                                            <TeamUpdate teamName={name} hideTeamSelect />
                                        </SidebarSection>
                                    </div>
                                )}
                                {updates.length > 0 && (
                                    <SidebarSection title="Latest update">
                                        <Question key={updates[0].question} id={updates[0].question} />
                                    </SidebarSection>
                                )}
                            </div>
                        )}
                    </div>
                </Section>
            )}
            <div id="roadmap">
                {hasUnderConsideration && (
                    <Section title="Roadmap">
                        <p className="-mt-2">
                            Here’s what we’re considering building next. Vote for your favorites or share a new idea on{' '}
                            <Link to="https://github.com/PostHog/posthog">GitHub</Link>.
                        </p>
                        <div className="max-w-2xl">
                            <ul className="list-none m-0 p-0 space-y-4">
                                {underConsideration.map((roadmap) => (
                                    <UnderConsideration key={roadmap.squeakId} {...roadmap} />
                                ))}
                            </ul>
                        </div>
                    </Section>
                )}
                {recentlyShipped && (
                    <Section title="Recently shipped">
                        <div className="max-w-2xl team-page-content">
                            <div className="border border-light dark:border-dark rounded bg-white dark:bg-accent-dark p-6">
                                <Change {...recentlyShipped} />
                            </div>
                        </div>
                    </Section>
                )}
            </div>
            {objectives?.body && (
                <Section title="Goals" id="goals">
                    <div className="article-content max-w-2xl team-page-content">
                        <MDXProvider components={{}}>
                            <MDXRenderer>{objectives?.body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                </Section>
            )}
            {hasBody && (
                <Section title="Handbook" id="handbook">
                    <div className="article-content max-w-2xl team-page-content">
                        <MDXProvider components={{ PrivateLink }}>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                </Section>
            )}
        </Layout>
    )
}

export const query = graphql`
    query TeamTemplateQuery($id: String!, $teamName: String!, $objectives: String) {
        mdx: mdx(id: { eq: $id }) {
            frontmatter {
                title
            }
            body
        }
        team: squeakTeam(name: { eq: $teamName }) {
            name
            description
            emojis {
                name
                localFile {
                    publicURL
                }
            }
            teamImage {
                caption
                gatsbyImageData(width: 380, placeholder: BLURRED)
            }
            crest {
                gatsbyImageData(width: 227, placeholder: BLURRED)
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
        objectives: mdx(fields: { slug: { eq: $objectives } }) {
            body
        }
        allSlackEmoji {
            totalCount
        }
    }
`
