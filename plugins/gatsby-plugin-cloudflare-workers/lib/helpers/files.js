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
        define(['require', 'exports', 'os', 'process', 'fs-extra', 'pathe', 'semver'], factory)
    }
})(function (require, exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.relocateBinaries =
        exports.checkPackageVersion =
        exports.findModuleFromBase =
        exports.patchFile =
        exports.modifyFiles =
            void 0
    /* eslint-disable max-lines */
    const os_1 = __importDefault(require('os'))
    const process_1 = __importDefault(require('process'))
    const fs_extra_1 = require('fs-extra')
    const pathe_1 = require('pathe')
    const semver_1 = __importDefault(require('semver'))
    const DEFAULT_LAMBDA_PLATFORM = 'linux'
    const DEFAULT_LAMBDA_ABI = '83'
    const DEFAULT_LAMBDA_ARCH = 'x64'
    const LAMBDA_PLATFORM = `${DEFAULT_LAMBDA_PLATFORM}-${DEFAULT_LAMBDA_ARCH}`
    const RELOCATABLE_BINARIES = [`node.abi${DEFAULT_LAMBDA_ABI}.node`, `node.abi${DEFAULT_LAMBDA_ABI}.glibc.node`]
    const modifyFiles = async ({ netlifyConfig, neededFunctions }) => {
        if (neededFunctions.includes('SSR') || neededFunctions.includes('DSG')) {
            const root = (0, pathe_1.dirname)(netlifyConfig.build.publish)
            await (0, exports.patchFile)(root)
            await (0, exports.relocateBinaries)(root)
        }
    }
    exports.modifyFiles = modifyFiles
    /**
     * Manually patching the bundle to work around various incompatibilities in some versions.
     */
    const patchFile = async (baseDir) => {
        /* eslint-disable no-template-curly-in-string */
        const replacements = [
            // Older versions of Gatsby put its cache db in a location that is readonly in functions
            ['process.cwd(), `.cache/${cacheDbFile}`', "require('os').tmpdir(), 'gatsby', `.cache/${cacheDbFile}`"],
            // If we're compiling on newer versions of Node, we need to use the binary that supports the older ABI version because lambda
            [
                'require(__webpack_require__.ab + "prebuilds/linux-x64/node.abi93.node")',
                'require(__webpack_require__.ab + "prebuilds/linux-x64/node.abi83.node")',
            ],
            // Newer versions of lmdb do this
            [
                'require(__webpack_require__.ab + "prebuilds/linux-x64/node.abi93.glibc.node")',
                'require(__webpack_require__.ab + "prebuilds/linux-x64/node.abi83.glibc.node")',
            ],
        ]
        /* eslint-enable no-template-curly-in-string */
        const bundleFile = (0, pathe_1.join)(baseDir, '.cache', 'query-engine', 'index.js')
        if (!(0, fs_extra_1.existsSync)(bundleFile)) {
            return
        }
        const bundle = await (0, fs_extra_1.readFile)(bundleFile, 'utf8')
        // Patch the bundle
        const output = replacements.reduce((acc, [from, to]) => acc.replace(from, to), bundle)
        await (0, fs_extra_1.writeFile)(bundleFile, output)
    }
    exports.patchFile = patchFile
    /**
     * Given an array of base paths and candidate modules, return the first one that exists
     */
    const findModuleFromBase = ({ paths, candidates }) => {
        for (const candidate of candidates) {
            try {
                const modulePath = require.resolve(candidate, { paths })
                if (modulePath) {
                    return (0, pathe_1.dirname)(modulePath)
                }
            } catch {
                // Ignore error
            }
        }
        return null
    }
    exports.findModuleFromBase = findModuleFromBase
    async function checkPackageVersion(root, name, version) {
        try {
            const packagePath = require.resolve(`${name}/package.json`, {
                paths: [root],
            })
            const packageObj = await (0, fs_extra_1.readJson)(packagePath)
            return semver_1.default.satisfies(packageObj.version, version)
        } catch {
            return false
        }
    }
    exports.checkPackageVersion = checkPackageVersion
    /**
     * When Gatsby runs a build, it copies binary dependencies to the "query-engine" folder. These are auto-detected, based
     * on the environment in which the build is running. This can cause problems if these don't match the lambda environment.
     * This function ensures that the correct lmdb binaries are available.
     */
    // eslint-disable-next-line complexity, max-statements
    const relocateBinaries = async (baseDir) => {
        if (process_1.default.env.NETLIFY_LOCAL) {
            // We currently only handle CI builds
            return
        }
        const currentAbi = process_1.default.versions.modules
        const currentArch = os_1.default.arch()
        const currentPlatform = os_1.default.platform()
        if (
            currentAbi === DEFAULT_LAMBDA_ABI &&
            currentArch === DEFAULT_LAMBDA_ARCH &&
            currentPlatform === DEFAULT_LAMBDA_PLATFORM
        ) {
            // No need to relocate
            return
        }
        const gatsbyPath = (0, exports.findModuleFromBase)({
            paths: [baseDir],
            candidates: ['gatsby/package.json'],
        })
        if (!gatsbyPath) {
            console.error(`Could not find gatsby module in ${baseDir}`)
            return
        }
        // In v2.4.0 lmdb switched to scoped names for the platform binary packages (e.g: @lmdb/lmdb-linux-x64)
        const scopedLmdbPath = (0, exports.findModuleFromBase)({
            paths: [gatsbyPath, baseDir],
            candidates: [`@lmdb/lmdb-${LAMBDA_PLATFORM}`],
        })
        let lmdbPath
        if (!scopedLmdbPath) {
            lmdbPath = (0, exports.findModuleFromBase)({
                paths: [gatsbyPath, baseDir],
                candidates: ['lmdb-store'],
            })
            if (!lmdbPath) {
                const modulePath = (0, exports.findModuleFromBase)({
                    paths: [gatsbyPath, baseDir],
                    candidates: ['lmdb'],
                })
                if (modulePath) {
                    // The lmdb package resolves to a subdirectory of the module, and we need the root
                    lmdbPath = (0, pathe_1.dirname)(modulePath)
                } else {
                    console.log(`Could not find lmdb module in ${gatsbyPath}`)
                    return
                }
            }
        }
        console.log(`Copying native binaries for ${LAMBDA_PLATFORM} abi${DEFAULT_LAMBDA_ABI}`)
        const lmdbPrebuilds = scopedLmdbPath || (0, pathe_1.resolve)(lmdbPath, 'prebuilds', LAMBDA_PLATFORM)
        const binaryTarget = scopedLmdbPath
            ? (0, pathe_1.resolve)(baseDir, '.cache', 'query-engine', 'assets', LAMBDA_PLATFORM)
            : (0, pathe_1.resolve)(baseDir, '.cache', 'query-engine', 'assets', 'prebuilds', LAMBDA_PLATFORM)
        await (0, fs_extra_1.ensureDir)(binaryTarget)
        for (const binary of RELOCATABLE_BINARIES) {
            const from = (0, pathe_1.join)(lmdbPrebuilds, binary)
            const to = (0, pathe_1.join)(binaryTarget, binary)
            if ((0, fs_extra_1.existsSync)(from) && !(0, fs_extra_1.existsSync)(to)) {
                console.log(`Copying ${from} to ${to}`)
                await (0, fs_extra_1.copyFile)(from, to)
            } else {
                console.log(`Skipping ${from}`)
            }
        }
    }
    exports.relocateBinaries = relocateBinaries
})
/* eslint-enable max-lines */
