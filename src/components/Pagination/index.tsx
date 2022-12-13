import Link from 'components/Link'
import React from 'react'

export default function Pagination({
    currentPage,
    numPages,
    base,
}: {
    currentPage: number
    numPages: number
    base: string
}): JSX.Element {
    const prev = currentPage - 1
    const next = currentPage + 1
    const hasPrev = prev > 0
    const hasNext = next <= numPages
    const prevLink = prev <= 1 ? base : `${base}/${currentPage - 1}`
    const nextLink = `${base}/${currentPage + 1}`
    return (
        <nav className="w-full flex items-center justify-between">
            <span>{hasPrev && <Link to={prevLink}>Previous</Link>}</span>
            <span>{hasNext && <Link to={nextLink}>Next</Link>}</span>
        </nav>
    )
}
