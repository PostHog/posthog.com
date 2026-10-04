// The desktop (wallpaper and icons) and the dialog windows above the page. Persisted across page
// changes, like the chrome.
import React from 'react'
import IslandRoot from './IslandRoot'
import Desktop from 'components/Desktop'
import AppWindow from 'components/AppWindow'
import { useDialogs } from '../context/App'

function Dialogs() {
    const dialogs = useDialogs()
    return (
        <>
            {dialogs.map((dialog) => (
                <AppWindow item={dialog} key={dialog.key} />
            ))}
        </>
    )
}

export default function DesktopIsland({ url }: { url: string }): JSX.Element {
    return (
        <IslandRoot url={url}>
            <Desktop />
            <Dialogs />
        </IslandRoot>
    )
}
