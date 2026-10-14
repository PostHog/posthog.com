import React from 'react'
import { HOGS } from './hogs'
import MdxLinks from './MdxLinks'

/**
 * The right-aligned fact table a 2007 article carried. Every field comes from the
 * article's own frontmatter, so the facts and the prose stay in one file.
 *
 * A row value may contain Markdown links, so the values render through `MdxLinks`.
 */
export type InfoboxRow = {
    label: string
    value: string
}

export type InfoboxData = {
    title?: string
    /** A hog registered in `hogs.ts`, for example `HedgehogReading`. */
    hog?: string
    caption?: string
    rows?: InfoboxRow[]
}

export default function Infobox({ data, title }: { data?: InfoboxData; title: string }): JSX.Element | null {
    if (!data || !data.rows || data.rows.length === 0) {
        return null
    }

    const Hog = data.hog ? HOGS[data.hog] : undefined

    return (
        <aside className="hp-infobox" aria-label={`${data.title || title} (summary)`}>
            <div className="hp-infobox-title">{data.title || title}</div>
            {Hog && (
                <div className="hp-infobox-image">
                    <Hog size={150} title={data.caption || data.title || title} />
                    {data.caption && <span className="hp-infobox-caption">{data.caption}</span>}
                </div>
            )}
            <table>
                <tbody>
                    {data.rows.map((row) => (
                        <tr key={row.label}>
                            <th scope="row">{row.label}</th>
                            <td>
                                <MdxLinks text={row.value} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </aside>
    )
}
