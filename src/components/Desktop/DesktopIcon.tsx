import React from 'react'
import { AppLink, AppItem } from 'components/OSIcons/AppIcon'
import ZoomHover from 'components/ZoomHover'
import { SELECTED_ICON_CLASSES } from './useMarqueeSelection'

interface DesktopIconProps {
    app: AppItem
    /** Highlighted by the desktop's marquee selection (see useMarqueeSelection) */
    selected?: boolean
}

function DesktopIcon({ app, selected }: DesktopIconProps) {
    return (
        <li
            data-icon-label={app.label}
            className={`w-28 min-h-[84px] flex justify-center items-start${
                selected ? ` ${SELECTED_ICON_CLASSES}` : ''
            }`}
        >
            <ZoomHover>
                <AppLink {...app} />
            </ZoomHover>
        </li>
    )
}

// Memoized so a selection change only re-renders the icons whose `selected`
// flipped (the `app` objects are kept referentially stable in Desktop).
export default React.memo(DesktopIcon)
