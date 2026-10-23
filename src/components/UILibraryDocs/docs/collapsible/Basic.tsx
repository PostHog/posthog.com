import React from 'react'
import { Collapsible } from 'components/UI/Collapsible'

export default function CollapsibleBasic(): JSX.Element {
    return (
        <Collapsible.Root className="max-w-md">
            <Collapsible.Trigger>How do I install the snippet?</Collapsible.Trigger>
            <Collapsible.Panel>
                <p>
                    Paste the snippet into the <code>&lt;head&gt;</code> of your site. Events show up in PostHog in a
                    few seconds.
                </p>
            </Collapsible.Panel>
        </Collapsible.Root>
    )
}
