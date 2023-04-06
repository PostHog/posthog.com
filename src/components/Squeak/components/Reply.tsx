import React, { useState } from 'react'
import { useUser } from 'hooks/useUser'
import Days from './Days'
import Markdown from './Markdown'
import { StrapiRecord, ReplyData } from 'lib/strapi'
import Avatar from './Avatar'
import getAvatarURL from '../util/getAvatar'

type ReplyProps = {
    reply: StrapiRecord<ReplyData>
    badgeText?: string | null
    className?: string
}

export default function Reply({ reply, badgeText }: ReplyProps) {
    const {
        id,
        attributes: { body, createdAt, profile },
    } = reply

    const [confirmDelete, setConfirmDelete] = useState(false)
    const { user } = useUser()
    //const isModerator = user?.isModerator
    //const isAuthor = user?.id === questionAuthorId
    /*const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (confirmDelete) {
            handleReplyDelete(id)
        } else {
            setConfirmDelete(true)
        }
    }*/

    const handleContainerClick = () => {
        setConfirmDelete(false)
    }

    return profile?.data ? (
        <div onClick={handleContainerClick}>
            <div className="squeak-post-author">
                {/* TODO: Add link to profile */}
                <a className="squeak-profile-link" href={`/community/profiles/${profile.data.id}`}>
                    <Avatar image={getAvatarURL(profile?.data)} />
                    <strong className="squeak-author-name">{profile.data.attributes.firstName || 'Anonymous'}</strong>
                </a>

                {badgeText && <span className="squeak-author-badge">{badgeText}</span>}
                <Days created={createdAt} />
                {/*resolved && resolvedBy === id && (
                    <>
                        <span className="squeak-resolved-badge">Solution</span>
                        {(isAuthor || isModerator) && (
                            <button onClick={() => handleResolve(false)} className="squeak-undo-resolved">
                                Undo
                            </button>
                        )}
                    </>
                )*/}
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
    ) : null
}
