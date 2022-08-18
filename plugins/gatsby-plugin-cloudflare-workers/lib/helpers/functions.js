;(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports)
        if (v !== undefined) module.exports = v
    } else if (typeof define === 'function' && define.amd) {
        define(['require', 'exports', 'fs-extra', 'pathe', '../templates/handlers', './config'], factory)
    }
})(function (require, exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.deleteFunctions = exports.setupImageCdn = exports.writeFunctions = void 0
    const fs_extra_1 = require('fs-extra')
    const pathe_1 = require('pathe')
    const handlers_1 = require('../templates/handlers')
    const config_1 = require('./config')
    const writeFunction = async ({ renderMode, handlerName, appDir, functionsSrc }) => {
        const source = (0, handlers_1.makeHandler)(appDir, renderMode)
        await (0, fs_extra_1.ensureDir)((0, pathe_1.join)(functionsSrc, handlerName))
        await (0, fs_extra_1.writeFile)((0, pathe_1.join)(functionsSrc, handlerName, `${handlerName}.js`), source)
        await (0, fs_extra_1.copyFile)(
            (0, pathe_1.join)(__dirname, '..', '..', 'lib', 'templates', 'utils.js'),
            (0, pathe_1.join)(functionsSrc, handlerName, 'utils.js')
        )
    }
    const writeApiFunction = async ({ appDir, functionDir }) => {
        const source = (0, handlers_1.makeApiHandler)(appDir)
        // This is to ensure we're copying from the compiled js, not ts source
        await (0, fs_extra_1.copy)((0, pathe_1.join)(__dirname, '..', '..', 'lib', 'templates', 'api'), functionDir)
        await (0, fs_extra_1.writeFile)((0, pathe_1.join)(functionDir, '__api.js'), source)
    }
    const writeFunctions = async ({ constants, netlifyConfig, neededFunctions }) => {
        const { PUBLISH_DIR, INTERNAL_FUNCTIONS_SRC } = constants
        const siteRoot = (0, config_1.getGatsbyRoot)(PUBLISH_DIR)
        const functionDir = (0, pathe_1.resolve)(INTERNAL_FUNCTIONS_SRC, '__api')
        const appDir = (0, pathe_1.relative)(functionDir, siteRoot)
        if (neededFunctions.includes('SSR')) {
            await writeFunction({
                renderMode: 'SSR',
                handlerName: '__ssr',
                appDir,
                functionsSrc: INTERNAL_FUNCTIONS_SRC,
            })
        }
        if (neededFunctions.includes('DSG')) {
            await writeFunction({
                renderMode: 'DSG',
                handlerName: '__dsg',
                appDir,
                functionsSrc: INTERNAL_FUNCTIONS_SRC,
            })
        }
        await (0, exports.setupImageCdn)({ constants, netlifyConfig })
        if (neededFunctions.includes('API')) {
            await writeApiFunction({ appDir, functionDir })
        }
    }
    exports.writeFunctions = writeFunctions
    const setupImageCdn = async ({ constants, netlifyConfig }) => {
        const { GATSBY_CLOUD_IMAGE_CDN } = netlifyConfig.build.environment
        if (GATSBY_CLOUD_IMAGE_CDN !== '1' && GATSBY_CLOUD_IMAGE_CDN !== 'true') {
            return
        }
        await (0, fs_extra_1.copyFile)(
            (0, pathe_1.join)(__dirname, '..', '..', 'src', 'templates', 'ipx.ts'),
            (0, pathe_1.join)(constants.INTERNAL_FUNCTIONS_SRC, '_ipx.ts')
        )
        netlifyConfig.redirects.push(
            {
                from: '/_gatsby/image/*',
                to: '/.netlify/builders/_ipx',
                status: 200,
            },
            {
                from: '/_gatsby/file/*',
                to: '/.netlify/functions/_ipx',
                status: 200,
            }
        )
    }
    exports.setupImageCdn = setupImageCdn
    const deleteFunctions = async ({ INTERNAL_FUNCTIONS_SRC }) => {
        for (const func of ['__api', '__ssr', '__dsg']) {
            const funcDir = (0, pathe_1.resolve)(INTERNAL_FUNCTIONS_SRC, func)
            if ((0, fs_extra_1.existsSync)(funcDir)) {
                await (0, fs_extra_1.rm)(funcDir, { recursive: true, force: true })
            }
        }
    }
    exports.deleteFunctions = deleteFunctions
})
