import React from 'react'
import { Toggle } from 'components/UI/Toggle'

const looks = [
    { label: 'flat', appearance: 'flat', variant: 'secondary' },
    { label: 'outline', appearance: 'outline', variant: 'secondary' },
    { label: 'raised primary', appearance: 'raised', variant: 'primary' },
    { label: 'raised secondary', appearance: 'raised', variant: 'secondary' },
    { label: 'raised danger', appearance: 'raised', variant: 'danger' },
] as const

export default function ToggleVariants(): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            {looks.map(({ label, appearance, variant }) => (
                <div key={label} className="flex flex-wrap items-center gap-3">
                    <code className="w-36 text-sm">{label}</code>
                    <Toggle appearance={appearance} variant={variant} aria-label="Bold">
                        <span className="w-3 text-center font-bold">B</span>
                    </Toggle>
                    <Toggle appearance={appearance} variant={variant} aria-label="Italic" defaultPressed>
                        <span className="w-3 text-center italic">I</span>
                    </Toggle>
                    <Toggle appearance={appearance} variant={variant} aria-label="Unavailable bold" disabled>
                        <span className="w-3 text-center font-bold">B</span>
                    </Toggle>
                    <Toggle
                        appearance={appearance}
                        variant={variant}
                        aria-label="Unavailable italic"
                        disabled
                        defaultPressed
                    >
                        <span className="w-3 text-center italic">I</span>
                    </Toggle>
                </div>
            ))}
        </div>
    )
}
