import React from 'react'
import { Avatar } from 'components/UI/Avatar'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const hogImage = (file: string): string => `https://res.cloudinary.com/dmukukwp6/image/upload/c_fill,w_96,h_96/${file}`

const teamMembers = [
    { name: 'Night hog', initials: 'NH', image: hogImage('night_hog_219fff00f3.png') },
    { name: 'Steve hog', initials: 'SH', image: hogImage('steve_hogs_17c7900b07.png') },
    { name: 'Max Hedgehog', initials: 'MH' },
    { name: 'Jane Jones', initials: 'JJ' },
    { name: 'Ada Lovelace', initials: 'AL' },
    { name: 'Grace Hopper', initials: 'GH' },
]

export default function AvatarGroup(): JSX.Element {
    return (
        <DemoRows>
            {(['md', 'lg'] as const).map((size) => (
                <DemoRow key={size} label={size}>
                    <Avatar.Group size={size} max={4} aria-label="Team members">
                        {teamMembers.map(({ name, initials, image }) => (
                            <Avatar.Root key={name} title={name}>
                                {image && <Avatar.Image src={image} alt={name} />}
                                <Avatar.Fallback>{initials}</Avatar.Fallback>
                            </Avatar.Root>
                        ))}
                    </Avatar.Group>
                </DemoRow>
            ))}
        </DemoRows>
    )
}
