import React from 'react'

interface OverflowXSectionProps {
    children: any
}

export const OverflowXSection = ({ children }: OverflowXSectionProps) => {
    return <div className="w-full overflow-x-auto">{children}</div>
}
