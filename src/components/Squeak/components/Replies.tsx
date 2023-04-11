import React from 'react'
import { useQuestion } from '../hooks/useQuestion'
import { StrapiData, ReplyData } from 'lib/strapi'

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

type RepliesProps = {
    expanded: boolean
    setExpanded: (expanded: boolean) => void
    resolved?: boolean
    replies: StrapiData<ReplyData[]> | undefined
}

export const Replies = ({ replies, resolved, expanded, setExpanded }: RepliesProps) => {
    return replies && replies.data.length > 0 ? (
        <ul className={`squeak-replies ${resolved ? 'squeak-thread-resolved' : ''}`}>
            {expanded || replies.data.length <= 3 ? (
                <Expanded replies={replies} />
            ) : (
                <Collapsed replies={replies} setExpanded={setExpanded} />
            )}
        </ul>
    ) : null
}

type CollapsedProps = {
    setExpanded: (expanded: boolean) => void
    replies: StrapiData<ReplyData[]>
}

const Collapsed = ({ setExpanded, replies }: CollapsedProps) => {
    const reply =
        /*replies.data[replies.data.findIndex((reply) => reply?.id === resolvedBy)] ||*/ replies.data[
            replies.data.length - 1
        ]
    const replyCount = replies.data.length - 2
    const maxAvatars = Math.min(replyCount, 3)

    // const badgeText = getBadge(questionAuthorId, reply?.profile?.id, replyAuthorMetadata?.role)
    const badgeText = 'Author'

    const avatars: any[] = []

    /*for (let reply of replies) {
        if (avatars.length >= maxAvatars) break
        const avatar = reply?.profile?.avatar
        if (avatar && !avatars.includes(avatar)) {
            avatars.push(avatar)
        }
    }*/

    if (avatars.length < maxAvatars) {
        avatars.push(...Array(maxAvatars - avatars.length))
    }

    let resolvedBy = 0

    return (
        <>
            <li>
                <div className="squeak-other-replies-container">
                    {avatars.map((avatar) => {
                        return <Avatar image={avatar} />
                    })}

                    <button className="squeak-other-replies" onClick={() => setExpanded(true)}>
                        View {replyCount} other {replyCount === 1 ? 'reply' : 'replies'}
                    </button>
                </div>
            </li>

            <li key={reply?.id} className={`${resolvedBy === reply?.id ? 'squeak-solution' : ''}`}>
                <Reply className="squeak-post-reply" reply={reply} badgeText={badgeText} />
            </li>
        </>
    )
}

type ExpandedProps = {
    replies: StrapiData<ReplyData[]>
}

const Expanded = ({ replies }: ExpandedProps) => {
    // const { resolvedBy, questionAuthorId } = question

    return (
        <>
            {replies.data.map((reply) => {
                const resolvedBy = 12
                // const replyAuthorMetadata = reply?.profile?.profiles_readonly?.[0] || reply?.profile?.metadata?.[0]

                const badgeText = '' // getBadge(questionAuthorId, reply?.profile?.id, replyAuthorMetadata?.role)

                return (
                    <li key={reply.id} className={`${resolvedBy === reply.id ? 'squeak-solution' : ''}`}>
                        <Reply className="squeak-post-reply" reply={reply} badgeText={badgeText} />
                    </li>
                )
            })}
        </>
    )
}
