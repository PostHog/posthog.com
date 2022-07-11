import React from 'react'
import SectionLink, { SectionLinkProps } from './SectionLink'

export type SectionLinksProps = {
    next: SectionLinkProps
    previous?: SectionLinkProps
    className?: string
}

export default function NextArticle({ next, previous, className = '' }: SectionLinksProps) {
    return (
        <div className={`flex justify-between items-center gap-x-4 ${className}`}>
            <SectionLink link={previous?.link} previous />
            <SectionLink link={next.link} />
        </div>
    )
}
