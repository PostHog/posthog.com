import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'components/Link'
import { usePosts } from './hooks/usePosts'
import { useUser } from 'hooks/useUser'
import { Login } from 'components/Community/Sidebar'
import Layout from 'components/Layout'
import Modal from 'components/Modal'
import { IconChat } from '@posthog/icons'
import SidebarSection from 'components/PostLayout/SidebarSection'
import { useQuestions } from 'hooks/useQuestions'
import { QuestionData, StrapiResult } from 'lib/strapi'
import { useLocation } from '@reach/router'
import { communityMenu, companyMenu } from '../../navs'
import NewPost from './NewPost'
import { PostProvider } from 'components/PostLayout/context'
import { IMenu } from 'components/PostLayout/types'
import MobileNav from 'components/PostLayout/MobileNav'
import Default from './Views/Default'
import Blog from './Views/Blog'
import Newsletter from './Views/Newsletter'
import Customers from './Views/Customers'
import { useLayoutData } from 'components/Layout/hooks'
import qs from 'qs'
import { RightArrow } from 'components/Icons'
import { navigate } from 'gatsby'
import { postsMenu as menu } from '../../navs/posts'
import { Authentication } from 'components/Squeak'
import { PostFilters } from './Views/Default'
import { CallToAction, child, container } from 'components/CallToAction'

dayjs.extend(relativeTime)

const Questions = ({ questions }: { questions: Omit<StrapiResult<QuestionData[]>, 'meta'> }) => {
    return (
        <ul className="list-none m-0 p-0">
            {questions.data.map((question) => {
                const {
                    id,
                    attributes: { subject, topics, numReplies, activeAt, permalink },
                } = question
                return (
                    <li className="text-yellow mt-4 first:mt-0" key={id}>
                        <Link
                            to={`/questions/${permalink}`}
                            className="dark:text-yellow dark:hover:text-yellow text-red hover:text-red"
                        >
                            <span className="flex justify-between items-center">
                                <span className="text-[15px] line-clamp-2 text-ellipsis leading-tight">{subject}</span>
                                <span className="flex-shrink-0 text-black dark:text-white text-xs flex space-x-1 items-center opacity-70">
                                    <span className="w-4">
                                        <IconChat />
                                    </span>
                                    <span>{numReplies}</span>
                                </span>
                            </span>
                            <span className="flex justify-between items-center">
                                <span className="text-sm overflow-hidden text-ellipsis whitespace-nowrap text-black dark:text-white opacity-70">
                                    {topics?.data[0].attributes.label}
                                </span>
                                <span className="flex-shrink-0 text-black dark:text-white text-xs flex space-x-1 items-center opacity-70">
                                    <span>{dayjs(activeAt).fromNow()}</span>
                                </span>
                            </span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export const Sidebar = () => {
    const { user, logout, isModerator } = useUser()
    const { questions: subscribedQuestions } = useQuestions({
        limit: 5,
        sortBy: 'activity',
        filters: {
            resolved: {
                $ne: true,
            },
            profileSubscribers: {
                id: {
                    $eq: user?.profile?.id,
                },
            },
        },
    })

    const { questions: newestQuestions } = useQuestions({
        limit: 5,
        sortBy: 'newest',
        filters: {
            subject: {
                $ne: '',
            },
            slugs: {
                slug: {
                    $notContainsi: '/community/profiles',
                },
            },
        },
    })
    const { setNewPostModalOpen, newPostModalOpen, setLoginModalOpen, articleView } = useContext(PostsContext)
    const name = [user?.profile.firstName, user?.profile.lastName].filter(Boolean).join(' ')

    return (
        <>
            <div className="lg:hidden my-4">
                <h5 className="my-4">Community account</h5>
                {user ? (
                    <>
                        <p className="text-sm m-0 p-0">
                            Signed in as{' '}
                            <Link
                                className="dark:text-yellow dark:hover:text-yellow text-red hover:text-red"
                                to={`/community/profiles/${user?.profile.id}`}
                            >
                                {name}
                            </Link>
                        </p>
                        <span>
                            {isModerator && (
                                <button
                                    className="text-sm pr-2 mr-2 border-r border-border dark:border-dark dark:text-yellow text-red font-semibold"
                                    onClick={() => setNewPostModalOpen(!newPostModalOpen)}
                                >
                                    New post
                                </button>
                            )}
                            <button
                                className="text-sm dark:text-yellow text-red font-semibold"
                                onClick={() => logout()}
                            >
                                Logout
                            </button>
                        </span>
                    </>
                ) : (
                    <>
                        <CallToAction
                            type="secondary"
                            size="xs"
                            className="lg:w-auto w-full"
                            onClick={() => setLoginModalOpen(true)}
                        >
                            Sign in
                        </CallToAction>
                    </>
                )}
            </div>
            <div>
                <h5 className="my-4">Discussions</h5>
                {user && (
                    <SidebarSection title="Subscribed threads">
                        <Questions questions={subscribedQuestions} />
                    </SidebarSection>
                )}
                <SidebarSection title="Latest community questions">
                    <Questions questions={newestQuestions} />
                </SidebarSection>
            </div>
        </>
    )
}

export const PostsContext = createContext({})

export const PostContext = createContext({})

const menusByRoot = {
    tutorials: { parent: communityMenu, activeInternalMenu: communityMenu.children[2] },
    blog: { parent: companyMenu, activeInternalMenu: companyMenu.children[5] },
    newsletter: { parent: communityMenu, activeInternalMenu: communityMenu.children[4] },
}

const Router = ({ children, prev }: { children: React.ReactNode; prev: string | null }) => {
    const { fullWidthContent } = useLayoutData()
    const { pathname } = useLocation()
    const [postID, setPostID] = useState()

    useEffect(() => {
        fetch(
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/posts?${qs.stringify(
                {
                    fields: ['id'],
                    filters: {
                        slug: {
                            $eq: pathname,
                        },
                    },
                },
                { encodeValuesOnly: true }
            )}`
        )
            .then((res) => res.json())
            .then((posts) => {
                if (posts?.data?.length > 0) {
                    setPostID(posts.data[0].id)
                }
            })
    }, [pathname])

    return (
        <PostContext.Provider
            value={{
                postID,
            }}
        >
            <div
                className={`px-4 md:px-0 2xl:px-5 md:mt-0 mb-12 md:mb-0 mx-auto transition-all ${
                    fullWidthContent ? 'max-w-full -mx-5' : 'max-w-screen-3xl box-content'
                }`}
            >
                {prev ? (
                    <Default>{children}</Default>
                ) : (
                    {
                        '/product-engineers': <Blog title="Product engineers" />,
                        '/features': <Blog title="Features" />,
                        '/founders': <Blog title="Founders" />,
                        '/blog': <Blog />,
                        '/newsletter': <Newsletter />,
                        '/spotlight': <Blog title="Spotlight" />,
                        '/customers': <Customers />,
                    }[pathname] || <Default>{children}</Default>
                )}
            </div>
        </PostContext.Provider>
    )
}

export const getParams = (root, tag) => {
    return {
        filters: {
            $and: [
                ...(root
                    ? [
                          {
                              $or: [
                                  {
                                      post_category: {
                                          folder: {
                                              $eq: root,
                                          },
                                      },
                                  },
                                  {
                                      crosspost_categories: {
                                          folder: {
                                              $eq: root,
                                          },
                                      },
                                  },
                              ],
                          },
                      ]
                    : []),
                ...(tag
                    ? [
                          {
                              post_tags: {
                                  label: {
                                      $in: [tag],
                                  },
                              },
                          },
                      ]
                    : []),
            ],
        },
    }
}

export default function Posts({
    children,
    pageContext: { selectedTag: initialTag, title, article: articleView = true },
}) {
    const didMount = useRef(false)
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const { pathname } = useLocation()
    const [newPostModalOpen, setNewPostModalOpen] = useState(false)
    const [root, setRoot] = useState(pathname.split('/')[1] !== 'posts' ? pathname.split('/')[1] : undefined)
    const [tag, setTag] = useState(initialTag)
    const [prev, setPrev] = useState<string | null>(null)
    const [activeMenu, setActiveMenu] = useState(menu.find(({ url }) => url?.split('/')[1] === pathname.split('/')[1]))
    const [layoutMenu, setLayoutMenu] = useState(
        menusByRoot[root] || { parent: communityMenu, activeInternalMenu: communityMenu.children[0] }
    )

    const [params, setParams] = useState(getParams(root, initialTag))

    const { posts, isLoading, isValidating, fetchMore, mutate, hasMore } = usePosts({ params })

    const handleNewPostSubmit = () => {
        setNewPostModalOpen(false)
    }

    useEffect(() => {
        if (didMount.current) {
            setPrev(pathname)
        } else {
            didMount.current = true
        }
        if (pathname === '/posts') {
            setRoot(undefined)
            setTag(undefined)
        }
        if (articleView || pathname === '/posts') {
            setLayoutMenu(menusByRoot[root] || { parent: communityMenu, activeInternalMenu: communityMenu.children[0] })
        }
    }, [pathname])

    useEffect(() => {
        setParams(getParams(root, tag))
    }, [root, tag])

    return (
        <Layout parent={layoutMenu.parent} activeInternalMenu={layoutMenu.activeInternalMenu}>
            <PostsContext.Provider
                value={{
                    mutate,
                    posts,
                    isLoading,
                    isValidating,
                    fetchMore,
                    setNewPostModalOpen,
                    newPostModalOpen,
                    setLoginModalOpen,
                    loginModalOpen,
                    articleView,
                    hasMore,
                    setTag,
                    setRoot,
                    tag,
                    activeMenu,
                    setActiveMenu,
                }}
            >
                <PostProvider
                    value={{
                        title: title || 'Posts',
                        menu: menu.map((menuItem) => ({
                            ...menuItem,
                            handleLinkClick: ({ name, url: activeURL, topLevel }) => {
                                if (topLevel) {
                                    setRoot(activeURL === '/posts' ? undefined : activeURL?.split('/')[1])
                                    setTag(undefined)
                                    setActiveMenu(menu.find(({ url }) => url === activeURL))
                                } else {
                                    setTag(name)
                                }
                            },
                            children: undefined,
                        })),
                        isMenuItemActive: ({ url }) => url === pathname,
                        isMenuItemOpen: ({ url }) => url?.startsWith(`/${pathname.split('/')[1]}`),
                    }}
                >
                    <Modal open={loginModalOpen} setOpen={setLoginModalOpen}>
                        <div className="px-4">
                            <div className="p-4 max-w-[450px] mx-auto relative rounded-md dark:bg-dark bg-light mt-12 border border-border dark:border-dark">
                                <p className="m-0 text-sm font-bold dark:text-white">
                                    Note: PostHog.com authentication is separate from your PostHog app.
                                </p>
                                <p className="text-sm my-2 dark:text-white">
                                    We suggest signing up with your personal email. Soon you'll be able to link your
                                    PostHog app account.
                                </p>
                                <Authentication
                                    onAuth={() => setLoginModalOpen(false)}
                                    showBanner={false}
                                    showProfile={false}
                                />
                            </div>
                        </div>
                    </Modal>
                    <Modal open={newPostModalOpen} setOpen={setNewPostModalOpen}>
                        <NewPost onSubmit={handleNewPostSubmit} />
                    </Modal>
                    <div className="sticky top-0 reasonable:top-[57px] md:hidden lg:top-[108px] bg-light dark:bg-dark pt-2 mb-0 z-10 lg:hidden">
                        <PostFilters />
                    </div>
                    {articleView && (
                        <button
                            onClick={() => navigate(prev ? -1 : '/posts')}
                            className="ml-4 inline-flex md:hidden space-x-1 items-center relative px-2 pt-1.5 pb-1 md:mb-8 rounded border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
                        >
                            <RightArrow className="-scale-x-100 w-6 text-red dark:text-yellow" />
                            <span className="text-red dark:text-yellow text-[15px] font-semibold line-clamp-1 text-left">
                                Back
                            </span>
                        </button>
                    )}
                    <Router prev={prev}>{children}</Router>
                </PostProvider>
            </PostsContext.Provider>
        </Layout>
    )
}
