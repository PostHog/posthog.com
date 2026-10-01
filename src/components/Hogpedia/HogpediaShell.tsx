import React from 'react'
import ScrollArea from 'components/RadixUI/ScrollArea'
import HogpediaSidebar from './HogpediaSidebar'
import ArticleTabs, { TabName } from './ArticleTabs'
import { ArticleFooter } from './ArticleFooter'
import { HogpediaProvider } from './context'
import './hogpedia.css'

/**
 * The inner chrome of Hogpedia: the sidebar column, the tab strip, the white content area,
 * and the footer.
 *
 * The window chrome around this – the title bar, the back and forward buttons, the address
 * bar – comes from `<Explorer fullScreen>` in the page or template that renders this. That
 * split keeps `<SEO>` beside `<Explorer>`, the way `src/pages/paint/index.tsx` does it.
 *
 * The root sets `container-type: inline-size` in `hogpedia.css`, so the layout responds to
 * the window width and not the viewport width. Every app window is resizable.
 */
export default function HogpediaShell({
    title,
    tagline = 'From Hogpedia, the free encyclopedia',
    slug,
    filePath,
    hasTalkPage = false,
    referenceIds,
    sectionSources,
    primarySource,
    currentTab = 'article',
    showTabs = true,
    lastModified,
    children,
}: {
    title: string
    tagline?: string | false
    slug: string
    filePath?: string
    hasTalkPage?: boolean
    referenceIds?: string[]
    sectionSources?: Record<string, string>
    primarySource?: string
    currentTab?: TabName
    showTabs?: boolean
    lastModified?: string
    children: React.ReactNode
}): JSX.Element {
    return (
        <HogpediaProvider value={{ slug, filePath, hasTalkPage, referenceIds, sectionSources, primarySource }}>
            <div className="hogpedia" data-scheme="primary">
                <ScrollArea className="hogpedia-scroll">
                    <div className="hogpedia-frame">
                        <div className="hogpedia-nav-column">
                            <HogpediaSidebar currentPath={slug} />
                        </div>
                        <div className="hogpedia-body">
                            {showTabs && (
                                <ArticleTabs
                                    slug={slug}
                                    filePath={filePath}
                                    hasTalkPage={hasTalkPage}
                                    current={currentTab}
                                />
                            )}
                            <div className="hp-content">
                                <h1 className="hp-title">{title}</h1>
                                {tagline !== false && <p className="hp-tagline">{tagline}</p>}
                                {children}
                            </div>
                            <ArticleFooter lastModified={lastModified} />
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </HogpediaProvider>
    )
}
