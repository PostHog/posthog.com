import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function Colors(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="gray" fill>
                <Snippet text="pnpm add posthog-js" className="w-full" />
            </DemoRow>
            <DemoRow label="white" fill>
                <Snippet color="white" text="pnpm add posthog-node" className="w-full" />
            </DemoRow>
            <DemoRow label="yellow" fill>
                <Snippet color="yellow" text="npx -y @posthog/wizard@latest" className="w-full" />
            </DemoRow>
            <DemoRow label="blue" fill>
                <Snippet color="blue" prompt={false} text="POSTHOG_KEY=phc_k8Fz2nQw" className="w-full" />
            </DemoRow>
        </DemoRows>
    )
}
