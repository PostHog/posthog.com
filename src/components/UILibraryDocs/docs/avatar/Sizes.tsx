import React from 'react'
import { Avatar } from 'components/UI/Avatar'
import { DemoLabel } from 'components/UILibraryDocs/DemoLayout'
import hedgehogSleepyPng from 'hoggies/sleepy.png'

const labels = { sm: 'sm · lists', md: 'md · default', lg: 'lg · profiles' }

const nightHogImage = hedgehogSleepyPng

export default function AvatarSizes(): JSX.Element {
    return (
        <div className="flex items-end gap-6">
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                    <Avatar.Root size={size}>
                        <Avatar.Image src={nightHogImage} alt="Night hog" />
                        <Avatar.Fallback>NH</Avatar.Fallback>
                    </Avatar.Root>
                    <DemoLabel>{labels[size]}</DemoLabel>
                </div>
            ))}
        </div>
    )
}
