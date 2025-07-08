import { CodeBlock } from 'components/CodeBlock'
import useCloud from 'hooks/useCloud'
import React from 'react'

export default function WizardCommand() {
    const cloud = useCloud()

    const isEU = cloud === 'eu'

    const code = `npx --yes @posthog/wizard@latest ${isEU ? '--eu' : ''}`

    const languageOption = { language: 'bash', code }
    return (
        <CodeBlock currentLanguage={languageOption} showLabel={true} showCopy={true}>
            {[languageOption]}
        </CodeBlock>
    )
}
