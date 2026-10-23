import React from 'react'
import { Highlight } from 'components/UI/Highlight'
import type { Tone } from 'components/UI/styles'
const tones: (Tone | 'yellow')[] = ['neutral', 'info', 'success', 'warning', 'error', 'brand', 'yellow']
export default function Tones(): JSX.Element {
    return (
        <div className="space-y-4 text-xl">
            {tones.map((tone) => (
                <p key={tone} className="!m-0">
                    <Highlight tone={tone}>Build with product context</Highlight>{' '}
                    <span className="text-sm text-secondary">({tone})</span>
                </p>
            ))}
        </div>
    )
}
