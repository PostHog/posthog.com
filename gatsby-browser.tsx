import React from 'react'
import { initKea, wrapElement } from './kea'
import '@fontsource-variable/ibm-plex-sans'
import '@fontsource-variable/ibm-plex-sans/wght-italic.css'
import './src/styles/global.css'
import { Provider as ToastProvider } from './src/context/Toast'
import { RouteUpdateArgs } from 'gatsby'
import { UserProvider } from './src/hooks/useUser'
import Wrapper from './src/components/Wrapper'
import KoreanWrapper from './src/components/Korean/KoreanWrapper'
import { Provider } from './src/context/App'
import { isStaleAssetError, reloadForStaleAssets } from './src/components/ErrorBoundary'
initKea(false)

// Chunk / page-data fetch failures during client-side navigation are thrown
// inside Gatsby's loader — outside React render — so no error boundary can catch
// them, and they leave the visitor on a blank screen. These are almost always a
// stale-deploy race (the loaded HTML references asset hashes that no longer
// exist on the CDN). Recover with a guarded one-time reload of the current URL,
// which pulls the fresh post-deploy assets.
export const onClientEntry = () => {
    if (typeof window === 'undefined') {
        return
    }
    window.addEventListener('unhandledrejection', (event) => {
        if (isStaleAssetError(event?.reason)) {
            reloadForStaleAssets()
        }
    })
    window.addEventListener('error', (event) => {
        if (isStaleAssetError(event?.error || event?.message)) {
            reloadForStaleAssets()
        }
    })
}

const isKoreanPath = (pathname?: string) => pathname === '/ko' || pathname?.startsWith('/ko/')

export const wrapRootElement = ({ element }) => (
    <ToastProvider>
        <UserProvider>{wrapElement({ element })}</UserProvider>
    </ToastProvider>
)

export const onRouteUpdate = ({ location, prevLocation }: RouteUpdateArgs) => {
    // This is checked and set on initial load in the body script set in gatsby-ssr.js
    // Checking for prevLocation prevents this from happening twice
    if (typeof window !== 'undefined' && prevLocation) {
        var theme = (window as any).__theme

        document.body.className = theme
    }

    if (window?.posthog) {
        if (prevLocation) {
            window.posthog.capture('$pageleave', {
                $host: prevLocation.host,
                $pathname: prevLocation.pathname,
                $current_url: prevLocation.href,
            })

            if (isKoreanPath(prevLocation.pathname) && !isKoreanPath(location.pathname)) {
                window.posthog.capture('ko_navigated_to_english', {
                    from: prevLocation.pathname,
                    to: location.pathname,
                })
            }
        }

        window?.posthog?.capture('$pageview')
    }
}

export const wrapPageElement = ({ element, props: { location } }) => {
    const WrapperComponent = isKoreanPath(location?.pathname) ? KoreanWrapper : Wrapper

    return (
        <Provider element={element} location={location}>
            <WrapperComponent />
        </Provider>
    )
}

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
    if (location.state?.preventScroll) {
        return false
    }
    return true
}
