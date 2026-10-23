import React from 'react'
import { Textarea } from 'components/UI/Textarea'
import { Button } from 'components/UI/Button'

export default function Sizes(): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <div key={size} className="flex flex-wrap items-start gap-2">
                    <Textarea
                        size={size}
                        aria-label={`${size} text area`}
                        placeholder="Write a message"
                        className="min-w-0 flex-1"
                    />
                    <Button size={size} variant="secondary">
                        {size}
                    </Button>
                </div>
            ))}
        </div>
    )
}
