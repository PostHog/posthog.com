import React from 'react'

export default function Edits({ edits }: { edits: any[] }): JSX.Element | null {
    return edits?.length >= 1 ? (
        <span>
            <span className="m-0 text-sm opacity-50 font-bold cursor-default">Edited</span>
        </span>
    ) : null
}
