/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react'
import { initKea, wrapElement } from './kea'
import { ProductHuntBadgeLayoutWrapper } from './src/components/ProductHuntBadge'
import './src/styles/global.css'

initKea(false)

export const wrapRootElement = wrapElement
export const wrapPageElement = ({ element, props }) => (
    <ProductHuntBadgeLayoutWrapper {...props}>{element}</ProductHuntBadgeLayoutWrapper>
)
export const onRouteUpdate = ({ location, prevLocation }) => {
    // This is checked and set on initial load in the body script set in gatsby-ssr.js
    // Checking for prevLocation prevents this from happening twice
    if (typeof window !== 'undefined' && prevLocation) {
        var slug = location.pathname.substring(1)
        var theme = /^handbook|^docs|^blog|^integrations/.test(slug) ? window.__theme : 'light'
        document.body.className = theme
    }
}
