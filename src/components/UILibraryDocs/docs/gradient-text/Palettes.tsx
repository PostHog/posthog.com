import React from 'react'
import { GradientText } from 'components/UI/GradientText'
import type { GradientPalette } from 'components/UI/GradientText'

const palettes: { palette: GradientPalette; phrase: string }[] = [
    { palette: 'sunset', phrase: 'product context' },
    { palette: 'citrus', phrase: 'every feature flag' },
    { palette: 'fresh', phrase: 'working together' },
    { palette: 'ocean', phrase: 'every user journey' },
    { palette: 'dusk', phrase: 'your next idea' },
]

export default function Palettes(): JSX.Element {
    return (
        <div className="flex flex-col divide-y divide-[rgb(var(--text-primary)/0.1)]">
            {palettes.map(({ palette, phrase }) => (
                <div
                    key={palette}
                    className="grid gap-1 py-3 first:pt-0 last:pb-0 @md:grid-cols-[6rem_1fr] @md:items-center @md:gap-4"
                >
                    <span className="font-code text-caption text-secondary">{palette}</span>
                    <span className="text-heading-lg">
                        <GradientText palette={palette} animate={false}>
                            {phrase}
                        </GradientText>
                    </span>
                </div>
            ))}
        </div>
    )
}
