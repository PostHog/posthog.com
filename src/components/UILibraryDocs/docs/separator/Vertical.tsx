import React from 'react'
import { Separator } from 'components/UI/Separator'

export default function SeparatorVertical(): JSX.Element {
    return (
        <div className="flex items-center gap-3 text-sm">
            <span>Docs</span>
            <Separator orientation="vertical" />
            <span>Pricing</span>
            <Separator orientation="vertical" />
            <span>Changelog</span>
        </div>
    )
}
