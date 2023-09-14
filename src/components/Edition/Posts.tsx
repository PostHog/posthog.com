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
import { communityMenu } from '../../navs'
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

const menusByRoot = {
    tutorials: communityMenu.children[2],
}

const Router = ({ children }: { children: React.ReactNode }) => {
    const { fullWidthContent } = useLayoutData()
    const { pathname } = useLocation()
    return (
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
    )
}

export default function Posts({
    children,
    pageContext: { selectedTag: initialTag, title, article: articleView = true },
}) {
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const { pathname } = useLocation()
    const [newPostModalOpen, setNewPostModalOpen] = useState(false)
    const [root, setRoot] = useState(pathname.split('/')[1] !== 'posts' ? pathname.split('/')[1] : undefined)
    const [selectedTag, setSelectedTag] = useState(initialTag)
    const { activeMenu, defaultMenu } = useMenu()
    const postsSidebar = activeMenu?.length <= 0 ? defaultMenu : activeMenu
    const params = {
        filters: {
            $and: [
                ...(root
                    ? [
                          {
                              post_category: {
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

    const menu = menusByRoot[root]

    return (
        <Layout parent={communityMenu} activeInternalMenu={menu ?? communityMenu.children[0]}>
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
                    <Router>{children}</Router>
                </PostProvider>
            </PostsContext.Provider>
        </Layout>
    )
}
