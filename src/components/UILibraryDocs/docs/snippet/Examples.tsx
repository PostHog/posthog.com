import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function Examples(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="One command" fill>
                <Snippet text="npx -y @posthog/wizard@latest" className="w-full" />
            </DemoRow>
            <DemoRow label="Several commands" fill>
                <Snippet text={['pnpm add posthog-js', 'pnpm dev']} className="w-full" />
            </DemoRow>
            <DemoRow label="No prompt" fill>
                <Snippet text="POSTHOG_KEY=phc_k8Fz2nQw" prompt={false} className="w-full" />
            </DemoRow>
        </DemoRows>
    )
}
