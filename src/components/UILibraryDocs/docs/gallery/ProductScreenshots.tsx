import React from 'react'
import { Gallery } from 'components/UI/Gallery'

export default function ProductScreenshots(): JSX.Element {
    return (
        <Gallery
            label="Explore PostHog products"
            columns={2}
            items={[
                {
                    imageLight:
                        'https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_02_17_at_08_43_32_2x_aa22220b10.png',
                    imageDark:
                        'https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_02_17_at_08_43_06_2x_49e3ebc85d.png',
                    alt: 'PostHog experiment results',
                    caption: 'Experiments: compare variants and inspect results.',
                },
                {
                    imageLight:
                        'https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_09_09_at_17_05_35_2x_42e293fddd.png',
                    imageDark:
                        'https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_09_09_at_17_05_50_2x_8d74438a4a.png',
                    alt: 'PostHog business intelligence',
                    caption: 'Business intelligence: query your data in PostHog.',
                },
            ]}
        />
    )
}
