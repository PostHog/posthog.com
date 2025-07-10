import React, { useEffect } from 'react'
import { IconX } from '@posthog/icons'
import { useUser } from 'hooks/useUser'
import Link from 'components/Link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import Tooltip from 'components/Tooltip'
import { navigate } from 'gatsby'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../../context/App'
import * as Portal from '@radix-ui/react-portal'

dayjs.extend(relativeTime)
dayjs.extend(isSameOrAfter)

interface NotificationProps {
    url: string
    title: string
    excerpt: string
    date: string
    count: string
    onDismiss: () => void
    onItemClick: (url: string) => void
}

interface QuestionProps {
    id: number
    subject: string
    activeAt: string
    permalink: string
    replies: Array<{ updatedAt: string }>
    date: string
    onItemClick: (url: string) => void
}

interface NotificationItem {
    date: string
    question?: QuestionProps
}

const Notification = ({ url, title, excerpt, date, count, onDismiss, onItemClick }: NotificationProps) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        onItemClick(url)
    }

    return (
        <li>
            <div className="relative group active:bg-light dark:active:bg-dark border border-b-3 border-transparent hover:border hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all active:before:h-[2px] active:before:bg-light dark:active:before:bg-dark active:before:absolute active:before:content-[''] active:before:top-[-3px] active:before:left-0 active:before:right-0 rounded px-2 py-1.5 -mt-1.5 mx-[-2px] -mb-3">
                <button
                    onClick={handleClick}
                    className="flex items-center text-inherit hover:text-inherit w-full text-left"
                >
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-4">
                            <div className="w-full">
                                <span className="text-sm text-red dark:text-yellow line-clamp-1">{title}</span>
                                {excerpt && (
                                    <div className="flex items-center text-sm space-x-1 text-primary group">
                                        <div className="text-primary dark:text-primary-dark font-medium opacity-60 group-hover:opacity-100 line-clamp-1">
                                            {excerpt}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex-shrink-0 text-sm font-normal text-right flex items-center space-x-4">
                            <p className="m-0 text-sm font-bold text-red">+{count}</p>
                            <div className="text-primary dark:text-primary-dark font-medium opacity-60 line-clamp-2">
                                {dayjs(date).fromNow()}
                            </div>
                        </div>
                    </div>
                </button>
                <button
                    onClick={onDismiss}
                    className="flex-shrink-0 absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-7 border border-primary bg-white dark:bg-accent-dark dark:border-dark rounded-full group-hover:flex justify-center items-center hidden"
                >
                    <Tooltip content="Dismiss" placement="top">
                        <span className="relative">
                            <IconX className="size-4" />
                        </span>
                    </Tooltip>
                </button>
            </div>
        </li>
    )
}

const Question = ({ id, subject, activeAt, permalink, replies, date, onItemClick }: QuestionProps) => {
    const { notifications, setNotifications } = useUser()
    const numberOfNewReplies = replies.filter((reply) => dayjs(reply.updatedAt).isSameOrAfter(dayjs(date))).length

    const dismiss = async () => {
        const newNotifications = notifications.filter(
            (notification: NotificationItem) => notification.question?.id !== id
        )
        setNotifications(newNotifications)
    }

    return (
        <Notification
            title={subject}
            excerpt="Question"
            date={activeAt}
            url={`/questions/${permalink}`}
            count={`${numberOfNewReplies} new repl${numberOfNewReplies === 1 ? 'y' : 'ies'}`}
            onDismiss={dismiss}
            onItemClick={onItemClick}
        />
    )
}

export default function NotificationsPanel() {
    const { notifications } = useUser()
    const { isNotificationsPanelOpen, setIsNotificationsPanelOpen } = useApp()

    const closeNotificationsPanel = () => {
        setIsNotificationsPanelOpen(false)
    }

    const handleItemClick = (url: string) => {
        closeNotificationsPanel()
        navigate(url, { state: { newWindow: true } })
    }

    return (
        <Portal.Root>
            <AnimatePresence>
                {isNotificationsPanelOpen && (
                    <>
                        {/* Backdrop overlay - transparent but captures clicks */}
                        <div className="fixed inset-0 z-40" onClick={closeNotificationsPanel} />

                        {/* Notifications panel */}
                        <motion.div
                            data-scheme="primary"
                            initial={{ translateX: '100%' }}
                            animate={{
                                translateX: 0,
                            }}
                            exit={{
                                translateX: '100%',
                            }}
                            transition={{ duration: 0.3, type: 'tween' }}
                            className={`fixed top-[calc(37px+1rem)] right-4 h-[calc(100vh-2rem-37px)] w-96 bg-primary border border-primary rounded shadow-xl z-50 text-primary`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="h-full flex flex-col">
                                <div className="flex items-center justify-between px-4 py-2 border-b border-primary">
                                    <h2 className="text-lg font-semibold">
                                        Notifications{notifications?.length > 0 ? ` (${notifications.length})` : ''}
                                    </h2>
                                    <button
                                        onClick={closeNotificationsPanel}
                                        className="text-sm text-secondary hover:text-primary"
                                    >
                                        <IconX className="size-4" />
                                    </button>
                                </div>

                                <div className="flex-1">
                                    <ScrollArea className="p-2">
                                        {notifications?.length > 0 ? (
                                            <ul className="list-none m-0 p-0 space-y-4">
                                                {notifications.map((notification: NotificationItem, i: number) => {
                                                    if (notification.question) {
                                                        return (
                                                            <Question
                                                                key={i}
                                                                {...notification.question}
                                                                date={notification.date}
                                                                onItemClick={handleItemClick}
                                                            />
                                                        )
                                                    }
                                                    return null
                                                })}
                                            </ul>
                                        ) : (
                                            <h5 className="m-0 px-2">You literally have no notifications.</h5>
                                        )}
                                    </ScrollArea>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </Portal.Root>
    )
}
