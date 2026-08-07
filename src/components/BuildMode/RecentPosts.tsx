import React, { useRef } from 'react'
import { IconChevronLeft, IconChevronRight } from '@posthog/icons'
import PinnedPostCard from './PinnedPostCard'
import { BuildModePost } from './types'
import { usePinnedCardSwing } from './usePinnedCardSwing'
import { useScrollEdges } from './useScrollEdges'

const ArrowButton = ({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }): JSX.Element => {
    const Icon = direction === 'left' ? IconChevronLeft : IconChevronRight

    return (
        <button
            onClick={onClick}
            aria-label={direction === 'left' ? 'Scroll to previous posts' : 'Scroll to more posts'}
            className={`absolute ${
                direction === 'left' ? 'left-2' : 'right-2'
            } top-24 z-20 flex size-8 items-center justify-center rounded-full border border-primary bg-primary shadow-md transition-transform hover:scale-105`}
        >
            <Icon className="size-5" />
        </button>
    )
}

/**
 * Horizontally scrollable row of pinned cards. While scrolling, the cards
 * swing on their pins against the direction of motion.
 */
export default function RecentPosts({ posts }: { posts: BuildModePost[] }): JSX.Element {
    const scrollRef = useRef<HTMLDivElement>(null)
    const { canScroll, scrollByPage } = useScrollEdges(scrollRef)
    usePinnedCardSwing(scrollRef, posts.length)

    // Fade content out at whichever edge has more to scroll to. A mask (instead
    // of a gradient overlay) keeps the cue invisible against any background.
    const mask = `linear-gradient(to right, ${
        canScroll.left ? 'transparent' : '#000'
    }, #000 2.5rem, #000 calc(100% - 2.5rem), ${canScroll.right ? 'transparent' : '#000'})`

    return (
        <section className="relative -mx-4 @xl:-mx-8">
            <div
                ref={scrollRef}
                className="scrollbar-hide flex snap-x gap-6 overflow-x-auto px-4 pb-2 pt-4 scroll-px-4 @2xl:gap-8 @xl:px-8 @xl:scroll-px-8"
                style={{ maskImage: mask, WebkitMaskImage: mask }}
            >
                {posts.map((post, index) => (
                    <PinnedPostCard key={post.id} post={post} index={index} />
                ))}
            </div>
            {canScroll.left && <ArrowButton direction="left" onClick={() => scrollByPage(-1)} />}
            {canScroll.right && <ArrowButton direction="right" onClick={() => scrollByPage(1)} />}
        </section>
    )
}
