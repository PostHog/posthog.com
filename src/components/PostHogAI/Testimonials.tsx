import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'
import { CardStackCarousel } from 'components/CardStackCarousel'

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
        text: 'PostHog AI helps our product engineers build dashboards without needing to understand PostHog in depth.',
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

const noteStyles = [
    { color: 'bg-light-yellow', tilt: '-rotate-2' },
    { color: 'bg-pale-blue', tilt: 'rotate-1' },
    { color: 'bg-light-purple', tilt: 'rotate-3' },
    { color: 'bg-lime-green', tilt: '-rotate-1' },
    { color: 'bg-creamsicle', tilt: 'rotate-2' },
    { color: 'bg-light-blue', tilt: '-rotate-3' },
]

export default function Testimonials(): JSX.Element {
    return (
        <section id="testimonials" className="my-12">
            <div className="flex items-center gap-4 @2xl/reader-content:gap-5">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/trenchcoat_hog_a3b8775b73.png"
                    alt=""
                    loading="lazy"
                    width={200}
                    className="pointer-events-none w-28 shrink-0 @4xl/reader-content:w-32"
                    imgClassName="w-full"
                />
                <div>
                    <h2 className="m-0 text-xl font-bold leading-tight @2xl/reader-content:text-3xl @4xl/reader-content:text-4xl">
                        Real things real people really said
                        <br className="hidden @2xl/reader-content:inline" /> about PostHog AI{' '}
                        <span className="text-secondary">(really!)</span>
                    </h2>
                    <p className="mb-0 mt-2 text-xs text-secondary @4xl/reader-content:text-sm">
                        Pssst, are you Post-It{' '}
                        <Link
                            to="/academy"
                            state={{ newWindow: true }}
                            className="font-semibold text-primary underline decoration-dotted underline-offset-2"
                        >
                            certified
                        </Link>
                        ?
                    </p>
                </div>
            </div>
            {/* The notes are square. The stage fits one note, plus the lower side cards in a stack or the lower front card and tilt in a row. */}
            <CardStackCarousel
                count={notes.length}
                ariaLabel="What people say about PostHog AI"
                size="sm"
                contained
                row
                className="mx-auto mt-6 w-full max-w-lg @2xl/reader-content:mt-8 @2xl/reader-content:max-w-none"
                framed={false}
                showCounter={false}
                stageClassName="h-[calc(min(58cqw_-_2.25rem,240px)_+_20px)] @2xl:h-[calc((100cqw_-_7.5rem)/3_+_2rem)]"
                renderCard={(index, { isActive }) => {
                    const { color, tilt } = noteStyles[index % noteStyles.length]
                    const note = notes[index]
                    return (
                        <figure
                            className={`m-0 flex aspect-square w-full flex-col justify-between gap-3 p-4 text-black shadow-md ${tilt} ${color}`}
                        >
                            <blockquote className="m-0 border-0 p-0 text-left font-comic text-sm font-normal not-italic leading-snug @2xl/reader-content:text-base @5xl/reader-content:text-lg">
                                “{note.text}”
                            </blockquote>
                            <figcaption className="flex items-end justify-between gap-3">
                                <span className="whitespace-nowrap font-comic text-sm @2xl/reader-content:text-base">
                                    {note.author}
                                </span>
                                {'customer' in note && (
                                    <Link
                                        to={`/customers/${note.slug}`}
                                        state={{ newWindow: true }}
                                        tabIndex={isActive ? 0 : -1}
                                        className="text-right text-xs font-semibold text-black underline underline-offset-2"
                                    >
                                        Read the {note.customer} story
                                    </Link>
                                )}
                            </figcaption>
                        </figure>
                    )
                }}
            />
        </section>
    )
}
