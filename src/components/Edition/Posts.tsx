import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isToday from 'dayjs/plugin/isToday'
import Link from 'components/Link'
import { Heart, RightArrow } from 'components/Icons'
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
import { navigate } from 'gatsby'
import NewPost from './NewPost'
import Categories from './Categories'
import { Questions as QuestionForm } from 'components/Squeak'
dayjs.extend(relativeTime)
dayjs.extend(isToday)

const LikeButton = ({ liked, handleClick, className = '' }) => {
    const { user } = useUser()
    return (
        <button
            disabled={!user}
            className={`${liked ? 'text-red' : 'text-inherit disabled:opacity-60'} ${className}`}
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
        if (active && typeof window !== 'undefined' && !breakpoints.md) {
            containerRef?.current?.scrollIntoView({ block: 'center', inline: 'nearest' })
            window.scrollTo({ top: 0 })
        }
    }, [pathname])

    useEffect(() => {
        setLiked(user?.profile?.postLikes?.some((post) => post.id === id))
    }, [user])

    const imageURL = featuredImage?.image?.data?.attributes?.url || featuredImage?.url

    return (
        <li ref={containerRef} className="snap-start last:pb-24">
            <span className="flex items-center" ref={fetchMore ? ref : null}>
                {(!articleView || breakpoints.md) && (
                    <LikeButton
                        handleClick={handleLike}
                        liked={liked}
                        className="md:mr-6 mr-4 w-6 h-6 md:w-7 md:h-7 flex-shrink-0"
                    />
                )}
                <Link
                    className={`text-inherit hover:text-inherit dark:text-inherit dark:hover:text-inherit flex-grow`}
                    to={slug}
                >
                    <div
                        className={`flex space-x-6 border rounded-md p-2 transition-all flex-grow ${
                            active
                                ? 'border-border dark:border-dark bg-accent dark:bg-accent-dark'
                                : 'border-transparent dark:border-transparent hover:border-border dark:hover:border-dark'
                        }`}
                    >
                        <div className="sm:w-[150px] sm:h-[85px] w-[50px] h-[50px] flex-shrink-0 bg-accent dark:bg-accent-dark rounded-sm overflow-hidden md:self-start self-center relative z-10">
                            {imageURL?.endsWith('.mp4') ? (
                                <video className="object-cover w-full h-full" src={imageURL} />
                            ) : (
                                <img className="object-cover w-full h-full" src={imageURL || '/banner.png'} />
                            )}
                        </div>
                        <div>
                            <span
                                className={
                                    articleView || breakpoints.md
                                        ? 'flex flex-col-reverse'
                                        : 'flex items-baseline space-x-1'
                                }
                            >
                                <p className="m-0 text-base md:text-lg font-bold leading-tight line-clamp-2">{title}</p>
                                {category && (
                                    <p className="m-0 text-sm font-medium opacity-60 flex-shrink-0">{category}</p>
                                )}
                            </span>
                            <ul className="m-0 p-0 list-none flex space-x-2 items-center mt-1">
                                <li className="text-sm font-medium leading-none flex space-x-1 items-center">
                                    <Heart active={liked} className={`w-4 h-4 ${liked ? 'text-red' : 'opacity-60'}`} />
                                    <span className="opacity-60">{likeCount}</span>
                                </li>
                                {authors?.data?.length > 0 && (
                                    <li className="text-sm font-medium leading-none pl-2 border-l border-light dark:border-dark opacity-60 sm:block hidden overflow-hidden text-ellipsis whitespace-nowrap">
                                        {authors?.data
                                            .map(({ id, attributes: { firstName, lastName } }) => {
                                                const name = [firstName, lastName].filter(Boolean).join(' ')
                                                return name
                                            })
                                            .join(', ')}
                                    </li>
                                )}
                                <li className="text-sm font-medium pl-2 leading-none border-l border-light dark:border-dark flex-shrink-0">
                                    <span className="opacity-60">{day.isToday() ? 'Today' : day.fromNow()}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Link>
            </span>
        </li>
    )
}

const getCategoryParams = (root) => (root !== 'posts' ? { filters: { post_category: { folder: { $eq: root } } } } : {})

function PostsListing({ articleView, posts, isLoading, fetchMore, setParams, root }) {
    const [selectedCategories, setSelectedCategories] = useState([])
    const breakpoints = useBreakpoint()

    return articleView && breakpoints.md ? null : (
        <div className={`${articleView ? 'sticky top-[108px] w-full lg:w-[30rem] flex-shrink-0' : 'flex-grow'}`}>
            <div className="my-4 flex justify-between">
                <h5 className="m-0">Posts</h5>
                <Categories
                    setParams={setParams}
                    setSelectedCategories={setSelectedCategories}
                    selectedCategories={selectedCategories}
                    root={root}
                />
            </div>
            <div className="after:absolute after:w-full after:h-24 after:bottom-0 after:bg-gradient-to-b after:from-transparent dark:after:via-dark/80 dark:after:to-dark after:via-light/80 after:to-light after:z-10 relative">
                <ul
                    className={` list-none p-0 m-0 flex flex-col space-y-4 snap-y snap-proximity overflow-y-auto overflow-x-hidden ${
                        articleView && !breakpoints.md ? 'h-[80vh] overflow-auto' : ''
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
                        <Link to={`/questions/${permalink}`} className="text-yellow hover:text-yellow">
                            <span className="flex justify-between items-center">
                                <span className="text-base overflow-hidden text-ellipsis whitespace-nowrap">
                                    {subject}
                                </span>
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

export default function Posts({ children, articleView }) {
    const { user, logout, isModerator } = useUser()
    const didMount = useRef(false)
    const name = [user?.profile.firstName, user?.profile.lastName].filter(Boolean).join(' ')
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const { pathname } = useLocation()
    const [prev, setPrev] = useState<string | null>(null)
    const [newPostModalOpen, setNewPostModalOpen] = useState(false)
    const root = pathname.split('/')[1]
    const [params, setParams] = useState(getCategoryParams(root))
    const { posts, isLoading, fetchMore, mutate } = usePosts({ params })

    const handleNewPostSubmit = () => {
        setNewPostModalOpen(false)
        mutate()
    }

    useEffect(() => {
        if (didMount.current) {
            setPrev(pathname)
        } else {
            didMount.current = true
        }
    }, [pathname])

    return (
        <Layout parent={communityMenu} activeInternalMenu={communityMenu.children[0]}>
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
            <div className="px-4 md:px-5 md:mt-8 mb-12 max-w-screen-2xl mx-auto">
                <section>
                    <div className="py-4 md:py-2 border-b md:border-t border-border dark:border-dark text-center md:flex justify-between items-center sticky top-[-1px]">
                        <p className="m-0 opacity-80">The latest from the PostHog community</p>
                        <div className="flex space-x-6 items-center md:mt-0 mt-2 justify-between">
                            <p className="m-0 opacity-80 font-semibold">{dayjs().format('MMM D, YYYY')}</p>
                            {user ? (
                                <span className="flex">
                                    <p className="m-0 pr-2 mr-2 border-r border-border dark:border-dark">
                                        Signed in as{' '}
                                        <Link
                                            className="text-yellow hover:text-yellow"
                                            to={`/community/profiles/${user?.profile.id}`}
                                        >
                                            {name}
                                        </Link>
                                    </p>
                                    {isModerator && (
                                        <button
                                            className="pr-2 mr-2 border-r border-border dark:border-dark text-yellow font-semibold"
                                            onClick={() => setNewPostModalOpen(!newPostModalOpen)}
                                        >
                                            New post
                                        </button>
                                    )}
                                    <button className="text-yellow font-semibold" onClick={() => logout()}>
                                        Logout
                                    </button>
                                </span>
                            ) : (
                                <button onClick={() => setLoginModalOpen(true)} className="text-yellow font-semibold">
                                    Sign in
                                </button>
                            )}
                        </div>
                    </div>
                </section>
                <section className="lg:flex lg:space-x-12 my-4 md:my-8 items-start">
                    <PostsListing
                        root={root}
                        setParams={setParams}
                        fetchMore={fetchMore}
                        posts={posts}
                        isLoading={isLoading}
                        articleView={articleView}
                    />
                    <div
                        className={`${articleView ? 'flex-grow' : 'sticky top-[108px] w-[30rem] flex-shrink-0 block'}`}
                    >
                        {articleView && (
                            <button
                                onClick={() => navigate(prev ? -1 : '/posts')}
                                className="inline-flex lg:hidden space-x-1 items-center relative px-2 pt-1.5 pb-1 mb-4 md:mb-8 rounded border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
                            >
                                <RightArrow className="-scale-x-100 w-6" />
                                <span className="text-red dark:text-yellow text-[15px] font-semibold">
                                    Back to posts
                                </span>
                            </button>
                        )}
                        <div>{children}</div>
                        {articleView && (
                            <div className="mt-12 max-w-lg">
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
        </Layout>
    )
}
