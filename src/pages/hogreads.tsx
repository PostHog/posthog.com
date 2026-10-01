import React, { useEffect, useState } from 'react'
import { HedgehogReading, HedgehogReadingIsMagic } from '@posthog/brand/hoggies'
import { graphql, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'
import Link from 'components/Link'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import { AVATAR_FALLBACK_URL } from 'constants/index'

type Friend = { squeakId: number; firstName: string | null; lastName: string | null; avatar: { url: string } | null }

const books = {
    noRulesRules: {
        title: 'No Rules Rules',
        author: 'Reed Hastings and Erin Meyer',
        url: 'https://www.goodreads.com/book/show/51718082-no-rules-rules',
        cover: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1582617287i/51718082.jpg',
    },
    exhalation: {
        title: 'Exhalation',
        author: 'Ted Chiang',
        url: 'https://www.goodreads.com/book/show/41160292-exhalation',
        cover: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1534388394i/41160292.jpg',
    },
    projectHailMary: {
        title: 'Project Hail Mary',
        author: 'Andy Weir',
        url: 'https://www.goodreads.com/book/show/54493401-project-hail-mary',
        cover: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1764703833i/54493401.jpg',
    },
    panamaPapers: {
        title: 'The Panama Papers',
        author: 'Bastian Obermayer and Frederik Obermaier',
        url: 'https://www.goodreads.com/book/show/34396006-the-panama-papers',
        cover: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1488074336i/34396006.jpg',
    },
    sixEasyPieces: {
        title: 'Six Easy Pieces',
        author: 'Richard Feynman',
        url: 'https://www.goodreads.com/book/show/5553.Six_Easy_Pieces',
        cover: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1400827293i/5553.jpg',
    },
    dune: {
        title: 'Dune',
        author: 'Frank Herbert',
        url: 'https://www.goodreads.com/book/show/44767458-dune',
        cover: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg',
    },
    orderOfTime: {
        title: 'The Order of Time',
        author: 'Carlo Rovelli',
        url: 'https://www.goodreads.com/book/show/36442813-the-order-of-time',
        cover: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1516424407i/36442813.jpg',
    },
}

const favorites = [
    {
        ...books.noRulesRules,
        review: "Do NOT apply this book to your marriage, my partner did not appreciate me 'testing the market for a better offer'.",
    },
    {
        ...books.exhalation,
        review: 'My brain is so rotted by the algo that short stories are all I can handle (and even some of these were a bit long).',
    },
    {
        ...books.projectHailMary,
        review: "The main character isn't as smart as me - I watch Rick and Morty - but otherwise thought this was pretty good.",
    },
]

const shelves = [
    {
        name: 'read',
        books: [books.panamaPapers, books.exhalation, books.sixEasyPieces, books.dune, books.noRulesRules],
    },
    { name: 'currently reading', books: [{ ...books.dune, title: 'Dune (again)' }] },
    { name: 'to read', books: [books.projectHailMary, books.orderOfTime] },
]

const serifFont = { fontFamily: '"Merriweather", Georgia, serif' }

export default function Hogreads(): JSX.Element {
    const { team }: { team: { nodes: Friend[] } } = useStaticQuery(graphql`
        query HogreadsFriends {
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
    const [friends, setFriends] = useState<Friend[]>([])

    useEffect(() => {
        const people = team.nodes.filter((person) => person.squeakId && (person.firstName || person.lastName))
        for (let index = people.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(Math.random() * (index + 1))
            const selected = people[index]
            people[index] = people[randomIndex]
            people[randomIndex] = selected
        }
        setFriends(people.slice(0, 7))
    }, [team.nodes])

    return (
        <>
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Merriweather:wght@400;700&display=swap"
                />
            </Helmet>
            <SEO
                title="Hogreads – PostHog's bookish profile"
                description="See PostHog's favorite books, BookHog shelves, and friends on Hogreads."
            />
            <ReaderView hideAppOptions hideRightSidebar hideLeftSidebar showQuestions={false}>
                <div
                    className="@container not-prose min-h-full bg-white text-[#181818] dark:bg-[#211c19] dark:text-[#f4e9da]"
                    style={{ fontFamily: '"Lato", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
                >
                    <nav
                        aria-label="Hogreads"
                        className="border-b border-[#d6d0c4] bg-[#faf8f6] text-[#382110] dark:border-[#55463b] dark:bg-[#302820] dark:text-[#f4e9da]"
                    >
                        <div className="mx-auto flex max-w-[72rem] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 @lg:px-7">
                            <Link
                                to="/hogreads"
                                className="flex items-center gap-1.5 text-3xl tracking-tight !text-inherit no-underline"
                                style={serifFont}
                                aria-label="Hogreads home"
                            >
                                <HedgehogReading className="h-9 w-9" aria-hidden="true" />
                                hogreads
                            </Link>
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-base">
                                <Link to="/sparks-joy" className="!text-inherit no-underline hover:underline">
                                    Home
                                </Link>
                                <Link
                                    to="/handbook/people/bookhog"
                                    className="!text-inherit no-underline hover:underline"
                                >
                                    My books
                                </Link>
                                <Link to="/people" className="!text-inherit no-underline hover:underline">
                                    Community
                                </Link>
                            </div>
                        </div>
                    </nav>

                    <div className="mx-auto max-w-[72rem] px-4 pb-12 pt-5 @lg:px-7">
                        <div className="mx-auto mb-7 flex max-w-[36rem] flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded border border-[#e0d5a9] bg-[#fff9d4] px-4 py-3 text-center text-[#382110] dark:border-[#6e603c] dark:bg-[#3e3523] dark:text-[#f4e9da]">
                            <div>
                                <p className="font-semibold">Discover more books with BookHog</p>
                                <p className="text-sm">One book club. Many strong opinions.</p>
                            </div>
                            <Link
                                to="/handbook/people/bookhog"
                                className="rounded border border-[#dbab52] bg-[#ffbd57] px-4 py-2 text-sm !text-[#382110] no-underline hover:bg-[#f6ae3a]"
                            >
                                Visit BookHog
                            </Link>
                        </div>

                        <div className="@4xl:grid @4xl:grid-cols-[minmax(0,1fr)_minmax(14rem,19rem)] @4xl:gap-7">
                            <main className="min-w-0 space-y-8">
                                <header className="@xl:flex @xl:items-start @xl:gap-7">
                                    <div className="mb-5 flex shrink-0 flex-col items-center @xl:mb-0 @xl:w-44">
                                        <div className="flex size-36 items-center justify-center overflow-hidden rounded-full border-4 border-[#f4f1ea] bg-[#ffe5aa] dark:border-[#55463b] dark:bg-[#6d5841]">
                                            <HedgehogReadingIsMagic
                                                className="size-32"
                                                aria-label="PostHog reading a book"
                                            />
                                        </div>
                                        <p className="mt-2 text-center text-sm text-[#00635d] dark:text-[#79d6c6]">
                                            23 books read
                                            <br />3 favorite books
                                        </p>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h1
                                            className="border-b border-[#d6d0c4] pb-2 text-3xl font-bold text-[#382110] dark:border-[#55463b] dark:text-[#f4e9da]"
                                            style={serifFont}
                                        >
                                            PostHog
                                        </h1>
                                        <p className="mt-3 text-sm text-[#69605a] dark:text-[#c5b9ab]">
                                            San Francisco, California · Usually online
                                        </p>
                                        <p className="mt-4 max-w-prose text-sm leading-relaxed">
                                            Aspiring ironic tech bro with a monthly book club and strong opinions,
                                            strongly held. Believes audiobooks on 6x speed are superior to actual
                                            reading. Performatively reading Feynman in public since '06 (still single).
                                        </p>
                                        <Link
                                            to="/handbook/people/bookhog"
                                            className="mt-4 inline-block rounded bg-[#382110] px-5 py-2 text-sm !text-white no-underline hover:bg-[#59402c] dark:bg-[#d4b997] dark:!text-[#211c19]"
                                        >
                                            See my book club
                                        </Link>
                                    </div>
                                </header>

                                <section aria-labelledby="favorites-heading">
                                    <h2
                                        id="favorites-heading"
                                        className="border-b border-[#d6d0c4] pb-2 text-sm font-bold uppercase text-[#382110] dark:border-[#55463b] dark:text-[#f4e9da]"
                                    >
                                        PostHog's favorite books
                                    </h2>
                                    <div className="grid grid-cols-3 gap-3 pt-4 @md:gap-5">
                                        {favorites.map((book) => (
                                            <div key={book.title} className="min-w-0">
                                                <a
                                                    href={book.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block max-w-full"
                                                >
                                                    <img
                                                        src={book.cover}
                                                        alt={`${book.title} cover`}
                                                        className="h-32 max-w-full object-contain shadow-sm @md:h-44"
                                                    />
                                                </a>
                                                <p className="mt-2 text-sm font-semibold">
                                                    <a
                                                        href={book.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#00635d] hover:underline dark:text-[#79d6c6]"
                                                    >
                                                        {book.title}
                                                    </a>
                                                </p>
                                                <p className="text-xs text-[#69605a] dark:text-[#c5b9ab]">
                                                    {book.author}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section aria-labelledby="shelves-heading">
                                    <h2
                                        id="shelves-heading"
                                        className="border-b border-[#d6d0c4] pb-2 text-sm font-bold uppercase text-[#382110] dark:border-[#55463b] dark:text-[#f4e9da]"
                                    >
                                        PostHog's bookshelves
                                    </h2>
                                    <div className="grid gap-4 pt-4 @md:grid-cols-3">
                                        {shelves.map((shelf) => (
                                            <div key={shelf.name}>
                                                <h3 className="text-sm font-semibold text-[#00635d] dark:text-[#79d6c6]">
                                                    {shelf.name} ({shelf.name === 'read' ? 23 : shelf.books.length})
                                                </h3>
                                                <ul className="mt-2 space-y-1 text-sm">
                                                    {shelf.books.map((book) => (
                                                        <li key={book.title}>
                                                            <a
                                                                href={book.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-2 text-[#00635d] hover:underline dark:text-[#79d6c6]"
                                                            >
                                                                <img
                                                                    src={book.cover}
                                                                    alt=""
                                                                    loading="lazy"
                                                                    className="h-11 w-8 shrink-0 object-contain"
                                                                />
                                                                <span>{book.title}</span>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                    <Link
                                        to="/handbook/people/bookhog"
                                        className="mt-4 inline-block text-sm !text-[#00635d] dark:!text-[#79d6c6]"
                                    >
                                        See all BookHog reads →
                                    </Link>
                                </section>

                                <section aria-labelledby="reading-heading">
                                    <h2
                                        id="reading-heading"
                                        className="border-b border-[#d6d0c4] pb-2 text-sm font-bold uppercase text-[#382110] dark:border-[#55463b] dark:text-[#f4e9da]"
                                    >
                                        PostHog is currently reading
                                    </h2>
                                    <div className="flex gap-4 pt-4">
                                        <a
                                            href={books.dune.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="shrink-0"
                                        >
                                            <img
                                                src={books.dune.cover}
                                                alt="Dune cover"
                                                loading="lazy"
                                                className="h-32 w-20 object-cover shadow-sm"
                                            />
                                        </a>
                                        <div className="text-sm">
                                            <p className="text-lg font-bold" style={serifFont}>
                                                <a
                                                    href={books.dune.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#00635d] hover:underline dark:text-[#79d6c6]"
                                                >
                                                    Dune
                                                </a>
                                            </p>
                                            <p className="text-[#69605a] dark:text-[#c5b9ab]">by Frank Herbert</p>
                                            <p className="mt-3">
                                                Reading it again. This time the spice is token usage.
                                            </p>
                                            <p className="mt-2 text-[#00635d] dark:text-[#79d6c6]">
                                                bookshelves: currently reading
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <section aria-labelledby="reviews-heading">
                                    <h2
                                        id="reviews-heading"
                                        className="border-b border-[#d6d0c4] pb-2 text-sm font-bold uppercase text-[#382110] dark:border-[#55463b] dark:text-[#f4e9da]"
                                    >
                                        PostHog's reviews
                                    </h2>
                                    <div className="divide-y divide-[#d6d0c4] dark:divide-[#55463b]">
                                        {favorites.map((book) => (
                                            <article key={book.title} className="py-4 text-sm">
                                                <h3 className="text-lg font-bold" style={serifFont}>
                                                    <a
                                                        href={book.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#00635d] hover:underline dark:text-[#79d6c6]"
                                                    >
                                                        {book.title}
                                                    </a>
                                                </h3>
                                                <p
                                                    className="text-[#b26015] dark:text-[#ffbd57]"
                                                    aria-label="Five stars"
                                                >
                                                    ★★★★★
                                                </p>
                                                <p className="mt-1">{book.review}</p>
                                            </article>
                                        ))}
                                    </div>
                                </section>
                            </main>

                            <aside className="mt-9 space-y-8 @4xl:mt-0" aria-label="Friends and quotes">
                                <section aria-labelledby="friends-heading">
                                    <h2
                                        id="friends-heading"
                                        className="border-b border-[#d6d0c4] pb-2 text-sm font-bold uppercase text-[#382110] dark:border-[#55463b] dark:text-[#f4e9da]"
                                    >
                                        PostHog's friends ({friends.length})
                                    </h2>
                                    <ul className="grid grid-cols-2 gap-3 pt-3 @lg:grid-cols-3 @4xl:grid-cols-1">
                                        {friends.map((friend) => (
                                            <li key={friend.squeakId}>
                                                <Link
                                                    to={`/community/profiles/${friend.squeakId}`}
                                                    className="flex min-w-0 items-center gap-3 text-sm !text-[#00635d] no-underline hover:underline dark:!text-[#79d6c6]"
                                                >
                                                    <img
                                                        src={friend.avatar?.url || AVATAR_FALLBACK_URL}
                                                        alt=""
                                                        className="size-12 shrink-0 rounded-sm object-cover"
                                                    />
                                                    <span className="min-w-0 truncate">
                                                        {[friend.firstName, friend.lastName].filter(Boolean).join(' ')}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                                <section aria-labelledby="quotes-heading">
                                    <h2
                                        id="quotes-heading"
                                        className="border-b border-[#d6d0c4] pb-2 text-sm font-bold uppercase text-[#382110] dark:border-[#55463b] dark:text-[#f4e9da]"
                                    >
                                        Quotes
                                    </h2>
                                    <blockquote className="pt-3 text-lg leading-snug" style={serifFont}>
                                        “It's like Uber for dogs, but where the dogs are the drivers. It's going to be
                                        huge.”
                                        <footer className="mt-2 font-sans text-sm not-italic text-[#69605a] dark:text-[#c5b9ab]">
                                            — James Hawkins
                                        </footer>
                                    </blockquote>
                                </section>
                            </aside>
                        </div>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
