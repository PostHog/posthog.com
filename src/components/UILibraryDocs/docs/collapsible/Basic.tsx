import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import { Collapsible } from 'components/UI/Collapsible'

export default function CollapsibleBasic(): JSX.Element {
    return (
        <Collapsible.Root defaultOpen className="max-w-md">
            <Collapsible.Trigger>How do I install the snippet?</Collapsible.Trigger>
            <Collapsible.Panel>
                <p>
                    Paste the snippet into the <Snippet.Inline>&lt;head&gt;</Snippet.Inline> of your site. Events show
                    up in PostHog in a few seconds.
                </p>
            </Collapsible.Panel>
        </Collapsible.Root>
    )
}
