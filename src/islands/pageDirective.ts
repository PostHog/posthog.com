// `client:page`: hydrates the page island once its page component and content modules have loaded,
// so hydration never suspends (see modules.ts). Used by every route instead of `client:load`.
//
// Astro bundles directives on their own, without Vite, so this file has no imports: it loads the
// island first, which defines `__preloadPageIsland`.
import type { ClientDirective } from 'astro'

// Astro serializes island props as `[type, value]` pairs: type 0 is a plain value, type 1 an array
// of serialized values.
function stringProp(props: Record<string, unknown>, name: string): string | undefined {
    const value = props[name]
    return Array.isArray(value) && value[0] === 0 && typeof value[1] === 'string' ? value[1] : undefined
}

function stringsProp(props: Record<string, unknown>, name: string): string[] {
    const value = props[name]
    if (!Array.isArray(value) || value[0] !== 1 || !Array.isArray(value[1])) return []
    return value[1].flatMap((item) => (stringProp({ item }, 'item') ? [item[1] as string] : []))
}

const pageDirective: ClientDirective = async (load, _options, el) => {
    const props = JSON.parse(el.getAttribute('props') ?? '{}') as Record<string, unknown>
    // Every content module the server rendered for this page (see the layout).
    const rendered = JSON.parse(document.getElementById('page-content')?.textContent || '[]') as string[]
    const content = [...stringsProp(props, 'content'), ...rendered]
    const hydrate = await load()
    await globalThis.__preloadPageIsland?.(stringProp(props, 'module'), content)
    await hydrate()
}

export default pageDirective
