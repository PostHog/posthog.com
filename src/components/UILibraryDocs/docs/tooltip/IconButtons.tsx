import React from 'react'
import { IconCopy, IconDownload, IconShare } from '@posthog/icons'
import { IconButton } from 'components/UI/Button'
import { Tooltip } from 'components/UI/Tooltip'

const actions = [
    { label: 'Copy', icon: <IconCopy /> },
    { label: 'Download', icon: <IconDownload /> },
    { label: 'Share', icon: <IconShare /> },
]

export default function TooltipIconButtons(): JSX.Element {
    return (
        <Tooltip.Provider>
            <div className="flex gap-2">
                {actions.map(({ label, icon }) => (
                    <Tooltip.Root key={label}>
                        <Tooltip.Trigger render={<IconButton aria-label={label} icon={icon} />} />
                        <Tooltip.Popup>{label}</Tooltip.Popup>
                    </Tooltip.Root>
                ))}
            </div>
        </Tooltip.Provider>
    )
}
