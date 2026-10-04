import React from 'react'
import Explorer from 'components/Explorer'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import HogpediaShell from 'components/Hogpedia/HogpediaShell'
import { categoryPath } from 'components/Hogpedia/categories'
import type { HogpediaCategoryProps } from '../lib/content/hogpedia'

/**
 * A category listing, the page a category link at the foot of an article opens.
 *
 * It is server-rendered from the articles that declare the category, so the list can never
 * name an article that does not exist.
 */
export default function HogpediaCategory({ category, articles }: HogpediaCategoryProps): JSX.Element {
    const title = `Category: ${category}`

    return (
        <>
            <SEO
                title={`${title} - Hogpedia`}
                description={`Hogpedia articles in the ${category} category. ${articles.length} ${
                    articles.length === 1 ? 'page' : 'pages'
                }.`}
                canonicalUrl={categoryPath(category)}
            />
            <Explorer
                template="generic"
                slug="hogpedia"
                title={`${title} - Hogpedia`}
                fullScreen
                showAddressBar={false}
            >
                <HogpediaShell
                    title={title}
                    tagline="From Hogpedia, the free encyclopedia"
                    slug={categoryPath(category)}
                    showTabs={false}
                >
                    <div className="hp-prose">
                        <p>
                            This category contains {articles.length} {articles.length === 1 ? 'page' : 'pages'}. See{' '}
                            <Link to="/hogpedia/all-pages">all pages</Link> for the full index.
                        </p>
                        <ul>
                            {articles.map((article) => (
                                <li key={article.slug}>
                                    <Link to={article.slug}>{article.title}</Link>
                                    {article.description && <> – {article.description}</>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </HogpediaShell>
            </Explorer>
        </>
    )
}
