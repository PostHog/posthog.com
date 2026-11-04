import React from 'react'
import { navigate } from 'gatsby'
import { Select } from '../RadixUI/Select'

type Props = {
    sdk: string
    /** The major this page documents. */
    major: string
    /** Every major with a reference, newest first, from the page front matter. */
    majors: string[]
    /** The released major the stable URL serves. */
    latest: string
    /** Newer majors that haven't been released yet. */
    experimental: string[]
}

/** Switches between an SDK's major-version references. The stable URL serves the current major. */
export default function VersionSelector({ sdk, major, majors, latest, experimental }: Props) {
    const basePath = `/docs/libraries/${sdk}`
    const label = (m: string) =>
        `${m}.x${m === latest ? ' (current)' : experimental.includes(m) ? ' (experimental)' : ''}`

    return (
        <div data-sdk-version={major}>
            <Select
                ariaLabel="SDK version"
                value={major}
                placeholder={label(major)}
                onValueChange={(value) => navigate(`${basePath}/${value}`)}
                groups={[{ label: 'Version', items: majors.map((m) => ({ value: m, label: label(m) })) }]}
            />
        </div>
    )
}
