import fs, { createWriteStream } from 'fs'
import { get } from 'https'
import { tmpdir } from 'os'
import { join } from 'path'
import process from 'process'
import { pipeline } from 'stream'
import { promisify } from 'util'

import { HandlerResponse } from '@netlify/functions'
import etag from 'etag'
import { existsSync, copySync, readFileSync, readJSON, ensureFileSync } from 'fs-extra'
import type { GraphQLEngine } from 'gatsby/cache-dir/query-engine'
import { link } from 'linkfs'

// Alias in the temp directory so it's writable
export const TEMP_CACHE_DIR = join(tmpdir(), 'gatsby', '.cache')
const streamPipeline = promisify(pipeline)

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface Global {
            _fsWrapper: typeof import('fs')
        }
    }
}

/**
 * Downloads a file from the CDN to the local aliased filesystem
 *
 * Mirrors functionality in the Netlify NextJS plugin
 * https://github.com/netlify/netlify-plugin-nextjs/blob/8f5648c848d4a4d42ac772e7a8a2a50fdc632220/plugin/src/templates/handlerUtils.ts#L19-L43
 */
export const downloadFile = (downloadUrl: string, filePath: string): Promise<void> =>
    new Promise((resolve, reject) => {
        // eslint-disable-next-line no-magic-numbers
        const req = get(downloadUrl, { timeout: 10_000 }, (response) => {
            // eslint-disable-next-line no-magic-numbers
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(
                    new Error(
                        `Failed to download ${downloadUrl}: ${response.statusCode} ${response.statusMessage || ''}`
                    )
                )
                return
            }
            const fileStream = createWriteStream(filePath)
            /* eslint-disable promise/prefer-await-to-callbacks, promise/prefer-await-to-then */
            streamPipeline(response, fileStream)
                .then(resolve)
                .catch((error) => {
                    console.log(`Error downloading ${downloadUrl}`, error)
                    reject(error)
                })
            /* eslint-enable */
        })

        req.on('error', (error) => {
            console.log(`Error downloading ${downloadUrl}`, error)
            reject(error)
        })
    })

/**
 * Hacks to deal with the fact that functions execute on a readonly filesystem
 */
export async function prepareFilesystem(cacheDir: string, siteUrl: string): Promise<void> {
    console.log('Preparing Gatsby filesystem')
    const rewrites = [
        [join(cacheDir, 'caches'), join(TEMP_CACHE_DIR, 'caches')],
        [join(cacheDir, 'caches-lmdb'), join(TEMP_CACHE_DIR, 'caches-lmdb')],
        [join(cacheDir, 'data'), join(TEMP_CACHE_DIR, 'data')],
    ]
    // Alias the cache dir paths to the temp dir
    const lfs = link(fs, rewrites) as typeof import('fs')

    // linkfs doesn't pass across the `native` prop, which graceful-fs needs
    for (const key in lfs) {
        if (Object.hasOwnProperty.call(fs[key], 'native')) {
            lfs[key].native = fs[key].native
        }
    }

    // 'promises' is not initially linked within the 'linkfs'
    // package, and is needed by underlying Gatsby code (the
    // @graphql-tools/code-file-loader)
    lfs.promises = link(fs.promises, rewrites)

    // Gatsby uses this instead of fs if present
    // eslint-disable-next-line no-underscore-dangle
    global._fsWrapper = lfs

    console.log('Starting to prepare data directory')

    if (
        process.env.GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE === 'true' ||
        process.env.GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE === '1'
    ) {
        console.log('Starting to stream data file')

        const dataMetadataPath = join(process.cwd(), '.cache', 'dataMetadata.json')
        const { fileName } = await readJSON(dataMetadataPath)
        const downloadUrl = new URL(`/${fileName}`, siteUrl).toString()

        console.log('Downloading data file from', downloadUrl)

        // Ensure the file to copy the downloaded file into exists
        const filePath = join(TEMP_CACHE_DIR, 'data', 'datastore', 'data.mdb')
        if (!existsSync(filePath)) {
            ensureFileSync(filePath)
        }
        return downloadFile(downloadUrl, filePath)
    }
    const dir = 'data'
    if (!process.env.NETLIFY_LOCAL && existsSync(join(TEMP_CACHE_DIR, dir))) {
        console.log('directory already exists')
        return
    }
    console.log(`Start copying ${dir}`)
    copySync(join(cacheDir, dir), join(TEMP_CACHE_DIR, dir))
    console.log(`End copying ${dir}`)
}

// Inlined from gatsby-core-utils

export function reverseFixedPagePath(pageDataRequestPath: string): string {
    return pageDataRequestPath === `index` ? `/` : pageDataRequestPath
}

export function getPagePathFromPageDataPath(pageDataPath: string): string | null {
    const matches = pageDataPath.matchAll(/^\/?page-data\/(.+)\/page-data.json$/gm)

    // Not sure why Gatsby does this!
    // eslint-disable-next-line no-unreachable-loop
    for (const [, requestedPagePath] of matches) {
        return reverseFixedPagePath(requestedPagePath)
    }

    return null
}

/**
 * Loads the bundled GraphQL engine from the Gatsby cache directory
 */
export function getGraphQLEngine(cacheDir: string): GraphQLEngine {
    const { GraphQLEngine: GQE } = require(join(cacheDir, 'query-engine')) as {
        GraphQLEngine: typeof GraphQLEngine
    }

    const dbPath = join(TEMP_CACHE_DIR, 'data', 'datastore')

    return new GQE({
        dbPath,
    })
}

/**
 * Gets an error page to return from a function
 */

export function getErrorResponse({
    statusCode = 500,
    error,
    renderMode,
}: {
    statusCode?: number
    error?: Error
    renderMode: 'DSG' | 'SSR'
}): HandlerResponse {
    let body = `<html><body><h1>${statusCode}</h1><p>${
        statusCode === 404 ? 'Not found' : 'Internal Server Error'
    }</p></body></html>`

    if (error) {
        console.error(error)
    }

    if (statusCode === 500 || statusCode === 404) {
        const filename = join(process.cwd(), 'public', `${statusCode}.html`)
        if (existsSync(filename)) {
            body = readFileSync(filename, 'utf8')
        }
    }
    return {
        statusCode,
        body,
        headers: {
            Tag: etag(body),
            'Content-Type': 'text/html; charset=utf-8',
            'X-Render-Mode': renderMode,
        },
    }
}
