import { NetlifyConfig, NetlifyPluginConstants } from '@netlify/build'
import { copy, copyFile, ensureDir, existsSync, rm, writeFile } from 'fs-extra'
import { resolve, join, relative } from 'pathe'

import { makeApiHandler, makeHandler } from '../templates/handlers'

import { getGatsbyRoot } from './config'

export type FunctionList = Array<'API' | 'SSR' | 'DSG'>

const writeFunction = async ({ renderMode, handlerName, appDir, functionsSrc }) => {
    const source = makeHandler(appDir, renderMode)
    await ensureDir(join(functionsSrc, handlerName))
    await writeFile(join(functionsSrc, handlerName, `${handlerName}.js`), source)
    await copyFile(
        join(__dirname, '..', '..', 'lib', 'templates', 'utils.js'),
        join(functionsSrc, handlerName, 'utils.js')
    )
}

const writeApiFunction = async ({ appDir, functionDir }) => {
    const source = makeApiHandler(appDir)
    // This is to ensure we're copying from the compiled js, not ts source
    await copy(join(__dirname, '..', '..', 'lib', 'templates', 'api'), functionDir)
    await writeFile(join(functionDir, '__api.js'), source)
}

export const writeFunctions = async ({
    constants,
    netlifyConfig,
    neededFunctions,
}: {
    constants: NetlifyPluginConstants
    netlifyConfig: NetlifyConfig
    neededFunctions: FunctionList
}): Promise<void> => {
    const { PUBLISH_DIR, INTERNAL_FUNCTIONS_SRC } = constants
    const siteRoot = getGatsbyRoot(PUBLISH_DIR)
    const functionDir = resolve(INTERNAL_FUNCTIONS_SRC, '__api')
    const appDir = relative(functionDir, siteRoot)

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

    await setupImageCdn({ constants, netlifyConfig })

    if (neededFunctions.includes('API')) {
        await writeApiFunction({ appDir, functionDir })
    }
}

export const setupImageCdn = async ({
    constants,
    netlifyConfig,
}: {
    constants: NetlifyPluginConstants
    netlifyConfig: NetlifyConfig
}) => {
    const { GATSBY_CLOUD_IMAGE_CDN } = netlifyConfig.build.environment

    if (GATSBY_CLOUD_IMAGE_CDN !== '1' && GATSBY_CLOUD_IMAGE_CDN !== 'true') {
        return
    }

    await copyFile(
        join(__dirname, '..', '..', 'src', 'templates', 'ipx.ts'),
        join(constants.INTERNAL_FUNCTIONS_SRC, '_ipx.ts')
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

export const deleteFunctions = async ({ INTERNAL_FUNCTIONS_SRC }: NetlifyPluginConstants): Promise<void> => {
    for (const func of ['__api', '__ssr', '__dsg']) {
        const funcDir = resolve(INTERNAL_FUNCTIONS_SRC, func)
        if (existsSync(funcDir)) {
            await rm(funcDir, { recursive: true, force: true })
        }
    }
}
