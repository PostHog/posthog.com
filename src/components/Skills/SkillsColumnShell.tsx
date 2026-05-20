import React from 'react'

/** Full-height column wrapper so border dividers stretch the container */
export default function SkillsColumnShell({
    children,
    widthClassName = 'w-56 @md:w-64',
}: {
    children: React.ReactNode
    widthClassName?: string
}) {
    return (
        <div className={`flex flex-col self-stretch min-h-0 flex-shrink-0 border-r border-primary ${widthClassName}`}>
            {children}
        </div>
    )
}
