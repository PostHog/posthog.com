import React, { createContext, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'components/Link'
import { usePosts } from './hooks/usePosts'
import { useUser } from 'hooks/useUser'
import { Login } from 'components/Community/Sidebar'
import Layout from 'components/Layout'
import Modal from 'components/Modal'
import { Chat } from '@posthog/icons'
import SidebarSection from 'components/PostLayout/SidebarSection'
import { useQuestions } from 'hooks/useQuestions'
import { QuestionData, StrapiResult } from 'lib/strapi'
import { useLocation } from '@reach/router'
import { communityMenu, companyMenu } from '../../navs'
import NewPost from './NewPost'
import { PostProvider } from 'components/PostLayout/context'
import useMenu from './hooks/useMenu'
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
                                <span className="text-base line-clamp-2 text-ellipsis ">{subject}</span>
                                <span className="flex-shrink-0 text-black dark:text-white text-xs flex space-x-1 items-center opacity-70">
                                    <span className="w-4">
                                        <Chat />
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
    const { user } = useUser()
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
    })

    return (
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
    )
}

export const PostsContext = createContext({})

export const PostContext = createContext({})

const menusByRoot = {
    tutorials: { parent: communityMenu, activeInternalNav: communityMenu.children[2] },
    blog: { parent: companyMenu, activeInternalNav: companyMenu.children[5] },
}

const Router = ({ children }: { children: React.ReactNode }) => {
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
                className={`px-4 md:px-5 md:mt-8 mb-12 mx-auto transition-all ${
                    fullWidthContent ? 'max-w-full' : 'max-w-screen-3xl box-content'
                }`}
            >
                {{
                    '/blog': <Blog />,
                    '/newsletter': <Newsletter />,
                    '/spotlight': <Blog title="Spotlight" />,
                    '/customers': <Customers />,
                }[pathname] || <Default>{children}</Default>}
            </div>
        </PostContext.Provider>
    )
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
    const [selectedTag, setSelectedTag] = useState(initialTag)
    const { activeMenu, defaultMenu } = useMenu()
    const postsSidebar = activeMenu?.length <= 0 ? defaultMenu : activeMenu
    const [prev, setPrev] = useState<string | null>(null)
    const params = {
        filters: {
            $or: [
                ...(root
                    ? [
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
                      ]
                    : []),
                ...(selectedTag
                    ? [
                          {
                              post_tags: {
                                  label: {
                                      $in: [selectedTag],
                                  },
                              },
                          },
                      ]
                    : []),
            ],
        },
    }

    const { posts, isLoading, isValidating, fetchMore, mutate } = usePosts({ params })

    const handleNewPostSubmit = () => {
        setNewPostModalOpen(false)
    }

    useEffect(() => {
        if (!articleView) {
            const newRoot = pathname.split('/')[1]
            setRoot(newRoot === 'posts' ? undefined : newRoot)
            setSelectedTag(newRoot === 'posts' ? undefined : initialTag)
        }
    }, [pathname, articleView])

    useEffect(() => {
        if (didMount.current) {
            setPrev(pathname)
        } else {
            didMount.current = true
        }
    }, [pathname])

    const menu = menusByRoot[root] || { parent: communityMenu, activeInternalNav: communityMenu.children[0] }

    return (
        <Layout parent={menu.parent} activeInternalMenu={menu.activeInternalMenu}>
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
                }}
            >
                <PostProvider
                    value={{
                        title: title || 'Posts',
                        menu: postsSidebar,
                        isMenuItemActive: ({ url }) => url === pathname,
                        isMenuItemOpen: ({ url }) => url?.startsWith(`/${pathname.split('/')[1]}`),
                    }}
                >
                    <Modal open={loginModalOpen} setOpen={setLoginModalOpen}>
                        <div className="px-4">
                            <div className="p-4 max-w-[450px] mx-auto relative rounded-md dark:bg-dark bg-light mt-12 border border-border dark:border-dark">
                                <Login onSubmit={() => setLoginModalOpen(false)} />
                            </div>
                        </div>
                    </Modal>
                    <Modal open={newPostModalOpen} setOpen={setNewPostModalOpen}>
                        <NewPost onSubmit={handleNewPostSubmit} />
                    </Modal>
                    <MobileNav menu={defaultMenu} className="lg:hidden mb-6 mt-0" />
                    {articleView && (
                        <button
                            onClick={() => navigate(prev ? -1 : '/posts')}
                            className="inline-flex md:hidden space-x-1 items-center relative px-2 pt-1.5 pb-1 mb-4 md:mb-8 rounded border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
                        >
                            <RightArrow className="-scale-x-100 w-6" />
                            <span className="text-red dark:text-yellow text-[15px] font-semibold line-clamp-1 text-left">
                                Back to posts
                            </span>
                        </button>
                    )}
                    <Router>{children}</Router>
                </PostProvider>
            </PostsContext.Provider>
        </Layout>
    )
}
