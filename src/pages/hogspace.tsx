import React, { useEffect, useMemo, useState } from 'react'
import { HedgehogDj } from '@posthog/brand/hoggies'
import { IconGithub, IconGroups, IconHeartPlus, IconSend } from '@posthog/icons'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import { extractVideoId } from 'components/TapePlayer/utils'
import { AVATAR_FALLBACK_URL } from 'constants/index'
import { useMixtapes } from 'hooks/useMixtapes'

const ABOUT_ME = `hai every1 im new!!!!!!! im PostHog, the little hog of analytics doom XD\u0020\u0020
i watch users click the wrong button 47 times and call it “insight” *holds up spork*\u0020\u0020
then i ship a feature flag to 100% of users by accident and say “rawr, statistically significant”\u0020\u0020
anyway this is not a phase, mother, it’s a funnel.`

type BlogPost = { title: string; snippet: string; url: string }
type Friend = { squeakId: number; firstName: string | null; lastName: string | null; avatar: { url: string } | null }

export default function Hogspace(): JSX.Element {
    const { team }: { team: { nodes: Friend[] } } = useStaticQuery(graphql`
        query HogspaceFriends {
            team: allSqueakProfile(
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
    `)
    const { mixtapes, isLoading: mixtapesLoading } = useMixtapes()
    const playableMixtapes = useMemo(
        () =>
            mixtapes
                .map((mixtape) => ({
                    id: mixtape.id,
                    title: mixtape.attributes.title,
                    videoIds: mixtape.attributes.tracks
                        .map((track) => extractVideoId(track.youtubeUrl))
                        .filter((videoId) => /^[a-zA-Z0-9_-]{11}$/.test(videoId)),
                }))
                .filter((mixtape) => mixtape.videoIds.length > 0),
        [mixtapes]
    )
    const [selectedMixtape, setSelectedMixtape] = useState<{ id: number; title: string; src: string } | null>(null)
    const [friends, setFriends] = useState<Friend[]>([])
    const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
    const [status, setStatus] = useState<'online' | 'issue' | 'unknown'>('unknown')

    useEffect(() => {
        const people = team.nodes.filter((person) => person.squeakId && (person.firstName || person.lastName))
        for (let index = people.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(Math.random() * (index + 1))
            const selected = people[index]
            people[index] = people[randomIndex]
            people[randomIndex] = selected
        }
        setFriends(people.slice(0, 8))
    }, [team.nodes])

    useEffect(() => {
        const controller = new AbortController()

        fetch('https://posthog.com/rss.xml', { signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error('Blog feed unavailable')
                return response.text()
            })
            .then((xml) => {
                const feed = new DOMParser().parseFromString(xml, 'application/xml')
                const entries = Array.from(feed.querySelectorAll('item'))
                const latest = entries.sort(
                    (first, second) =>
                        new Date(second.querySelector('pubDate')?.textContent || 0).getTime() -
                        new Date(first.querySelector('pubDate')?.textContent || 0).getTime()
                )[0]
                const url = latest?.querySelector('link')?.textContent
                if (!url || new URL(url).origin !== 'https://posthog.com') return
                const html = latest.getElementsByTagNameNS('http://purl.org/rss/1.0/modules/content/', 'encoded')[0]
                    ?.textContent
                const paragraphs = Array.from(
                    new DOMParser().parseFromString(html || '', 'text/html').querySelectorAll('p')
                )
                    .slice(0, 2)
                    .map((paragraph) => paragraph.textContent?.trim())
                    .filter(Boolean)
                const text = paragraphs.join(' ').replace(/\s+/g, ' ')
                const snippet = text.length > 300 ? `${text.slice(0, 300).replace(/\s+\S*$/, '')}…` : text

                if (!controller.signal.aborted) {
                    setBlogPost({
                        title: latest.querySelector('title')?.textContent || 'Latest from PostHog',
                        snippet,
                        url: new URL(url).pathname,
                    })
                }
            })
            .catch(() => {
                if (!controller.signal.aborted) setBlogPost(null)
            })

        fetch('https://www.posthogstatus.com/api/v1/summary', { signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error('Status unavailable')
                return response.json()
            })
            .then((summary) => {
                if (
                    !controller.signal.aborted &&
                    Array.isArray(summary.ongoing_incidents) &&
                    Array.isArray(summary.in_progress_maintenances)
                ) {
                    setStatus(
                        summary.ongoing_incidents.length || summary.in_progress_maintenances.length ? 'issue' : 'online'
                    )
                }
            })
            .catch(() => {
                if (!controller.signal.aborted) setStatus('unknown')
            })

        return () => controller.abort()
    }, [])

    return (
        <>
            <SEO title="Hogspace – PostHog" description="PostHog's Hogspace profile" />
            <ReaderView hideLeftSidebar hideRightSidebar hideAppOptions showQuestions={false}>
                <div className="@container not-prose mx-auto w-full max-w-5xl pb-12 font-sans text-primary">
                    <header className="bg-ai-blue px-4 py-3 text-light-1">
                        <div className="flex flex-wrap items-end justify-between gap-2">
                            <p className="m-0 flex items-end gap-1 text-2xl font-black tracking-tight">
                                <span className="flex items-end gap-0.5 pb-1" aria-hidden="true">
                                    <img
                                        src="/images/hedgehog.svg"
                                        alt=""
                                        className="h-3.5 w-auto brightness-0 invert"
                                    />
                                    <img
                                        src="/images/hedgehog.svg"
                                        alt=""
                                        className="h-[18px] w-auto brightness-0 invert"
                                    />
                                    <img src="/images/hedgehog.svg" alt="" className="h-6 w-auto brightness-0 invert" />
                                </span>
                                Hogspace
                            </p>
                            <Link to="/sparks-joy" className="text-xs !text-light-1 underline">
                                Back to Time machine
                            </Link>
                        </div>
                        <nav
                            className="mt-3 flex flex-wrap gap-x-5 gap-y-1 border-t border-light-1/30 pt-2 text-xs"
                            aria-label="Profile links"
                        >
                            <Link to="/" className="!text-light-1">
                                Home
                            </Link>
                            <Link to="/about" className="!text-light-1">
                                Profile
                            </Link>
                            <Link to="/people" className="!text-light-1">
                                Friends
                            </Link>
                            <Link to="/fm" className="!text-light-1">
                                Music
                            </Link>
                            <Link to="/blog" className="!text-light-1">
                                Blog
                            </Link>
                        </nav>
                    </header>

                    <main className="border border-primary bg-primary p-3 @lg:p-5">
                        <div className="grid min-w-0 gap-5 @3xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                            <div className="min-w-0 space-y-5">
                                <section aria-labelledby="profile-name">
                                    <h1 id="profile-name" className="mb-1 text-xl font-bold">
                                        PostHog
                                    </h1>
                                    <p className="mb-3 text-xs text-secondary">Indie / Open source / Building</p>
                                    <div className="grid grid-cols-[minmax(0,140px)_minmax(0,1fr)] gap-3">
                                        <div className="flex aspect-square items-center justify-center border border-pale-blue-dark bg-pale-blue/40 p-2 dark:bg-pale-blue-dark/20">
                                            <HedgehogDj
                                                title="PostHog hedgehog DJ"
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <p>
                                                Everywhere
                                                <br />
                                                Fully remote
                                            </p>
                                            <p>
                                                <Link
                                                    to="https://status.posthog.com"
                                                    external
                                                    className="font-semibold"
                                                >
                                                    {status === 'online'
                                                        ? '● Online now'
                                                        : status === 'issue'
                                                        ? '● Status update'
                                                        : 'Check online status'}
                                                </Link>
                                            </p>
                                            <p>Last login: 1 second ago</p>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-xs">
                                        View my: <Link to="/people">Friends</Link> | <Link to="/fm">Mixtapes</Link> |{' '}
                                        <Link to="/blog">Blog</Link>
                                    </p>
                                </section>

                                <section className="border border-pale-blue-dark" aria-labelledby="contact-heading">
                                    <h2
                                        id="contact-heading"
                                        className="bg-pale-blue-dark px-2 py-1 text-sm font-bold text-light-1"
                                    >
                                        Contacting PostHog
                                    </h2>
                                    <div className="grid grid-cols-2 gap-x-2 gap-y-2 p-3 text-xs font-semibold">
                                        <Link to="/talk-to-a-human" className="flex items-center gap-1.5">
                                            <IconSend className="size-4 shrink-0 text-ai-blue" aria-hidden="true" />
                                            Send message
                                        </Link>
                                        <Link to="/people" className="flex items-center gap-1.5">
                                            <IconHeartPlus
                                                className="size-4 shrink-0 text-ai-blue"
                                                aria-hidden="true"
                                            />
                                            Add to friends
                                        </Link>
                                        <Link to="/community" className="flex items-center gap-1.5">
                                            <IconGroups className="size-4 shrink-0 text-ai-blue" aria-hidden="true" />
                                            Join community
                                        </Link>
                                        <Link to="https://github.com/PostHog" external className="whitespace-nowrap">
                                            <span className="inline-flex items-center gap-1.5">
                                                <IconGithub
                                                    className="size-4 shrink-0 text-ai-blue"
                                                    aria-hidden="true"
                                                />
                                                Follow the code
                                            </span>
                                        </Link>
                                    </div>
                                </section>

                                <p className="border border-pale-blue-dark px-2 py-1 text-xs">
                                    <strong>Hogspace URL:</strong> posthog.com/hogspace
                                </p>

                                <section className="border border-pale-blue-dark" aria-labelledby="info-heading">
                                    <h2
                                        id="info-heading"
                                        className="bg-pale-blue-dark px-2 py-1 text-sm font-bold text-light-1"
                                    >
                                        PostHog: General info
                                    </h2>
                                    <dl className="grid grid-cols-[90px_1fr] gap-px bg-pale-blue-dark/50 text-xs">
                                        <dt className="bg-pale-blue p-2 font-bold text-light-12">Influences</dt>
                                        <dd className="m-0 bg-primary p-2">
                                            <Link to="/handbook/company/culture">Building in public</Link>,{' '}
                                            <Link to="https://github.com/PostHog" external>
                                                open source
                                            </Link>
                                            , and the joy of shipping.
                                        </dd>
                                        <dt className="bg-pale-blue p-2 font-bold text-light-12">Music</dt>
                                        <dd className="m-0 bg-primary p-2">
                                            <Link to="/fm">PostHog FM</Link>
                                        </dd>
                                        <dt className="bg-pale-blue p-2 font-bold text-light-12">Books</dt>
                                        <dd className="m-0 bg-primary p-2">
                                            <Link to="/handbook/people/bookhog">
                                                Exhalation, Dune, and The Spy and the Traitor
                                            </Link>{' '}
                                            (BookHog picks)
                                        </dd>
                                    </dl>
                                </section>
                            </div>

                            <div className="min-w-0 space-y-5">
                                <section className="border border-primary" aria-label="Music player">
                                    <div className="flex justify-between bg-light-3 px-3 py-2 text-sm font-bold text-light-12">
                                        <span>♫ music</span>
                                        <Link to="/fm" className="text-xs font-normal !text-light-12">
                                            Open player ↗
                                        </Link>
                                    </div>
                                    <div className="flex items-center gap-4 bg-light-12 p-4 text-light-1">
                                        <div
                                            className="flex size-16 shrink-0 items-center justify-center bg-blue/30 text-3xl"
                                            aria-hidden="true"
                                        >
                                            ♫
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="m-0 text-sm font-semibold">PostHog FM</p>
                                            <p className="m-0 text-xs">Mixtapes for people who build software.</p>
                                            {mixtapesLoading ? (
                                                <p className="mt-2 text-xs">Loading mixtapes…</p>
                                            ) : playableMixtapes.length &&
                                              (!selectedMixtape || playableMixtapes.length > 1) ? (
                                                <button
                                                    type="button"
                                                    className="mt-2 border border-light-1 px-3 py-1 text-xs text-light-1 hover:bg-blue"
                                                    onClick={() => {
                                                        const choices = playableMixtapes.filter(
                                                            (mixtape) => mixtape.id !== selectedMixtape?.id
                                                        )
                                                        const mixtape =
                                                            choices[Math.floor(Math.random() * choices.length)]
                                                        const [firstVideo, ...remainingVideos] = mixtape.videoIds
                                                        const parameters = new URLSearchParams({
                                                            autoplay: '1',
                                                            playsinline: '1',
                                                        })
                                                        if (remainingVideos.length) {
                                                            parameters.set('playlist', remainingVideos.join(','))
                                                        }
                                                        setSelectedMixtape({
                                                            id: mixtape.id,
                                                            title: mixtape.title,
                                                            src: `https://www.youtube-nocookie.com/embed/${firstVideo}?${parameters}`,
                                                        })
                                                    }}
                                                >
                                                    {selectedMixtape
                                                        ? '↻ Play another mixtape'
                                                        : '▶ Play a random mixtape'}
                                                </button>
                                            ) : !selectedMixtape ? (
                                                <Link
                                                    to="/fm"
                                                    className="mt-2 inline-block text-xs !text-light-1 underline"
                                                >
                                                    Explore mixtapes ↗
                                                </Link>
                                            ) : null}
                                        </div>
                                    </div>
                                    {selectedMixtape && (
                                        <div className="bg-light-12 px-4 pb-4 text-light-1">
                                            <p className="mb-2 text-xs">Now playing: {selectedMixtape.title}</p>
                                            <iframe
                                                src={selectedMixtape.src}
                                                title={`PostHog FM: ${selectedMixtape.title}`}
                                                className="aspect-video w-full border-0"
                                                allow="autoplay; encrypted-media; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    )}
                                </section>

                                <section aria-labelledby="blog-heading">
                                    <h2
                                        id="blog-heading"
                                        className="border-b border-pale-blue-dark/50 bg-pale-blue px-2 py-1 text-sm font-bold text-light-12"
                                    >
                                        PostHog's latest blog entry
                                    </h2>
                                    <div className="px-2 py-3 text-sm">
                                        {blogPost ? (
                                            <>
                                                <Link to={blogPost.url} className="font-semibold">
                                                    {blogPost.title}
                                                </Link>
                                                {blogPost.snippet && (
                                                    <p className="mt-2 text-secondary">{blogPost.snippet}</p>
                                                )}
                                            </>
                                        ) : (
                                            <Link to="/blog">Read the latest post on the blog ↗</Link>
                                        )}
                                        <Link to="/blog" className="block text-xs">
                                            View all blog entries
                                        </Link>
                                    </div>
                                </section>

                                <section aria-labelledby="about-heading">
                                    <h2
                                        id="about-heading"
                                        className="bg-creamsicle px-2 py-1 text-sm font-bold text-light-12"
                                    >
                                        About me
                                    </h2>
                                    <p className="whitespace-pre-wrap px-2 py-3 text-sm">{ABOUT_ME}</p>
                                </section>

                                <section aria-labelledby="friends-heading">
                                    <h2
                                        id="friends-heading"
                                        className="flex flex-wrap items-center justify-between gap-2 bg-creamsicle px-2 py-1 text-sm font-bold text-light-12"
                                    >
                                        PostHog's Top 8{' '}
                                        <Link to="/people" className="text-xs font-normal !text-light-12">
                                            View all friends
                                        </Link>
                                    </h2>
                                    <div className="grid grid-cols-2 gap-2 p-2 @md:grid-cols-4">
                                        {friends.map(({ squeakId, firstName, lastName, avatar }) => (
                                            <Link
                                                key={squeakId}
                                                to={`/community/profiles/${squeakId}`}
                                                className="flex min-w-0 flex-col items-center gap-2 border border-pale-blue-dark bg-pale-blue/30 p-2 text-center text-xs font-semibold text-primary hover:border-blue dark:bg-pale-blue-dark/20"
                                            >
                                                <span className="flex h-14 w-full items-center justify-center overflow-hidden bg-light-1 p-1">
                                                    <img
                                                        src={avatar?.url || AVATAR_FALLBACK_URL}
                                                        alt=""
                                                        loading="lazy"
                                                        className="h-full w-full object-contain"
                                                    />
                                                </span>
                                                {[firstName, lastName].filter(Boolean).join(' ')}
                                            </Link>
                                        ))}
                                        {!friends.length && <Link to="/people">View people at PostHog</Link>}
                                    </div>
                                </section>

                                <section aria-labelledby="comments-heading">
                                    <h2
                                        id="comments-heading"
                                        className="bg-creamsicle px-2 py-1 text-sm font-bold text-light-12"
                                    >
                                        Comments (1)
                                    </h2>
                                    <div className="border-b border-pale-blue-dark/50 px-2 py-3 text-sm">
                                        <p className="font-bold">
                                            James Hawkins{' '}
                                            <span className="font-normal text-secondary">· 1 second ago</span>
                                        </p>
                                        <p>
                                            Hi I am raising money for my startup, it's like Uber for dogs, but the dogs
                                            are the drivers. Pls respond, I think this could be huge.
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </main>
                </div>
            </ReaderView>
        </>
    )
}
