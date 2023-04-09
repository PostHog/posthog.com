import React from 'react'

export function OffsiteDescription({ children }: { children: JSX.Element[] }): JSX.Element {
    return <p className="max-w-2xl mx-auto opacity-70">{children}</p>
}
