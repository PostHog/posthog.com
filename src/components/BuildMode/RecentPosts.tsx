import React, { useRef } from 'react'
import { IconChevronLeft, IconChevronRight } from '@posthog/icons'
import PinnedPostCard from './PinnedPostCard'
import { PostSummary } from 'components/PostsIndex/types'
import { usePinnedCardSwing } from './usePinnedCardSwing'
import { useScrollEdges } from './useScrollEdges'

/**
 * Both arrows stay mounted and switch to `aria-disabled` at their edge. Unmounting
 * (or natively disabling) the button that was just activated would take focus with
 * it, dropping a keyboard user back to the top of the document mid-row. Hidden while
 * disabled to keep the row clean, but it reappears if it's tabbed to.
 */
const ArrowButton = ({
    direction,
    disabled,
    onClick,
}: {
    direction: 'left' | 'right'
    disabled: boolean
    onClick: () => void
}): JSX.Element => {
    const Icon = direction === 'left' ? IconChevronLeft : IconChevronRight

    return (
        <button
            type="button"
            onClick={() => !disabled && onClick()}
            aria-disabled={disabled}
            aria-label={direction === 'left' ? 'Scroll to previous posts' : 'Scroll to more posts'}
            className={`absolute ${
                direction === 'left' ? 'left-2' : 'right-2'
            } top-24 z-20 flex size-8 items-center justify-center rounded-full border border-primary bg-primary shadow-md transition-[opacity,transform] ${
                disabled
                    ? 'pointer-events-none opacity-0 focus-visible:pointer-events-auto focus-visible:opacity-40'
                    : 'hover:scale-105'
            }`}
        >
            <Icon className="size-5" />
        </button>
    )
}

/**
 * Horizontally scrollable row of pinned cards. While scrolling, the cards
 * swing on their pins against the direction of motion.
 */
export default function RecentPosts({ posts }: { posts: PostSummary[] }): JSX.Element {
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
                className="scrollbar-hide flex snap-x gap-3 overflow-x-auto px-4 pb-4 pt-4 scroll-px-4 @2xl:gap-4 @xl:px-8 @xl:scroll-px-8"
                style={{ maskImage: mask, WebkitMaskImage: mask }}
            >
                {posts.map((post, index) => (
                    <React.Fragment key={post.id}>
                        {index > 0 && (
                            /* scroll rhythm: a dashed rule between cards (flex-none doesn't exist here — custom flex scale) */
                            <div
                                aria-hidden
                                className="my-4 w-px shrink-0 grow-0 self-stretch border-l border-dashed border-primary"
                            />
                        )}
                        <PinnedPostCard post={post} index={index} />
                    </React.Fragment>
                ))}
            </div>
            <ArrowButton direction="left" disabled={!canScroll.left} onClick={() => scrollByPage(-1)} />
            <ArrowButton direction="right" disabled={!canScroll.right} onClick={() => scrollByPage(1)} />
        </section>
    )
}
