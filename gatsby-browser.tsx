import React from 'react'
import { initKea, wrapElement } from './kea'
import './src/styles/global.css'
import HandbookLayout from './src/templates/Handbook'
import Product from './src/templates/Product'
import SqueakTopic from './src/templates/SqueakTopic'
import Job from './src/templates/Job'
import { Provider as ToastProvider } from './src/context/toast'
import { RouteUpdateArgs } from 'gatsby'

initKea(false)

export const wrapRootElement = ({ element }) => <ToastProvider>{wrapElement({ element })}</ToastProvider>
export const onRouteUpdate = ({ location, prevLocation }: RouteUpdateArgs) => {
    // This is checked and set on initial load in the body script set in gatsby-ssr.js
    // Checking for prevLocation prevents this from happening twice
    if (typeof window !== 'undefined' && prevLocation) {
        var slug = location.pathname.substring(1)
        var theme = /^handbook|^docs|^blog|^integrations|^tutorials|^questions|^manual|^using-posthog/.test(slug)
            ? (window as any).__theme
            : 'light'
        document.body.className = theme
    }

    if (window?.posthog) {
        if (prevLocation) {
            window.posthog.capture('$pageleave', {
                $host: prevLocation.host,
                $pathname: prevLocation.pathname,
                $current_url: prevLocation.href,
            })
        }

        window?.posthog?.capture('$pageview')
    }
}
export const wrapPageElement = ({ element, props }) => {
    const slug = props.location.pathname.substring(1)
    return props.custom404 || !props.data ? (
        element
    ) : /^handbook|^docs\/(?!api)|^manual/.test(slug) &&
      !['docs/api/post-only-endpoints', 'docs/api/user'].includes(slug) ? (
        <HandbookLayout {...props} />
    ) : /^product\//.test(slug) ? (
        <Product {...props} />
    ) : /^questions\//.test(slug) ? (
        <SqueakTopic {...props} />
    ) : /^careers\//.test(slug) ? (
        <Job {...props} />
    ) : (
        element
    )
}
