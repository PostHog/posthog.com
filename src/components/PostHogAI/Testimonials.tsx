import React from 'react'
import { IconBrain, IconGraph, IconMegaphone, IconRocket, IconTarget, IconTerminal } from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'
import { CardStackCarousel } from 'components/CardStackCarousel'
import { SectionHeader } from 'components/Pricing/Test/Sections'
import { Accordion } from 'components/RadixUI/Accordion'

const quotes = [
    {
        author: 'Richard P',
        text: 'I enjoy and trust the experience of PostHog’s AI probably more than Claude just because I feel like it has a little bit more context into all of the events.',
    },
    {
        author: 'Cody K',
        text: 'It’s gonna take me thirty minutes to go make the dashboard I need. PostHog AI does it in, like, two minutes.',
    },
    {
        author: 'Anton B',
        text: 'We’re thinking of building an AI tool in our product. PostHog AI is what I benchmarked against. It’s the quality of the reasoning.',
    },
    {
        author: 'Monica N',
        text: 'I really love the platform. I also love your AI tool in particular. Joining Claude with PostHog using the MCP has been life changing.',
    },
    {
        author: 'Sasha P',
        text: 'I just have Cursor and PostHog talk to each other at this point, and then I just come in and check the visualizations.',
    },
    {
        author: 'Alan Y',
        text: 'PostHog AI helps our product engineers build dashboards without needing to understand PostHog in depth',
    },
]

const stories = [
    {
        customer: 'Arena',
        slug: 'arena',
        author: 'Lily D',
        text: 'It’s pretty standard now for anyone on our team to log into PostHog and start a task by asking PostHog AI.',
    },
    {
        customer: 'RayFit',
        slug: 'rayfit',
        author: 'Alan',
        text: 'PostHog AI has actually been a deciding factor in our decision to stick with PostHog.',
    },
    {
        customer: 'Exa',
        slug: 'exa',
        author: 'Liam H',
        text: 'The best thing for me is PostHog AI. It’s really nice to have it help with SQL queries when you’re like 80-90% of the way there and it can finish them for you.',
    },
    {
        customer: 'SoundBoost',
        slug: 'soundboost',
        author: 'Berkan C',
        text: 'After I discovered the MCP, I can even fix what’s wrong in PostHog from my editor. It’s the only way I develop new features with PostHog now.',
    },
    {
        customer: 'Supabase',
        slug: 'supabase',
        text: 'I like PostHog AI as a helper because it knows PostHog terminology, as well as the data model, and schemas. It can fix my mistakes, help me join the right tables, and more.',
    },
]

const notes = [
    quotes[0],
    quotes[1],
    stories[0],
    quotes[2],
    stories[1],
    quotes[3],
    stories[2],
    quotes[4],
    stories[3],
    quotes[5],
    stories[4],
]

const personas = [
    {
        value: 'founders',
        audience: 'founders',
        Icon: IconRocket,
        color: 'text-salmon',
        description: 'Move fast and break (fewer) things.',
        features: [
            {
                title: 'Get a technical co-founder that never sleeps',
                description: 'Ask what’s going on in your product and get an answer in seconds.',
            },
            {
                title: 'Find patterns in your product data',
                description:
                    'Spot the early signs of product-market fit: who keeps coming back, and what they did first. Then build more of that.',
            },
        ],
    },
    {
        value: 'product-engineers',
        audience: 'product engineers',
        Icon: IconTerminal,
        color: 'text-burnt-orange',
        description: 'Because “it works on my machine” isn’t a metric.',
        features: [
            {
                title: 'Fix what hurts users first',
                description: 'Ask which errors affected the most users this week, then watch the sessions behind them.',
            },
            {
                title: 'Set up feature flags by asking',
                description: 'PostHog AI creates the flag, and you check the rollout settings before you ship.',
            },
        ],
    },
    {
        value: 'ai-engineers',
        audience: 'AI engineers',
        Icon: IconBrain,
        color: 'text-orange',
        description: 'Find out which feature is burning your token budget.',
        features: [
            {
                title: 'See what your LLM calls cost',
                description:
                    'Ask which features drive the most LLM spend, or how costs compare between GPT-4 and Claude.',
            },
            {
                title: 'Track down slow and failing calls',
                description:
                    'PostHog AI finds traces with errors from the last 24 hours, or calls that took over 5 seconds.',
            },
        ],
    },
    {
        value: 'product-managers',
        audience: 'product managers',
        Icon: IconTarget,
        color: 'text-teal',
        description: 'Run the experiment before the meeting about the experiment.',
        features: [
            {
                title: 'Build funnels and retention charts',
                description:
                    'Ask for a signup funnel or retention by acquisition channel. You don’t need to know the event names.',
            },
            {
                title: 'Run experiments by asking',
                description: 'PostHog AI creates the A/B test, then summarizes the results when the test ends.',
            },
        ],
    },
    {
        value: 'product-marketers',
        audience: 'product marketers',
        Icon: IconMegaphone,
        color: 'text-seagreen',
        description: 'Know which channel is working before someone asks.',
        features: [
            {
                title: 'See which channels bring visitors',
                description:
                    'Ask for a dashboard of traffic by source, campaign, and referrer. Compare channels side by side.',
            },
            {
                title: 'Draft emails from a page you like',
                description: 'Share a URL for inspiration, and PostHog AI writes an email template for your workflow.',
            },
        ],
    },
    {
        value: 'data-analysts',
        audience: 'data analysts',
        Icon: IconGraph,
        color: 'text-lilac',
        description: 'Someone else takes the “quick pull” requests now.',
        features: [
            {
                title: 'Let teammates self-serve quick questions',
                description:
                    'Teammates ask PostHog AI for the common analyses themselves. The requests stop landing on you.',
            },
            {
                title: 'Analyze data at scale',
                description:
                    'Ask PostHog AI to comb through large datasets and flag patterns and problems worth a closer look.',
            },
        ],
    },
]

const noteStyles = [
    { color: 'bg-light-yellow', tilt: '-rotate-2', copy: 'text-center', name: 'self-end' },
    { color: 'bg-pale-blue', tilt: 'rotate-1', copy: 'text-left', name: 'self-start' },
    { color: 'bg-light-purple', tilt: 'rotate-3', copy: 'text-center', name: 'self-center' },
    { color: 'bg-lime-green', tilt: '-rotate-1', copy: 'text-left', name: 'self-end' },
    { color: 'bg-creamsicle', tilt: 'rotate-2', copy: 'text-center', name: 'self-start' },
    {
        color: 'bg-[color-mix(in_srgb,theme(colors.pink)_40%,theme(colors.white))]',
        tilt: '-rotate-3',
        copy: 'text-center',
        name: 'self-end',
    },
]

export default function Testimonials(): JSX.Element {
    return (
        <section id="testimonials" className="my-12">
            <div className="grid items-start gap-10 @3xl/reader-content:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] @3xl/reader-content:gap-12">
                <div className="min-w-0">
                    <SectionHeader>
                        <div>
                            <h2 className="m-0 text-2xl font-bold leading-tight tracking-tight">
                                What PostHog AI can do for you
                            </h2>
                            <p className="mb-0 mt-2 text-base text-secondary">
                                Pick your role to see how PostHog AI helps.
                            </p>
                        </div>
                    </SectionHeader>
                    <Accordion
                        type="single"
                        triggerClassName="!py-2.5 !text-lg font-bold"
                        contentClassName="!text-sm"
                        items={personas.map((persona) => ({
                            value: persona.value,
                            trigger: (
                                <span className="flex flex-wrap items-center gap-x-1.5">
                                    PostHog AI for
                                    <persona.Icon className={`size-6 shrink-0 ${persona.color}`} />
                                    {persona.audience}
                                </span>
                            ),
                            content: (
                                <div>
                                    <p className="m-0 text-secondary">{persona.description}</p>
                                    <ul className="m-0 mt-3 grid list-none gap-x-6 p-0 @xl/reader-content:grid-cols-2 @3xl/reader-content:grid-cols-1 @4xl/reader-content:grid-cols-2">
                                        {persona.features.map((feature) => (
                                            <li key={feature.title} className="border-t border-primary py-3">
                                                <h4 className="m-0 text-base font-bold leading-snug">
                                                    {feature.title}
                                                </h4>
                                                <p className="mb-0 mt-1 text-secondary">{feature.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ),
                        }))}
                    />
                </div>
                <div className="min-w-0">
                    <CardStackCarousel
                        count={notes.length}
                        ariaLabel="What people say about PostHog AI"
                        formatCounter={(current, total) => <span className="sr-only">{`${current} of ${total}`}</span>}
                        className="!my-0 !flex !flex-col !rounded-none !border-0 !bg-transparent [&_[data-card-stack-position]]:!w-[min(90%,280px)] [&>div:last-child]:!h-[calc(min(90cqw,280px)_+_20px)] [&>div:last-child]:!mt-4 [&_button_svg]:!size-5 [&>div:first-child]:order-last [&>div:first-child]:!py-0"
                        renderCard={(index, { isActive }) => {
                            const style = noteStyles[index % noteStyles.length]
                            const note = notes[index]
                            return (
                                <figure
                                    className={`m-0 flex aspect-square w-full flex-col justify-between gap-3 p-5 text-black shadow-md ${style.tilt} ${style.color}`}
                                >
                                    <blockquote
                                        className={`m-0 flex flex-1 items-center border-0 p-0 font-comic text-base font-normal not-italic leading-snug ${style.copy}`}
                                    >
                                        “{note.text}”
                                    </blockquote>
                                    <figcaption className={`font-comic text-base italic ${style.name}`}>
                                        {note.author}
                                        {'customer' in note && (
                                            <Link
                                                to={`/customers/${note.slug}`}
                                                state={{ newWindow: true }}
                                                tabIndex={isActive ? 0 : -1}
                                                className="mt-1 block text-sm not-italic underline underline-offset-2"
                                            >
                                                Read the {note.customer} story →
                                            </Link>
                                        )}
                                    </figcaption>
                                </figure>
                            )
                        }}
                    />
                    <div className="relative z-10 mt-1 flex items-end gap-2">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/trenchcoat_hog_a3b8775b73.png"
                            alt=""
                            loading="lazy"
                            width={320}
                            className="pointer-events-none w-32 shrink-0"
                            imgClassName="w-full"
                        />
                        <div className="self-center">
                            <h2 className="m-0 text-lg font-bold leading-tight">
                                Real things real people really said <span className="text-secondary">(really!)</span>
                            </h2>
                            <p className="mb-0 mt-3 text-xs text-secondary">
                                Pssst, are you Post-It{' '}
                                <Link
                                    to="/academy"
                                    state={{ newWindow: true }}
                                    className="font-normal underline decoration-dotted underline-offset-2 hover:opacity-100"
                                >
                                    certified
                                </Link>
                                ?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
