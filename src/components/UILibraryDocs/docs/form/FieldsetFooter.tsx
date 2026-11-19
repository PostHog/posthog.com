import React from 'react'
import { Fieldset } from 'components/UI/Fieldset'
import { Field } from 'components/UI/Field'
import { Button } from 'components/UI/Button'

export default function FieldsetFooter(): JSX.Element {
    const [saved, setSaved] = React.useState(false)
    return (
        <Fieldset.Root className="max-w-xl">
            <Fieldset.Legend>Project settings</Fieldset.Legend>
            <Field.Root name="projectName">
                <Field.Label>Project name</Field.Label>
                <Field.Control defaultValue="Website analytics" onChange={() => setSaved(false)} />
            </Field.Root>
            <Fieldset.Footer>
                <span role="status">{saved ? 'Settings saved.' : 'Your team sees this name in PostHog.'}</span>
                <Button size="sm" appearance="raised" onClick={() => setSaved(true)}>
                    Save settings
                </Button>
            </Fieldset.Footer>
        </Fieldset.Root>
    )
}
