import React from 'react'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import { IconOpenSidebar, IconMessage } from '@posthog/icons'

type InkeepCTAProps = {
    children?: React.ReactNode
    question?: string
    quickQuestions?: string[]
}

export default function InkeepCTA({ children, question, quickQuestions }: InkeepCTAProps): JSX.Element {
    const handleAskInkeep = () => {
        if (quickQuestions && quickQuestions.length > 0) {
            // Store the quick questions to be used in the chat
            console.log('InkeepCTA: Storing quick questions:', quickQuestions)
            localStorage.setItem('pendingQuickQuestions', JSON.stringify(quickQuestions))
        }

        // Trigger the keyboard shortcut to open chat
        console.log('InkeepCTA: Triggering keyboard shortcut to open chat')
        const event = new KeyboardEvent('keydown', {
            key: '?',
            code: 'Slash',
            keyCode: 191,
            which: 191,
            shiftKey: true,
            bubbles: true,
        })
        document.dispatchEvent(event)
    }

    return (
        <div className="ph-callout flex flex-col md:flex-row gap-2 md:gap-4 mt-4 mb-6 p-4 border rounded bg-accent border-primary">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                    <div className="shrink-0 opacity-75">
                        <IconMessage className="size-6" />
                    </div>
                    <strong className="text-lg">{question ? question : 'Need help? Ask Max AI'}</strong>
                </div>
                <div className="ph-text pl-8 text-[15px] [&_p]:text-[15px] [&_*]:text-[15px] [&>*:last-child]:mb-0 !leading-relaxed">
                    {children || (
                        <>
                            {question
                                ? 'Max AI can help with that.'
                                : 'Max AI can help answer questions about PostHog. '}
                            <Link to="/questions">Ask a question</Link> and get instant answers.
                        </>
                    )}
                </div>
            </div>
            <aside className="pt-1 pl-8 md:pl-0">
                <CallToAction
                    type="secondary"
                    size="sm"
                    className="group [&>span]:flex [&>span]:items-center [&>span]:gap-1.5 [&>span]:px-3"
                    childClassName="whitespace-nowrap"
                    onClick={handleAskInkeep}
                >
                    <span>
                        Ask Max AI
                        <IconOpenSidebar className="size-6 inline-block opacity-75 group-hover:opacity-100" />
                    </span>
                </CallToAction>
            </aside>
        </div>
    )
}
