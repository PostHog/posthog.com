import React from 'react'
import PipelineConfiguration from '../Pipelines/Configuration'

interface SourceField {
    name?: string | null
    label?: string | null
    type?: string | null
    required?: boolean | null
    caption?: string | null
    placeholder?: string | null
}

export default function SourceConfiguration({
    sourceFields,
}: {
    sourceFields: SourceField[] | null | undefined
}): JSX.Element | null {
    if (!sourceFields?.length) return null

    const inputs_schema = sourceFields.map((field) => ({
        key: field.name,
        label: field.label,
        type: field.type,
        required: field.required,
        description: field.caption,
    }))

    return <PipelineConfiguration inputs_schema={inputs_schema} />
}
