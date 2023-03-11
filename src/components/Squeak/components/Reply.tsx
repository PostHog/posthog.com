import React, { useState } from 'react'
import { useQuestion } from '../hooks/useQuestion'
import { useUser } from '../hooks/useUser'
import { useOrg } from '../hooks/useOrg'
import Avatar from './Avatar'
import Days from './Days'

const Markdown = React.lazy(() =>
  import("./Markdown")
)

type ReplyProps = {
  id: string
  profile: Record<string, any>
  created_at: string
  body: string
  subject?: string
  badgeText?: string | null
  published: boolean
  permalink?: string
  className?: string
}

export default function Reply({
  profile,
  created_at,
  body,
  subject,
  badgeText,
  id,
  published,
  permalink,
  ...other
}: ReplyProps) {
  const isSSR = typeof window === "undefined"

  const question = useQuestion()
  const {
    questionAuthorId,
    resolved,
    resolvedBy,
    handleResolve,
    handlePublish,
    handleReplyDelete
  } = question
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { user } = useUser()
  const { profileLink } = useOrg()
  const isModerator = user?.isModerator
  const isAuthor = user?.profile?.id === questionAuthorId
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
    <div {...other} onClick={handleContainerClick}>
      <div className='squeak-post-author'>
        {profileLink ? (
          <a className='squeak-profile-link' href={profileLink(profile)}>
            <Avatar image={profile?.avatar} />
            <strong className='squeak-author-name'>
              {profile?.first_name || 'Anonymous'}
            </strong>
          </a>
        ) : (
          <>
            <Avatar image={profile?.avatar} />
            <strong className='squeak-author-name'>
              {profile?.first_name || 'Anonymous'}
            </strong>
          </>
        )}

        {badgeText && <span className='squeak-author-badge'>{badgeText}</span>}
        <Days created={created_at} />
        {resolved && resolvedBy === id && (
          <>
            <span className='squeak-resolved-badge'>Solution</span>
            {(isAuthor || isModerator) && (
              <button
                onClick={() => handleResolve(false)}
                className='squeak-undo-resolved'
              >
                Undo
              </button>
            )}
          </>
        )}
      </div>
      <div className='squeak-post-content'>
        {subject && <h3 className='squeak-subject'>
          {permalink ? <a href={permalink}>{subject}</a> : subject}
        </h3>}

        {!isSSR && (
          <React.Suspense fallback={<div />}>
            <Markdown>{body}</Markdown>
          </React.Suspense>
        )}

        {!subject && (
          <div className='squeak-reply-action-buttons'>
            {!resolved && (isAuthor || isModerator) && (
              <button
                onClick={() => handleResolve(true, id)}
                className='squeak-resolve-button'
              >
                Mark as solution
              </button>
            )}
            {isModerator && (
              <button
                onClick={() => handlePublish(id, !published)}
                className='squeak-publish-button'
              >
                {published ? 'Unpublish' : 'Publish'}
              </button>
            )}
            {isModerator && (
              <button onClick={handleDelete} className='squeak-delete-button'>
                {confirmDelete ? 'Click again to confirm' : 'Delete'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
