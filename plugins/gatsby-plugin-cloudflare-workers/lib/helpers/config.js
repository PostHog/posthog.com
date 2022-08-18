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
        define(['require', 'exports', 'os', 'path', 'process', 'fs-extra', 'uuid', './files'], factory)
    }
})(function (require, exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.getGatsbyRoot =
        exports.getNeededFunctions =
        exports.mutateConfig =
        exports.modifyConfig =
        exports.createMetadataFileAndCopyDatastore =
        exports.checkConfig =
        exports.spliceConfig =
        exports.shouldSkipBundlingDatastore =
            void 0
    /* eslint-disable max-lines */
    const os_1 = require('os')
    const path_1 = require('path')
    const process_1 = __importDefault(require('process'))
    const fs_extra_1 = __importStar(require('fs-extra'))
    const uuid_1 = require('uuid')
    const files_1 = require('./files')
    /**
     * Checks to see if GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE is enabled
     */
    function shouldSkipBundlingDatastore() {
        return isEnvSet('GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE') && Boolean(process_1.default.env.DEPLOY_PRIME_URL)
    }
    exports.shouldSkipBundlingDatastore = shouldSkipBundlingDatastore
    async function spliceConfig({ startMarker, endMarker, contents, fileName }) {
        await fs_extra_1.default.ensureFile(fileName)
        const data = await fs_extra_1.default.readFile(fileName, 'utf8')
        const [initial = '', rest = ''] = data.split(startMarker)
        const [, final = ''] = rest.split(endMarker)
        const out = [
            initial === os_1.EOL ? '' : initial,
            initial.endsWith(os_1.EOL) ? '' : os_1.EOL,
            startMarker,
            os_1.EOL,
            contents,
            os_1.EOL,
            endMarker,
            final.startsWith(os_1.EOL) ? '' : os_1.EOL,
            final === os_1.EOL ? '' : final,
        ]
            .filter(Boolean)
            .join('')
        return fs_extra_1.default.writeFile(fileName, out)
    }
    exports.spliceConfig = spliceConfig
    function loadGatsbyConfig({ gatsbyRoot, utils }) {
        const gatsbyConfigFile = (0, path_1.resolve)(gatsbyRoot, 'gatsby-config.js')
        if (!(0, fs_extra_1.existsSync)(gatsbyConfigFile)) {
            return {}
        }
        try {
            // eslint-disable-next-line n/global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
            return require(gatsbyConfigFile)
        } catch (error) {
            utils.build.failBuild('Could not load gatsby-config.js', { error })
        }
    }
    function hasPlugin(plugins, pluginName) {
        return plugins === null || plugins === void 0
            ? void 0
            : plugins.some(
                  (plugin) =>
                      plugin && (typeof plugin === 'string' ? plugin === pluginName : plugin.resolve === pluginName)
              )
    }
    async function checkConfig({ utils, netlifyConfig }) {
        const gatsbyRoot = getGatsbyRoot(netlifyConfig.build.publish)
        // warn if gatsby-plugin-netlify is missing
        const gatsbyConfig = loadGatsbyConfig({
            utils,
            gatsbyRoot,
        })
        if (hasPlugin(gatsbyConfig.plugins, 'gatsby-plugin-netlify')) {
            if (!(await (0, files_1.checkPackageVersion)(gatsbyRoot, 'gatsby-plugin-netlify', '>=4.2.0'))) {
                console.error('The plugin `gatsby-plugin-netlify` does not support DSG, please update to >=4.2.0')
            }
        } else {
            console.error(
                'Please install `gatsby-plugin-netlify` and enable it in your gatsby-config.js. https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify/'
            )
        }
        if (hasPlugin(gatsbyConfig.plugins, 'gatsby-plugin-netlify-cache')) {
            console.error("The plugin 'gatsby-plugin-netlify-cache' is not compatible with the Gatsby build plugin")
            console.error('Please uninstall gatsby-plugin-netlify-cache and remove it from your gatsby-config.js')
            utils.build.failBuild('Incompatible Gatsby plugin installed')
        }
        if (netlifyConfig.plugins.some((plugin) => plugin && plugin.package === 'netlify-plugin-gatsby-cache')) {
            console.warn("The plugin 'netlify-plugin-gatsby-cache' is no longer required and should be removed.")
        }
    }
    exports.checkConfig = checkConfig
    async function getPreviouslyCopiedDatastoreFileName(publishDir, cacheDir) {
        try {
            const contents = await (0, fs_extra_1.readJSON)(`${cacheDir}/dataMetadata.json`)
            if (contents.fileName) {
                return contents.fileName
            }
        } catch {}
        const publishFiles = await (0, fs_extra_1.readdir)((0, path_1.resolve)(publishDir))
        const datastoreMatch = publishFiles.find((file) => file.startsWith('data-') && file.endsWith('.mdb'))
        if (datastoreMatch) {
            return datastoreMatch
        }
        return null
    }
    /**
     * Copies the contents of the Gatsby datastore file to the public directory in order
     * to be uploaded to the CDN.
     *
     */
    async function createMetadataFileAndCopyDatastore(publishDir, cacheDir) {
        const data = (0, path_1.join)(`${cacheDir}/data/datastore/data.mdb`)
        const previousFileName = await getPreviouslyCopiedDatastoreFileName(publishDir, cacheDir)
        const fileName = previousFileName || `data-${(0, uuid_1.v4)()}.mdb`
        ;(0, fs_extra_1.ensureFileSync)(`${publishDir}/${fileName}`)
        ;(0, fs_extra_1.copySync)(data, `${publishDir}/${fileName}`)
        const payload = { fileName }
        ;(0, fs_extra_1.ensureFileSync)(`${cacheDir}/dataMetadata.json`)
        await (0, fs_extra_1.writeJSON)(`${cacheDir}/dataMetadata.json`, payload)
    }
    exports.createMetadataFileAndCopyDatastore = createMetadataFileAndCopyDatastore
    async function modifyConfig({ netlifyConfig, cacheDir, neededFunctions }) {
        mutateConfig({ netlifyConfig, cacheDir, neededFunctions })
        if (neededFunctions.includes('API')) {
            // Editing _redirects so it works with ntl dev
            await spliceConfig({
                startMarker: '# @netlify/plugin-gatsby redirects start',
                endMarker: '# @netlify/plugin-gatsby redirects end',
                contents: '/api/* /.netlify/functions/__api 200',
                fileName: (0, path_1.join)(netlifyConfig.build.publish, '_redirects'),
            })
        }
    }
    exports.modifyConfig = modifyConfig
    function mutateConfig({ netlifyConfig, cacheDir, neededFunctions }) {
        /* eslint-disable no-underscore-dangle, no-param-reassign */
        if (neededFunctions.includes('API')) {
            netlifyConfig.functions.__api = {
                included_files: [path_1.posix.join(cacheDir, 'functions', '**')],
                external_node_modules: ['msgpackr-extract'],
            }
        }
        if (neededFunctions.includes('DSG')) {
            netlifyConfig.functions.__dsg = {
                included_files: [
                    'public/404.html',
                    'public/500.html',
                    path_1.posix.join(cacheDir, 'query-engine', '**'),
                    path_1.posix.join(cacheDir, 'page-ssr', '**'),
                    '!**/*.js.map',
                ],
                external_node_modules: ['msgpackr-extract'],
                node_bundler: 'esbuild',
            }
            if (shouldSkipBundlingDatastore()) {
                netlifyConfig.functions.__dsg.included_files.push('.cache/dataMetadata.json')
            } else {
                netlifyConfig.functions.__dsg.included_files.push(path_1.posix.join(cacheDir, 'data', '**'))
            }
        }
        if (neededFunctions.includes('SSR')) {
            netlifyConfig.functions.__ssr = {
                included_files: [
                    'public/404.html',
                    'public/500.html',
                    path_1.posix.join(cacheDir, 'query-engine', '**'),
                    path_1.posix.join(cacheDir, 'page-ssr', '**'),
                    '!**/*.js.map',
                ],
                external_node_modules: ['msgpackr-extract'],
                node_bundler: 'esbuild',
            }
            if (shouldSkipBundlingDatastore()) {
                netlifyConfig.functions.__ssr.included_files.push('.cache/dataMetadata.json')
            } else {
                netlifyConfig.functions.__ssr.included_files.push(path_1.posix.join(cacheDir, 'data', '**'))
            }
        }
        /* eslint-enable no-underscore-dangle, no-param-reassign */
    }
    exports.mutateConfig = mutateConfig
    async function getNeededFunctions(cacheDir) {
        if (!(0, fs_extra_1.existsSync)((0, path_1.join)(cacheDir, 'functions'))) return []
        const neededFunctions = overrideNeededFunctions(await readFunctionSkipFile(cacheDir))
        const functionList = Object.keys(neededFunctions).filter((name) => neededFunctions[name] === true)
        if (functionList.length === 0) {
            console.log('Skipping Gatsby Functions and SSR/DSG support')
        } else {
            console.log(`Enabling Gatsby ${functionList.join('/')} support`)
        }
        return functionList
    }
    exports.getNeededFunctions = getNeededFunctions
    async function readFunctionSkipFile(cacheDir) {
        try {
            // read skip file from gatsby-plugin-netlify
            return await fs_extra_1.default.readJson((0, path_1.join)(cacheDir, '.nf-skip-gatsby-functions'))
        } catch (error) {
            // missing skip file = all functions needed
            // empty or invalid skip file = no functions needed
            return error.code === 'ENOENT' ? { API: true, SSR: true, DSG: true } : {}
        }
    }
    function overrideNeededFunctions(neededFunctions) {
        const skipAll = isEnvSet('NETLIFY_SKIP_GATSBY_FUNCTIONS')
        const skipAPI = isEnvSet('NETLIFY_SKIP_API_FUNCTION')
        const skipSSR = isEnvSet('NETLIFY_SKIP_SSR_FUNCTION')
        const skipDSG = isEnvSet('NETLIFY_SKIP_DSG_FUNCTION')
        return {
            API: skipAll || skipAPI ? false : neededFunctions.API,
            SSR: skipAll || skipSSR ? false : neededFunctions.SSR,
            DSG: skipAll || skipDSG ? false : neededFunctions.DSG,
        }
    }
    function isEnvSet(envVar) {
        return process_1.default.env[envVar] === 'true' || process_1.default.env[envVar] === '1'
    }
    function getGatsbyRoot(publish) {
        return (0, path_1.resolve)((0, path_1.dirname)(publish))
    }
    exports.getGatsbyRoot = getGatsbyRoot
})
/* eslint-enable max-lines */
