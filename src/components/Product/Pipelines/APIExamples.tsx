import React from 'react'
import { Accordion } from 'components/Products/Accordion'
import { CodeBlock } from 'components/CodeBlock'

const generateConfigInputs = (schema: any[]) => {
    if (!schema) return '{}'

    const inputs = schema.reduce((acc, input) => {
        if (input.required || input.default) {
            acc[input.key] = {
                value: input.default || '',
            }
        }
        return acc
    }, {})

    return JSON.stringify(inputs, null, 4)
        .split('\n')
        .map((line, index) => (index === 0 ? line : '    ' + line))
        .join('\n')
}

type APIExamplesProps = {
    name: string
    inputs_schema: any[]
    id: string
    type: string
    initialOpen?: boolean
}

export default function APIExamples({
    name,
    inputs_schema,
    id,
    type,
    initialOpen = false,
}: APIExamplesProps): JSX.Element {
    const languages = [
        {
            label: 'cURL',
            language: 'bash',
            code: `# Create a new destination
curl --location '<ph_client_api_host>/api/environments/:project_id/hog_functions' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: <ph_project_api_key>' \\
--data '{
    "type": "${type}",
    "name": "${name}",
    "inputs": ${generateConfigInputs(inputs_schema)},
    "enabled": true,
    "template_id": "${id}"
}'`,
        },
    ]

    return (
        <Accordion initialOpen={initialOpen} label="How to create this via the API">
            <p>Using our REST API you can create this {type} like so:</p>
            <CodeBlock currentLanguage={languages[0]}>{languages}</CodeBlock>
        </Accordion>
    )
}
