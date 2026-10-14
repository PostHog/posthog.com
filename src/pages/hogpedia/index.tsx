import React from 'react'
import Explorer from 'components/Explorer'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import HogpediaShell from 'components/Hogpedia/HogpediaShell'
import { Module, FeaturedHog, dayIndex } from 'components/Hogpedia/MainPageModules'
import { useHogpediaArticles, onlyArticles } from 'components/Hogpedia/data'
import { useRecentBlogPosts } from 'components/Hogpedia/blogPosts'
import { useLoreFacts, LORE_PAGE } from 'components/Hogpedia/loreFacts'
import { HOGPEDIA_CATEGORIES, categoryPath } from 'components/Hogpedia/categories'
import MdxLinks from 'components/Hogpedia/MdxLinks'

/**
 * The Hogpedia Main Page, in the shape Wikipedia's 2007 one had: a welcome banner with an
 * article count, then a grid of dense modules.
 *
 * Every module links to a page that exists. The article count comes from the same build-time
 * query the search index uses, so it is always right.
 */
export default function HogpediaMainPage(): JSX.Element {
    const allArticles = useHogpediaArticles()
    const articles = onlyArticles(allArticles)
    // "In the news" is the real blog and "Did you know…" is the handbook's lore page, both
    // read at build time, so neither is a copy that can drift from its source.
    const news = useRecentBlogPosts()
    const lore = useLoreFacts(allArticles)
    // Six at a time, starting at a point that moves with the date. The lore page holds far
    // more than fit, and a module that changes mid-session would be noise.
    const facts = lore.length
        ? Array.from({ length: Math.min(6, lore.length) }, (_, i) => lore[(dayIndex(lore.length) + i) % lore.length])
        : []
    const featured = articles.find((article) => article.slug === '/hogpedia/posthog')

    return (
        <>
            <SEO
                title="Hogpedia, the free encyclopedia"
                description="An encyclopedia of PostHog products, concepts, company history, and lore. Written in the style of a 2007 encyclopedia, sourced from PostHog's own documentation and handbook."
                canonicalUrl="/hogpedia"
            />
            <Explorer template="generic" slug="hogpedia" title="Hogpedia" fullScreen showAddressBar={false}>
                <HogpediaShell title="Main Page" tagline={false} slug="/hogpedia" showTabs={false}>
                    <div className="hp-mainpage-banner">
                        <h2 className="hp-mainpage-title">Welcome to Hogpedia,</h2>
                        <p className="hp-mainpage-sub">
                            the free encyclopedia of hedgehogs, product engineering, and questionable company lore.
                        </p>
                        <p className="hp-mainpage-count">
                            {articles.length} articles in English · sourced from <Link to="/docs">the docs</Link>,{' '}
                            <Link to="/handbook">the handbook</Link> and <Link to="/blog">the blog</Link>
                        </p>
                    </div>

                    <div className="hp-modules">
                        {featured && (
                            <Module title="From today's featured article" tint="tinted">
                                <p>
                                    <b>
                                        <Link to="/hogpedia/posthog">PostHog</Link>
                                    </b>{' '}
                                    is an open-source platform for building products. It combines product analytics,
                                    session replay, feature flags, experiments, error tracking, surveys, and a data
                                    warehouse in one tool, so a product engineer can measure a change and ship the next
                                    one without moving between vendors. James Hawkins and Tim Glaser founded the company
                                    on 23 January 2020, during Y Combinator's W20 batch. The first version reached
                                    Hacker News four weeks after they started to write code. PostHog runs as a fully
                                    remote company, and it publishes its internal handbook, its pricing, and its roadmap
                                    in public.
                                </p>
                                <p className="hp-module-more">
                                    <Link to="/hogpedia/posthog">Read more…</Link> ·{' '}
                                    <Link to="/hogpedia/all-pages">Other articles</Link>
                                </p>
                            </Module>
                        )}

                        <Module title="Featured hog" tint="warm">
                            <FeaturedHog />
                        </Module>

                        <Module title="Did you know…">
                            <ul>
                                {facts.map((fact) => (
                                    <li key={fact.text}>
                                        <MdxLinks text={fact.text} /> <Link to={fact.to}>({fact.label})</Link>
                                    </li>
                                ))}
                            </ul>
                            <p className="hp-module-more">
                                <Link to={LORE_PAGE}>PostHog lore and inside jokes</Link>
                            </p>
                        </Module>

                        <Module title="In the news">
                            <ul>
                                {news.map((post) => (
                                    <li key={post.slug}>
                                        <Link to={post.slug}>{post.title}</Link>{' '}
                                        <span className="hp-news-date">({post.date})</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="hp-module-more">
                                <Link to="/blog">The PostHog blog</Link> · <Link to="/changelog">Changelog</Link>
                            </p>
                        </Module>

                        <Module title="Explore Hogpedia" wide>
                            <div className="hp-explore">
                                {HOGPEDIA_CATEGORIES.map((category) => (
                                    <div key={category}>
                                        <div className="hp-explore-group-title">{category}</div>
                                        <ul>
                                            {articles
                                                .filter((article) => article.categories.includes(category))
                                                .slice(0, 5)
                                                .map((article) => (
                                                    <li key={article.slug}>
                                                        <Link to={article.slug}>{article.title}</Link>
                                                    </li>
                                                ))}
                                            <li>
                                                <Link to={categoryPath(category)}>
                                                    <i>all {category.toLowerCase()} articles…</i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <p className="hp-module-more">
                                <Link to="/hogpedia/all-pages">All pages</Link> ·{' '}
                                <Link to="/hogpedia/recent-changes">Recent changes</Link> ·{' '}
                                <Link to="/hogpedia/about">About Hogpedia</Link>
                            </p>
                        </Module>
                    </div>
                </HogpediaShell>
            </Explorer>
        </>
    )
}
