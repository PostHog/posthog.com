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
import { Provider as ToastProvider } from './src/context/Toast'
import BlueScreenOfDeath from './src/components/NotFoundPage/BlueScreenOfDeath'

export const wrapPageElement = ({ element, props }) => {
    const slug = props.location.pathname.substring(1)

    // Check if this is a 404 page by checking if the NotFound component is being rendered
    // This catches both direct /404 visits and any non-existent pages
    const is404Page = element?.type?.name === 'NotFound' || props.location.pathname === '/404'

    if (is404Page) {
        return (
            <ToastProvider>
                <UserProvider>
                    <BlueScreenOfDeath />
                </UserProvider>
            </ToastProvider>
        )
    }

    initKea(true, props.location)
    return (
        <ToastProvider>
            <UserProvider>
                {wrapElement({
                    element: (
                        <Provider element={element} location={props.location}>
                            <Wrapper element={element} />
                        </Provider>
                    ),
                })}
            </UserProvider>
        </ToastProvider>
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
            localStorage.getItem('theme') || 'light'
    } catch (err) {}
    window.__setPreferredTheme = function (theme) {
        const newTheme = theme === 'system' ? (darkQuery.matches ? 'dark' : 'light') : theme
        setTheme(newTheme)
        try {
            localStorage.setItem('theme', newTheme)
        } catch (err) {}
        return newTheme
    }
    setTheme(preferredTheme === 'system' ? (darkQuery.matches ? 'dark' : 'light') : preferredTheme)

    // Set initial skin value
    try {
        const savedSkin = JSON.parse(localStorage.getItem('siteSettings') || '{}').skinMode || 'modern'
        document.body.setAttribute('data-skin', savedSkin)
        const savedWallpaper = JSON.parse(localStorage.getItem('siteSettings') || '{}').wallpaper || 'hogzilla'
        document.body.setAttribute('data-wallpaper', savedWallpaper)
    } catch (err) {}
})()
      `,
            },
        }),
    ])
}
