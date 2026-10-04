// The data layer: the build-time store for data from external sources.
//
// Sources fetch data from APIs once, at startup, and write one JSON file per node type to
// .cache/data-layer. Everything else (query files for components, page data in getStaticPaths)
// reads those files with `nodes(type)`. A source whose keys are missing writes fake data instead,
// so the site builds and renders without production credentials.
import { cacheAge, readCache, writeCache } from './cache'
import { hasEnv } from './env'
import { sources } from './sources'

export type Nodes = Record<string, any[]>

export interface Source {
    /** A name for logs. */
    name: string
    /** The node types this source writes. */
    types: string[]
    /** Env vars the source needs. When one is missing, `fake` runs instead of `fetch`. */
    requires?: string[]
    /** Sources whose node types this one reads with `nodes()`. They run first. */
    after?: string[]
    fetch: () => Promise<Nodes>
    /** Data to use without credentials. Defaults to empty lists. */
    fake?: () => Nodes | Promise<Nodes>
}

export interface LoadOptions {
    /** Reuse a cache file younger than this (ms). 0 refetches everything. */
    maxAge?: number
    /** Throw when a source fails, instead of falling back to its cache or fake data. */
    strict?: boolean
}

const memo = new Map<string, any[]>()

/** The nodes of one type, as the last `loadSources` wrote them. */
export function nodes<T = any>(type: string): T[] {
    if (!memo.has(type)) memo.set(type, readCache<any[]>(`nodes/${type}`) ?? [])
    return memo.get(type) as T[]
}

function write(result: Nodes, source: Source) {
    for (const type of source.types) {
        writeCache(`nodes/${type}`, result[type] ?? [])
        memo.delete(type)
    }
}

async function fallback(source: Source): Promise<Nodes> {
    return (await source.fake?.()) ?? {}
}

async function run(source: Source, { maxAge = 0, strict = false }: LoadOptions) {
    const fresh = source.types.every((type) => cacheAge(`nodes/${type}`) < maxAge)
    if (fresh) return 'cached'
    if (source.requires && !hasEnv(...source.requires)) {
        write(await fallback(source), source)
        return `fake (missing ${source.requires.join(', ')})`
    }
    try {
        write(await source.fetch(), source)
        return 'fetched'
    } catch (error) {
        if (strict) throw new Error(`[data-layer] ${source.name} failed: ${(error as Error).message}`, { cause: error })
        const hasCache = source.types.every((type) => cacheAge(`nodes/${type}`) < Infinity)
        if (!hasCache) write(await fallback(source), source)
        return `failed, using ${hasCache ? 'stale cache' : 'fake data'} (${(error as Error).message.slice(0, 160)})`
    }
}

/** Runs every source, respecting `after` dependencies, and logs what each one did. */
export async function loadSources(options: LoadOptions = {}): Promise<void> {
    const started = Date.now()
    const done = new Map<string, Promise<void>>()
    const byName = new Map(sources.map((source) => [source.name, source]))

    const start = (source: Source): Promise<void> => {
        if (!done.has(source.name)) {
            done.set(
                source.name,
                (async () => {
                    await Promise.all((source.after ?? []).map((name) => start(byName.get(name)!)))
                    const sourceStarted = Date.now()
                    const outcome = await run(source, options)
                    console.log(`[data-layer] ${source.name}: ${outcome} in ${Date.now() - sourceStarted}ms`)
                })()
            )
        }
        return done.get(source.name)!
    }

    await Promise.all(sources.map(start))
    console.log(`[data-layer] sources ready in ${Date.now() - started}ms`)
}
