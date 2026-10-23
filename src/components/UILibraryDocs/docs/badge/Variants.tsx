import React from 'react'
import { Badge } from 'components/UI/Badge'

export default function Variants(): JSX.Element {
    return (
        <div className="flex flex-col gap-3">
            {(['soft', 'solid'] as const).map((variant) => (
                <div key={variant} className="flex flex-wrap gap-2">
                    {(['neutral', 'info', 'success', 'warning', 'error', 'brand'] as const).map((tone) => (
                        <Badge key={tone} tone={tone} variant={variant}>
                            {tone}
                        </Badge>
                    ))}
                </div>
            ))}
        </div>
    )
}
