import React from 'react'
import { IconFlag, IconGear, IconRewindPlay } from '@posthog/icons'
import { Chip } from 'components/UI/Chip'

export default function ChipWithIcon(): JSX.Element {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Chip icon={<IconGear />}>Settings</Chip>
            <Chip icon={<IconFlag />}>Feature flags</Chip>
            <Chip icon={<IconRewindPlay />}>Session replay</Chip>
        </div>
    )
}
