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
        React.createElement('script', {
            key: 'chat',
            dangerouslySetInnerHTML: {
                __html: `
(function (w, d, t) {
    w.$unthreadSettings = {
    baseUrl: 'https://posthog.unthread.io',
    widgetId: '82bbc8b4-485f-4c15-9ada-e69f0e54c6bd'
    };

    var u = function() {
    u.c(arguments);
    };
    u.q = [];
    u.c = function(args) {
    u.q.push(args);
    };
    w.$unthread = u;

    var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
    g.src = w.$unthreadSettings.baseUrl + '/widget/js/wrapper.js';
    g.defer = true;
    g.async = true;
    s.parentNode.insertBefore(g, s);
})(window, document, 'script');
      `,
            },
        }),
    ])
}
