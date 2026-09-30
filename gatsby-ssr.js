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
import { I18nProvider } from './src/i18n'
import { Provider as ToastProvider } from './src/context/Toast'

export const wrapRootElement = ({ element }) => (
    <ToastProvider>
        <UserProvider>{wrapElement({ element })}</UserProvider>
    </ToastProvider>
)

export const wrapPageElement = ({ element, props: { location, pageContext } }) => {
    initKea(true, location)
    return (
        <Provider element={element} location={location}>
            {/* The taskbar and desktop follow the current page. Each window sets its own locale. */}
            <I18nProvider pageContext={pageContext}>
                <Wrapper />
            </I18nProvider>
        </Provider>
    )
}

export const onRenderBody = function ({ setPreBodyComponents }) {
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
