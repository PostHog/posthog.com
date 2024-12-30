import React, { useContext, useMemo, useState } from 'react'
import { useUser } from 'hooks/useUser'
import Days from './Days'
import Markdown from './Markdown'
import { StrapiRecord, ReplyData } from 'lib/strapi'
import Avatar from './Avatar'
import getAvatarURL from '../util/getAvatar'
import { CurrentQuestionContext } from './Question'
import Link from 'components/Link'
import Logomark from 'components/Home/images/Logomark'
import { CallToAction } from 'components/CallToAction'
import { IconArchive, IconCheck, IconInfo, IconPencil, IconThumbsDown, IconThumbsUp, IconTrash } from '@posthog/icons'
import usePostHog from 'hooks/usePostHog'
import { IconFeatures } from '@posthog/icons'
import Tooltip from 'components/Tooltip'
import EditWrapper from './EditWrapper'

type ReplyProps = {
    reply: StrapiRecord<ReplyData>
    badgeText?: string | null
    className?: string
}

const AIDisclaimerMod = ({ opName, replyID, mutate }) => {
    const { getJwt } = useUser()
    const [loading, setLoading] = useState(false)

    const handleHelpful = async (helpful: boolean) => {
        setLoading(true)
        if (helpful) {
            await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/ask-max/publish/${replyID}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${await getJwt()}`,
                },
            })
        } else {
            await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/replies/${replyID}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${await getJwt()}`,
                },
            })
        }
        setLoading(false)
        mutate()
    }

    return (
        <div className="p-4 border border-light dark:border-dark rounded bg-accent dark:bg-accent-dark mt-1 mb-3">
            <p className="m-0 text-sm">
                <IconFeatures className="size-6 relative mr-1 -top-0.5 text-primary dark:text-primary-dark opacity-50 inline-block" />
                <strong>This answer is only visible to moderators.</strong> Does it answer {opName}'s question?
            </p>

            <div className="flex items-center space-x-2 mt-2">
                <CallToAction disabled={loading} size="sm" type="secondary" onClick={() => handleHelpful(true)}>
                    <span className="flex space-x-1 items-center">
                        <IconThumbsUp className="size-4 text-green flex-shrink-0" />
                        <span>Yes, publish and notify subscribers</span>
                    </span>
                </CallToAction>
                <CallToAction disabled={loading} size="sm" type="secondary" onClick={() => handleHelpful(false)}>
                    <span className="flex space-x-1 items-center">
                        <IconThumbsDown className="size-4 text-red flex-shrink-0" />
                        <span>No, delete this answer</span>
                    </span>
                </CallToAction>
            </div>
        </div>
    )
}

const AIDisclaimer = ({ replyID, mutate, topic, confidence, resolvable }) => {
    const posthog = usePostHog()
    const { getJwt } = useUser()
    const { handleResolve } = useContext(CurrentQuestionContext)
    const [helpful, setHelpful] = useState<boolean | null>(null)

    const handleHelpful = async (helpful: boolean, feedback: string) => {
        try {
            setHelpful(helpful)
            posthog?.capture('Community AI reply', {
                replyID,
                helpful,
                confidence,
                feedback,
                topic: {
                    label: topic?.attributes?.label,
                    id: topic?.id,
                },
            })

            await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/replies/${replyID}`, {
                method: 'PUT',
                body: JSON.stringify({
                    data: {
                        helpful,
                    },
                }),
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${await getJwt()}`,
                },
            })

            if (resolvable) {
                await handleResolve(helpful, replyID)
            }

            mutate()
        } catch (error) {
            console.error(error)
        }
    }

    const feedbackOptions = [
        {
            label: resolvable ? 'Yes, mark as solution' : 'Yes, this was helpful',
            helpful: true,
        },
        {
            label: "Not the answer I'm looking for",
            helpful: false,
        },
        {
            label: 'I think this is a bug',
            helpful: false,
        },
        {
            label: 'My question is more nuanced',
            helpful: false,
        },
        {
            label: 'Answer is wrong',
            helpful: false,
        },
    ]

    return (
        <div className="p-4 border border-light dark:border-dark rounded bg-accent dark:bg-accent-dark mt-1 mb-3">
            {helpful === null ? (
                <p className="m-0 text-sm">
                    <IconFeatures className="size-6 relative mr-1 -top-0.5 text-primary dark:text-primary-dark opacity-50 inline-block" />
                    <strong>This answer was auto-generated by AI.</strong> Let us know if it helped!
                </p>
            ) : helpful ? (
                <>
                    <p className="mb-0 -mt-1 text-[15px]">
                        <strong>Great to hear!</strong> Thanks for helping us improve.
                    </p>
                    <div className="text-sm border-t border-light dark:border-dark pt-2 mt-2 -mb-1">
                        Response generated by{' '}
                        <Link to="https://inkeep.com?utm_source=posthog" externalNoIcon>
                            Inkeep
                        </Link>
                    </div>
                </>
            ) : (
                <p className="m-0 text-sm">
                    <strong>Sorry to hear!</strong> Your question has been posted to our community and our AI response
                    will be analyzed so we can do better in the future.
                </p>
            )}
            {helpful === null && (
                <ul className="flex items-center space-x-2 list-none p-0 flex-wrap -ml-2">
                    {feedbackOptions.map(({ label, helpful }) => {
                        return (
                            <li className="ml-2 mt-2" key={label}>
                                <button
                                    className={`click px-3 py-1 bg-white dark:bg-dark rounded-full text-sm font-semibold border ${
                                        helpful ? 'border-green' : 'border-red'
                                    }`}
                                    onClick={() => handleHelpful(helpful, label)}
                                >
                                    {label}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default function Reply({ reply, badgeText }: ReplyProps) {
    const {
        id,
        attributes: { body, createdAt, profile, publishedAt, meta, edits },
    } = reply

    const {
        question: { resolvedBy, id: questionID, profile: questionProfile, resolved, topics },
        handlePublishReply,
        handleResolve,
        handleReplyDelete,
        mutate,
    } = useContext(CurrentQuestionContext)

    const [confirmDelete, setConfirmDelete] = useState(false)
    const { user } = useUser()
    const isModerator = user?.role?.type === 'moderator'
    const isAuthor = user?.profile?.id === questionProfile?.data?.id
    const isReplyAuthor = user?.profile?.id === profile?.data?.id
    const isTeamMember = profile?.data?.attributes?.teams?.data?.length > 0
    const resolvable =
        !resolved &&
        (isAuthor || isModerator) &&
        topics?.data?.every((topic) => !topic.attributes.label.startsWith('#'))

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
    const helpful = useMemo(() => reply?.attributes?.helpful, [])

    return profile?.data ? (
        <div onClick={handleContainerClick}>
            <div className="pb-1 flex items-center space-x-2">
                {profile.data.id === Number(process.env.GATSBY_AI_PROFILE_ID) ? (
                    <Tooltip
                        content={() => (
                            <div className="text-sm max-w-64">
                                Max AI is our resident AI assistant. Double-check responses for accuracy.
                            </div>
                        )}
                        placement="top"
                    >
                        <div className="relative">
                            <Link
                                className="flex items-center !text-black dark:!text-white"
                                to={`/community/profiles/${profile.data.id}`}
                            >
                                <div className="mr-2 relative ml-[-2px]">
                                    <Avatar
                                        className="w-[25px] h-[25px] rounded-full"
                                        image={getAvatarURL(profile?.data?.attributes)}
                                        color={profile?.data.attributes.color}
                                    />
                                    {isTeamMember && (
                                        <span className="absolute -right-1.5 -bottom-2 h-[20px] w-[20px] flex items-center justify-center rounded-full bg-white dark:bg-aggent-dark text-primary dark:text-primary-dark">
                                            <Logomark className="w-[16px]" />
                                        </span>
                                    )}
                                </div>
                                <strong>
                                    {profile.data.attributes.firstName || 'Anonymous'}{' '}
                                    {profile.data.attributes.lastName || 'Anonymous'}
                                </strong>
                                {pronouns && <span className="text-xs opacity-70 ml-1">({pronouns})</span>}
                                <IconFeatures className="size-5 ml-1 text-primary dark:text-primary-dark opacity-50 inline-block" />
                            </Link>
                        </div>
                    </Tooltip>
                ) : (
                    <Link
                        className="flex items-center !text-black dark:!text-white"
                        to={`/community/profiles/${profile.data.id}`}
                    >
                        <div className="mr-2 relative ml-[-2px]">
                            <Avatar
                                className={`w-[25px] h-[25px] rounded-full ${
                                    profile?.data.attributes.color ? `bg-${profile.data.attributes.color}` : ''
                                }`}
                                image={getAvatarURL(profile?.data?.attributes)}
                                color={profile?.data.attributes.color}
                            />
                            {isTeamMember && (
                                <span className="absolute -right-1.5 -bottom-2 h-[20px] w-[20px] flex items-center justify-center rounded-full bg-white dark:bg-gray-accent-dark text-primary dark:text-primary-dark">
                                    <Logomark className="w-[16px]" />
                                </span>
                            )}
                        </div>
                        <strong>{profile.data.attributes.firstName || 'Anonymous'}</strong>
                        {pronouns && <span className="text-xs opacity-70 ml-1">({pronouns})</span>}
                    </Link>
                )}
                {badgeText && (
                    <span className="border border-gray-accent-light dark:border-gray-accent-dark text-xs py-0.5 px-1 rounded-sm">
                        {badgeText}
                    </span>
                )}
                <Days created={createdAt} edits={edits} profile={profile?.data} />
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
                {profile.data.id === Number(process.env.GATSBY_AI_PROFILE_ID) &&
                    helpful === null &&
                    (isModerator || isAuthor) &&
                    (isModerator && !publishedAt ? (
                        <AIDisclaimerMod
                            opName={questionProfile.data.attributes.firstName || 'OP'}
                            replyID={id}
                            mutate={mutate}
                        />
                    ) : (
                        <AIDisclaimer
                            isAuthor={isAuthor}
                            topic={topics?.data?.[0]}
                            replyID={id}
                            mutate={mutate}
                            confidence={meta?.confidence}
                            resolvable={resolvable}
                        />
                    ))}
                <EditWrapper data={reply} type="reply" onSubmit={() => mutate()}>
                    {({ setEditing }) => {
                        return (
                            <>
                                <div
                                    className={reply?.attributes?.helpful === false || !publishedAt ? 'opacity-70' : ''}
                                >
                                    {reply?.attributes?.helpful === false && (
                                        <div className="p-2 rounded border border-light dark:border-dark mb-2 text-sm bg-accent dark:bg-accent-dark">
                                            <IconInfo className="size-5 inline-block" /> This answer was marked as
                                            unhelpful.
                                        </div>
                                    )}
                                    <Markdown>{body}</Markdown>
                                </div>
                                {profile.data.id === Number(process.env.GATSBY_AI_PROFILE_ID) && helpful && (
                                    <div className="border-t border-light dark:border-dark pt-2 mt-2">
                                        <p className="m-0 text-sm text-primary/60 dark:text-primary-dark/60 pb-4">
                                            Max AI's response was generated by{' '}
                                            <Link to="https://inkeep.com?utm_source=posthog" externalNoIcon>
                                                Inkeep
                                            </Link>
                                            . Double-check for accuracy.
                                        </p>
                                    </div>
                                )}

                                {(isModerator || resolvable || isReplyAuthor) && (
                                    <div
                                        className={`flex ${
                                            isModerator ? 'justify-end border-t border-light dark:border-dark mt-4' : ''
                                        } mt-1 pt-1 pb-2`}
                                    >
                                        <div
                                            className={`inline-flex space-x-1 ${
                                                isModerator ? `bg-light dark:bg-dark px-1 mr-4 -mt-5` : ''
                                            }`}
                                        >
                                            {isReplyAuthor && (
                                                <button
                                                    onClick={() => setEditing(true)}
                                                    className="text-red dark:text-yellow font-semibold text-sm flex items-center py-1 px-1.5 rounded hover:bg-accent dark:hover:bg-border-dark/50"
                                                >
                                                    <IconPencil className="size-4 mr-1 text-primary/70 dark:text-primary-dark/70 inline-block" />
                                                    Edit
                                                </button>
                                            )}
                                            {(isModerator || resolvable) && (
                                                <button
                                                    onClick={() => handleResolve(true, id)}
                                                    className="text-red dark:text-yellow font-semibold text-sm flex items-center py-1 px-1.5 rounded hover:bg-accent dark:hover:bg-border-dark/50"
                                                >
                                                    <IconCheck className="size-4 mr-1 text-green inline-block" />
                                                    Mark as solution
                                                </button>
                                            )}
                                            {isModerator && (
                                                <button
                                                    onClick={() => handlePublishReply(!!publishedAt, id)}
                                                    className="text-red dark:text-yellow font-semibold text-sm flex items-center py-1 px-1.5 rounded hover:bg-accent dark:hover:bg-border-dark/50"
                                                >
                                                    <IconArchive className="size-4 mr-1 text-primary/50 dark:text-primary-dark/50 inline-block" />
                                                    {publishedAt ? 'Unpublish' : 'Publish'}
                                                </button>
                                            )}
                                            {isModerator && (
                                                <button
                                                    onClick={handleDelete}
                                                    className="text-red font-semibold text-sm flex items-center py-1 px-1.5 rounded hover:bg-accent dark:hover:bg-border-dark/50"
                                                >
                                                    <IconTrash className="size-4 mr-1 text-primary/50 dark:text-primary-dark/50 inline-block" />
                                                    {confirmDelete ? 'Click again to confirm' : 'Delete'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )
                    }}
                </EditWrapper>
            </div>
        </div>
    ) : null
}
