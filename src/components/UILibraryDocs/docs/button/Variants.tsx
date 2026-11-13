import React from 'react'
import { Button } from 'components/UI/Button'
import type { ButtonAppearance, ButtonVariant } from 'components/UI/Button'
import { DemoLabel } from 'components/UILibraryDocs/DemoLayout'

const appearances: { appearance: ButtonAppearance; label: string }[] = [
    { appearance: 'raised', label: 'raised · default' },
    { appearance: 'flat', label: 'flat · toolbars, lists' },
    { appearance: 'outline', label: 'outline · secondary' },
]
const variants: { variant: ButtonVariant; label: string }[] = [
    { variant: 'secondary', label: 'secondary' },
    { variant: 'primary', label: 'primary · main' },
    { variant: 'danger', label: 'danger · final' },
]

export default function ButtonVariants(): JSX.Element {
    return (
        <div className="grid grid-cols-[auto_repeat(3,auto)] items-center justify-start gap-x-4 gap-y-3 overflow-x-auto">
            <span />
            {variants.map(({ variant, label }) => (
                <DemoLabel key={variant}>{label}</DemoLabel>
            ))}
            {appearances.map(({ appearance, label }) => (
                <React.Fragment key={appearance}>
                    <DemoLabel>{label}</DemoLabel>
                    {variants.map(({ variant }) => (
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
