import React from 'react'
import { MiddleTruncate } from 'components/UI/MiddleTruncate'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const path = 'posthog.com/docs/advanced-configuration/feature-flags'

const widths = [
    { label: '480px', className: 'max-w-[480px]' },
    { label: '240px', className: 'max-w-[240px]' },
    { label: '140px', className: 'max-w-[140px]' },
]

export default function Widths(): JSX.Element {
    return (
        <DemoRows>
            {widths.map(({ label, className }) => (
                <DemoRow key={label} label={label}>
                    <div
                        className={`w-full rounded border border-dashed border-[rgb(var(--text-primary)/0.25)] px-2 py-1 ${className}`}
                    >
                        <MiddleTruncate className="font-code text-sm" endChars={14}>
                            {path}
                        </MiddleTruncate>
                    </div>
                </DemoRow>
            ))}
            <DemoRow label="Fits">
                <MiddleTruncate className="font-code text-sm">feature-flags</MiddleTruncate>
            </DemoRow>
        </DemoRows>
    )
}
