import React from 'react'
import { mergeClassList } from '../../lib/utils'

export const SectionFullWidth = ({
    className = '',
    width = '4xl',
    children = null,
}: {
    className?: string
    width?: string
    children?: React.ReactNode
}) => {
    const baseClasses = `max-w-${width} mx-auto`
    const classList = mergeClassList(baseClasses, className)

    return <div className={classList}>{children}</div>
}
