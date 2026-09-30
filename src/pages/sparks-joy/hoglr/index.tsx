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
    lastName?: string
    rebloggedFrom?: string
    image: string
    imageAlt: string
}[] = [
    {
        author: 'James',
        lastName: 'Hawkins',
        image: '/images/sparks-joy/hoglr/james-pivot.webp',
        imageAlt: 'A parody pull request to stop James from building Uber for Dogs, with dogs as the drivers.',
    },
    {
        author: 'Lottie',
        rebloggedFrom: 'Charles',
        image: '/images/sparks-joy/hoglr/dictator-or-tech-bro.webp',
        imageAlt: 'Two Hoggie characters dressed as a tech bro and a dictator for the quiz.',
    },
]

type TeamMember = {
    firstName: string
    lastName: string
    avatar?: { url?: string }
}

export default function Hoglr(): JSX.Element {
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
                    avatar {
                        url
                    }
                }
            }
        }
    `)

    const avatarFor = (firstName: string, lastName?: string) =>
        teamMembers.find((member) => member.firstName === firstName && (!lastName || member.lastName === lastName))
            ?.avatar?.url

    return (
        <>
            <SEO
                title="Hoglr - PostHog"
                description="An old-school blog dashboard in the PostHog grab bag."
                image="/images/og/default.png"
            />
            <Editor maxWidth="100%" hasPadding={false} className="bg-navy">
                <div className="not-prose @container min-h-screen bg-blue-2/20 text-light-1">
                    <header className="bg-navy/30">
                        <div className="mx-auto flex max-w-[56.25rem] items-center justify-between gap-4 px-3 py-1 @lg:px-5">
                            <h1 className="shrink-0 font-serif text-[3rem] font-black leading-none tracking-tight">
                                hoglr
                            </h1>
                            <nav
                                aria-label="Hoglr navigation"
                                className="flex items-center gap-3 text-[11px] font-semibold @3xl:gap-5"
                            >
                                <span className="text-light-1">Dashboard</span>
                                <Link
                                    to="/sparks-joy"
                                    state={{ newWindow: true }}
                                    className="hidden text-light-2/70 @lg:inline"
                                >
                                    Sparks Joy
                                </Link>
                                <span
                                    aria-hidden="true"
                                    className="hidden items-center gap-2 text-light-2/70 @lg:flex @3xl:gap-4"
                                >
                                    <IconPlus className="hidden size-4 @3xl:block" />
                                    <IconMessage className="hidden size-4 @3xl:block" />
                                    <IconQuestion className="size-4" />
                                    <IconGear className="size-4" />
                                    <span className="hidden text-xl leading-none @3xl:inline">⏻</span>
                                </span>
                            </nav>
                        </div>
                    </header>

                    <div className="mx-auto grid max-w-[56.25rem] gap-4 rounded-xl bg-navy/30 px-3 py-4 @lg:px-5 @3xl:grid-cols-[minmax(0,1fr)_13.5rem] @3xl:gap-5">
                        <div className="min-w-0 space-y-4">
                            <div className="flex items-start gap-2 @lg:gap-4">
                                <div className="size-10 shrink-0 overflow-hidden rounded bg-light-1 @lg:size-14 @3xl:size-16">
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
                                    className="relative min-w-0 flex-1 rounded-md bg-light-1 p-2 text-navy shadow-sm before:absolute before:-left-1 before:top-5 before:size-2 before:rotate-45 before:bg-light-1 @lg:p-3"
                                >
                                    <ul className="grid grid-cols-4 gap-1 text-center @lg:grid-cols-7">
                                        {postTypes.map(({ label, Icon }) => (
                                            <li key={label} className="min-w-0 text-[10px] leading-tight text-light-11">
                                                <span className="mx-auto mb-1 flex size-9 items-center justify-center rounded-sm border border-light-4 bg-light-2 shadow-sm @lg:size-12">
                                                    <Icon className="size-5 text-navy @lg:size-7" />
                                                </span>
                                                {label}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </div>

                            <section aria-label="Hoglr feed" className="space-y-4">
                                {posts.map((post) => {
                                    const avatar = avatarFor(post.author, post.lastName)
                                    return (
                                        <article key={post.author} className="flex items-start gap-2 @lg:gap-4">
                                            <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-light-2 font-serif text-xl font-bold text-navy @lg:size-14 @3xl:size-16">
                                                {avatar ? (
                                                    <img src={avatar} alt="" className="size-full object-cover" />
                                                ) : (
                                                    post.author[0]
                                                )}
                                            </div>
                                            <div className="relative min-w-0 flex-1 rounded-md bg-light-1 px-3 py-3 text-navy shadow-sm before:absolute before:-left-1 before:top-5 before:size-2 before:rotate-45 before:bg-light-1 @lg:px-4">
                                                <div className="flex flex-wrap items-center justify-between gap-x-2 text-[11px] text-light-9">
                                                    <span>
                                                        <span className="font-semibold underline">
                                                            {post.author.toLowerCase()}
                                                        </span>{' '}
                                                        {post.rebloggedFrom && (
                                                            <>
                                                                reblogged{' '}
                                                                <span className="font-semibold underline">
                                                                    {post.rebloggedFrom.toLowerCase()}
                                                                </span>
                                                            </>
                                                        )}
                                                        :
                                                    </span>
                                                    <span aria-hidden="true" className="flex items-center gap-2">
                                                        <span>reblog</span>
                                                        <IconHeart className="size-3" />
                                                    </span>
                                                </div>
                                                {post.rebloggedFrom && (
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
                                                        className="block h-auto max-w-full rounded-sm border border-light-4/50"
                                                        width={post.author === 'James' ? 448 : 352}
                                                        height={post.author === 'James' ? 221 : 213}
                                                    />
                                                </a>
                                                {post.author === 'James' && (
                                                    <p className="mb-0 mt-2 text-xs text-light-11">
                                                        Uber for Dogs, where the dogs drive.
                                                    </p>
                                                )}
                                            </div>
                                        </article>
                                    )
                                })}
                            </section>
                        </div>

                        <aside aria-label="Hoglr sidebar" className="w-full max-w-[13.5rem] space-y-3 text-[11px]">
                            <div className="overflow-hidden rounded-sm bg-navy/30">
                                <Link
                                    to="/people"
                                    state={{ newWindow: true }}
                                    className="flex items-center gap-1 whitespace-nowrap bg-green px-2 py-2 font-semibold leading-4 text-navy"
                                >
                                    <IconUser className="size-3 shrink-0" />
                                    Following {teamMembers.length - 1} people
                                </Link>
                                <p className="m-0 px-2 py-1.5 text-light-2/60">＋ Add and remove</p>
                            </div>
                            <div className="space-y-0.5">
                                <p className="m-0 flex items-center gap-1.5 rounded-sm bg-navy/30 px-2 py-1.5 text-light-2/80">
                                    <IconHeart className="size-3.5" /> Liked posts
                                </p>
                                <p className="m-0 flex items-center gap-1.5 rounded-sm bg-navy/30 px-2 py-1.5 font-semibold">
                                    <IconList className="size-3.5" /> hoglr dashboard
                                </p>
                                <Link
                                    to="/sparks-joy"
                                    state={{ newWindow: true }}
                                    className="block rounded-sm bg-navy/30 px-2 py-1.5 text-light-2/60"
                                >
                                    Explore more tags
                                </Link>
                            </div>
                            <div
                                aria-hidden="true"
                                className="flex items-center justify-between rounded-sm bg-navy/30 px-2 py-1.5 text-light-2/50"
                            >
                                Search Tags <IconSearch className="size-3.5" />
                            </div>
                            <div className="aspect-square overflow-hidden rounded-sm bg-light-1">
                                <img
                                    src="/images/sparks-joy/hoglr/hoggie-radar.webp"
                                    alt="Hoggie in a red top"
                                    className="size-full object-contain"
                                    width="216"
                                    height="216"
                                />
                            </div>
                            <p className="m-0 flex items-center gap-2 text-light-2/70">
                                <img
                                    src="/images/sparks-joy/hoglr/dj-hoggie.webp"
                                    alt=""
                                    className="size-5 rounded-sm bg-light-1 object-contain"
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
