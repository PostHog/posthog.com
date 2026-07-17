import React, { useRef, useState } from 'react'
import InkeepEmbeddedChat from './Inkeep'
import { useChat } from 'hooks/useChat'
import { IconDocument, IconX, IconCode, IconChevronDown } from '@posthog/icons'
import { motion, useDragControls } from 'framer-motion'
import { Dialog as RadixDialog } from 'radix-ui'
import { useApp } from '../../context/App'
import { SingleCodeBlock } from 'components/CodeBlock'
import { Popover } from 'components/RadixUI/Popover'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import Tooltip from 'components/RadixUI/Tooltip'

// Draggable, non-modal frame for the global chat overlay. Starts docked to the
// bottom-right and can be dragged anywhere within the viewport. Rendered once via
// `ChatOverlay` rather than as a managed window.
export const ChatFrame = (): JSX.Element => {
    const { conversationHistory, resetConversationHistory, firstResponse } = useChat()
    const { setChatOpen, openNewChat, taskbarHeight } = useApp()
    const dragControls = useDragControls()
    const constraintsRef = useRef<HTMLDivElement>(null)
    const [hasDragged, setHasDragged] = useState(false)

    const title = firstResponse || 'Chat with PostHog AI'
    const sortedHistory = [...(conversationHistory || [])].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return (
        <RadixDialog.Root open onOpenChange={(open) => !open && setChatOpen(false)} modal={false}>
            <RadixDialog.Portal>
                <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[9998]" aria-hidden="true" />
                {/*
                 * Mobile (< md): a card that fills the screen below the taskbar with the same 8px
                 * (p-2) gutter the taskbar and app windows use. `--chat-top` = measured taskbar
                 * height + gutter, so it sits just below the real taskbar; anchoring top + bottom
                 * means it can never exceed the viewport height.
                 * Desktop (md+): a short floating window docked bottom-right, capped so it never grows
                 * past the viewport (or over the taskbar).
                 */}
                <RadixDialog.Content
                    aria-label="PostHog AI chat"
                    className="data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed z-[9999] inset-x-2 bottom-2 top-[var(--chat-top)] md:inset-x-auto md:top-auto md:bottom-0 md:right-5 md:left-auto md:w-[400px] md:h-[500px] md:max-h-[calc(100dvh-4rem)] md:max-w-[calc(100vw-1rem)]"
                    onInteractOutside={(e) => e.preventDefault()}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    asChild
                >
                    <motion.div
                        drag
                        dragControls={dragControls}
                        dragListener={false}
                        dragMomentum={false}
                        dragConstraints={constraintsRef}
                        onDrag={() => setHasDragged(true)}
                        style={{ ['--chat-top' as string]: `${taskbarHeight}px` }}
                    >
                        <div
                            data-scheme="primary"
                            className={`bg-primary text-primary shadow-2xl overflow-hidden size-full flex flex-col rounded-t-none rounded-b-lg md:rounded ${
                                hasDragged ? '' : 'md:rounded-bl-none md:rounded-br-none'
                            }`}
                        >
                            <div
                                className={`overflow-hidden size-full flex flex-col border border-primary rounded-t-none rounded-b-lg md:rounded ${
                                    hasDragged ? '' : 'md:rounded-bl-none md:rounded-br-none'
                                }`}
                            >
                                <div
                                    data-scheme="tertiary"
                                    className="bg-primary flex items-center py-0.5 px-1 border-b border-primary cursor-grab active:cursor-grabbing"
                                    onPointerDown={(e) => dragControls.start(e)}
                                >
                                    {sortedHistory.length > 0 ? (
                                        <Popover
                                            dataScheme="primary"
                                            side="top"
                                            trigger={
                                                <button
                                                    className="flex items-center gap-0.5 text-primary text-left text-sm font-semibold ml-1.5 hover:opacity-75 transition-opacity min-w-0"
                                                    onPointerDown={(e) => e.stopPropagation()}
                                                >
                                                    <span className="line-clamp-1">{title}</span>
                                                    <IconChevronDown className="size-5 flex-shrink-0" />
                                                </button>
                                            }
                                        >
                                            <ScrollArea className="h-full">
                                                <div className="flex flex-col min-w-[200px] max-w-[280px] max-h-[300px]">
                                                    <p className="px-3 py-1 text-xs text-secondary font-semibold uppercase tracking-wide m-0">
                                                        Conversation history
                                                    </p>
                                                    {sortedHistory.map((conversation) => (
                                                        <button
                                                            key={conversation.id}
                                                            onClick={() =>
                                                                openNewChat({
                                                                    path: `ask-max-${conversation.id}`,
                                                                    chatId: conversation.id,
                                                                    date: conversation.date,
                                                                })
                                                            }
                                                            className="flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-accent rounded transition-colors text-left w-full"
                                                        >
                                                            <span className="line-clamp-1">
                                                                {conversation.question}
                                                            </span>
                                                        </button>
                                                    ))}
                                                    <div className="my-1 h-px bg-border" />
                                                    <button
                                                        onClick={() => resetConversationHistory()}
                                                        className="flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-accent rounded transition-colors text-left w-full"
                                                    >
                                                        Clear conversation history
                                                    </button>
                                                </div>
                                            </ScrollArea>
                                        </Popover>
                                    ) : (
                                        <p className="text-primary text-left text-sm font-semibold ml-1.5 my-0 line-clamp-1">
                                            {title}
                                        </p>
                                    )}
                                    <div className="flex-1" />
                                    <div
                                        data-scheme="tertiary"
                                        className="inline-flex gap-1 items-center py-0.5 pl-1.5 pr-0.5 skin-classic:bg-primary opacity-40 hover:opacity-75 transition-opacity duration-100 justify-end"
                                        onPointerDown={(e: React.PointerEvent) => e.stopPropagation()}
                                    >
                                        <Tooltip
                                            trigger={
                                                <OSButton
                                                    windowButton
                                                    size="md"
                                                    onClick={() => setChatOpen(false)}
                                                    icon={<IconX />}
                                                />
                                            }
                                        >
                                            <span>Close chat</span>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className="overflow-hidden size-full">
                                    <Chat />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </RadixDialog.Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    )
}

export default function Chat(): JSX.Element | null {
    const { context, setContext, codeSnippet } = useChat()
    const [showCodeSnippet, setShowCodeSnippet] = useState(true)
    const [codeExpanded, setCodeExpanded] = useState(false)

    const codePrompt = codeSnippet
        ? `The user is asking about this ${codeSnippet.language || 'code'} snippet from ${codeSnippet.sourceUrl}:

\`\`\`${codeSnippet.language || 'javascript'}
${codeSnippet.code}
\`\`\``
        : undefined

    return (
        <div className="h-full flex flex-col relative">
            <div data-scheme="secondary">
                {context?.length > 0 && (
                    <ul className="m-0 list-none p-2 flex space-x-1 overflow-auto snap-x snap-mandatory absolute left-0 w-full z-10 top-0">
                        {context.map((c) => {
                            const {
                                type,
                                value: { label, path },
                            } = c
                            return (
                                <li
                                    key={path}
                                    className={`font-semibold p-1.5 border border-primary rounded flex justify-between bg-primary ${
                                        context.length === 1 ? 'w-full' : ' w-[80%]'
                                    } flex-shrink-0 transition-all text-primary`}
                                >
                                    <div>
                                        <p className="text-xs opacity-70 m-0">Context</p>
                                        <span className="flex items-center space-x-1">
                                            <span>{type === 'page' ? <IconDocument className="size-4" /> : null}</span>
                                            <p className="m-0 text-sm line-clamp-1">{label || path}</p>
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setContext(context.filter((c) => c.value.path !== path))
                                        }}
                                        className="opacity-60 hover:opacity-100 transition-opacity pr-1"
                                    >
                                        <IconX className="size-4" />
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
            {codeSnippet && showCodeSnippet && (
                <div className="border-b border-primary p-2">
                    <div className="flex items-center justify-between text-xs text-muted">
                        <button
                            onClick={() => setCodeExpanded(!codeExpanded)}
                            className="flex items-center gap-1.5 hover:text-secondary transition-colors"
                        >
                            <IconChevronDown
                                className={`size-3.5 transition-transform ${codeExpanded ? 'rotate-180' : ''}`}
                            />
                            <IconCode className="size-3.5" />
                            <strong>Code snippet</strong>
                            {codeSnippet.language && <span className="opacity-60">({codeSnippet.language})</span>}
                            <span className="opacity-50 font-normal">
                                · {codeSnippet.code.split('\n').length} lines
                            </span>
                        </button>
                        <button onClick={() => setShowCodeSnippet(false)} title="Hide code snippet">
                            <IconX className="size-3.5 opacity-60 hover:opacity-100" />
                        </button>
                    </div>
                    {codeExpanded && (
                        <div className="max-h-[200px] overflow-auto rounded text-sm mt-2">
                            <SingleCodeBlock language={codeSnippet.language} showLabel={false} showAskAI={false}>
                                {codeSnippet.code}
                            </SingleCodeBlock>
                        </div>
                    )}
                </div>
            )}
            <div className="flex-1 min-h-0">
                <InkeepEmbeddedChat codePrompt={codePrompt} />
            </div>
        </div>
    )
}
