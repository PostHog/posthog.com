import React from 'react'

export const Section = ({
    className = '',
    width = '4xl',
    children = null,
}: {
    className?: string
    width?: string
    children?: any
}) => {
    const baseClasses = `w-11/12 max-w-${width} mx-auto`
    return <div className={`${baseClasses} ${className}`}>{children}</div>
}
