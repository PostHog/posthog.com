import { IconCopy } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { CodeBlock } from 'components/CodeBlock'
import useCloud from 'hooks/useCloud'
import { useToast } from '../../context/Toast'
import React from 'react'

export default function WizardCommand() {
    const cloud = useCloud()
    const { addToast } = useToast()

    const code = `npx -y @posthog/wizard@latest${cloud ? ` --region ${cloud}` : ''}`

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code)

            // Show global toast
            addToast({
                description: 'Copied to clipboard',
                duration: 3000,
            })
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    const languageOption = { language: 'bash', code }
    return (
        <div data-scheme="primary">
            <CodeBlock currentLanguage={languageOption} showLabel={true} showCopy={true}>
                {[languageOption]}
            </CodeBlock>
            <div className="-mt-2 mb-6">
                <CallToAction size="md" childClassName="flex gap-2 items-center" onClick={handleCopy}>
                    <IconCopy className="size-5 inline-block" />
                    <span>Copy AI prompt</span>
                </CallToAction>
            </div>
        </div>
    )
}
