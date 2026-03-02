import React, { useRef, useEffect } from 'react'
import { IconDocument, IconSearch, IconTerminal, IconBrain, IconCode } from '@posthog/icons'
import { ConversationItem } from './types'
import TypewriterContent from './TypewriterContent'
import { aboutSectionTypewriterSegments } from './data'

const toolIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    Read: IconDocument,
    Grep: IconSearch,
    Bash: IconTerminal,
    Edit: IconCode,
    PostHog: IconSearch,
}

function UserMessage({ content }: { content: React.ReactNode }) {
    return (
        <div className="border-l-2 border-red dark:border-yellow bg-accent py-2 pl-3 pr-2">
            <div className="font-code text-sm font-medium [&>*:last-child]:mb-0">{content}</div>
        </div>
    )
}

function ToolCall({
    toolName,
    toolDetail,
    expanded,
}: {
    toolName?: string
    toolDetail?: string
    expanded?: React.ReactNode
}) {
    const Icon = toolName ? toolIcons[toolName] || IconTerminal : IconTerminal

    return (
        <div className="pl-3 py-0.5">
            <div className="flex items-center gap-2">
                <Icon className="size-3 text-muted shrink-0" />
                <span className="text-sm text-muted font-code truncate">
                    {toolName}
                    {toolDetail && <span className="ml-1 opacity-75">{toolDetail}</span>}
                </span>
            </div>
            {expanded && (
                <div className="mt-2 ml-5 max-w-4xl overflow-hidden rounded-sm border border-input">{expanded}</div>
            )}
        </div>
    )
}

function ThinkBlock({ content }: { content: React.ReactNode }) {
    return (
        <div className="my-2 max-w-4xl overflow-hidden rounded-sm border border-input bg-primary">
            <div className="px-3 py-2 flex items-center gap-2">
                <IconBrain className="size-3 text-muted shrink-0" />
                <span className="text-sm text-muted font-code">Thinking...</span>
            </div>
            {content && (
                <div className="px-3 py-2 border-t border-input">
                    <p className="text-sm text-muted font-code m-0 whitespace-pre-wrap">{content}</p>
                </div>
            )}
        </div>
    )
}

function AgentMessage({
    content,
    useTypewriter,
    typewriterTrigger,
}: {
    content: React.ReactNode
    useTypewriter?: boolean
    typewriterTrigger?: boolean
}) {
    return (
        <div className="py-1 pl-3 pr-2">
            <div
                className={`font-code text-sm [&>*:last-child]:mb-0 [&_p]:mb-2 [&_ul]:mb-2 [&_ul]:pl-4 [&_ul]:list-disc [&_li]:mb-1 [&_strong]:font-semibold [&_code]:text-xs [&_code]:bg-accent [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:border [&_code]:border-input whitespace-pre-wrap ${
                    useTypewriter && typewriterTrigger !== undefined
                        ? 'text-primary [&_a]:text-primary [&_a]:underline'
                        : ''
                }`}
            >
                {useTypewriter && typewriterTrigger !== undefined ? (
                    <TypewriterContent segments={aboutSectionTypewriterSegments} trigger={typewriterTrigger} />
                ) : (
                    content
                )}
            </div>
        </div>
    )
}

function LoadingIndicator() {
    return (
        <div className="pl-3 py-1.5 flex items-center gap-2">
            <span className="text-sm text-muted font-code animate-pulse">Thinking...</span>
        </div>
    )
}

interface CodeConversationProps {
    conversation: ConversationItem[]
    activeSection: number
    typewriterTrigger?: boolean
}

export default function CodeConversation({
    conversation,
    activeSection,
    typewriterTrigger = false,
}: CodeConversationProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const prevActiveSection = useRef(activeSection)

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        if (activeSection !== prevActiveSection.current) {
            prevActiveSection.current = activeSection
            el.scrollTop = 0
        } else {
            el.scrollTop = el.scrollHeight
        }
    }, [activeSection, conversation.length])

    return (
        <div ref={scrollRef} key={activeSection} className="flex-1 overflow-y-auto bg-primary">
            <div className="pb-16">
                {conversation.map((item, index) => (
                    <div key={index} className="mx-auto max-w-[750px] px-2 py-1.5">
                        {item.type === 'user' && <UserMessage content={item.content} />}
                        {item.type === 'tool' && (
                            <ToolCall toolName={item.toolName} toolDetail={item.toolDetail} expanded={item.expanded} />
                        )}
                        {item.type === 'think' && <ThinkBlock content={item.content} />}
                        {item.type === 'agent' && (
                            <AgentMessage
                                content={item.content}
                                useTypewriter={activeSection === 0 && index === 4 && conversation.length <= 5}
                                typewriterTrigger={typewriterTrigger}
                            />
                        )}
                        {item.type === 'loading' && <LoadingIndicator />}
                    </div>
                ))}
            </div>
        </div>
    )
}
