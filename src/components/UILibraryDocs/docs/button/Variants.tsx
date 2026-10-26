import React from 'react'
import { Button } from 'components/UI/Button'
import type { ButtonAppearance, ButtonVariant } from 'components/UI/Button'

const appearances: ButtonAppearance[] = ['flat', 'raised', 'outline']
const variants: ButtonVariant[] = ['primary', 'secondary', 'danger']

export default function ButtonVariants(): JSX.Element {
    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-[auto_repeat(3,minmax(0,1fr))] items-center gap-x-4 gap-y-3">
                <span />
                {variants.map((variant) => (
                    <span key={variant} className="font-code text-xs text-secondary">
                        {variant}
                    </span>
                ))}
                {appearances.map((appearance) => (
                    <React.Fragment key={appearance}>
                        <span className="font-code text-xs text-secondary">{appearance}</span>
                        {variants.map((variant) => (
                            <div key={variant} className="flex items-center">
                                <Button appearance={appearance} variant={variant}>
                                    Save insight
                                </Button>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
            <div className="flex flex-col gap-3">
                {appearances.map((appearance) => (
                    <div key={appearance} className="flex items-center">
                        <div className="flex flex-wrap items-center gap-3">
                            {(['sm', 'md', 'lg'] as const).map((size) => (
                                <Button key={size} appearance={appearance} size={size}>
                                    Size {size}
                                </Button>
                            ))}
                            <Button appearance={appearance} disabled>
                                Disabled
                            </Button>
                            <Button appearance={appearance} loading>
                                Save insight
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
