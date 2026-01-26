import React, { useEffect, useState } from 'react'
import InkeepEmbeddedChat from './Inkeep'
import { useChat } from 'hooks/useChat'
import { IconDocument, IconRewind, IconX, IconCode, IconChevronDown } from '@posthog/icons'
import { motion } from 'framer-motion'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import { SingleCodeBlock } from 'components/CodeBlock'

const ConversationHistoryButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <motion.div>
            <motion.button
                onClick={(e) => {
                    e.stopPropagation()
                    onClick()
                }}
                className="border border-primary rounded p-1.5 flex items-center space-x-1 click overflow-hidden group h-[28px]"
                whileHover={{ width: 'auto' }}
                initial={{ width: '28px' }}
            >
                <IconRewind className="size-3.5 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs whitespace-nowrap group-hover:opacity-100 opacity-0 transition-opacity font-semibold">
                    Conversation history
                </span>
            </motion.button>
        </motion.div>
    )
}

const Context = () => {
    return null
}

export default function Chat(): JSX.Element | null {
    const { conversationHistory, resetConversationHistory, context, setContext, firstResponse, codeSnippet } = useChat()
    const { setWindowTitle, openNewChat } = useApp()
    const { appWindow, setPageOptions } = useWindow()
    const [showCodeSnippet, setShowCodeSnippet] = useState(true)
    const [codeExpanded, setCodeExpanded] = useState(false)

    const codePrompt = codeSnippet
        ? `The user is asking about this ${codeSnippet.language || 'code'} snippet from ${codeSnippet.sourceUrl}:

\`\`\`${codeSnippet.language || 'javascript'}
${codeSnippet.code}
\`\`\``
        : undefined

    useEffect(() => {
        if (firstResponse && appWindow) {
            setWindowTitle(appWindow, firstResponse)
        }
    }, [firstResponse])

    useEffect(() => {
        if (appWindow) {
            setPageOptions([
                ...(conversationHistory?.length > 0
                    ? [
                          {
                              type: 'submenu',
                              label: 'Conversation history',
                              items: [
                                  ...conversationHistory
                                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                      .map((conversation) => ({
                                          type: 'item',
                                          label: conversation.question,
                                          onClick: () => {
                                              openNewChat({
                                                  path: `ask-max-${conversation.id}`,
                                                  chatId: conversation.id,
                                                  date: conversation.date,
                                              })
                                          },
                                      })),
                                  {
                                      type: 'separator',
                                  },
                                  {
                                      type: 'item',
                                      label: 'Clear conversation history',
                                      onClick: () => {
                                          resetConversationHistory()
                                      },
                                  },
                              ],
                          },
                          {
                              type: 'separator',
                          },
                      ]
                    : []),
            ])
        }
    }, [appWindow, conversationHistory])

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
            <Context />
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
