var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k
              var desc = Object.getOwnPropertyDescriptor(m, k)
              if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k]
                      },
                  }
              }
              Object.defineProperty(o, k2, desc)
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k
              o[k2] = m[k]
          })
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, 'default', { enumerable: true, value: v })
          }
        : function (o, v) {
              o['default'] = v
          })
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod
        var result = {}
        if (mod != null)
            for (var k in mod)
                if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k)
        __setModuleDefault(result, mod)
        return result
    }
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
;(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports)
        if (v !== undefined) module.exports = v
    } else if (typeof define === 'function' && define.amd) {
        define([
            'require',
            'exports',
            'fs',
            'https',
            'os',
            'path',
            'process',
            'stream',
            'util',
            'etag',
            'fs-extra',
            'linkfs',
        ], factory)
    }
})(function (require, exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.getErrorResponse =
        exports.getGraphQLEngine =
        exports.getPagePathFromPageDataPath =
        exports.reverseFixedPagePath =
        exports.prepareFilesystem =
        exports.downloadFile =
        exports.TEMP_CACHE_DIR =
            void 0
    const fs_1 = __importStar(require('fs'))
    const https_1 = require('https')
    const os_1 = require('os')
    const path_1 = require('path')
    const process_1 = __importDefault(require('process'))
    const stream_1 = require('stream')
    const util_1 = require('util')
    const etag_1 = __importDefault(require('etag'))
    const fs_extra_1 = require('fs-extra')
    const linkfs_1 = require('linkfs')
    // Alias in the temp directory so it's writable
    exports.TEMP_CACHE_DIR = (0, path_1.join)((0, os_1.tmpdir)(), 'gatsby', '.cache')
    const streamPipeline = (0, util_1.promisify)(stream_1.pipeline)
    /**
     * Downloads a file from the CDN to the local aliased filesystem
     *
     * Mirrors functionality in the Netlify NextJS plugin
     * https://github.com/netlify/netlify-plugin-nextjs/blob/8f5648c848d4a4d42ac772e7a8a2a50fdc632220/plugin/src/templates/handlerUtils.ts#L19-L43
     */
    const downloadFile = (downloadUrl, filePath) =>
        new Promise((resolve, reject) => {
            // eslint-disable-next-line no-magic-numbers
            const req = (0, https_1.get)(downloadUrl, { timeout: 10000 }, (response) => {
                // eslint-disable-next-line no-magic-numbers
                if (response.statusCode < 200 || response.statusCode > 299) {
                    reject(
                        new Error(
                            `Failed to download ${downloadUrl}: ${response.statusCode} ${response.statusMessage || ''}`
                        )
                    )
                    return
                }
                const fileStream = (0, fs_1.createWriteStream)(filePath)
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
    exports.downloadFile = downloadFile
    /**
     * Hacks to deal with the fact that functions execute on a readonly filesystem
     */
    async function prepareFilesystem(cacheDir, siteUrl) {
        console.log('Preparing Gatsby filesystem')
        const rewrites = [
            [(0, path_1.join)(cacheDir, 'caches'), (0, path_1.join)(exports.TEMP_CACHE_DIR, 'caches')],
            [(0, path_1.join)(cacheDir, 'caches-lmdb'), (0, path_1.join)(exports.TEMP_CACHE_DIR, 'caches-lmdb')],
            [(0, path_1.join)(cacheDir, 'data'), (0, path_1.join)(exports.TEMP_CACHE_DIR, 'data')],
        ]
        // Alias the cache dir paths to the temp dir
        const lfs = (0, linkfs_1.link)(fs_1.default, rewrites)
        // linkfs doesn't pass across the `native` prop, which graceful-fs needs
        for (const key in lfs) {
            if (Object.hasOwnProperty.call(fs_1.default[key], 'native')) {
                lfs[key].native = fs_1.default[key].native
            }
        }
        // 'promises' is not initially linked within the 'linkfs'
        // package, and is needed by underlying Gatsby code (the
        // @graphql-tools/code-file-loader)
        lfs.promises = (0, linkfs_1.link)(fs_1.default.promises, rewrites)
        // Gatsby uses this instead of fs if present
        // eslint-disable-next-line no-underscore-dangle
        global._fsWrapper = lfs
        console.log('Starting to prepare data directory')
        if (
            process_1.default.env.GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE === 'true' ||
            process_1.default.env.GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE === '1'
        ) {
            console.log('Starting to stream data file')
            const dataMetadataPath = (0, path_1.join)(process_1.default.cwd(), '.cache', 'dataMetadata.json')
            const { fileName } = await (0, fs_extra_1.readJSON)(dataMetadataPath)
            const downloadUrl = new URL(`/${fileName}`, siteUrl).toString()
            console.log('Downloading data file from', downloadUrl)
            // Ensure the file to copy the downloaded file into exists
            const filePath = (0, path_1.join)(exports.TEMP_CACHE_DIR, 'data', 'datastore', 'data.mdb')
            if (!(0, fs_extra_1.existsSync)(filePath)) {
                ;(0, fs_extra_1.ensureFileSync)(filePath)
            }
            return (0, exports.downloadFile)(downloadUrl, filePath)
        }
        const dir = 'data'
        if (
            !process_1.default.env.NETLIFY_LOCAL &&
            (0, fs_extra_1.existsSync)((0, path_1.join)(exports.TEMP_CACHE_DIR, dir))
        ) {
            console.log('directory already exists')
            return
        }
        console.log(`Start copying ${dir}`)
        ;(0, fs_extra_1.copySync)((0, path_1.join)(cacheDir, dir), (0, path_1.join)(exports.TEMP_CACHE_DIR, dir))
        console.log(`End copying ${dir}`)
    }
    exports.prepareFilesystem = prepareFilesystem
    // Inlined from gatsby-core-utils
    function reverseFixedPagePath(pageDataRequestPath) {
        return pageDataRequestPath === `index` ? `/` : pageDataRequestPath
    }
    exports.reverseFixedPagePath = reverseFixedPagePath
    function getPagePathFromPageDataPath(pageDataPath) {
        const matches = pageDataPath.matchAll(/^\/?page-data\/(.+)\/page-data.json$/gm)
        // Not sure why Gatsby does this!
        // eslint-disable-next-line no-unreachable-loop
        for (const [, requestedPagePath] of matches) {
            return reverseFixedPagePath(requestedPagePath)
        }
        return null
    }
    exports.getPagePathFromPageDataPath = getPagePathFromPageDataPath
    /**
     * Loads the bundled GraphQL engine from the Gatsby cache directory
     */
    function getGraphQLEngine(cacheDir) {
        const { GraphQLEngine: GQE } = require((0, path_1.join)(cacheDir, 'query-engine'))
        const dbPath = (0, path_1.join)(exports.TEMP_CACHE_DIR, 'data', 'datastore')
        return new GQE({
            dbPath,
        })
    }
    exports.getGraphQLEngine = getGraphQLEngine
    /**
     * Gets an error page to return from a function
     */
    function getErrorResponse({ statusCode = 500, error, renderMode }) {
        let body = `<html><body><h1>${statusCode}</h1><p>${
            statusCode === 404 ? 'Not found' : 'Internal Server Error'
        }</p></body></html>`
        if (error) {
            console.error(error)
        }
        if (statusCode === 500 || statusCode === 404) {
            const filename = (0, path_1.join)(process_1.default.cwd(), 'public', `${statusCode}.html`)
            if ((0, fs_extra_1.existsSync)(filename)) {
                body = (0, fs_extra_1.readFileSync)(filename, 'utf8')
            }
        }
        return {
            statusCode,
            body,
            headers: {
                Tag: (0, etag_1.default)(body),
                'Content-Type': 'text/html; charset=utf-8',
                'X-Render-Mode': renderMode,
            },
        }
    }
    exports.getErrorResponse = getErrorResponse
})
