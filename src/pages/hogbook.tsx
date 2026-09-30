import React, { useEffect, useState } from 'react'
import { HedgehogBackToTheFuture } from '@posthog/brand/hoggies'
import { graphql } from 'gatsby'
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
    frontmatter: { title: string; date: string; featuredImage?: { publicURL?: string } }
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

export default function Hogbook({ data }: { data: PageData }): JSX.Element {
    const [posts, setPosts] = useState<Post[]>(
        data.blog.nodes.map(({ fields, frontmatter, excerpt }) => ({
            title: frontmatter.title,
            url: fields.slug,
            snippet: excerpt,
            date: frontmatter.date,
        }))
    )

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
            <SEO title="PostHog's profile – Hogbook" description="PostHog's 2006-style social profile." />
            <ReaderView hideLeftSidebar hideRightSidebar hideAppOptions showQuestions={false}>
                <div className="@container not-prose mx-auto max-w-6xl border border-blue/40 bg-primary text-primary">
                    <header className="flex flex-wrap items-center justify-between gap-2 bg-blue px-3 py-2 text-light-1">
                        <Link to="/sparks-joy" className="text-xl font-bold !text-light-1">
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
                    <div className="bg-blue/70 px-3 py-1 text-lg font-bold text-light-1">PostHog's profile</div>

                    <div className="grid min-w-0 @4xl:grid-cols-[140px_minmax(0,1fr)]">
                        <nav
                            aria-label="Profile links"
                            className="flex flex-wrap gap-x-3 gap-y-1 border-b border-blue/30 p-3 text-sm font-semibold @4xl:block @4xl:space-y-2 @4xl:border-b-0 @4xl:border-r"
                        >
                            <Link to="/hogbook" className="block">
                                My Profile
                            </Link>
                            <Link to="/people" className="block">
                                My Friends
                            </Link>
                            <Link to="/blog" className="block">
                                My Photos
                            </Link>
                            <Link to="/newsletter" className="block">
                                My Notes
                            </Link>
                            <Link to="/sparks-joy" className="block">
                                Time machine
                            </Link>
                        </nav>

                        <main className="grid min-w-0 gap-5 p-3 @3xl:grid-cols-[minmax(0,240px)_minmax(0,1fr)] @3xl:p-4">
                            <div className="min-w-0 space-y-4">
                                <section aria-label="PostHog profile photo">
                                    <div className="mx-auto flex aspect-square w-full max-w-60 items-center justify-center border border-blue/40 bg-blue/10 p-3 @3xl:mx-0">
                                        <HedgehogBackToTheFuture
                                            title="PostHog time-travel hoggie"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                    <Link to="/people" className="mt-2 block border-b border-blue/20 pb-1 text-sm">
                                        View all PostHog's friends
                                    </Link>
                                    <Link to="/blog" className="block border-b border-blue/20 py-1 text-sm">
                                        View more photos
                                    </Link>
                                </section>

                                <section aria-labelledby="status-heading" className="border border-blue/40 text-sm">
                                    <h2 id="status-heading" className="bg-blue/15 px-2 py-1 font-bold text-blue">
                                        Status
                                    </h2>
                                    <p className="m-0 p-2">Relationship status: It's complicated</p>
                                </section>

                                <section aria-labelledby="interests-heading" className="border border-blue/40 text-sm">
                                    <h2 id="interests-heading" className="bg-blue/15 px-2 py-1 font-bold text-blue">
                                        Interests
                                    </h2>
                                    <dl className="m-0 space-y-2 p-2 text-xs">
                                        <div>
                                            <dt className="font-bold">Influences</dt>
                                            <dd className="m-0">
                                                <Link to="/handbook/company/culture">Building in public</Link>,{' '}
                                                <Link to="https://github.com/PostHog" external>
                                                    open source
                                                </Link>
                                                , and the joy of shipping
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-bold">Music</dt>
                                            <dd className="m-0">
                                                <Link to="/fm">PostHog FM</Link>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-bold">Books</dt>
                                            <dd className="m-0">
                                                <Link to="/handbook/people/bookhog">
                                                    Exhalation, Dune, and The Spy and the Traitor
                                                </Link>
                                            </dd>
                                        </div>
                                    </dl>
                                </section>

                                <section aria-labelledby="groups-heading" className="border border-blue/40 text-sm">
                                    <h2 id="groups-heading" className="bg-blue/15 px-2 py-1 font-bold text-blue">
                                        Groups
                                    </h2>
                                    <p className="m-0 p-2">YC</p>
                                </section>

                                <section aria-labelledby="friends-heading" className="border border-blue/40 text-sm">
                                    <h2 id="friends-heading" className="bg-blue/15 px-2 py-1 font-bold text-blue">
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
                                                    className="aspect-square w-full border border-blue/30 object-cover"
                                                />
                                                <span className="block truncate">
                                                    {[firstName, lastName].filter(Boolean).join(' ')}
                                                </span>
                                            </Link>
                                        ))}
                                        {!friends.length && <Link to="/people">View people at PostHog</Link>}
                                    </div>
                                    <Link to="/people" className="block border-t border-blue/20 px-2 py-1 text-xs">
                                        See all friends
                                    </Link>
                                </section>
                            </div>

                            <div className="min-w-0 space-y-5">
                                <section
                                    aria-label="Profile details"
                                    className="flex flex-wrap items-start justify-between gap-3 border-b border-blue/40 pb-3"
                                >
                                    <h1 className="m-0 text-xl font-bold text-blue">PostHog</h1>
                                    <p className="m-0 text-sm">SF, California</p>
                                </section>

                                <section aria-labelledby="feed-heading" className="border border-blue/40">
                                    <h2
                                        id="feed-heading"
                                        className="m-0 bg-blue/15 px-3 py-1 text-sm font-bold text-blue"
                                    >
                                        ▼ Mini-feed
                                    </h2>
                                    <p className="m-0 border-b border-blue/20 bg-accent px-3 py-1 text-xs">
                                        Latest notes from <Link to="/newsletter">PostHog's newsletter</Link>
                                    </p>
                                    <ol className="m-0 list-none p-3">
                                        {data.newsletter.nodes.map(({ fields, frontmatter, excerpt }) => (
                                            <li
                                                key={fields.slug}
                                                className="border-b border-blue/20 py-3 first:pt-0 last:border-0 last:pb-0"
                                            >
                                                <time className="mb-1 block text-xs text-secondary">
                                                    {frontmatter.date}
                                                </time>
                                                <div className="flex gap-3 text-sm">
                                                    <span aria-hidden="true">▤</span>
                                                    <div className="min-w-0">
                                                        <p className="m-0">
                                                            PostHog posted a note:{' '}
                                                            <Link to={fields.slug} className="font-bold">
                                                                {frontmatter.title}
                                                            </Link>
                                                        </p>
                                                        <p className="mt-1 line-clamp-2 text-xs text-secondary">
                                                            {excerpt}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                    <Link
                                        to="/newsletter"
                                        className="block border-t border-blue/20 px-3 py-2 text-right text-xs"
                                    >
                                        See all notes
                                    </Link>
                                </section>

                                <section aria-labelledby="posts-heading" className="border border-blue/40">
                                    <h2
                                        id="posts-heading"
                                        className="m-0 bg-blue/15 px-3 py-1 text-sm font-bold text-blue"
                                    >
                                        ▼ Posted items
                                    </h2>
                                    <ol className="m-0 list-none p-3">
                                        {posts.map((post) => (
                                            <li
                                                key={post.url}
                                                className="border-b border-blue/20 py-3 first:pt-0 last:border-0 last:pb-0"
                                            >
                                                <time className="mb-1 block text-xs text-secondary">
                                                    {new Date(post.date).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </time>
                                                <div className="flex gap-3 text-sm">
                                                    <span aria-hidden="true">▤</span>
                                                    <div className="min-w-0">
                                                        <p className="m-0">
                                                            PostHog shared{' '}
                                                            <Link to={post.url} className="font-bold">
                                                                {post.title}
                                                            </Link>
                                                        </p>
                                                        <p className="mt-1 line-clamp-2 text-xs text-secondary">
                                                            {post.snippet}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                    <Link
                                        to="/blog"
                                        className="block border-t border-blue/20 px-3 py-2 text-right text-xs"
                                    >
                                        See all posts
                                    </Link>
                                </section>

                                <section aria-labelledby="photos-heading" className="border border-blue/40">
                                    <h2
                                        id="photos-heading"
                                        className="m-0 bg-blue/15 px-3 py-1 text-sm font-bold text-blue"
                                    >
                                        ▼ Photos
                                    </h2>
                                    <div className="grid grid-cols-2 gap-2 p-3 @md:grid-cols-3">
                                        {data.blog.nodes
                                            .filter(({ frontmatter }) => frontmatter.featuredImage?.publicURL)
                                            .map(({ fields, frontmatter }) => (
                                                <Link key={fields.slug} to={fields.slug} className="min-w-0 text-xs">
                                                    <img
                                                        src={frontmatter.featuredImage?.publicURL}
                                                        alt=""
                                                        loading="lazy"
                                                        className="aspect-[4/3] w-full border border-blue/30 object-cover"
                                                    />
                                                    <span className="mt-1 block line-clamp-2">{frontmatter.title}</span>
                                                </Link>
                                            ))}
                                    </div>
                                    <Link
                                        to="/blog"
                                        className="block border-t border-blue/20 px-3 py-2 text-right text-xs"
                                    >
                                        See more photos
                                    </Link>
                                </section>
                            </div>
                        </main>
                    </div>
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
                    featuredImage {
                        publicURL
                    }
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
