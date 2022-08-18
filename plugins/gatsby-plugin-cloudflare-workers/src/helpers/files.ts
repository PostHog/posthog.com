/* eslint-disable max-lines */
import os from 'os'
import process from 'process'

import { NetlifyConfig } from '@netlify/build'
import { copyFile, ensureDir, existsSync, readFile, writeFile, readJson } from 'fs-extra'
import { dirname, join, resolve } from 'pathe'
import semver from 'semver'

import type { FunctionList } from './functions'

const DEFAULT_LAMBDA_PLATFORM = 'linux'
const DEFAULT_LAMBDA_ABI = '83'
const DEFAULT_LAMBDA_ARCH = 'x64'

const LAMBDA_PLATFORM = `${DEFAULT_LAMBDA_PLATFORM}-${DEFAULT_LAMBDA_ARCH}`

const RELOCATABLE_BINARIES = [`node.abi${DEFAULT_LAMBDA_ABI}.node`, `node.abi${DEFAULT_LAMBDA_ABI}.glibc.node`]

export const modifyFiles = async ({
    netlifyConfig,
    neededFunctions,
}: {
    netlifyConfig: NetlifyConfig
    neededFunctions: FunctionList
}): Promise<void> => {
    if (neededFunctions.includes('SSR') || neededFunctions.includes('DSG')) {
        const root = dirname(netlifyConfig.build.publish)
        await patchFile(root)
        await relocateBinaries(root)
    }
}

/**
 * Manually patching the bundle to work around various incompatibilities in some versions.
 */
export const patchFile = async (baseDir): Promise<void> => {
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

    const bundleFile = join(baseDir, '.cache', 'query-engine', 'index.js')
    if (!existsSync(bundleFile)) {
        return
    }
    const bundle = await readFile(bundleFile, 'utf8')

    // Patch the bundle
    const output = replacements.reduce((acc, [from, to]) => acc.replace(from, to), bundle)
    await writeFile(bundleFile, output)
}

/**
 * Given an array of base paths and candidate modules, return the first one that exists
 */
export const findModuleFromBase = ({ paths, candidates }): string | null => {
    for (const candidate of candidates) {
        try {
            const modulePath = require.resolve(candidate, { paths })
            if (modulePath) {
                return dirname(modulePath)
            }
        } catch {
            // Ignore error
        }
    }
    return null
}

export async function checkPackageVersion(root: string, name: string, version: string): Promise<boolean> {
    try {
        const packagePath = require.resolve(`${name}/package.json`, {
            paths: [root],
        })
        const packageObj = await readJson(packagePath)
        return semver.satisfies(packageObj.version, version)
    } catch {
        return false
    }
}

/**
 * When Gatsby runs a build, it copies binary dependencies to the "query-engine" folder. These are auto-detected, based
 * on the environment in which the build is running. This can cause problems if these don't match the lambda environment.
 * This function ensures that the correct lmdb binaries are available.
 */

// eslint-disable-next-line complexity, max-statements
export const relocateBinaries = async (baseDir: string): Promise<void> => {
    if (process.env.NETLIFY_LOCAL) {
        // We currently only handle CI builds
        return
    }
    const currentAbi = process.versions.modules
    const currentArch = os.arch()
    const currentPlatform = os.platform()
    if (
        currentAbi === DEFAULT_LAMBDA_ABI &&
        currentArch === DEFAULT_LAMBDA_ARCH &&
        currentPlatform === DEFAULT_LAMBDA_PLATFORM
    ) {
        // No need to relocate
        return
    }

    const gatsbyPath = findModuleFromBase({
        paths: [baseDir],
        candidates: ['gatsby/package.json'],
    })

    if (!gatsbyPath) {
        console.error(`Could not find gatsby module in ${baseDir}`)
        return
    }

    // In v2.4.0 lmdb switched to scoped names for the platform binary packages (e.g: @lmdb/lmdb-linux-x64)
    const scopedLmdbPath = findModuleFromBase({
        paths: [gatsbyPath, baseDir],
        candidates: [`@lmdb/lmdb-${LAMBDA_PLATFORM}`],
    })

    let lmdbPath
    if (!scopedLmdbPath) {
        lmdbPath = findModuleFromBase({
            paths: [gatsbyPath, baseDir],
            candidates: ['lmdb-store'],
        })

        if (!lmdbPath) {
            const modulePath = findModuleFromBase({
                paths: [gatsbyPath, baseDir],
                candidates: ['lmdb'],
            })
            if (modulePath) {
                // The lmdb package resolves to a subdirectory of the module, and we need the root
                lmdbPath = dirname(modulePath)
            } else {
                console.log(`Could not find lmdb module in ${gatsbyPath}`)
                return
            }
        }
    }

    console.log(`Copying native binaries for ${LAMBDA_PLATFORM} abi${DEFAULT_LAMBDA_ABI}`)

    const lmdbPrebuilds = scopedLmdbPath || resolve(lmdbPath, 'prebuilds', LAMBDA_PLATFORM)
    const binaryTarget = scopedLmdbPath
        ? resolve(baseDir, '.cache', 'query-engine', 'assets', LAMBDA_PLATFORM)
        : resolve(baseDir, '.cache', 'query-engine', 'assets', 'prebuilds', LAMBDA_PLATFORM)
    await ensureDir(binaryTarget)

    for (const binary of RELOCATABLE_BINARIES) {
        const from = join(lmdbPrebuilds, binary)
        const to = join(binaryTarget, binary)
        if (existsSync(from) && !existsSync(to)) {
            console.log(`Copying ${from} to ${to}`)
            await copyFile(from, to)
        } else {
            console.log(`Skipping ${from}`)
        }
    }
}
/* eslint-enable max-lines */
