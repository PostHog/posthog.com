/* eslint-disable ava/no-import-test-files */
import { tmpdir } from 'os'
import { resolve, join, dirname } from 'path'

import Chance from 'chance'
import { readJSON, copy, ensureDir, existsSync, readFileSync, unlink } from 'fs-extra'
import { dir as getTmpDir } from 'tmp-promise'

// eslint-disable-next-line import/no-namespace
import * as templateUtils from '../../../src/templates/utils'
import { enableGatsbyExcludeDatastoreFromBundle } from '../../helpers'

const chance = new Chance()
const SAMPLE_PROJECT_DIR = `${__dirname}/../../../../demo`
const TEST_TIMEOUT = 60_000

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

describe('prepareFilesystem', () => {
    let cleanup
    let restoreCwd
    let downloadFileSpy

    beforeEach(async () => {
        const tmpDir = await getTmpDir({ unsafeCleanup: true })
        restoreCwd = changeCwd(tmpDir.path)
        // eslint-disable-next-line prefer-destructuring
        cleanup = tmpDir.cleanup

        downloadFileSpy = jest.spyOn(templateUtils, 'downloadFile').mockResolvedValue()
    })

    afterEach(async () => {
        // Cleans up the temporary directory from `getTmpDir()` and do not make it
        // the current directory anymore
        restoreCwd()
        await cleanup()

        jest.clearAllMocks()
        jest.resetAllMocks()
        jest.restoreAllMocks()
        delete process.env.GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE
    }, TEST_TIMEOUT)

    it(
        'links fs.promises to ensure it is available on global._fsWrapper',
        async () => {
            await moveGatsbyDir()

            const cacheDir = resolve('.cache')
            await templateUtils.prepareFilesystem(cacheDir, chance.url())

            // eslint-disable-next-line no-underscore-dangle
            expect(global._fsWrapper.promises).toBeDefined()
        },
        TEST_TIMEOUT
    )

    it(
        'downloads file from the CDN when GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE is enabled',
        async () => {
            enableGatsbyExcludeDatastoreFromBundle()
            await moveGatsbyDir()

            const cacheDir = resolve('.cache')
            await templateUtils.prepareFilesystem(cacheDir, chance.url())

            expect(downloadFileSpy).toHaveBeenCalled()
        },
        TEST_TIMEOUT
    )

    it(
        'uses the correct URLs to download file from the CDN when GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE is enabled',
        async () => {
            const domain = chance.url({ path: '' })
            const url = `${domain}${chance.word()}/${chance.word()}`

            enableGatsbyExcludeDatastoreFromBundle()
            await moveGatsbyDir()

            const cacheDir = resolve('.cache')
            const contents = await readJSON(`${cacheDir}/dataMetadata.json`)
            const datastoreFileName = contents.fileName

            await templateUtils.prepareFilesystem(cacheDir, url)

            expect(downloadFileSpy).toHaveBeenCalledTimes(1)
            expect(downloadFileSpy.mock.calls[0][0]).toEqual(`${domain}${datastoreFileName}`)
        },
        TEST_TIMEOUT
    )

    it(
        'does not download file from the CDN when GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE is not enabled',
        async () => {
            process.env.GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE = 'false'
            await moveGatsbyDir()

            const cacheDir = resolve('.cache')
            await templateUtils.prepareFilesystem(cacheDir, chance.url())

            expect(downloadFileSpy).not.toHaveBeenCalled()
        },
        TEST_TIMEOUT
    )

    it(
        'does not download file from the CDN when GATSBY_EXCLUDE_DATASTORE_FROM_BUNDLE is undefined',
        async () => {
            await moveGatsbyDir()

            const cacheDir = resolve('.cache')
            await templateUtils.prepareFilesystem(cacheDir, chance.url())

            expect(downloadFileSpy).not.toHaveBeenCalled()
        },
        TEST_TIMEOUT
    )
})

describe('downloadFile', () => {
    it('can download a file', async () => {
        const url =
            'https://raw.githubusercontent.com/netlify/netlify-plugin-gatsby/cc33cf55913eca9e81f5a4c8face96312ac29ee6/plugin/manifest.yml'
        const tmpFile = join(tmpdir(), 'gatsby-test', 'downloadfile.txt')
        await ensureDir(dirname(tmpFile))
        await templateUtils.downloadFile(url, tmpFile)
        expect(existsSync(tmpFile)).toBeTruthy()
        expect(readFileSync(tmpFile, 'utf8')).toMatchInlineSnapshot(`
      "name: '@netlify/plugin-gatsby'
      inputs: []
      # Example inputs:
      #  - name: example
      #    description: Example description
      #    default: 5
      #    required: false
      "
    `)
        await unlink(tmpFile)
    })

    it('downloadFile throws on bad domain', async () => {
        const url = 'https://nonexistentdomain.example'
        const tmpFile = join(tmpdir(), 'gatsby-test', 'downloadfile.txt')
        await ensureDir(dirname(tmpFile))
        await expect(templateUtils.downloadFile(url, tmpFile)).rejects.toThrowErrorMatchingInlineSnapshot(
            `"getaddrinfo ENOTFOUND nonexistentdomain.example"`
        )
    })
})
/* eslint-enable ava/no-import-test-files */
