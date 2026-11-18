import React from 'react'
import Explorer from 'components/Explorer'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import HogpediaShell from 'components/Hogpedia/HogpediaShell'
import { useHogpediaArticles, onlyArticles } from 'components/Hogpedia/data'

/** What Hogpedia is, how it is sourced, and what its limits are. */
export default function HogpediaAbout(): JSX.Element {
    const articles = onlyArticles(useHogpediaArticles())

    return (
        <>
            <SEO
                title="About Hogpedia – Hogpedia"
                description="Hogpedia is an encyclopedia about PostHog, written by PostHog, in the style of a 2007 encyclopedia. This page explains how it is sourced and where its limits are."
                canonicalUrl="/hogpedia/about"
            />
            <Explorer template="generic" slug="hogpedia" title="About – Hogpedia" fullScreen showAddressBar={false}>
                <HogpediaShell title="About Hogpedia" slug="/hogpedia/about" showTabs={false}>
                    <div className="hp-prose">
                        <p>
                            <b>Hogpedia</b> is an encyclopedia about <Link to="/hogpedia/posthog">PostHog</Link>: its
                            products, the concepts it works with, its history as a company, and its internal lore. It
                            has {articles.length} articles.
                        </p>
                        <p>
                            The interface is a recreation of the way English-language encyclopedias looked on the web in
                            2007. That is a joke about format. The facts are not part of the joke.
                        </p>

                        <h2 id="how-it-is-sourced">How it is sourced</h2>
                        <p>Every factual claim comes from a PostHog first-party source. The main ones are:</p>
                        <ul>
                            <li>
                                <Link to="/handbook/story">The company story</Link> in the handbook, for the timeline
                                and the funding history.
                            </li>
                            <li>
                                <Link to="/docs/glossary">The glossary</Link> in the documentation, for the definitions.
                            </li>
                            <li>
                                <Link to="/handbook/company/lore">The lore page</Link> in the handbook, for the
                                in-jokes.
                            </li>
                            <li>
                                <Link to="/docs">The documentation</Link> and{' '}
                                <Link to="/products">the product pages</Link>, for what each product does.
                            </li>
                        </ul>
                        <p>
                            A figure that changes over time – a price, a customer count, a headcount – links to the page
                            that states it rather than repeating the number here, so this encyclopedia cannot go stale
                            in a way a reader cannot detect.
                        </p>

                        <h2 id="what-is-lore">What is lore, and what is not</h2>
                        <p>
                            Articles about company lore carry a notice that says so. Those articles are accurate about
                            what happened, and they are written with more gravity than the subject deserves. That is
                            deliberate. An infobox never contains a joke.
                        </p>

                        <h2 id="limits">Limits</h2>
                        <ul>
                            <li>
                                <b>This is not a neutral encyclopedia.</b> PostHog writes it about itself. See the
                                disclosure on <Link to="/hogpedia/donate">the fundraising page</Link>.
                            </li>
                            <li>
                                <b>It is not the documentation.</b> For how to use a product, read{' '}
                                <Link to="/docs">the docs</Link>. Hogpedia explains what a thing is, not how to
                                configure it.
                            </li>
                            <li>
                                <b>It has one skin and no dark mode.</b> It is 2007.
                            </li>
                        </ul>

                        <h2 id="editing">Editing</h2>
                        <p>
                            Every article is a Markdown file in{' '}
                            <Link
                                to="https://github.com/PostHog/posthog.com/tree/master/contents/hogpedia"
                                externalNoIcon
                                className="hp-external"
                            >
                                contents/hogpedia
                            </Link>
                            . The <i>edit</i> link beside each section heading opens that file on GitHub.{' '}
                            <Link to="/hogpedia/recent-changes">Recent changes</Link> shows the real commit log.
                        </p>
                    </div>
                </HogpediaShell>
            </Explorer>
        </>
    )
}
