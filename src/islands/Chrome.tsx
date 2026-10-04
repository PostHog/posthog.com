// The taskbar and the global overlays. Astro keeps this island mounted across page changes
// (transition:persist), so menus, search, chat, and toasts keep their state and nothing blinks.
import React from 'react'
import IslandRoot from './IslandRoot'
import { AppEffects } from '../context/App'
import TaskBarMenu from 'components/TaskBarMenu'
import CookieBannerToast from 'components/CookieBanner/ToastVersion'
import { SearchOverlay } from 'components/SearchUI'
import { ChatOverlay } from 'hooks/useChat'
import WebMCP from 'components/WebMCP'
import Toasts from 'components/Toast'
import { useAppSettings } from '../context/App'

function Chrome() {
    const { compact } = useAppSettings()
    return (
        <>
            <AppEffects />
            {!compact && <TaskBarMenu />}
            <SearchOverlay />
            <ChatOverlay />
            <WebMCP />
            <CookieBannerToast />
            <Toasts />
        </>
    )
}

export default function ChromeIsland({ url }: { url: string }): JSX.Element {
    return (
        <IslandRoot url={url}>
            <Chrome />
        </IslandRoot>
    )
}
