import React from 'react'
import { Field } from 'components/UI/Field'
import { Fieldset } from 'components/UI/Fieldset'

const addressFields = [
    { name: 'street', label: 'Street', placeholder: '2261 Market Street' },
    { name: 'city', label: 'City', placeholder: 'San Francisco' },
    { name: 'postalCode', label: 'Postal code', placeholder: '94114' },
    { name: 'country', label: 'Country', placeholder: 'United States' },
]

export default function FieldsetGroup(): JSX.Element {
    return (
        <Fieldset.Root className="max-w-xl">
            <Fieldset.Legend>Billing address</Fieldset.Legend>
            <div className="grid gap-3 @md:grid-cols-2">
                {addressFields.map(({ name, label, placeholder }) => (
                    <Field.Root key={name} name={name}>
                        <Field.Label>{label}</Field.Label>
                        <Field.Control placeholder={placeholder} />
                    </Field.Root>
                ))}
            </div>
        </Fieldset.Root>
    )
}
