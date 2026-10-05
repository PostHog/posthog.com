import React from 'react'
import Link from 'components/Link'
import { articleSourceUrls } from './context'

export type TabName = 'article' | 'discussion' | 'source' | 'history'

/**
 * The tab strip across the top of a 2007 article: article, discussion, view source,
 * history.
 *
 * Every tab that renders as a link opens something real. "View source" and "history" go
 * to the article's file and its commit log on GitHub. "Discussion" only becomes a link
 * when a talk page exists; otherwise it renders as plain text, because Hogpedia has no
 * dead links.
 */
export default function ArticleTabs({
    slug,
    filePath,
    hasTalkPage,
    current = 'article',
}: {
    slug: string
    filePath?: string
    hasTalkPage: boolean
    current?: TabName
}): JSX.Element {
    const urls = articleSourceUrls(filePath)
    const articlePath = slug.replace('/hogpedia/talk/', '/hogpedia/')
    const talkPath = articlePath.replace('/hogpedia/', '/hogpedia/talk/')

    const tabs: { name: TabName; label: string; to?: string; external?: boolean }[] = [
        { name: 'article', label: 'article', to: articlePath },
        { name: 'discussion', label: 'discussion', to: hasTalkPage ? talkPath : undefined },
        { name: 'source', label: 'view source', to: urls?.source, external: true },
        { name: 'history', label: 'history', to: urls?.history, external: true },
    ]

    return (
        <nav className="hp-tabs" aria-label="Article views">
            <ul>
                {tabs.map((tab) => (
                    <li key={tab.name} className={tab.name === current ? 'hp-tab-selected' : undefined}>
                        {tab.to ? (
                            <Link
                                to={tab.to}
                                externalNoIcon
                                {...(tab.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                            >
                                {tab.label}
                            </Link>
                        ) : (
                            <span title="This page does not exist.">{tab.label}</span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    )
}
