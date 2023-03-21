import React, { useState } from 'react'
import { useQuestion } from '../hooks/useQuestion'
import { useUser } from 'hooks/useUser'
import { useOrg } from '../hooks/useOrg'
import Avatar from './Avatar'
import Days from './Days'
import Markdown from './Markdown'
import { StrapiData } from '../util/types'

export type ReplyData = {
    // TODO: Populate profile data
    body: string
    createdAt: string
    updatedAt: string
    publishedAt: string
}

type ReplyProps = {
    reply: StrapiData<ReplyData>
    badgeText?: string | null
    className?: string
}

export default function Reply({ reply, badgeText }: ReplyProps) {
    const { id } = reply.data
    const { body, createdAt } = reply.data.attributes

    const question = useQuestion()
    const { questionAuthorId, resolved, resolvedBy, handleResolve, handlePublish, handleReplyDelete } = question
    const [confirmDelete, setConfirmDelete] = useState(false)
    const { user } = useUser()
    const { profileLink } = useOrg()
    const isModerator = user?.isModerator
    const isAuthor = user?.id === questionAuthorId
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (confirmDelete) {
            handleReplyDelete(id)
        } else {
            setConfirmDelete(true)
        }
    }

    const handleContainerClick = () => {
        setConfirmDelete(false)
    }

    return (
        <div onClick={handleContainerClick}>
            <div className="squeak-post-author">
                {/* TODO: Add link to profile */}
                {/*<a className="squeak-profile-link" href={`/community/profiles/${profile.id}`}>
                    <Avatar image={profile?.avatar} />
                    <strong className="squeak-author-name">{profile?.first_name || 'Anonymous'}</strong>
                </a>*/}

                {badgeText && <span className="squeak-author-badge">{badgeText}</span>}
                <Days created={createdAt} />
                {resolved && resolvedBy === id && (
                    <>
                        <span className="squeak-resolved-badge">Solution</span>
                        {(isAuthor || isModerator) && (
                            <button onClick={() => handleResolve(false)} className="squeak-undo-resolved">
                                Undo
                            </button>
                        )}
                    </>
                )}
            </div>
            <div className="squeak-post-content">
                {/*{subject && (
                    <h3 className="squeak-subject">{permalink ? <a href={permalink}>{subject}</a> : subject}</h3>
                )}*/}

                <Markdown>{body}</Markdown>

                {/*{!subject && (
                    <div className="squeak-reply-action-buttons">
                        {!resolved && (isAuthor || isModerator) && (
                            <button onClick={() => handleResolve(true, id)} className="squeak-resolve-button">
                                Mark as solution
                            </button>
                        )}
                        {isModerator && (
                            <button onClick={() => handlePublish(id, !published)} className="squeak-publish-button">
                                {published ? 'Unpublish' : 'Publish'}
                            </button>
                        )}
                        {isModerator && (
                            <button onClick={handleDelete} className="squeak-delete-button">
                                {confirmDelete ? 'Click again to confirm' : 'Delete'}
                            </button>
                        )}
                    </div>
                )}*/}
            </div>
        </div>
    )
}
