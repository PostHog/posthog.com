import Link from 'components/Link'
import { useUser } from 'hooks/useUser'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { PostsContext, getParams } from '../Posts'
import TableOfContents from 'components/PostLayout/TableOfContents'
import { useLocation } from '@reach/router'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import dayjs from 'dayjs'
import { QuestionForm } from 'components/Squeak'
import relativeTime from 'dayjs/plugin/relativeTime'
import isToday from 'dayjs/plugin/isToday'
import { useLayoutData } from 'components/Layout/hooks'
import LikeButton from '../LikeButton'
import { CallToAction, child, container } from 'components/CallToAction'
import Spinner from 'components/Spinner'
import { Menu } from '@headlessui/react'
import { usePost } from 'components/PostLayout/hooks'
import { ChevronDown, Filter, Newspaper } from '@posthog/icons'
import useMenu from '../hooks/useMenu'
import { postsMenu as menu } from '../../../navs/posts'
import Community from 'components/Home/Community'
dayjs.extend(relativeTime)
dayjs.extend(isToday)

const CommunityBar = () => {
    const { user, logout, isModerator } = useUser()
    const name = [user?.profile.firstName, user?.profile.lastName].filter(Boolean).join(' ')
    const { setNewPostModalOpen, newPostModalOpen, setLoginModalOpen, articleView } = useContext(PostsContext)
    const { pathname } = useLocation()
    const { fullWidthContent } = useLayoutData()
    return (
        <div
            className={`py-4 md:py-2 mb-2 bg-accent dark:bg-accent-dark rounded text-center flex flex-col md:flex-row justify-between items-center sticky top-[-1px] ${
                fullWidthContent ? 'px-6' : 'px-4'
            }`}
        >
            {user ? (
                <div className="flex items-center justify-between w-full">
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
                        <button className="text-sm dark:text-yellow text-red font-semibold" onClick={() => logout()}>
                            Logout
                        </button>
                    </span>
                </div>
            ) : (
                <>
                    <p className="m-0 opacity-80 text-sm">The latest from the PostHog community</p>
                    <CallToAction type="secondary" size="xs" onClick={() => setLoginModalOpen(true)}>
                        Sign in
                    </CallToAction>
                </>
            )}
        </div>
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
    const { fullWidthContent } = useLayoutData()

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
            <span className={`flex items-center ${articleView ? 'py-px' : ''}`}>
                <Link
                    className={`inline m-0 font-semibold border-t border-b !leading-tight line-clamp-2 text-inherit hover:text-primary dark:hover:text-primary-dark hover:text-inherit dark:text-inherit dark:hover:text-inherit hover:transition-transform flex-grow hover:bg-accent dark:hover:bg-accent-dark relative 
                    ${
                        active
                            ? 'bg-accent dark:bg-accent-dark font-bold border-border dark:border-border-dark'
                            : 'border-transparent hover:scale-[1.01] hover:top-[-.5px] active:top-[.5px] active:scale-[.99]'
                    } 
                    ${fullWidthContent ? 'p-2 ' : 'p-2 lg:px-4'}
                    ${articleView ? 'text-[.933rem]' : 'text-base mr-1.5'}
                    ${fullWidthContent && articleView ? 'lg:px-6' : ''} 
                    `}
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

const PostFilters = () => {
    const { pathname } = useLocation()
    const { setRoot, setTag } = useContext(PostsContext)
    const [activeMenu, setActiveMenu] = useState(menu.find(({ url }) => url?.split('/')[1] === pathname.split('/')[1]))
    const { fullWidthContent } = useLayoutData()

    return (
        <div
            className={`relative flex space-x-2 pb-2 border-b border-border dark:border-border-dark ${
                fullWidthContent ? 'pl-2 pr-4' : 'pr-2'
            }`}
        >
            <div className="w-full flex-grow">
                <Menu>
                    <Menu.Button className="flex items-center relative mx-2 py-1 pl-2 pr-1 rounded hover:bg-light/50 hover:dark:bg-dark/50 border border-b-3 border-transparent md:hover:border-light dark:md:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all h-full">
                        <div className="flex items-center">
                            <Newspaper className="w-6 h-6 text-red mr-1" />
                            <span className="text-base font-bold">{activeMenu?.name}</span>
                            <ChevronDown className="w-6 h-6 -mb-[2px]" />
                        </div>
                    </Menu.Button>
                    <Menu.Items className="absolute rounded-md shadow-lg border border-border dark:border-dark bg-accent dark:bg-accent-dark text-sm flex flex-col z-50 bottom-0 left-2 right-2 translate-y-full">
                        {menu.map((menu, index) => {
                            const { name, url } = menu
                            return (
                                <Menu.Item key={`${name}-${index}`}>
                                    <button
                                        onClick={() => {
                                            setActiveMenu(menu)
                                            setRoot(url === '/posts' ? undefined : url?.split('/')[1])
                                            setTag(undefined)
                                        }}
                                        className="py-1.5 px-2 first:pt-2 last:pb-2 !text-inherit text-left hover:bg-border/50 hover:dark:bg-border/50"
                                    >
                                        {name}
                                    </button>
                                </Menu.Item>
                            )
                        })}
                    </Menu.Items>
                </Menu>
            </div>
            <div className="flex-grow-0">
                <Menu>
                    <Menu.Button className="flex space-x-1 items-center text-sm justify-between relative px-1.5 pt-1.5 pb-1 mb-1 rounded hover:bg-light/50 hover:dark:bg-dark/50 border border-b-3 border-transparent md:hover:border-light dark:md:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all">
                        <Filter className="w-5 h-5" />
                    </Menu.Button>
                    <Menu.Items className="absolute rounded-md border border-border dark:border-dark bg-accent dark:bg-accent-dark text-sm flex flex-col z-50 py-1 bottom-0 left-2 right-2 translate-y-full">
                        {activeMenu?.children?.map(({ name, url }, index) => {
                            return (
                                <Menu.Item key={`${name}-${index}`}>
                                    <button
                                        onClick={() => {
                                            setTag(name)
                                        }}
                                        className="py-1.5 px-2 first:pt-2 last:pb-2 !text-inherit text-left hover:bg-border/50 hover:dark:bg-border/50"
                                    >
                                        {name}
                                    </button>
                                </Menu.Item>
                            )
                        })}
                    </Menu.Items>
                </Menu>
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
            className={`
                transition-all 
                ${fullWidthContent ? 'ml-0 lg:ml-8 mr-8 xl:mr-16' : 'ml-0 lg:ml-8 mr-16'} 
                ${
                    articleView
                        ? 'lg:sticky top-[20px] reasonable:top-[108px] w-full md:w-[20rem] lg:w-[24rem] -ml-6 flex-shrink-0 border-r border-border dark:border-dark border-l'
                        : 'flex-grow'
                }
                ${fullWidthContent && articleView ? '' : ''}
            `}
        >
            {articleView && (
                <>
                    <CommunityBar />
                    <PostFilters />
                </>
            )}
            <div
                className={
                    articleView
                        ? 'after:absolute after:w-full after:h-24 after:bottom-0 after:bg-gradient-to-b after:from-transparent dark:after:via-dark/80 dark:after:to-dark after:via-light/80 after:to-light after:z-10 relative'
                        : ''
                }
            >
                {!articleView && <h2 className="pt-4 text-xl mb-2">All posts</h2>}

                <ul
                    className={`list-none p-0 m-0 flex flex-col snap-y snap-proximity overflow-y-auto overflow-x-hidden ${
                        articleView && !breakpoints.sm ? 'h-[85vh] overflow-auto mt-[-2px]' : ''
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
            <section className="md:flex my-4 md:my-0 items-start">
                {!articleView && (
                    <div
                        className={`lg:block hidden lg:sticky top-[20px] reasonable:top-[108px] pt-3 w-full h-screen md:w-[14rem] lg:w-[18rem] flex-shrink-0 after:absolute after:w-full after:h-24 after:bottom-0 after:bg-gradient-to-b after:from-transparent dark:after:via-dark/80 dark:after:to-dark after:via-light/80 after:to-light after:z-10 relative pr-4 border-r border-border dark:border-border-dark ${
                            fullWidthContent ? 'pl-2' : 'pl-4'
                        }`}
                    >
                        <div className="max-h-screen reasonable:max-h-[85vh] overflow-auto snap-y pb-24 mt-[-2px]">
                            <TableOfContents />
                        </div>
                    </div>
                )}
                <PostsListing />
                <div
                    className={`${
                        articleView ? 'flex-grow pt-8' : 'sticky top-[108px] basis-[20rem] flex-shrink-0 block'
                    }`}
                >
                    <div className={`mx-auto transition-all ${fullWidthContent ? 'max-w-full' : 'max-w-4xl px-0'}`}>
                        {children}
                    </div>
                    {articleView && (
                        <div className={`mt-12 mx-auto pb-20 ${fullWidthContent ? 'max-w-full' : 'max-w-4xl'}`}>
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
