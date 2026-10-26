import React from 'react'
import { Toolbar } from 'components/UI/Toolbar'

export default function Surfaces(): JSX.Element {
    return (
        <div className="flex flex-col gap-5">
            {(['plain', 'outlined', 'raised'] as const).map((appearance) => (
                <div key={appearance} className="flex flex-col gap-2">
                    <span className="text-sm font-medium capitalize">{appearance}</span>
                    <Toolbar.Root appearance={appearance} aria-label={`${appearance} insight controls`}>
                        <Toolbar.Button>Save insight</Toolbar.Button>
                        <Toolbar.Button disabled>Export</Toolbar.Button>
                        <Toolbar.Separator />
                        <Toolbar.Input
                            aria-label="Insight name"
                            defaultValue="Weekly active users"
                            className="min-w-0 w-40"
                        />
                    </Toolbar.Root>
                </div>
            ))}
        </div>
    )
}
