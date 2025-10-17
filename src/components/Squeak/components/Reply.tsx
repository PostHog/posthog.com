import React, { useContext, useMemo, useState, useRef, useEffect } from 'react'
import { User, useUser } from 'hooks/useUser'
import Days from './Days'
import Markdown from './Markdown'
import { StrapiRecord, ReplyData } from 'lib/strapi'
import Avatar from './Avatar'
import getAvatarURL from '../util/getAvatar'
import { CurrentQuestionContext } from './Question'
import Link from 'components/Link'
import Logomark from 'components/Home/images/Logomark'
import { CallToAction } from 'components/CallToAction'
import {
    IconArchive,
    IconCheck,
    IconInfo,
    IconPencil,
    IconShieldLock,
    IconThumbsDown,
    IconThumbsDownFilled,
    IconThumbsUp,
    IconThumbsUpFilled,
    IconTrash,
} from '@posthog/icons'
import usePostHog from 'hooks/usePostHog'
import { IconFeatures } from '@posthog/icons'
import Tooltip from 'components/RadixUI/Tooltip'
import EditWrapper from './EditWrapper'
import { Authentication } from '..'
import SideModal from 'components/Modal/SideModal'
import ReportSpamButton from './ReportSpamButton'
import OSButton from 'components/OSButton'
import { useToast } from '../../../context/Toast'

type ReplyProps = {
    reply: StrapiRecord<ReplyData>
    badgeText?: string | null
    className?: string
    isInForum?: boolean
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
        <div className="p-4 border border-primary rounded bg-accent mt-1 mb-3">
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
        <div data-scheme="primary" className="p-4 border border-primary bg-accent rounded mt-1 mb-3">
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
                    <div className="text-sm border-t border-primary pt-2 mt-2 -mb-1">
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
                                    className={`click px-3 py-1 bg-light dark:bg-dark rounded-full text-sm font-semibold border ${
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

const AuthModal = ({
    authModalOpen,
    setAuthModalOpen,
    onAuth,
}: {
    authModalOpen: boolean
    setAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    onAuth: (user: User) => void
}) => {
    return (
        <SideModal open={authModalOpen} setOpen={setAuthModalOpen}>
            <h4 className="mb-4">Sign into PostHog.com</h4>
            <div className="bg-border dark:bg-border-dark p-4 mb-2">
                <p className="text-sm mb-2">
                    <strong>Note: PostHog.com authentication is separate from your PostHog app.</strong>
                </p>

                <p className="text-sm mb-0">
                    We suggest signing up with your personal email. Soon you'll be able to link your PostHog app
                    account.
                </p>
            </div>

            <Authentication onAuth={onAuth} initialView="sign-in" showBanner={false} showProfile={false} />
        </SideModal>
    )
}

const VoteButton = ({
    id,
    type,
    voted,
    votes,
    onVote,
}: {
    id: number
    type: 'up' | 'down'
    voted: boolean
    votes: number
    onVote: () => void
}) => {
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const { voteReply, user } = useUser()

    const vote = async (user: User) => {
        await voteReply(id, type, user)
        onVote?.()
    }

    const handleClick = () => {
        if (!user) {
            setAuthModalOpen(true)
        } else {
            vote(user)
        }
    }

    return (
        <>
            <AuthModal
                authModalOpen={authModalOpen}
                setAuthModalOpen={setAuthModalOpen}
                onAuth={(user) => {
                    if (user) {
                        vote(user)
                        setAuthModalOpen(false)
                    }
                }}
            />
            <OSButton
                onClick={handleClick}
                icon={
                    type === 'up' ? (
                        voted ? (
                            <IconThumbsUpFilled className="text-white" />
                        ) : (
                            <IconThumbsUp />
                        )
                    ) : voted ? (
                        <IconThumbsDownFilled className="text-white" />
                    ) : (
                        <IconThumbsDown />
                    )
                }
                size="md"
                className={
                    type === 'up'
                        ? voted
                            ? '!bg-green !text-white !border-green'
                            : ''
                        : voted
                        ? '!bg-red !text-white !border-red'
                        : ''
                }
            >
                <strong>{votes}</strong>
            </OSButton>
        </>
    )
}

export default function Reply({ reply, badgeText, isInForum = false }: ReplyProps) {
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

    const [pendingDelete, setPendingDelete] = useState(false)
    const [isEditingReply, setIsEditingReply] = useState(false)
    const deleteTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const toastCreatedAtRef = useRef<number | null>(null)
    const { addToast, removeToast } = useToast()
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

        const TOAST_DURATION = 5000

        // Create timestamp that will be used by both the toast and our timeout
        const createdAt = Date.now()
        toastCreatedAtRef.current = createdAt

        // Mark as pending delete and fade out
        setPendingDelete(true)

        // Set timeout to actually delete after toast expires
        deleteTimeoutRef.current = setTimeout(async () => {
            await handleReplyDelete(id)
            setPendingDelete(false)

            // Remove the toast once deletion is complete
            if (toastCreatedAtRef.current) {
                removeToast(toastCreatedAtRef.current)
                toastCreatedAtRef.current = null
            }
        }, TOAST_DURATION)

        // Show toast with undo (createdAt will be set internally but we track it separately)
        addToast({
            description: 'Reply deleted',
            duration: TOAST_DURATION,
            createdAt, // Pass the timestamp so the toast context uses the same one
            onUndo: () => {
                // Cancel the deletion
                if (deleteTimeoutRef.current) {
                    clearTimeout(deleteTimeoutRef.current)
                    deleteTimeoutRef.current = null
                }
                setPendingDelete(false)
                toastCreatedAtRef.current = null
            },
        })
    }

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (deleteTimeoutRef.current) {
                clearTimeout(deleteTimeoutRef.current)
            }
        }
    }, [])

    const pronouns = profile?.data?.attributes?.pronouns
    const helpful = useMemo(() => reply?.attributes?.helpful, [])
    const upvoted = useMemo(
        () => reply?.attributes?.upvoteProfiles?.data?.some((profile) => profile?.id === user?.profile?.id),
        [reply?.attributes?.upvoteProfiles, user?.profile?.id]
    )
    const downvoted = useMemo(
        () => reply?.attributes?.downvoteProfiles?.data?.some((profile) => profile?.id === user?.profile?.id),
        [reply?.attributes?.downvoteProfiles, user?.profile?.id]
    )
    const upvotes = useMemo(() => reply?.attributes?.upvoteProfiles?.data?.length, [reply?.attributes?.upvoteProfiles])
    const downvotes = useMemo(
        () => reply?.attributes?.downvoteProfiles?.data?.length,
        [reply?.attributes?.downvoteProfiles]
    )
    const isMax = profile?.data?.id === Number(process.env.GATSBY_AI_PROFILE_ID)

    return profile?.data ? (
        <div className={`transition-opacity duration-300 ${pendingDelete ? 'opacity-30 pointer-events-none' : ''}`}>
            <div className={`pb-1 flex items-center space-x-2 ${isInForum ? 'pr-8' : ''}`}>
                {isMax ? (
                    <Tooltip
                        trigger={
                            <div className="relative">
                                <Link
                                    state={{ newWindow: true }}
                                    className="flex items-center !text-black dark:!text-white"
                                    to={`/community/profiles/${profile.data.id}`}
                                >
                                    <div className="mr-2 relative ml-[-2px]">
                                        <Avatar
                                            className={`${isInForum ? 'size-[40px]' : 'size-[25px]'} rounded-full`}
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
                        }
                        delay={0}
                    >
                        <p>
                            Max AI is our resident AI assistant.
                            <br />
                            Double-check responses for accuracy.
                        </p>
                    </Tooltip>
                ) : (
                    <Link
                        state={{ newWindow: true }}
                        className="flex items-center !text-black dark:!text-white"
                        to={`/community/profiles/${profile.data.id}`}
                    >
                        <div className="mr-2 relative ml-[-2px]">
                            <Avatar
                                className={`${isInForum ? 'size-[40px]' : 'size-[25px]'} rounded-full ${
                                    profile?.data.attributes.color ? `bg-${profile.data.attributes.color}` : ''
                                }`}
                                image={getAvatarURL(profile?.data?.attributes)}
                                color={profile?.data.attributes.color}
                            />
                            {isTeamMember && (
                                <span className="absolute -right-1.5 -bottom-2 h-[20px] w-[20px] flex items-center justify-center rounded-full bg-white  text-primary dark:text-primary-dark">
                                    <Logomark className="w-[16px]" />
                                </span>
                            )}
                        </div>
                        <strong>{profile.data.attributes.firstName || 'Anonymous'}</strong>
                        {pronouns && <span className="text-xs opacity-70 ml-1">({pronouns})</span>}
                    </Link>
                )}
                {badgeText && (
                    <span className="border border-primary dark: text-xs py-0.5 px-1 rounded-sm">{badgeText}</span>
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
                <div className="!ml-auto flex items-center space-x-1">
                    {isModerator && (
                        <OSButton
                            size="sm"
                            tooltip={
                                <>
                                    <IconShieldLock className="size-5 relative -top-px inline-block text-secondary" />{' '}
                                    {publishedAt ? 'Unpublish' : 'Publish'}
                                </>
                            }
                            onClick={() => handlePublishReply(!!publishedAt, id)}
                            icon={<IconArchive />}
                        />
                    )}
                    {isModerator && (
                        <OSButton
                            size="sm"
                            tooltip={
                                <>
                                    <IconShieldLock className="size-5 relative -top-px inline-block text-secondary" />{' '}
                                    Delete reply
                                </>
                            }
                            onClick={handleDelete}
                            icon={<IconTrash />}
                            disabled={pendingDelete}
                        />
                    )}

                    {isReplyAuthor && (
                        <OSButton
                            size="sm"
                            tooltip="Edit reply"
                            onClick={() => setIsEditingReply(true)}
                            icon={<IconPencil />}
                        />
                    )}
                    {!isReplyAuthor && !isMax && <ReportSpamButton type="reply" id={id} />}
                </div>
            </div>

            <div className={`border-l-0 ${isInForum ? 'pl-[calc(44px_+_.5rem)] pr-8 -mt-2' : 'ml-[33px]'} pl-0 pb-1`}>
                {isMax &&
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
                <EditWrapper
                    data={reply}
                    type="reply"
                    onSubmit={() => mutate()}
                    editing={isEditingReply}
                    onEditingChange={setIsEditingReply}
                >
                    <>
                        <div className={reply?.attributes?.helpful === false || !publishedAt ? 'opacity-70' : ''}>
                            {reply?.attributes?.helpful === false && (
                                <div className="p-2 rounded border border-primary mb-2 text-sm bg-accent">
                                    <IconInfo className="size-5 inline-block" /> This answer was marked as unhelpful.
                                </div>
                            )}
                            <Markdown>{body}</Markdown>
                            {!publishedAt && isModerator && (
                                <p className="font-bold text-sm mt-2 mb-4 italic p-2 bg-accent border border-primary rounded">
                                    This reply is unpublished and only visible to moderators
                                </p>
                            )}
                        </div>
                        {isMax && helpful && (
                            <div className="border-t border-primary pt-2 mt-2">
                                <p className="m-0 text-sm text-secondary pb-4">
                                    Max AI's response was generated by{' '}
                                    <Link to="https://inkeep.com?utm_source=posthog" externalNoIcon>
                                        Inkeep
                                    </Link>
                                    . Double-check for accuracy.
                                </p>
                            </div>
                        )}

                        <div className="space-y-1 mt-2">
                            {(isModerator || resolvable) && !(resolved && resolvedBy?.data?.id === id) && (
                                <OSButton
                                    onClick={() => handleResolve(true, id)}
                                    variant="secondary"
                                    size="md"
                                    icon={<IconCheck />}
                                >
                                    Mark as solution
                                </OSButton>
                            )}
                            <div className="flex items-center gap-1">
                                <VoteButton id={id} type="up" voted={upvoted} votes={upvotes} onVote={() => mutate()} />
                                <VoteButton
                                    id={id}
                                    type="down"
                                    voted={downvoted}
                                    votes={downvotes}
                                    onVote={() => mutate()}
                                />
                            </div>
                        </div>
                    </>
                </EditWrapper>
            </div>
        </div>
    ) : null
}
