import React from 'react'

interface OverflowXSectionProps {
    children: any
}

export const OverflowXSection = ({ children }: OverflowXSectionProps) => {
    return <div className="min-w-full overflow-x-auto -mx-5 px-5 lg:-mx-6 lg:px-6 xl:-mx-12 xl:px-12">{children}</div>
}
