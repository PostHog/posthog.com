import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { runInNewContext } from 'node:vm'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const trackedSnippetFiles = execFileSync('git', ['ls-files', 'gatsby', 'contents/docs'], {
    cwd: root,
    encoding: 'utf-8',
})
    .trim()
    .split('\n')
    .filter((file) => /\.(?:html|js|jsx|md|mdx|ts|tsx)$/.test(file))

test('browser snippets do not assign inherited toString properties', () => {
    const directAssignment = /\bu(?:\.people)?\.toString\s*=/g
    const violations = []

    for (const file of trackedSnippetFiles) {
        const contents = fs.readFileSync(path.join(root, file), 'utf-8')
        for (const match of contents.matchAll(directAssignment)) {
            const line = contents.slice(0, match.index).split('\n').length
            violations.push(`${file}:${line}`)
        }
    }

    assert.deepEqual(violations, [])
})

test('the canonical snippet works with a read-only Array.prototype.toString', () => {
    const snippetSource = fs.readFileSync(path.join(root, 'contents/docs/integrate/snippet.mdx'), 'utf-8')
    const snippet = snippetSource.match(/^\s*(!function\(t,e\).*window\.posthog\|\|\[\]\);)$/m)?.[1]
    assert.ok(snippet, 'could not find the canonical browser snippet')

    const insertedScripts = []
    const snippetWindow = {}
    const snippetDocument = {
        createElement: () => ({}),
        getElementsByTagName: () => [
            {
                parentNode: {
                    insertBefore: (script) => insertedScripts.push(script),
                },
            },
        ],
    }

    runInNewContext(`'use strict';Object.defineProperty(Array.prototype,"toString",{writable:false});${snippet}`, {
        document: snippetDocument,
        window: snippetWindow,
    })

    const posthog = snippetWindow.posthog
    posthog.init('phc_test', { api_host: 'https://us.i.posthog.com' })

    assert.equal(insertedScripts.length, 1)
    assert.equal(posthog._i.length, 1)
    assert.equal(posthog._i[0][0], 'phc_test')
    assert.equal(posthog._i[0][1].api_host, 'https://us.i.posthog.com')
    assert.equal(posthog._i[0][2], 'posthog')
    assert.equal(posthog.toString(), 'posthog (stub)')
    assert.equal(posthog.people.toString(), 'posthog.people (stub)')

    for (const target of [posthog, posthog.people]) {
        const descriptor = Object.getOwnPropertyDescriptor(target, 'toString')
        assert.equal(descriptor.configurable, true)
        assert.equal(descriptor.enumerable, true)
        assert.equal(descriptor.writable, true)
        assert.equal(typeof descriptor.value, 'function')
    }
})
