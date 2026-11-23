import React from 'react'
import { CopyButton } from 'components/UI/CopyButton'
import { Snippet } from 'components/UI/Snippet'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const projectToken = 'phc_k8Fz2nQw7xR4tY1u'

export default function Examples(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="text">
                <Snippet.Inline>npx @posthog/wizard</Snippet.Inline>
                <CopyButton text="npx @posthog/wizard" label="Copy command" />
            </DemoRow>
            <DemoRow label="getText">
                <Snippet.Inline>{projectToken}</Snippet.Inline>
                <CopyButton getText={() => projectToken} label="Copy project token" />
            </DemoRow>
            <DemoRow label="disabled">
                <Snippet.Inline>pnpm dev</Snippet.Inline>
                <CopyButton text="pnpm dev" label="Copy start command" disabled />
            </DemoRow>
        </DemoRows>
    )
}
