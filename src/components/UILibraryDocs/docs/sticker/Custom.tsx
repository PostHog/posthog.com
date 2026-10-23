import React from 'react'
import { IconSparkles } from '@posthog/icons'
import { Sticker } from 'components/UI/Sticker'

export default function Custom(): JSX.Element {
    return (
        <div className="flex flex-wrap items-baseline gap-6 text-3xl">
            <span>
                <Sticker tilt={-10}>🦔</Sticker> Your product copilot
            </span>
            <span>
                <Sticker tilt={6} className="text-orange">
                    <IconSparkles />
                </Sticker>{' '}
                A little magic
            </span>
            <Sticker label="Celebration" size="lg">
                🎉
            </Sticker>
        </div>
    )
}
