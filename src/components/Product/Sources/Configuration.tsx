import Markdown from 'components/Squeak/components/Markdown'
import React from 'react'

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

    const hasCaption = sourceFields.some((field) => field.caption)

    if (hasCaption) {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Option</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {sourceFields.map((field) => (
                        <tr key={field.name}>
                            <td>
                                <div className="mb-6 w-40">
                                    <code className=" dark:text-white bg-accent text-inherit p-1 rounded !whitespace-normal">
                                        {field.label || field.name}
                                    </code>
                                </div>

                                {field.type && (
                                    <div>
                                        <strong>Type: </strong>
                                        <span>{field.type}</span>
                                    </div>
                                )}

                                <div>
                                    <strong>Required: </strong>
                                    <span>{field.required ? 'True' : 'False'}</span>
                                </div>
                            </td>
                            <td>{field.caption ? <Markdown>{field.caption}</Markdown> : null}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Option</th>
                    <th>Type</th>
                    <th>Required</th>
                </tr>
            </thead>
            <tbody>
                {sourceFields.map((field) => (
                    <tr key={field.name}>
                        <td>
                            <code className=" dark:text-white bg-accent text-inherit p-1 rounded !whitespace-normal">
                                {field.label || field.name}
                            </code>
                        </td>
                        <td>{field.type || '—'}</td>
                        <td>{field.required ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
