import React, { useEffect, useState } from 'react'
import { HedgehogReading, HedgehogReadingIsMagic } from '@posthog/brand/hoggies'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import { AVATAR_FALLBACK_URL } from 'constants/index'

type Friend = { squeakId: number; firstName: string | null; lastName: string | null; avatar: { url: string } | null }

const favorites = [
    {
        title: 'No Rules Rules',
        author: 'Reed Hastings and Erin Meyer',
        cover: 'bg-[#392719] text-[#fff3de]',
        review: 'No rules? My AI agent still asked for permission before opening a pull request. Five stars for optimism.',
    },
    {
        title: 'Exhalation',
        author: 'Ted Chiang',
        cover: 'bg-[#b66e3f] text-[#fff9eb]',
        review: 'I asked a model for a one-line summary. It used my whole token budget and asked what it means to be human.',
    },
    {
        title: 'Project Hail Mary',
        author: 'Andy Weir',
        cover: 'bg-[#234453] text-[#fff9eb]',
        review: 'I could solve this with one prompt. The model would also forget to turn the spaceship around.',
    },
]

const shelves = [
    { name: 'read', books: ['The Panama Papers', 'Exhalation', 'Six Easy Pieces', 'Dune', 'No Rules Rules'] },
    { name: 'currently reading', books: ['Dune (again)'] },
    { name: 'to read', books: ['Project Hail Mary', 'The Order of Time'] },
]

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
            <SEO
                title="Hogreads – PostHog's bookish profile"
                description="See PostHog's favorite books, BookHog shelves, and friends on Hogreads."
            />
            <ReaderView hideAppOptions hideRightSidebar hideLeftSidebar showQuestions={false}>
                <div className="@container not-prose min-h-full bg-[#fffdfb] text-[#382110] dark:bg-[#211c19] dark:text-[#f4e9da]">
                    <nav
                        aria-label="Hogreads"
                        className="border-b border-[#ded8d1] bg-[#f4f1ea] dark:border-[#55463b] dark:bg-[#302820]"
                    >
                        <div className="mx-auto flex max-w-[72rem] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 @lg:px-7">
                            <Link
                                to="/hogreads"
                                className="flex items-center gap-1.5 font-serif text-3xl tracking-tight !text-inherit no-underline"
                                aria-label="Hogreads home"
                            >
                                <HedgehogReading className="h-9 w-9" aria-hidden="true" />
                                hogreads
                            </Link>
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
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
                                        <h1 className="border-b border-[#ded8d1] pb-2 font-serif text-3xl font-bold dark:border-[#55463b]">
                                            PostHog
                                        </h1>
                                        <p className="mt-3 text-sm text-[#69605a] dark:text-[#c5b9ab]">
                                            San Francisco, California · Usually online
                                        </p>
                                        <p className="mt-4 max-w-prose text-sm leading-relaxed">
                                            I like long walks through event streams, short release cycles, and books
                                            that explain why my last experiment failed. I join a book club once a month
                                            and bring a dashboard to every meeting.
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
                                        className="border-b border-[#ded8d1] pb-2 text-sm font-bold uppercase dark:border-[#55463b]"
                                    >
                                        PostHog's favorite books
                                    </h2>
                                    <div className="grid grid-cols-3 gap-3 pt-4 @md:gap-5">
                                        {favorites.map((book) => (
                                            <div key={book.title} className="min-w-0">
                                                <div
                                                    className={`flex aspect-[2/3] max-h-44 items-center justify-center border-l-4 border-black/20 p-2 text-center shadow-sm ${book.cover}`}
                                                >
                                                    <span className="font-serif text-sm font-bold leading-tight @md:text-lg">
                                                        {book.title}
                                                    </span>
                                                </div>
                                                <p className="mt-2 text-sm font-semibold">{book.title}</p>
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
                                        className="border-b border-[#ded8d1] pb-2 text-sm font-bold uppercase dark:border-[#55463b]"
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
                                                    {shelf.books.map((title) => (
                                                        <li key={title}>{title}</li>
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
                                        className="border-b border-[#ded8d1] pb-2 text-sm font-bold uppercase dark:border-[#55463b]"
                                    >
                                        PostHog is currently reading
                                    </h2>
                                    <div className="flex gap-4 pt-4">
                                        <div className="flex h-32 w-20 shrink-0 items-center justify-center border-l-4 border-black/20 bg-[#a7854c] p-2 text-center font-serif text-lg font-bold text-[#241a11] shadow-sm">
                                            Dune
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-serif text-lg font-bold">Dune</p>
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
                                        className="border-b border-[#ded8d1] pb-2 text-sm font-bold uppercase dark:border-[#55463b]"
                                    >
                                        PostHog's reviews
                                    </h2>
                                    <div className="divide-y divide-[#ded8d1] dark:divide-[#55463b]">
                                        {favorites.map((book) => (
                                            <article key={book.title} className="py-4 text-sm">
                                                <h3 className="font-serif text-lg font-bold">{book.title}</h3>
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
                                        className="border-b border-[#ded8d1] pb-2 text-sm font-bold uppercase dark:border-[#55463b]"
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
                                        className="border-b border-[#ded8d1] pb-2 text-sm font-bold uppercase dark:border-[#55463b]"
                                    >
                                        Quotes
                                    </h2>
                                    <blockquote className="pt-3 font-serif text-lg leading-snug">
                                        “It's like Uber for dogs, but where the dogs are the drivers. It's going to be
                                        huge.”
                                        <footer className="mt-2 font-sans text-sm not-italic text-[#69605a] dark:text-[#c5b9ab]">
                                            — James Hawkins
                                        </footer>
                                    </blockquote>
                                </section>
                                <p className="text-xs text-[#69605a] dark:text-[#c5b9ab]">
                                    A PostHog parody. Not affiliated with Goodreads.
                                </p>
                            </aside>
                        </div>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
