import React from 'react'
import TypeLink from './TypeLink'

const FunctionReturn = ({
    returnType,
    validTypes,
    slugPrefix,
}: {
    returnType: { id: string; name: string }
    validTypes: string[]
    slugPrefix: string
}): JSX.Element | null => {
    if (!returnType) return null

    const typeString = returnType.name
    const isUnionOrIntersection = typeString.includes('|') || typeString.includes('&')
    let types: string[] = [typeString]
    let label: string | null = null

    if (isUnionOrIntersection) {
        const separator = typeString.includes('|') ? '|' : '&'
        types = typeString.split(separator).map((t) => t.trim())
        label = separator === '|' ? 'Union of' : 'Intersection of'
    }

    return (
        <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Returns</h4>
            <div className="min-w-full overflow-x-auto -mx-5 px-5 lg:-mx-6 lg:px-6 xl:-mx-12 xl:px-12">
                <table className="w-full table-auto">
                    <thead className="bg-gray-accent-light dark:bg-gray-accent-dark">
                        <tr>
                            {isUnionOrIntersection && (
                                <th className="text-left text-[14px] leading-5 opacity-75 font-[800] py-2 px-2 text-gray-900 dark:text-gray-100 whitespace-nowrap"></th>
                            )}
                            <th className="text-left text-[14px] leading-5 opacity-75 font-[800] py-2 px-2 text-gray-900 dark:text-gray-100 whitespace-nowrap">
                                Type
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {types.map((t, i) => (
                            <tr
                                key={t + i}
                                className={
                                    i > 0 ? 'border-t border-gray-accent-light dark:border-gray-accent-dark' : ''
                                }
                            >
                                {i === 0 && isUnionOrIntersection && (
                                    <td
                                        className="text-gray-600 dark:text-gray-300 text-[15px] py-2 px-2 align-middle whitespace-nowrap font-semibold"
                                        rowSpan={types.length}
                                    >
                                        {label}
                                    </td>
                                )}
                                <td className="text-gray-600 dark:text-gray-300 text-[15px] py-2 px-2 align-top whitespace-normal">
                                    <TypeLink type={t} slugPrefix={slugPrefix} validTypes={validTypes} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FunctionReturn
