import React from 'react'

export const BorderWrapper = ({ children }) => {
    return <div className="border-t border-b border-dashed border-gray-accent-light py-6 my-9">{children}</div>
}
