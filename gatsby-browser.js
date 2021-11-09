/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import { initKea, wrapElement } from './kea'
import './src/styles/global.css'

initKea(false)

export const wrapRootElement = wrapElement
export const onRouteUpdate = ({ location }) => {
    if (typeof window !== 'undefined') {
        window.__onThemeChange = function () {}
        function setTheme(newTheme) {
            window.__theme = newTheme
            preferredTheme = newTheme
            document.body.className = newTheme
            window.__onThemeChange(newTheme)
        }
        var preferredTheme
        var slug = location.pathname.substring(1)
        var darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
        darkQuery.addListener(function (e) {
            window.__setPreferredTheme(e.matches ? 'dark' : 'light')
        })
        try {
            preferredTheme =
                (/^handbook|^docs|^blog|^plugins/.test(slug) &&
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
    }
}
