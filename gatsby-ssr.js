/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import { wrapElement, initKea } from './kea'

export const wrapPageElement = ({ element, props }) => {
    initKea(true, props.location)
    return wrapElement({ element })
}
