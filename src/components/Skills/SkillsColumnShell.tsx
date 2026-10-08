import React from 'react'

/** Full-height column wrapper so border dividers stretch the container */
export default function SkillsColumnShell({
    children,
    widthClassName = 'w-56 @md:w-64',
    showBorder = true,
}: {
    children: React.ReactNode
    widthClassName?: string
    showBorder?: boolean
}) {
    return (
        <div
            data-scheme="secondary"
            className={`flex flex-col self-stretch min-h-0 flex-shrink-0 bg-primary ${
                showBorder ? 'border-r border-primary' : ''
            } ${widthClassName}`}
        >
            {children}
        </div>
    )
}
