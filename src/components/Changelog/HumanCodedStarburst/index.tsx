import React from 'react'
import { colors } from '@posthog/brand/colors'
import { Bang } from 'components/Icons'

export default function HumanCodedStarburst({ compact = false }: { compact?: boolean }): JSX.Element {
    return (
        <span
            className={`human-coded-starburst relative inline-block shrink-0 ${
                compact ? 'w-[86px] h-[63px]' : 'w-[108px] h-[80px]'
            }`}
            role="img"
            aria-label="A human coded this"
        >
            <Bang className="human-coded-starburst-bang animate-grow size-full" color={colors.yellow.core} />
            <span
                className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center rotate-6 translate-y-0.5 text-center font-bold uppercase leading-none ${
                    compact ? 'text-[11px]' : 'text-[14px]'
                }`}
                style={{ color: 'black' }}
                aria-hidden="true"
            >
                <span>A human</span>
                <span>coded</span>
                <span>this</span>
            </span>
        </span>
    )
}
