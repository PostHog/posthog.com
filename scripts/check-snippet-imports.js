#!/usr/bin/env node

/**
 * Checks that MDX snippet import names are unique across different MDX source files.
 *
 * Problem: When MDX snippets are composed together on a page, two snippets that both
 * `import Foo from './a.mdx'` and `import Foo from './b.mdx'` create a naming conflict.
 * This script ensures that if two MDX snippet files use the same import name for an MDX
 * source, they must be importing from the same file.
 */

import fs from 'fs'
import path from 'path'
import glob from 'glob'

const ROOT_DIR = path.resolve(__dirname, '..')
const CONTENTS_DIR = path.resolve(ROOT_DIR, 'contents')
const SNIPPET_GLOB = `${CONTENTS_DIR}/**/_snippets/**/*.mdx`

function resolveSource(importSource, importerFile) {
    if (importSource.startsWith('.') || importSource.startsWith('/')) {
        const importerDir = path.dirname(importerFile)
        return path.resolve(importerDir, importSource)
    }
    return importSource
}

function stripExtension(filePath) {
    return filePath.replace(/\.mdx$/, '')
}

function isMdxImport(source) {
    return source.endsWith('.mdx')
}

function extractImports(content) {
    const imports = []

    for (const line of content.split('\n')) {
        const trimmed = line.trim()
        if (!trimmed.startsWith('import ')) continue

        const sourceMatch = trimmed.match(/from\s+['"](.+?)['"]/)
        if (!sourceMatch) continue
        const source = sourceMatch[1]

        if (!isMdxImport(source)) continue

        // Default import: import Foo from '...'
        const defaultMatch = trimmed.match(/^import\s+(\w+)\s+from\s/)
        if (defaultMatch) {
            imports.push({ name: defaultMatch[1], source })
        }
    }

    return imports
}

function run() {
    const files = glob.sync(SNIPPET_GLOB)
    // Map: importName -> { source (normalized), file (where first seen), rawSource }
    const seen = new Map()
    const errors = []

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8')
        const relFile = path.relative(process.cwd(), file)
        const imports = extractImports(content)

        for (const { name, source } of imports) {
            const resolved = stripExtension(resolveSource(source, file))

            if (seen.has(name)) {
                const prev = seen.get(name)
                if (prev.source !== resolved) {
                    errors.push(
                        `Duplicate import name "${name}" from different sources:\n` +
                            `  - ${prev.file}: from '${prev.rawSource}'\n` +
                            `  - ${relFile}: from '${source}'`
                    )
                }
            } else {
                seen.set(name, {
                    source: resolved,
                    file: relFile,
                    rawSource: source,
                })
            }
        }
    }

    if (errors.length > 0) {
        console.error('Snippet import name conflicts found:\n')
        for (const err of errors) {
            console.error(err)
            console.error()
        }
        console.error(
            `${errors.length} conflict(s) found. Each import name must map to the same .mdx source file across all snippets.`
        )
        process.exit(1)
    }

    console.log(`Checked ${files.length} MDX snippet files — no import name conflicts found.`)
}

run()
