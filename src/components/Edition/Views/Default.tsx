import Link from 'components/Link'
import { useUser } from 'hooks/useUser'
import React, { useContext, useEffect, useState } from 'react'
import { PostsContext, sortOptions } from '../Posts'
import TableOfContents from 'components/PostLayout/TableOfContents'
import { useLocation } from '@reach/router'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isToday from 'dayjs/plugin/isToday'
import { useLayoutData } from 'components/Layout/hooks'
import { CallToAction } from 'components/CallToAction'
import { Menu } from '@headlessui/react'
import { IconChevronDown, IconFilter, IconX, IconSort } from '@posthog/icons'
import { Icon } from 'components/PostLayout/Menu'
import { navigate } from 'gatsby'
import { postsMenu as menu } from '../../../navs/posts'
import Intro from '../Intro'
import Tags from '../Tags'
import Tooltip from 'components/Tooltip'
import PostsTable from '../PostsTable'
dayjs.extend(relativeTime)
dayjs.extend(isToday)

const UserBar = () => {
    const { user, logout, isModerator } = useUser()
    const name = [user?.profile.firstName, user?.profile.lastName].filter(Boolean).join(' ')
    const { setNewPostModalOpen, newPostModalOpen, setLoginModalOpen, articleView } = useContext(PostsContext)
    const { pathname } = useLocation()
    return (
        <div className="flex gap-1 flex-col @xs:flex-row items-center justify-between w-full">
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
                            <Link
                                className="text-sm pr-2 mr-2 border-r border-border dark:border-dark dark:text-yellow text-red font-semibold"
                                to="/posts/new"
                            >
                                New post
                            </Link>
                        )}
                        <button className="text-sm dark:text-yellow text-red font-semibold" onClick={() => logout()}>
                            Logout
                        </button>
                    </span>
                </>
            ) : (
                <>
                    <p className="m-0 opacity-80 text-sm">The latest from the PostHog community</p>
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
    )
}

const CommunityBar = () => {
    const { fullWidthContent } = useLayoutData()
    return (
        <div
            className={`@container py-4 md:py-2 mb-2 bg-accent dark:bg-accent-dark rounded text-center sticky top-[-1px] border-b border-border dark:border-dark lg:space-y-0 space-y-2 ${
                fullWidthContent ? 'px-6' : 'pl-4 pr-2'
            }`}
        >
            <UserBar />
        </div>
    )
}

export const Skeleton = () => {
    const [count, setCount] = useState(1)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [count])

    return Array.from(Array(count)).map((_, i) => (
        <div key={`skeleton-${i}`} className="flex items-center space-x-2 w-full my-2 px-6">
            <div className="w-4/5 bg-accent dark:bg-accent-dark animate-pulse h-[20px] rounded-md" />
            <div className="w-2/5 bg-accent dark:bg-accent-dark animate-pulse h-[20px] rounded-md" />
        </div>
    ))
}

export const SortDropdown = ({ sort, setSort }) => {
    return (
        <div className={`flex items-center`}>
            <div className="relative">
                <Menu>
                    <Menu.Button className="flex items-center text-sm justify-between relative pl-1.5 pt-1.5 pb-1 rounded hover:bg-light/50 hover:dark:bg-dark/50 border border-b-3 border-transparent md:hover:border-light dark:md:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all">
                        <Tooltip content={() => <>Sorting by: {sort}</>}>
                            <span className="relative">
                                <IconSort className="w-5 h-5" />
                            </span>
                        </Tooltip>
                        <IconChevronDown className="w-6" />
                    </Menu.Button>
                    <Menu.Items className="absolute rounded-md border border-border dark:border-dark bg-accent dark:bg-accent-dark text-sm flex flex-col z-50 bottom-0 left-0 translate-y-full overflow-hidden">
                        {sortOptions.map((option, index) => {
                            return (
                                <Menu.Item key={`${option.label}-${index}`}>
                                    <button
                                        onClick={() => setSort(option.label)}
                                        className={`py-1.5 px-2 first:pt-2 last:pb-2 !text-inherit text-left hover:bg-border/30 hover:dark:bg-border/30 ${
                                            option.label === sort ? 'font-bold bg-border/50 dark:bg-border/50' : ''
                                        }`}
                                    >
                                        {option.label}
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

export const PostFilters = ({ showTags = true, showSort = true }) => {
    const { setRoot, setTag, tag, activeMenu, setActiveMenu, articleView, sort, setSort } = useContext(PostsContext)
    const { fullWidthContent } = useLayoutData()
    const breakpoints = useBreakpoint()

    return (
        <>
            <div
                className={`relative flex space-x-2 pb-2 border-b border-border dark:border-dark ${
                    fullWidthContent ? 'pl-2 pr-4' : 'pr-2'
                }`}
            >
                <div className="w-full flex-grow">
                    <Menu>
                        <Menu.Button className="flex items-center relative mx-2 pl-2 pr-1 rounded hover:bg-light/50 hover:dark:bg-dark/50 border border-b-3 border-transparent md:hover:border-light dark:md:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all h-full">
                            <div className="flex items-center space-x-2">
                                <Icon icon={activeMenu?.icon} color={activeMenu?.color} />
                                <div className="text-sm flex space-x-1 items-center">
                                    <span className="font-bold">{activeMenu?.name}</span>
                                </div>

                                <IconChevronDown className="w-6 h-6 -mb-[2px]" />
                            </div>
                        </Menu.Button>
                        <Menu.Items className="absolute rounded-md shadow-lg border border-border dark:border-dark bg-accent dark:bg-accent-dark text-sm flex flex-col z-50 bottom-2 left-2 right-2 translate-y-full overflow-hidden">
                            {menu.map((menu, index) => {
                                const { name, url, icon, color } = menu
                                const active = menu === activeMenu
                                return (
                                    <Menu.Item key={`${name}-${index}`}>
                                        <button
                                            onClick={() => {
                                                setActiveMenu(menu)
                                                setRoot(url === '/posts' ? undefined : url?.split('/')[1])
                                                setTag(undefined)
                                                if (!articleView || breakpoints.sm) {
                                                    navigate(url)
                                                }
                                            }}
                                            className={`py-1.5 px-2 first:pt-2 last:pb-2 !text-inherit text-left hover:bg-border/50 hover:dark:bg-border/50 flex space-x-2 items-center ${
                                                active ? 'font-bold' : ''
                                            }`}
                                        >
                                            <Icon icon={icon} color={color} />
                                            <span>{name}</span>
                                        </button>
                                    </Menu.Item>
                                )
                            })}
                        </Menu.Items>
                    </Menu>
                </div>
                {showSort && <SortDropdown sort={sort} setSort={setSort} />}
                {showTags && activeMenu?.children?.length > 0 && (
                    <div className="flex-grow-0 flex items-center justify-center">
                        <Menu>
                            <Menu.Button className="flex space-x-1 items-center text-sm justify-between relative px-1.5 pt-1.5 pb-1 rounded hover:bg-light/50 hover:dark:bg-dark/50 border border-b-3 border-transparent md:hover:border-light dark:md:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all">
                                <IconFilter className="w-5 h-5" />
                            </Menu.Button>
                            <Menu.Items className="absolute rounded-md border border-border dark:border-dark bg-accent dark:bg-accent-dark text-sm flex flex-col z-50 bottom-2 left-2 right-2 translate-y-full overflow-hidden">
                                <Menu.Item>
                                    <button
                                        onClick={() => {
                                            setRoot(
                                                activeMenu?.url === '/posts'
                                                    ? undefined
                                                    : activeMenu?.url?.split('/')[1]
                                            )
                                            setTag(undefined)
                                            if (breakpoints.sm) {
                                                navigate(activeMenu?.url)
                                            }
                                        }}
                                        className={`py-1.5 px-2 first:pt-2 last:pb-2 !text-inherit text-left hover:bg-border/30 hover:dark:bg-border/30 ${
                                            !tag ? 'font-bold bg-border/50 dark:bg-border/50' : ''
                                        }`}
                                    >
                                        All
                                    </button>
                                </Menu.Item>
                                {activeMenu?.children?.map(({ name, url, tag }, index) => {
                                    return (
                                        <Menu.Item key={`${name}-${index}`}>
                                            <button
                                                onClick={() => {
                                                    setTag(tag || name)
                                                    if (breakpoints.sm) {
                                                        navigate(url)
                                                    }
                                                }}
                                                className={`py-1.5 px-2 first:pt-2 last:pb-2 !text-inherit text-left hover:bg-border/30 hover:dark:bg-border/30 ${
                                                    tag === name ? 'font-bold bg-border/50 dark:bg-border/50' : ''
                                                }`}
                                            >
                                                {name}
                                            </button>
                                        </Menu.Item>
                                    )
                                })}
                            </Menu.Items>
                        </Menu>
                    </div>
                )}
            </div>

            {showTags && tag && (
                <div className="bg-light dark:bg-dark px-5 relative top-[-6px] pb-2 border-b border-border dark:border-dark -mb-1">
                    <span
                        className="
                        after:h-6 after:w-6 after:absolute after:left-[39px] after:top-[-6px] after:border after:border-t-0 after:border-r-0 after:border-border dark:after:border-dark after:rounded-bl after:content-['']
                    "
                    ></span>
                    <div className="pl-[43px] -mt-0.5">
                        <span className="inline-flex gap-1 items-center text-[13px] rounded-full border border-light dark:border-dark pl-1.5 pr-2 pt-1 pb-1">
                            <button onClick={() => setTag(undefined)}>
                                <IconX className="w-3 h-3 inline-block bg-border dark:bg-border-dark p-1 box-content rounded-full" />
                            </button>
                            <span>{activeMenu?.children?.find((menuItem) => menuItem.tag === tag)?.name || tag}</span>
                        </span>
                    </div>
                </div>
            )}
        </>
    )
}

const Title = () => {
    const { activeMenu, tag, sort, setSort } = useContext(PostsContext)

    return (
        <div className="flex justify-between items-center mb-2 pt-4">
            <h2 className="m-0 text-xl space-x-2 flex-wrap md:flex hidden">
                {activeMenu?.name === 'Founders' ? (
                    <>Founder's hub{tag ? `: ${tag}` : null}</>
                ) : activeMenu?.name === 'Product engineers' ? (
                    <>Product engineer's hub{tag ? `: ${tag}` : null}</>
                ) : (
                    <>
                        {activeMenu?.name}
                        {tag ? `: ${tag}` : null}
                    </>
                )}
            </h2>
            <SortDropdown sort={sort} setSort={setSort} />
        </div>
    )
}

function PostsListing() {
    const { posts, fetchMore, isValidating, isLoading, articleView, hasMore, sort, setSort } = useContext(PostsContext)
    const breakpoints = useBreakpoint()

    return articleView && breakpoints.sm ? null : (
        <div
            className={`
                min-w-0
                transition-all 
                ${
                    articleView
                        ? 'flex flex-col h-auto sticky top-0 z-10 reasonable:top-[108px] w-full md:w-[20rem] lg:w-[24rem] flex-shrink-0 border-r border-border dark:border-dark 2xl:border-l'
                        : 'flex-grow md:px-8 2xl:px-12'
                }
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
                        ? 'after:absolute after:w-full after:h-24 after:bottom-0 after:bg-gradient-to-b after:from-transparent dark:after:via-dark/80 dark:after:to-dark after:via-light/80 after:to-light after:z-10 relative '
                        : ''
                }
            >
                {!articleView && (
                    <>
                        <Title />
                        <Intro />
                    </>
                )}
                <ul
                    className={`list-none p-0 m-0 snap-y snap-proximity overflow-x-hidden mt-4 ${
                        articleView && !breakpoints.sm ? 'h-[85vh] overflow-auto mt-[-2px]' : ''
                    }`}
                >
                    <PostsTable
                        posts={posts}
                        fetchMore={fetchMore}
                        isValidating={isValidating}
                        isLoading={isLoading}
                        hasMore={hasMore}
                        articleView={articleView}
                    />
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
                        className={`lg:block hidden lg:sticky top-0 z-10 reasonable:top-[108px] w-full h-screen md:w-[14rem] lg:w-[20rem] xl:w-[24rem] flex-shrink-0 after:absolute after:w-full after:h-24 after:bottom-0 after:bg-gradient-to-b after:from-transparent dark:after:via-dark/80 dark:after:to-dark after:via-light/80 after:to-light after:z-10 relative lg:border-x border-border dark:border-dark`}
                    >
                        <div
                            className={`@container py-4 md:py-2 mb-2 bg-accent dark:bg-accent-dark rounded text-center flex flex-col lg:flex-row justify-between items-center sticky top-[-1px] border-b border-border dark:border-dark lg:space-y-0 space-y-2 ${
                                fullWidthContent ? 'px-6' : 'pl-4 pr-2'
                            }`}
                        >
                            <UserBar />
                        </div>
                        {pathname !== '/posts' && <PostFilters showTags={false} showSort={false} />}
                        <div
                            className={`max-h-screen reasonable:max-h-[85vh] overflow-auto snap-y pb-24 pt-3 pr-4 mt-[-2px]`}
                        >
                            <TableOfContents />
                        </div>
                    </div>
                )}
                <PostsListing />
                <div
                    className={`${
                        articleView
                            ? 'flex-grow'
                            : 'sticky top-[108px] h-screen basis-[20rem] flex-shrink-0 block pl-4 border-l border-light dark:border-dark'
                    }`}
                >
                    {children}
                </div>
            </section>
        </>
    )
}
