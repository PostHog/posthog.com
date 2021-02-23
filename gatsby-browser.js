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
