import React, { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { navigate } from 'gatsby'
import Link from 'components/Link'
import { useHogpediaArticles, onlyArticles, findEasterEgg, HogpediaArticleSummary } from './data'

/**
 * A Fuse index over the Hogpedia articles.
 *
 * Fuse is already a site dependency, and the corpus is a few dozen short records, so the
 * index builds in memory on first use. There is no build artifact and no remote index.
 * The same pattern is in `src/pages/bookmarks.tsx`.
 */
const useSearch = (): { articles: HogpediaArticleSummary[]; search: (query: string) => HogpediaArticleSummary[] } => {
    const articles = onlyArticles(useHogpediaArticles())

    const fuse = useMemo(
        () =>
            new Fuse(articles, {
                keys: [
                    { name: 'title', weight: 3 },
                    { name: 'aliases', weight: 2 },
                    { name: 'categories', weight: 1 },
                    { name: 'description', weight: 1 },
                ],
                threshold: 0.35,
                ignoreLocation: true,
            }),
        [articles]
    )

    const search = (query: string) => {
        if (!query.trim()) {
            return []
        }
        return fuse
            .search(query)
            .slice(0, 10)
            .map((result) => result.item)
    }

    return { articles, search }
}

/** The sidebar search box, with the two buttons a 2007 encyclopedia had. */
export const SearchBox = (): JSX.Element => {
    const { search } = useSearch()
    const [query, setQuery] = useState('')
    const results = search(query)

    const goToBestMatch = () => {
        if (results[0]) {
            navigate(results[0].slug)
        } else if (query.trim()) {
            navigate(`/hogpedia/search?q=${encodeURIComponent(query.trim())}`)
        }
    }

    return (
        <form
            className="hp-search"
            role="search"
            onSubmit={(event) => {
                event.preventDefault()
                goToBestMatch()
            }}
        >
            <label className="sr-only" htmlFor="hogpedia-search">
                Search Hogpedia
            </label>
            <input
                id="hogpedia-search"
                className="hp-search-input"
                type="search"
                value={query}
                placeholder="Search Hogpedia"
                onChange={(event) => setQuery(event.target.value)}
            />
            <div className="hp-search-buttons">
                <button type="submit" className="hp-button">
                    Go
                </button>
                <button
                    type="button"
                    className="hp-button"
                    onClick={() =>
                        navigate(`/hogpedia/search${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`)
                    }
                >
                    Search
                </button>
            </div>
            {query.trim().length > 1 && (
                <ul className="hp-suggestions">
                    {results.length > 0 ? (
                        results.slice(0, 6).map((article) => (
                            <li key={article.slug}>
                                <Link to={article.slug}>{article.title}</Link>
                            </li>
                        ))
                    ) : (
                        <li className="hp-suggestions-empty">No article matches this title.</li>
                    )}
                </ul>
            )}
        </form>
    )
}

/**
 * The results view behind the "Search" button.
 *
 * A handful of queries also print a notice in the voice of a 2007 search page. The real
 * results always render underneath it, so the joke never hides the answer.
 */
export const SearchResults = ({ initialQuery }: { initialQuery: string }): JSX.Element => {
    const { articles, search } = useSearch()
    const [query, setQuery] = useState(initialQuery)
    const trimmed = query.trim()
    const results = search(trimmed)
    const egg = findEasterEgg(trimmed)

    return (
        <div>
            <form
                className="hp-search"
                role="search"
                style={{ padding: '0 0 0.8em 0' }}
                onSubmit={(event) => event.preventDefault()}
            >
                <input
                    className="hp-search-input"
                    type="search"
                    value={query}
                    placeholder="Search Hogpedia"
                    onChange={(event) => setQuery(event.target.value)}
                    style={{ maxWidth: '26em' }}
                />
            </form>

            {egg && (
                <div className="hp-notice hp-notice-style" role="note">
                    <span className="hp-notice-icon" aria-hidden="true">
                        🔎
                    </span>
                    <span className="hp-notice-text">{egg}</span>
                </div>
            )}

            {!trimmed ? (
                <>
                    <p>
                        Enter a term above, or browse{' '}
                        <Link to="/hogpedia/all-pages">all {articles.length} articles</Link>.
                    </p>
                </>
            ) : results.length === 0 ? (
                <p>
                    Hogpedia has no article with this exact name. You can browse{' '}
                    <Link to="/hogpedia/all-pages">all pages</Link> instead.
                </p>
            ) : (
                <>
                    <p>
                        Showing {results.length} {results.length === 1 ? 'result' : 'results'} for <b>{trimmed}</b>.
                    </p>
                    <ul>
                        {results.map((article) => (
                            <li key={article.slug} style={{ marginBottom: '0.5em' }}>
                                <Link to={article.slug}>
                                    <b>{article.title}</b>
                                </Link>
                                <br />
                                <span>{article.description}</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}
