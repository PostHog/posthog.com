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
import KoreanWrapper from './src/components/Korean/KoreanWrapper'
import { Provider } from './src/context/App'
import { Provider as ToastProvider } from './src/context/Toast'

const isKoreanPath = (pathname) => pathname === '/ko' || pathname?.startsWith('/ko/')

export const wrapRootElement = ({ element }) => (
    <ToastProvider>
        <UserProvider>{wrapElement({ element })}</UserProvider>
    </ToastProvider>
)

export const wrapPageElement = ({ element, props: { location } }) => {
    initKea(true, location)
    const WrapperComponent = isKoreanPath(location?.pathname) ? KoreanWrapper : Wrapper

    return (
        <Provider element={element} location={location}>
            <WrapperComponent />
        </Provider>
    )
}

export const onRenderBody = function ({ setHeadComponents, setPreBodyComponents }) {
    setHeadComponents([
        // The SVG carries both color schemes and switches between them itself. It is declared
        // last because browsers that can use it take the last icon they understand, and the PNG
        // is only here for the ones that cannot. Both come from scripts/generate-brand-assets.mjs.
        <link key="favicon-png" rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />,
        <link key="favicon-svg" rel="icon" type="image/svg+xml" href="/favicon.svg" />,
    ])
    setPreBodyComponents([
        React.createElement('script', {
            key: 'dark-mode',
            src: '/scripts/theme-init.js',
        }),
    ])
}

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
    const filteredComponents = getHeadComponents().filter((component) => {
        // remove the inline script added by the gatsby-remark-autolink-headers plugin
        if (component?.type === 'script' && component?.key === 'gatsby-remark-autolink-headers-script') {
            return false
        }
        return true
    })

    replaceHeadComponents(filteredComponents)
}
