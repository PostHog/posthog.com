import React from 'react'
import { Field } from 'components/UI/Field'
import { Card } from 'components/UI/Card'

export default function Appearances(): JSX.Element {
    return (
        <div className="grid gap-6 @2xl:grid-cols-2">
            <div className="flex flex-col gap-2">
                <span className="text-sm font-bold">Inset (default)</span>
                <Field.Root>
                    <Field.Label>Project name</Field.Label>
                    <Field.Control placeholder="Hogflix" />
                </Field.Root>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-bold">Soft</span>
                <Card.Root padding="sm">
                    <Field.Root>
                        <Field.Label>Display name</Field.Label>
                        <Field.Control appearance="soft" placeholder="Max the hedgehog" />
                    </Field.Root>
                </Card.Root>
            </div>
        </div>
    )
}
