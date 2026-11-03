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
    { color: 'bg-light-yellow', tilt: '-rotate-2', copy: 'text-center', name: 'self-end' },
    { color: 'bg-pale-blue', tilt: 'rotate-1', copy: 'text-left', name: 'self-start' },
    { color: 'bg-light-purple', tilt: 'rotate-3', copy: 'text-center', name: 'self-center' },
    { color: 'bg-lime-green', tilt: '-rotate-1', copy: 'text-left', name: 'self-end' },
    { color: 'bg-creamsicle', tilt: 'rotate-2', copy: 'text-center', name: 'self-start' },
    { color: 'bg-light-blue', tilt: '-rotate-3', copy: 'text-center', name: 'self-end' },
]

export default function Testimonials(): JSX.Element {
    return (
        <section id="testimonials" className="my-12">
            <div className="grid items-center gap-6 @3xl/reader-content:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] @3xl/reader-content:gap-8">
                <div className="relative z-10 grid grid-cols-[8rem_minmax(0,1fr)] items-center gap-x-4 @3xl/reader-content:flex @3xl/reader-content:flex-col @3xl/reader-content:items-start @3xl/reader-content:gap-2">
                    <h2 className="col-start-2 row-start-1 m-0 self-end text-xl font-bold leading-tight">
                        Real things real people really said about PostHog AI{' '}
                        <span className="text-secondary">(really!)</span>
                    </h2>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/trenchcoat_hog_a3b8775b73.png"
                        alt=""
                        loading="lazy"
                        width={320}
                        className="pointer-events-none col-start-1 row-span-2 row-start-1 w-32 shrink-0 @3xl/reader-content:w-48"
                        imgClassName="w-full"
                    />
                    <p className="col-start-2 row-start-2 mb-0 mt-2 self-start text-xs text-secondary">
                        Pssst, are you Post-It{' '}
                        <Link
                            to="/academy"
                            state={{ newWindow: true }}
                            className="font-normal underline decoration-dotted underline-offset-2"
                        >
                            certified
                        </Link>
                        ?
                    </p>
                </div>
                {/* The notes are square, so the stage is one `sm` contained card width plus room for the lower side cards */}
                <CardStackCarousel
                    count={notes.length}
                    ariaLabel="What people say about PostHog AI"
                    size="sm"
                    contained
                    className="mx-auto w-full max-w-lg"
                    framed={false}
                    showCounter={false}
                    stageClassName="h-[calc(min(58cqw_-_2.25rem,240px)_+_20px)]"
                    renderCard={(index, { isActive }) => {
                        const style = noteStyles[index % noteStyles.length]
                        const note = notes[index]
                        return (
                            <figure
                                className={`m-0 flex aspect-square w-full flex-col justify-between gap-2 p-4 text-black shadow-md ${style.tilt} ${style.color}`}
                            >
                                <blockquote
                                    className={`m-0 flex flex-1 items-center border-0 p-0 font-comic text-sm font-normal not-italic leading-snug ${style.copy}`}
                                >
                                    “{note.text}”
                                </blockquote>
                                <figcaption className={`font-comic text-sm italic ${style.name}`}>
                                    {note.author}
                                    {'customer' in note && (
                                        <Link
                                            to={`/customers/${note.slug}`}
                                            state={{ newWindow: true }}
                                            tabIndex={isActive ? 0 : -1}
                                            className="mt-1 block text-xs not-italic underline underline-offset-2"
                                        >
                                            Read the {note.customer} story →
                                        </Link>
                                    )}
                                </figcaption>
                            </figure>
                        )
                    }}
                />
            </div>
        </section>
    )
}
