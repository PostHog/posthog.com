import React from 'react'

export const Caption = ({ children }) => {
    return (
        <div className="caption text-center">
            <caption className="inline text-sm">
                <span className="px-2 py-2 rounded-sm bg-accent dark:bg-accent-dark text-primary/75 dark:text-primary-dark/75">
                    {children}
                </span>
            </caption>
        </div>
    )
}
