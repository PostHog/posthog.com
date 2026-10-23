import React from 'react'
import { Emphasis } from 'components/UI/Emphasis'
import type { Tone } from 'components/UI/styles'
const tones: Tone[] = ['neutral', 'info', 'success', 'warning', 'error', 'brand']
export default function Tones(): JSX.Element {
    return (
        <div className="space-y-5">
            {tones.map((tone) => (
                <p key={tone} className="!m-0 max-w-[20ch] text-2xl font-semibold leading-relaxed">
                    Build with <Emphasis tone={tone}>analytics, replays, and product context</Emphasis>{' '}
                    <span className="text-sm font-normal text-secondary">({tone})</span>
                </p>
            ))}
        </div>
    )
}
