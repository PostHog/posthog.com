import React from 'react'
import SectionLink, { SectionLinkProps } from './SectionLink'

export type SectionLinksProps = {
    next?: SectionLinkProps['link']
    previous?: SectionLinkProps['link']
    className?: string
}

export default function NextArticle({ next, previous, className = '' }: SectionLinksProps) {
    return (
        <div className={`flex justify-between items-center gap-x-4 ${className}`}>
            <SectionLink link={previous} previous />
            <SectionLink link={next} />
        </div>
    )
}
