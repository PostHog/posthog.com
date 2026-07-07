import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import dayjs from 'dayjs'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import { Accordion } from 'components/RadixUI/Accordion'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { ChoppyReveal } from 'components/Code/ChoppyReveal'
import {
    StickerBulb,
    StickerMicroscope,
    StickerRun,
    StickerTerminal,
    StickerUsers,
    StickerZZZ,
} from 'components/Stickers/Stickers'
import usePostHog from 'hooks/usePostHog'
import {
    IconArrowRight,
    IconBrain,
    IconCalendar,
    IconFlask,
    IconMap,
    IconNewspaper,
    IconPullRequest,
} from '@posthog/icons'
import { useEvents, type Event } from './events'

// ─────────────────────────────────────────────
// Section header (sticker + kicker + title + subtitle)
// ─────────────────────────────────────────────

function SectionHeader({
    sticker: Sticker,
    kicker,
    title,
    subtitle,
}: {
    sticker: React.ComponentType<{ className?: string }>
    kicker: string
    title: string
    subtitle?: React.ReactNode
}) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-1.5">
                <Sticker className="size-8 -rotate-3" />
                <span className="text-xs font-semibold uppercase tracking-widest text-secondary">{kicker}</span>
            </div>
            <h2 className="text-2xl m-0 mb-2">{title}</h2>
            {subtitle && <p className="text-secondary max-w-2xl m-0">{subtitle}</p>}
        </div>
    )
}

// ─────────────────────────────────────────────
// Hero (H1 is a live PostHog experiment: research-page-h1)
// ─────────────────────────────────────────────

const H1_VARIANTS: Record<'control' | 'test', string> = {
    control: "If we knew what we were doing, it wouldn't be called research.",
    test: "We're training models on product data to build software that fixes itself",
}

function HeroSection({ teamCrestUrl }: { teamCrestUrl?: string }) {
    const posthog = usePostHog()
    const [variant, setVariant] = useState<'control' | 'test'>('control')

    useEffect(() => {
        const ph = posthog as any
        ph?.onFeatureFlags?.(() => {
            setVariant(ph?.getFeatureFlag?.('research-page-h1') === 'test' ? 'test' : 'control')
        })
    }, [posthog])

    return (
        <section className="my-6 @4xl/editor:mb-12 tracking-[-0.0125em] max-w-5xl mx-auto w-full">
            <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <IconBrain className="size-10 text-purple" />
                    <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
                        PostHog Research
                    </span>
                </div>
                {teamCrestUrl && (
                    <Link
                        to="/teams/ai-research"
                        state={{ newWindow: true }}
                        className="group flex flex-col items-center shrink-0 no-underline"
                    >
                        <img
                            src={teamCrestUrl}
                            alt="AI Research team crest"
                            className="size-20 @xl:size-28 object-contain transition-transform duration-150 group-hover:scale-105 group-hover:-rotate-2"
                        />
                        <span className="text-xs text-secondary group-hover:text-primary group-hover:underline mt-1 text-center">
                            Meet the AI Research team
                        </span>
                    </Link>
                )}
            </div>

            <h1 className="text-xl @xl:text-3xl font-bold leading-tight mb-4 !mt-0 max-w-3xl">
                <ChoppyReveal wordDelay={45}>{H1_VARIANTS[variant]}</ChoppyReveal>
            </h1>

            <div className="inline-flex items-start gap-2 border border-primary rounded bg-accent px-3 py-2 mb-6 max-w-2xl">
                <IconFlask className="size-5 text-purple shrink-0 mt-0.5" />
                <p className="text-sm text-secondary m-0">
                    That headline is a live A/B experiment we're running – you're seeing variant{' '}
                    <strong className="text-primary">{variant === 'control' ? 'A' : 'B'}</strong>, half of visitors get
                    the other one, and we're measuring which makes people stick around. Yes, we're{' '}
                    <Link to="/experiments" state={{ newWindow: true }} className="underline">
                        running an experiment
                    </Link>{' '}
                    on our own research page. How meta.
                </p>
            </div>

            <div className="max-w-2xl space-y-3">
                <p>
                    PostHog helps you{' '}
                    <RoughAnnotation
                        type="highlight"
                        color="rgba(48, 164, 108, 0.2)"
                        strokeWidth={1}
                        padding={2}
                        delay={300}
                    >
                        ship fixes while you sleep
                    </RoughAnnotation>
                    , but we can't do that with your standard, off-the-shelf ideas and apps. That's why we're training
                    our own models, building open source tools, and pursuing all sorts of hare-brained schemes. It's
                    research. It's fine.
                </p>
                <p className="text-sm text-secondary">
                    Find out why this important in{' '}
                    <Link to="/blog/posthogs-next-chapter" state={{ newWindow: true }} className="underline">
                        our master plan for PostHog
                    </Link>
                    .
                </p>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Research roadmap
// ─────────────────────────────────────────────

type RoadmapStatus = 'in progress' | 'up next' | 'help wanted'

const STATUS_STYLES: Record<RoadmapStatus, string> = {
    'in progress': 'border-green text-green',
    'up next': 'border-primary text-secondary',
    'help wanted': 'border-red text-red',
}

const ROADMAP_ITEMS: { title: string; description: string; status: RoadmapStatus }[] = [
    {
        title: 'Data labeling suite',
        description:
            'Tooling to label anonymized product data, so models learn the difference between "delighted user" and "user rage-clicking the checkout button".',
        status: 'in progress',
    },
    {
        title: 'Session replay text renderer',
        description:
            'Rendering the DOM data behind replays as text a model can read. Session replay, but legible to LLMs at scale.',
        status: 'in progress',
    },
    {
        title: 'Write data prep pipeline',
        description:
            'Anonymizing and normalizing opted-in data before any of it goes near a model. The least glamorous step, and the one we refuse to get wrong.',
        status: 'in progress',
    },
    {
        title: 'Build the sampling pipeline',
        description:
            'Picking sessions and events that reflect real product usage, not noise. Garbage in, garbage out – so, no garbage.',
        status: 'up next',
    },
    {
        title: 'Train the Replay encoder model',
        description:
            'A model trained on the raw data behind session replay, so analyzing 10,000 replays takes seconds instead of taking your afternoon.',
        status: 'up next',
    },
    {
        title: 'Train the end-to-end agent',
        description:
            'Agents that predict and simulate user behavior, catch problems before you ship, and hand you a fix instead of a dashboard.',
        status: 'help wanted',
    },
    {
        title: 'Build the model observability suite',
        description:
            'Dogfooding our own LLM analytics to trace, evaluate, and debug every model we train. Research you can watch happen.',
        status: 'in progress',
    },
    {
        title: 'Build an eval dataset',
        description:
            'A benchmark of real product problems to score every model iteration against, so progress is provable rather than vibes.',
        status: 'in progress',
    },
]

function StatusStamp({ status, rotate }: { status: RoadmapStatus; rotate: string }) {
    const base = `absolute -top-2.5 right-3 ${rotate} border-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-primary ${STATUS_STYLES[status]}`

    if (status === 'help wanted') {
        return (
            <Link
                to="/careers/ai-research-engineer"
                state={{ newWindow: true }}
                className={`${base} no-underline transition-transform duration-150 hover:scale-110 hover:rotate-0`}
                title="Yes, this is a job ad"
            >
                Help wanted
            </Link>
        )
    }
    return <span className={base}>{status}</span>
}

function RoadmapSection() {
    return (
        <section className="mb-12 px-4 @xl:px-8">
            <SectionHeader
                sticker={StickerMicroscope}
                kicker="The pipeline"
                title="What we're researching right now"
                subtitle="Here are just some of the things the AI Research team is currently thinking about, working on, or begging for help with."
            />
            <div className="grid @lg:grid-cols-2 gap-4">
                {ROADMAP_ITEMS.map((item, index) => (
                    <div
                        key={item.title}
                        className="group relative border border-primary rounded bg-accent p-4 flex gap-4 transition-all duration-150 hover:border-purple hover:bg-primary hover:-translate-y-1 hover:shadow-lg"
                    >
                        <StatusStamp status={item.status} rotate={index % 2 === 0 ? 'rotate-2' : '-rotate-2'} />
                        <span className="text-3xl font-bold text-muted tabular-nums leading-none pt-0.5 transition-colors duration-150 group-hover:text-purple">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                            <h3 className="text-base font-bold m-0 mb-1">{item.title}</h3>
                            <p className="text-sm text-secondary m-0 transition-colors duration-150 group-hover:text-primary">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Fresh from the lab (merged PRs, live from GitHub)
// ─────────────────────────────────────────────

const RESEARCHER_HANDLES = ['nicowaltz', 'robbie-c', 'joshsny', 'MarconLP', 'k11kirky', 'jamesefhawkins']

type MergedPR = {
    title: string
    url: string
    repo: string
    author: string
    mergedAt?: string
}

function ShippedSection() {
    const [prs, setPrs] = useState<MergedPR[] | null>(null)

    useEffect(() => {
        const query = `org:posthog is:pr is:merged -repo:posthog/posthog.com ${RESEARCHER_HANDLES.map(
            (handle) => `author:${handle}`
        ).join(' ')}`
        fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(query)}&sort=updated&order=desc&per_page=8`)
            .then((response) => (response.ok ? response.json() : Promise.reject(new Error(response.statusText))))
            .then((data) => {
                const items = Array.isArray(data?.items) ? data.items : []
                setPrs(
                    items.map((item: any) => ({
                        title: item.title,
                        url: item.html_url,
                        repo: item.repository_url?.split('/').pop() ?? 'posthog',
                        author: item.user?.login ?? 'unknown',
                        mergedAt: item.pull_request?.merged_at ?? item.closed_at,
                    }))
                )
            })
            .catch(() => setPrs([]))
    }, [])

    return (
        <section className="mb-12 px-4 @xl:px-8">
            <SectionHeader
                sticker={StickerTerminal}
                kicker="Live from GitHub"
                title="Fresh from the lab"
                subtitle="Merged pull requests from the AI research team, pulled live from GitHub across PostHog's public repos. This is how we know they aren't just sitting around eating ramen like other academics."
            />

            <div className="border border-primary rounded overflow-hidden mb-6 shadow-lg">
                <div className="flex items-center gap-1.5 px-3 py-2 bg-accent border-b border-primary">
                    <span className="size-2.5 rounded-full bg-red" />
                    <span className="size-2.5 rounded-full bg-yellow" />
                    <span className="size-2.5 rounded-full bg-green" />
                    <span className="ml-2 text-xs font-mono text-secondary truncate">
                        ai-research – git log --merges
                    </span>
                </div>
                {prs && prs.length > 0 ? (
                    <div className="bg-primary">
                        {prs.map((pr) => (
                            <Link
                                key={pr.url}
                                to={pr.url}
                                externalNoIcon
                                className="group border-t border-primary first:border-t-0 px-4 py-2.5 flex flex-col @md:flex-row @md:items-center gap-1 @md:gap-3 no-underline text-primary transition-colors duration-150 hover:bg-accent"
                            >
                                <span className="inline-flex items-center gap-1.5 shrink-0 @md:w-36">
                                    <IconPullRequest className="size-4 text-purple shrink-0" />
                                    <span className="text-xs font-mono text-secondary truncate">{pr.repo}</span>
                                </span>
                                <span className="flex-1 font-mono text-sm group-hover:underline truncate">
                                    {pr.title}
                                </span>
                                <span className="text-xs font-mono text-secondary shrink-0">
                                    @{pr.author}
                                    {pr.mergedAt ? ` · ${dayjs(pr.mergedAt).format('MMM D')}` : ''}
                                </span>
                            </Link>
                        ))}
                        <div className="border-t border-primary px-4 py-2 text-xs font-mono text-secondary">
                            <span className="animate-pulse">▋</span> agents still working…
                        </div>
                    </div>
                ) : (
                    <div className="bg-primary p-6 text-center">
                        <IconPullRequest className="size-8 text-muted mx-auto mb-2" />
                        <p className="font-semibold font-mono text-sm m-0 mb-1">
                            {prs === null ? '$ fetching merged PRs…' : '$ error 403: GitHub is rate-limiting us. Fair.'}
                        </p>
                        <p className="text-sm text-secondary m-0">
                            The work continues regardless – see it at the source.
                        </p>
                    </div>
                )}
            </div>

            <OSButton
                asLink
                to="https://github.com/PostHog"
                external
                size="md"
                icon={<IconArrowRight />}
                iconPosition="right"
            >
                Browse PostHog on GitHub
            </OSButton>
        </section>
    )
}

// ─────────────────────────────────────────────
// Research blog posts (tagged "Research")
// ─────────────────────────────────────────────

type PostAuthor = {
    name: string
    role?: string
    link_type?: string
    link_url?: string
    profile?: { avatar?: { url?: string } }
}

type ResearchPost = {
    id: string
    fields: { slug: string }
    frontmatter: {
        title: string
        date: string
        featuredImage?: {
            publicURL?: string
            childImageSharp?: any
        }
        authors?: PostAuthor[]
    }
}

function PostCard({ post }: { post: ResearchPost }) {
    const image = post.frontmatter.featuredImage?.childImageSharp
        ? getImage(post.frontmatter.featuredImage.childImageSharp)
        : undefined
    const author = post.frontmatter.authors?.[0]

    return (
        <Link
            to={post.fields.slug}
            state={{ newWindow: true }}
            className="group h-full border border-primary rounded bg-accent overflow-hidden flex flex-col no-underline text-primary transition-all duration-150 hover:border-purple hover:-translate-y-1 hover:shadow-lg"
        >
            <div className="relative aspect-video shrink-0 bg-primary overflow-hidden">
                {image ? (
                    <GatsbyImage
                        image={image}
                        alt={post.frontmatter.title}
                        className="!absolute inset-0 w-full h-full"
                        imgClassName="object-cover"
                    />
                ) : post.frontmatter.featuredImage?.publicURL ? (
                    <img
                        src={post.frontmatter.featuredImage.publicURL}
                        alt={post.frontmatter.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <IconNewspaper className="size-8 text-muted" />
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-base font-bold m-0 mb-2 leading-snug group-hover:underline line-clamp-3 min-h-[4.125rem]">
                    {post.frontmatter.title}
                </h3>
                <div className="mt-auto flex items-center gap-2 text-sm text-secondary">
                    {author?.profile?.avatar?.url && (
                        <img src={author.profile.avatar.url} alt="" className="size-6 rounded-full bg-primary" />
                    )}
                    {author && <span className="truncate">{author.name}</span>}
                    <span className="ml-auto shrink-0">{post.frontmatter.date}</span>
                </div>
            </div>
        </Link>
    )
}

function ResearchPostsSection({ posts }: { posts: ResearchPost[] }) {
    return (
        <section className="mb-12 px-4 @xl:px-8">
            <SectionHeader
                sticker={StickerBulb}
                kicker="The receipts"
                title="Research in the open"
                subtitle="We publish what we learn as we go – the big wins, the disastrous errors, the cancelled projects we gave up on along the way."
            />
            <div className="grid @md:grid-cols-2 @xl:grid-cols-3 auto-rows-fr gap-4 mb-6">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
            <OSButton
                asLink
                to="/blog/tags/research"
                state={{ newWindow: true }}
                size="md"
                icon={<IconArrowRight />}
                iconPosition="right"
            >
                View all research posts
            </OSButton>
        </section>
    )
}

// ─────────────────────────────────────────────
// Who's doing research at PostHog?
// ─────────────────────────────────────────────

type TeamProfile = {
    id: string
    attributes?: {
        firstName?: string
        lastName?: string
        companyRole?: string
        avatar?: { data?: { attributes?: { url?: string } } }
    }
}

type Researcher = {
    name: string
    role?: string
    avatar?: string
    link?: string
    external?: boolean
}

function PeopleSection({ teamProfiles, posts }: { teamProfiles: TeamProfile[]; posts: ResearchPost[] }) {
    const teamMembers: Researcher[] = teamProfiles.map((profile) => ({
        name: [profile.attributes?.firstName, profile.attributes?.lastName].filter(Boolean).join(' '),
        role: profile.attributes?.companyRole ?? 'AI Research',
        avatar: profile.attributes?.avatar?.data?.attributes?.url,
        link: `/community/profiles/${profile.id}`,
    }))

    const seen = new Set(teamMembers.map((member) => member.name.toLowerCase()))
    const authors: Researcher[] = []
    posts.forEach((post) => {
        post.frontmatter.authors?.forEach((author) => {
            if (!author.name || seen.has(author.name.toLowerCase())) return
            seen.add(author.name.toLowerCase())
            authors.push({
                name: author.name,
                role: author.role ?? 'Writes about it',
                avatar: author.profile?.avatar?.url,
                link: author.link_url ?? undefined,
                external: !!author.link_url && !author.link_url.startsWith('/'),
            })
        })
    })

    const everyone = [...teamMembers, ...authors]
    if (everyone.length === 0) return null

    return (
        <section className="mb-12 px-4 @xl:px-8">
            <SectionHeader
                sticker={StickerUsers}
                kicker="The humans"
                title="Who's doing research at PostHog?"
                subtitle="The AI Research team isn't the only team doing science stuff. Everyone at PostHog can pitch in on our research, or write about it. Here are all the people contributing to our research."
            />
            <div className="flex flex-wrap gap-3">
                {everyone.map((person) => {
                    const card = (
                        <span className="flex items-center gap-2.5 border border-primary rounded bg-accent pl-2 pr-4 py-2 transition-all duration-150 group-hover:border-purple group-hover:-translate-y-0.5">
                            {person.avatar ? (
                                <img
                                    src={person.avatar}
                                    alt=""
                                    className="size-10 rounded-full bg-primary object-cover"
                                />
                            ) : (
                                <span className="size-10 rounded-full bg-primary flex items-center justify-center">
                                    <IconBrain className="size-5 text-muted" />
                                </span>
                            )}
                            <span className="flex flex-col">
                                <span className="text-sm font-bold leading-tight">{person.name}</span>
                                {person.role && (
                                    <span className="text-xs text-secondary leading-tight">{person.role}</span>
                                )}
                            </span>
                        </span>
                    )

                    return person.link ? (
                        <Link
                            key={person.name}
                            to={person.link}
                            className="group no-underline text-primary"
                            {...(person.external ? { externalNoIcon: true } : { state: { newWindow: true } })}
                        >
                            {card}
                        </Link>
                    ) : (
                        <span key={person.name} className="group text-primary">
                            {card}
                        </span>
                    )
                })}
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Events
// ─────────────────────────────────────────────

function EventsSection() {
    const { events } = useEvents()

    const upcomingTalks = events
        .filter(
            (event: Event) =>
                !event.private &&
                new Date(event.date) >= new Date(new Date().toDateString()) &&
                (event.speakers?.length || event.speakerTopic)
        )
        .sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 4)

    return (
        <section className="mb-12 px-4 @xl:px-8">
            <SectionHeader
                sticker={StickerRun}
                kicker="On tour"
                title="Attend a PostHog lecture"
                subtitle="OK, it's probably less of a lecture and more like a meet-up, but still. Our engineers take this show on the road whenever they can find a tolerant audience and somewhere to plug in a projector."
            />

            {upcomingTalks.length > 0 ? (
                <div className="space-y-3 mb-6">
                    {upcomingTalks.map((event: Event) => (
                        <Link
                            key={event.id}
                            to={`/events/${event.id}`}
                            state={{ newWindow: true }}
                            className="group border border-primary rounded bg-accent p-4 flex flex-col @md:flex-row @md:items-center gap-2 @md:gap-4 no-underline text-primary transition-all duration-150 hover:border-purple hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-center gap-2 text-sm text-secondary @md:w-40 shrink-0">
                                <IconCalendar className="size-4 shrink-0" />
                                {dayjs(event.date).format('MMM D, YYYY')}
                            </div>
                            <div className="flex-1">
                                <span className="font-bold group-hover:underline">{event.name}</span>
                                {event.speakerTopic && (
                                    <p className="text-sm text-secondary m-0">{event.speakerTopic}</p>
                                )}
                                {event.speakers && event.speakers.length > 0 && (
                                    <p className="text-sm text-secondary m-0">Featuring {event.speakers.join(', ')}</p>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-secondary shrink-0">
                                <IconMap className="size-4 shrink-0" />
                                {event.online ? 'Online' : event.location?.label}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="border border-primary rounded bg-accent p-6 text-center mb-6">
                    <StickerZZZ className="size-12 mx-auto mb-2 -rotate-3" />
                    <p className="font-semibold m-0 mb-1">No research talks on the calendar right now</p>
                    <p className="text-sm text-secondary m-0">
                        The researchers are busy researching. Check back soon for more upcoming events!
                    </p>
                </div>
            )}

            <OSButton
                asLink
                to="/events"
                state={{ newWindow: true }}
                size="md"
                icon={<IconArrowRight />}
                iconPosition="right"
            >
                See all events
            </OSButton>
        </section>
    )
}

// ─────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────

const FAQ_ITEMS = [
    {
        trigger: 'Do you train models and do research using my data?',
        content: (
            <div className="space-y-2">
                <p>
                    Only with the guardrails we published up front: users on our EU cloud are opted out of model
                    training by default, as is anyone with an agreement that prevents training (BAA, MSA, or similar).
                    Other US cloud users are opted in by default. Everything is anonymized before training, we train
                    in-house, and nothing goes to third-party model providers.
                </p>
                <p>
                    The full internet-friendly numbered list is in{' '}
                    <Link to="/blog/training-ai-models" state={{ newWindow: true }} className="underline">
                        Training our own AI models
                    </Link>
                    .
                </p>
            </div>
        ),
    },
    {
        trigger: 'Can I ask you not to train with my data?',
        content: (
            <p>
                Yes, at any time, in your{' '}
                <Link to="https://app.posthog.com/settings/organization-details" external className="underline">
                    organization settings
                </Link>{' '}
                (admin access required). No dark patterns, no exit interview.
            </p>
        ),
    },
    {
        trigger: 'Will you sell my data, or models trained on it?',
        content: <p>Easy answer: No.</p>,
    },
    {
        trigger: 'Can I be a researcher too?',
        content: (
            <p>
                Yes! We're hiring –{' '}
                <Link to="/careers/ai-research-engineer" state={{ newWindow: true }} className="underline">
                    AI research engineers
                </Link>
                and nearly all our code if open-source so you can contribute directly. Research should be transparent,
                right?
            </p>
        ),
    },
]

function FAQSection() {
    return (
        <section className="mb-12 px-4 @xl:px-8 max-w-2xl">
            <h2 className="text-2xl m-0 mb-6">Questions you were about to ask</h2>
            <Accordion
                type="multiple"
                triggerClassName="!px-3 !py-2"
                contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                items={FAQ_ITEMS}
            />
        </section>
    )
}

// ─────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────

function CTASection() {
    return (
        <section className="mb-12 px-4 @xl:px-8">
            <div className="relative border border-primary rounded overflow-hidden p-6 @xl:p-8 text-center">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_9608fcca70.png"
                    className="dark:hidden absolute inset-0"
                    imgClassName="h-full w-full object-cover"
                />
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_dark_a92b0e022d.png"
                    className="hidden dark:block absolute inset-0"
                    imgClassName="h-full w-full object-cover"
                />
                <div className="relative">
                    <h2 className="text-2xl m-0 mb-2">Use the research before it's finished</h2>
                    <p className="text-secondary max-w-xl mx-auto mb-6">
                        Most of this ships as public betas long before it's polished. See what we're building this week,
                        or flip on feature previews and break something new.
                    </p>
                    <div className="flex flex-col @md:flex-row items-center justify-center gap-3">
                        <OSButton asLink to="/wip" state={{ newWindow: true }} variant="primary" size="md">
                            See what we're working on
                        </OSButton>
                        <OSButton
                            asLink
                            to="https://app.posthog.com/settings/user-feature-previews"
                            external
                            variant="secondary"
                            size="md"
                        >
                            Enable feature previews
                        </OSButton>
                    </div>
                </div>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function ResearchPage({
    data,
}: {
    data: {
        researchPosts: { nodes: ResearchPost[] }
        aiResearchTeam?: {
            crest?: { data?: { attributes?: { url?: string } } }
            profiles?: { data?: TeamProfile[] }
        }
    }
}) {
    const teamCrestUrl = data.aiResearchTeam?.crest?.data?.attributes?.url
    const teamProfiles = data.aiResearchTeam?.profiles?.data ?? []

    return (
        <>
            <SEO
                title="PostHog Research"
                description="The cutting-edge research PostHog is working on: training models on product data, replay encoders, and agents that fix problems while you sleep."
            />
            <Editor slug="/research" maxWidth="100%" hasPadding={false} disableFormatting>
                <div className="@container not-prose font-rounded">
                    <header className="relative mb-12">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_9608fcca70.png"
                            className="dark:hidden absolute inset-0"
                            imgClassName="h-full w-full"
                        />
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_dark_a92b0e022d.png"
                            className="hidden dark:block absolute inset-0"
                            imgClassName="h-full w-full"
                        />
                        <div className="relative flex flex-col items-center w-full px-4 @xl:px-8 py-4">
                            <HeroSection teamCrestUrl={teamCrestUrl} />
                        </div>
                    </header>

                    <div className="max-w-5xl mx-auto">
                        <RoadmapSection />

                        <ShippedSection />

                        <ResearchPostsSection posts={data.researchPosts.nodes} />

                        <PeopleSection teamProfiles={teamProfiles} posts={data.researchPosts.nodes} />

                        <EventsSection />

                        <FAQSection />

                        <CTASection />
                    </div>
                </div>
            </Editor>
        </>
    )
}

export const query = graphql`
    {
        researchPosts: allMdx(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { isFuture: { eq: false }, frontmatter: { tags: { in: ["Research"] }, date: { ne: null } } }
        ) {
            nodes {
                ...BlogFragment
            }
        }
        aiResearchTeam: squeakTeam(slug: { eq: "ai-research" }) {
            crest {
                data {
                    attributes {
                        url
                    }
                }
            }
            profiles {
                data {
                    id
                    attributes {
                        firstName
                        lastName
                        companyRole
                        avatar {
                            data {
                                attributes {
                                    url
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`
