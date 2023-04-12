import React, { useContext, useState } from 'react'
import { useUser } from 'hooks/useUser'
import Days from './Days'
import Markdown from './Markdown'
import { StrapiRecord, ReplyData } from 'lib/strapi'
import Avatar from './Avatar'
import getAvatarURL from '../util/getAvatar'
import { CurrentQuestionContext } from './Question'

type ReplyProps = {
    reply: StrapiRecord<ReplyData>
    badgeText?: string | null
    className?: string
}

export default function Reply({ reply, badgeText }: ReplyProps) {
    const {
        id,
        attributes: { body, createdAt, profile, publishedAt },
    } = reply

    const {
        question: { resolvedBy, id: questionID, profile: questionProfile, resolved },
        handlePublishReply,
        handleResolve,
        handleReplyDelete,
    } = useContext(CurrentQuestionContext)
    const stuff = useContext(CurrentQuestionContext)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const { user } = useUser()
    const isModerator = user?.role?.type === 'moderator'
    const isAuthor = user?.profile?.id === questionProfile?.data?.id

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (confirmDelete) {
            await handleReplyDelete(id)
        } else {
            setConfirmDelete(true)
        }
    }

    const handleContainerClick = () => {
        setConfirmDelete(false)
    }

    return profile?.data ? (
        <div onClick={handleContainerClick}>
            <div className="squeak-post-author">
                <a className="squeak-profile-link" href={`/community/profiles/${profile.data.id}`}>
                    <Avatar image={getAvatarURL(profile?.data?.attributes)} />
                    <strong className="squeak-author-name">{profile.data.attributes.firstName || 'Anonymous'}</strong>
                </a>
                {badgeText && <span className="squeak-author-badge">{badgeText}</span>}
                <Days created={createdAt} />
                {resolved && resolvedBy?.data?.id === id && (
                    <>
                        <span className="squeak-resolved-badge">Solution</span>
                        {(isAuthor || isModerator) && (
                            <button onClick={() => handleResolve(false, null)} className="squeak-undo-resolved">
                                Undo
                            </button>
                        )}
                    </>
                )}
            </div>
            <div className="squeak-post-content">
                <Markdown>{body}</Markdown>

                <div className="squeak-reply-action-buttons">
                    {!resolved && (isAuthor || isModerator) && (
                        <button onClick={() => handleResolve(true, id)} className="squeak-resolve-button">
                            Mark as solution
                        </button>
                    )}
                    {isModerator && (
                        <button onClick={() => handlePublishReply(!!publishedAt, id)} className="squeak-publish-button">
                            {publishedAt ? 'Unpublish' : 'Publish'}
                        </button>
                    )}
                    {isModerator && (
                        <button onClick={handleDelete} className="squeak-delete-button">
                            {confirmDelete ? 'Click again to confirm' : 'Delete'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    ) : null
}
