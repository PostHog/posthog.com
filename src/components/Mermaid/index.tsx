import React from 'react'

export default function Mermaid({ children }: { children: string }): JSX.Element {
    return (
        <div className="relative">
            <div className="bg-accent dark:bg-accent-dark flex items-center justify-center size-full rounded-md animate-pulse absolute inset-0 mermaid-loading" />
            <div className="mermaid invisible">{children}</div>
        </div>
    )
}
