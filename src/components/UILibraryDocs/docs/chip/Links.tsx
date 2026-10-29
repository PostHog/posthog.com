import React from 'react'
import { IconBook, IconGithub } from '@posthog/icons'
import { Chip } from 'components/UI/Chip'

const hogImage = (file: string): string => `https://res.cloudinary.com/dmukukwp6/image/upload/c_fill,w_48,h_48/${file}`

export default function ChipLinks(): JSX.Element {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Chip href="/community/profiles/30200" image={hogImage('night_hog_219fff00f3.png')}>
                Night hog
            </Chip>
            <Chip href="/docs" icon={<IconBook />}>
                Docs
            </Chip>
            <Chip href="https://github.com/PostHog/posthog" icon={<IconGithub />}>
                GitHub
            </Chip>
        </div>
    )
}
