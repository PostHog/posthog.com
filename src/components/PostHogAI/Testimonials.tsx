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
        text: 'PostHog AI helps our product engineers build dashboards without needing to understand PostHog in depth',
    },
]

const noteStyles = [
    { color: 'bg-light-yellow', copy: '-rotate-1 text-center', name: 'self-end rotate-1' },
    { color: 'bg-pale-blue', copy: 'rotate-1 text-left', name: 'self-start -rotate-2' },
    { color: 'bg-light-purple', copy: 'rotate-2 text-center', name: 'self-center -rotate-1' },
    { color: 'bg-lime-green', copy: '-rotate-2 text-left', name: 'self-end rotate-2' },
    { color: 'bg-creamsicle', copy: 'rotate-1 text-center', name: 'self-start -rotate-1' },
    {
        color: 'bg-[color-mix(in_srgb,theme(colors.pink)_40%,theme(colors.white))]',
        copy: '-rotate-1 text-center',
        name: 'self-end rotate-1',
    },
]

export default function Testimonials(): JSX.Element {
    return (
        <section id="testimonials" className="my-12">
            <div className="grid items-center gap-8 @3xl/reader-content:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] @3xl/reader-content:gap-12">
                <div className="flex flex-col items-start gap-5">
                    <h2 className="m-0 w-full text-2xl font-bold leading-tight">
                        Real things real people really said about PostHog AI{' '}
                        <span className="text-secondary">(really!)</span>
                    </h2>
                    <div className="flex items-end gap-4">
                        <div className="w-28 shrink-0 @3xl/reader-content:w-36">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/trenchcoat_hog_a3b8775b73.png"
                                alt=""
                                loading="lazy"
                                width={320}
                                imgClassName="w-full"
                            />
                        </div>
                        <p className="mb-3 font-comic text-sm italic leading-snug text-secondary">
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
                <div className="mx-auto w-full min-w-0">
                    <CardStackCarousel
                        count={quotes.length}
                        ariaLabel="What people say about PostHog AI"
                        formatCounter={(current, total) => `${current} / ${total}`}
                        className="!my-0 !flex !flex-col !rounded-none !border-0 !bg-transparent [&_[data-card-stack-position]]:!w-[min(90%,280px)] [&>div:last-child]:!h-[calc(min(90cqw,280px)_+_20px)] [&_button_svg]:!size-5 [&>div:first-child]:order-last [&>div:first-child]:!py-0"
                        renderCard={(index) => {
                            const style = noteStyles[index % noteStyles.length]
                            return (
                                <figure
                                    className={`m-0 flex aspect-square w-full flex-col justify-between gap-3 p-5 text-black shadow-md ${style.color}`}
                                >
                                    <blockquote
                                        className={`m-0 flex flex-1 items-center border-0 p-0 font-comic text-base font-normal not-italic leading-snug ${style.copy}`}
                                    >
                                        “{quotes[index].text}”
                                    </blockquote>
                                    <figcaption className={`font-comic text-base italic ${style.name}`}>
                                        {quotes[index].author}
                                    </figcaption>
                                </figure>
                            )
                        }}
                    />
                </div>
            </div>
        </section>
    )
}
