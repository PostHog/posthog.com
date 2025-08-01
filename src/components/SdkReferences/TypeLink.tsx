import Link from '../Link'
import React from 'react'

const TypeLink = ({
    type,
    validTypes,
    slugPrefix,
}: {
    type: string | { name: string }
    validTypes: string[]
    slugPrefix: string
}): JSX.Element => {
    const typeString = typeof type === 'string' ? type : type.name

    // Simple function to extract and replace type identifiers
    const renderTypeWithLinks = (input: string): React.ReactNode => {
        // Split by common separators and brackets, but keep them in the result
        // I'm sorry for my love of regex
        const parts = input.split(/([\]<>(),|&]|\[|\s+)/)

        return parts.map((part, index) => {
            const trimmed = part.trim()

            // Skip empty parts, separators, brackets, and whitespace
            if (!trimmed || /^[\]<>(),|&\s]+$/.test(trimmed) || trimmed === '[') {
                return part
            }

            // Remove array suffixes to get base type
            const baseType = trimmed.replace(/\[\]$/, '')
            const arraysuffix = trimmed.endsWith('[]') ? '[]' : ''

            console.log(validTypes)
            // Check if this is a valid type to link
            if (validTypes.includes(baseType)) {
                return (
                    <React.Fragment key={index}>
                        <Link
                            to={`/docs/references/${slugPrefix}/types/${baseType}`}
                            className="text-red hover:text-red-dark"
                        >
                            {baseType}
                        </Link>
                        {arraysuffix}
                    </React.Fragment>
                )
            }

            // Return as unlinked text
            return (
                <span key={index} className="text-gray-600 dark:text-gray-400">
                    {part}
                </span>
            )
        })
    }

    return <code className="font-semibold group">{renderTypeWithLinks(typeString)}</code>
}

export default TypeLink
