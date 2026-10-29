import React from 'react'
import Link from 'components/Link'
import { navigate } from 'gatsby'
import HogpediaLogo from './HogpediaLogo'
import { SearchBox } from './HogpediaSearch'
import { useHogpediaArticles, pickRandomArticle } from './data'

type PortletLink = { label: string; to?: string; external?: boolean; onClick?: (e: React.MouseEvent) => void }

const Portlet = ({
    title,
    links,
    children,
    currentPath,
}: {
    title: string
    links?: PortletLink[]
    children?: React.ReactNode
    currentPath?: string
}): JSX.Element => (
    <div className="hp-portlet">
        <h5 className="hp-portlet-title">{title}</h5>
        <div className="hp-portlet-body">
            {links && (
                <ul>
                    {links.map((link) => (
                        <li key={link.label} className={link.to && link.to === currentPath ? 'hp-current' : undefined}>
                            {link.to ? (
                                <Link
                                    to={link.to}
                                    externalNoIcon
                                    onClick={link.onClick}
                                    {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                                >
                                    {link.label}
                                </Link>
                            ) : (
                                <span>{link.label}</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            {children}
        </div>
    </div>
)

/**
 * The MonoBook sidebar: the logo, then the portlets.
 *
 * Every entry here goes to a page that exists. Where a 2007 encyclopedia had an item with
 * nothing behind it, this sidebar leaves it out rather than render a link that fails.
 */
export default function HogpediaSidebar({ currentPath }: { currentPath?: string }): JSX.Element {
    const articles = useHogpediaArticles()

    const hasFeatured = articles.some((article) => article.slug === '/hogpedia/posthog')

    const navigation: PortletLink[] = [
        { label: 'Main page', to: '/hogpedia' },
        { label: 'All pages', to: '/hogpedia/all-pages' },
        // Checked against the live index, so the sidebar cannot offer a missing article.
        ...(hasFeatured ? [{ label: 'Featured article', to: '/hogpedia/posthog' }] : []),
        {
            label: 'Random article',
            // The href is a real, server-rendered index page, so a crawler and a reader
            // with no JavaScript both get somewhere useful. The handler short-circuits it
            // to a random article for everyone else. Picking during render would be a
            // hydration mismatch.
            to: '/hogpedia/random',
            onClick: (event) => {
                const article = pickRandomArticle(articles)
                if (article) {
                    event.preventDefault()
                    navigate(article.slug)
                }
            },
        },
        { label: 'Recent changes', to: '/hogpedia/recent-changes' },
        { label: 'Donate to Hogpedia', to: '/hogpedia/donate' },
    ]

    // Two blocks rather than one, so a narrow window can keep the logo and the search box
    // above the article and move the rest below it. See the `order` rules in hogpedia.css.
    //
    // Navigation ends at "Donate to Hogpedia". The per-page GitHub links live in the tab
    // strip, and the categories are listed on the Main Page and at the foot of each
    // article, so nothing here is the only route to anywhere.
    return (
        <>
            <div className="hogpedia-nav-head">
                <HogpediaLogo />

                <Portlet title="search">
                    <SearchBox />
                </Portlet>
            </div>

            <div className="hogpedia-nav-tail">
                <Portlet title="navigation" links={navigation} currentPath={currentPath} />
            </div>
        </>
    )
}
