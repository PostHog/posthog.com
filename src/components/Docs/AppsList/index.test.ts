import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import test from 'node:test'
import { runInNewContext } from 'node:vm'

const requireDependency = createRequire(import.meta.url)
const React = requireDependency('react')
const { renderToStaticMarkup } = requireDependency('react-dom/server')
const ts = requireDependency('typescript')

function renderProducts(products: Array<{ handle: string; name: string; slug: string }>) {
    const source = ts.transpileModule(readFileSync(new URL('./index.tsx', import.meta.url), 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
    }).outputText
    const exports = { AppsList: undefined }
    runInNewContext(source, {
        exports,
        require: (name: string) => {
            if (name === 'react') return React
            if (name === 'components/Link') {
                return ({ to, children, ...props }: { to: string; children: unknown }) =>
                    React.createElement('a', { href: to, ...props }, children)
            }
            assert.equal(name, '../../../hooks/useProducts')
            return () => ({ products })
        },
    })
    return renderToStaticMarkup(React.createElement(exports.AppsList))
}

test('the docs list omits retired Desktop docs while keeping current product links', () => {
    const products = [
        { handle: 'product_analytics', name: 'Product analytics', slug: 'product-analytics' },
        { handle: 'posthog_code', name: 'PostHog Desktop', slug: 'desktop' },
        { handle: 'inbox', name: 'Inbox', slug: 'inbox' },
        { handle: 'data_warehouse', name: 'Data warehouse', slug: 'data-stack' },
    ]
    const html = renderProducts(products)

    assert.doesNotMatch(html, /PostHog Desktop|\/docs\/(?:posthog-desktop|desktop)/)
    assert.match(html, /href="\/docs\/product-analytics"/)
    assert.match(html, /href="\/docs\/self-driving\/inbox"/)
    assert.match(html, /href="\/docs\/data-warehouse"/)
    assert.equal((html.match(/<a /g) || []).length, 3)
    assert.equal(products.length, 4, 'rendering docs must not mutate the shared product catalog')
})
