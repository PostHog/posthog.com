import React from 'react'
import { NumberField } from 'components/UI/NumberField'
import { Button } from 'components/UI/Button'

export default function Sizes(): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <div key={size} className="flex flex-wrap items-start gap-2">
                    <NumberField.Root defaultValue={10}>
                        <NumberField.Group size={size}>
                            <NumberField.Input aria-label={`${size} number`} />
                            <NumberField.Steppers />
                        </NumberField.Group>
                    </NumberField.Root>
                    <Button size={size} appearance="raised">
                        {size}
                    </Button>
                </div>
            ))}
        </div>
    )
}
