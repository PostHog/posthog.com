/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import { initKea, wrapElement } from './kea'
import './src/styles/global.css'

initKea(false)

export const wrapRootElement = wrapElement
export const onRouteUpdate = ({ location, prevLocation }) => {
    // This is checked and set on initial load in the body script set in gatsby-ssr.js
    // Checking for prevLocation prevents this from happening twice
    if (typeof window !== 'undefined' && prevLocation) {
        var slug = location.pathname.substring(1)
        var theme = /^handbook|^docs|^blog|^integrations|^product|^tutorials/.test(slug) ? window.__theme : 'light'
        document.body.className = theme
    }
}
