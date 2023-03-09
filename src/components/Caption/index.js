import React from 'react'

export const Caption = ({ children }) => {
    return (
        <div className="caption text-center">
            <caption className="inline text-sm">
                <span className="px-2 py-2 rounded-sm bg-gray-accent-light text-black/75 dark:bg-gray-accent-dark dark:text-white/75">
                    {children}
                </span>
            </caption>
        </div>
    )
}
