import React from 'react'
import Link from 'components/Link'
import { categoryPath } from './categories'

export type SeeAlsoEntry = string

const parseEntry = (entry: SeeAlsoEntry): { label: string; url: string } => {
    const [label, url] = entry.split('|')
    return { label: label.trim(), url: (url || '').trim() }
}

/**
 * The "See also" list and the category bar that closed a 2007 article.
 *
 * A "See also" entry is `Label|/path`. Every path must resolve, so the build-time link
 * check in the pull request covers them.
 */
export const SeeAlso = ({ entries }: { entries?: SeeAlsoEntry[] }): JSX.Element | null => {
    const parsed = (entries || []).map(parseEntry).filter((entry) => entry.url)
    if (parsed.length === 0) {
        return null
    }
    return (
        <div className="hp-seealso">
            <ul>
                {parsed.map((entry) => (
                    <li key={entry.url}>
                        <Link to={entry.url} externalNoIcon>
                            {entry.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const CategoryLinks = ({ categories }: { categories?: string[] }): JSX.Element | null => {
    if (!categories || categories.length === 0) {
        return null
    }
    return (
        <div className="hp-catlinks">
            <b>Categories</b>:{' '}
            <ul>
                {categories.map((category) => (
                    <li key={category}>
                        <Link to={categoryPath(category)}>{category}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const ArticleFooter = ({ lastModified }: { lastModified?: string }): JSX.Element => (
    <div className="hp-footer">
        {lastModified && <p>This page was last modified on {lastModified}.</p>}
        <p>
            Hogpedia is part of{' '}
            <Link to="https://github.com/PostHog/posthog.com" externalNoIcon className="hp-external">
                the posthog.com repository
            </Link>
            . Hedgehogs are PostHog brand assets – read the <Link to="/handbook/brand/assets">brand guide</Link> before
            reusing one.
        </p>
        <p>
            <Link to="/hogpedia">Main Page</Link> · <Link to="/hogpedia/about">About</Link> ·{' '}
            <Link to="/hogpedia/donate">Donate</Link> · <Link to="/">posthog.com</Link>
        </p>
    </div>
)
