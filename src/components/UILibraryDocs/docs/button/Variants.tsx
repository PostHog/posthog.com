import React from 'react'
import { Button } from 'components/UI/Button'
import type { ButtonAppearance, ButtonVariant } from 'components/UI/Button'
import { DemoLabel } from 'components/UILibraryDocs/DemoLayout'

const appearances: ButtonAppearance[] = ['raised', 'flat', 'outline']
const variants: ButtonVariant[] = ['secondary', 'primary', 'danger']

export default function ButtonVariants(): JSX.Element {
    return (
        <div className="grid grid-cols-[auto_repeat(3,auto)] items-center justify-start gap-x-4 gap-y-3 overflow-x-auto">
            <span />
            {variants.map((variant) => (
                <DemoLabel key={variant}>{variant}</DemoLabel>
            ))}
            {appearances.map((appearance) => (
                <React.Fragment key={appearance}>
                    <DemoLabel>{appearance}</DemoLabel>
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
    )
}
