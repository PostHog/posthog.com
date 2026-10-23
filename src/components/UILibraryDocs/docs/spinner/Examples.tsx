import React from 'react'
import { Spinner } from 'components/UI/Spinner'

export default function Examples(): JSX.Element {
    return (
        <div className="flex items-center gap-4">
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <Spinner key={size} size={size} label="Loading insights" />
            ))}
        </div>
    )
}
