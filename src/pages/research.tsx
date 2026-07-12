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
    StickerELearning,
    StickerMicroscope,
    StickerMindMap,
    StickerRun,
    StickerTerminal,
    StickerUsers,
    StickerZZZ,
} from 'components/Stickers/Stickers'
import usePostHog from 'hooks/usePostHog'
import {
    IconArrowRight,
    IconBrain,
    IconChevronLeft,
    IconChevronRight,
    IconFlask,
    IconGlobe,
    IconMap,
    IconNewspaper,
    IconPlayFilled,
    IconPullRequest,
    IconShieldLock,
} from '@posthog/icons'
import { useToast } from '../context/Toast'
import { useApp } from '../context/App'
import { useWindow } from '../context/Window'
import MediaPlayer from 'components/MediaPlayer'
import { useEvents, type Event } from './events'
import { TeamMember } from 'components/People'

const RESEARCH_CONTENT_WIDTH = 'max-w-3xl'

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
            {subtitle && <p className="text-secondary m-0">{subtitle}</p>}
        </div>
    )
}

// ─────────────────────────────────────────────
// Hero (H1 is a live PostHog experiment: research-page-h1)
// ─────────────────────────────────────────────

const H1_TEST = "We're training models on product data to build software that fixes itself"

function ControlHeadline() {
    return (
        <>
            Our research is{' '}
            <RoughAnnotation type="highlight" color="rgba(48, 164, 108, 0.2)" strokeWidth={1} padding={2} delay={300}>
                open-source
            </RoughAnnotation>
            ,{' '}
            <RoughAnnotation type="highlight" color="rgba(182, 42, 217, 0.15)" strokeWidth={1} padding={2} delay={700}>
                responsible
            </RoughAnnotation>
            , and{' '}
            <RoughAnnotation type="underline" color="#F54E00" strokeWidth={2} delay={1100} multiline>
                helps you build better software
            </RoughAnnotation>
        </>
    )
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
        <section className="mt-2 mb-6 @4xl/editor:mb-10 tracking-[-0.0125em] w-full">
            <div className="flex items-end gap-6 mb-6">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                        <IconBrain className="size-10 text-purple" />
                        <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
                            PostHog Research
                        </span>
                    </div>

                    <h1 className="text-xl @xl:text-3xl font-bold leading-tight !mt-0 m-0">
                        {variant === 'test' ? (
                            <ChoppyReveal wordDelay={45}>{H1_TEST}</ChoppyReveal>
                        ) : (
                            <ControlHeadline />
                        )}
                    </h1>
                </div>

                {teamCrestUrl && (
                    <Link
                        to="/teams/ai-research"
                        state={{ newWindow: true }}
                        className="group hidden @lg:flex flex-col items-center shrink-0 no-underline pt-2"
                    >
                        <img
                            src={teamCrestUrl}
                            alt="AI Research team crest"
                            className="size-28 @2xl:size-36 object-contain transition-transform duration-150 group-hover:scale-105 group-hover:-rotate-2"
                        />
                        <span className="text-xs text-secondary group-hover:text-primary group-hover:underline mt-1 text-center">
                            Meet the AI Research team
                        </span>
                    </Link>
                )}
            </div>

            <div className="w-full space-y-3">
                <div className="flex items-start gap-2 border border-primary rounded bg-accent px-3 py-2 mb-6">
                    <IconFlask className="size-5 text-purple shrink-0 mt-0.5" />
                    <p className="text-sm text-secondary m-0">
                        This headline is a live A/B test – you're seeing variant{' '}
                        <strong className="text-primary">{variant === 'control' ? 'A' : 'B'}</strong>, and half of
                        visitors see the other one. We're running it with{' '}
                        <Link to="/experiments" state={{ newWindow: true }} className="underline">
                            PostHog Experiments
                        </Link>{' '}
                        on our own research page.
                    </p>
                </div>

                <p>
                    PostHog holds one of the richest behavioral datasets anywhere: how real software actually gets used,
                    across events, sessions, and replays.{' '}
                    <RoughAnnotation
                        type="highlight"
                        color="rgba(48, 164, 108, 0.2)"
                        strokeWidth={1}
                        padding={2}
                        delay={300}
                    >
                        Nobody has trained a foundation model on data like this.
                    </RoughAnnotation>{' '}
                    We're doing it – so PostHog can find and fix problems in your product while you sleep.
                    <sup className="font-semibold text-secondary">[1]</sup>
                </p>
                <p>
                    This isn't speculative: agents already create the majority of new dashboards in PostHog, and MCP
                    usage roughly doubles every month.
                    <sup className="font-semibold text-secondary">[1]</sup> The models come next.
                </p>
                <p>
                    Useful research shouldn't happen behind closed doors: our code is open source where possible, we
                    publish findings as we go, and the work is headed to arXiv and major ML conferences. Anything we
                    release at a cost is based on our{' '}
                    <Link to="/handbook/engineering/feature-pricing" state={{ newWindow: true }} className="underline">
                        pricing principles
                    </Link>
                    .
                </p>
                <p className="text-sm text-secondary m-0">
                    <IconShieldLock className="size-4 text-green inline-block align-text-bottom mr-1" />
                    EU cloud opted out by default · anonymized before training · opt out anytime –{' '}
                    <Link to="#faq" className="underline">
                        details in the FAQ
                    </Link>
                </p>
                <p className="text-xs text-secondary font-mono border-t border-primary pt-2 mt-4">
                    [1] Hawkins, J. (2026).{' '}
                    <Link to="/blog/posthogs-next-chapter" state={{ newWindow: true }} className="underline">
                        "PostHog's next chapter."
                    </Link>{' '}
                    <em>posthog.com</em>, May 2026.
                </p>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Publications (papers, preprints, technical reports)
// ─────────────────────────────────────────────

// Paste new publications here as they're released – they render automatically.
// Easiest: just the arXiv ID, and title/authors/year are fetched from the arXiv API:
//     { arxivId: '2501.00000' }
// Or provide everything yourself (required for non-arXiv venues):
//     {
//         title: 'A multi-axis rotary position embedding for session data',
//         authors: 'Waltz, N., et al.',
//         venue: 'arXiv preprint',
//         year: '2026',
//         url: 'https://arxiv.org/abs/2501.00000',
//     }
type Publication = {
    arxivId?: string
    title?: string
    authors?: string
    venue?: string
    year?: string
    url?: string
    note?: string
}

const PUBLICATIONS: Publication[] = [
    {
        arxivId: '2403.06015',
        title: 'Grafting: Making Random Forests Consistent',
        authors: 'Waltz, N.',
        year: '2024',
        note: 'Published before joining PostHog',
    },
    {
        arxivId: '2403.14798',
        title: 'Time Series Clustering Using DBSCAN',
        authors: 'Waltz, N.',
        year: '2024',
        note: 'Published before joining PostHog',
    },
]

type ResolvedPublication = Required<Pick<Publication, 'title' | 'url'>> & Publication

const resolvePublication = (paper: Publication): ResolvedPublication => ({
    ...paper,
    title: paper.title ?? (paper.arxivId ? `arXiv:${paper.arxivId}` : 'Untitled'),
    url: paper.url ?? `https://arxiv.org/abs/${paper.arxivId}`,
    venue: paper.venue ?? (paper.arxivId ? 'arXiv preprint' : undefined),
})

const toBibtex = (paper: ResolvedPublication): string => {
    const firstWord = (paper.title.split(/\s+/)[0] || 'paper').toLowerCase().replace(/[^a-z0-9]/g, '')
    const key = `posthog${paper.year ?? ''}${firstWord}`
    const fields = [
        `  title = {${paper.title}}`,
        paper.authors ? `  author = {${paper.authors}}` : null,
        paper.year ? `  year = {${paper.year}}` : null,
        paper.arxivId ? `  eprint = {${paper.arxivId}}` : null,
        paper.arxivId ? `  archivePrefix = {arXiv}` : null,
        !paper.arxivId && paper.venue ? `  journal = {${paper.venue}}` : null,
        `  url = {${paper.url}}`,
    ].filter(Boolean)
    return `@${paper.arxivId ? 'misc' : 'article'}{${key},\n${fields.join(',\n')}\n}`
}

// Fetches title/authors/year for entries that only provide an arXiv ID
const usePublications = (): ResolvedPublication[] => {
    const [publications, setPublications] = useState<ResolvedPublication[]>(PUBLICATIONS.map(resolvePublication))

    useEffect(() => {
        const pendingIds = PUBLICATIONS.filter((paper) => paper.arxivId && !paper.title).map(
            (paper) => paper.arxivId as string
        )
        if (pendingIds.length === 0) return

        fetch(`https://export.arxiv.org/api/query?id_list=${pendingIds.join(',')}`)
            .then((response) => (response.ok ? response.text() : Promise.reject(new Error(response.statusText))))
            .then((xml) => {
                const doc = new DOMParser().parseFromString(xml, 'application/xml')
                const metadataById: Record<string, Partial<Publication>> = {}
                doc.querySelectorAll('entry').forEach((entry) => {
                    const id = entry.querySelector('id')?.textContent?.match(/abs\/([^v]+)/)?.[1]
                    if (!id) return
                    metadataById[id] = {
                        title: entry.querySelector('title')?.textContent?.replace(/\s+/g, ' ').trim(),
                        authors: Array.from(entry.querySelectorAll('author > name'))
                            .map((name) => name.textContent)
                            .filter(Boolean)
                            .join(', '),
                        year: entry.querySelector('published')?.textContent?.slice(0, 4),
                    }
                })
                setPublications(
                    PUBLICATIONS.map((paper) =>
                        resolvePublication({
                            ...(paper.arxivId ? metadataById[paper.arxivId] : undefined),
                            ...paper,
                        })
                    )
                )
            })
            .catch(() => {
                // Keep the fallback rendering (arXiv ID as title, link still works)
            })
    }, [])

    return publications
}

function PublicationCard({ paper }: { paper: ResolvedPublication }) {
    const { addToast } = useToast()
    const [copied, setCopied] = useState(false)

    const copyCitation = () => {
        navigator.clipboard
            .writeText(toBibtex(paper))
            .then(() => {
                setCopied(true)
                window.setTimeout(() => setCopied(false), 2000)
            })
            .catch(() => addToast({ title: 'Copy failed', description: 'Select and copy manually.', error: true }))
    }

    return (
        <div className="pl-4 border-l-2 border-primary space-y-1">
            {(paper.authors || paper.year) && (
                <p className="text-xs text-secondary m-0">{[paper.authors, paper.year].filter(Boolean).join(' · ')}</p>
            )}
            <Link to={paper.url} external className="text-base font-bold text-primary">
                {paper.title}
            </Link>
            <p className="text-xs text-secondary m-0">
                {[paper.venue, paper.note].filter(Boolean).join(' · ')}
                {(paper.venue || paper.note) && ' · '}
                <button
                    type="button"
                    onClick={copyCitation}
                    title="Copy BibTeX citation"
                    className="text-secondary hover:text-primary underline decoration-dotted underline-offset-2 bg-transparent border-0 p-0 font-inherit cursor-pointer"
                >
                    {copied ? 'Copied' : 'Cite'}
                </button>
            </p>
        </div>
    )
}

function PublicationsSection() {
    const publications = usePublications()

    return (
        <section id="papers" className="scroll-mt-16 mb-12 px-4 @xl:px-8">
            <SectionHeader
                sticker={StickerELearning}
                kicker="Papers"
                title="Published research"
                subtitle="Papers, preprints, and technical reports from the team, all linked here."
            />

            {publications.length > 0 ? (
                <div>
                    <div className="space-y-5">
                        {publications.map((paper) => (
                            <PublicationCard key={paper.url} paper={paper} />
                        ))}
                    </div>
                    <p className="text-sm text-secondary mt-5 mb-0">
                        The first paper from our current research is in progress and will be linked here on release.
                    </p>
                </div>
            ) : (
                <div className="border border-primary rounded bg-accent p-6">
                    <p className="font-semibold m-0 mb-1">Our first paper is in progress</p>
                    <p className="text-sm text-secondary m-0">
                        Our first pretraining run is completing and the write-up is underway. Papers will be linked here
                        as they're released – arXiv first, then wherever peer review takes them.
                    </p>
                </div>
            )}
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

const ROADMAP_ITEMS: { title: string; description: string; outcome: string; status: RoadmapStatus }[] = [
    {
        title: 'Data labeling suite',
        description:
            'Tooling to label anonymized product data, so models learn what healthy and broken user sessions actually look like.',
        outcome: 'Models that recognize broken sessions',
        status: 'in progress',
    },
    {
        title: 'Session replay text renderer',
        description:
            'Rendering the DOM data behind replays as text a model can read, making replay analysis tractable at scale.',
        outcome: 'AI that watches replays at scale',
        status: 'in progress',
    },
    {
        title: 'Write data prep pipeline',
        description:
            'Anonymizing and normalizing opted-in data before any of it reaches training. The least glamorous step, and the one we refuse to get wrong.',
        outcome: 'Training never sees identifiable data',
        status: 'in progress',
    },
    {
        title: 'Build the sampling pipeline',
        description:
            'Selecting sessions and events that reflect real product usage, so training data quality matches production reality.',
        outcome: 'Models tuned to real usage, not noise',
        status: 'up next',
    },
    {
        title: 'Train the Replay encoder model',
        description:
            'A foundation model pretrained on the raw data behind session replay, using novel techniques like a multi-axis RoPE built on additive Euler angles.',
        outcome: 'Replays triaged automatically',
        status: 'up next',
    },
    {
        title: 'Train the end-to-end agent',
        description:
            'Agents that predict and simulate user behavior, catch problems before you ship, and propose the fix rather than a dashboard.',
        outcome: 'Problems caught before users find them',
        status: 'help wanted',
    },
    {
        title: 'Build the model observability suite',
        description: 'Using our own LLM analytics to trace, evaluate, and debug every model we train.',
        outcome: 'You can inspect how our models behave',
        status: 'in progress',
    },
    {
        title: 'Build an eval dataset',
        description: 'A benchmark of real product problems, so progress is measurable across every model iteration.',
        outcome: 'Provable accuracy before anything ships',
        status: 'in progress',
    },
]

function StatusStamp({ status }: { status: RoadmapStatus }) {
    const base = `inline-block shrink-0 whitespace-nowrap border-2 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-accent ${STATUS_STYLES[status]}`

    if (status === 'help wanted') {
        return (
            <Link
                to="/careers/ai-research-engineer"
                state={{ newWindow: true }}
                className={`${base} no-underline transition-transform duration-150 hover:scale-110`}
                title="We're hiring for this"
            >
                Help wanted
            </Link>
        )
    }
    return <span className={base}>{status}</span>
}

function RoadmapSection() {
    return (
        <section id="pipeline" className="scroll-mt-16 mb-12 px-4 @xl:px-8">
            <SectionHeader
                sticker={StickerMicroscope}
                kicker="The pipeline"
                title="What we're researching right now"
                subtitle="The team's current pipeline, in rough order. Each stage of pretraining breaks new ground, and each will produce papers and technical reports."
            />
            <ul className="m-0 p-0 list-none divide-y divide-primary">
                {ROADMAP_ITEMS.map((item, index) => (
                    <li key={item.title} className="py-5">
                        <div className="flex gap-4">
                            <span className="text-3xl font-bold text-muted tabular-nums leading-none shrink-0 pt-0.5">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <div className="min-w-0 flex-1">
                                <div className="grid grid-cols-[1fr_auto] items-start gap-x-3 mb-1">
                                    <h3 className="text-base font-bold m-0">{item.title}</h3>
                                    <StatusStamp status={item.status} />
                                </div>
                                <p className="text-sm text-secondary m-0 leading-relaxed">{item.description}</p>
                                <p className="text-xs text-secondary m-0 mt-2">
                                    <span className="font-semibold text-green">In practice:</span> {item.outcome}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

// ─────────────────────────────────────────────
// Open problems (technical depth + recruiting)
// ─────────────────────────────────────────────

const OPEN_PROBLEMS: { title: string; body: string }[] = [
    {
        title: 'Positional embeddings for session data',
        body: 'Session data isn\'t a flat token sequence: it has time, DOM depth, and user-action order as separate axes, and standard rotary embeddings collapse them. We\'re extending RoPE to multiple axes using additive Euler angles, so the model keeps all three notions of "position" without blowing up the attention pattern.',
    },
    {
        title: 'Making replays legible to models',
        body: 'A session replay is a stream of DOM mutations – far too large and too structural to feed to a model directly. The open question is a rendering that preserves what matters (layout, interaction targets, state changes) at a token budget that makes training on millions of sessions economical.',
    },
    {
        title: 'Evaluating agents that change what they measure',
        body: "An agent that ships fixes alters the product it's being evaluated on, so static benchmarks go stale immediately. We're building an eval dataset from real product problems, and working out how to score models against a moving target without fooling ourselves.",
    },
]

function OpenProblemsSection() {
    return (
        <section id="problems" className="scroll-mt-16 mb-12 px-4 @xl:px-8">
            <SectionHeader
                sticker={StickerMindMap}
                kicker="Open problems"
                title="Problems we haven't solved yet"
                subtitle="The hardest parts of the pipeline, stated plainly. If one of these nerd-snipes you, that's the idea."
            />
            <ul className="m-0 p-0 list-none divide-y divide-primary mb-6">
                {OPEN_PROBLEMS.map(({ title, body }, index) => (
                    <li
                        key={title}
                        className={index === 0 ? 'pb-4' : index === OPEN_PROBLEMS.length - 1 ? 'pt-4' : 'py-4'}
                    >
                        <h3 className="text-base font-bold m-0">{title}</h3>
                        <p className="text-sm text-secondary m-0 mt-1 leading-relaxed">{body}</p>
                    </li>
                ))}
            </ul>

            <div className="border border-primary rounded bg-accent p-4">
                <p className="font-semibold m-0 mb-1">Want to own one of these?</p>
                <p className="text-sm text-secondary m-0 mb-3">
                    We're hiring researchers to take these problems from whiteboard to arXiv, with the dataset, compute,
                    and freedom to publish.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                    <OSButton
                        asLink
                        to="/careers/ai-research-engineer"
                        state={{ newWindow: true }}
                        variant="primary"
                        size="md"
                    >
                        AI research engineer role
                    </OSButton>
                    <Link
                        to="/teams/ai-research"
                        state={{ newWindow: true }}
                        className="text-sm font-semibold underline"
                    >
                        Meet the team
                    </Link>
                </div>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Fresh from the lab (merged PRs, sourced at build time)
// ─────────────────────────────────────────────

type MergedPR = {
    title: string
    url: string
    repo: string
    author: string
    mergedAt?: string | null
}

function ShippedSection({ prs }: { prs: MergedPR[] }) {
    return (
        <section id="shipped" className="scroll-mt-16 mb-12 px-4 @xl:px-8">
            <SectionHeader
                sticker={StickerTerminal}
                kicker="From GitHub"
                title="Fresh from the lab"
                subtitle="Recently merged feature work from the research team."
            />

            <div className="border border-primary rounded overflow-hidden mb-6 shadow-lg">
                <div className="flex items-center gap-1.5 px-3 py-2 bg-accent border-b border-primary">
                    <span className="size-2.5 rounded-full bg-red" />
                    <span className="size-2.5 rounded-full bg-yellow" />
                    <span className="size-2.5 rounded-full bg-green" />
                    <span className="ml-2 text-xs font-mono text-secondary truncate">
                        gh search prs --merged -- org:posthog team:ai-research
                    </span>
                </div>
                {prs.length > 0 ? (
                    <div className="bg-primary">
                        {prs.map((pr) => (
                            <Link
                                key={pr.url}
                                to={pr.url}
                                externalNoIcon
                                className="group border-t border-primary first:border-t-0 px-4 py-2.5 flex flex-col @md:flex-row @md:items-center gap-1 @md:gap-2 no-underline text-primary transition-colors duration-150 hover:bg-accent"
                            >
                                <span className="inline-flex items-center gap-1.5 shrink-0">
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
                        <p className="font-semibold font-mono text-sm m-0 mb-1">$ no recent merged PRs to show</p>
                        <p className="text-sm text-secondary m-0">Browse the team's work directly on GitHub.</p>
                    </div>
                )}
            </div>

            <OSButton asLink to="https://github.com/PostHog" external size="md">
                Browse PostHog on GitHub
            </OSButton>
        </section>
    )
}

// ─────────────────────────────────────────────
// Research blog posts (tagged "Research")
// ─────────────────────────────────────────────

type SqueakProfileFields = {
    squeakId?: number
    firstName?: string
    lastName?: string
    companyRole?: string
    country?: string
    location?: string
    color?: string
    biography?: string
    pineappleOnPizza?: boolean
    startDate?: string
    avatar?: { url?: string }
    teams?: { data?: { id: string; attributes?: { name?: string; slug?: string } }[] }
    leadTeams?: { data?: { attributes?: { name?: string } }[] }
}

type PostAuthor = {
    name: string
    role?: string
    link_type?: string
    link_url?: string
    profile_id?: number
    profile?: SqueakProfileFields
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
            className="group h-full border border-primary rounded bg-accent overflow-hidden flex flex-col no-underline text-primary hover:-translate-y-0.5 hover:shadow-md transition-all duration-150"
        >
            <div className="relative aspect-video shrink-0 bg-primary overflow-hidden">
                {image ? (
                    <GatsbyImage
                        image={image}
                        alt={post.frontmatter.title}
                        className="!absolute inset-0 w-full h-full"
                        imgClassName="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : post.frontmatter.featuredImage?.publicURL ? (
                    <img
                        src={post.frontmatter.featuredImage.publicURL}
                        alt={post.frontmatter.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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

// Recordings of talks – add new ones here as they're published.
const TALKS: { videoId: string; title: string; byline: string }[] = [
    {
        videoId: 'zMiSRliEzv4',
        title: 'Self-driving products: product signals to pull requests',
        byline: 'Joshua Snyder · AI Engineer',
    },
    {
        videoId: 'juoNbJiZUi0',
        title: "LLM codegen fails and how to stop 'em",
        byline: 'Danilo Campos · AI Engineer',
    },
    {
        videoId: 'Yw4AR6Zuckc',
        title: "PostHog's wild bet on AI coding",
        byline: 'James Hawkins · The Secure Disclosure',
    },
]

function ResearchTalkPlayer({
    videoId,
    title,
}: {
    videoId: string
    title: string
    newWindow?: boolean
    location?: { pathname: string }
    key?: string
}) {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()

    useEffect(() => {
        if (!appWindow) return
        setWindowTitle(appWindow, title)
    }, [appWindow, setWindowTitle, title])

    return <MediaPlayer videoId={videoId} source="youtube" />
}

function TalkCard({ talk }: { talk: (typeof TALKS)[number] }) {
    const { addWindow } = useApp()

    const openTalk = () => {
        addWindow(
            (
                <ResearchTalkPlayer
                    videoId={talk.videoId}
                    title={talk.title}
                    newWindow
                    location={{ pathname: `research-talk-${talk.videoId}` }}
                    key={`research-talk`}
                />
            ) as Parameters<typeof addWindow>[0]
        )
    }

    return (
        <button
            type="button"
            onClick={openTalk}
            className="group h-full w-full border border-primary rounded bg-accent overflow-hidden flex flex-col text-left text-primary cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-150"
        >
            <div className="relative aspect-video shrink-0 bg-primary overflow-hidden">
                <img
                    src={`https://img.youtube.com/vi/${talk.videoId}/hqdefault.jpg`}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <IconPlayFilled className="size-10 text-white drop-shadow-lg" />
                </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-base font-bold m-0 mb-2 leading-snug group-hover:underline line-clamp-3 min-h-[4.125rem]">
                    {talk.title}
                </h3>
                <div className="mt-auto flex items-center gap-2 text-sm text-secondary">
                    <span className="truncate">{talk.byline}</span>
                    <span className="ml-auto shrink-0">Talk</span>
                </div>
            </div>
        </button>
    )
}

type FeedItem = { key: string; element: React.ReactNode }

// Interleave a talk video after every two posts, so recordings read as part of the feed
const buildFeed = (posts: ResearchPost[]): FeedItem[] => {
    const feed: FeedItem[] = []
    const talks = [...TALKS]
    posts.forEach((post, index) => {
        feed.push({ key: post.id, element: <PostCard post={post} /> })
        if ((index + 1) % 2 === 0 && talks.length > 0) {
            const talk = talks.shift() as (typeof TALKS)[number]
            feed.push({ key: talk.videoId, element: <TalkCard talk={talk} /> })
        }
    })
    talks.forEach((talk) => feed.push({ key: talk.videoId, element: <TalkCard talk={talk} /> }))
    return feed
}

function ResearchPostsSection({ posts }: { posts: ResearchPost[] }) {
    const feed = buildFeed(posts)
    const isCarousel = feed.length > 6
    const scrollerRef = React.useRef<HTMLDivElement>(null)
    const [canScroll, setCanScroll] = useState({ left: false, right: true })

    const updateArrows = () => {
        const el = scrollerRef.current
        if (!el) return
        setCanScroll({
            left: el.scrollLeft > 8,
            right: el.scrollLeft < el.scrollWidth - el.clientWidth - 8,
        })
    }

    const scrollByCards = (direction: 1 | -1) => {
        const el = scrollerRef.current
        if (!el) return
        el.scrollBy({ left: direction * Math.round(el.clientWidth * 0.8), behavior: 'smooth' })
    }

    return (
        <section id="blog" className="scroll-mt-16 mb-12 px-4 @xl:px-8">
            <SectionHeader
                sticker={StickerBulb}
                kicker="Blog"
                title="Research in the open"
                subtitle="We publish what we learn as we go – the big wins, the disastrous errors, the cancelled projects we gave up on along the way. We're not here just to share the glamorous bits."
            />
            {isCarousel ? (
                <div className="relative mb-6">
                    <div
                        ref={scrollerRef}
                        onScroll={updateArrows}
                        className="flex gap-4 snap-x overflow-x-auto py-3 -my-3 px-0.5 -mx-0.5"
                    >
                        {feed.map((item) => (
                            <div key={item.key} className="w-72 @2xl:w-80 shrink-0 snap-start">
                                {item.element}
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => scrollByCards(-1)}
                        aria-label="Scroll to previous cards"
                        className={`hidden @md:flex items-center justify-center absolute -left-2 @xl:-left-4 top-1/2 -translate-y-1/2 size-9 rounded-full border border-primary bg-primary shadow-md text-primary transition-opacity duration-150 hover:bg-accent ${
                            canScroll.left ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    >
                        <IconChevronLeft className="size-5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollByCards(1)}
                        aria-label="Scroll to next cards"
                        className={`hidden @md:flex items-center justify-center absolute -right-2 @xl:-right-4 top-1/2 -translate-y-1/2 size-9 rounded-full border border-primary bg-primary shadow-md text-primary transition-opacity duration-150 hover:bg-accent ${
                            canScroll.right ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    >
                        <IconChevronRight className="size-5" />
                    </button>
                </div>
            ) : (
                <div className="grid @md:grid-cols-2 @xl:grid-cols-3 auto-rows-fr gap-4 mb-6">
                    {feed.map((item) => (
                        <React.Fragment key={item.key}>{item.element}</React.Fragment>
                    ))}
                </div>
            )}
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

function PeopleSection({ teamMembers, posts }: { teamMembers: SqueakProfileFields[]; posts: ResearchPost[] }) {
    const seen = new Set(teamMembers.map((member) => member.squeakId).filter(Boolean))
    const authorMembers: SqueakProfileFields[] = []

    posts.forEach((post) => {
        post.frontmatter.authors?.forEach((author) => {
            const squeakId = author.profile_id ?? author.profile?.squeakId
            if (!squeakId || seen.has(squeakId) || !author.profile) return
            seen.add(squeakId)

            const [fallbackFirst, ...fallbackLast] = (author.name || '').split(' ')
            authorMembers.push({
                ...author.profile,
                squeakId,
                firstName: author.profile.firstName ?? fallbackFirst,
                lastName: author.profile.lastName ?? fallbackLast.join(' '),
                companyRole: author.profile.companyRole ?? author.role,
            })
        })
    })

    const everyone = [...teamMembers, ...authorMembers]
    if (everyone.length === 0) return null

    return (
        <section id="team" className="scroll-mt-16 mb-12 px-4 @xl:px-8">
            <SectionHeader
                sticker={StickerUsers}
                kicker="The team"
                title="Who's doing research at PostHog?"
                subtitle="The people doing the research, and the people writing about it."
            />
            <ul className="not-prose list-none mt-0 mx-0 p-0 flex flex-col @xs:grid grid-cols-2 @2xl:grid-cols-3 gap-4 @md:gap-x-6 gap-y-12 mt-14">
                {everyone.map((member) => (
                    <li key={member.squeakId}>
                        <TeamMember {...member} isTeamLead={(member.leadTeams?.data?.length ?? 0) > 0} />
                    </li>
                ))}
            </ul>
        </section>
    )
}

// ─────────────────────────────────────────────
// Events
// ─────────────────────────────────────────────

function EventDateBadge({ date }: { date: string }) {
    const eventDate = dayjs(date)
    const isSoon = eventDate.diff(dayjs(), 'day') <= 14

    return (
        <div
            className={`flex flex-col items-center justify-center size-14 rounded border shrink-0 ${
                isSoon ? 'border-orange bg-orange/10' : 'border-primary bg-primary'
            }`}
        >
            <span
                className={`text-[10px] font-bold uppercase tracking-widest leading-none ${
                    isSoon ? 'text-orange' : 'text-secondary'
                }`}
            >
                {eventDate.format('MMM')}
            </span>
            <span className="text-2xl font-bold leading-none tabular-nums mt-0.5">{eventDate.format('D')}</span>
        </div>
    )
}

function EventTalkRow({ event }: { event: Event }) {
    const locationLabel = event.online ? 'Online' : event.location?.label
    const photoUrl = event.photos?.[0]?.url
    const eventDate = dayjs(event.date)
    const isSoon = eventDate.diff(dayjs(), 'day') <= 14

    return (
        <Link
            to={`/events/${event.id}`}
            state={{ newWindow: true }}
            contextMenu={false}
            className="group flex items-center overflow-hidden border border-primary rounded bg-accent hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 no-underline text-primary w-full"
        >
            {photoUrl ? (
                <div className="flex items-center pl-4 shrink-0">
                    <img
                        src={photoUrl}
                        alt=""
                        className="size-14 @sm:size-16 rounded object-cover object-center border border-primary transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            ) : (
                <div className="flex items-center px-4 border-r border-primary bg-primary shrink-0">
                    <EventDateBadge date={event.date} />
                </div>
            )}
            <div className="flex flex-1 items-center gap-3 py-3.5 px-4 min-w-0">
                <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                        <span
                            className={`font-semibold uppercase tracking-wide ${
                                isSoon ? 'text-orange' : 'text-secondary'
                            }`}
                        >
                            {eventDate.format('MMM D, YYYY')}
                        </span>
                        {locationLabel && (
                            <span className="inline-flex items-center gap-1 text-secondary">
                                {event.online ? (
                                    <IconGlobe className="size-3 shrink-0" />
                                ) : (
                                    <IconMap className="size-3 shrink-0" />
                                )}
                                {locationLabel}
                            </span>
                        )}
                    </div>
                    <h3 className="text-base font-bold m-0 leading-snug group-hover:underline line-clamp-2">
                        {event.name}
                    </h3>
                    {event.speakerTopic && (
                        <p className="text-sm text-secondary m-0 line-clamp-1">{event.speakerTopic}</p>
                    )}
                    {event.speakers && event.speakers.length > 0 && (
                        <p className="text-sm text-secondary m-0 line-clamp-1">
                            Featuring <span className="font-semibold text-primary">{event.speakers.join(', ')}</span>
                        </p>
                    )}
                </div>
                <IconArrowRight className="size-4 text-muted shrink-0 transition-all duration-150 group-hover:text-secondary group-hover:translate-x-0.5" />
            </div>
        </Link>
    )
}

function EventsSection() {
    const { events } = useEvents()

    // Dedupe by id: the shared events hook can double-append in dev (StrictMode re-runs effects)
    const upcomingTalks = Array.from(new Map(events.map((event: Event) => [event.id, event])).values())
        .filter(
            (event: Event) =>
                !event.private &&
                new Date(event.date) >= new Date(new Date().toDateString()) &&
                (event.speakers?.length || event.speakerTopic)
        )
        .sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 4)

    return (
        <section id="events" className="scroll-mt-16 mb-12 px-4 @xl:px-8">
            <SectionHeader
                sticker={StickerRun}
                kicker="Events"
                title="Hear it in person"
                subtitle="Our engineers talk about this work at meetups and conferences."
            />

            {upcomingTalks.length > 0 ? (
                <ul className="flex flex-col gap-3 mb-6 list-none m-0 p-0">
                    {upcomingTalks.map((event: Event) => (
                        <li key={event.id}>
                            <EventTalkRow event={event} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="border border-primary rounded bg-accent p-6 text-center mb-6">
                    <StickerZZZ className="size-12 mx-auto mb-2 -rotate-3" />
                    <p className="font-semibold m-0 mb-1">No research talks on the calendar right now</p>
                    <p className="text-sm text-secondary m-0">
                        Check back soon, or browse everything else happening on the events page.
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
                (admin access required).
            </p>
        ),
    },
    {
        trigger: 'Will you sell my data, or models trained on it?',
        content: <p>No.</p>,
    },
    {
        trigger: 'Will you publish your research?',
        content: (
            <p>
                Yes. We plan to publish papers on arXiv and submit to major ML conferences, along with technical reports
                for each stage of pretraining. The first paper is underway now that our first training run is
                completing.
            </p>
        ),
    },
    {
        trigger: 'Can I be a researcher too?',
        content: (
            <p>
                We're hiring{' '}
                <Link to="/careers/ai-research-engineer" state={{ newWindow: true }} className="underline">
                    AI research engineers
                </Link>
                , and nearly all our code is open source, so you can contribute directly.
            </p>
        ),
    },
]

function FAQSection() {
    return (
        <section id="faq" className="scroll-mt-16 mb-12 px-4 @xl:px-8">
            <h2 className="text-2xl m-0 mb-6">Frequently asked questions</h2>
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
                    <h2 className="text-2xl m-0 mb-2">Put our research into practice</h2>
                    <p className="text-secondary mx-auto mb-6">
                        Most of what we're working on ships as public betas long before it's polished. Check what
                        feature previews are currently available to try in the app.
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
        researchMergedPRs: { nodes: MergedPR[] }
        aiResearchTeam?: {
            crest?: { data?: { attributes?: { url?: string } } }
        }
        researchTeamMembers?: { nodes: SqueakProfileFields[] }
    }
}) {
    const teamCrestUrl = data.aiResearchTeam?.crest?.data?.attributes?.url
    const teamMembers = data.researchTeamMembers?.nodes ?? []

    return (
        <>
            <SEO
                title="PostHog Research"
                description="AI research at PostHog: training foundation models on the data behind session replay, building agents that fix products autonomously, and publishing the results."
                structuredData={PUBLICATIONS.map((paper) => {
                    const resolved = resolvePublication(paper)
                    return {
                        '@context': 'https://schema.org',
                        '@type': 'ScholarlyArticle',
                        headline: resolved.title,
                        author: resolved.authors,
                        datePublished: resolved.year,
                        url: resolved.url,
                        publisher: { '@type': 'Organization', name: 'PostHog' },
                    }
                })}
            />
            <Editor slug="/research" maxWidth="100%" hasPadding={false} disableFormatting>
                {/* text-pretty inherits: prevents 1-2 word widow lines in all copy at any window width */}
                <div className="@container not-prose font-rounded text-pretty">
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
                        <div className={`relative ${RESEARCH_CONTENT_WIDTH} w-full mx-auto px-4 @xl:px-8 py-4`}>
                            <HeroSection teamCrestUrl={teamCrestUrl} />
                        </div>
                    </header>

                    <div className={`${RESEARCH_CONTENT_WIDTH} mx-auto`}>
                        <RoadmapSection />

                        <OpenProblemsSection />

                        <PublicationsSection />

                        <ShippedSection prs={data.researchMergedPRs.nodes} />

                        <ResearchPostsSection posts={data.researchPosts.nodes} />

                        <PeopleSection teamMembers={teamMembers} posts={data.researchPosts.nodes} />

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
                frontmatter {
                    authors: authorData {
                        profile_id
                        profile {
                            squeakId
                            firstName
                            lastName
                            companyRole
                            country
                            color
                            location
                            biography
                            pineappleOnPizza
                            startDate
                            teams {
                                data {
                                    id
                                    attributes {
                                        name
                                        slug
                                    }
                                }
                            }
                            leadTeams {
                                data {
                                    attributes {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        researchMergedPRs: allResearchMergedPr(sort: { fields: mergedAt, order: DESC }) {
            nodes {
                title
                url
                repo
                author
                mergedAt
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
        }
        researchTeamMembers: allSqueakProfile(
            filter: { teams: { data: { elemMatch: { attributes: { slug: { eq: "ai-research" } } } } } }
            sort: { fields: startDate, order: ASC }
        ) {
            nodes {
                squeakId
                avatar {
                    url
                }
                biography
                lastName
                firstName
                companyRole
                country
                color
                location
                pineappleOnPizza
                startDate
                teams {
                    data {
                        id
                        attributes {
                            name
                            slug
                        }
                    }
                }
                leadTeams {
                    data {
                        attributes {
                            name
                        }
                    }
                }
            }
        }
    }
`
