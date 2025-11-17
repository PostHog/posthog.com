import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import InkeepEmbeddedChat from './Inkeep'
import { useChat } from 'hooks/useChat'
import { IconDocument, IconRewind, IconX } from '@posthog/icons'
import usePostHog from 'hooks/usePostHog'
import { groupBy } from 'lodash'
import dayjs from 'dayjs'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'

const ConversationHistoryButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <motion.div>
            <motion.button
                onClick={(e) => {
                    e.stopPropagation()
                    onClick()
                }}
                className="border border-light-7 rounded p-1.5 flex items-center space-x-1 click overflow-hidden group h-[28px]"
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
    const { conversationHistory, resetConversationHistory, context, setContext, firstResponse } = useChat()
    const { setWindowTitle, openNewChat } = useApp()
    const { appWindow, setPageOptions } = useWindow()

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
        <div className="h-full relative">
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
            <InkeepEmbeddedChat />
        </div>
    )
}
