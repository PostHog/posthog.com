import React from 'react'
import { useQuestion } from '../hooks/useQuestion'

import Avatar from './Avatar'
import { QuestionForm } from './QuestionForm'
import Reply from './Reply'

const getBadge = (questionAuthorId: string, replyAuthorId: string, replyAuthorRole: string) => {
    if (replyAuthorRole === 'admin' || replyAuthorRole === 'moderator') {
        return 'Moderator'
    }

    if (!questionAuthorId || !replyAuthorId) {
        return null
    }

    return questionAuthorId === replyAuthorId ? 'Author' : null
}

type Reply = {
    id: string
    profile: Record<string, any>
    created_at: string
    body: string
    badgeText: string
    published: boolean
}

export const Replies = ({ expanded, setExpanded }: { expanded: boolean; setExpanded: (expanded: boolean) => void }) => {
    const { resolved, replies, onSubmit, question } = useQuestion()

    return (
        <>
            {replies && replies.length - 1 > 0 && (
                <ul className={`squeak-replies ${resolved ? 'squeak-thread-resolved' : ''}`}>
                    {expanded || replies.length <= 2 ? <Expanded /> : <Collapsed setExpanded={setExpanded} />}
                </ul>
            )}
            {resolved ? (
                <div className="squeak-locked-message">
                    <p>This thread has been closed</p>
                </div>
            ) : (
                <div className="squeak-reply-form-container">
                    {/* @ts-ignore */}
                    <QuestionForm onSubmit={onSubmit} messageID={question.id} formType="reply" />
                </div>
            )}
        </>
    )
}

const Collapsed = ({ setExpanded }: { setExpanded: (expanded: boolean) => void }) => {
    const { replies, resolvedBy, questionAuthorId } = useQuestion()
    const reply = replies[replies.findIndex((reply: any) => reply?.id === resolvedBy)] || replies[replies.length - 1]
    const replyCount = replies.length - 2
    const maxAvatars = Math.min(replyCount, 3)
    const replyAuthorMetadata = reply?.profile?.profiles_readonly?.[0] || reply?.profile?.metadata?.[0]

    const badgeText = getBadge(questionAuthorId, reply?.profile?.id, replyAuthorMetadata?.role)

    const avatars: any[] = []

    for (let reply of replies.slice(1)) {
        if (avatars.length >= maxAvatars) break
        const avatar = reply?.profile?.avatar
        if (avatar && !avatars.includes(avatar)) {
            avatars.push(avatar)
        }
    }

    if (avatars.length < maxAvatars) {
        avatars.push(...Array(maxAvatars - avatars.length))
    }

    return (
        <>
            <li>
                <div className="squeak-other-replies-container">
                    {avatars.map((avatar) => {
                        return (
                            <Avatar
                                key={`${reply?.message_id}-${reply?.id}-${reply?.profile?.id}-${avatar}`}
                                image={avatar}
                            />
                        )
                    })}

                    <button className="squeak-other-replies" onClick={() => setExpanded(true)}>
                        View {replyCount} other {replyCount === 1 ? 'reply' : 'replies'}
                    </button>
                </div>
            </li>

            <li
                key={reply?.id}
                className={`${resolvedBy === reply?.id ? 'squeak-solution' : ''} ${
                    !reply?.published ? 'squeak-reply-unpublished' : ''
                }`}
            >
                <Reply className="squeak-post-reply" {...reply} badgeText={badgeText} />
            </li>
        </>
    )
}

const Expanded = () => {
    const question = useQuestion()
    const replies = question.replies?.slice(1)
    const { resolvedBy, questionAuthorId } = question

    return (
        <>
            {replies.map((reply: any) => {
                const replyAuthorMetadata = reply?.profile?.profiles_readonly?.[0] || reply?.profile?.metadata?.[0]

                const badgeText = getBadge(questionAuthorId, reply?.profile?.id, replyAuthorMetadata?.role)

                return (
                    <li
                        key={reply.id}
                        className={`${resolvedBy === reply.id ? 'squeak-solution' : ''} ${
                            !reply.published ? 'squeak-reply-unpublished' : ''
                        }`}
                    >
                        <Reply className="squeak-post-reply" {...reply} badgeText={badgeText} />
                    </li>
                )
            })}
        </>
    )
}
