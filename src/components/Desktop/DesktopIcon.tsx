import React from 'react'
import { AppLink, AppItem } from 'components/OSIcons/AppIcon'
import ZoomHover from 'components/ZoomHover'

interface DesktopIconProps {
    app: AppItem
}

export default function DesktopIcon({ app }: DesktopIconProps) {
    return (
        <li data-icon-label={app.label} className="w-28 min-h-[84px] flex justify-center items-start">
            <ZoomHover>
                <AppLink {...app} />
            </ZoomHover>
        </li>
    )
}
