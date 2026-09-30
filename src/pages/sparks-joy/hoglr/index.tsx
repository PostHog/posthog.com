import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import {
    IconArrowUpRight,
    IconChat,
    IconGear,
    IconHeart,
    IconImage,
    IconList,
    IconMicrophone,
    IconPencil,
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

const posts = [
    {
        author: 'James',
        lastName: 'Hawkins',
        kind: 'Text',
        title: 'Shipping this before I overthink it',
        body: 'I made a tiny blog to see if people still like tiny blogs. If not, I can make a dashboard about it.',
    },
    {
        author: 'Charles',
        lastName: 'Cook',
        kind: 'Quote',
        title: 'A short marketing plan',
        body: 'Make something weird. Put it on the internet. See if anyone smiles.',
    },
    {
        author: 'James',
        lastName: 'Hawkins',
        kind: 'Link',
        title: 'Things that spark joy',
        body: 'There are more little projects in the grab bag.',
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

    const avatarFor = (firstName: string, lastName: string) =>
        teamMembers.find((member) => member.firstName === firstName && member.lastName === lastName)?.avatar?.url

    return (
        <>
            <SEO
                title="Hoglr - PostHog"
                description="A fictional blog dashboard with posts from James and Charles, made for the PostHog grab bag."
                image="/images/og/default.png"
            />
            <Editor maxWidth="100%" hasPadding={false} className="bg-navy">
                <div className="not-prose @container min-h-screen bg-blue-2/20 text-light-1">
                    <header className="bg-navy/30">
                        <div className="mx-auto flex max-w-[48rem] items-center gap-6 px-3 py-1 @lg:px-5 @lg:pl-8">
                            <h1 className="w-40 shrink-0 font-serif text-[2.5rem] font-black leading-none tracking-tight">
                                hoglr
                            </h1>
                            <nav
                                aria-label="Hoglr navigation"
                                className="flex items-center gap-3 text-[11px] font-semibold"
                            >
                                <span className="text-light-1">Dashboard</span>
                                <span className="hidden text-light-2/70 @lg:inline">James</span>
                                <span className="hidden text-light-2/70 @xl:inline">Charles</span>
                                <Link
                                    to="/sparks-joy"
                                    state={{ newWindow: true }}
                                    className="hidden text-light-2/70 @2xl:inline"
                                >
                                    Sparks Joy
                                </Link>
                                <span aria-hidden="true" className="hidden items-center gap-2 text-light-2/70 @lg:flex">
                                    <IconList className="size-4" />
                                    <IconQuestion className="size-4" />
                                    <IconGear className="size-4" />
                                </span>
                            </nav>
                        </div>
                    </header>

                    <div className="mx-auto grid max-w-[48rem] gap-3 px-3 py-2 @lg:px-5 @lg:pl-8 @xl:grid-cols-[minmax(0,1fr)_9rem]">
                        <div className="min-w-0 space-y-3">
                            <div className="flex items-start gap-2 @lg:gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded bg-light-1 @lg:size-11">
                                    <img src="/brand/posthog-logomark.svg" alt="" className="size-8 object-contain" />
                                </div>
                                <section
                                    aria-label="Post types"
                                    className="relative min-w-0 flex-1 rounded-md bg-light-1 p-2 text-navy shadow-sm before:absolute before:-left-1 before:top-4 before:size-2 before:rotate-45 before:bg-light-1"
                                >
                                    <ul className="grid grid-cols-4 gap-1 text-center @lg:grid-cols-7">
                                        {postTypes.map(({ label, Icon }) => (
                                            <li key={label} className="min-w-0 text-[10px] leading-tight text-light-11">
                                                <span className="mx-auto mb-1 flex size-8 items-center justify-center rounded-sm border border-light-4 bg-light-2 shadow-sm @lg:size-9">
                                                    <Icon className="size-5 text-navy" />
                                                </span>
                                                {label}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </div>

                            <div className="flex items-start gap-2 @lg:gap-3">
                                <div
                                    aria-hidden="true"
                                    className="flex w-10 shrink-0 flex-col items-end gap-0.5 @lg:w-11"
                                >
                                    {['James', 'Charles'].map((name) => (
                                        <span
                                            key={name}
                                            className="flex size-5 items-center justify-center rounded-sm bg-light-2 font-serif text-xs font-bold text-navy"
                                        >
                                            {name[0]}
                                        </span>
                                    ))}
                                </div>
                                <div className="min-w-0 flex-1 divide-y divide-light-1/10 rounded-sm bg-navy/40 text-[10px] text-light-2/80">
                                    <p className="m-0 px-2 py-1.5 leading-3">James started following you</p>
                                    <p className="m-0 px-2 py-1.5 leading-3">Charles liked your post</p>
                                </div>
                            </div>

                            <section aria-label="Fictional posts" className="space-y-3">
                                {posts.map((post) => {
                                    const avatar = avatarFor(post.author, post.lastName)
                                    return (
                                        <article key={post.title} className="flex items-start gap-2 @lg:gap-3">
                                            <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-light-2 font-serif text-xl font-bold text-navy @lg:size-11">
                                                {avatar ? (
                                                    <img src={avatar} alt="" className="size-full object-cover" />
                                                ) : (
                                                    post.author[0]
                                                )}
                                            </div>
                                            <div className="relative min-w-0 flex-1 rounded-md bg-light-1 px-3 py-2.5 text-navy shadow-sm before:absolute before:-left-1 before:top-4 before:size-2 before:rotate-45 before:bg-light-1">
                                                <div className="flex flex-wrap items-center justify-between gap-x-2 text-[10px] text-light-9">
                                                    <span>{post.author.toLowerCase()}:</span>
                                                    <span aria-hidden="true" className="flex items-center gap-2">
                                                        <span>reply</span>
                                                        <span>reblog</span>
                                                        <IconHeart className="size-3" />
                                                    </span>
                                                </div>
                                                <h2 className="mt-2 font-serif text-lg font-bold leading-tight underline">
                                                    {post.title}
                                                </h2>
                                                <p className="mb-0 mt-1 text-xs leading-relaxed">{post.body}</p>
                                                {post.kind === 'Link' && (
                                                    <Link
                                                        to="/sparks-joy"
                                                        state={{ newWindow: true }}
                                                        className="mt-2 inline-block text-xs font-semibold underline"
                                                    >
                                                        Open the grab bag
                                                    </Link>
                                                )}
                                            </div>
                                        </article>
                                    )
                                })}
                            </section>
                        </div>

                        <aside aria-label="Hoglr sidebar" className="space-y-3 text-[10px]">
                            <div className="overflow-hidden rounded-sm bg-navy/30">
                                <Link
                                    to="/people"
                                    state={{ newWindow: true }}
                                    className="flex items-center gap-1 whitespace-nowrap bg-green px-1.5 py-1.5 text-[10px] font-semibold leading-4 text-navy"
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
                            <div
                                aria-hidden="true"
                                className="flex aspect-[2/1] items-center justify-center rounded-sm bg-teal-2-dark/80"
                            >
                                <img src="/brand/posthog-logomark.svg" alt="" className="size-10 opacity-70" />
                            </div>
                            <p className="m-0 flex items-center gap-2 text-light-2/70">
                                <span className="flex size-5 items-center justify-center rounded-full bg-light-2 text-navy">
                                    h
                                </span>
                                hoglr radar
                            </p>
                        </aside>
                    </div>
                </div>
            </Editor>
        </>
    )
}
