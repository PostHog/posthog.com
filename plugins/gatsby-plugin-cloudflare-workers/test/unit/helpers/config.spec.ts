/* eslint-disable ava/no-import-test-files */
import { resolve, join } from 'path'
import process from 'process'

import Chance from 'chance'
import { remove, copy, readJSON, readdir } from 'fs-extra'
import { dir as getTmpDir } from 'tmp-promise'
import { validate } from 'uuid'

import {
    createMetadataFileAndCopyDatastore,
    mutateConfig,
    shouldSkipBundlingDatastore,
} from '../../../src/helpers/config'
import { enableGatsbyExcludeDatastoreFromBundle } from '../../helpers'

const chance = new Chance()
const SAMPLE_PROJECT_DIR = `${__dirname}/../../../../demo`
const TEST_TIMEOUT = 60_000

const findDatastoreFilesinPublishDir = async (publishDir) => {
    const files = await readdir(resolve(publishDir))
    return files.filter((file) => file.startsWith('data-') && file.endsWith('.mdb'))
}

const changeCwd = (cwd) => {
    const originalCwd = process.cwd()
    process.chdir(cwd)
    return () => {
        process.chdir(originalCwd)
    }
}

// Move gatsby project from sample project to current directory
const moveGatsbyDir = async () => {
    await copy(SAMPLE_PROJECT_DIR, join(process.cwd()))
}

describe('shouldSkipBundlingDatastore', () => {
    beforeEach(() => {
        process.env.DEPLOY_PRIME_URL = chance.url()
    })
    afterEach(() => {
        delete process.env.GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE
        delete process.env.DEPLOY_PRIME_URL
    })

    it('returns true', () => {
        process.env.GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE = 'true'
        expect(shouldSkipBundlingDatastore()).toEqual(true)

        process.env.GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE = '1'
        expect(shouldSkipBundlingDatastore()).toEqual(true)
    })

    it('returns false', () => {
        process.env.GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE = 'false'
        expect(shouldSkipBundlingDatastore()).toEqual(false)

        process.env.GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE = '0'
        expect(shouldSkipBundlingDatastore()).toEqual(false)

        delete process.env.GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE
        expect(shouldSkipBundlingDatastore()).toEqual(false)

        // Commonly occurs in a CI context as a DEPLOY_PRIME_URL is not set
        process.env.GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE = 'true'
        delete process.env.DEPLOY_PRIME_URL
        expect(shouldSkipBundlingDatastore()).toEqual(false)
    })
})

/* eslint-disable no-underscore-dangle */
describe('mutateConfig', () => {
    const cacheDir = '.cache'
    const neededFunctions = ['API', 'DSG', 'SSR']
    let netlifyConfig, defaultArgs

    beforeEach(() => {
        netlifyConfig = {
            functions: {
                __api: null,
                __dsg: null,
                __ssr: null,
            },
        }
        defaultArgs = {
            netlifyConfig,
            neededFunctions,
            cacheDir,
        }
    })

    afterEach(() => {
        delete process.env.GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE
    })

    it('includes the dataMetadata file containing gatsby datastore info when GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE is enabled', () => {
        enableGatsbyExcludeDatastoreFromBundle()
        mutateConfig(defaultArgs)

        expect(netlifyConfig.functions.__api).toStrictEqual({
            included_files: [`${cacheDir}/functions/**`],
            external_node_modules: ['msgpackr-extract'],
        })
        expect(netlifyConfig.functions.__ssr).toStrictEqual(netlifyConfig.functions.__dsg)

        expect(netlifyConfig.functions.__dsg).toStrictEqual({
            included_files: [
                'public/404.html',
                'public/500.html',
                `${cacheDir}/query-engine/**`,
                `${cacheDir}/page-ssr/**`,
                '!**/*.js.map',
                '.cache/dataMetadata.json',
            ],
            external_node_modules: ['msgpackr-extract'],
            node_bundler: 'esbuild',
        })
    })

    it('does not include the dataMetadata file containing gatsby datastore info when GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE is disabled and bundles datastore into lambdas', () => {
        process.env.GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE = 'false'
        mutateConfig(defaultArgs)

        expect(netlifyConfig.functions.__api).toStrictEqual({
            included_files: [`${cacheDir}/functions/**`],
            external_node_modules: ['msgpackr-extract'],
        })
        expect(netlifyConfig.functions.__ssr).toStrictEqual(netlifyConfig.functions.__dsg)
        expect(netlifyConfig.functions.__dsg).toStrictEqual({
            included_files: [
                'public/404.html',
                'public/500.html',
                `${cacheDir}/query-engine/**`,
                `${cacheDir}/page-ssr/**`,
                '!**/*.js.map',
                `${cacheDir}/data/**`,
            ],
            external_node_modules: ['msgpackr-extract'],
            node_bundler: 'esbuild',
        })
    })

    it('does not include the dataMetadata file containing gatsby datastore info when GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE is undefined and bundles datastore into lambdas', () => {
        mutateConfig(defaultArgs)

        expect(netlifyConfig.functions.__api).toStrictEqual({
            included_files: [`${cacheDir}/functions/**`],
            external_node_modules: ['msgpackr-extract'],
        })
        expect(netlifyConfig.functions.__ssr).toStrictEqual(netlifyConfig.functions.__dsg)
        expect(netlifyConfig.functions.__dsg).toStrictEqual({
            included_files: [
                'public/404.html',
                'public/500.html',
                `${cacheDir}/query-engine/**`,
                `${cacheDir}/page-ssr/**`,
                '!**/*.js.map',
                `${cacheDir}/data/**`,
            ],
            external_node_modules: ['msgpackr-extract'],
            node_bundler: 'esbuild',
        })
    })
})
/* eslint-enable no-underscore-dangle */

describe('createMetadataFileAndCopyDatastore', () => {
    let cleanup
    let restoreCwd

    beforeEach(async () => {
        const tmpDir = await getTmpDir({ unsafeCleanup: true })

        restoreCwd = changeCwd(tmpDir.path)
        // eslint-disable-next-line prefer-destructuring
        cleanup = tmpDir.cleanup
    })

    afterEach(async () => {
        // Cleans up the temporary directory from `getTmpDir()` and do not make it
        // the current directory anymore
        restoreCwd()
        await cleanup()
    }, TEST_TIMEOUT)
    it(
        'successfully creates a metadata file',
        async () => {
            await moveGatsbyDir()
            const publishDir = resolve('public')
            const cacheDir = resolve('.cache')

            await createMetadataFileAndCopyDatastore(publishDir, cacheDir)

            const contents = await readJSON(`${cacheDir}/dataMetadata.json`)

            const { fileName } = contents
            expect(fileName).toEqual(expect.stringContaining('data-'))

            const uuidId = fileName.slice(fileName.indexOf('-') + 1, fileName.indexOf('.mdb'))
            expect(validate(uuidId)).toEqual(true)
            // Longer timeout for the test is necessary due to the copying of the demo project into the tmp dir
        },
        TEST_TIMEOUT
    )

    it(
        'reuses the datastore filename if a datastore file already exists in the pubish directory',
        async () => {
            await moveGatsbyDir()
            const publishDir = resolve('public')
            const cacheDir = resolve('.cache')

            // Initial copying of the datastore file
            await createMetadataFileAndCopyDatastore(publishDir, cacheDir)

            const contents = await readJSON(`${cacheDir}/dataMetadata.json`)
            const matches = await findDatastoreFilesinPublishDir(publishDir)

            expect(matches.length).toEqual(1)
            expect(matches[0]).toEqual(contents.fileName)

            // Remove dataMetadata file to confirm that datastore filename is used
            await remove(`${cacheDir}/dataMetadata.json`)

            await createMetadataFileAndCopyDatastore(publishDir, cacheDir)
            const updatedMatches = await findDatastoreFilesinPublishDir(publishDir)

            // There should continue to be only 1 file
            expect(updatedMatches.length).toEqual(1)
            expect(updatedMatches[0]).toEqual(contents.fileName)
        },
        TEST_TIMEOUT
    )

    it(
        'reuses the metadata filename if a datastore metadata file exists in the cache directory',
        async () => {
            await moveGatsbyDir()
            const publishDir = resolve('public')
            const cacheDir = resolve('.cache')

            // Initial copying of the datastore file
            await createMetadataFileAndCopyDatastore(publishDir, cacheDir)

            const contents = await readJSON(`${cacheDir}/dataMetadata.json`)
            const matches = await findDatastoreFilesinPublishDir(publishDir)

            expect(matches.length).toEqual(1)
            expect(matches[0]).toEqual(contents.fileName)

            // Remove datastore file to confirm that dataMetadata.json filename is used
            await remove(`${publishDir}/${contents.fileName}`)

            await createMetadataFileAndCopyDatastore(publishDir, cacheDir)
            const updatedMatches = await findDatastoreFilesinPublishDir(publishDir)

            expect(updatedMatches[0]).toEqual(contents.fileName)
        },
        TEST_TIMEOUT
    )
})
/* eslint-enable ava/no-import-test-files */
