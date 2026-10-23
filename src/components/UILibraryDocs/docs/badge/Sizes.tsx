import React from 'react'
import { Badge } from 'components/UI/Badge'

export default function Sizes(): JSX.Element {
    return (
        <div className="flex items-center gap-2">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
        </div>
    )
}
