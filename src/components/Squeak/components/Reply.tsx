import React, { useContext, useState } from 'react'
import { useUser } from 'hooks/useUser'
import Days from './Days'
import Markdown from './Markdown'
import { StrapiRecord, ReplyData } from 'lib/strapi'
import Avatar from './Avatar'
import getAvatarURL from '../util/getAvatar'
import { CurrentQuestionContext } from './Question'
import Link from 'components/Link'
import Logomark from 'components/Home/images/Logomark'

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
    const isTeamMember = profile?.data?.attributes?.teams?.data?.length > 0

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

    const pronouns = profile?.data?.attributes?.pronouns

    return profile?.data ? (
        <div onClick={handleContainerClick}>
            <div className="pb-1 flex items-center space-x-2">
                <Link
                    className="flex items-center !text-black dark:!text-white"
                    to={`/community/profiles/${profile.data.id}`}
                >
                    <div className="mr-2 relative">
                        <Avatar className="w-[25px] h-[25px]" image={getAvatarURL(profile?.data?.attributes)} />
                        {isTeamMember && (
                            <span className="absolute -right-1.5 -bottom-2 h-[20px] w-[20px] flex items-center justify-center rounded-full bg-white dark:bg-gray-accent-dark text-primary dark:text-primary-dark">
                                <Logomark className="w-[16px]" />
                            </span>
                        )}
                    </div>
                    <strong>{profile.data.attributes.firstName || 'Anonymous'}</strong>
                    {pronouns && <span className="text-xs opacity-70 ml-1">({pronouns})</span>}
                </Link>
                {badgeText && (
                    <span className="border border-gray-accent-light dark:border-gray-accent-dark text-xs py-0.5 px-1 rounded-sm">
                        {badgeText}
                    </span>
                )}
                <Days created={createdAt} />
                {resolved && resolvedBy?.data?.id === id && (
                    <>
                        <span className="border rounded-sm text-[#008200cc] text-xs font-semibold py-0.5 px-1 uppercase">
                            Solution
                        </span>
                        {(isAuthor || isModerator) && (
                            <button
                                onClick={() => handleResolve(false, null)}
                                className="text-sm font-semibold text-red dark:text-yellow"
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
                        <button
                            onClick={() => handleResolve(true, id)}
                            className="text-red dark:text-yellow font-semibold text-sm"
                        >
                            Mark as solution
                        </button>
                    )}
                    {isModerator && (
                        <button
                            onClick={() => handlePublishReply(!!publishedAt, id)}
                            className="text-red dark:text-yellow font-semibold text-sm"
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
