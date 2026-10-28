import React from 'react'
import { IconFlag, IconGear, IconRewindPlay } from '@posthog/icons'
import { Chip } from 'components/UI/Chip'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const hogImage = (file: string): string => `https://res.cloudinary.com/dmukukwp6/image/upload/c_fill,w_48,h_48/${file}`

export default function ChipContent(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="Text">
                <Chip>Beta</Chip>
                <Chip>Free tier</Chip>
                <Chip>Open source</Chip>
            </DemoRow>
            <DemoRow label="Icon">
                <Chip icon={<IconGear />}>Settings</Chip>
                <Chip icon={<IconFlag />}>Feature flags</Chip>
                <Chip icon={<IconRewindPlay />}>Session replay</Chip>
            </DemoRow>
            <DemoRow label="Image">
                <Chip image={hogImage('night_hog_219fff00f3.png')}>Night hog</Chip>
                <Chip image={hogImage('steve_hogs_17c7900b07.png')}>Steve hog</Chip>
            </DemoRow>
        </DemoRows>
    )
}
