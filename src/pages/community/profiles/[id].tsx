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

const Avatar = (props: { className?: string; src?: string }) => {
    return (
        <div
            className={`overflow-hidden aspect-square rounded-full border border-light dark:border-dark ${props.className}`}
        >
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
    return (
        <section className="article-content">
            {biography && (
                <>
                    <div className="flex items-end space-x-4 border-b border-border dark:border-dark mb-4">
                        {biography && (
                            <Container {...(tabbable ? { onClick: () => setActiveTab('biography') } : null)}>
                                <h3
                                    className={`!m-0 px-2 pb-2 text-[17px] font-semibold border-b-2 relative top-px ${
                                        activeTab === 'biography'
                                            ? readme
                                                ? 'border-red'
                                                : 'border-transparent pl-0'
                                            : 'border-transparent hover:border-light dark:hover:border-dark text-primary/50 hover:text-primary/75 dark:text-primary-dark/50 dark:hover:text-primary-dark/75 transition-opacity'
                                    }`}
                                >
                                    Biography
                                </h3>
                            </Container>
                        )}
                        {readme && (
                            <Container {...(tabbable ? { onClick: () => setActiveTab('readme') } : null)}>
                                <h3
                                    className={`!m-0 px-2 pb-2 text-[17px] font-semibold border-b-2 relative top-px ${
                                        activeTab === 'readme'
                                            ? 'border-red'
                                            : 'border-transparent hover:border-light dark:hover:border-dark text-primary/50 hover:text-primary/75 dark:text-primary-dark/50 dark:hover:text-primary-dark/75 transition-opacity'
                                    }`}
                                >
                                    README
                                </h3>
                            </Container>
                        )}
                    </div>
                    <Markdown>{activeTab === 'biography' ? biography : readme}</Markdown>
                    {activeTab === 'biography' && readme && (
                        <>
                            <button
                                className="text-red dark:text-yellow font-semibold cursor-pointer"
                                onClick={() => setActiveTab('readme')}
                            >
                                See my README for tips on how to work with me
                            </button>
                        </>
                    )}
                </>
            )}
        </section>
    )
}

export default function ProfilePage({ params }: PageProps) {
    const id = parseInt(params.id || params['*'])
    const [view, setView] = useState('discussions')
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

    const { attributes: profile } = data || {}
    const { firstName, lastName } = profile || {}

    const name = [firstName, lastName].filter(Boolean).join(' ')
    const isTeamMember = profile?.teams?.data?.length > 0

    useEffect(() => {
        if (!profile?.amaEnabled) setView('discussions')
    }, [profile])

    if (!profile && isLoading) {
        return null
    } else if (!profile && !isLoading) {
        // if profile wasn't found after loading, show 404 page
        return <NotFoundPage />
    }

    return (
        <>
            <SEO title={`Community Profile - PostHog`} />
            <Layout parent={communityMenu}>
                <PostLayout
                    title="Profile"
                    breadcrumb={[{ name: 'Community', url: '/questions' }]}
                    menu={nav}
                    sidebar={<ProfileSidebar profile={{ ...profile, id }} mutate={mutate} />}
                    hideSurvey
                >
                    {profile ? (
                        <>
                            <div className="space-y-8 my-8">
                                <section className="">
                                    <div className="relative w-48 h-48 float-right -mt-12">
                                        <Avatar
                                            className={`${
                                                profile.color
                                                    ? `bg-${profile.color}`
                                                    : 'bg-gray-accent dark:gray-accent-dark'
                                            }`}
                                            src={getAvatarURL(profile)}
                                        />
                                        {isTeamMember && (
                                            <span className="absolute right-1 bottom-1 h-12 w-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-accent-dark text-primary dark:text-primary-dark border border-light dark:border-dark">
                                                <Logomark className="w-8" />
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-1 mb-8">
                                        <div className="flex gap-x-2 items-baseline">
                                            <h1 className="m-0 text-5xl">{name || 'Anonymous'}</h1>
                                            {profile.pronouns && (
                                                <div className="opacity-50 text-sm">{profile.pronouns}</div>
                                            )}
                                        </div>
                                        {isTeamMember && profile.companyRole && (
                                            <p className="text-primary/50 dark:text-primary-dark/50">
                                                {profile?.companyRole}, PostHog
                                            </p>
                                        )}
                                    </div>
                                    {(profile?.biography || profile?.readme) && (
                                        <Bio biography={profile.biography} readme={profile.readme} />
                                    )}
                                </section>
                            </div>

                            <div className="mt-12">
                                <div className="flex items-center relative mb-4 font-semibold border-b border-border dark:border-dark text-base whitespace-nowrap">
                                    <button
                                        className={`px-3 pb-2 text-base font-semibold border-b-2 relative top-px ${
                                            view !== 'discussions'
                                                ? 'border-transparent hover:border-light dark:hover:border-dark text-primary/50 hover:text-primary/75 dark:text-primary-dark/50 dark:hover:text-primary-dark/75 transition-opacity'
                                                : 'border-red'
                                        } p-4 transition-opacity`}
                                        onClick={() => setView('discussions')}
                                    >
                                        Discussions
                                    </button>
                                    {profile?.amaEnabled && (
                                        <button
                                            className={`px-3 pb-2 text-base font-semibold border-b-2 relative top-px ${
                                                view !== 'ama'
                                                    ? 'border-transparent hover:border-light dark:hover:border-dark text-primary/50 hover:text-primary/75 dark:text-primary-dark/50 dark:hover:text-primary-dark/75 transition-opacity'
                                                    : 'border-red'
                                            } p-4 transition-opacity`}
                                            onClick={() => setView('ama')}
                                        >
                                            Ask me anything
                                        </button>
                                    )}
                                    {user?.profile?.id === id && (
                                        <button
                                            className={`px-3 pb-2 text-base font-semibold border-b-2 relative top-px ${
                                                view !== 'liked-posts'
                                                    ? 'border-transparent hover:border-light dark:hover:border-dark text-primary/50 hover:text-primary/75 dark:text-primary-dark/50 dark:hover:text-primary-dark/75 transition-opacity'
                                                    : 'border-red'
                                            } p-4 transition-opacity`}
                                            onClick={() => setView('liked-posts')}
                                        >
                                            Upvoted posts
                                        </button>
                                    )}
                                    <div className="flex items-center">
                                        <button
                                            className={`px-3 pb-2 text-base font-semibold border-b-2 relative top-px ${
                                                view !== 'user-posts'
                                                    ? 'border-transparent hover:border-light dark:hover:border-dark text-primary/50 hover:text-primary/75 dark:text-primary-dark/50 dark:hover:text-primary-dark/75 transition-opacity'
                                                    : 'border-red pr-12'
                                            } p-4 transition-opacity`}
                                            onClick={() => setView('user-posts')}
                                        >
                                            Posts
                                        </button>
                                        <AnimatePresence>
                                            {view === 'user-posts' && (
                                                <motion.div
                                                    initial={{ opacity: 0, translateY: '100%' }}
                                                    animate={{ opacity: 1, translateY: 0 }}
                                                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                                    className={`relative -left-12 top-1 z-[50]`}
                                                >
                                                    <SortDropdown
                                                        sort={sort}
                                                        setSort={setSort}
                                                        className="hover:!border-transparent hover:!bg-transparent"
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                {(view === 'discussions' || view === 'ama') && (
                                    <Questions
                                        initialView={view === 'ama' ? 'question-form' : undefined}
                                        slug={view === 'ama' ? window?.location?.pathname : undefined}
                                        profileId={view === 'discussions' ? id : undefined}
                                        showForm={view === 'ama'}
                                        disclaimer={false}
                                    />
                                )}
                                {view === 'liked-posts' && user?.profile?.id === id && <LikedPosts profileID={id} />}
                                {view === 'user-posts' && (
                                    <ul className="list-none m-0 p-0">
                                        <PostsTable {...posts} />
                                    </ul>
                                )}
                            </div>
                        </>
                    ) : null}
                </PostLayout>
            </Layout>
        </>
    )
}

type ProfileSidebarProps = {
    profile: ProfileData
    mutate: () => void
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
                <div className="max-w-[250px] text-left px-2 rounded-sm overflow-hidden border border-border dark:border-dark bg-light dark:bg-dark">
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

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ profile, mutate }) => {
    const { user, getJwt } = useUser()

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

    return (
        profile && (
            <>
                {profile.github || profile.twitter || profile.linkedin || profile.website ? (
                    <SidebarSection title="Links">
                        <ul className="p-0 flex space-x-2 items-center list-none m-0">
                            {profile.website && (
                                <li>
                                    <Link to={profile.website} externalNoIcon>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 text-black dark:text-white opacity-60 hover:opacity-100 transition-hover"
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

                            {profile.github && (
                                <li>
                                    <Link to={profile.github} externalNoIcon>
                                        <GitHub className="w-6 h-6 text-black dark:text-white opacity-60 hover:opacity-100 transition-hover" />
                                    </Link>
                                </li>
                            )}

                            {profile.twitter && (
                                <li>
                                    <Link to={profile.twitter} externalNoIcon>
                                        <Twitter className="w-5 h-5 text-black dark:text-white opacity-60 hover:opacity-100 transition-hover" />
                                    </Link>
                                </li>
                            )}

                            {profile.linkedin && (
                                <li>
                                    <Link to={profile.linkedin} externalNoIcon>
                                        <LinkedIn className="w-5 h-5 text-black dark:text-white opacity-60 hover:opacity-100 transition-hover" />
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </SidebarSection>
                ) : null}

                {profile.achievements?.length > 0 && (
                    <SidebarSection title="Achievements">
                        <ul className="list-none m-0 p-0 grid grid-cols-5 gap-2">
                            {profile.achievements
                                .sort((a, b) => a.id - b.id)
                                .map(({ achievement, hidden, id }) => {
                                    return (
                                        <li key={id}>
                                            <Achievement
                                                {...achievement.data.attributes}
                                                id={id}
                                                hidden={hidden}
                                                profile={profile}
                                                mutate={mutate}
                                            />
                                        </li>
                                    )
                                })}
                        </ul>
                    </SidebarSection>
                )}

                {profile.teams
                    ? profile.teams?.data?.map(({ attributes: { name, profiles } }) => {
                          return (
                              <>
                                  <SidebarSection title="Team">
                                      <span className="text-xl font-bold">{name}</span>
                                  </SidebarSection>

                                  {profiles?.data?.length > 0 ? (
                                      <SidebarSection title="Teammates">
                                          <ul className="p-0 grid gap-y-2">
                                              {profiles.data
                                                  .filter(({ id }) => id !== profile.id)
                                                  .map((profile) => {
                                                      return (
                                                          <li key={profile.id} className="flex items-center space-x-2">
                                                              <Avatar
                                                                  className={`w-8 h-8 bg-${
                                                                      profile.attributes.color ?? 'white'
                                                                  }`}
                                                                  src={getAvatarURL(profile)}
                                                              />
                                                              <a href={`/community/profiles/${profile.id}`}>
                                                                  {profile.attributes?.firstName}{' '}
                                                                  {profile.attributes?.lastName}
                                                              </a>
                                                          </li>
                                                      )
                                                  })}
                                          </ul>
                                      </SidebarSection>
                                  ) : null}
                              </>
                          )
                      })
                    : null}

                {(user?.profile?.id === profile.id || (user?.role?.type === 'moderator' && user?.webmaster)) && (
                    <SidebarSection>
                        <Link
                            to="/community/profile/edit"
                            className="text-base text-red dark:text-yellow font-semibold"
                            state={{ profileID: profile.id }}
                        >
                            Edit profile
                        </Link>
                    </SidebarSection>
                )}
                {user?.role?.type === 'moderator' && (
                    <>
                        <SidebarSection>
                            <Link
                                external
                                to={`${process.env.GATSBY_SQUEAK_API_HOST}/admin/content-manager/collection-types/plugin::users-permissions.user/${profile.user?.data.id}`}
                                className="text-base text-red dark:text-yellow font-semibold"
                            >
                                View in Strapi
                            </Link>
                        </SidebarSection>
                        <SidebarSection>
                            <button
                                onClick={() => handleBlock(!profile.user?.data.attributes.blocked)}
                                className="text-red font-bold text-base"
                            >
                                {profile.user?.data.attributes.blocked ? 'Unblock user' : 'Block user'}
                            </button>
                        </SidebarSection>
                    </>
                )}
            </>
        )
    )
}
