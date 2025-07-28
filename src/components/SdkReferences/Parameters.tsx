import React from 'react'
import ReactMarkdown from 'react-markdown'
import TypeLink from './TypeLink'

export interface Parameter {
    name: string
    type: string
    description: string
    isOptional?: boolean
}

const Parameters = ({
    params,
    title = 'Parameters',
    validTypes,
    slugPrefix,
}: {
    params: Parameter[]
    title?: string
    validTypes: string[]
    slugPrefix: string
}): JSX.Element | null => {
    if (!params || params.length === 0) return null

    return (
        <div>
            <h4 className="text-lg font-semibold mb-2">{title}</h4>
            <div className="min-w-0">
                <table className="w-full" style={{ tableLayout: 'fixed' }}>
                    <thead className="bg-gray-accent-light dark:bg-gray-accent-dark">
                        <tr>
                            <th
                                className="text-left text-sm leading-5 opacity-75 font-[800] py-2 px-2 text-gray-900 dark:text-gray-100"
                                style={{ width: '50%' }}
                            >
                                Name
                            </th>
                            <th
                                className="text-left text-sm leading-5 opacity-75 font-[800] py-2 px-2 text-gray-900 dark:text-gray-100"
                                style={{ width: '50%' }}
                            >
                                Type
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {params.map((param, index) => (
                            <React.Fragment key={param.name}>
                                <tr
                                    className={
                                        index > 0
                                            ? 'border-t border-gray-accent-light dark:border-gray-accent-dark'
                                            : ''
                                    }
                                >
                                    <td className="text-gray-600 dark:text-gray-300 text-[15px] py-2 px-2 align-top">
                                        <code className="break-words text-red hover:text-red font-semibold group">
                                            {param.name}
                                            {param.isOptional && '?'}
                                        </code>
                                    </td>
                                    <td className="text-gray-600 dark:text-gray-300 text-[15px] py-2 px-2 align-top">
                                        <div className="break-words">
                                            <TypeLink
                                                slugPrefix={slugPrefix}
                                                type={param.type}
                                                validTypes={validTypes}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                {param.description && (
                                    <tr>
                                        <td
                                            colSpan={2}
                                            className="text-gray-600 dark:text-gray-300 text-[15px] py-2 px-2 align-top border-t-0"
                                        >
                                            <ReactMarkdown>{param.description}</ReactMarkdown>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Parameters
