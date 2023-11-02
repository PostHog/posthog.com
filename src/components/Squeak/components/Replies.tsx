import React, { useContext } from 'react'
import { StrapiData, ReplyData } from 'lib/strapi'
import Avatar from './Avatar'
import Reply from './Reply'
import { CurrentQuestionContext } from './Question'
import getAvatarURL from '../util/getAvatar'

const getBadge = (questionProfileID: string, replyProfileID: string) => {
    if (!questionProfileID || !replyProfileID) {
        return null
    }

    return questionProfileID === replyProfileID ? 'Author' : null
}

type RepliesProps = {
    expanded: boolean
    setExpanded: (expanded: boolean) => void
}

export const Replies = ({ expanded, setExpanded }: RepliesProps) => {
    const {
        question: { replies, resolved, resolvedBy },
    } = useContext(CurrentQuestionContext)
    return replies && replies.data.length > 0 ? (
        <ul className="ml-5 !mb-0 p-0 list-none">
            {expanded || replies.data.length < 3 ? (
                <Expanded replies={replies} resolvedBy={resolvedBy?.data?.id} />
            ) : (
                <Collapsed replies={replies} setExpanded={setExpanded} resolvedBy={resolvedBy?.data?.id} />
            )}
        </ul>
    ) : null
}

type CollapsedProps = {
    setExpanded: (expanded: boolean) => void
    replies: StrapiData<ReplyData[]>
    resolvedBy: number
}

const Collapsed = ({ setExpanded, replies, resolvedBy }: CollapsedProps) => {
    const reply = replies?.data?.find((reply) => reply?.id === resolvedBy) || replies.data[replies.data.length - 1]
    const replyCount = replies.data.length
    const maxAvatars = Math.min(replyCount - 1, 3)
    const {
        question: {
            profile: {
                data: { id: questionProfileID },
            },
        },
    } = useContext(CurrentQuestionContext)

    const badgeText = getBadge(questionProfileID, reply?.attributes?.profile?.data?.id)
    const avatars: any[] = []

    for (const reply of replies?.data || []) {
        if (avatars.length >= maxAvatars) break
        const avatar = getAvatarURL(reply?.attributes?.profile?.data)
        if (avatar && !avatars.includes(avatar)) {
            avatars.push(avatar)
        }
    }

    if (avatars.length < maxAvatars) {
        avatars.push(...Array(maxAvatars - avatars.length))
    }

    return (
        <>
            <li className="pr-[5px] pl-[30px] !mb-0 border-l border-solid border-light dark:border-dark squeak-left-border relative before:border-l-0">
                <div className="pb-8 flex items-center space-x-4">
                    <div className="flex items-center">
                        {avatars.map((avatar, index) => {
                            return (
                                <div key={index} className="relative -mr-2">
                                    <Avatar className="w-[25px]" image={avatar} />
                                </div>
                            )
                        })}
                    </div>

                    <button
                        className="text-red dark:text-yellow text-base font-semibold"
                        onClick={() => setExpanded(true)}
                    >
                        View {replyCount - 1} other {replyCount === 1 ? 'reply' : 'replies'}
                    </button>
                </div>
            </li>

            <li
                key={reply?.id}
                className={`pr-[5px] pl-[30px] !mb-0 border-l border-solid border-light dark:border-dark squeak-left-border relative before:border-l-0`}
            >
                <div className={`${!reply?.attributes?.publishedAt ? 'opacity-50' : ''}`}>
                    <Reply reply={reply} badgeText={badgeText} />
                </div>
            </li>
        </>
    )
}

type ExpandedProps = {
    replies: StrapiData<ReplyData[]>
    resolvedBy: number
}

const Expanded = ({ replies, resolvedBy }: ExpandedProps) => {
    const {
        question: {
            profile: {
                data: { id: questionProfileID },
            },
        },
    } = useContext(CurrentQuestionContext)

    return (
        <>
            {replies.data.map((reply) => {
                const badgeText = getBadge(questionProfileID, reply?.attributes?.profile?.data?.id)

                return (
                    <li
                        key={reply.id}
                        className={`pr-[5px] pl-[30px] !mb-0 border-l border-solid border-light dark:border-dark squeak-left-border relative before:border-l-0`}
                    >
                        <div className={`${!reply?.attributes?.publishedAt ? 'opacity-50' : ''}`}>
                            <Reply reply={reply} badgeText={badgeText} />
                        </div>
                    </li>
                )
            })}
        </>
    )
}
