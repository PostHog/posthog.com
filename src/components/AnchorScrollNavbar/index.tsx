import React from 'react'

interface AnchorScrollNavbarProps {
    className?: string
}

export const AnchorScrollNavbar = ({ className = '' }: AnchorScrollNavbarProps) => {
    const baseClasses = 'rounded w-full max-w-3xl mx-auto flex justify-between items-stetch p-3 sticky top-3 z-10'
    const classList = [baseClasses, className].join(' ')

    return (
        <div className={classList} style={{ backgroundColor: '#202038' }}>
            <button className="bg-primary text-white px-3 py-2 rounded">Why we're here</button>
            <button className="text-white text-opacity-80 px-3 py-2 rounded hover:bg-gray-100 hover:bg-opacity-10">
                Our culture
            </button>
            <button className="text-white text-opacity-80 px-3 py-2 rounded hover:bg-gray-100 hover:bg-opacity-10">
                Interview process
            </button>
            <button className="text-white text-opacity-80 px-3 py-2 rounded hover:bg-gray-100 hover:bg-opacity-10">
                Benefits
            </button>
            <button className="text-white text-opacity-80 px-3 py-2 rounded hover:bg-gray-100 hover:bg-opacity-10">
                Working at PostHog
            </button>
            <button className="text-white text-opacity-80 px-3 py-2 rounded hover:bg-gray-100 hover:bg-opacity-10">
                Open roles
            </button>
        </div>
    )
}
