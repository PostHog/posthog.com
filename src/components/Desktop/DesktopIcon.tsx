import React from 'react'
import { AppLink, AppItem } from 'components/OSIcons/AppIcon'
import ZoomHover from 'components/ZoomHover'

interface DesktopIconProps {
    app: AppItem
    /** Highlighted by the desktop's marquee selection (see useMarqueeSelection) */
    selected?: boolean
}

export default function DesktopIcon({ app, selected }: DesktopIconProps) {
    return (
        <li
            data-icon-label={app.label}
            className={`w-28 min-h-[84px] flex justify-center items-start ${
                selected ? 'rounded-md bg-blue/20 ring-1 ring-inset ring-blue/40' : ''
            }`}
        >
            <ZoomHover>
                <AppLink {...app} />
            </ZoomHover>
        </li>
    )
}
