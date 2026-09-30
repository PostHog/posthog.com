import React, { useEffect } from 'react'
import { useAppActions, useAppSettings, useAppWindows } from '../../context/App'
import Desktop from 'components/Desktop'
import TaskBarMenu from 'components/TaskBarMenu'
import AppWindow from 'components/AppWindow'
import CookieBannerToast from 'components/CookieBanner/ToastVersion'
import { SearchOverlay } from 'components/SearchUI'
import { ChatOverlay } from 'hooks/useChat'
import AppContainer from 'components/AppContainer'
import WebMCP from 'components/WebMCP'
import { Direction } from 'radix-ui'
import { useDirection } from '../../i18n/useDirection'
import { useEnglishOnlyNotice } from '../../i18n/useEnglishOnlyNotice'

// Isolates the `windows` subscription so that opening/closing a window only
// re-renders this list, not the whole Wrapper (and therefore not the desktop,
// taskbar, etc.).
const WindowList = React.memo(function WindowList() {
    const { windows } = useAppWindows()

    return (
        <div data-app="WindowList" className="flex size-full justify-center items-center">
            {windows.map((item) => (
                <AppWindow item={item} key={item.key} />
            ))}
        </div>
    )
})

export default function Wrapper() {
    const { constraintsRef } = useAppActions()
    const { compact } = useAppSettings()
    const dir = useDirection()
    useEnglishOnlyNotice()

    // Overlays (cookie toast, search, chat) and Radix popovers render in portals attached
    // to <body>, outside #app-container, so they inherit direction from <html> rather than
    // from the shell. Keep the document in step with the shell or they stay LTR.
    useEffect(() => {
        document.documentElement.setAttribute('dir', dir)
    }, [dir])

    return (
        // Radix primitives read direction from this provider, not from the DOM, so it is
        // nested to match the `dir` attributes exactly: RTL shell, LTR canvas, RTL content.
        <Direction.Provider dir={dir}>
            <AppContainer dir={dir} className="h-dvh flex flex-col p-2">
                {!compact && <TaskBarMenu />}
                <Direction.Provider dir="ltr">
                    <div
                        data-app="DesktopViewport"
                        ref={constraintsRef}
                        // Window positions are container-relative {x, y} coordinates rendered as
                        // framer-motion transforms, which ignore `dir`. Pinning the canvas to LTR
                        // keeps drag, resize, and snap correct under an RTL shell.
                        dir="ltr"
                        className={`flex-grow relative min-h-0 overflow-clip`}
                    >
                        <Desktop />
                        <WindowList />
                    </div>
                </Direction.Provider>
                {/*             
            {!compact && <Dock />}
            */}
                <SearchOverlay />
                <ChatOverlay />
                <WebMCP />
                <CookieBannerToast />
            </AppContainer>
        </Direction.Provider>
    )
}
