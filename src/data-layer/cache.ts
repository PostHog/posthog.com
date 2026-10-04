// JSON files under .cache/data-layer. Sources are fetched once and read many times: by the
// integration that writes query files, and by every page that `getStaticPaths` builds.
import fs from 'node:fs'
import path from 'node:path'
import { CACHE_DIR } from './paths'

export function cachePath(name: string): string {
    return path.join(CACHE_DIR, `${name}.json`)
}

export function readCache<T>(name: string): T | undefined {
    try {
        return JSON.parse(fs.readFileSync(cachePath(name), 'utf8')) as T
    } catch {
        return undefined
    }
}

export function writeCache(name: string, value: unknown): void {
    const file = cachePath(name)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, JSON.stringify(value))
}

/** Age of a cache file in milliseconds, or Infinity when it does not exist. */
export function cacheAge(name: string): number {
    try {
        return Date.now() - fs.statSync(cachePath(name)).mtimeMs
    } catch {
        return Infinity
    }
}
