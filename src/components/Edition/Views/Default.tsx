import Link from 'components/Link'
import { useUser } from 'hooks/useUser'
import React, { useContext, useEffect, useRef } from 'react'
import { PostsContext } from '../Posts'
import TableOfContents from 'components/PostLayout/TableOfContents'
import { useLocation } from '@reach/router'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import dayjs from 'dayjs'
import { QuestionForm } from 'components/Squeak'
import relativeTime from 'dayjs/plugin/relativeTime'
import isToday from 'dayjs/plugin/isToday'
import { useLayoutData } from 'components/Layout/hooks'
import LikeButton from '../LikeButton'
import { child, container } from 'components/CallToAction'
import Spinner from 'components/Spinner'
dayjs.extend(relativeTime)
dayjs.extend(isToday)

const Post = ({
    id,
    title,
    featuredImage,
    date,
    publishedAt,
    post_category,
    authors,
    slug,
    fetchMore,
    articleView,
}) => {
    const containerRef = useRef()
    const { pathname } = useLocation()
    const category = post_category?.data?.attributes?.label
    const active = pathname === slug
    const breakpoints = useBreakpoint()
    const day = dayjs(date || publishedAt)

    useEffect(() => {
        if (active && typeof window !== 'undefined' && !breakpoints.sm) {
            containerRef?.current?.scrollIntoView({ block: 'center', inline: 'nearest' })
            window.scrollTo({ top: 0 })
        }
    }, [articleView])

    const imageURL = featuredImage?.image?.data?.attributes?.url || featuredImage?.url
    const defaultImage = post_category?.data?.attributes?.defaultImage?.data?.attributes?.url

    return (
        <li
            ref={containerRef}
            className={`snap-start last:pb-24 ${!articleView ? 'grid grid-cols-[32px_1fr] gap-2 items-center' : ''}`}
        >
            {!articleView && <LikeButton postID={id} />}
            <span className={`flex items-center ${articleView ? 'py-1' : ''}`}>
                <Link
                    className={`inline m-0 font-semibold !leading-tight line-clamp-2 text-inherit hover:text-primary dark:hover:text-primary-dark hover:text-inherit dark:text-inherit dark:hover:text-inherit rounded-md p-2 hover:transition-transform flex-grow hover:bg-accent dark:hover:bg-accent-dark relative hover:scale-[1.01] hover:top-[-.5px] active:top-[.5px] active:scale-[.99] ${
                        active ? 'bg-accent dark:bg-accent-dark' : ''
                    } ${articleView ? 'text-[.933rem]' : 'text-base mr-1.5'}`}
                    to={slug}
                >
                    {pathname === '/posts' && category && (
                        <p className="m-0 text-sm font-medium opacity-60 flex-shrink-0">{category}</p>
                    )}
                    <div
                        className={` items-baseline ${active ? 'flex flex-col gap-1' : ''} ${
                            articleView ? 'flex flex-col gap-1' : 'inline'
                        }`}
                    >
                        <span className="mr-1">{title}</span>
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
                        <span
                            className={`text-inherit hover:text-inherit dark:text-inherit dark:hover:text-inherit flex-grow`}
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
                        </span>
                    </div>
                </Link>
            </span>
        </li>
    )
}

export const Skeleton = () => {
    return (
        <div className="flex space-x-4 items-center pt-4">
            <div className="flex-shrink-0">
                <div className="w-[32px] h-[32px] bg-accent dark:bg-accent-dark animate-pulse rounded-full" />
            </div>
            <div className="flex-grow">
                <div className="w-[60px] bg-accent dark:bg-accent-dark animate-pulse h-[20px] rounded-md" />
                <div className="flex items-center space-x-2 max-w-[80%] mt-2">
                    <div className="w-4/5 bg-accent dark:bg-accent-dark animate-pulse h-[20px] rounded-md" />
                    <div className="w-2/5 bg-accent dark:bg-accent-dark animate-pulse h-[20px] rounded-md" />
                </div>
            </div>
        </div>
    )
}

function PostsListing() {
    const { posts, fetchMore, isValidating, isLoading, articleView, hasMore } = useContext(PostsContext)
    const breakpoints = useBreakpoint()
    const { fullWidthContent } = useLayoutData()

    return articleView && breakpoints.sm ? null : (
        <div
            className={`transition-all ${fullWidthContent ? 'ml-0 lg:ml-8 mr-8 xl:mr-16' : 'ml-0 lg:ml-8 mr-16'} ${
                articleView
                    ? 'lg:sticky top-[20px] reasonable:top-[108px] w-full md:w-[20rem] flex-shrink-0'
                    : 'flex-grow'
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
                    className={`list-none p-0 m-0 flex flex-col snap-y snap-proximity overflow-y-auto overflow-x-hidden ${
                        articleView && !breakpoints.sm ? 'h-[85vh] overflow-auto' : ''
                    }`}
                >
                    {posts.map(({ id, attributes }, index) => {
                        return <Post articleView={articleView} key={id} {...attributes} id={id} />
                    })}
                    {hasMore && (
                        <li className="mt-4 mb-24">
                            <button
                                onClick={fetchMore}
                                disabled={isLoading || isValidating}
                                className={`${container()} w-full`}
                            >
                                <span className={`${child()}`}>
                                    {isLoading || isValidating ? (
                                        <Spinner className="!w-6 !h-6 mx-auto text-white" />
                                    ) : (
                                        'Load more'
                                    )}
                                </span>
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default function Default({ children }) {
    const { user, logout, isModerator } = useUser()
    const name = [user?.profile.firstName, user?.profile.lastName].filter(Boolean).join(' ')
    const { setNewPostModalOpen, newPostModalOpen, setLoginModalOpen, articleView } = useContext(PostsContext)
    const { pathname } = useLocation()
    const { fullWidthContent } = useLayoutData()

    return (
        <>
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
                    className={`lg:block hidden lg:sticky top-[20px] reasonable:top-[108px] pt-3 w-52 flex-shrink-0 after:absolute after:w-full after:h-24 after:bottom-0 after:bg-gradient-to-b after:from-transparent dark:after:via-dark/80 dark:after:to-dark after:via-light/80 after:to-light after:z-10 relative`}
                >
                    <div className="max-h-screen reasonable:max-h-[85vh] overflow-auto snap-y pb-24">
                        <TableOfContents />
                    </div>
                </div>
                <PostsListing />
                <div
                    className={`${articleView ? 'flex-grow' : 'sticky top-[108px] basis-[20rem] flex-shrink-0 block'}`}
                >
                    <div className={`mx-auto transition-all ${fullWidthContent ? 'max-w-full' : 'max-w-4xl px-0'}`}>
                        {children}
                    </div>
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
        </>
    )
}
