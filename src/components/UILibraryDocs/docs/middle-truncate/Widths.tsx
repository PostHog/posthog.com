import React from 'react'
import { MiddleTruncate } from 'components/UI/MiddleTruncate'

const path = 'posthog.com/docs/advanced-configuration/feature-flags'

export default function Widths(): JSX.Element {
    return (
        <div className="flex w-full flex-col items-start gap-4 text-sm">
            <MiddleTruncate className="w-full max-w-lg" endChars={14}>
                {path}
            </MiddleTruncate>
            <MiddleTruncate className="w-full max-w-[240px]" endChars={14}>
                {path}
            </MiddleTruncate>
            <MiddleTruncate className="w-full max-w-[140px]" endChars={14}>
                {path}
            </MiddleTruncate>
            <MiddleTruncate>feature-flags</MiddleTruncate>
        </div>
    )
}
