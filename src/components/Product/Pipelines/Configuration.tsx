import Markdown from 'components/Squeak/components/Markdown'
import React from 'react'

export default function Configuration({ inputs_schema }: { inputs_schema: any[] }): JSX.Element {
    return (
        <table>
            <thead>
                <tr>
                    <th>Option</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {inputs_schema.map((input) => {
                    if (!input.label) {
                        return null
                    }

                    return (
                        <tr key={input.key}>
                            <td>
                                <div className="mb-6 w-40">
                                    <code className=" dark:text-white bg-accent-light text-inherit p-1 rounded !whitespace-normal">
                                        {input.label}
                                    </code>
                                </div>

                                {input.type && (
                                    <div>
                                        <strong>Type: </strong>
                                        <span>{input.type}</span>
                                    </div>
                                )}

                                <div>
                                    <strong>Required: </strong>
                                    <span>{input.required ? 'True' : 'False'}</span>
                                </div>
                            </td>

                            <td>{input.description ? <Markdown>{input.description || ''}</Markdown> : null}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
