import React from 'react'
import { Chip } from 'components/UI/Chip'

const hogImage = (file: string): string => `https://res.cloudinary.com/dmukukwp6/image/upload/c_fill,w_48,h_48/${file}`

export default function ChipWithImage(): JSX.Element {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Chip image={hogImage('night_hog_219fff00f3.png')}>Night hog</Chip>
            <Chip image={hogImage('steve_hogs_17c7900b07.png')}>Steve hog</Chip>
        </div>
    )
}
