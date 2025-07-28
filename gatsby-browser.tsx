import React from 'react'
import { initKea, wrapElement } from './kea'
import './src/styles/global.css'
import HandbookLayout from './src/templates/Handbook'
import { Provider as ToastProvider } from './src/context/Toast'
import { RouteUpdateArgs } from 'gatsby'
import { UserProvider } from './src/hooks/useUser'
import Wrapper from './src/components/Wrapper'
import { Provider } from './src/context/App'
import BlueScreenOfDeath from './src/components/NotFoundPage/BlueScreenOfDeath'
initKea(false)

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
        }

        window?.posthog?.capture('$pageview')
    }
}

export const wrapPageElement = ({ element, props: { pageContext, location } }) => {
    // Check if this is a 404 page by checking if the NotFound component is being rendered
    // This catches both direct /404 visits and any non-existent pages
    const is404Page = element?.type?.name === 'NotFound' || location.pathname === '/404'

    return (
        <ToastProvider>
            <UserProvider>
                <Provider element={element} location={location}>
                    {is404Page ? <BlueScreenOfDeath /> : <Wrapper />}
                </Provider>
            </UserProvider>
        </ToastProvider>
    )
}
