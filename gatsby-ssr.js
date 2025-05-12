/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
const React = require('react')

import { initKea, wrapElement } from './kea'
import { UserProvider } from './src/hooks/useUser'
import Wrapper from './src/components/Wrapper'
import { Provider } from './src/context/App'

export const wrapPageElement = ({ element, props }) => {
    const slug = props.location.pathname.substring(1)
    initKea(true, props.location)
    return (
        <UserProvider>
            {wrapElement({
                element: (
                    <Provider element={element} location={props.location}>
                        <Wrapper element={element} />
                    </Provider>
                ),
            })}
        </UserProvider>
    )
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
        if (!localStorage.getItem('theme')) {
            window.__setPreferredTheme('system')
        }
    })
    try {
        preferredTheme =
            (localStorage.getItem('theme') || (darkQuery.matches ? 'dark' : 'light')) ||
            'light'
    } catch (err) {}
    window.__setPreferredTheme = function (newTheme) {
        setTheme(newTheme === 'system' ? (darkQuery.matches ? 'dark' : 'light') : newTheme)
        try {
            localStorage.setItem('theme', newTheme)
        } catch (err) {}
    }
    setTheme(preferredTheme === 'system' ? (darkQuery.matches ? 'dark' : 'light') : preferredTheme)

    // Set initial skin value
    try {
        const savedSkin = localStorage.getItem('skin') || 'modern'
        document.body.setAttribute('data-skin', savedSkin)
    } catch (err) {}
})()
      `,
            },
        }),
    ])
}
