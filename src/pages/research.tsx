import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import dayjs from 'dayjs'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import { IconBrain, IconCalendar, IconMap, IconNewspaper, IconArrowRight } from '@posthog/icons'
import { useEvents, type Event } from './events'

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────

function HeroSection({ teamCrestUrl }: { teamCrestUrl?: string }) {
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
                If we knew what we were doing, it wouldn't be called research.
            </h1>

            <div className="max-w-2xl space-y-3">
                <p>
                    PostHog is becoming a company that ships fixes while you sleep. That's not a metaphor: agents that
                    watch session replays, error tracking, and conversion funnels, work out what's broken, and open the
                    pull request before you've finished your coffee.
                </p>
                <p>
                    Getting there means doing things analytics companies don't usually do – training our own models on
                    the data behind session replays, building agents that understand your product (not just your
                    codebase), and occasionally pointing them at our own query engine overnight to see what they dig up.
                    They found a 3-year-old bug. It's fine. We're fine.
                </p>
                <p className="text-sm text-secondary">
                    The master plan is in{' '}
                    <Link to="/blog/posthogs-next-chapter" state={{ newWindow: true }} className="underline">
                        PostHog's next chapter
                    </Link>
                    . The model-training confessional is in{' '}
                    <Link to="/blog/training-ai-models" state={{ newWindow: true }} className="underline">
                        Training our own AI models
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

const ROADMAP_ITEMS: { title: string; description: string }[] = [
    {
        title: 'Data labeling suite',
        description:
            'Tooling to label anonymized product data, so models learn the difference between "delighted user" and "user rage-clicking the checkout button".',
    },
    {
        title: 'Session replay text renderer',
        description:
            'Rendering the DOM data behind replays as text a model can read. Session replay, but legible to LLMs at scale.',
    },
    {
        title: 'Write data prep pipeline',
        description:
            'Anonymizing and normalizing opted-in data before any of it goes near a model. The least glamorous step, and the one we refuse to get wrong.',
    },
    {
        title: 'Build the sampling pipeline',
        description:
            'Picking sessions and events that reflect real product usage, not noise. Garbage in, garbage out – so, no garbage.',
    },
    {
        title: 'Train the Replay encoder model',
        description:
            'A model trained on the raw data behind session replay, so analyzing 10,000 replays takes seconds instead of taking your afternoon.',
    },
    {
        title: 'Train the end-to-end agent',
        description:
            'Agents that predict and simulate user behavior, catch problems before you ship, and hand you a fix instead of a dashboard.',
    },
    {
        title: 'Build the model observability suite',
        description:
            'Dogfooding our own LLM analytics to trace, evaluate, and debug every model we train. Research you can watch happen.',
    },
    {
        title: 'Build an eval dataset',
        description:
            'A benchmark of real product problems to score every model iteration against, so progress is provable rather than vibes.',
    },
]

function RoadmapSection() {
    return (
        <section className="mb-12 px-4 @xl:px-8">
            <h2 className="text-2xl m-0 mb-2">What we're researching right now</h2>
            <p className="text-secondary max-w-2xl mb-6">
                The AI Research team's current pipeline, in roughly the order the whiteboard says. Each step gets us
                closer to models and agents that understand products the way PostHog does.
            </p>
            <div className="grid @lg:grid-cols-2 gap-4">
                {ROADMAP_ITEMS.map((item, index) => (
                    <div
                        key={item.title}
                        className="group border border-primary rounded bg-accent p-4 flex gap-4 transition-all duration-150 hover:border-purple hover:bg-primary hover:-translate-y-1 hover:shadow-lg"
                    >
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
// Research blog posts (tagged "Research")
// ─────────────────────────────────────────────

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
        authors?: { name: string; profile?: { avatar?: { url?: string } } }[]
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
            className="group border border-primary rounded bg-accent overflow-hidden flex flex-col no-underline text-primary transition-all duration-150 hover:border-purple hover:-translate-y-1 hover:shadow-lg"
        >
            <div className="relative pt-[56.25%] bg-primary overflow-hidden">
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
                <h3 className="text-base font-bold m-0 mb-2 leading-snug group-hover:underline line-clamp-3">
                    {post.frontmatter.title}
                </h3>
                <div className="mt-auto flex items-center gap-2 text-sm text-secondary">
                    {author?.profile?.avatar?.url && (
                        <img src={author.profile.avatar.url} alt="" className="size-6 rounded-full bg-primary" />
                    )}
                    {author && <span>{author.name}</span>}
                    <span className="ml-auto">{post.frontmatter.date}</span>
                </div>
            </div>
        </Link>
    )
}

function ResearchPostsSection({ posts }: { posts: ResearchPost[] }) {
    return (
        <section className="mb-12 px-4 @xl:px-8">
            <h2 className="text-2xl m-0 mb-2">Research in the open</h2>
            <p className="text-secondary max-w-2xl mb-6">
                We publish what we learn as we go – the wins, the faceplants, and the 3-year-old bugs our agents dig up
                at 3am.
            </p>
            <div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 mb-6">
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
            <h2 className="text-2xl m-0 mb-2">Hear it from the humans</h2>
            <p className="text-secondary max-w-2xl mb-6">
                Our engineers take this show on the road – meetups, conferences, and anywhere else with a projector and
                a tolerant audience.
            </p>

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
                    <IconCalendar className="size-8 text-muted mx-auto mb-2" />
                    <p className="font-semibold m-0 mb-1">No research talks on the calendar right now</p>
                    <p className="text-sm text-secondary m-0">
                        The researchers are researching. Check the events page for everything else we're up to.
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
// CTA
// ─────────────────────────────────────────────

function CTASection() {
    return (
        <section className="mb-12 px-4 @xl:px-8">
            <div className="border border-primary rounded bg-accent p-6 @xl:p-8 text-center">
                <h2 className="text-2xl m-0 mb-2">Use the research before it's finished</h2>
                <p className="text-secondary max-w-xl mx-auto mb-6">
                    Most of this ships as public betas long before it's polished. See what we're building this week, or
                    flip on feature previews and break something new.
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
        aiResearchTeam?: { crest?: { data?: { attributes?: { url?: string } } } }
    }
}) {
    const teamCrestUrl = data.aiResearchTeam?.crest?.data?.attributes?.url

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

                        <ResearchPostsSection posts={data.researchPosts.nodes} />

                        <EventsSection />

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
        }
    }
`
