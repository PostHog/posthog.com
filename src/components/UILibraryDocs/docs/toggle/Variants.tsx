import React from 'react'
import { Toggle } from 'components/UI/Toggle'

export default function ToggleVariants(): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            {(['default', 'primary', 'secondary', 'danger'] as const).map((variant) => (
                <div key={variant} className="flex flex-wrap items-center gap-3">
                    <code className="w-24 text-sm">{variant}</code>
                    <Toggle variant={variant} aria-label="Bold">
                        <span className="w-3 text-center font-bold">B</span>
                    </Toggle>
                    <Toggle variant={variant} aria-label="Italic" defaultPressed>
                        <span className="w-3 text-center italic">I</span>
                    </Toggle>
                    <Toggle variant={variant} aria-label="Unavailable bold" disabled>
                        <span className="w-3 text-center font-bold">B</span>
                    </Toggle>
                    <Toggle variant={variant} aria-label="Unavailable italic" disabled defaultPressed>
                        <span className="w-3 text-center italic">I</span>
                    </Toggle>
                </div>
            ))}
        </div>
    )
}
