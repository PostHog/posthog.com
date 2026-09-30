import React from 'react'
import Editor from 'components/Editor'
import Link from 'components/Link'
import SEO from 'components/seo'

const posts = [
    {
        author: 'James',
        kind: 'Text',
        title: 'Shipping this before I overthink it',
        body: 'I made a tiny blog to see if people still like tiny blogs. If not, I can make a dashboard about it.',
    },
    {
        author: 'Charles',
        kind: 'Quote',
        title: 'A short marketing plan',
        body: 'Make something weird. Put it on the internet. See if anyone smiles.',
    },
    {
        author: 'James',
        kind: 'Link',
        title: 'Things that spark joy',
        body: 'There are more little projects in the grab bag.',
    },
]

export default function Hoglr(): JSX.Element {
    return (
        <>
            <SEO
                title="Hoglr - PostHog"
                description="A fictional blog dashboard with posts from James and Charles, made for the PostHog grab bag."
                image="/images/og/default.png"
            />
            <Editor maxWidth="100%" hasPadding={false} className="bg-navy dark:bg-navy-dark">
                <div className="not-prose @container min-h-full px-3 py-4 text-light-1 @lg:px-6 @lg:py-6">
                    <div className="mx-auto max-w-4xl">
                        <header className="mb-4 flex flex-wrap items-end justify-between gap-2 border-b border-light-1/20 pb-3">
                            <div>
                                <h1 className="font-serif text-4xl font-bold leading-none tracking-tight">hoglr.</h1>
                                <p className="mt-2 text-xs">A PostHog parody. These posts are fiction.</p>
                            </div>
                            <span className="text-sm font-semibold">Dashboard</span>
                        </header>

                        <div className="grid gap-4 @2xl:grid-cols-[minmax(0,1fr)_12rem]">
                            <div className="min-w-0 space-y-3">
                                <section
                                    data-scheme="primary"
                                    className="rounded border border-primary bg-primary p-3 text-primary"
                                >
                                    <h2 className="text-sm font-semibold">Post types</h2>
                                    <ul className="mt-2 grid grid-cols-4 gap-2 text-center text-xs @lg:grid-cols-7">
                                        {['Text', 'Photo', 'Quote', 'Link', 'Chat', 'Audio', 'Video'].map((type) => (
                                            <li
                                                key={type}
                                                className="rounded border border-primary bg-accent px-1 py-2"
                                            >
                                                {type}
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                <section aria-label="Fictional posts" className="space-y-3">
                                    {posts.map((post) => (
                                        <article key={post.title} className="flex items-start gap-2 @lg:gap-3">
                                            <span
                                                aria-hidden="true"
                                                className="flex size-9 shrink-0 items-center justify-center rounded border border-light-1/20 bg-blue-2-dark font-serif text-xl font-bold @lg:size-11"
                                            >
                                                {post.author[0]}
                                            </span>
                                            <div
                                                data-scheme="primary"
                                                className="min-w-0 flex-1 rounded border border-primary bg-primary p-3 text-primary @lg:p-4"
                                            >
                                                <div className="flex flex-wrap items-center justify-between gap-1 text-xs text-secondary">
                                                    <span>{post.author} posted</span>
                                                    <span>{post.kind}</span>
                                                </div>
                                                <h2 className="mt-2 font-serif text-xl font-bold leading-tight">
                                                    {post.title}
                                                </h2>
                                                <p className="mt-2 text-sm leading-relaxed">{post.body}</p>
                                                {post.kind === 'Link' && (
                                                    <Link
                                                        to="/sparks-joy"
                                                        state={{ newWindow: true }}
                                                        className="mt-2 inline-block text-sm font-semibold underline"
                                                    >
                                                        Open the grab bag
                                                    </Link>
                                                )}
                                            </div>
                                        </article>
                                    ))}
                                </section>
                            </div>

                            <aside className="space-y-3 text-sm">
                                <section
                                    data-scheme="primary"
                                    className="rounded border border-primary bg-primary p-3 text-primary"
                                >
                                    <h2 className="font-semibold">Following</h2>
                                    <ul className="mt-2 space-y-1 text-secondary">
                                        <li>James</li>
                                        <li>Charles</li>
                                    </ul>
                                </section>
                                <section
                                    data-scheme="primary"
                                    className="rounded border border-primary bg-primary p-3 text-primary"
                                >
                                    <h2 className="font-semibold">Explore</h2>
                                    <Link
                                        to="/sparks-joy"
                                        state={{ newWindow: true }}
                                        className="mt-2 inline-block underline"
                                    >
                                        Things that spark joy
                                    </Link>
                                </section>
                            </aside>
                        </div>
                    </div>
                </div>
            </Editor>
        </>
    )
}
