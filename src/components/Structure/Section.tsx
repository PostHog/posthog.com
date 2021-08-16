import React from 'react'
import { mergeClassList } from '../../lib/utils'

export const Section = ({
    className = '',
    width = '4xl',
    children = null,
}: {
    className?: string
    width?: string
    children?: React.ReactNode
}): JSX.Element => {
    const baseClasses = `w-11/12 max-w-${width} mx-auto`
    const classList = mergeClassList(baseClasses, className)

    return <div className={classList}>{children}</div>
}
