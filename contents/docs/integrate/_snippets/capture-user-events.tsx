import React from 'react'
import { CodeBlock } from '../../../../src/components/CodeBlock'
import { Language } from 'prism-react-renderer'

export const CaptureUserEvents = () => {
    return (
        <CodeBlock selectorStyle="tabs">
            {[
                {
                    name: 'JavaScript',
                    language: 'javascript' as Language,
                    code: `posthog.capture('[event-name]', {property1: 'value', property2: 'another value'});`,
                },
                {
                    name: 'Android',
                    language: 'clike' as Language,
                    code: `
PostHog.with(this)
       .capture("Button B Clicked", new Properties()
                                        .putValue("color", "blue")
                                        .putValue("icon", "new2-final"));
                  `,
                },
                {
                    name: 'iOS',
                    language: 'clike' as Language,
                    code: `
// In swift
posthog.capture("Signed Up", properties: ["plan": "Pro++"])

// In objective-c
[[PHGPostHog sharedPostHog] capture:@"Signed Up" properties:@{ @"plan": @"Pro++" }];
                  `,
                },
                {
                    name: 'Flutter',
                    language: 'clike' as Language,
                    code: `
                    // TODO: Add code
                  `,
                },
                {
                    name: 'React Native',
                    language: 'jsx' as Language,
                    code: `
posthog.capture('Button B Clicked', {
    color: "blue",
    icon: "new2-final"
})
                  `,
                },
            ]}
        </CodeBlock>
    )
}
