import React, { useState } from 'react'
import { HedgehogChef, HedgehogReading, HedgehogSailorHog, HedgehogSurfer } from '@posthog/brand/hoggies'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'
import {
    IconGear,
    IconHeart,
    IconList,
    IconMessage,
    IconPlus,
    IconQuestion,
    IconSearch,
    IconUser,
} from '@posthog/icons'
import Link from 'components/Link'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import { useAppActions } from '../../../context/App'
import { useWindow } from '../../../context/Window'

const posts: {
    author: string
    username: string
    lastName: string
    rebloggedUsername?: string
    image: string
    imageAlt: string
    searchText: string
}[] = [
    {
        author: 'James',
        username: 'wannabeprocyclist',
        lastName: 'Hawkins',
        image: '/images/sparks-joy/hoglr/james-pivot.webp',
        imageAlt: 'A parody pull request to stop James from building Uber for Dogs, with dogs as the drivers.',
        searchText: '@posthog, stop uberfordogsblockign me',
    },
    {
        author: 'Lottie',
        username: 'marmitelover4life',
        lastName: 'Coxon',
        rebloggedUsername: '50booksandbadjokes',
        image: '/images/sparks-joy/hoglr/dictator-or-tech-bro.webp',
        imageAlt: 'Two Hoggie characters dressed as a tech bro and a dictator for the quiz.',
        searchText: 'PostHog Series E 4,000+ dictatorortechbro.com 4% eight questions',
    },
]

type BlogAuthor = {
    handle: string
    name: string
    profile_id?: number
    profile?: { avatar?: { url?: string } }
}

type ArticleImage = ImageDataLike & { publicURL?: string }

type Article = {
    excerpt: string
    fields: { slug: string }
    frontmatter: { title: string; date: string; authors?: BlogAuthor[]; featuredImage?: ArticleImage }
}

type FeedUpdate = {
    title: string
    url: string
    snippet: string
    date: string
    kind: 'blog' | 'newsletter'
    authors?: BlogAuthor[]
    featuredImage?: ArticleImage
}

const blogUsernames: Record<string, string> = {
    'natalia-amorim': 'brazilianwinterproof',
    'ella-cullen': 'marmiteinmayo',
    'ian-vanagas': 'westcoastforever',
    'cory-slater': 'pygmygoatsandtax',
    'andy-maguire': 'sqlisthenewexcel',
    'daniel-zaltsman': 'maxmagicmaker',
    'tue-haulund': 'toomanybikes',
    'lizzie-epton': 'sailboatdogmum',
    'thiago-rocha-salvatore': 'occasionalprodexplosion',
    'joe-martin': 'chainsawclown',
    'jake-sciotto': 'hawaiianshirtsandpets',
    'cleo-lant': 'sidequestbard',
    'charles-cook': '50booksandbadjokes',
    'sara-miteva': 'ninetybooksandcake',
}

const blogUsername = ({ handle, name }: BlogAuthor) => blogUsernames[handle] || name

type TeamMember = {
    firstName: string
    lastName: string
    squeakId: number
    avatar?: { url?: string }
}

const radarHoggies = [
    { name: 'Hoggie radar', src: '/images/sparks-joy/hoglr/hoggie-radar.webp' },
    { name: 'Chef Hoggie', Icon: HedgehogChef },
    { name: 'Reading Hoggie', Icon: HedgehogReading },
    { name: 'Sailor Hoggie', Icon: HedgehogSailorHog },
    { name: 'Surfer Hoggie', Icon: HedgehogSurfer },
]

export default function Hoglr(): JSX.Element {
    const { closeWindow } = useAppActions()
    const { appWindow } = useWindow()
    const {
        team: { teamMembers },
        blog: { nodes: blogArticles },
        newsletter: { nodes: newsletterArticles },
    } = useStaticQuery<{
        team: { teamMembers: TeamMember[] }
        blog: { nodes: Article[] }
        newsletter: { nodes: Article[] }
    }>(graphql`
        query HoglrTeamQuery {
            team: allSqueakProfile(
                filter: { teams: { data: { elemMatch: { id: { ne: null } } } }, squeakId: { ne: 28378 } }
            ) {
                teamMembers: nodes {
                    firstName
                    lastName
                    squeakId
                    avatar {
                        url
                    }
                }
            }
            blog: allMdx(
                filter: {
                    isFuture: { eq: false }
                    fields: { slug: { regex: "/^/blog/" } }
                    frontmatter: { date: { ne: null } }
                }
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 20
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
                            childImageSharp {
                                gatsbyImageData(width: 480, height: 270)
                            }
                        }
                        authors: authorData {
                            handle
                            name
                            profile_id
                            profile {
                                avatar {
                                    url
                                }
                            }
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
                limit: 2
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
        }
    `)

    const [searchQuery, setSearchQuery] = useState('')
    const [radarIndex, setRadarIndex] = useState(0)

    const profileFor = (firstName: string, lastName: string) =>
        teamMembers.find((member) => member.firstName === firstName && member.lastName === lastName)
    const charles = profileFor('Charles', 'Cook')
    const query = searchQuery.trim().toLowerCase()
    const visiblePosts = posts.filter((post) =>
        `${post.author} ${post.username} ${post.rebloggedUsername || ''} ${post.imageAlt} ${post.searchText}`
            .toLowerCase()
            .includes(query)
    )
    const updates: FeedUpdate[] = [
        ...blogArticles.map(({ fields, frontmatter, excerpt }) => ({
            title: frontmatter.title,
            url: fields.slug,
            snippet: excerpt,
            date: frontmatter.date,
            kind: 'blog' as const,
            authors: frontmatter.authors,
            featuredImage: frontmatter.featuredImage,
        })),
        ...newsletterArticles.map(({ fields, frontmatter, excerpt }) => ({
            title: frontmatter.title,
            url: fields.slug,
            snippet: excerpt,
            date: frontmatter.date,
            kind: 'newsletter' as const,
        })),
    ]
        .sort((first, second) => Date.parse(second.date) - Date.parse(first.date))
        .filter((update) =>
            `${update.title} ${update.snippet} ${update.kind} ${
                update.authors?.map((author) => `${author.name} ${blogUsername(author)}`).join(' ') || ''
            }`
                .toLowerCase()
                .includes(query)
        )
    const radar = radarHoggies[radarIndex]
    const RadarIcon = radar.Icon

    return (
        <>
            <SEO
                title="Hoglr - PostHog"
                description="An old-school blog dashboard in the PostHog Time machine."
                image="/images/og/default.png"
            />
            <ReaderView
                hideLeftSidebar
                hideRightSidebar
                hideAppOptions
                hideMarkdownActions
                showQuestions={false}
                padding={false}
                className="bg-[#3a5775] [&_.reader-view-content-container>div]:!pt-0"
            >
                <div className="not-prose @container min-h-screen bg-[#3a5775] font-[Arial,Helvetica,sans-serif] text-white">
                    <header>
                        <div className="mx-auto flex max-w-[56.25rem] items-center justify-between gap-4 py-1 pl-3 pr-10 @lg:pl-5 @lg:pr-12 @3xl:pr-5">
                            <h1 className="shrink-0 font-serif text-[3rem] font-black leading-none tracking-tight text-white">
                                hoglr
                            </h1>
                            <nav
                                aria-label="Hoglr navigation"
                                className="flex items-center gap-3 text-[11px] font-semibold @3xl:gap-5"
                            >
                                <Link
                                    to="/sparks-joy/hoglr"
                                    className="relative hidden text-white after:absolute after:-bottom-3 after:left-1/2 after:size-2 after:-translate-x-1/2 after:rotate-45 after:bg-[#2c4762] @lg:inline"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/sparks-joy"
                                    state={{ newWindow: true }}
                                    className="hidden text-[#aec0d0] @lg:inline"
                                >
                                    Sparks Joy
                                </Link>
                                <span className="flex items-center gap-1 text-[#aec0d0] @lg:gap-2 @3xl:gap-4">
                                    <Link
                                        to="/paint"
                                        state={{ newWindow: true }}
                                        aria-label="Create with HogPaint"
                                        title="Create with HogPaint"
                                        className="flex size-7 items-center justify-center"
                                    >
                                        <IconPlus aria-hidden="true" className="size-4" />
                                    </Link>
                                    <Link
                                        to="/talk-to-a-human"
                                        state={{ newWindow: true }}
                                        aria-label="Contact sales"
                                        title="Contact sales"
                                        className="flex size-7 items-center justify-center"
                                    >
                                        <IconMessage aria-hidden="true" className="size-4" />
                                    </Link>
                                    <Link
                                        to="/docs"
                                        state={{ newWindow: true }}
                                        aria-label="Read PostHog docs"
                                        title="Read PostHog docs"
                                        className="flex size-7 items-center justify-center"
                                    >
                                        <IconQuestion aria-hidden="true" className="size-4" />
                                    </Link>
                                    <Link
                                        to="/display-options"
                                        state={{ newWindow: true }}
                                        aria-label="Display options"
                                        title="Display options"
                                        className="flex size-7 items-center justify-center"
                                    >
                                        <IconGear aria-hidden="true" className="size-4" />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => appWindow && closeWindow(appWindow)}
                                        aria-label="Close Hoglr"
                                        title="Close Hoglr"
                                        className="flex size-7 cursor-pointer items-center justify-center"
                                    >
                                        <span aria-hidden="true" className="text-xl leading-none">
                                            ⏻
                                        </span>
                                    </button>
                                </span>
                            </nav>
                        </div>
                    </header>

                    <div className="mx-auto grid max-w-[56.25rem] gap-4 rounded-t-lg bg-[#2c4762] px-3 py-3 @lg:grid-cols-[minmax(0,1fr)_9rem] @lg:px-5 @3xl:grid-cols-[minmax(0,1fr)_13.5rem]">
                        <div className="min-w-0 space-y-3">
                            <div aria-label="Recent activity" className="space-y-px">
                                {visiblePosts.map((post) => {
                                    const author = profileFor(post.author, post.lastName)
                                    return (
                                        <div key={post.author} className="flex items-center gap-2 @lg:gap-4">
                                            <span className="flex w-10 shrink-0 justify-center @lg:w-14 @3xl:w-16">
                                                {author?.avatar?.url && (
                                                    <img
                                                        src={author.avatar.url}
                                                        alt=""
                                                        className="size-5 rounded-[2px] object-cover"
                                                    />
                                                )}
                                            </span>
                                            <div className="flex min-w-0 flex-1 items-center gap-1 rounded-[2px] bg-[#455f78] px-2 py-1 text-[10px] text-[#cbd6df]">
                                                {author && (
                                                    <Link
                                                        to={`/community/profiles/${author.squeakId}`}
                                                        state={{ newWindow: true }}
                                                        className="shrink-0 font-semibold underline"
                                                    >
                                                        {post.username}
                                                    </Link>
                                                )}
                                                <span className="min-w-0 flex-1 truncate">
                                                    {post.rebloggedUsername
                                                        ? `reblogged ${post.rebloggedUsername}`
                                                        : 'started following you'}
                                                </span>
                                                {post.rebloggedUsername ? (
                                                    <IconHeart
                                                        aria-hidden="true"
                                                        className="size-3 shrink-0 opacity-50"
                                                    />
                                                ) : (
                                                    <IconUser
                                                        aria-hidden="true"
                                                        className="size-3 shrink-0 opacity-50"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <section aria-label="Hoglr feed" className="space-y-3">
                                {visiblePosts.map((post) => {
                                    const author = profileFor(post.author, post.lastName)
                                    const avatar = author?.avatar?.url
                                    return (
                                        <article key={post.author} className="flex items-start gap-2 @lg:gap-4">
                                            <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[3px] bg-white font-serif text-xl font-bold text-[#2c4762] @lg:size-14 @3xl:size-16">
                                                {avatar ? (
                                                    <img src={avatar} alt="" className="size-full object-cover" />
                                                ) : (
                                                    post.author[0]
                                                )}
                                            </div>
                                            <div className="relative min-w-0 flex-1 rounded-md bg-white px-3 py-3 text-[#292929] shadow-[0_1px_2px_#1c364f] before:absolute before:-left-1 before:top-5 before:size-2 before:rotate-45 before:bg-white @lg:px-4">
                                                <div className="flex flex-wrap items-center justify-between gap-x-2 text-[11px] text-[#82909c]">
                                                    <span>
                                                        {author ? (
                                                            <Link
                                                                to={`/community/profiles/${author.squeakId}`}
                                                                state={{ newWindow: true }}
                                                                className="font-semibold underline"
                                                            >
                                                                {post.username}
                                                            </Link>
                                                        ) : (
                                                            <span className="font-semibold">{post.username}</span>
                                                        )}{' '}
                                                        {post.rebloggedUsername && (
                                                            <>
                                                                reblogged{' '}
                                                                {charles ? (
                                                                    <Link
                                                                        to={`/community/profiles/${charles.squeakId}`}
                                                                        state={{ newWindow: true }}
                                                                        className="font-semibold underline"
                                                                    >
                                                                        {post.rebloggedUsername}
                                                                    </Link>
                                                                ) : (
                                                                    <span className="font-semibold">
                                                                        {post.rebloggedUsername}
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                        :
                                                    </span>
                                                    <span aria-hidden="true" className="flex items-center gap-2">
                                                        <span>reblog</span>
                                                        <IconHeart className="size-3" />
                                                    </span>
                                                </div>
                                                {post.rebloggedUsername && (
                                                    <div className="mt-3 space-y-2 text-xs leading-relaxed">
                                                        <p className="m-0">
                                                            Now we've got PostHog's Series E out of the way, I would
                                                            like to take a moment to appreciate the 4,000+ people who
                                                            have completed{' '}
                                                            <a
                                                                href="https://dictatorortechbro.com/"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="font-bold underline"
                                                            >
                                                                dictatorortechbro.com
                                                            </a>
                                                            .
                                                        </p>
                                                        <p className="m-0">
                                                            (With just 4% getting all 8 questions right, I'm impressed
                                                            how bad some of you are at this.)
                                                        </p>
                                                    </div>
                                                )}
                                                <a
                                                    href={post.image}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-3 block w-fit max-w-full"
                                                >
                                                    <img
                                                        src={post.image}
                                                        alt={post.imageAlt}
                                                        className="block h-auto max-w-full border border-[#e1e4e5]"
                                                        width={post.author === 'James' ? 448 : 352}
                                                        height={post.author === 'James' ? 221 : 213}
                                                    />
                                                </a>
                                                {post.author === 'James' && (
                                                    <p className="mb-0 mt-2 text-xs text-[#536374]">
                                                        @posthog, stop uberfordogsblockign me
                                                    </p>
                                                )}
                                            </div>
                                        </article>
                                    )
                                })}
                                {updates.map((update) => {
                                    const author = update.authors?.[0]
                                    const avatar = author?.profile?.avatar?.url
                                    const image = update.featuredImage && getImage(update.featuredImage)

                                    return (
                                        <article key={update.url} className="flex items-start gap-2 @lg:gap-4">
                                            <div className="size-10 shrink-0 overflow-hidden rounded-[3px] bg-white @lg:size-14 @3xl:size-16">
                                                <img
                                                    src={avatar || '/images/sparks-joy/hoglr/dj-hoggie.webp'}
                                                    alt=""
                                                    className={`size-full ${
                                                        avatar ? 'object-cover' : 'object-contain'
                                                    }`}
                                                    loading="lazy"
                                                    width="64"
                                                    height="64"
                                                />
                                            </div>
                                            <div className="relative min-w-0 flex-1 rounded-md bg-white px-3 py-3 text-[#292929] shadow-[0_1px_2px_#1c364f] before:absolute before:-left-1 before:top-5 before:size-2 before:rotate-45 before:bg-white @lg:px-4">
                                                <p className="m-0 text-[11px] text-[#82909c]">
                                                    {update.authors?.length ? (
                                                        update.authors.map((writer, index) => (
                                                            <React.Fragment key={writer.handle}>
                                                                {index > 0 && ' & '}
                                                                {writer.profile_id ? (
                                                                    <Link
                                                                        to={`/community/profiles/${writer.profile_id}`}
                                                                        state={{ newWindow: true }}
                                                                        className="font-semibold underline"
                                                                    >
                                                                        {blogUsername(writer)}
                                                                    </Link>
                                                                ) : (
                                                                    <span className="font-semibold">
                                                                        {blogUsername(writer)}
                                                                    </span>
                                                                )}
                                                            </React.Fragment>
                                                        ))
                                                    ) : (
                                                        <span className="font-semibold">posthog</span>
                                                    )}{' '}
                                                    · {update.kind} ·{' '}
                                                    {new Date(update.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                                <h2 className="my-2 text-base font-bold leading-snug">
                                                    <Link
                                                        to={update.url}
                                                        state={{ newWindow: true }}
                                                        className="text-[#292929] underline"
                                                    >
                                                        {update.title}
                                                    </Link>
                                                </h2>
                                                <p className="m-0 text-xs leading-relaxed text-[#536374]">
                                                    {update.snippet}
                                                </p>
                                                {(image || update.featuredImage?.publicURL) && (
                                                    <Link
                                                        to={update.url}
                                                        state={{ newWindow: true }}
                                                        aria-label={`Read ${update.title}`}
                                                        className="mt-3 block w-full"
                                                    >
                                                        {image ? (
                                                            <GatsbyImage
                                                                image={image}
                                                                alt={update.title}
                                                                className="block w-full border border-[#e1e4e5]"
                                                                loading="lazy"
                                                            />
                                                        ) : (
                                                            <img
                                                                src={update.featuredImage?.publicURL}
                                                                alt={update.title}
                                                                loading="lazy"
                                                                width="480"
                                                                height="270"
                                                                className="block h-auto w-full border border-[#e1e4e5]"
                                                            />
                                                        )}
                                                    </Link>
                                                )}
                                            </div>
                                        </article>
                                    )
                                })}
                                {!visiblePosts.length && !updates.length && (
                                    <p className="ml-12 rounded-[3px] bg-white px-3 py-2 text-xs text-[#292929] @lg:ml-[4.5rem] @3xl:ml-20">
                                        No posts match “{searchQuery.trim()}”.
                                    </p>
                                )}
                            </section>
                        </div>

                        <aside aria-label="Hoglr sidebar" className="w-full max-w-[13.5rem] space-y-3 text-[11px]">
                            <div className="overflow-hidden rounded-[3px] bg-[#455f78]">
                                <Link
                                    to="/people"
                                    state={{ newWindow: true }}
                                    className="flex items-center gap-1 whitespace-nowrap bg-[#88ad55] px-2 py-1.5 font-semibold leading-4 text-[#273c4d]"
                                >
                                    <IconUser className="size-3 shrink-0" />
                                    Following {teamMembers.length - 1} people
                                </Link>
                                <Link
                                    to="/people"
                                    state={{ newWindow: true }}
                                    className="block px-2 py-1.5 text-[#bac9d5]"
                                >
                                    ＋ Add and remove
                                </Link>
                            </div>
                            <div className="overflow-hidden rounded-[3px] bg-[#455f78]">
                                <Link
                                    to="/feet-pics"
                                    state={{ newWindow: true }}
                                    className="flex items-center gap-1.5 border-b border-[#3a5775] px-2 py-1.5 text-[#d8e0e7]"
                                >
                                    <IconHeart className="size-3.5" /> Liked posts
                                </Link>
                                <Link
                                    to="/sparks-joy/hoglr"
                                    className="flex items-center gap-1.5 border-b border-[#3a5775] px-2 py-1.5 font-semibold text-white"
                                >
                                    <IconList className="size-3.5" /> hoglr dashboard
                                </Link>
                                <Link
                                    to="/sparks-joy"
                                    state={{ newWindow: true }}
                                    className="block px-2 py-1.5 text-[#bac9d5]"
                                >
                                    Explore more tags
                                </Link>
                            </div>
                            <label className="relative flex items-center rounded-[3px] bg-[#455f78] text-[#bac9d5]">
                                <span className="sr-only">Search Hoglr posts and updates</span>
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    placeholder="Search Tags"
                                    className="w-full min-w-0 bg-transparent px-2 py-1.5 pr-7 text-[11px] text-white placeholder:text-[#bac9d5] focus:outline-white"
                                />
                                <IconSearch
                                    aria-hidden="true"
                                    className="pointer-events-none absolute right-2 size-3.5"
                                />
                            </label>
                            <div className="aspect-square overflow-hidden rounded-[3px] bg-white shadow-[0_1px_2px_#1c364f]">
                                {RadarIcon ? (
                                    <RadarIcon title={radar.name} className="size-full object-contain" />
                                ) : (
                                    <img
                                        src={radar.src}
                                        alt={radar.name}
                                        className="size-full object-contain"
                                        width="216"
                                        height="216"
                                    />
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    setRadarIndex(
                                        (index) =>
                                            (index + 1 + Math.floor(Math.random() * (radarHoggies.length - 1))) %
                                            radarHoggies.length
                                    )
                                }
                                aria-label="Show another Hoggie"
                                className="flex w-full cursor-pointer items-center gap-2 text-left text-[#bac9d5] hover:underline"
                            >
                                <img
                                    src="/images/sparks-joy/hoglr/dj-hoggie.webp"
                                    alt=""
                                    className="size-5 rounded-sm bg-white object-contain"
                                    width="20"
                                    height="20"
                                />
                                Hoggie radar{radarIndex ? ` · ${radar.name}` : ''} ↻
                            </button>
                        </aside>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
