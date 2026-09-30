import React, { useEffect, useState } from "react"
import { HedgehogDj } from "@posthog/brand/hoggies"
import ArenaLogo from "components/CustomerLogos/ArenaLogo"
import ElevenLabsLogo from "components/CustomerLogos/ElevenLabsLogo"
import FireworksAILogo from "components/CustomerLogos/FireworksAILogo"
import HeygenLogo from "components/CustomerLogos/HeygenLogo"
import RaycastLogo from "components/CustomerLogos/RaycastLogo"
import SupabaseLogo from "components/CustomerLogos/SupabaseLogo"
import YCombinatorLogo from "components/CustomerLogos/YCombinatorLogo"
import Link from "components/Link"
import ReaderView from "components/ReaderView"
import SEO from "components/seo"

const friends = [
    { name: "YC", url: "https://www.ycombinator.com/", Logo: YCombinatorLogo },
    { name: "Supabase", url: "https://supabase.com/", Logo: SupabaseLogo, darkLogo: true },
    { name: "ElevenLabs", url: "https://elevenlabs.io/", Logo: ElevenLabsLogo },
    { name: "Raycast", url: "https://www.raycast.com/", Logo: RaycastLogo },
    { name: "Arena", url: "https://arena.ai/", Logo: ArenaLogo },
    { name: "HeyGen", url: "https://www.heygen.com/", Logo: HeygenLogo, darkLogo: true },
    { name: "Legora", url: "https://legora.com/" },
    { name: "Fireworks", url: "https://fireworks.ai/", Logo: FireworksAILogo, darkLogo: true },
]

type BlogPost = { title: string; description: string; url: string }

export default function MySpace(): JSX.Element {
    const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
    const [status, setStatus] = useState<"online" | "issue" | "unknown">("unknown")

    useEffect(() => {
        const controller = new AbortController()

        fetch("https://posthog.com/rss.xml", { signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error("Blog feed unavailable")
                return response.text()
            })
            .then((xml) => {
                const feed = new DOMParser().parseFromString(xml, "application/xml")
                const entries = Array.from(feed.querySelectorAll("item"))
                const latest = entries.sort(
                    (first, second) =>
                        new Date(second.querySelector("pubDate")?.textContent || 0).getTime() -
                        new Date(first.querySelector("pubDate")?.textContent || 0).getTime()
                )[0]
                const url = latest?.querySelector("link")?.textContent
                if (!url || new URL(url).origin !== "https://posthog.com") return

                if (!controller.signal.aborted) {
                    setBlogPost({
                        title: latest.querySelector("title")?.textContent || "Latest from PostHog",
                        description: latest.querySelector("description")?.textContent || "",
                        url: new URL(url).pathname,
                    })
                }
            })
            .catch(() => {
                if (!controller.signal.aborted) setBlogPost(null)
            })

        fetch("https://www.posthogstatus.com/api/v1/summary", { signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error("Status unavailable")
                return response.json()
            })
            .then((summary) => {
                if (
                    !controller.signal.aborted &&
                    Array.isArray(summary.ongoing_incidents) &&
                    Array.isArray(summary.in_progress_maintenances)
                ) {
                    setStatus(
                        summary.ongoing_incidents.length || summary.in_progress_maintenances.length ? "issue" : "online"
                    )
                }
            })
            .catch(() => {
                if (!controller.signal.aborted) setStatus("unknown")
            })

        return () => controller.abort()
    }, [])

    return (
        <>
            <SEO title="PostHog's MySpace" description="What if PostHog had a MySpace profile?" />
            <ReaderView hideLeftSidebar hideRightSidebar hideAppOptions showQuestions={false}>
                <div className="@container not-prose mx-auto w-full max-w-5xl pb-12 font-sans text-primary">
                    <header className="bg-blue px-4 py-3 text-light-1">
                        <div className="flex flex-wrap items-end justify-between gap-2">
                            <p className="m-0 text-2xl font-black tracking-tight">
                                myspace<span className="text-sm">™</span>
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
                            <Link to="/customers" className="!text-light-1">
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
                                        <div className="flex aspect-square items-center justify-center border border-blue/40 bg-blue/10 p-2">
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
                                                    {status === "online"
                                                        ? "● Online now"
                                                        : status === "issue"
                                                        ? "● Status update"
                                                        : "Check online status"}
                                                </Link>
                                            </p>
                                            <p>Last login: 1 second ago</p>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-xs">
                                        View my: <Link to="/customers">Friends</Link> | <Link to="/fm">Mixtapes</Link> |{" "}
                                        <Link to="/blog">Blog</Link>
                                    </p>
                                </section>

                                <section className="border border-blue/40" aria-labelledby="contact-heading">
                                    <h2
                                        id="contact-heading"
                                        className="bg-blue px-2 py-1 text-sm font-bold text-light-1"
                                    >
                                        Contacting PostHog
                                    </h2>
                                    <div className="grid grid-cols-2 gap-x-2 gap-y-2 p-3 text-xs font-semibold">
                                        <Link to="/talk-to-a-human">Send message</Link>
                                        <Link to="/customers">Add to friends</Link>
                                        <Link to="/community">Join community</Link>
                                        <Link to="https://github.com/PostHog" external>
                                            Follow the code
                                        </Link>
                                    </div>
                                </section>

                                <p className="border border-blue/40 px-2 py-1 text-xs">
                                    <strong>MySpace URL:</strong> posthog.com/myspace
                                </p>

                                <section className="border border-blue/40" aria-labelledby="info-heading">
                                    <h2 id="info-heading" className="bg-blue px-2 py-1 text-sm font-bold text-light-1">
                                        PostHog: General info
                                    </h2>
                                    <dl className="grid grid-cols-[90px_1fr] gap-px bg-blue/20 text-xs">
                                        <dt className="bg-blue/10 p-2 font-bold">Influences</dt>
                                        <dd className="m-0 bg-primary p-2">
                                            <Link to="/handbook/company/culture">Building in public</Link>,{" "}
                                            <Link to="https://github.com/PostHog" external>
                                                open source
                                            </Link>
                                            , and the joy of shipping.
                                        </dd>
                                        <dt className="bg-blue/10 p-2 font-bold">Music</dt>
                                        <dd className="m-0 bg-primary p-2">
                                            <Link to="/fm">PostHog FM</Link>
                                        </dd>
                                        <dt className="bg-blue/10 p-2 font-bold">Books</dt>
                                        <dd className="m-0 bg-primary p-2">
                                            <Link to="/handbook/people/bookhog">
                                                Exhalation, Dune, and The Spy and the Traitor
                                            </Link>{" "}
                                            (BookHog picks)
                                        </dd>
                                    </dl>
                                </section>
                            </div>

                            <div className="min-w-0 space-y-5">
                                <section className="border border-primary" aria-label="Music player">
                                    <div className="flex justify-between bg-accent px-3 py-2 text-sm font-bold">
                                        <span>♫ music</span>
                                        <Link to="/fm" className="text-xs font-normal">
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
                                            <Link
                                                to="/fm"
                                                className="mt-2 inline-block border border-light-1 px-3 py-1 text-xs !text-light-1 hover:bg-blue"
                                            >
                                                ▶ Play a mixtape
                                            </Link>
                                        </div>
                                    </div>
                                </section>

                                <section aria-labelledby="blog-heading">
                                    <h2
                                        id="blog-heading"
                                        className="border-b border-blue/40 bg-blue/10 px-2 py-1 text-sm font-bold"
                                    >
                                        PostHog's latest blog entry
                                    </h2>
                                    <div className="px-2 py-3 text-sm">
                                        {blogPost ? (
                                            <>
                                                <Link to={blogPost.url} className="font-semibold">
                                                    {blogPost.title}
                                                </Link>
                                                <p className="mt-2 text-secondary">{blogPost.description}</p>
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
                                    <h2 id="about-heading" className="bg-orange/30 px-2 py-1 text-sm font-bold">
                                        About me
                                    </h2>
                                    <p className="px-2 py-3 text-sm">
                                        I build product tools. I like open source code, short experiments, and data that
                                        changes my plans. I share my work. If a new feature does not help people, I
                                        change it. I also collect hedgehog drawings.
                                    </p>
                                </section>

                                <section aria-labelledby="friends-heading">
                                    <h2
                                        id="friends-heading"
                                        className="flex flex-wrap items-center justify-between gap-2 bg-orange/30 px-2 py-1 text-sm font-bold"
                                    >
                                        PostHog's Top 8{" "}
                                        <Link to="/customers" className="text-xs font-normal">
                                            View all friends
                                        </Link>
                                    </h2>
                                    <div className="grid grid-cols-2 gap-2 p-2 @md:grid-cols-4">
                                        {friends.map(({ name, url, Logo, darkLogo }) => (
                                            <a
                                                key={name}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Visit ${name}`}
                                                className="flex min-w-0 flex-col items-center gap-2 border border-blue/40 bg-accent p-2 text-center text-xs font-semibold text-primary hover:border-blue"
                                            >
                                                <span
                                                    className={`flex h-14 w-full items-center justify-center overflow-hidden p-2 ${
                                                        darkLogo
                                                            ? "bg-light-12 text-light-1"
                                                            : "bg-light-1 text-light-12"
                                                    }`}
                                                >
                                                    {Logo ? (
                                                        <Logo className="h-full w-full fill-current object-contain" />
                                                    ) : (
                                                        <span className="text-sm font-bold">Legora</span>
                                                    )}
                                                </span>
                                                {name}
                                            </a>
                                        ))}
                                    </div>
                                </section>

                                <section aria-labelledby="comments-heading">
                                    <h2 id="comments-heading" className="bg-orange/30 px-2 py-1 text-sm font-bold">
                                        Comments (1)
                                    </h2>
                                    <div className="border-b border-blue/30 px-2 py-3 text-sm">
                                        <p className="font-bold">
                                            James Hawkins{" "}
                                            <span className="font-normal text-secondary">· fictional comment</span>
                                        </p>
                                        <p>
                                            Uber for dogs. The dogs are the drivers. We will measure repeat rides before
                                            we raise money.
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
