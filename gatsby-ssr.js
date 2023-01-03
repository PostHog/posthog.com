/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
const React = require('react')

import { initKea, wrapElement } from './kea'
import HandbookLayout from './src/templates/Handbook'
import Product from './src/templates/Product'
import Job from './src/templates/Job'

export const wrapPageElement = ({ element, props }) => {
    const slug = props.location.pathname.substring(1)
    initKea(true, props.location)
    return wrapElement({
        element:
            props.custom404 || !props.data ? (
                element
            ) : /^handbook|^docs\/(?!api)|^manual/.test(slug) &&
              !['docs/api/post-only-endpoints', 'docs/api/user'].includes(slug) ? (
                <HandbookLayout {...props} />
            ) : /^product\//.test(slug) ? (
                <Product {...props} />
            ) : /^careers\//.test(slug) ? (
                <Job {...props} />
            ) : (
                element
            ),
    })
}

export const onRenderBody = function ({ setPreBodyComponents }) {
    setPreBodyComponents([
        React.createElement('script', {
            key: 'dark-mode',
            dangerouslySetInnerHTML: {
                __html: `
(function () {
    window.__onThemeChange = function () {}
    function setTheme(newTheme) {
        window.__theme = newTheme
        preferredTheme = newTheme
        document.body.className = newTheme
        window.__onThemeChange(newTheme)
    }
    var preferredTheme
    var slug = window.location.pathname.substring(1)
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    darkQuery.addListener(function (e) {
        window.__setPreferredTheme(e.matches ? 'dark' : 'light')
    })
    try {
        preferredTheme =
            (/^handbook|^docs|^blog|^integrations|^tutorials|^questions|^using-posthog|^manual|^community/.test(slug) &&
                (localStorage.getItem('theme') || (darkQuery.matches ? 'dark' : 'light'))) ||
            'light'
    } catch (err) {}
    window.__setPreferredTheme = function (newTheme) {
        setTheme(newTheme)
        try {
            localStorage.setItem('theme', newTheme)
        } catch (err) {}
    }
    setTheme(preferredTheme)
})()
      `,
            },
        }),
    ])
}
