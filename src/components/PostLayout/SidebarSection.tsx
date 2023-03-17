import React from 'react'

export default function SidebarSection({
    title,
    children,
    className = '',
}: {
    title?: string
    children: React.ReactNode
    className?: string
}) {
    return (
        <div
            className={`py-4 px-3 lg:px-6 border-b border-gray-accent-light dark:border-gray-accent-dark border-dashed ${className}`}
        >
            {title && <h3 className="text-black dark:text-white font-semibold opacity-25 m-0 mb-2 text-sm">{title}</h3>}
            {children}
        </div>
    )
}
