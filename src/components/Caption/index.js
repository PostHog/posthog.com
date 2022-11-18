import React from 'react'

export const Caption = ({ children }) => {
    return (
        <div className="text-center">
            <caption className="inline-block px-2 py-1 rounded-sm text-sm bg-gray-accent-light text-black/75 dark:bg-gray-accent-dark dark:text-white/75">
                {children}
            </caption>
        </div>
    )
}
