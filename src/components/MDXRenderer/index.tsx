// Renders a compiled content module (contents/**/*.mdx and the docs from the posthog/posthog clone).
// `children` is the content key: the module path from the project root, e.g.
// "/contents/docs/feature-flags/installation.mdx".
//
// Content modules load lazily, so a page downloads only its own content. Server rendering waits for
// the module and records it (lib/head.ts); in the browser, the page island's `client:page` directive
// loads every recorded module before hydrating (see src/islands/modules.ts).
import React, { Suspense, useContext } from 'react'
import { collectContent } from 'lib/head'
import { ServerLocationContext } from 'lib/navigation'
import { loadContentModule, MainContentContext, useModule } from '../../islands/modules'

/** Starts downloading a content module before it renders. */
export function preloadContent(key?: string | null): void {
    if (key) loadContentModule(key).catch(() => undefined)
}

function Content({ contentKey, ...props }: { contentKey: string } & Record<string, unknown>) {
    const Component = useModule(contentKey, 'content')
    return <Component {...props} />
}

export function MDXRenderer({ children, ...props }: { children: string } & Record<string, unknown>): JSX.Element {
    const serverLocation = useContext(ServerLocationContext)
    const mainContent = useContext(MainContentContext)
    if (typeof window === 'undefined' && serverLocation) collectContent(serverLocation.pathname, children)
    // The page's content modules are loaded before rendering on both sides; anything else may still load.
    if (mainContent.includes(children)) return <Content contentKey={children} {...props} />
    return (
        <Suspense fallback={null}>
            <Content contentKey={children} {...props} />
        </Suspense>
    )
}

export default MDXRenderer
