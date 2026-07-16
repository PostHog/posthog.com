import React from 'react'
import { useAppActions, useAppSettings, useAppWindows } from '../../context/App'
import Desktop from 'components/Desktop'
import TaskBarMenu from 'components/TaskBarMenu'
import AppWindow from 'components/AppWindow'
import CookieBannerToast from 'components/CookieBanner/ToastVersion'
import { SearchOverlay } from 'components/SearchUI'
import { ChatOverlay } from 'hooks/useChat'
import AppContainer from 'components/AppContainer'

// Isolates the `windows` subscription so that opening/closing a window only
// re-renders this list, not the whole Wrapper (and therefore not the desktop,
// taskbar, etc.).
const WindowList = React.memo(function WindowList() {
    const { windows } = useAppWindows()

    return (
        <div className="flex size-full justify-center items-center">
            {windows.map((item) => (
                <AppWindow item={item} key={item.key} />
            ))}
        </div>
    )
})

export default function Wrapper() {
    const { constraintsRef } = useAppActions()
    const { compact } = useAppSettings()

    return (
        <AppContainer className="h-screen flex flex-col p-2">
            {!compact && <TaskBarMenu />}
            <div ref={constraintsRef} className={`flex-grow relative min-h-0 overflow-clip`}>
                <Desktop />
                <WindowList />
            </div>
            {/*             
            {!compact && <Dock />}
            */}
            <SearchOverlay />
            <ChatOverlay />
            <CookieBannerToast />
        </AppContainer>
    )
}
