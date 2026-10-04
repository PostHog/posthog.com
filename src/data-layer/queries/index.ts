// Static data for client components. Each module in this folder exports `queries` (and is listed in
// `modules` below): named functions
// that read the data layer (`nodes()`, `getContent()`) and return what one group of components
// needs. `writeQueries` runs them after the sources load and writes
// .cache/data-layer/queries/<name>.json.
//
// A component imports the JSON and types it with the query's return type:
//
//     import teamsJson from '@data/teams.json'
//     import type { QueryResult } from '~/data-layer/queries'
//     const teams = teamsJson as QueryResult<typeof import('~/data-layer/queries/teams').queries, 'teams'>
//
// (Most groups export a ready-made alias, e.g. `export type Teams = QueryResult<typeof queries, 'teams'>`.)
//
// Keep each query to the fields its components read: the JSON is bundled into the client code of
// every page that uses it.
import fs from 'node:fs'
import path from 'node:path'
import { QUERY_DIR } from '../paths'
import { queries as content } from './content'
import { queries as navs } from './navs'
import { queries as people } from './people'
import { queries as products } from './products'
import { queries as roadmap } from './roadmap'

export type Query = () => unknown | Promise<unknown>
export type QueryResult<Q extends Record<string, Query>, Name extends keyof Q> = Awaited<ReturnType<Q[Name]>>

// Every query module. Astro loads this file through a short-lived Vite module runner, so modules are
// imported statically (a dynamic import after config load fails).
const modules: Record<string, Record<string, Query>> = { navs, people, roadmap, products, content }

function loadQueries(): Record<string, Query> {
    const all: Record<string, Query> = {}
    for (const [file, queries] of Object.entries(modules)) {
        for (const [name, query] of Object.entries(queries)) {
            if (all[name]) throw new Error(`[data-layer] query "${name}" is defined twice (second time in ${file}.ts)`)
            all[name] = query
        }
    }
    return all
}

export async function writeQueries(): Promise<void> {
    fs.mkdirSync(QUERY_DIR, { recursive: true })
    const started = Date.now()
    const queries = loadQueries()
    for (const [name, query] of Object.entries(queries)) {
        const result = await query()
        const file = path.join(QUERY_DIR, `${name}.json`)
        const json = JSON.stringify(result)
        // Rewrite only on change, so Vite does not reload modules that import an unchanged file.
        if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== json) fs.writeFileSync(file, json)
    }
    console.log(`[data-layer] ${Object.keys(queries).length} queries written in ${Date.now() - started}ms`)
}
