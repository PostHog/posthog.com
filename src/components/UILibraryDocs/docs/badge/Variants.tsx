import React from 'react'
import { Badge } from 'components/UI/Badge'

export default function Variants(): JSX.Element {
    return (
        <div className="flex flex-col gap-3">
            {(['soft', 'solid'] as const).map((appearance) => (
                <div key={appearance} className="flex flex-wrap gap-2">
                    {(['neutral', 'info', 'success', 'warning', 'error', 'brand'] as const).map((tone) => (
                        <Badge key={tone} tone={tone} appearance={appearance}>
                            {tone}
                        </Badge>
                    ))}
                </div>
            ))}
        </div>
    )
}
