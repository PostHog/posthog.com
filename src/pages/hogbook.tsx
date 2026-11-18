import React, { useEffect, useState } from 'react'
import { HedgehogBackToTheFuture } from '@posthog/brand/hoggies'
import { IconDocument, IconNotebook, IconPeopleFilled } from '@posthog/icons'
import { graphql } from 'gatsby'
import { pizzaPhotos } from 'components/Careers/Pizza/photos'
import Link from 'components/Link'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import { AVATAR_FALLBACK_URL } from 'constants/index'

type Post = {
    title: string
    url: string
    snippet: string
    date: string
}

type Article = {
    excerpt: string
    fields: { slug: string }
    frontmatter: { title: string; date: string }
}

type Friend = {
    squeakId: number
    firstName: string | null
    lastName: string | null
    avatar: { url: string } | null
}

type PageData = {
    blog: { nodes: Article[] }
    newsletter: { nodes: Article[] }
    friends: { nodes: Friend[] }
}

const videos = [
    { title: "Here's how PostHog fixes your product 24/7 (so you don't have to)", id: 'WUXY4Xdssao' },
    { title: 'Your Idea Sucks. Ship It Anyway.', id: '-8RTBTBHmEg' },
]

const feedIconClassName =
    'flex size-5 shrink-0 items-center justify-center border border-[var(--hogbook-border)] bg-[var(--hogbook-pale)] text-[var(--hogbook-blue)]'

function FilmstripIcon() {
    return (
        <svg className="size-4 text-light-11" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M0 1h16v14H0V1Zm3 2v10h10V3H3ZM1 3v2h1V3H1Zm0 4v2h1V7H1Zm0 4v2h1v-2H1Zm13-8v2h1V3h-1Zm0 4v2h1V7h-1Zm0 4v2h1v-2h-1Z" />
        </svg>
    )
}

function MiniFeedItem({ icon, date, children }: { icon: React.ReactNode; date?: string; children: React.ReactNode }) {
    return (
        <li className="border-b border-[var(--hogbook-border)] py-3 first:pt-0 last:border-0 last:pb-0">
            {date && <time className="mb-1 block text-xs text-light-11">{date}</time>}
            <div className="flex gap-2 text-sm">
                <span className={feedIconClassName} aria-hidden="true">
                    {icon}
                </span>
                <div className="min-w-0">{children}</div>
            </div>
        </li>
    )
}

export default function Hogbook({ data }: { data: PageData }): JSX.Element {
    const builtInPosts = data.blog.nodes.map(({ fields, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url: fields.slug,
        snippet: excerpt,
        date: frontmatter.date,
    }))
    const [posts, setPosts] = useState<Post[]>(builtInPosts)
    const [feedFriends, setFeedFriends] = useState<Friend[]>([])
    const [shareMessage, setShareMessage] = useState('')

    useEffect(() => {
        const people = data.friends.nodes.filter(({ squeakId, firstName, lastName }) =>
            Boolean(squeakId && (firstName || lastName))
        )
        for (let index = people.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(Math.random() * (index + 1))
            ;[people[index], people[randomIndex]] = [people[randomIndex], people[index]]
        }
        setFeedFriends(people.slice(0, 2))
    }, [data.friends.nodes])

    const shareProfile = async () => {
        const url = new URL('/hogbook', window.location.origin).href
        if (navigator.share) {
            try {
                await navigator.share({ title: "PostHog's profile", url })
                return
            } catch (error) {
                if (error instanceof DOMException && error.name === 'AbortError') return
            }
        }
        try {
            await navigator.clipboard.writeText(url)
            setShareMessage('Link copied!')
        } catch {
            window.prompt('Copy this profile link:', url)
        }
    }

    useEffect(() => {
        if (!['posthog.com', 'www.posthog.com'].includes(window.location.hostname)) return

        const controller = new AbortController()

        fetch('/rss.xml', { signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error('Blog feed unavailable')
                return response.text()
            })
            .then((xml) => {
                const feed = new DOMParser().parseFromString(xml, 'application/xml')
                if (feed.querySelector('parsererror')) return

                const latest = Array.from(feed.querySelectorAll('item'))
                    .map((item): Post | null => {
                        const link = item.querySelector('link')?.textContent
                        if (!link) return null

                        try {
                            const url = new URL(link)
                            if (url.origin !== 'https://posthog.com' || !url.pathname.startsWith('/blog/')) return null
                            const date = item.querySelector('pubDate')?.textContent || ''
                            if (!Number.isFinite(Date.parse(date))) return null
                            return {
                                title: item.querySelector('title')?.textContent || '',
                                url: url.pathname,
                                snippet: item.querySelector('description')?.textContent || '',
                                date,
                            }
                        } catch {
                            return null
                        }
                    })
                    .filter((post): post is Post => Boolean(post))
                    .sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime())
                    .slice(0, 3)

                if (
                    latest.length &&
                    new Date(latest[0].date) >= new Date(data.blog.nodes[0]?.frontmatter.date || 0) &&
                    !controller.signal.aborted
                ) {
                    setPosts(latest)
                }
            })
            .catch(() => {})

        return () => controller.abort()
    }, [data.blog.nodes])

    const friends = data.friends.nodes
        .filter(({ squeakId, firstName, lastName }) => squeakId && (firstName || lastName))
        .slice(0, 6)

    return (
        <>
            <SEO title="Hogbook" description="PostHog's 2006-style social profile." />
            <ReaderView hideLeftSidebar hideRightSidebar hideAppOptions showQuestions={false}>
                <div
                    className="@container not-prose mx-auto max-w-6xl border border-[var(--hogbook-border)] bg-light-1 text-light-12 [&_a]:text-[var(--hogbook-blue)]"
                    style={
                        {
                            '--hogbook-blue': '#3b5998',
                            '--hogbook-bar': '#6d84b4',
                            '--hogbook-border': '#d8dfea',
                            '--hogbook-pale': '#e7ebf2',
                        } as React.CSSProperties
                    }
                >
                    <header className="flex flex-wrap items-center justify-between gap-2 bg-[var(--hogbook-blue)] px-3 py-2 text-light-1">
                        <Link to="/sparks-joy" className="flex items-center gap-2 text-xl font-bold !text-light-1">
                            <span
                                aria-hidden="true"
                                className="flex size-7 items-end justify-center rounded-sm border border-light-1/70 bg-light-1 pb-px text-2xl font-black leading-none text-[var(--hogbook-blue)]"
                            >
                                p
                            </span>
                            hogbook
                        </Link>
                        <nav
                            aria-label="Hogbook navigation"
                            className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold"
                        >
                            <Link to="/sparks-joy" className="!text-light-1">
                                home
                            </Link>
                            <Link to="/people" className="!text-light-1">
                                friends
                            </Link>
                            <Link to="/blog" className="!text-light-1">
                                blog
                            </Link>
                            <Link to="/newsletter" className="!text-light-1">
                                newsletter
                            </Link>
                        </nav>
                    </header>
                    <div className="bg-[var(--hogbook-bar)] px-3 py-1 text-lg font-bold text-light-1">
                        PostHog's profile
                    </div>

                    <main className="grid min-w-0 gap-5 p-3 @3xl:grid-cols-[minmax(0,240px)_minmax(0,1fr)] @3xl:p-4">
                        <div className="min-w-0 space-y-4">
                            <section aria-label="PostHog profile photo">
                                <div className="mx-auto flex aspect-square w-full max-w-60 items-center justify-center border border-[var(--hogbook-border)] bg-[var(--hogbook-pale)] p-3 @3xl:mx-0">
                                    <HedgehogBackToTheFuture
                                        title="PostHog time-travel hoggie"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                                <Link
                                    to="/people"
                                    className="mt-2 block border-b border-[var(--hogbook-border)] pb-1 text-sm"
                                >
                                    View all PostHog's friends
                                </Link>
                                <Link
                                    to="/careers#pizza"
                                    className="block border-b border-[var(--hogbook-border)] py-1 text-sm"
                                >
                                    View more photos
                                </Link>
                                <Link
                                    to="/talk-to-a-human"
                                    className="block border-b border-[var(--hogbook-border)] py-1 text-sm"
                                >
                                    Poke him!
                                </Link>
                            </section>

                            <section
                                aria-labelledby="status-heading"
                                className="border border-[var(--hogbook-border)] text-sm"
                            >
                                <h2
                                    id="status-heading"
                                    className="bg-[var(--hogbook-pale)] px-2 py-1 font-bold text-[var(--hogbook-blue)]"
                                >
                                    Status
                                </h2>
                                <p className="m-0 p-2">
                                    <Link to="https://status.posthog.com" external>
                                        PostHog is online now
                                    </Link>
                                </p>
                            </section>

                            <section
                                aria-labelledby="groups-heading"
                                className="border border-[var(--hogbook-border)] text-sm"
                            >
                                <h2
                                    id="groups-heading"
                                    className="bg-[var(--hogbook-pale)] px-2 py-1 font-bold text-[var(--hogbook-blue)]"
                                >
                                    Groups
                                </h2>
                                <p className="m-0 p-2">
                                    <Link to="https://www.ycombinator.com/" external>
                                        YC
                                    </Link>
                                </p>
                            </section>

                            <section
                                aria-labelledby="friends-heading"
                                className="border border-[var(--hogbook-border)] text-sm"
                            >
                                <h2
                                    id="friends-heading"
                                    className="bg-[var(--hogbook-pale)] px-2 py-1 font-bold text-[var(--hogbook-blue)]"
                                >
                                    Friends
                                </h2>
                                <div className="grid grid-cols-3 gap-2 p-2">
                                    {friends.map(({ squeakId, firstName, lastName, avatar }) => (
                                        <Link
                                            key={squeakId}
                                            to={`/community/profiles/${squeakId}`}
                                            className="min-w-0 text-center text-xs"
                                        >
                                            <img
                                                src={avatar?.url || AVATAR_FALLBACK_URL}
                                                alt=""
                                                loading="lazy"
                                                className="aspect-square w-full border border-[var(--hogbook-border)] object-cover"
                                            />
                                            <span className="block truncate">
                                                {[firstName, lastName].filter(Boolean).join(' ')}
                                            </span>
                                        </Link>
                                    ))}
                                    {!friends.length && <Link to="/people">View people at PostHog</Link>}
                                </div>
                                <Link
                                    to="/people"
                                    className="block border-t border-[var(--hogbook-border)] px-2 py-1 text-xs"
                                >
                                    See all friends
                                </Link>
                            </section>
                        </div>

                        <div className="min-w-0 space-y-5">
                            <section
                                aria-label="Profile details"
                                className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--hogbook-border)] pb-3"
                            >
                                <h1 className="m-0 text-xl font-bold text-[var(--hogbook-blue)]">PostHog</h1>
                                <div className="flex items-center gap-3 text-sm">
                                    <span>SF, California</span>
                                    <button
                                        type="button"
                                        onClick={shareProfile}
                                        className="flex items-center gap-2 border border-[var(--hogbook-bar)] bg-light-1 px-2 py-0.5 font-bold text-[var(--hogbook-blue)]"
                                    >
                                        Share
                                        <span
                                            aria-hidden="true"
                                            className="border-l border-[var(--hogbook-bar)] pl-2 text-lg leading-none"
                                        >
                                            +
                                        </span>
                                    </button>
                                </div>
                            </section>
                            {shareMessage && (
                                <p role="status" aria-live="polite" className="m-0 text-xs">
                                    {shareMessage}
                                </p>
                            )}

                            <section aria-labelledby="feed-heading" className="border border-[var(--hogbook-border)]">
                                <h2
                                    id="feed-heading"
                                    className="m-0 bg-[var(--hogbook-pale)] px-3 py-1 text-sm font-bold text-[var(--hogbook-blue)]"
                                >
                                    ▼ Mini-feed
                                </h2>
                                <ol className="m-0 list-none p-3">
                                    {data.newsletter.nodes.map(({ fields, frontmatter, excerpt }, index) => (
                                        <React.Fragment key={fields.slug}>
                                            <MiniFeedItem
                                                icon={<IconNotebook className="size-3" />}
                                                date={frontmatter.date}
                                            >
                                                <p className="m-0">
                                                    PostHog posted a note:{' '}
                                                    <Link to={fields.slug} className="font-bold">
                                                        {frontmatter.title}
                                                    </Link>
                                                </p>
                                                <p className="mt-1 line-clamp-2 text-xs text-light-11">{excerpt}</p>
                                            </MiniFeedItem>
                                            {index % 2 === 0 && feedFriends[index / 2] && (
                                                <MiniFeedItem
                                                    icon={<IconPeopleFilled className="size-4 text-green-dark" />}
                                                >
                                                    <p className="m-0">
                                                        PostHog and{' '}
                                                        <Link
                                                            to={`/community/profiles/${
                                                                feedFriends[index / 2].squeakId
                                                            }`}
                                                            className="font-bold"
                                                        >
                                                            {[
                                                                feedFriends[index / 2].firstName,
                                                                feedFriends[index / 2].lastName,
                                                            ]
                                                                .filter(Boolean)
                                                                .join(' ')}
                                                        </Link>{' '}
                                                        are friends.
                                                    </p>
                                                </MiniFeedItem>
                                            )}
                                            {index % 2 === 1 && videos[(index - 1) / 2] && (
                                                <MiniFeedItem icon={<FilmstripIcon />}>
                                                    <p className="m-0">
                                                        PostHog shared a video:{' '}
                                                        <Link
                                                            to={`https://www.youtube.com/watch?v=${
                                                                videos[(index - 1) / 2].id
                                                            }`}
                                                            external
                                                            className="font-bold"
                                                        >
                                                            {videos[(index - 1) / 2].title}
                                                        </Link>
                                                    </p>
                                                </MiniFeedItem>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </ol>
                                <Link
                                    to="/newsletter"
                                    className="block border-t border-[var(--hogbook-border)] px-3 py-2 text-right text-xs"
                                >
                                    See all notes
                                </Link>
                            </section>

                            <section aria-labelledby="posts-heading" className="border border-[var(--hogbook-border)]">
                                <h2
                                    id="posts-heading"
                                    className="m-0 bg-[var(--hogbook-pale)] px-3 py-1 text-sm font-bold text-[var(--hogbook-blue)]"
                                >
                                    ▼ Posted items
                                </h2>
                                <ol className="m-0 list-none p-3">
                                    {posts.map((post) => (
                                        <li
                                            key={post.url}
                                            className="border-b border-[var(--hogbook-border)] py-3 first:pt-0 last:border-0 last:pb-0"
                                        >
                                            <time className="mb-1 block text-xs text-light-11">
                                                {new Date(post.date).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </time>
                                            <div className="flex gap-2 text-sm">
                                                <span className={feedIconClassName} aria-hidden="true">
                                                    <IconDocument className="size-3" />
                                                </span>
                                                <div className="min-w-0">
                                                    <p className="m-0">
                                                        PostHog shared{' '}
                                                        <Link to={post.url} className="font-bold">
                                                            {post.title}
                                                        </Link>
                                                    </p>
                                                    <p className="mt-1 line-clamp-2 text-xs text-light-11">
                                                        {post.snippet}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                                <Link
                                    to="/blog"
                                    className="block border-t border-[var(--hogbook-border)] px-3 py-2 text-right text-xs"
                                >
                                    See all posts
                                </Link>
                            </section>

                            <section aria-labelledby="photos-heading" className="border border-[var(--hogbook-border)]">
                                <h2
                                    id="photos-heading"
                                    className="m-0 bg-[var(--hogbook-pale)] px-3 py-1 text-sm font-bold text-[var(--hogbook-blue)]"
                                >
                                    ▼ Photos
                                </h2>
                                <div className="grid grid-cols-2 gap-2 p-3 @md:grid-cols-3">
                                    {pizzaPhotos.map(({ src, alt }) => (
                                        <Link key={src} to="/careers#pizza" className="min-w-0 text-xs">
                                            <img
                                                src={src}
                                                alt={alt}
                                                loading="lazy"
                                                className="aspect-[4/3] w-full border border-[var(--hogbook-border)] object-cover"
                                            />
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    to="/careers#pizza"
                                    className="block border-t border-[var(--hogbook-border)] px-3 py-2 text-right text-xs"
                                >
                                    See more photos
                                </Link>
                            </section>
                        </div>
                    </main>
                </div>
            </ReaderView>
        </>
    )
}

export const query = graphql`
    {
        blog: allMdx(
            filter: {
                isFuture: { eq: false }
                fields: { slug: { regex: "/^/blog/" } }
                frontmatter: { date: { ne: null } }
            }
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 3
        ) {
            nodes {
                excerpt(pruneLength: 150)
                fields {
                    slug
                }
                frontmatter {
                    title
                    date(formatString: "MMM D, YYYY")
                }
            }
        }
        newsletter: allMdx(
            filter: {
                isFuture: { eq: false }
                fields: { slug: { regex: "/^/newsletter/" } }
                frontmatter: { date: { ne: null } }
            }
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 4
        ) {
            nodes {
                excerpt(pruneLength: 170)
                fields {
                    slug
                }
                frontmatter {
                    title
                    date(formatString: "MMM D, YYYY")
                }
            }
        }
        friends: allSqueakProfile(
            filter: { teams: { data: { elemMatch: { id: { ne: null } } } }, squeakId: { ne: 28378 } }
        ) {
            nodes {
                squeakId
                firstName
                lastName
                avatar {
                    url
                }
            }
        }
    }
`
