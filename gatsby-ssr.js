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
import { Provider as ToastProvider } from './src/context/Toast'

export const wrapRootElement = ({ element }) => (
    <ToastProvider>
        <UserProvider>{wrapElement({ element })}</UserProvider>
    </ToastProvider>
)

export const wrapPageElement = ({ element, props: { location } }) => {
    initKea(true, location)
    return (
        <Provider element={element} location={location}>
            <Wrapper />
        </Provider>
    )
}

export const onRenderBody = function ({ setPreBodyComponents, setPostBodyComponents }) {
    setPreBodyComponents([
        React.createElement('script', {
            key: 'dark-mode',
            dangerouslySetInnerHTML: {
                __html: `
(function () {
    window.__onThemeChange = function () {}
    function setTheme(newTheme) {
        window.__theme = newTheme
        preferredTheme = newTheme
        document.body.className = newTheme
        window.__onThemeChange(newTheme)
    }
    var preferredTheme
    var slug = window.location.pathname.substring(1)
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    darkQuery.addListener(function (e) {
        if (!localStorage.getItem('theme')) {
            window.__setPreferredTheme('system')
        }
    })
    try {
        preferredTheme =
            localStorage.getItem('theme') || 'light'
    } catch (err) {}
    window.__setPreferredTheme = function (theme) {
        const newTheme = theme === 'system' ? (darkQuery.matches ? 'dark' : 'light') : theme
        setTheme(newTheme)
        try {
            localStorage.setItem('theme', newTheme)
        } catch (err) {}
        return newTheme
    }
    setTheme(preferredTheme === 'system' ? (darkQuery.matches ? 'dark' : 'light') : preferredTheme)

    // Set initial skin value
    try {
        const savedSkin = JSON.parse(localStorage.getItem('siteSettings') || '{}').skinMode || 'modern'
        document.body.setAttribute('data-skin', savedSkin)
        const savedWallpaper = JSON.parse(localStorage.getItem('siteSettings') || '{}').wallpaper || 'keyboard-garden'
        document.body.setAttribute('data-wallpaper', savedWallpaper)
    } catch (err) {}
})()
      `,
            },
        }),
    ])

    setPostBodyComponents([
        React.createElement('div', {
            key: 'initial-loader',
            id: 'initial-loader',
            dangerouslySetInnerHTML: {
                __html: `
                <style>
                    #initial-loader {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 9999;
                        pointer-events: none;
                    }
                    #initial-loader-content {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                        width: 20rem;
                        background: rgba(255, 255, 255, 0.75);
                        backdrop-filter: blur(8px);
                        border: 1px solid rgba(0, 0, 0, 0.1);
                        border-radius: 0.25rem;
                        padding: 1rem;
                    }
                    body.dark #initial-loader-content {
                        background: rgba(30, 31, 35, 0.75);
                        border-color: rgba(255, 255, 255, 0.1);
                    }
                    .hourglass-spinner {
                        animation: hourglass-flip 2.4s ease-in-out infinite;
                        opacity: 0.75;
                    }
                    @keyframes hourglass-flip {
                        0%, 40% { transform: rotate(0deg); }
                        48%, 90% { transform: rotate(180deg); }
                        98%, 100% { transform: rotate(360deg); }
                    }
                    .sand-top {
                        transform-origin: center bottom;
                        animation: sand-drain-top 2.4s ease-in-out infinite;
                    }
                    .sand-bottom {
                        transform-origin: center top;
                        animation: sand-drain-bottom 2.4s ease-in-out infinite;
                    }
                    @keyframes sand-drain-top {
                        0% { transform: scaleY(1); opacity: 0.6; }
                        40% { transform: scaleY(0); opacity: 0; }
                        48%, 100% { transform: scaleY(0); opacity: 0; }
                    }
                    @keyframes sand-drain-bottom {
                        0%, 48% { transform: scaleY(0); opacity: 0; }
                        50% { transform: scaleY(1); opacity: 0.6; }
                        90% { transform: scaleY(0); opacity: 0; }
                        100% { transform: scaleY(0); opacity: 0; }
                    }
                    #initial-loader-text {
                        flex: 1;
                        font-weight: 500;
                        color: rgba(0, 0, 0, 0.8);
                    }
                    body.dark #initial-loader-text {
                        color: rgba(255, 255, 255, 0.8);
                    }
                </style>
                <div id="initial-loader-content">
                    <svg class="hourglass-spinner" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6 2h12M6 22h12M18 2v3.5c0 1.5-1 2.5-2.5 4L12 13l-3.5-3.5C7 8 6 7 6 5.5V2M18 22v-3.5c0-1.5-1-2.5-2.5-4L12 11l-3.5 3.5C7 16 6 17 6 18.5V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path class="sand-top" d="M8 4 L16 4 L14.5 7 L9.5 7 Z" fill="currentColor" opacity="0.6"/>
                        <path class="sand-bottom" d="M8 20 L16 20 L14.5 17 L9.5 17 Z" fill="currentColor" opacity="0.6"/>
                    </svg>
                    <div id="initial-loader-text">Loading PostHog...</div>
                </div>
                `,
            },
        }),
    ])
}
