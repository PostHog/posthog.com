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
            'process',
            'chalk',
            'common-tags',
            'fs-extra',
            'node-stream-zip',
            'pathe',
            'pretty-bytes',
        ], factory)
    }
})(function (require, exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.checkZipSize = exports.LAMBDA_MAX_SIZE = void 0
    const process_1 = __importDefault(require('process'))
    const chalk_1 = require('chalk')
    const common_tags_1 = require('common-tags')
    const fs_extra_1 = require('fs-extra')
    const node_stream_zip_1 = require('node-stream-zip')
    const pathe_1 = require('pathe')
    const pretty_bytes_1 = __importDefault(require('pretty-bytes'))
    // 50MB, which is the documented max, though the hard max seems to be higher
    // eslint-disable-next-line no-magic-numbers
    exports.LAMBDA_MAX_SIZE = 1024 * 1024 * 50
    // eslint-disable-next-line max-statements
    const checkZipSize = async (file, maxSize = exports.LAMBDA_MAX_SIZE) => {
        if (!(0, fs_extra_1.existsSync)(file)) {
            console.warn(`Could not check zip size because ${file} does not exist`)
            return
        }
        const fileSize = await fs_extra_1.promises.stat(file).then(({ size }) => size)
        if (fileSize < maxSize) {
            return
        }
        // We don't fail the build, because the actual hard max size is larger so it might still succeed
        console.log(
            (0, chalk_1.redBright)((0, common_tags_1.stripIndent)`
      The function zip ${(0, chalk_1.yellowBright)((0, pathe_1.relative)(process_1.default.cwd(), file))} size is ${(0,
            pretty_bytes_1.default)(fileSize)}, which is larger than the maximum supported size of ${(0,
            pretty_bytes_1.default)(maxSize)}.
      There are a few reasons this could happen, such as accidentally bundling a large dependency or adding lots of files to "included_files".
    `)
        )
        const zip = new node_stream_zip_1.async({ file })
        console.log(`Contains ${await zip.entriesCount} files`)
        const sortedFiles = Object.values(await zip.entries()).sort((entryA, entryB) => entryB.size - entryA.size)
        const largest = {}
        const MAX_ROWS = 10
        for (let idx = 0; idx < MAX_ROWS && idx < sortedFiles.length; idx++) {
            largest[`${idx + 1}`] = {
                File: sortedFiles[idx].name,
                'Compressed Size': (0, pretty_bytes_1.default)(sortedFiles[idx].compressedSize),
                'Uncompressed Size': (0, pretty_bytes_1.default)(sortedFiles[idx].size),
            }
        }
        await zip.close()
        console.log((0, chalk_1.yellowBright)`\n\nThese are the largest files in the zip:`)
        console.table(largest)
    }
    exports.checkZipSize = checkZipSize
})
