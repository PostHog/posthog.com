import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FeedOptions, useForumFeed } from './hooks'
import PostRow from './PostRow'

const showBusyAfterMs = 150

export const PostRowSkeleton = () => (
    <div className="px-4 @xl:px-5 py-4 space-y-2 border-b border-primary">
        <div className="h-4 w-2/3 rounded bg-accent animate-pulse" />
        <div className="h-3 w-5/6 rounded bg-accent animate-pulse" />
        <div className="flex justify-between gap-4">
            <div className="h-3 w-1/3 rounded bg-accent animate-pulse" />
            <div className="hidden @2xl:block h-3 w-40 rounded bg-accent animate-pulse" />
        </div>
    </div>
)

export const FeedSkeleton = ({ rows = 3 }: { rows?: number }) => (
    <>
        {Array.from({ length: rows }, (_, index) => (
            <PostRowSkeleton key={index} />
        ))}
    </>
)

const ProgressBar = () => (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 overflow-hidden" aria-hidden>
        <motion.div
            className="h-full w-1/3 bg-red dark:bg-yellow"
            initial={{ x: '-100%' }}
            animate={{ x: '300%' }}
            transition={{ duration: 1, ease: 'easeInOut', repeat: Infinity }}
        />
    </div>
)

export type FeedTableProps = FeedOptions & {
    showTopic: boolean
    empty: React.ReactNode
}

export const FeedTable = ({ showTopic, empty, ...feed }: FeedTableProps) => {
    const { questions, isLoading, isFirstLoad, isSwitching, isLoadingMore, hasMore, fetchMore } = useForumFeed(feed)
    const [lastPostRef, inView] = useInView({ threshold: 0.1 })
    const [showBusy, setShowBusy] = useState(false)
    useEffect(() => {
        if (!isSwitching) return setShowBusy(false)
        const timer = setTimeout(() => setShowBusy(true), showBusyAfterMs)
        return () => clearTimeout(timer)
    }, [isSwitching])
    const posts = questions.data
    const filtered = (feed.tagIds?.length ?? 0) > 0 || !!feed.unanswered

    useEffect(() => {
        if (inView && hasMore && !isLoading) fetchMore()
    }, [inView, hasMore, isLoading])

    return (
        <div className="@container">
            <div className="relative">
                {showBusy && <ProgressBar />}
                <ul
                    aria-busy={isSwitching}
                    className={`list-none m-0 p-0 transition-opacity duration-200 ${showBusy ? 'opacity-60' : ''}`}
                >
                    <AnimatePresence initial={false}>
                        {posts.map((post, index) => (
                            <PostRow
                                key={post.id}
                                post={post}
                                showTopic={showTopic}
                                filterTagIds={feed.tagIds}
                                showPin={!!feed.topicId}
                                rowRef={index === posts.length - 1 ? lastPostRef : undefined}
                            />
                        ))}
                    </AnimatePresence>
                </ul>
            </div>
            {isFirstLoad && <FeedSkeleton />}
            {isLoadingMore && <FeedSkeleton rows={2} />}
            {!isFirstLoad && !isSwitching && posts.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-6 py-12 text-center text-secondary text-sm"
                >
                    {filtered ? 'Nothing here. Loosen a filter and try again.' : empty}
                </motion.div>
            )}
        </div>
    )
}
