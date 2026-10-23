import React from 'react'
import { Separator } from 'components/UI/Separator'

export default function SeparatorHorizontal(): JSX.Element {
    return (
        <div className="flex max-w-sm flex-col gap-3 text-sm">
            <span className="font-semibold">Product analytics</span>
            <Separator />
            <span className="text-secondary">A horizontal separator fills the width of its container.</span>
        </div>
    )
}
