import React from 'react'
import { Avatar } from 'components/UI/Avatar'
import { DemoLabel } from 'components/UILibraryDocs/DemoLayout'
import hedgehogSleepyPng from 'hoggies/sleepy.png'

const nightHogImage = hedgehogSleepyPng

const cases = [
    { label: 'Image loads', src: nightHogImage, initials: 'NH' },
    { label: 'Image fails', src: '/missing-avatar.png', initials: 'MH' },
    { label: 'No image', initials: 'JJ' },
]

export default function AvatarFallbacks(): JSX.Element {
    return (
        <div className="flex flex-wrap items-end gap-8">
            {cases.map(({ label, src, initials }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                    <Avatar.Root size="lg">
                        {src && <Avatar.Image src={src} alt={label} />}
                        <Avatar.Fallback delay={src ? 300 : undefined}>{initials}</Avatar.Fallback>
                    </Avatar.Root>
                    <DemoLabel>{label}</DemoLabel>
                </div>
            ))}
        </div>
    )
}
