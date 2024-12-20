import Layout from 'components/Layout'
import { communityMenu } from '../../navs'
import React, { useEffect, useState } from 'react'
import { useUser } from 'hooks/useUser'
import Link from 'components/Link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { IconX } from '@posthog/icons'
import Tooltip from 'components/Tooltip'
import { navigate } from 'gatsby'
import SEO from 'components/seo'
import CloudinaryImage from 'components/CloudinaryImage'
import { AchievementModal } from './profiles/[id]'
dayjs.extend(relativeTime)
dayjs.extend(isSameOrAfter)

const Notification = ({ url, title, excerpt, date, count, onDismiss, imageURL, state = {}, onClick }) => {
    return (
        <li>
            <div className="relative group active:bg-light dark:active:bg-dark border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all active:before:h-[2px] active:before:bg-light dark:active:before:bg-dark active:before:absolute active:before:content-[''] active:before:top-[-3px] active:before:left-0 active:before:right-0 rounded px-2 py-1.5 -mt-1.5 mx-[-2px] -mb-3">
                <Link
                    onClick={onClick}
                    to={url}
                    className={`flex items-center text-inherit hover:text-inherit w-full`}
                    state={{ previous: { title: 'Notifications', url: '/community/notifications' }, ...state }}
                >
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-4">
                            {imageURL && <CloudinaryImage src={imageURL} className="size-12 flex-shrink-0" />}
                            <div className="w-full">
                                <span className="text-sm text-red dark:text-yellow line-clamp-1 font-bold">
                                    {title}
                                </span>
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
                            <p className="m-0 text-sm font-bold text-red">{count}</p>
                            <div className="text-primary dark:text-primary-dark font-medium opacity-60 line-clamp-2">
                                {dayjs(date).fromNow()}
                            </div>
                        </div>
                    </div>
                </Link>
                <button
                    onClick={onDismiss}
                    className="flex-shrink-0 absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-7 border border-border bg-white dark:bg-accent-dark dark:border-dark rounded-full group-hover:flex justify-center items-center hidden"
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

const Question = ({ id, subject, activeAt, permalink, replies, date }) => {
    const { notifications, setNotifications } = useUser()
    const numberOfNewReplies = replies.filter((reply) => dayjs(reply.updatedAt).isSameOrAfter(dayjs(date))).length

    const dismiss = async () => {
        const newNotifications = notifications.filter((notification) => notification.question.id !== id)
        setNotifications(newNotifications)
    }

    return (
        <Notification
            title={subject}
            excerpt="Question"
            date={activeAt}
            url={`/questions/${permalink}`}
            count={`+${numberOfNewReplies} new repl${numberOfNewReplies === 1 ? 'y' : 'ies'}`}
            onDismiss={dismiss}
        />
    )
}

const Achievement = ({ id, title, date, icon, image, description, points }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const { notifications, setNotifications, user } = useUser()

    const dismiss = async () => {
        const newNotifications = notifications.filter((notification) => notification.achievement.id !== id)
        setNotifications(newNotifications)
    }

    return (
        <>
            <AchievementModal
                highlight
                setModalOpen={setModalOpen}
                modalOpen={modalOpen}
                imageURL={image?.url}
                title={title}
                description={description}
                points={points}
                actionButtons={[
                    {
                        label: 'View profile',
                        url: `/community/profiles/${user?.profile?.id}`,
                        state: { achievement: { id } },
                        onClick: () => {
                            dismiss()
                        },
                    },
                    {
                        label: 'Dismiss',
                        onClick: () => {
                            dismiss()
                            setModalOpen(false)
                        },
                    },
                ]}
            />
            <Notification
                title={title}
                excerpt="Achievement"
                date={date}
                onDismiss={dismiss}
                imageURL={icon?.url}
                state={{ achievement: { id } }}
                onClick={() => {
                    setModalOpen(true)
                }}
            />
        </>
    )
}

export default function Notifications() {
    const { fetchUser, notifications } = useUser()

    useEffect(() => {
        fetchUser()
            .then((user) => {
                if (!user) {
                    navigate('/community')
                }
            })
            .catch(() => navigate('/community'))
    }, [])

    return (
        <Layout parent={communityMenu}>
            <SEO title="Notifications - PostHog" />
            <section className="py-12 mb-12 px-5 max-w-screen-mdlg mx-auto">
                <h1>Notifications</h1>
                {notifications?.length > 0 ? (
                    <ul className="list-none m-0 p-0 space-y-4 mt-6">
                        {notifications.map((notification, i) => {
                            if (notification.question) {
                                return <Question key={i} {...notification.question} date={notification.date} />
                            }
                            if (notification.achievement) {
                                return <Achievement key={i} {...notification.achievement} date={notification.date} />
                            }
                            return null
                        })}
                    </ul>
                ) : (
                    <div className="p-4 bg-accent dark:bg-accent-dark rounded-md border border-border dark:border-dark">
                        <h5 className="m-0">New notifications will appear here</h5>
                    </div>
                )}
            </section>
        </Layout>
    )
}
