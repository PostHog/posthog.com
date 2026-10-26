import React from 'react'
import { Field } from 'components/UI/Field'
import { Input } from 'components/UI/Input'
import { Button } from 'components/UI/Button'

export default function Sizes(): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <div key={size} className="flex flex-wrap items-start gap-2">
                    <Field.Root className="min-w-0 flex-1">
                        <Field.Control size={size} aria-label={`${size} field`} placeholder="Field control" />
                    </Field.Root>
                    <Input size={size} aria-label={`${size} input`} placeholder="Input" className="min-w-0 flex-1" />
                    <Button size={size} appearance="raised">
                        {size}
                    </Button>
                </div>
            ))}
        </div>
    )
}
