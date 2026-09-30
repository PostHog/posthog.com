import React from 'react'
import Explorer from 'components/Explorer'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import HogpediaShell from 'components/Hogpedia/HogpediaShell'
import { Module, FeaturedHog, dayIndex } from 'components/Hogpedia/MainPageModules'
import { useHogpediaArticles, onlyArticles, onlyResolvable } from 'components/Hogpedia/data'
import { HOGPEDIA_CATEGORIES, categoryPath } from 'components/Hogpedia/categories'
import { DID_YOU_KNOW, IN_THE_NEWS, FEATURED_HOGS } from 'components/Hogpedia/mainPageData'

/**
 * The Hogpedia Main Page, in the shape Wikipedia's 2007 one had: a welcome banner with an
 * article count, then a grid of dense modules.
 *
 * Every module links to a page that exists. The article count comes from the same build-time
 * query the search index uses, so it is always right.
 */
export default function HogpediaMainPage(): JSX.Element {
    const articles = onlyArticles(useHogpediaArticles())
    // Every hand-written module entry is checked against the live article index, so the Main
    // Page cannot link to an article that was renamed or removed.
    const news = IN_THE_NEWS
    const facts = onlyResolvable(DID_YOU_KNOW, articles)
    const hogs = onlyResolvable(FEATURED_HOGS, articles)
    const hog = hogs[dayIndex(hogs.length)]
    const featured = articles.find((article) => article.slug === '/hogpedia/posthog')

    return (
        <>
            <SEO
                title="Hogpedia, the free encyclopedia"
                description="An encyclopedia of PostHog products, concepts, company history, and lore. Written in the style of a 2007 encyclopedia, sourced from PostHog's own documentation and handbook."
                canonicalUrl="/hogpedia"
                noindex
            />
            <Explorer template="generic" slug="hogpedia" title="Hogpedia" fullScreen>
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

                        {hog && (
                            <Module title="Featured hog" tint="warm">
                                <FeaturedHog hog={hog.hog} name={hog.name} caption={hog.caption} to={hog.to} />
                            </Module>
                        )}

                        <Module title="Did you know…">
                            <ul>
                                {facts.map((fact) => (
                                    <li key={fact.text}>
                                        …that {fact.text} <Link to={fact.to}>({fact.label})</Link>
                                    </li>
                                ))}
                            </ul>
                        </Module>

                        <Module title="In the news">
                            <ul>
                                {news.map((item) => (
                                    <li key={item.text}>
                                        {item.text} <Link to={item.to}>{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
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
