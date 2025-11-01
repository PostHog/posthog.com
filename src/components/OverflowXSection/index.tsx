import React from 'react'
import { TABLE_CLASSES } from '../../constants'

interface OverflowXSectionProps {
    children: any
}

export const OverflowXSection = ({ children }: OverflowXSectionProps) => {
    return (
        <div className="Table overflow-x-auto -mx-4 @md/reader-content-container:-mx-6 @lg/reader-content-container:-mx-8 flex items-start @2xl/reader-content-container:justify-center max-w-full">
            <div className={TABLE_CLASSES}>{children}</div>
        </div>
    )
}
