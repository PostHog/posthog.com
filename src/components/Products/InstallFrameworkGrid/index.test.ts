import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import test from 'node:test'
import { runInNewContext } from 'node:vm'

const requireDependency = createRequire(import.meta.url)
const React = requireDependency('react')
const { renderToStaticMarkup } = requireDependency('react-dom/server')
const ts = requireDependency('typescript')

const TAXONOMY = [
    {
        id: 'backend-languages',
        title: 'Backend languages',
        items: [
            { slug: 'nodejs', name: 'Node.js', librarySlug: 'node' },
            { slug: 'ruby', name: 'Ruby', librarySlug: 'ruby' },
            { slug: 'tanstack-router', name: 'TanStack Router', librarySlug: 'tanstack-router' },
        ],
    },
]

function renderGrid(data: unknown, productSlug?: string) {
    const source = ts.transpileModule(readFileSync(new URL('./index.tsx', import.meta.url), 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
    }).outputText
    const exports: { default?: unknown } = {}
    runInNewContext(source, {
        exports,
        require: (name: string) =>
            ({
                react: React,
                gatsby: { graphql: () => null, useStaticQuery: () => data },
                'components/Link': ({ to, children }: { to: string; children: unknown }) =>
                    React.createElement('a', { href: to }, children),
                'components/OSForm/input': () => null,
                '../../../constants/logos': { getLogo: (key: string) => `logo-${key}` },
                '../../../constants/installation-taxonomy': { TAXONOMY },
            }[name]),
    })
    return renderToStaticMarkup(React.createElement(exports.default, { productSlug, searchable: false }))
}

const data = {
    libraries: { nodes: [{ fields: { slug: '/docs/libraries/ruby' }, frontmatter: { platformLogo: 'ruby' } }] },
    productInstalls: { nodes: [{ fields: { slug: '/docs/error-tracking/installation/node' } }] },
    sdkReferences: { nodes: [{ slug: '/docs/libraries/node/reference' }] },
}

test('an SDK with only a generated reference links to that reference, and an SDK with no page is hidden', () => {
    const html = renderGrid(data)

    assert.match(html, /href="\/docs\/libraries\/node\/reference"/)
    assert.match(html, /src="logo-node"/)
    assert.match(html, /href="\/docs\/libraries\/ruby"/)
    assert.doesNotMatch(html, /TanStack Router/)
})

test('a product guide named after the library wins over the generic SDK page', () => {
    const html = renderGrid(data, 'error-tracking')

    assert.match(html, /href="\/docs\/error-tracking\/installation\/node"/)
    assert.doesNotMatch(html, /href="\/docs\/libraries\/node\/reference"/)
})
