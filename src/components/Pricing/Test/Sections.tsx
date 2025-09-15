import React from 'react'
import cntl from 'cntl'

export const section = cntl`
@5xl:px-4
`

export const SectionLayout = ({ id = '', className = '', children }) => (
    <section id={id} className={`${section} mb-12 mt-8 ${className}`}>
        {children}
    </section>
)

export const SectionHeader = ({ children }) => (
    <header className="not-prose border-b pb-2 mb-4 @3xl:mb-6 border-primary">{children}</header>
)

export const SectionColumns = ({ children }) => <div className="grid md:grid-cols-3 md:py-4">{children}</div>

export const SectionMainCol = ({ children }) => <div className="md:col-span-2 pb-4 md:pb-0 md:pr-8">{children}</div>

export const SectionSidebar = ({ children, className = '' }) => (
    <div
        className={`col-span-1 flex flex-col gap-4 md:border-l border-primary border-t md:border-t-0 pt-4 md:pt-0 md:pl-8 ${className}`}
    >
        {children}
    </div>
)
