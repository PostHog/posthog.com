import React, { useEffect, useRef } from 'react'
import { IconX } from '@posthog/icons'
import { useUser } from 'hooks/useUser'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
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
    onDismiss: () => void
}

interface AchievementProps {
    id: number
    title: string
    points: number
    date: string
    onItemClick: (url: string) => void
    onDismiss: () => void
}

interface NotificationItem {
    id: number
    date: string
    question?: QuestionProps
    achievement?: AchievementProps
    context?: {
        count: number | string
        title: string
        excerpt: string
        date: string
        url: string
    }
}

const Notification = ({ url, title, excerpt, date, count, onDismiss, onItemClick }: NotificationProps) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        onDismiss()
        onItemClick(url)
    }

    return (
        <li>
            <button onClick={handleClick} className="w-full text-left p-2 hover:bg-accent rounded active:scale-[0.98]">
                {excerpt && <div className="text-xs line-clamp-1 text-muted">{excerpt}</div>}
                <div className="text-sm line-clamp-1 font-semibold">{title}</div>
                <div className="flex-shrink-0 text-sm font-normal text-right flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                        <p className="m-0 text-sm font-bold text-red">+{count}</p>
                        <div className="text-primary dark:text-primary-dark font-medium opacity-60 line-clamp-2">
                            {dayjs(date).fromNow()}
                        </div>
                    </div>
                </div>
            </button>
        </li>
    )
}

const Question = ({ subject, activeAt, permalink, replies, date, onItemClick, onDismiss }: QuestionProps) => {
    const numberOfNewReplies = replies.filter((reply) => dayjs(reply.updatedAt).isSameOrAfter(dayjs(date))).length

    return (
        <Notification
            title={subject}
            excerpt="Question"
            date={activeAt}
            url={`/questions/${permalink}`}
            count={`${numberOfNewReplies} new repl${numberOfNewReplies === 1 ? 'y' : 'ies'}`}
            onDismiss={onDismiss}
            onItemClick={onItemClick}
        />
    )
}

const Achievement = ({ date, title, points, onItemClick, onDismiss }: AchievementProps) => {
    const { user } = useUser()

    return (
        <Notification
            url={`/community/profiles/${user?.profile?.id}?tab=points`}
            title={title}
            excerpt={'Achievement'}
            date={date}
            count={`${points} points`}
            onDismiss={onDismiss}
            onItemClick={onItemClick}
        />
    )
}

export default function NotificationsPanel() {
    const { notifications, setNotifications } = useUser()
    const { isNotificationsPanelOpen, setIsNotificationsPanelOpen } = useApp()
    const panelRef = useRef<HTMLDivElement>(null)

    const closeNotificationsPanel = () => {
        setIsNotificationsPanelOpen(false)
    }

    const handleItemClick = (url: string) => {
        closeNotificationsPanel()
        navigate(url, { state: { newWindow: true } })
    }

    const dismiss = async (id: number) => {
        const newNotifications = notifications.filter((notification: NotificationItem) => notification.id !== id)
        setNotifications(newNotifications)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                closeNotificationsPanel()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <Portal.Root>
            <AnimatePresence>
                {isNotificationsPanelOpen && (
                    <motion.div
                        ref={panelRef}
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
                                        <ul className="list-none m-0 p-0 space-y-1">
                                            {notifications.map((notification: NotificationItem, i: number) => {
                                                if (notification.question) {
                                                    return (
                                                        <Question
                                                            key={i}
                                                            {...notification.question}
                                                            date={notification.date}
                                                            onItemClick={handleItemClick}
                                                            onDismiss={() => dismiss(notification.id)}
                                                        />
                                                    )
                                                }
                                                if (notification.achievement) {
                                                    return (
                                                        <Achievement
                                                            key={i}
                                                            {...notification.achievement}
                                                            date={notification.date}
                                                            onItemClick={handleItemClick}
                                                            onDismiss={() => dismiss(notification.id)}
                                                        />
                                                    )
                                                }
                                                if (notification.context) {
                                                    const { count, title, excerpt, date, url } = notification.context
                                                    return (
                                                        <Notification
                                                            key={i}
                                                            count={String(count)}
                                                            title={title}
                                                            excerpt={excerpt}
                                                            date={date}
                                                            onItemClick={handleItemClick}
                                                            url={url}
                                                            onDismiss={() => dismiss(notification.id)}
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
                )}
            </AnimatePresence>
        </Portal.Root>
    )
}
