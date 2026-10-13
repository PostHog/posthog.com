import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import Explorer from 'components/Explorer'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import HogpediaShell from 'components/Hogpedia/HogpediaShell'
import { useHogpediaArticles, onlyArticles, pickRandomArticle } from 'components/Hogpedia/data'

/**
 * Special:Random, and it genuinely works.
 *
 * The page server-renders a real list of every article, so a crawler and a reader with no
 * JavaScript both land somewhere useful. On mount it moves to a random article. The pick
 * happens in an effect, never during render, because a random value chosen on the server
 * would not match the one chosen on the client.
 */
export default function HogpediaRandom(): JSX.Element {
    const articles = onlyArticles(useHogpediaArticles())
    const [jumping, setJumping] = useState(false)

    useEffect(() => {
        const article = pickRandomArticle(articles)
        if (article) {
            setJumping(true)
            navigate(article.slug, { replace: true })
        }
    }, [])

    return (
        <>
            <SEO
                title="Random article – Hogpedia"
                description="Opens a random Hogpedia article."
                canonicalUrl="/hogpedia/random"
            />
            <Explorer
                template="generic"
                slug="hogpedia"
                title="Random article – Hogpedia"
                fullScreen
                showAddressBar={false}
            >
                <HogpediaShell title="Random article" slug="/hogpedia/random" showTabs={false}>
                    <div className="hp-prose">
                        <p>
                            {jumping
                                ? 'Opening a random article…'
                                : `Hogpedia has ${articles.length} articles. Pick one.`}
                        </p>
                        <ul>
                            {articles.map((article) => (
                                <li key={article.slug}>
                                    <Link to={article.slug}>{article.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </HogpediaShell>
            </Explorer>
        </>
    )
}
