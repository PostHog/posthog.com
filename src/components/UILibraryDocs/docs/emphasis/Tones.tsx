import React from 'react'
import { Emphasis } from 'components/UI/Emphasis'
import type { EmphasisColor } from 'components/UI/Emphasis'
const colors: EmphasisColor[] = ['red', 'blue', 'green', 'yellow', 'purple', 'gray']
export default function Tones(): JSX.Element {
    return (
        <div className="space-y-5">
            {colors.map((color) => (
                <p key={color} className="!m-0 max-w-[20ch] text-2xl font-semibold leading-relaxed">
                    Build with <Emphasis color={color}>analytics, replays, and product context</Emphasis>{' '}
                    <span className="text-sm font-normal text-secondary">({color})</span>
                </p>
            ))}
        </div>
    )
}
