import React from 'react'
import { CopyButton } from 'components/UI/CopyButton'

export default function Examples(): JSX.Element {
    return (
        <div className="flex flex-wrap items-center gap-4">
            <CopyButton text="npx @posthog/wizard" label="Copy command" />
            <CopyButton getText={() => 'pnpm add posthog-js'} label="Copy install command" size="md" />
            <CopyButton text="pnpm dev" label="Copy start command" size="lg" disabled />
        </div>
    )
}
