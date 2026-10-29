import React from 'react'
import { Chip } from 'components/UI/Chip'

const hogImage = (file: string): string => `https://res.cloudinary.com/dmukukwp6/image/upload/c_fill,w_48,h_48/${file}`

export default function ChipInline(): JSX.Element {
    return (
        <div className="flex max-w-lg flex-col gap-4 text-primary">
            <p className="m-0 text-[15px] leading-relaxed">
                Thanks{' '}
                <Chip size="inline" href="/community/profiles/30200" image={hogImage('night_hog_219fff00f3.png')}>
                    Night hog
                </Chip>
                , that fixed it. I also asked{' '}
                <Chip size="inline" href="/community/profiles/30201" image={hogImage('steve_hogs_17c7900b07.png')}>
                    Steve hog
                </Chip>{' '}
                (who wrote the docs) to take a look.
            </p>
            <p className="m-0 text-xs leading-normal text-secondary">
                Small text: reply to{' '}
                <Chip size="inline" href="/community/profiles/30200" image={hogImage('night_hog_219fff00f3.png')}>
                    Night hog
                </Chip>
                .
            </p>
        </div>
    )
}
