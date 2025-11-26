import React, { useEffect, useState } from 'react'
import InkeepEmbeddedChat from './Inkeep'
import { useChat } from 'hooks/useChat'
import { IconDocument, IconX, IconCode } from '@posthog/icons'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import { SingleCodeBlock } from 'components/CodeBlock'

const Context = () => {
    return null
}

export default function Chat(): JSX.Element | null {
    const { conversationHistory, resetConversationHistory, context, setContext, firstResponse, codeSnippet } = useChat()
    const { setWindowTitle, openNewChat } = useApp()
    const { appWindow, setPageOptions } = useWindow()
    const [showCodeSnippet, setShowCodeSnippet] = useState(true)

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
                                    className={`font-semibold p-1.5 border border-light-7 rounded flex justify-between bg-primary ${
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
                <div className="border-b border-light dark:border-dark flex-shrink-0">
                    <div className="p-2">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5 text-xs text-primary/60 dark:text-primary-dark/60">
                                <IconCode className="size-3.5" />
                                <span className="font-semibold">Code snippet</span>
                                {codeSnippet.language && (
                                    <span className="opacity-60">({codeSnippet.language})</span>
                                )}
                            </div>
                            <button
                                onClick={() => setShowCodeSnippet(false)}
                                className="text-primary/40 hover:text-primary/70 dark:text-primary-dark/40 dark:hover:text-primary-dark/70 transition-colors"
                                title="Hide code snippet"
                            >
                                <IconX className="size-3.5" />
                            </button>
                        </div>
                        <div className="max-h-[200px] overflow-auto rounded text-sm">
                            <SingleCodeBlock
                                language={codeSnippet.language}
                                showLabel={false}
                                showCopy={true}
                                showAskAI={false}
                            >
                                {codeSnippet.code}
                            </SingleCodeBlock>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex-1 min-h-0">
                <InkeepEmbeddedChat />
            </div>
        </div>
    )
}
