import React from 'react'
import { Avatar } from 'components/UI/Avatar'
import { DemoLabel } from 'components/UILibraryDocs/DemoLayout'

const nightHogImage = 'https://res.cloudinary.com/dmukukwp6/image/upload/c_fill,w_96,h_96/night_hog_219fff00f3.png'

export default function AvatarSizes(): JSX.Element {
    return (
        <div className="flex items-end gap-6">
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                    <Avatar.Root size={size}>
                        <Avatar.Image src={nightHogImage} alt="Night hog" />
                        <Avatar.Fallback>NH</Avatar.Fallback>
                    </Avatar.Root>
                    <DemoLabel>{size}</DemoLabel>
                </div>
            ))}
        </div>
    )
}
