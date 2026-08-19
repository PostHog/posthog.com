import React from 'react'
import Link from 'components/Link'
import PostImage from './PostImage'
import { BuildModePost } from './types'
import { getByline, getSubtitle, rand } from './utils'

const PIN_SRC = 'https://res.cloudinary.com/dmukukwp6/image/upload/red_pushpin_d9bbaf9e0c.svg'

/** Slight base angles so the pinned cards hang a little differently from one another */
const CARD_ANGLES = [-1.5, 1.1, -0.7, 1.6, -1.2, 0.8, -1.7, 1.3]

/**
 * A post thumbnail pinned to the board. The live swing comes from the
 * `--tilt-{index}` variable set on the scroll container by `usePinnedCardSwing`,
 * added to this card's fixed resting angle.
 */
export default function PinnedPostCard({ post, index }: { post: BuildModePost; index: number }): JSX.Element {
    const angle = CARD_ANGLES[index % CARD_ANGLES.length]
    const pinAngle = (rand(index, 7) - 0.5) * 16 // -8°..8°, pivoting on the needle tip

    return (
        <div className="w-52 shrink-0 grow-0 snap-start @2xl:w-60">
            <Link to={post.fields.slug} state={{ newWindow: true }} className="group block no-underline text-primary">
                <div className="relative px-1 pt-2" data-card-index={index}>
                    {/* The pin stays fixed — only the card swings on it. Its needle
                        tip sits ~40% across and ~93% down the artwork (the rest of
                        the width is cast shadow), which is both the rotation pivot
                        and what gets centered over the card. */}
                    <img
                        src={PIN_SRC}
                        alt=""
                        className="pointer-events-none absolute -top-3 left-1/2 z-20 h-11 w-auto"
                        style={{
                            transform: `translateX(-40%) rotate(${pinAngle.toFixed(1)}deg)`,
                            transformOrigin: '40% 93%',
                        }}
                    />
                    <div
                        className="will-change-transform"
                        style={{
                            transform: `rotate(calc(${angle}deg + var(--tilt-${index}, 0deg)))`,
                            transformOrigin: '50% 25px',
                        }}
                    >
                        <div className="aspect-square overflow-hidden rounded-md shadow-[0_10px_20px_rgba(0,0,0,0.25)]">
                            {/* left-top anchor keeps thumbnail titles (usually top-left) inside the square crop */}
                            <PostImage
                                post={post}
                                className="h-full w-full"
                                imgClassName="h-full w-full object-cover object-left-top"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-3 px-1">
                    <h3 className="m-0 text-sm font-bold leading-tight underline decoration-transparent transition-colors duration-200 line-clamp-2 group-hover:decoration-current">
                        {post.frontmatter.title}
                    </h3>
                    <p className="m-0 mt-1 text-xs text-secondary line-clamp-1">{getSubtitle(post)}</p>
                    <p className="m-0 mt-1 text-[11px] font-medium uppercase tracking-wide text-muted">
                        {getByline(post, post.frontmatter.shortDate)}
                    </p>
                </div>
            </Link>
        </div>
    )
}
