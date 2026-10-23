import React from 'react'
import { Avatar } from 'components/UI/Avatar'

const nightHogImage = 'https://res.cloudinary.com/dmukukwp6/image/upload/c_fill,w_96,h_96/night_hog_219fff00f3.png'

export default function AvatarSizes(): JSX.Element {
    return (
        <div className="flex items-center gap-3">
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <Avatar.Root key={size} size={size}>
                    <Avatar.Image src={nightHogImage} alt="Night hog" />
                    <Avatar.Fallback>NH</Avatar.Fallback>
                </Avatar.Root>
            ))}
        </div>
    )
}
