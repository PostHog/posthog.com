;(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports)
        if (v !== undefined) module.exports = v
    } else if (typeof define === 'function' && define.amd) {
        define(['require', 'exports', 'common-tags'], factory)
    }
})(function (require, exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.makeApiHandler = exports.makeHandler = void 0
    const common_tags_1 = require('common-tags')
    // These are "require()"d rather than imported so the symbol names are not munged,
    // as we need them to match the hard-coded values
    const { join } = require('path')
    const etag = require('etag')
    const { gatsbyFunction } = require('./api/gatsbyFunction')
    const { createRequestObject, createResponseObject } = require('./api/utils')
    const { getPagePathFromPageDataPath, getGraphQLEngine, prepareFilesystem, getErrorResponse } = require('./utils')
    /**
     * Generates a Netlify function handler for Gatsby SSR or DSG.
     * It isn't used directly, but rather has `toString()` called on it to generate
     * the actual handler code, with the correct paths and render mode injected.
     */
    const getHandler = (renderMode, appDir) => {
        process.chdir(appDir)
        const DATA_SUFFIX = '/page-data.json'
        const DATA_PREFIX = '/page-data/'
        const cacheDir = join(appDir, '.cache')
        // Requiring this dynamically so esbuild doesn't re-bundle it
        const { getData, renderHTML, renderPageData } = require(join(cacheDir, 'page-ssr'))
        let graphqlEngine
        return async function handler(event) {
            if (!graphqlEngine) {
                await prepareFilesystem(cacheDir, event.rawUrl)
                graphqlEngine = getGraphQLEngine(cacheDir)
            }
            // Gatsby expects cwd to be the site root
            process.chdir(appDir)
            const eventPath = event.path
            const isPageData = eventPath.endsWith(DATA_SUFFIX) && eventPath.startsWith(DATA_PREFIX)
            const pathName = isPageData ? getPagePathFromPageDataPath(eventPath) : eventPath
            // Gatsby doesn't currently export this type.
            const page = graphqlEngine.findPageByPath(pathName)
            if ((page === null || page === void 0 ? void 0 : page.mode) !== renderMode) {
                return getErrorResponse({ statusCode: 404, renderMode })
            }
            const req =
                renderMode === 'SSR'
                    ? {
                          query: event.queryStringParameters,
                          method: event.httpMethod,
                          url: event.path,
                          headers: event.headers,
                      }
                    : {
                          query: {},
                          method: 'GET',
                          url: event.path,
                          headers: {},
                      }
            console.log(`[${req.method}] ${event.path} (${renderMode})`)
            try {
                const data = await getData({
                    pathName,
                    graphqlEngine,
                    req,
                })
                if (isPageData) {
                    const body = JSON.stringify(await renderPageData({ data }))
                    return {
                        statusCode: 200,
                        body,
                        headers: {
                            ETag: etag(body),
                            'Content-Type': 'application/json',
                            'X-Render-Mode': renderMode,
                            ...data.serverDataHeaders,
                        },
                    }
                }
                const body = await renderHTML({ data })
                return {
                    statusCode: 200,
                    body,
                    headers: {
                        ETag: etag(body),
                        'Content-Type': 'text/html; charset=utf-8',
                        'X-Render-Mode': renderMode,
                        ...data.serverDataHeaders,
                    },
                }
            } catch (error) {
                return getErrorResponse({ error, renderMode })
            }
        }
    }
    /**
     * Generate an API handler
     */
    const getApiHandler = (appDir) =>
        function handler(event, context) {
            // Create a fake Gatsby/Express Request object
            const req = createRequestObject({ event, context })
            return new Promise((resolve) => {
                try {
                    // Create a stubbed Gatsby/Express Response object
                    // onResEnd is the "resolve" cb for this Promise
                    const res = createResponseObject({ onResEnd: resolve })
                    // Try to call the actual function
                    gatsbyFunction(req, res, event, appDir)
                } catch (error) {
                    console.error(`Error executing ${event.path}`, error)
                    resolve({ statusCode: 500 })
                }
            })
        }
    const makeHandler = (appDir, renderMode) =>
        // This is a string, but if you have the right editor plugin it should format as js
        (0, common_tags_1.stripIndent)`
    const { readFileSync } = require('fs');
    const { builder } = require('@netlify/functions');
    const { getPagePathFromPageDataPath, getGraphQLEngine, prepareFilesystem, getErrorResponse } = require('./utils')
    const { join, resolve } = require("path");
    const etag = require('etag');
    const pageRoot = resolve(__dirname, "${appDir}");
    exports.handler = ${
        renderMode === 'DSG'
            ? `builder((${getHandler.toString()})("${renderMode}", pageRoot))`
            : `((${getHandler.toString()})("${renderMode}", pageRoot))`
    }
`
    exports.makeHandler = makeHandler
    const makeApiHandler = (appDir) =>
        // This is a string, but if you have the right editor plugin it should format as js
        (0, common_tags_1.stripIndent)`
    const { gatsbyFunction } = require('./gatsbyFunction')
    const { createRequestObject, createResponseObject } = require('./utils')
    const { resolve } = require("path");

    const pageRoot = resolve(__dirname, "${appDir}");
    exports.handler = ((${getApiHandler.toString()})(pageRoot))
`
    exports.makeApiHandler = makeApiHandler
})
