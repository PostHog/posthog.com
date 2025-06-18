import Link from '../Link'
import React from 'react'

const INTRINSIC_TYPES = [
    'string',
    'number',
    'boolean',
    'integer',
    'object',
    'array',
    'null',
    'undefined',
    'any',
    'unknown',
    'void',
]

const isAlphanumeric = (str: string) => /^[a-zA-Z0-9_]+$/.test(str)
const isGeneric = (str: string) => /<.*>/.test(str)

const TypeLink = ({ type }: { type: string | { name: string } }) => {
    const typeString = typeof type === 'string' ? type : type.name

    // Handle array types
    if (typeString.endsWith('[]')) {
        const baseType = typeString.slice(0, -2)
        return (
            <code className="font-semibold group">
                <TypeLink type={baseType} />
                {'[]'}
            </code>
        )
    }

    // Handle union and intersection types
    if (typeString.includes('|') || typeString.includes('&')) {
        const separator = typeString.includes('|') ? '|' : '&'
        return (
            <code className="font-semibold group">
                {typeString.split(separator).map((t, i) => (
                    <React.Fragment key={t}>
                        <TypeLink type={t.trim()} />
                        {i < typeString.split(separator).length - 1 ? ` ${separator} ` : ''}
                    </React.Fragment>
                ))}
            </code>
        )
    }

    // Handle intrinsic types (don't link)
    if (typeString.startsWith('intrinsic_') || INTRINSIC_TYPES.includes(typeString)) {
        const baseType = typeString.startsWith('intrinsic_') ? typeString.replace('intrinsic_', '') : typeString
        return (
            <code className="font-semibold group">
                <span className="text-gray-600 dark:text-gray-400">{baseType}</span>
            </code>
        )
    }

    // Only check for generic or alphanumeric for single types
    if (isGeneric(typeString) || !isAlphanumeric(typeString)) {
        return <code className="font-semibold group">{typeString}</code>
    }

    // Handle referenced types (link) - DO NOT wrap with <code>
    return (
        <Link to={`/docs/references/types/${typeString}`} className="text-red hover:text-red-dark">
            {typeString}
        </Link>
    )
}

export default TypeLink
