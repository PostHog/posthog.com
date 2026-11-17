import React from 'react'
import { Avatar } from 'components/UI/Avatar'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const hogImage = (file: string): string => `https://res.cloudinary.com/dmukukwp6/image/upload/c_fill,w_96,h_96/${file}`

const authors = [
    { name: 'Night hog', initials: 'NH', image: hogImage('night_hog_219fff00f3.png') },
    { name: 'Steve hog', initials: 'SH', image: hogImage('steve_hogs_17c7900b07.png') },
    { name: 'Jane Jones', initials: 'JJ' },
    { name: 'Max Hedgehog', initials: 'MH' },
]

export default function Reverse(): JSX.Element {
    return (
        <DemoRows>
            {[false, true].map((reverse) => (
                <DemoRow key={String(reverse)} label={reverse ? 'reverse' : 'default'}>
                    <Avatar.Group reverse={reverse} size="lg" max={3} aria-label="Article authors">
                        {authors.map(({ name, initials, image }) => (
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
