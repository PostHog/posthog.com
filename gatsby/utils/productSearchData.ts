import * as fs from 'fs'
import * as path from 'path'
import * as ts from 'typescript'
import Slugger from 'github-slugger'

/**
 * Extracts searchable text from the product marketing data in
 * `src/hooks/productData/*.tsx` so it can be fed to search indexes (Algolia at
 * deploy time via gatsby-plugin-algolia, and Inkeep via the generated `.md`
 * pages listed in llms.txt).
 *
 * Those modules import UI components (`components/*`, `@posthog/icons`, …)
 * through webpack aliases, so they can't be imported from gatsby-node
 * directly. Instead, each file is transpiled with the TypeScript compiler and
 * evaluated with a tiny module loader that follows relative imports and stubs
 * everything else. JSX is compiled to a plain object tree (via a React shim)
 * so text inside JSX values can still be extracted.
 */

const PRODUCT_DATA_DIR = path.join(process.cwd(), 'src', 'hooks', 'productData')

export type ProductSearchHeading = { value: string; depth: number; fragment: string }

export type ProductSearchEntry = {
    handle: string
    name: string
    slug: string
    excerpt: string
    rawBody: string
    headings: ProductSearchHeading[]
}

type JsxNode = { __jsx: true; type: unknown; props: Record<string, unknown>; children: unknown[] }

const isJsxNode = (value: unknown): value is JsxNode =>
    typeof value === 'object' && value !== null && (value as JsxNode).__jsx === true

// React shim: createElement returns a plain tree so JSX-valued fields (e.g.
// descriptions containing <Link>) can be walked for their text content
const reactShim: any = new Proxy(
    {
        createElement: (type: unknown, props: Record<string, unknown> | null, ...children: unknown[]): JsxNode => ({
            __jsx: true,
            type,
            props: props || {},
            children,
        }),
        Fragment: 'Fragment',
        isValidElement: isJsxNode,
    },
    {
        get: (target: any, key: string) => (key in target ? target[key] : () => null),
    }
)
reactShim.default = reactShim

// Inert stand-in for component/icon/package imports — usable as a component,
// function, constant, or namespace without throwing
const stub: any = new Proxy(
    function () {
        return null
    },
    {
        get: (_target, key) => (key === 'default' ? stub : key === '__esModule' ? true : stub),
        apply: () => null,
        construct: () => ({}),
    }
)

const loadModule = (filePath: string, cache: Record<string, { exports: any }>): any => {
    if (cache[filePath]) return cache[filePath].exports

    const source = fs.readFileSync(filePath, 'utf8')
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2019,
            jsx: ts.JsxEmit.React,
            esModuleInterop: true,
        },
        fileName: filePath,
    })

    const mod = { exports: {} }
    cache[filePath] = mod

    const customRequire = (request: string) => {
        if (request === 'react') return reactShim
        if (request.startsWith('.')) {
            const base = path.resolve(path.dirname(filePath), request)
            const candidates = [
                base,
                `${base}.ts`,
                `${base}.tsx`,
                `${base}.js`,
                path.join(base, 'index.ts'),
                path.join(base, 'index.tsx'),
            ]
            for (const candidate of candidates) {
                if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
                    return loadModule(candidate, cache)
                }
            }
            throw new Error(`Cannot resolve ${request} from ${filePath}`)
        }
        return stub
    }

    const fn = new Function('exports', 'require', 'module', '__filename', '__dirname', outputText)
    fn(mod.exports, customRequire, mod, filePath, path.dirname(filePath))
    return mod.exports
}

// Flattens any value (string, JSX tree, array) to its visible text
const textOf = (value: unknown): string => {
    if (typeof value === 'string') return value.trim()
    if (typeof value === 'number') return String(value)
    if (Array.isArray(value)) return value.map(textOf).filter(Boolean).join(' ')
    if (isJsxNode(value)) return textOf(value.children)
    return ''
}

// Keys whose values carry copy worth indexing. Walked in document order so the
// extracted text roughly follows the on-page narrative.
const TEXT_KEYS = new Set([
    'title',
    'headline',
    'subtitle',
    'description',
    'intro',
    'question',
    'answer',
    'text',
    'prompts',
    'rows',
])

// Keys that hold text we never want in search (image alts handled by `alt`
// keys not being in TEXT_KEYS; these are containers to skip entirely)
const SKIP_KEYS = new Set([
    'seo',
    'screenshots',
    'videos',
    'images',
    'hog',
    'hogs',
    'presenterNotes',
    'slider',
    'addonSliders',
    'volume',
])

const sectionText = (value: unknown, lines: string[] = []): string[] => {
    if (typeof value === 'string' || isJsxNode(value)) {
        const text = textOf(value)
        if (text) lines.push(text)
        return lines
    }
    if (Array.isArray(value)) {
        for (const item of value) sectionText(item, lines)
        return lines
    }
    if (typeof value === 'object' && value !== null) {
        for (const [key, child] of Object.entries(value)) {
            if (SKIP_KEYS.has(key)) continue
            if (TEXT_KEYS.has(key)) {
                const text = textOf(child)
                if (text) {
                    lines.push(text)
                    continue
                }
            }
            if (typeof child === 'object' && child !== null && !isJsxNode(child)) {
                sectionText(child, lines)
            }
        }
    }
    return lines
}

// Collects feature/section titles (any depth) for Algolia's `headings` field
const collectTitles = (value: unknown, titles: string[] = []): string[] => {
    if (Array.isArray(value)) {
        for (const item of value) collectTitles(item, titles)
        return titles
    }
    if (typeof value === 'object' && value !== null && !isJsxNode(value)) {
        for (const [key, child] of Object.entries(value)) {
            if (key === 'title') {
                const text = textOf(child)
                if (text) titles.push(text)
            } else if (typeof child === 'object' && child !== null) {
                collectTitles(child, titles)
            }
        }
    }
    return titles
}

// Top-level productData keys rendered as sections, in display order
const SECTIONS: { key: string; heading: string }[] = [
    { key: 'overview', heading: 'Overview' },
    { key: 'features', heading: 'Features' },
    { key: 'useCases', heading: 'Use cases' },
    { key: 'questions', heading: 'Common questions' },
    { key: 'ai', heading: 'AI prompts' },
    { key: 'mcp', heading: 'MCP' },
    { key: 'installation', heading: 'Installation' },
    { key: 'pairsWith', heading: 'Pairs with' },
]

const buildEntry = (product: any): ProductSearchEntry | null => {
    const name = textOf(product.name)
    const slug = typeof product.slug === 'string' ? product.slug.replace(/^\//, '') : ''
    if (!name || !slug) return null

    const excerpt =
        textOf(product.seo?.description) ||
        textOf(product.shortDescription) ||
        textOf(product.pricingDescription) ||
        textOf(product.overview?.description)

    const parts: string[] = [`# ${name}`, '']
    if (excerpt) parts.push(excerpt, '')

    const slugger = new Slugger()
    const headings: ProductSearchHeading[] = []

    for (const { key, heading } of SECTIONS) {
        const section = product[key]
        if (!section) continue
        const lines = sectionText(section)
        if (lines.length === 0) continue
        parts.push(`## ${heading}`, '', ...lines.map((line) => `${line}\n`))
        if (key === 'features') {
            for (const title of collectTitles(section)) {
                headings.push({ value: title, depth: 3, fragment: slugger.slug(title) })
            }
        }
    }

    return {
        handle: String(product.handle || slug),
        name,
        slug,
        excerpt,
        rawBody: parts.join('\n'),
        headings,
    }
}

let cachedEntries: ProductSearchEntry[] | null = null

export const getProductSearchEntries = (): ProductSearchEntry[] => {
    if (cachedEntries) return cachedEntries

    const entries: ProductSearchEntry[] = []
    const files = fs
        .readdirSync(PRODUCT_DATA_DIR)
        .filter((file) => file.endsWith('.tsx') && fs.statSync(path.join(PRODUCT_DATA_DIR, file)).isFile())

    for (const file of files) {
        try {
            const cache: Record<string, { exports: any }> = {}
            const exported = loadModule(path.join(PRODUCT_DATA_DIR, file), cache)
            const product = Object.values(exported).find(
                (value: any) => value && typeof value === 'object' && value.name && value.slug
            )
            if (!product) {
                console.warn(`productSearchData: no product export found in ${file}`)
                continue
            }
            const entry = buildEntry(product)
            if (entry) entries.push(entry)
        } catch (error) {
            // Never fail the build over marketing copy extraction
            console.warn(`productSearchData: failed to extract ${file}:`, error)
        }
    }

    cachedEntries = entries
    return entries
}
