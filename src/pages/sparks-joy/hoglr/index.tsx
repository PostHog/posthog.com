import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import {
    IconArrowUpRight,
    IconChat,
    IconGear,
    IconHeart,
    IconImage,
    IconList,
    IconMessage,
    IconMicrophone,
    IconPencil,
    IconPlus,
    IconQuestion,
    IconQuote,
    IconSearch,
    IconUser,
    IconVideoCamera,
} from '@posthog/icons'
import Editor from 'components/Editor'
import Link from 'components/Link'
import SEO from 'components/seo'
import { useAppActions } from '../../../context/App'
import { useWindow } from '../../../context/Window'

const postTypes = [
    { label: 'Text', Icon: IconPencil },
    { label: 'Photo', Icon: IconImage },
    { label: 'Quote', Icon: IconQuote },
    { label: 'Link', Icon: IconArrowUpRight },
    { label: 'Chat', Icon: IconChat },
    { label: 'Audio', Icon: IconMicrophone },
    { label: 'Video', Icon: IconVideoCamera },
]

const posts: {
    author: string
    username: string
    lastName: string
    rebloggedUsername?: string
    image: string
    imageAlt: string
}[] = [
    {
        author: 'James',
        username: 'dogsdontneedlicenses',
        lastName: 'Hawkins',
        image: '/images/sparks-joy/hoglr/james-pivot.webp',
        imageAlt: 'A parody pull request to stop James from building Uber for Dogs, with dogs as the drivers.',
    },
    {
        author: 'Lottie',
        username: 'marmitelover4life',
        lastName: 'Coxon',
        rebloggedUsername: 'letmecook',
        image: '/images/sparks-joy/hoglr/dictator-or-tech-bro.webp',
        imageAlt: 'Two Hoggie characters dressed as a tech bro and a dictator for the quiz.',
    },
]

type TeamMember = {
    firstName: string
    lastName: string
    squeakId: number
    avatar?: { url?: string }
}

export default function Hoglr(): JSX.Element {
    const { closeWindow } = useAppActions()
    const { appWindow } = useWindow()
    const {
        team: { teamMembers },
    } = useStaticQuery<{ team: { teamMembers: TeamMember[] } }>(graphql`
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
        }
    `)

    const profileFor = (firstName: string, lastName: string) =>
        teamMembers.find((member) => member.firstName === firstName && member.lastName === lastName)
    const charles = profileFor('Charles', 'Cook')

    return (
        <>
            <SEO
                title="Hoglr - PostHog"
                description="An old-school blog dashboard in the PostHog grab bag."
                image="/images/og/default.png"
            />
            <Editor maxWidth="100%" hasPadding={false} className="bg-[#3a5775]">
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
                                <span className="relative hidden text-white after:absolute after:-bottom-3 after:left-1/2 after:size-2 after:-translate-x-1/2 after:rotate-45 after:bg-[#2c4762] @lg:inline">
                                    Dashboard
                                </span>
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
                            <div className="flex items-start gap-2 @lg:gap-4">
                                <div className="size-10 shrink-0 overflow-hidden rounded-[3px] bg-white @lg:size-14 @3xl:size-16">
                                    <img
                                        src="/images/sparks-joy/hoglr/dj-hoggie.webp"
                                        alt="PostHog's DJ Hoggie avatar"
                                        className="size-full object-contain"
                                        width="64"
                                        height="64"
                                    />
                                </div>
                                <section
                                    aria-label="Post types"
                                    className="relative min-w-0 flex-1 rounded-md bg-[#fdfdfc] p-2 text-[#32495c] shadow-[0_1px_2px_#1c364f] before:absolute before:-left-1 before:top-5 before:size-2 before:rotate-45 before:bg-[#fdfdfc]"
                                >
                                    <ul className="grid grid-cols-4 gap-1 text-center @lg:grid-cols-7">
                                        {postTypes.map(({ label, Icon }, index) => (
                                            <li
                                                key={label}
                                                className="min-w-0 text-[10px] leading-tight text-[#536374]"
                                            >
                                                <span
                                                    className={`mx-auto mb-1 flex size-9 items-center justify-center border border-[#c5ccd0] bg-gradient-to-br from-white via-[#f3f3f0] to-[#d0d9dc] shadow-[1px_2px_2px_#acb6ba] @lg:size-10 @3xl:size-12 ${
                                                        index % 2 === 0 ? '-rotate-6' : 'rotate-3'
                                                    }`}
                                                >
                                                    <Icon className="size-5 text-[#6c8390] drop-shadow-[1px_1px_0_white] @lg:size-6 @3xl:size-7" />
                                                </span>
                                                {label}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </div>

                            <div aria-label="Recent activity" className="space-y-px">
                                {posts.map((post, index) => {
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
                                                    {index === 0 ? 'started following you' : 'reblogged letmecook'}
                                                </span>
                                                {index === 0 ? (
                                                    <IconUser
                                                        aria-hidden="true"
                                                        className="size-3 shrink-0 opacity-50"
                                                    />
                                                ) : (
                                                    <IconHeart
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
                                {posts.map((post) => {
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
                                <p className="m-0 px-2 py-1.5 text-[#bac9d5]">＋ Add and remove</p>
                            </div>
                            <div className="overflow-hidden rounded-[3px] bg-[#455f78]">
                                <p className="m-0 flex items-center gap-1.5 border-b border-[#3a5775] px-2 py-1.5 text-[#d8e0e7]">
                                    <IconHeart className="size-3.5" /> Liked posts
                                </p>
                                <p className="m-0 flex items-center gap-1.5 border-b border-[#3a5775] px-2 py-1.5 font-semibold">
                                    <IconList className="size-3.5" /> hoglr dashboard
                                </p>
                                <Link
                                    to="/sparks-joy"
                                    state={{ newWindow: true }}
                                    className="block px-2 py-1.5 text-[#bac9d5]"
                                >
                                    Explore more tags
                                </Link>
                            </div>
                            <div
                                aria-hidden="true"
                                className="flex items-center justify-between rounded-[3px] bg-[#455f78] px-2 py-1.5 text-[#bac9d5]"
                            >
                                Search Tags <IconSearch className="size-3.5" />
                            </div>
                            <div className="aspect-square overflow-hidden rounded-[3px] bg-white shadow-[0_1px_2px_#1c364f]">
                                <img
                                    src="/images/sparks-joy/hoglr/hoggie-radar.webp"
                                    alt="Hoggie in a red top"
                                    className="size-full object-contain"
                                    width="216"
                                    height="216"
                                />
                            </div>
                            <p className="m-0 flex items-center gap-2 text-[#bac9d5]">
                                <img
                                    src="/images/sparks-joy/hoglr/dj-hoggie.webp"
                                    alt=""
                                    className="size-5 rounded-sm bg-white object-contain"
                                    width="20"
                                    height="20"
                                />
                                Hoggie radar
                            </p>
                        </aside>
                    </div>
                </div>
            </Editor>
        </>
    )
}
