// The page window. Every route renders this one island (through PageIsland.astro) with the module of
// its page component (a view in src/views or a template in src/templates) and that component's
// props. Modules load lazily, so a page downloads only its own code. The page component and main
// content are loaded before rendering on both sides (PageIsland.astro on the server, the client:page
// directive in the browser), so they render without Suspense and hydration cannot be interrupted.
import React, { useEffect, useMemo } from 'react'
import IslandRoot from './IslandRoot'
import AppWindow from 'components/AppWindow'
import { MainContentContext, useModule } from './modules'
import { createWindow, registerPageWindow } from '../context/App'
import { useLocation } from 'lib/navigation'

export interface PageIslandProps {
    url: string
    /** Module path from the project root, e.g. "/src/templates/Handbook.tsx". */
    module: string
    /** Props for the page component. Views get `data`, `pageContext`, and `params`; templates get their own props. */
    props?: object
    /** The page's MDX modules, loaded before rendering (see PageIsland.astro). */
    content?: string[]
}

// Page components receive a `location` prop that follows query-string changes.
function PageComponent({ module, ...props }: { module: string } & Record<string, any>) {
    const Component = useModule(module, 'page')
    const location = useLocation()
    return <Component {...props} location={location} />
}

function PageWindow({ url, module, props: pageProps = {} }: Omit<PageIslandProps, 'content'>) {
    const pathname = new URL(url).pathname

    const item = useMemo(() => {
        const props = { ...pageProps, path: pathname }
        return createWindow(pathname, pathname, null, {
            props,
            element: <PageComponent module={module} {...props} />,
        })
    }, [url])

    useEffect(() => registerPageWindow(item), [item])

    return <AppWindow item={item} />
}

export default function PageIsland({ content, ...props }: PageIslandProps): JSX.Element {
    return (
        <IslandRoot url={props.url}>
            <MainContentContext.Provider value={content ?? []}>
                <PageWindow {...props} />
            </MainContentContext.Provider>
        </IslandRoot>
    )
}
