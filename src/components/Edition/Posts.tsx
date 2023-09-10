import React, { createContext, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isToday from 'dayjs/plugin/isToday'
import Link from 'components/Link'
import { Heart } from 'components/Icons'
import { useInView } from 'react-intersection-observer'
import { Skeleton } from 'components/Questions/QuestionsTable'
import { usePosts } from './hooks/usePosts'
import { useUser } from 'hooks/useUser'
import Tooltip from 'components/Tooltip'
import { Login } from 'components/Community/Sidebar'
import Layout from 'components/Layout'
import Modal from 'components/Modal'
import { Chat } from '@posthog/icons'
import SidebarSection from 'components/PostLayout/SidebarSection'
import { useQuestions } from 'hooks/useQuestions'
import { QuestionData, StrapiResult } from 'lib/strapi'
import { useLocation } from '@reach/router'
import { communityMenu } from '../../navs'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import NewPost from './NewPost'
import { Questions as QuestionForm } from 'components/Squeak'
import TableOfContents from 'components/PostLayout/TableOfContents'
import { PostProvider } from 'components/PostLayout/context'
import useMenu from './hooks/useMenu'
import { IMenu } from 'components/PostLayout/types'
import MobileNav from 'components/PostLayout/MobileNav'
dayjs.extend(relativeTime)
dayjs.extend(isToday)

const LikeButton = ({ liked, handleClick, className = '' }) => {
    const { user } = useUser()
    return (
        <button
            disabled={!user}
            className={`rounded-full flex justify-center items-center p-1.5 w-8 h-8 mt-6 relative transition-all hover:scale-[1.01] hover:top-[-.5px] active:scale-[.98] active:top-[.5px] active:text-red active:bg-red/20 dark:active:text-red dark:active:bg-red/20 ${
                liked
                    ? 'text-red bg-red/20'
                    : 'bg-border/50 hover:bg-border/75 dark:bg-border-dark/50 dark:hover:bg-border-dark/75 text-primary/50 dark:text-primary-dark/50 hover:text-primary/75 dark:hover:text-primary-dark/75 disabled:opacity-60'
            } ${className}`}
            onClick={handleClick}
        >
            {user ? (
                <Heart className="w-full h-auto" active={liked} />
            ) : (
                <Tooltip content="Sign in to like this post">
                    <span className="relative">
                        <Heart className="w-full h-auto" active={liked} />
                    </span>
                </Tooltip>
            )}
        </button>
    )
}

const Post = ({
    id,
    title,
    featuredImage,
    date,
    publishedAt,
    post_category,
    authors,
    likes,
    slug,
    fetchMore,
    articleView,
}) => {
    const containerRef = useRef()
    const { pathname } = useLocation()
    const { likePost, user } = useUser()
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(likes?.data?.length || 0)
    const category = post_category?.data?.attributes?.label
    const active = pathname === slug
    const breakpoints = useBreakpoint()
    const day = dayjs(date || publishedAt)

    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true,
    })

    useEffect(() => {
        if (inView) {
            fetchMore()
        }
    }, [inView])

    const handleLike = (e) => {
        e.preventDefault()
        setLiked(!liked)
        setLikeCount(likeCount + (!liked ? 1 : -1))
        likePost(id, liked)
    }

    useEffect(() => {
        if (active && typeof window !== 'undefined' && !breakpoints.sm) {
            containerRef?.current?.scrollIntoView({ block: 'center', inline: 'nearest' })
            window.scrollTo({ top: 0 })
        }
    }, [pathname])

    useEffect(() => {
        setLiked(user?.profile?.postLikes?.some((post) => post.id === id))
    }, [user])

    const imageURL = featuredImage?.image?.data?.attributes?.url || featuredImage?.url
    const defaultImage = post_category?.data?.attributes?.defaultImage?.data?.attributes?.url

    return (
        <li ref={containerRef} className="snap-start last:pb-24 grid grid-cols-[32px_1fr] gap-2">
            <LikeButton liked={liked} handleClick={handleLike} />
            <span className={`flex items-center ${articleView ? 'py-1' : ''}`} ref={fetchMore ? ref : null}>
                <div
                    className={`rounded-md p-2 transition-all flex-grow ${
                        active ? 'bg-accent dark:bg-accent-dark' : ''
                    }`}
                >
                    {category && <p className="m-0 text-sm font-medium opacity-60 flex-shrink-0">{category}</p>}
                    <div
                        className={` items-baseline ${active ? 'flex flex-col gap-1' : ''} ${
                            articleView ? 'flex flex-col gap-1' : 'inline'
                        }`}
                    >
                        <Link
                            className={`inline m-0 font-semibold !leading-tight line-clamp-2 text-inherit hover:text-red dark:hover:text-yellow hover:text-inherit dark:text-inherit dark:hover:text-inherit ${
                                articleView ? 'text-[.933rem]' : 'text-base mr-1.5'
                            }`}
                            to={slug}
                        >
                            {title}
                        </Link>
                        <span className={`${articleView ? 'inline-flex gap-1' : 'inline-flex gap-1'}`}>
                            {authors?.data?.length > 0 && (
                                <span
                                    className={`font-medium leading-none opacity-60 hidden sm:inline overflow-hidden text-ellipsis whitespace-nowrap ${
                                        articleView ? 'text-sm' : 'text-[.933rem]'
                                    }`}
                                >
                                    {authors?.data
                                        .map(({ id, attributes: { firstName, lastName } }) => {
                                            const name = [firstName, lastName].filter(Boolean).join(' ')
                                            return name
                                        })
                                        .join(', ')}
                                </span>
                            )}
                            <span
                                className={`font-medium leading-none opacity-60 ${
                                    articleView ? 'text-sm' : 'text-[.933rem]'
                                }`}
                            >
                                {day.isToday() ? 'Today' : day.fromNow()}
                            </span>
                        </span>
                    </div>
                    <div className="hidden sm:w-[100px] sm:h-[85px] w-[50px] h-[50px] flex-shrink-0 bg-accent dark:bg-accent-dark rounded-sm overflow-hidden md:self-start self-center relative z-10">
                        <Link
                            className={`text-inherit hover:text-inherit dark:text-inherit dark:hover:text-inherit flex-grow`}
                            to={slug}
                        >
                            {imageURL?.endsWith('.mp4') ? (
                                <video className="object-cover w-full h-full" src={imageURL} />
                            ) : (
                                <img
                                    className={`w-full h-full ${
                                        !imageURL && defaultImage ? 'object-contain' : 'object-cover'
                                    }`}
                                    src={imageURL || defaultImage || '/banner.png'}
                                />
                            )}
                        </Link>
                    </div>
                </div>
            </span>
        </li>
    )
}

function PostsListing({ articleView, posts, isLoading, fetchMore }) {
    const breakpoints = useBreakpoint()

    return articleView && breakpoints.sm ? null : (
        <div
            className={`mr-8 lg:ml-8 ml-0 ${
                articleView ? 'reasonable:sticky top-[108px] w-full md:w-[20rem] flex-shrink-0 pt-4' : 'flex-grow'
            }`}
        >
            <div
                className={
                    articleView
                        ? 'after:absolute after:w-full after:h-24 after:bottom-0 after:bg-gradient-to-b after:from-transparent dark:after:via-dark/80 dark:after:to-dark after:via-light/80 after:to-light after:z-10 relative'
                        : ''
                }
            >
                <ul
                    className={`divide-y divide-border dark:divide-border-dark list-none p-0 m-0 flex flex-col snap-y snap-proximity overflow-y-auto overflow-x-hidden ${
                        articleView && !breakpoints.sm ? 'h-[85vh] overflow-auto' : ''
                    }`}
                >
                    {posts.map(({ id, attributes }, index) => {
                        return (
                            <Post
                                articleView={articleView}
                                key={id}
                                {...attributes}
                                id={id}
                                fetchMore={posts.length === index + 1 && fetchMore}
                            />
                        )
                    })}
                    {isLoading && (
                        <li>
                            <Skeleton />
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

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

export const PostsContext = createContext<{ mutate?: () => Promise<void> }>({})

const menusByRoot = {
    tutorials: communityMenu.children[2],
}

const isListingView = (pathname: string, children?: IMenu[]): boolean | undefined => {
    return (
        children &&
        children.some((child: IMenu) => {
            return child.url === pathname || isListingView(pathname, child.children)
        })
    )
}

export default function Posts({ children, pageContext: { selectedTag: initialSelectedTag, title } }) {
    const { user, logout, isModerator } = useUser()
    const didMount = useRef(false)
    const name = [user?.profile.firstName, user?.profile.lastName].filter(Boolean).join(' ')
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const { pathname } = useLocation()
    const [prev, setPrev] = useState<string | null>(null)
    const [newPostModalOpen, setNewPostModalOpen] = useState(false)
    const root = pathname.split('/')[1]
    const [params, setParams] = useState({})
    const { posts, isLoading, fetchMore, mutate } = usePosts({ params })
    const [selectedTag, setSelectedTag] = useState(initialSelectedTag)
    const { activeMenu, defaultMenu } = useMenu()
    const postsSidebar = activeMenu?.length <= 0 ? defaultMenu : activeMenu
    const articleView = !isListingView(pathname, postsSidebar)

    const handleNewPostSubmit = () => {
        setNewPostModalOpen(false)
    }

    const getCategoryParams = () => {
        if (root === 'posts') {
            return {}
        }
        return {
            filters: {
                $and: [
                    {
                        post_category: {
                            folder: {
                                $eq: root,
                            },
                        },
                    },
                    {
                        post_tags: {
                            label: {
                                $in: [selectedTag],
                            },
                        },
                    },
                ],
            },
        }
    }

    useEffect(() => {
        if (didMount.current) {
            setPrev(pathname)
        } else {
            didMount.current = true
        }
        const newRoot = pathname.split('/')[1]
        const prevRoot = prev?.split('/')[1]
        if (newRoot === prevRoot && !initialSelectedTag) return
        setSelectedTag(initialSelectedTag)
    }, [pathname])

    useEffect(() => {
        const params = getCategoryParams()
        if (params) setParams(params)
    }, [root, selectedTag])

    const menu = menusByRoot[root]

    return (
        <Layout parent={communityMenu} activeInternalMenu={menu ?? communityMenu.children[0]}>
            <PostsContext.Provider value={{ mutate }}>
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
                    <div className="px-4 md:px-5 md:mt-8 mb-12 max-w-screen-2xl mx-auto">
                        <section>
                            <div className="py-4 px-2 md:py-2 bg-accent dark:bg-accent-dark rounded text-center flex flex-col md:flex-row justify-between items-center sticky top-[-1px]">
                                <p className="m-0 opacity-80 text-sm">The latest from the PostHog community</p>
                                <div className="flex space-x-6 items-center md:mt-0 mt-2 justify-between">
                                    {user ? (
                                        <span className="flex">
                                            <p className="text-sm m-0 pr-2 mr-2 border-r border-border dark:border-dark">
                                                Signed in as{' '}
                                                <Link
                                                    className="dark:text-yellow dark:hover:text-yellow text-red hover:text-red"
                                                    to={`/community/profiles/${user?.profile.id}`}
                                                >
                                                    {name}
                                                </Link>
                                            </p>
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
                                    ) : (
                                        <button
                                            onClick={() => setLoginModalOpen(true)}
                                            className="text-sm text-red dark:text-yellow font-semibold"
                                        >
                                            Sign in
                                        </button>
                                    )}
                                </div>
                            </div>
                        </section>
                        <section className="md:flex my-4 md:my-8 items-start">
                            <div
                                className={`lg:block hidden reasonable:sticky top-[108px] pt-3 w-[15rem] flex-shrink-0 after:absolute after:w-full after:h-24 after:bottom-0 after:bg-gradient-to-b after:from-transparent dark:after:via-dark/80 dark:after:to-dark after:via-light/80 after:to-light after:z-10 relative`}
                            >
                                <div className="max-h-[85vh] overflow-auto snap-y pb-24">
                                    <TableOfContents />
                                </div>
                            </div>
                            <PostsListing
                                fetchMore={fetchMore}
                                posts={posts}
                                isLoading={isLoading}
                                articleView={articleView}
                            />
                            <div
                                className={`${
                                    articleView ? 'flex-grow' : 'sticky top-[108px] basis-[20rem] flex-shrink-0 block'
                                }`}
                            >
                                <div>{children}</div>
                                {articleView && (
                                    <div className="mt-12 max-w-2xl">
                                        <QuestionForm
                                            disclaimer={false}
                                            subject={false}
                                            buttonText="Leave a comment"
                                            slug={pathname}
                                        />
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </PostProvider>
            </PostsContext.Provider>
        </Layout>
    )
}
