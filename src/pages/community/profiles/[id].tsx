import React, { useEffect, useState } from 'react'
import { PageProps } from 'gatsby'
import SEO from 'components/seo'
import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import { GitHub, LinkedIn, Twitter } from 'components/Icons'
import Link from 'components/Link'
import Markdown from 'markdown-to-jsx'
import { Questions } from 'components/Squeak'
import { useUser } from 'hooks/useUser'
import Modal from 'components/Modal'
import { EditProfile } from 'components/Squeak'
import useSWR from 'swr'
import SidebarSection from 'components/PostLayout/SidebarSection'
import { ProfileData, StrapiRecord } from 'lib/strapi'
import getAvatarURL from '../../../components/Squeak/util/getAvatar'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { RightArrow } from '../../../components/Icons/Icons'
import qs from 'qs'
import usePostHog from 'hooks/usePostHog'
import Logomark from 'components/Home/images/Logomark'
import { communityMenu } from '../../../navs'
import useTopicsNav from '../../../navs/useTopicsNav'
import { usePosts } from 'components/Edition/hooks/usePosts'
import PostsTable from 'components/Edition/PostsTable'
import { SortDropdown } from 'components/Edition/Views/Default'
import { sortOptions } from 'components/Edition/Posts'
import { AnimatePresence, motion } from 'framer-motion'
import Tooltip from 'components/Tooltip'
import NotFoundPage from 'components/NotFoundPage'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Flag from 'react-country-flag'
import CloudinaryImage from 'components/CloudinaryImage'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { formatDistanceToNow } from 'date-fns'
import OSTabs from 'components/OSTabs'
import { TeamMemberCard } from 'components/Team'
import { IconThumbsUpFilled, IconThumbsDownFilled } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
dayjs.extend(relativeTime)

const Avatar = (props: { className?: string; src?: string; color?: string }) => {
    return (
        <div className={`overflow-hidden aspect-square bg-${props.color} ${props.className}`}>
            {props.src ? (
                <img className="w-full object-fill" alt="" src={props.src} />
            ) : (
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.0782 41.0392H5.42978C4.03134 41.0392 3.1173 40.1642 3.09386 38.7736C3.07823 37.7814 3.07042 36.797 3.10948 35.8048C3.15636 34.6329 3.72668 33.7345 4.74228 33.1798C8.0782 31.3595 11.4299 29.5783 14.7659 27.7658C15.0081 27.633 15.1565 27.758 15.3362 27.8517C18.1878 29.3439 21.0942 29.4689 24.0626 28.2267C24.1485 28.1955 24.2423 28.1721 24.3126 28.1096C24.9298 27.5861 25.4845 27.7971 26.1251 28.1486C29.1173 29.7971 32.1331 31.4143 35.1487 33.0238C36.4534 33.7191 37.094 34.766 37.0706 36.2426C37.0549 37.0785 37.0706 37.9067 37.0706 38.7426C37.0628 40.1254 36.1409 41.0395 34.7659 41.0395H20.0783L20.0782 41.0392Z"
                        fill="#BFBFBC"
                    />
                    <path
                        d="M19.8359 27.0625C17.0859 26.9687 14.8047 25.6094 13.1251 23.1953C10.3751 19.2344 10.7032 13.6093 13.8516 10.0001C17.2735 6.08599 22.9452 6.10943 26.336 10.0469C29.9376 14.2345 29.711 20.8437 25.8126 24.6405C24.2188 26.1952 22.3126 27.0312 19.8362 27.0624L19.8359 27.0625Z"
                        fill="#BFBFBC"
                    />
                </svg>
            )}
        </div>
    )
}

const LikedPosts = ({ profileID }) => {
    const posts = usePosts({
        params: {
            filters: {
                likes: {
                    id: {
                        $eq: profileID,
                    },
                },
            },
        },
    })

    return (
        <ul className="list-none m-0 p-0">
            <PostsTable {...posts} />
        </ul>
    )
}

const Bio = ({ biography, readme }) => {
    const [activeTab, setActiveTab] = useState('biography')
    const tabbable = biography && readme
    const Container = tabbable ? 'button' : 'span'

    const tabs = [
        {
            value: 'biography',
            label: 'Biography',
            content: <Markdown>{biography}</Markdown>,
        },
        {
            value: 'readme',
            label: 'README',
            content: <Markdown>{readme}</Markdown>,
        },
    ]

    return (
        <section className="article-content">
            <OSTabs tabs={tabs} defaultValue={tabs[0].value} />
        </section>
    )
}

const Block = ({ title, children, url }) => {
    const Container = url ? Link : 'div'
    return (
        <div className="border border-primary rounded-md p-4 mb-6 bg-primary">
            <Container {...(url ? { to: url, className: 'text-red' } : {})}>
                <h3 className="text-lg font-bold text-inherit border-b border-primary pb-2 leading-tight m-0 mb-4">
                    {title}
                </h3>
            </Container>
            <div>{children}</div>
        </div>
    )
}

const ProfileTabs = ({ profile, firstName, id, sort, setSort, posts }) => {
    const { user } = useUser()

    const tabs = [
        {
            value: 'bio',
            label: 'Bio',
            content: <Markdown>{profile.biography || `${firstName} hasn't written a bio yet`}</Markdown>,
        },
        ...(profile.readme
            ? [
                  {
                      value: 'readme',
                      label: 'README',
                      content: <Markdown>{profile.readme}</Markdown>,
                  },
              ]
            : []),
        ...(posts.length > 0
            ? [
                  {
                      value: 'discussions',
                      label: 'Blog Posts',
                      content: (
                          <>
                              <div className="flex justify-between items-center mb-4">
                                  <h4 className="text-lg font-bold m-0">Blog Posts</h4>
                                  <SortDropdown value={sort} onChange={setSort} options={sortOptions} />
                              </div>
                              <PostsTable {...posts} />
                          </>
                      ),
                  },
              ]
            : []),
        ...(profile.amaEnabled
            ? [
                  {
                      value: 'ama',
                      label: 'Ask me anything',
                      content: (
                          <>
                              <h4 className="text-lg font-bold mb-4">Ask {firstName} anything</h4>
                              <Questions
                                  initialView={'question-form'}
                                  slug={window?.location?.pathname}
                                  profileId={undefined}
                                  showForm
                                  disclaimer={false}
                              />
                          </>
                      ),
                  },
              ]
            : []),
        ...(user?.profile?.id === id
            ? [
                  {
                      value: 'likes',
                      label: 'Liked posts',
                      content: (
                          <>
                              <h4 className="text-lg font-bold mb-4">Your liked posts</h4>
                              <LikedPosts profileID={id} />
                          </>
                      ),
                  },
              ]
            : []),
    ]

    return <OSTabs tabs={tabs} defaultValue={tabs[0].value} className="h-auto" />
}

export default function ProfilePage({ params }: PageProps) {
    const id = parseInt(params.id || params['*'])
    const posthog = usePostHog()
    const nav = useTopicsNav()
    const { user, getJwt } = useUser()
    const [sort, setSort] = useState(sortOptions[0].label)
    const posts = usePosts({
        params: {
            sort: sortOptions.find((option) => option.label === sort)?.sort,
            filters: {
                authors: {
                    id: {
                        $eq: id,
                    },
                },
            },
        },
    })
    const isCurrentUser = user?.profile?.id === id
    const isModerator = user?.role?.type === 'moderator'

    const profileQuery = qs.stringify(
        {
            populate: {
                avatar: true,
                role: {
                    select: ['type'],
                },
                achievements: {
                    ...(!isCurrentUser
                        ? {
                              filters: {
                                  hidden: {
                                      $ne: true,
                                  },
                              },
                          }
                        : null),
                    populate: {
                        achievement: {
                            populate: {
                                image: true,
                                icon: true,
                            },
                        },
                    },
                },
                teams: {
                    populate: {
                        leadProfiles: true,
                        profiles: {
                            populate: ['avatar', 'teams', 'pronouns'],
                        },
                    },
                },
                ...(isModerator
                    ? {
                          user: true,
                      }
                    : null),
            },
        },
        {
            encodeValuesOnly: true,
        }
    )

    const { data, error, isLoading, mutate } = useSWR<StrapiRecord<ProfileData>>(
        `${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${id}?${profileQuery}`,
        async (url) => {
            const jwt = user && (await getJwt())
            const res = await fetch(
                url,
                jwt
                    ? {
                          headers: {
                              Authorization: `Bearer ${jwt}`,
                          },
                      }
                    : undefined
            )
            const { data } = await res.json()
            return data
        }
    )

    if (error) {
        posthog?.capture('squeak error', {
            source: 'ProfilePage',
            error: JSON.stringify(error),
        })
    }

    const handleBlock = async (blockUser: boolean) => {
        if (blockUser) {
            if (confirm('Are you sure you want to block this user and remove all of their posts and replies?')) {
                try {
                    const jwt = await getJwt()
                    await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profile/block/${profile.id}`, {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    })
                } catch (err) {
                    console.error(err)
                }
            } else {
                return
            }
        } else {
            try {
                const jwt = await getJwt()
                await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profile/unblock/${profile.id}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                })
            } catch (err) {
                console.error(err)
            }
        }
        window.location.reload()
    }

    const { attributes: profile } = data || {}
    const { firstName, lastName } = profile || {}

    const name = [firstName, lastName].filter(Boolean).join(' ')
    const isTeamMember = profile?.teams?.data?.length > 0
    const team = profile?.teams?.data[0]

    if (!profile && isLoading) {
        return null
    } else if (!profile && !isLoading) {
        // if profile wasn't found after loading, show 404 page
        return <NotFoundPage />
    }

    return (
        <>
            <SEO title={`${name}'s profile - PostHog`} />
            <ScrollArea>
                <div data-scheme="secondary" className="bg-primary">
                    <div data-scheme="primary" className="mx-auto max-w-screen-xl px-5 ">
                        <div className="flex flex-col md:flex-row gap-6 p-6">
                            <div className="max-w-xs flex-shrink-0">
                                <div className="flex flex-col items-center mb-6 bg-primary rounded-md overflow-hidden border border-primary">
                                    <Avatar
                                        className="w-full border-b border-primary"
                                        src={profile.avatar?.data?.attributes?.url}
                                        color={profile.color}
                                    />
                                    <div className="flex items-center space-x-2 mt-2">
                                        <h2 className="text-xl font-bold text-primary m-0">{name}</h2>
                                        {profile.country && (
                                            <Flag
                                                style={{ width: '1.5rem', height: '1.5rem' }}
                                                countryCode={profile.country}
                                                svg
                                            />
                                        )}
                                    </div>
                                    {profile.companyRole && (
                                        <p className="text-secondary text-base m-0 mb-2">{profile.companyRole}</p>
                                    )}
                                </div>

                                {(profile.pineappleOnPizza !== null || profile.pronouns || profile.location) && (
                                    <Block title="Details">
                                        <div className="text-sm space-y-1">
                                            <p className="flex justify-between m-0">
                                                {isTeamMember ? (
                                                    <>
                                                        <span className="font-semibold">Joined PostHog</span>
                                                        <span>{dayjs(profile.startDate).fromNow()}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="font-semibold">Community member since</span>
                                                        <span>{dayjs(profile.createdAt).format('MMMM D, YYYY')}</span>
                                                    </>
                                                )}
                                            </p>
                                            {profile.pineappleOnPizza !== null && (
                                                <p className="flex justify-between m-0">
                                                    <span className="font-semibold">Pineapple on pizza:</span>
                                                    <span>
                                                        {profile.pineappleOnPizza ? (
                                                            <IconThumbsUpFilled className="size-4 text-green" />
                                                        ) : (
                                                            <IconThumbsDownFilled className="size-4 text-red" />
                                                        )}
                                                    </span>
                                                </p>
                                            )}
                                            {profile.pronouns && (
                                                <p className="flex justify-between m-0">
                                                    <span className="font-semibold">Pronouns:</span>
                                                    <span>{profile.pronouns}</span>
                                                </p>
                                            )}
                                            {profile.location && (
                                                <p className="flex justify-between m-0">
                                                    <span className="font-semibold">Location:</span>
                                                    <span>{profile.location}</span>
                                                </p>
                                            )}
                                        </div>
                                    </Block>
                                )}

                                {(profile.github || profile.twitter || profile.linkedin || profile.website) && (
                                    <Block title="Links">
                                        <ul className="flex space-x-3 m-0 p-0 list-none">
                                            {profile.github && (
                                                <li>
                                                    <Link to={profile.github} externalNoIcon>
                                                        <GitHub className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
                                                    </Link>
                                                </li>
                                            )}
                                            {profile.twitter && (
                                                <li>
                                                    <Link to={profile.twitter} externalNoIcon>
                                                        <Twitter className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
                                                    </Link>
                                                </li>
                                            )}
                                            {profile.linkedin && (
                                                <li>
                                                    <Link to={profile.linkedin} externalNoIcon>
                                                        <LinkedIn className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
                                                    </Link>
                                                </li>
                                            )}
                                            {profile.website && (
                                                <li>
                                                    <Link to={profile.website} externalNoIcon>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                                                            />
                                                        </svg>
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    </Block>
                                )}

                                {profile.achievements?.length > 0 && (
                                    <Block title="Achievements">
                                        <ul className="grid grid-cols-7 gap-2 m-0 p-0 list-none">
                                            {profile.achievements.map(({ achievement, hidden, id }) => (
                                                <li key={id} className="flex justify-center">
                                                    <Achievement
                                                        {...achievement.data.attributes}
                                                        id={id}
                                                        hidden={hidden}
                                                        profile={profile}
                                                        mutate={mutate}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </Block>
                                )}
                                {(isCurrentUser || isModerator) && (
                                    <Block title="Profile Settings">
                                        <div className="flex flex-col space-y-2">
                                            {(user?.profile?.id === profile.id ||
                                                (user?.role?.type === 'moderator' && user?.webmaster)) && (
                                                <CallToAction
                                                    size="sm"
                                                    to="/community/profile/edit"
                                                    type="secondary"
                                                    state={{ profileID: profile.id }}
                                                >
                                                    Edit Profile
                                                </CallToAction>
                                            )}
                                            {user?.role?.type === 'moderator' && (
                                                <>
                                                    <CallToAction
                                                        to={`${process.env.GATSBY_SQUEAK_API_HOST}/admin/content-manager/collection-types/plugin::users-permissions.user/${profile.user?.data.id}`}
                                                        size="sm"
                                                        type="secondary"
                                                    >
                                                        View in Strapi
                                                    </CallToAction>
                                                    <CallToAction
                                                        size="sm"
                                                        type="primary"
                                                        onClick={() =>
                                                            handleBlock(!profile.user?.data.attributes.blocked)
                                                        }
                                                    >
                                                        {profile.user?.data.attributes.blocked
                                                            ? 'Unblock User'
                                                            : 'Block User'}
                                                    </CallToAction>
                                                </>
                                            )}
                                        </div>
                                    </Block>
                                )}
                            </div>

                            <div className="flex-grow">
                                <ProfileTabs
                                    profile={profile}
                                    firstName={firstName}
                                    id={id}
                                    sort={sort}
                                    setSort={setSort}
                                    posts={posts}
                                />
                                <div className="mt-6">
                                    {profile.teams?.data?.length > 0 &&
                                        profile.teams.data[0].attributes.profiles?.data?.length > 0 && (
                                            <div className="border border-primary rounded-md p-4 mb-6 bg-primary">
                                                <div className="flex justify-between items-center border-b border-primary mb-4 pb-2">
                                                    <h3 className="text-lg font-bold text-inherit leading-tight m-0">
                                                        {team.attributes.name} team
                                                    </h3>
                                                    <Link
                                                        to={`/teams/${team.attributes.slug}`}
                                                        className="text-sm text-red dark:text-yellow font-semibold"
                                                    >
                                                        View team
                                                    </Link>
                                                </div>
                                                <div className="grid grid-cols-4 gap-3">
                                                    {team.attributes.profiles.data
                                                        .filter((teammate) => teammate.id !== data?.id)
                                                        .map((teammate) => {
                                                            return (
                                                                <Link
                                                                    key={teammate.id}
                                                                    to={`/community/profiles/${teammate.id}`}
                                                                >
                                                                    <TeamMemberCard
                                                                        name={teammate.attributes.firstName}
                                                                        companyRole={teammate.attributes.companyRole}
                                                                        country={teammate.attributes.country}
                                                                        location={teammate.attributes.location}
                                                                        isTeamLead={team.attributes?.leadProfiles?.data?.some(
                                                                            ({ id: leadID }) => leadID === teammate.id
                                                                        )}
                                                                        pineappleOnPizza={
                                                                            teammate.attributes.pineappleOnPizza
                                                                        }
                                                                        avatar={teammate.attributes.avatar}
                                                                        id={teammate.id}
                                                                    />
                                                                </Link>
                                                            )
                                                        })}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </>
    )
}

const Achievement = ({ title, description, image, icon, id, mutate, profile, ...other }) => {
    const { user, getJwt } = useUser()
    const [hidden, setHidden] = useState(other.hidden)
    const [opacity, setOpacity] = useState(hidden ? 0.6 : 1)
    const isCurrentUser = user?.profile?.id === profile.id
    const handleClick = async (hidden: boolean) => {
        if (isCurrentUser) {
            setHidden(hidden)
            try {
                const jwt = await getJwt()
                const body = {
                    data: {
                        achievements: [
                            ...profile.achievements
                                .filter((achievement) => achievement.id !== id)
                                .map(({ id, hidden }) => ({ id, hidden })),
                            {
                                id,
                                hidden,
                            },
                        ],
                    },
                }
                await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${user.profile.id}?populate=avatar`, {
                    method: 'PUT',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                })
                await mutate()
            } catch (err) {
                console.error(err)
            }
        }
    }

    useEffect(() => {
        setOpacity(hidden ? 0.6 : 1)
    }, [hidden])

    const ImageContainer = isCurrentUser ? 'button' : 'span'

    return (
        <Tooltip
            contentContainerClassName="!border-none !p-0 !bg-transparent"
            tooltipClassName="!rounded-none"
            placement="bottom-start"
            content={() => (
                <div className="max-w-[250px] text-left px-2 rounded-sm overflow-hidden border border-primary bg-light dark:bg-dark">
                    <div className="mb-4 -mx-4 -mt-2">
                        <img src={image?.data?.attributes?.url} />
                    </div>
                    <h4 className="text-lg m-0">{title}</h4>
                    <p className="m-0 mt-1 text-sm mb-2">{description}</p>
                </div>
            )}
        >
            <ImageContainer
                onClick={isCurrentUser ? () => handleClick(!hidden) : undefined}
                onMouseEnter={isCurrentUser ? () => setOpacity(0.8) : undefined}
                onMouseOut={isCurrentUser ? () => setOpacity(hidden ? 0.6 : 1) : undefined}
                style={{ opacity }}
                className={`relative transition-opacity`}
            >
                <img className="w-full" src={icon?.data?.attributes?.url} />
            </ImageContainer>
        </Tooltip>
    )
}
