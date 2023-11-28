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
    titleClassName = 'text-5xl mb-2',
    leadTextClassName = '',
}: SectionHeaderProps) => {
    const Header = titleTag as keyof JSX.IntrinsicElements
    const leadTextClassList = mergeClassList('opacity-60 font-medium max-w-2xl mx-auto', leadTextClassName)

    return (
        <>
            <Header className={titleClassName}>{title}</Header>
            {leadText ? <h4 className={leadTextClassList}>{leadText}</h4> : null}
        </>
    )
}
