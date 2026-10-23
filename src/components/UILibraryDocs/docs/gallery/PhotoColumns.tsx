import React from 'react'
import { Gallery } from 'components/UI/Gallery'

export default function PhotoColumns(): JSX.Element {
    return (
        <Gallery
            label="Life at PostHog"
            layout="columns"
            items={[
                {
                    imageLight: 'https://res.cloudinary.com/dmukukwp6/image/upload/tor_0_301d80293f.png',
                    alt: 'Toronto builders at a community event',
                    caption: 'The Toronto builder community.',
                },
                {
                    imageLight:
                        'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/EU/images/mug-hog.png',
                    alt: 'PostHog mug illustration',
                    caption: 'A mug hog from the PostHog EU page.',
                },
                {
                    imageLight: 'https://res.cloudinary.com/dmukukwp6/image/upload/ucd_0_da36c8b7ef.jpeg',
                    alt: 'UC Davis students at a PostHog event',
                    caption: 'PostHog on campus at UC Davis.',
                },
                {
                    imageLight: 'https://res.cloudinary.com/dmukukwp6/image/upload/perk_merch_b2106b276a.png',
                    alt: 'PostHog merch from the startup program',
                    caption: 'Merch for the PostHog startup program.',
                },
            ]}
        />
    )
}
