import React, { useState } from 'react'

export type TocItem = {
    value: string
    url: string
    depth: number
    items?: TocItem[]
}

/**
 * The numbered "Contents" box, with the `[hide]` control MonoBook had.
 *
 * The list server-renders open, so a crawler always reads the section structure. Only the
 * toggle needs JavaScript.
 */
const TocList = ({ items, prefix }: { items: TocItem[]; prefix: string }): JSX.Element => (
    <ol>
        {items.map((item, index) => {
            const number = prefix ? `${prefix}.${index + 1}` : `${index + 1}`
            return (
                <li key={item.url}>
                    <a href={item.url}>
                        <span className="hp-toc-number">{number}</span>
                        <span>{item.value}</span>
                    </a>
                    {item.items && item.items.length > 0 && <TocList items={item.items} prefix={number} />}
                </li>
            )
        })}
    </ol>
)

export default function TableOfContents({ items }: { items?: TocItem[] }): JSX.Element | null {
    const [hidden, setHidden] = useState(false)

    if (!items || items.length === 0) {
        return null
    }

    return (
        <nav className="hp-toc" aria-label="Contents">
            <div className="hp-toc-title">
                Contents
                <span className="hp-toc-toggle">
                    [
                    <a
                        href="#hogpedia-toc"
                        onClick={(event) => {
                            event.preventDefault()
                            setHidden((value) => !value)
                        }}
                    >
                        {hidden ? 'show' : 'hide'}
                    </a>
                    ]
                </span>
            </div>
            {!hidden && <TocList items={items} prefix="" />}
        </nav>
    )
}
