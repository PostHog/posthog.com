/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import 'prismjs/themes/prism-okaidia.css'
import { wrapElement, initKea } from './kea'
import './src/styles/global.css'

initKea(false)

export const wrapRootElement = wrapElement
export const onRouteUpdate = ({ location }) => {
    const setBodyClass = (className) => (document.body.className = className)
    const theme = localStorage.getItem('theme')
    const slug = location.pathname.substring(1)
    setBodyClass((/^handbook|^docs|^blog/.test(slug) && theme) || 'dark')
}
