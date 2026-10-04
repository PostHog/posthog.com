import React from 'react'
import Explorer from 'components/Explorer'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import HogpediaShell from 'components/Hogpedia/HogpediaShell'
import { useHogpediaArticles, onlyArticles } from 'components/Hogpedia/data'

/** The full index. Server-rendered, so it is the crawlable spine of the section. */
export default function HogpediaAllPages(): JSX.Element {
    const articles = onlyArticles(useHogpediaArticles())

    return (
        <>
            <SEO
                title="All pages – Hogpedia"
                description={`An index of all ${articles.length} Hogpedia articles about PostHog products, concepts, company history, and lore.`}
                canonicalUrl="/hogpedia/all-pages"
            />
            <Explorer template="generic" slug="hogpedia" title="All pages – Hogpedia" fullScreen showAddressBar={false}>
                <HogpediaShell title="All pages" slug="/hogpedia/all-pages" showTabs={false}>
                    <div className="hp-prose">
                        <p>
                            Hogpedia has {articles.length} articles. Every one of them is listed below, in alphabetical
                            order.
                        </p>
                        <ul>
                            {articles.map((article) => (
                                <li key={article.slug}>
                                    <Link to={article.slug}>{article.title}</Link>
                                    {article.categories.length > 0 && (
                                        <>
                                            {' '}
                                            – <i>{article.categories.join(', ')}</i>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </HogpediaShell>
            </Explorer>
        </>
    )
}
