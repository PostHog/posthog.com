import React from 'react'
import { TABLE_CLASSES } from '../../constants'

interface OverflowXSectionProps {
    children: any
}

export const OverflowXSection = ({ children }: OverflowXSectionProps) => {
    return <div className={TABLE_CLASSES}>{children}</div>
}
