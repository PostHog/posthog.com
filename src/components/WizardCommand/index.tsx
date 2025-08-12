import { CodeBlock } from 'components/CodeBlock'
import useCloud from 'hooks/useCloud'
import React from 'react'

export default function WizardCommand() {
    const cloud = useCloud()

    const code = `npx -y @posthog/wizard@latest${cloud ? ` --region ${cloud}` : ''}`

    const languageOption = { language: 'bash', code }
    return (
        <CodeBlock currentLanguage={languageOption} showLabel={true} showCopy={true}>
            {[languageOption]}
        </CodeBlock>
    )
}
