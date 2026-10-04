// Page components (src/views, src/templates) and content (MDX) as lazily loaded modules.
//
// Hydration must not suspend: while a lazy module loads, shared state (the signed-in user, display
// settings) changes and reaches the not-yet-hydrated boundary, and React throws away the server HTML
// and renders on the client, which blinks. So the `client:page` directive (pageDirective.ts) loads a
// page's modules before it hydrates, and components render loaded modules synchronously.
import { createContext } from 'react'
import type React from 'react'

type ComponentModule = { default: React.ComponentType<any> }
type Loader = () => Promise<ComponentModule>

const pageLoaders = import.meta.glob(['/src/views/**/*.{tsx,jsx,ts,js}', '/src/templates/**/*.{tsx,jsx}']) as Record<
    string,
    Loader
>

const contentLoaders = {
    ...(import.meta.glob('/contents/**/*.mdx') as Record<string, Loader>),
    ...(import.meta.glob('/.cache/posthog-main-repo/docs/published/**/*.{md,mdx}') as Record<string, Loader>),
}

const loaded = new Map<string, React.ComponentType<any>>()
const loading = new Map<string, Promise<React.ComponentType<any>>>()

function load(loaders: Record<string, Loader>, key: string, kind: string): Promise<React.ComponentType<any>> {
    let promise = loading.get(key)
    if (!promise) {
        const loader = loaders[key]
        if (!loader) return Promise.reject(new Error(`No ${kind} module "${key}"`))
        promise = loader().then((module) => {
            loaded.set(key, module.default)
            return module.default
        })
        loading.set(key, promise)
    }
    return promise
}

export const loadPageModule = (key: string) => load(pageLoaders, key, 'page')
export const loadContentModule = (key: string) => load(contentLoaders, key, 'content')

/** The page's content modules: loaded before rendering on both sides, so they need no Suspense. */
export const MainContentContext = createContext<string[]>([])

/** True when a module is loaded and renders at once. */
export const isModuleLoaded = (key: string) => loaded.has(key)

/**
 * The component for a module key: returned at once when loaded, otherwise the load promise is
 * thrown so the nearest Suspense boundary waits (server rendering waits for all of them).
 */
export function useModule(key: string, kind: 'page' | 'content'): React.ComponentType<any> {
    const component = loaded.get(key)
    if (component) return component
    throw kind === 'page' ? loadPageModule(key) : loadContentModule(key)
}

// The `client:page` directive is bundled on its own (without Vite's import.meta.glob), so it reaches
// the loaders through this global, which exists once the island's code has loaded.
declare global {
    // eslint-disable-next-line no-var
    var __preloadPageIsland: ((module?: string, content?: string[]) => Promise<unknown>) | undefined
}

if (typeof window !== 'undefined') {
    globalThis.__preloadPageIsland = (module, content = []) =>
        Promise.all([
            module && loadPageModule(module),
            ...content.map((key) => loadContentModule(key).catch(() => undefined)),
        ])
}
