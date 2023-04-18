import React, { useContext, useState } from 'react'
import { useUser } from 'hooks/useUser'
import Days from './Days'
import Markdown from './Markdown'
import { StrapiRecord, ReplyData } from 'lib/strapi'
import Avatar from './Avatar'
import getAvatarURL from '../util/getAvatar'
import { CurrentQuestionContext } from './Question'
import Link from 'components/Link'

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
            <div className="pb-1 flex items-center space-x-2">
                <Link
                    className="flex items-center !text-black dark:!text-white"
                    to={`/community/profiles/${profile.data.id}`}
                >
                    <div className="mr-2">
                        <Avatar className="w-[25px] h-[25px]" image={getAvatarURL(profile?.data?.attributes)} />
                    </div>
                    <strong>{profile.data.attributes.firstName || 'Anonymous'}</strong>
                </Link>
                {badgeText && (
                    <span className="border border-gray-accent-light dark:border-gray-accent-dark text-xs py-1 px-2 rounded-md">
                        {badgeText}
                    </span>
                )}
                <Days created={createdAt} />
                {resolved && resolvedBy?.data?.id === id && (
                    <>
                        <span className="border rounded-md text-[#008200cc] text-xs font-semibold py-1 px-2 uppercase">
                            Solution
                        </span>
                        {(isAuthor || isModerator) && (
                            <button
                                onClick={() => handleResolve(false, null)}
                                className="text-sm font-semibold text-red"
                            >
                                Undo
                            </button>
                        )}
                    </>
                )}
            </div>

            <div className="border-l-0 ml-[33px] pl-0 pb-1">
                <Markdown>{body}</Markdown>

                <div className="flex space-x-2 mb-4 relative -top-2 empty:hidden">
                    {!resolved && (isAuthor || isModerator) && (
                        <button onClick={() => handleResolve(true, id)} className="text-red font-semibold text-sm">
                            Mark as solution
                        </button>
                    )}
                    {isModerator && (
                        <button
                            onClick={() => handlePublishReply(!!publishedAt, id)}
                            className="text-red font-semibold text-sm"
                        >
                            {publishedAt ? 'Unpublish' : 'Publish'}
                        </button>
                    )}
                    {isModerator && (
                        <button onClick={handleDelete} className="text-[red] font-semibold text-sm">
                            {confirmDelete ? 'Click again to confirm' : 'Delete'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    ) : null
}
