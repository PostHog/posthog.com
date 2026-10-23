import React from 'react'
import { RelativeTime } from 'components/UI/RelativeTime'

export default function DateFormat(): JSX.Element {
    return (
        <div className="flex flex-col gap-3">
            <p className="m-0">
                Date: <RelativeTime date="2024-06-15T14:30:00Z" format="date" />
            </p>
            <p className="m-0">
                French locale: <RelativeTime date="2024-06-15T14:30:00Z" format="date" locale="fr-FR" />
            </p>
        </div>
    )
}
