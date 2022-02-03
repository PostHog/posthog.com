/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react'
import { initKea, wrapElement } from './kea'
import './src/styles/global.css'
import HandbookLayout from './src/templates/Handbook'

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
export const wrapPageElement = ({ element, props }) => {
    const slug = props.location.pathname.substring(1)
    return /^handbook|^docs/.test(slug) ? <HandbookLayout {...props} /> : element
}
