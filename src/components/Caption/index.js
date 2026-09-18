import React from 'react'

export const Caption = ({ children }) => {
    return (
        <div className="caption mb-4">
            <div className="px-2 py-1.5 rounded-sm bg-accent text-secondary text-sm text-center">{children}</div>
        </div>
    )
}
