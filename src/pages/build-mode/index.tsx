import React, { useEffect, useMemo, useRef, useState } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'
import { IconChevronLeft, IconChevronRight, IconNewspaper, IconSearch } from '@posthog/icons'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'

type BuildModePost = {
    id: string
    fields: { slug: string }
    excerpt?: string
    frontmatter: {
        title: string
        shortDate: string
        fullDate: string
        tags?: string[]
        seo?: { metaDescription?: string }
        featuredImage?: {
            publicURL?: string
            childImageSharp?: ImageDataLike | null
        }
        authors?: { name?: string }[]
    }
}

// Slight base angles so the pinned cards hang a little differently from one another
const CARD_ANGLES = [-1.5, 1.1, -0.7, 1.6, -1.2, 0.8, -1.7, 1.3]

// Deterministic pseudo-random in [0, 1) — stable across SSR/hydration, varied per card
const rand = (index: number, salt: number): number => {
    const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453
    return x - Math.floor(x)
}

const getSubtitle = (post: BuildModePost): string => {
    const description = post.frontmatter.seo?.metaDescription || post.excerpt || ''
    return description.split('. ')[0].replace(/\.\s*$/, '')
}

const getAuthorName = (post: BuildModePost): string | undefined => post.frontmatter.authors?.[0]?.name

const PIN_SRC = 'https://res.cloudinary.com/dmukukwp6/image/upload/red_pushpin_d9bbaf9e0c.svg'

// Torn-off strip outline, reused for both the fill and the edge stroke
const TAPE_PATH = 'M6 2 L114 1 L119 7 L115 13 L120 20 L116 27 L119 34 L113 41 L5 42 L1 34 L5 26 L0 19 L4 12 L1 6 Z'

// Translucent strip of masking tape with torn ends
const Tape = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 120 42" fill="none" className={`drop-shadow-sm ${className}`} aria-hidden="true">
        <path d={TAPE_PATH} fill="#FFFDF2" fillOpacity="0.68" />
        <path d={TAPE_PATH} stroke="#000" strokeOpacity="0.06" strokeWidth="1" />
        {/* sheen along the top edge */}
        <path d="M6 2 L114 1 L116 4 L7 5 Z" fill="#fff" fillOpacity="0.5" />
    </svg>
)

const PostImage = ({
    post,
    className = '',
    imgClassName = '',
    width = 800,
}: {
    post: BuildModePost
    className?: string
    imgClassName?: string
    width?: number
}) => {
    const image = getImage(post.frontmatter.featuredImage?.childImageSharp ?? null)
    const publicURL = post.frontmatter.featuredImage?.publicURL

    return image ? (
        <GatsbyImage image={image} alt={post.frontmatter.title} className={className} imgClassName={imgClassName} />
    ) : publicURL?.startsWith('https://res.cloudinary.com/') ? (
        <CloudinaryImage
            src={publicURL as `https://res.cloudinary.com/${string}`}
            width={width}
            alt={post.frontmatter.title}
            className={`!block ${className}`}
            imgClassName={imgClassName}
            loading="lazy"
        />
    ) : publicURL ? (
        <img src={publicURL} alt={post.frontmatter.title} loading="lazy" className={`${className} ${imgClassName}`} />
    ) : (
        <div className={`flex min-h-32 items-center justify-center bg-accent ${className}`}>
            <IconNewspaper className="size-8 text-muted" />
        </div>
    )
}

const FeaturedPost = ({ post }: { post: BuildModePost }) => {
    const author = getAuthorName(post)

    return (
        <div className="min-w-0 flex-1">
            <Link
                to={post.fields.slug}
                state={{ newWindow: true }}
                className="group flex flex-col gap-5 no-underline text-primary @2xl:flex-row @2xl:items-center @2xl:gap-7"
            >
                {/* Image keeps its own aspect ratio — no fixed frame, no cropping */}
                <div className="relative shrink-0 @2xl:w-[56%]">
                    <Tape className="absolute -left-5 -top-3 z-10 w-16 -rotate-[28deg] @2xl:w-20" />
                    <Tape className="absolute -right-5 -top-3 z-10 w-16 rotate-[24deg] @2xl:w-20" />
                    <div className="overflow-hidden rounded-sm border border-primary bg-white shadow-[0_14px_28px_rgba(0,0,0,0.25)]">
                        <PostImage post={post} className="w-full" imgClassName="block h-auto w-full" width={1000} />
                    </div>
                </div>
                <div className="min-w-0 flex-1">
                    <h1 className="m-0 text-xl font-bold leading-tight group-hover:underline @2xl:text-2xl @4xl:text-3xl">
                        {post.frontmatter.title}
                    </h1>
                    <p className="m-0 mt-2 text-secondary @2xl:text-lg">{getSubtitle(post)}</p>
                    <p className="m-0 mt-3 text-sm font-medium uppercase text-muted">
                        {post.frontmatter.shortDate}
                        {author ? ` · ${author}` : ''}
                    </p>
                </div>
            </Link>
        </div>
    )
}

const RecentPostCard = ({ post, index }: { post: BuildModePost; index: number }) => {
    const angle = CARD_ANGLES[index % CARD_ANGLES.length]
    const pinAngle = (rand(index, 7) - 0.5) * 16 // -8°..8°, pivoting on the needle tip
    const author = getAuthorName(post)

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
                        <div className="aspect-square overflow-hidden rounded-sm border border-primary bg-white shadow-[0_10px_20px_rgba(0,0,0,0.25)]">
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
                    <h3 className="m-0 text-sm font-bold leading-tight line-clamp-2 group-hover:underline">
                        {post.frontmatter.title}
                    </h3>
                    <p className="m-0 mt-1 text-xs text-secondary line-clamp-1">{getSubtitle(post)}</p>
                    <p className="m-0 mt-1 text-[11px] font-medium uppercase tracking-wide text-muted">
                        {post.frontmatter.shortDate}
                        {author ? ` · ${author}` : ''}
                    </p>
                </div>
            </Link>
        </div>
    )
}

// Horizontally scrollable row of pinned cards. While scrolling, the cards
// swing on their pins against the direction of motion.
const RecentPosts = ({ posts }: { posts: BuildModePost[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScroll, setCanScroll] = useState({ left: false, right: false })

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        const updateCanScroll = () => {
            const left = el.scrollLeft > 8
            const right = el.scrollLeft < el.scrollWidth - el.clientWidth - 8
            setCanScroll((prev) => (prev.left === left && prev.right === right ? prev : { left, right }))
        }

        // Scroll snap can nudge the row off zero on mount, clipping the first card
        el.scrollTo({ left: 0 })
        updateCanScroll()

        // Each card is a pendulum hanging from its pin inside an accelerating
        // frame (the scroll container). Torque comes mostly from scroll
        // acceleration — cards lean back while speeding up and swing forward as
        // a smooth scroll brakes — plus a small velocity term so steady
        // scrolling gives a slight lean. The measured velocity is low-passed so
        // discrete wheel steps read as one continuous motion instead of spikes.
        // Constants vary per card so they drift out of phase.
        const MAX_TILT = 14
        const pendulums = posts.map((_, i) => ({
            stiffness: 60 * (0.8 + 0.8 * rand(i, 1)), // higher = snappier direction changes
            damping: 7 * (0.85 + 0.6 * rand(i, 2)), // friction bleeding off momentum
            coupling: 0.05 * (0.8 + 0.8 * rand(i, 3)), // scroll px/s² → angular accel (deg/s²)
            lean: 0.0015 * (0.8 + 0.8 * rand(i, 4)), // deg of steady lean per px/s of scroll speed
            jostle: 12 * (0.8 + 0.8 * rand(i, 5)), // deg/s kick when the cursor enters the card
            angle: 0,
            velocity: 0,
        }))

        let lastScrollLeft = el.scrollLeft
        let smoothVelocity = 0
        let lastTime: number | null = null
        let lastInputTime = 0
        let raf: number | null = null
        let hoveredCardIndex = -1

        const animate = (time: number) => {
            const dt = Math.min(Math.max((time - (lastTime ?? time)) / 1000, 0.004), 1 / 30)
            lastTime = time

            const rawVelocity = (el.scrollLeft - lastScrollLeft) / dt
            lastScrollLeft = el.scrollLeft
            const prevSmooth = smoothVelocity
            smoothVelocity += (rawVelocity - smoothVelocity) * Math.min(1, dt * 12)
            const acceleration = Math.max(-20000, Math.min(20000, (smoothVelocity - prevSmooth) / dt))

            let settled = true
            pendulums.forEach((p, i) => {
                const restAngle = p.lean * smoothVelocity
                p.velocity +=
                    (-p.stiffness * (p.angle - restAngle) - p.damping * p.velocity + p.coupling * acceleration) * dt
                p.angle += p.velocity * dt
                p.angle = Math.max(-MAX_TILT, Math.min(MAX_TILT, p.angle))
                el.style.setProperty(`--tilt-${i}`, `${p.angle.toFixed(3)}deg`)
                if (Math.abs(p.angle) > 0.01 || Math.abs(p.velocity) > 0.2) settled = false
            })

            // Keep integrating for a grace window after the last input event —
            // stopping on the first quiet frame would kill the loop before the
            // motion it was started for ever registers.
            const idle = performance.now() - lastInputTime > 200
            if (!settled || !idle) {
                raf = requestAnimationFrame(animate)
            } else {
                pendulums.forEach((p, i) => {
                    p.angle = 0
                    p.velocity = 0
                    el.style.setProperty(`--tilt-${i}`, '0deg')
                })
                smoothVelocity = 0
                lastTime = null
                raf = null
            }
        }

        // (Re)start the loop on any input; scroll state is resynced so the
        // first frame doesn't see a stale delta
        const wake = () => {
            lastInputTime = performance.now()
            if (raf === null) {
                lastTime = lastInputTime
                smoothVelocity = 0
                lastScrollLeft = el.scrollLeft
                raf = requestAnimationFrame(animate)
            }
        }

        const onScroll = () => {
            wake()
            updateCanScroll()
        }

        // A slight jostle when the cursor enters a card, in the direction the
        // cursor was moving. pointerover fires for every child element, so
        // dedupe against the card the cursor is already on.
        const onPointerOver = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return // no cursor to brush cards with on touch
            const card = (e.target as Element | null)?.closest?.('[data-card-index]') as HTMLElement | null
            const index = card ? Number(card.dataset.cardIndex) : -1
            if (index !== -1 && index !== hoveredCardIndex) {
                const p = pendulums[index]
                if (p) p.velocity += p.jostle * (Math.random() < 0.5 ? -1 : 1)
                wake()
            }
            hoveredCardIndex = index
        }

        const onPointerLeave = () => {
            hoveredCardIndex = -1
        }

        const resizeObserver = new ResizeObserver(updateCanScroll)
        resizeObserver.observe(el)
        el.addEventListener('scroll', onScroll, { passive: true })
        el.addEventListener('pointerover', onPointerOver, { passive: true })
        el.addEventListener('pointerleave', onPointerLeave, { passive: true })

        return () => {
            el.removeEventListener('scroll', onScroll)
            el.removeEventListener('pointerover', onPointerOver)
            el.removeEventListener('pointerleave', onPointerLeave)
            resizeObserver.disconnect()
            if (raf !== null) cancelAnimationFrame(raf)
        }
    }, [posts.length])

    const scrollByCards = (direction: -1 | 1) => {
        const el = scrollRef.current
        if (!el) return
        el.scrollBy({ left: direction * el.clientWidth * 0.75, behavior: 'smooth' })
    }

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
                    <RecentPostCard key={post.id} post={post} index={index} />
                ))}
            </div>
            {canScroll.left && (
                <button
                    onClick={() => scrollByCards(-1)}
                    aria-label="Scroll to previous posts"
                    className="absolute left-2 top-24 z-20 flex size-8 items-center justify-center rounded-full border border-primary bg-primary shadow-md transition-transform hover:scale-105"
                >
                    <IconChevronLeft className="size-5" />
                </button>
            )}
            {canScroll.right && (
                <button
                    onClick={() => scrollByCards(1)}
                    aria-label="Scroll to more posts"
                    className="absolute right-2 top-24 z-20 flex size-8 items-center justify-center rounded-full border border-primary bg-primary shadow-md transition-transform hover:scale-105"
                >
                    <IconChevronRight className="size-5" />
                </button>
            )}
        </section>
    )
}

const GalleryCard = ({ post }: { post: BuildModePost }) => {
    const author = getAuthorName(post)

    return (
        <Link
            to={post.fields.slug}
            state={{ newWindow: true }}
            className="group flex h-full flex-col overflow-hidden rounded border border-primary bg-accent no-underline text-primary transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
        >
            <div className="relative aspect-video shrink-0 overflow-hidden bg-white">
                <PostImage
                    post={post}
                    className="!absolute inset-0 h-full w-full"
                    imgClassName="h-full w-full object-cover"
                />
            </div>
            <div className="flex flex-1 flex-col p-4">
                <h3 className="m-0 mb-1 text-sm font-bold leading-snug line-clamp-2 group-hover:underline">
                    {post.frontmatter.title}
                </h3>
                <p className="m-0 mb-2 text-xs text-secondary line-clamp-2">{getSubtitle(post)}</p>
                <p className="m-0 mt-auto text-[11px] font-medium uppercase tracking-wide text-muted">
                    {post.frontmatter.fullDate}
                    {author ? ` · ${author}` : ''}
                </p>
            </div>
        </Link>
    )
}

const TagPill = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`rounded-full border px-3 py-1 text-[13px] font-medium transition-colors ${
            active
                ? 'border-red bg-red text-white'
                : 'border-input text-secondary hover:border-primary hover:text-primary'
        }`}
    >
        {label}
    </button>
)

const PostsGallery = ({ posts }: { posts: BuildModePost[] }) => {
    const [query, setQuery] = useState('')
    const [activeTag, setActiveTag] = useState<string | null>(null)

    const tags = useMemo(() => {
        const counts: Record<string, number> = {}
        posts.forEach((post) => post.frontmatter.tags?.forEach((tag) => (counts[tag] = (counts[tag] || 0) + 1)))
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .map(([tag]) => tag)
    }, [posts])

    const filteredPosts = useMemo(() => {
        const q = query.trim().toLowerCase()
        return posts.filter((post) => {
            if (activeTag && !post.frontmatter.tags?.includes(activeTag)) return false
            if (!q) return true
            return [
                post.frontmatter.title,
                post.excerpt,
                post.frontmatter.seo?.metaDescription,
                ...(post.frontmatter.tags || []),
                ...(post.frontmatter.authors?.map(({ name }) => name) || []),
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
                .includes(q)
        })
    }, [posts, query, activeTag])

    return (
        <section>
            <div className="flex flex-col justify-between gap-3 @2xl:flex-row @2xl:items-center">
                <h2 className="m-0 text-lg font-bold">
                    All posts{' '}
                    <span className="text-sm font-medium text-muted">
                        ({filteredPosts.length}
                        {filteredPosts.length !== posts.length ? ` of ${posts.length}` : ''})
                    </span>
                </h2>
                <div className="relative @2xl:w-72">
                    <IconSearch className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search posts"
                        className="w-full rounded border border-input bg-primary py-1.5 pl-8 pr-3 text-sm text-primary placeholder:text-muted focus:border-primary focus:outline-none"
                    />
                </div>
            </div>
            <div className="my-4 flex flex-wrap gap-1.5">
                <TagPill label="All" active={!activeTag} onClick={() => setActiveTag(null)} />
                {tags.map((tag) => (
                    <TagPill
                        key={tag}
                        label={tag}
                        active={activeTag === tag}
                        onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    />
                ))}
            </div>
            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 @lg:grid-cols-2 @3xl:grid-cols-3">
                    {filteredPosts.map((post) => (
                        <GalleryCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="rounded border border-dashed border-input p-8 text-center text-secondary">
                    <p className="m-0">No posts match your search.</p>
                    <button
                        onClick={() => {
                            setQuery('')
                            setActiveTag(null)
                        }}
                        className="mt-2 text-sm font-semibold text-red dark:text-yellow"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </section>
    )
}

export default function BuildModePage({ data }: { data: { posts: { nodes: BuildModePost[] } } }): JSX.Element {
    const posts = data.posts.nodes.filter((post) => post.frontmatter?.title)
    const [featured, ...rest] = posts
    const recent = rest.slice(0, 8)

    return (
        <>
            <SEO
                title="build mode – PostHog"
                description="Tools, tactics, and taste for product builders. Advice on building great products, lessons (and mistakes) from building PostHog, and deep dives into the strategies of top startups."
            />
            <Editor slug="/build-mode" maxWidth="100%" hasPadding={false} disableFormatting>
                <div className="@container not-prose text-pretty text-primary">
                    <div className="mx-auto w-full max-w-6xl px-4 py-8 @xl:px-8">
                        <header className="flex flex-col gap-8 @3xl:flex-row @3xl:gap-12">
                            <div className="flex shrink-0 flex-col items-start gap-4 @3xl:w-44 @3xl:pt-2">
                                <img
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/build_mode_button_79d51b3276.png"
                                    alt="build mode"
                                    className="h-auto w-36 @3xl:w-40"
                                />
                                <p className="m-0 text-sm font-bold leading-snug">
                                    Tools, tactics, and taste
                                    <br />
                                    for <span className="text-red">product builders.</span>
                                </p>
                            </div>
                            {featured && <FeaturedPost post={featured} />}
                        </header>
                        <hr className="my-8 h-px border-none bg-red/40" />
                        <RecentPosts posts={recent} />
                        <hr className="my-8 h-px border-none bg-red/40" />
                        <PostsGallery posts={posts} />
                    </div>
                </div>
            </Editor>
        </>
    )
}

export const query = graphql`
    {
        posts: allMdx(
            filter: {
                isFuture: { eq: false }
                fields: { slug: { regex: "/^/newsletter/" } }
                frontmatter: { date: { ne: null } }
            }
            sort: { order: DESC, fields: [frontmatter___date] }
        ) {
            nodes {
                id
                fields {
                    slug
                }
                excerpt(pruneLength: 200)
                frontmatter {
                    title
                    shortDate: date(formatString: "MMM D")
                    fullDate: date(formatString: "MMM D, YYYY")
                    tags
                    seo {
                        metaDescription
                    }
                    featuredImage {
                        publicURL
                        childImageSharp {
                            gatsbyImageData(width: 800)
                        }
                    }
                    authors: authorData {
                        name
                    }
                }
            }
        }
    }
`
