import React, { useState } from 'react'
import { Field } from 'components/UI/Field'

const takenProjectNames = ['hogflix', 'hedgebox']

export default function InvalidField(): JSX.Element {
    const [projectName, setProjectName] = useState('Hogflix')
    const nameIsTaken = takenProjectNames.includes(projectName.trim().toLowerCase())

    return (
        <Field.Root invalid={nameIsTaken} className="max-w-xs">
            <Field.Label>Project name</Field.Label>
            <Field.Control value={projectName} onValueChange={setProjectName} />
            <Field.Error match={nameIsTaken}>A project with this name already exists.</Field.Error>
        </Field.Root>
    )
}
