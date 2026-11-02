import React from 'react'
import { Separator } from 'components/UI/Separator'

export default function SeparatorHorizontal(): JSX.Element {
    return (
        <div className="flex flex-col gap-3 text-body-sm">
            <span className="font-semibold">Product analytics</span>
            <Separator />
            <span className="text-secondary">Trends, funnels, retention, and paths for every event.</span>
        </div>
    )
}
