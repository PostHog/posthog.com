import React from 'react'
import { Badge } from 'components/UI/Badge'

export default function Tones(): JSX.Element {
    return (
        <div className="flex flex-wrap gap-2">
            {(['neutral', 'info', 'success', 'warning', 'error', 'brand'] as const).map((tone) => (
                <Badge key={tone} tone={tone}>
                    {tone}
                </Badge>
            ))}
        </div>
    )
}
