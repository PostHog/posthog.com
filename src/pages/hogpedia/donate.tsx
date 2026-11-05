import React from 'react'
import Explorer from 'components/Explorer'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import HogpediaShell from 'components/Hogpedia/HogpediaShell'
import { HOGS } from 'components/Hogpedia/hogs'

/**
 * The fundraising appeal. It is a joke, and it ends somewhere real: PostHog's free tier and
 * its open-source repository. Nothing here asks a reader for money.
 */
export default function HogpediaDonate(): JSX.Element {
    return (
        <>
            <SEO
                title="Donate to Hogpedia – Hogpedia"
                description="Hogpedia does not accept donations. It explains what to do instead."
                canonicalUrl="/hogpedia/donate"
            />
            <Explorer template="generic" slug="hogpedia" title="Donate – Hogpedia" fullScreen showAddressBar={false}>
                <HogpediaShell title="Donate to Hogpedia" slug="/hogpedia/donate" showTabs={false}>
                    <div className="hp-notice" role="note">
                        <span className="hp-notice-icon" aria-hidden="true">
                            📣
                        </span>
                        <span className="hp-notice-text">
                            <b>A personal appeal from the Hogpedia editors.</b> Hogpedia is the 4,000,000th most visited
                            encyclopedia on the internet. We are funded by a venture-backed software company, which is a
                            great deal more funding than an encyclopedia needs.
                        </span>
                    </div>

                    <div className="hp-prose">
                        <div className="hp-infobox">
                            <div className="hp-infobox-title">Fundraiser</div>
                            <div className="hp-infobox-image">
                                <HOGS.HedgehogMoney size={150} title="A hedgehog with money" />
                                <span className="hp-infobox-caption">
                                    Your contribution would be returned to you immediately.
                                </span>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <th scope="row">Target</th>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Raised</th>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Progress</th>
                                        <td>Complete</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            <b>Hogpedia does not accept donations.</b> It is part of the posthog.com website, which is
                            paid for by a software company, and its hosting cost is already covered.
                        </p>

                        <h2 id="what-to-do-instead">What to do instead</h2>
                        <p>Three things are genuinely more useful than money:</p>
                        <ul>
                            <li>
                                <b>Use the free tier.</b> PostHog has a{' '}
                                <Link to="/pricing">generous monthly free allowance</Link> on every product, and it
                                needs no card.
                            </li>
                            <li>
                                <b>Star the repository.</b> PostHog is open source, and{' '}
                                <Link to="https://github.com/PostHog/posthog" externalNoIcon className="hp-external">
                                    the code is on GitHub
                                </Link>
                                .
                            </li>
                            <li>
                                <b>Fix an article.</b> Every Hogpedia page has an <i>edit</i> link that opens the file
                                on GitHub. An encyclopedia asks for corrections, not cash.
                            </li>
                        </ul>

                        <h2 id="disclosure">Disclosure</h2>
                        <p>
                            Hogpedia is written and published by PostHog, about PostHog. This is a conflict of interest
                            that no editorial process resolves. Facts on these pages link to the PostHog source they
                            come from, so a reader can check each one. Opinions are marked as lore.
                        </p>
                    </div>
                </HogpediaShell>
            </Explorer>
        </>
    )
}
