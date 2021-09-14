import { mergeClassList } from 'lib/utils'
import React from 'react'

interface SectionHeaderProps {
    titleTag: string
    title: string
    leadText?: string
    titleClassName?: string
    leadTextClassName?: string
}

export const SectionHeader = ({
    titleTag,
    title,
    leadText = '',
    titleClassName = '',
    leadTextClassName = '',
}: SectionHeaderProps) => {
    const Header = titleTag as keyof JSX.IntrinsicElements
    const leadTextClassList = mergeClassList('mt-1 text-center max-w-2xl mx-auto', leadTextClassName)

    return (
        <>
            <Header className={titleClassName}>{title}</Header>
            {leadText ? <h5 className={leadTextClassList}>{leadText}</h5> : null}
        </>
    )
}
