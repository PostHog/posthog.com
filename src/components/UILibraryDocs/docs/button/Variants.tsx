import React from 'react'
import { Button } from 'components/UI/Button'

export default function ButtonVariants(): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            {(['default', 'primary', 'secondary', 'danger'] as const).map((variant) => (
                <div key={variant} className="flex flex-wrap items-center gap-3">
                    <span className="w-20 font-code text-xs text-secondary">{variant}</span>
                    {(['sm', 'md', 'lg'] as const).map((size) => (
                        <Button key={size} variant={variant} size={size}>
                            Size {size}
                        </Button>
                    ))}
                    <Button variant={variant} disabled>
                        Disabled
                    </Button>
                    <Button variant={variant} loading>
                        Save insight
                    </Button>
                </div>
            ))}
        </div>
    )
}
