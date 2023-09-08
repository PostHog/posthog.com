import React from 'react'

export default function SidebarSection({
    title,
    action,
    children,
    className = '',
}: {
    title?: string
    action?: React.ReactNode
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={`bg-accent dark:bg-accent-dark mb-4 rounded py-4 px-3 lg:px-6 ${className}`}>
            {(title || action) && (
                <div className="flex items-center justify-between mb-2">
                    {title && (
                        <h3 className="text-black dark:text-white font-semibold opacity-25 m-0 text-sm">{title}</h3>
                    )}
                    {action && <div className="flex items-center">{action}</div>}
                </div>
            )}
            {children}
        </div>
    )
}
