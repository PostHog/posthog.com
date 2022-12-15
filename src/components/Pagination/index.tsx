import Link from 'components/Link'
import React from 'react'

function paginate({ current, max, base }: { current: number; max: number; base: string }) {
    if (!current || !max || !base) return null

    const prev = current === 1 ? null : current - 1,
        next = current === max ? null : current + 1,
        items: [{ label: string; url?: string }] = [{ label: '1', url: base }]

    if (current === 1 && max === 1) return { current, prev, next, items }
    if (current > 4) items.push({ label: '…' })

    const r = 2,
        r1 = current - r,
        r2 = current + r

    for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) items.push({ label: String(i), url: `${base}/${i}` })

    if (r2 + 1 < max) items.push({ label: '…' })
    if (r2 < max) items.push({ label: String(max), url: `${base}/${max}` })

    return { current, prev, next, items }
}

export default function Pagination({
    currentPage,
    numPages,
    base,
}: {
    currentPage: number
    numPages: number
    base: string
}): JSX.Element {
    const pagination = paginate({ current: currentPage, max: numPages, base })

    return (
        <nav className="flex items-center justify-center space-x-2">
            {pagination?.items.map(({ label, url }) => {
                return url ? (
                    <Link
                        className="w-[25px] h-[25px] bg-white dark:bg-gray-accent-dark rounded-sm p-1 flex items-center justify-center relative active:top-[0.5px] active:scale-[.98] shadow-sm"
                        to={url}
                    >
                        <span>{label}</span>
                    </Link>
                ) : (
                    <span>{label}</span>
                )
            })}
        </nav>
    )
}
