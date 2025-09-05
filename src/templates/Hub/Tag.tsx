import React, { useEffect, useMemo, useState } from 'react'
import Link from 'components/Link'
import * as Icons from '@posthog/icons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { usePosts } from 'components/Edition/hooks/usePosts'
import { getParams, getSortOption, sortOptions } from '../BlogPost'
import { IconBookmark, IconBookmarkSolid, IconChevronLeft, IconSort, IconSpinner } from '@posthog/icons'
import { Sidebar as FoundersSidebar } from '../../pages/founders'
import { useUser } from '../../hooks/useUser'
import SEO from 'components/seo'
import { CallToAction } from 'components/CallToAction'
import { tagOptions } from 'components/Hub'
import MenuBar from 'components/RadixUI/MenuBar'
import OSButton from 'components/OSButton'

const rootOptions = {
    founders: {
        title: "Founder's hub",
        sidebar: <FoundersSidebar />,
    },
    'product-engineers': {
        title: "Product engineer's hub",
    },
    newsletter: {
        title: 'Newsletter',
    },
}

const Post = ({ post }: { post: any }) => {
    const { title, slug, excerpt } = post.attributes
    const { addBookmark, user } = useUser()
    const isBookmarked = useMemo(
        () => typeof window !== 'undefined' && user?.profile?.bookmarks?.some((b) => b.url === slug),
        [user, slug]
    )
    return (
        <li key={post.id}>
            <OSButton asLink to={slug} size="md" width="full" className="justify-between" hover="background">
                <div>{title}</div>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        addBookmark({ url: slug, title, description: excerpt })
                    }}
                >
                    {isBookmarked ? <IconBookmarkSolid className="size-5" /> : <IconBookmark className="size-5" />}
                </button>
            </OSButton>
        </li>
    )
}

export default function Tag({
    pageContext: { root, selectedTag, title },
}: {
    pageContext: { root: string; selectedTag: string }
}) {
    const [sort, setSort] = useState(getSortOption(root))
    const [params, setParams] = useState(getParams(root, selectedTag, getSortOption(root).sort))
    const { posts, isLoading, isValidating, fetchMore, hasMore } = usePosts({ params })
    const sidebar = rootOptions[root]?.sidebar
    const tagOption = tagOptions[selectedTag]
    const TagIcon = tagOption?.icon ? Icons[tagOption.icon] : null

    useEffect(() => {
        setParams(getParams(root, selectedTag, sort.sort))
    }, [root, selectedTag, sort])

    return (
        <>
            <SEO title={`${title} - ${rootOptions[root].title} - PostHog`} />
            <div data-scheme="secondary" className="p-4 bg-primary text-primary h-full">
                <div className="flex gap-8 h-full">
                    <section className="flex-1">
                        <ScrollArea className="pr-5">
                            <Link
                                className="inline-flex items-center gap-1 pr-2 pl-1 py-1 rounded-md bg-transparent hover:bg-accent active:scale-[0.98]"
                                to={`/${root}`}
                            >
                                <div>
                                    <IconChevronLeft className="size-4 text-primary" />
                                </div>
                                <div className="text-base leading-tight font-bold">{rootOptions[root].title}</div>
                            </Link>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 my-4 ml-2">
                                    {TagIcon && <TagIcon className="size-5 text-primary" />}
                                    <h2 className="m-0">{title}</h2>
                                </div>
                                <MenuBar
                                    menus={[
                                        {
                                            trigger: <IconSort className="size-4" />,
                                            items: sortOptions.map((option) => {
                                                return {
                                                    type: 'item',
                                                    label: option.label,
                                                    onClick: () => setSort(option),
                                                    active: sort.label === option.label,
                                                }
                                            }),
                                        },
                                    ]}
                                />
                            </div>
                            <ul className="space-y-px m-0">
                                {isLoading
                                    ? Array.from({ length: 10 }).map((_, index) => (
                                          <div
                                              key={index}
                                              className="bg-accent h-7 w-full rounded-md animate-pulse my-1"
                                          />
                                      ))
                                    : posts.map((post) => <Post key={post.id} post={post} />)}
                            </ul>
                            {hasMore && (
                                <div className="flex justify-center mt-4">
                                    <CallToAction
                                        disabled={isValidating}
                                        size="md"
                                        width="full"
                                        onClick={() => fetchMore()}
                                    >
                                        {isValidating ? (
                                            <IconSpinner className="size-6 mx-auto animate-spin" />
                                        ) : (
                                            'Load more'
                                        )}
                                    </CallToAction>
                                </div>
                            )}
                        </ScrollArea>
                    </section>

                    {sidebar && (
                        <aside className="max-w-xs text-sm">
                            <ScrollArea>{sidebar}</ScrollArea>
                        </aside>
                    )}
                </div>
            </div>
        </>
    )
}
