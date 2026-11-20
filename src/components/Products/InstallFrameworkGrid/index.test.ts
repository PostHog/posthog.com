import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import test from 'node:test'
import { runInNewContext } from 'node:vm'

const requireDependency = createRequire(import.meta.url)
const React = requireDependency('react')
const { renderToStaticMarkup } = requireDependency('react-dom/server')
const ts = requireDependency('typescript')

function load(path: string, modules: Record<string, unknown>) {
    const source = ts.transpileModule(readFileSync(new URL(path, import.meta.url), 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
    }).outputText
    const exports: Record<string, any> = {}
    runInNewContext(source, { exports, require: (name: string) => modules[name] })
    return exports
}

const logos = load('../../../constants/logos.ts', {})
const taxonomy = load('../../../constants/installation-taxonomy.ts', { './logos': logos })

function renderGrid(productInstalls: string[], productSlug?: string) {
    const data = {
        libraries: { nodes: [{ fields: { slug: '/docs/libraries/ruby' }, frontmatter: { platformLogo: 'ruby' } }] },
        productInstalls: { nodes: productInstalls.map((slug) => ({ fields: { slug } })) },
        sdkReferences: {
            nodes: [{ slug: '/docs/libraries/node/reference' }, { slug: '/docs/libraries/python/reference' }],
        },
    }
    const { default: InstallFrameworkGrid } = load('./index.tsx', {
        react: React,
        gatsby: { graphql: () => null, useStaticQuery: () => data },
        'components/Link': ({ to, children }: { to: string; children: unknown }) =>
            React.createElement('a', { href: to }, children),
        'components/OSForm/input': () => null,
        '../../../constants/logos': logos,
        '../../../constants/installation-taxonomy': taxonomy,
    })
    const html = renderToStaticMarkup(
        React.createElement(InstallFrameworkGrid, {
            categories: ['backend-languages', 'backend-frameworks'],
            productSlug,
            searchable: false,
        })
    )
    const tile = (name: string) =>
        html.match(new RegExp(`<a href="([^"]+)"><img src="([^"]+)"[^>]*/><span[^>]*>${name}</span>`))
    return Object.assign(tile, { html })
}

test('an SDK with only a generated reference links to that reference, and an SDK with no page is hidden', () => {
    const tile = renderGrid([])

    assert.equal(tile('Node.js')?.[1], '/docs/libraries/node/reference')
    assert.equal(tile('Node.js')?.[2], logos.getLogo('nodejs'))
    assert.equal(tile('Ruby')?.[1], '/docs/libraries/ruby')
    assert.doesNotMatch(tile.html, />Go</)
})

test('a product guide named after the tile wins, then one named after the library unless a tile owns it', () => {
    assert.equal(
        renderGrid(['/docs/error-tracking/installation/node'], 'error-tracking')('Node.js')?.[1],
        '/docs/error-tracking/installation/node'
    )
    assert.equal(
        renderGrid(['/docs/logs/installation/node', '/docs/logs/installation/nodejs'], 'logs')('Node.js')?.[1],
        '/docs/logs/installation/nodejs'
    )

    const flags = renderGrid(['/docs/feature-flags/installation/python'], 'feature-flags')
    assert.equal(flags('Python')?.[1], '/docs/feature-flags/installation/python')
    assert.equal(flags('FastAPI')?.[1], '/docs/libraries/python/reference')
})
