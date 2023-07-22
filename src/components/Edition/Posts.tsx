import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'components/Link'
import { Check, Heart } from 'components/Icons'
import { Menu } from '@headlessui/react'
import { ChevronDown } from '@posthog/icons'
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
dayjs.extend(relativeTime)

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
    const { pathname } = useLocation()
    const { likePost, user } = useUser()
    const userLiked = user?.profile?.postLikes?.some((post) => post.id === id)
    const [liked, setLiked] = useState(userLiked)
    const [likeCount, setLikeCount] = useState(likes?.data?.length || 0)
    const category = post_category?.data?.attributes?.label
    const active = pathname === slug

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
        setLiked(userLiked)
    }, [user])

    return (
        <li ref={fetchMore ? ref : null} className="snap-start">
            <Link
                className={`flex space-x-6 items-center text-inherit hover:text-inherit p-2 border rounded-md ${
                    active ? 'border-border dark:border-dark ' : 'border-transparent dark:border-transparent'
                }`}
                to={slug}
            >
                {!articleView && <LikeButton handleClick={handleLike} liked={liked} />}
                <div className="w-[150px] h-[85px] flex-shrink-0 bg-accent dark:bg-accent-dark rounded-sm overflow-hidden">
                    <img className="object-cover w-full h-full" src={featuredImage?.url} />
                </div>
                <div>
                    <span className={articleView ? 'flex flex-col-reverse' : 'flex items-baseline space-x-1'}>
                        <p className="m-0 text-lg font-bold">{title}</p>
                        {category && <p className="m-0 text-sm font-medium opacity-60">{category}</p>}
                    </span>
                    <ul className="m-0 p-0 list-none flex space-x-2 items-center mt-1">
                        <li className="text-sm font-medium leading-none flex space-x-1 items-center">
                            <LikeButton className="w-4 h-4" handleClick={handleLike} liked={liked} />
                            <span className="opacity-60">{likeCount}</span>
                        </li>
                        {authors?.data?.length > 0 && (
                            <li className="text-sm font-medium leading-none pl-2 border-l border-light dark:border-dark">
                                {authors?.data.map(({ id, attributes: { firstName, lastName } }) => {
                                    const name = [firstName, lastName].filter(Boolean).join(' ')
                                    return (
                                        <Link key={id} to={`/community/profiles/${id}`}>
                                            {name}
                                        </Link>
                                    )
                                })}
                            </li>
                        )}
                        <li className="text-sm font-medium pl-2 leading-none border-l border-light dark:border-dark">
                            <span className="opacity-60">{dayjs(date || publishedAt).fromNow()}</span>
                        </li>
                    </ul>
                </div>
            </Link>
        </li>
    )
}

const Categories = ({ setSelectedCategories, selectedCategories }) => {
    const containerEl = useRef(null)
    const [categories, setCategories] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/post-categories`)
            .then((res) => res.json())
            .then((data) => setCategories(data?.data))
    }, [])

    const handleClick = (newCategory) => {
        const newCategories = selectedCategories.some((selectedCategory) => selectedCategory.id === newCategory.id)
            ? selectedCategories.filter((selectedCategory) => selectedCategory.id !== newCategory.id)
            : [...selectedCategories, newCategory]
        return setSelectedCategories(newCategories)
    }

    useEffect(() => {
        function handleClick(e) {
            if (containerEl?.current && !containerEl?.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [containerEl])

    return categories?.length > 0 ? (
        <div ref={containerEl} className="relative z-10">
            <Menu>
                <Menu.Button
                    onClick={() => setOpen(!open)}
                    className={`text-left text-sm flex space-x-2 justify-between items-end relative px-4 py-1 rounded border border-b-3 hover:border-light dark:hover:border-dark bg-accent dark:bg-accent-dark border-light dark:border-dark hover:top-[0px] hover:scale-[1]`}
                >
                    <span>Filters</span>
                    <ChevronDown className="w-5 mb-[-1px]" />
                </Menu.Button>
                {open && (
                    <Menu.Items
                        static
                        className="absolute grid gap-y-2 right-0 bg-accent dark:bg-accent-dark p-2 border border-border dark:border-dark rounded mt-1"
                    >
                        {categories.map((category) => {
                            const active = selectedCategories.some(
                                (selectedCategory) => selectedCategory.id === category.id
                            )
                            return (
                                <Menu.Item key={category.id}>
                                    <button
                                        onClick={() => handleClick(category)}
                                        className="text-left whitespace-nowrap flex items-center space-x-2"
                                    >
                                        <span
                                            className={`w-4 h-4 rounded-sm border text-white ${
                                                active ? 'bg-red border-red' : 'border-border dark:border-dark'
                                            }`}
                                        >
                                            {active && <Check />}
                                        </span>
                                        <span className="text-sm">{category?.attributes?.label}</span>
                                    </button>
                                </Menu.Item>
                            )
                        })}
                    </Menu.Items>
                )}
            </Menu>
        </div>
    ) : null
}

function PostsListing({ articleView }) {
    const [params, setParams] = useState({})
    const [selectedCategories, setSelectedCategories] = useState([])
    const { posts, isLoading, fetchMore } = usePosts({ params })

    useEffect(() => {
        if (!selectedCategories) {
            return setParams({})
        }
        const categoryIDs = selectedCategories.map((category) => category.id)
        setParams({
            filters: {
                post_category: {
                    id: {
                        $in: categoryIDs,
                    },
                },
            },
        })
    }, [selectedCategories])

    return (
        <div>
            <div className="my-4 flex justify-between">
                <h5 className="m-0">Posts</h5>
                <Categories setSelectedCategories={setSelectedCategories} selectedCategories={selectedCategories} />
            </div>
            <div className="after:absolute after:w-full after:h-24 after:bottom-0 after:bg-gradient-to-b after:from-transparent dark:after:via-dark/80 dark:after:to-dark after:via-light/80 after:to-light after:z-10  relative">
                <ul
                    className={` list-none p-0 m-0 grid gap-y-4 snap-y snap-proximity overflow-y-auto overflow-x-hidden ${
                        articleView ? 'h-[90vh] overflow-auto' : ''
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

const Sidebar = () => {
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
        <div className="ml-6 max-w-[350px] sticky top-12">
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

export default function Posts({ children }) {
    const { user, logout } = useUser()
    const name = [user?.profile.firstName, user?.profile.lastName].filter(Boolean).join(' ')
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const articleView = !!children

    return (
        <Layout>
            <Modal open={loginModalOpen} setOpen={setLoginModalOpen}>
                <div className="p-4 max-w-[450px] mx-auto relative rounded-md dark:bg-dark bg-light mt-12">
                    <Login onSubmit={() => setLoginModalOpen(false)} />
                </div>
            </Modal>
            <div className="px-5 mt-8 mb-12 max-w-screen-2xl mx-auto">
                <section>
                    <div className="py-2 border-y border-border dark:border-dark text-center flex justify-between items-center sticky top-[-1px]">
                        <p className="m-0">The latest from the PostHog community</p>
                        <div className="flex space-x-6 items-center">
                            <p className="m-0">{dayjs().format('MMM D, YYYY')}</p>
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
                <section className="flex space-x-12 my-8 items-start">
                    <div className={`${articleView ? 'sticky top-12' : ''} flex-grow`}>
                        <PostsListing articleView={articleView} />
                    </div>
                    {children ? <div className="max-w-5xl">{children}</div> : <Sidebar />}
                </section>
            </div>
        </Layout>
    )
}
