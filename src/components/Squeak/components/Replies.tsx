import React, { useContext } from 'react'
import { StrapiData, ReplyData } from 'lib/strapi'
import Avatar from './Avatar'
import Reply from './Reply'
import { CurrentQuestionContext } from './Question'
import getAvatarURL from '../util/getAvatar'
import { useUser } from 'hooks/useUser'

const getBadge = (questionProfileID: string, replyProfileID: string) => {
    if (!questionProfileID || !replyProfileID) {
        return null
    }

    return questionProfileID === replyProfileID ? 'Author' : null
}

const Squiggle = ({ className }: { className: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 11" className={`h-2 ${className}`}>
            <path d="m13.5 8.793 4.646-4.647.707.708-5.353 5.353-8.5-8.5-3.646 3.647-.708-.708L5 .293l8.5 8.5Z" />
        </svg>
    )
}

const Squiggles = ({ className = '' }: { className: string }) => {
    return (
        <div className="flex [&_svg]:ml-[-1.25px] mt-3">
            <Squiggle className={className} />
            <Squiggle className={className} />
            <Squiggle className={className} />
            <Squiggle className={className} />
            <Squiggle className={className} />
        </div>
    )
}

type RepliesProps = {
    expanded: boolean
    setExpanded: (expanded: boolean) => void
    isInForum?: boolean
}

export const Replies = ({ expanded, setExpanded, isInForum = false }: RepliesProps) => {
    const { user } = useUser()
    const {
        question: { replies, resolvedBy, profile },
    } = useContext(CurrentQuestionContext)

    const isOP = profile?.data?.id === user?.profile?.id

    return replies && replies.data.length > 0 ? (
        <ul className={`${isInForum ? '' : 'ml-5'} !mb-0 p-0 list-none`}>
            {expanded || replies.data.length < 3 || (isInForum && !resolvedBy?.data?.id) ? (
                <Expanded replies={replies} resolvedBy={resolvedBy?.data?.id} isOP={isOP} isInForum={isInForum} />
            ) : (
                <Collapsed
                    replies={replies}
                    setExpanded={setExpanded}
                    resolvedBy={resolvedBy?.data?.id}
                    isOP={isOP}
                    isInForum={isInForum}
                />
            )}
        </ul>
    ) : null
}

type CollapsedProps = {
    setExpanded: (expanded: boolean) => void
    replies: StrapiData<ReplyData[]>
    resolvedBy: number
    isInForum: boolean
}

const Collapsed = ({ setExpanded, replies, resolvedBy, isInForum }: CollapsedProps) => {
    const reply = replies?.data?.find((reply) => reply?.id === resolvedBy) || replies.data[replies.data.length - 1]
    const replyCount = replies.data.length
    const maxAvatars = Math.min(replyCount - 1, 3)
    const {
        question: {
            profile: {
                data: { id: questionProfileID },
            },
        },
    } = useContext(CurrentQuestionContext)

    const badgeText = getBadge(questionProfileID, reply?.attributes?.profile?.data?.id)
    const avatars: any[] = []

    for (const reply of replies?.data || []) {
        if (avatars.length >= maxAvatars) break
        const avatar = getAvatarURL(reply?.attributes?.profile?.data)
        if (avatar && !avatars.includes(avatar)) {
            avatars.push(avatar)
        }
    }

    if (avatars.length < maxAvatars) {
        avatars.push(...Array(maxAvatars - avatars.length))
    }

    return (
        <>
            <li
                className={`!mb-0 relative  ${
                    isInForum
                        ? ''
                        : 'pr-[5px] pl-[30px] border-l border-solid border-primary squeak-left-border before:border-l-0'
                }`}
            >
                {isInForum ? (
                    <div
                        className={`pb-4 justify-center !pl-0 flex items-center w-full relative before:content-[''] before:absolute before:top-[15px] before:left-0 before:w-full before:h-full before:border-t before:border-primary`}
                    >
                        <div className="bg-primary flex justify-center -top-1/2 relative space-x-4">
                            <Squiggles className="fill-border" />
                            <div className="flex items-center">
                                {avatars.map((avatar, index) => {
                                    return (
                                        <div key={index} className="relative -mr-2">
                                            <Avatar className="w-[25px] rounded-full" image={avatar} />
                                        </div>
                                    )
                                })}
                            </div>

                            <button className="text-sm font-semibold hover:underline" onClick={() => setExpanded(true)}>
                                View {replyCount - 1} other {replyCount === 1 ? 'reply' : 'replies'}
                            </button>
                            <Squiggles className="fill-border" />
                        </div>
                    </div>
                ) : (
                    <div className={`pb-8 -my-2 flex items-center space-x-4`}>
                        <div className="flex items-center">
                            {avatars.map((avatar, index) => {
                                return (
                                    <div key={index} className="relative -mr-2">
                                        <Avatar className="w-[25px] rounded-full" image={avatar} />
                                    </div>
                                )
                            })}
                        </div>

                        <button className="text-sm font-semibold hover:underline" onClick={() => setExpanded(true)}>
                            View {replyCount - 1} more {replyCount === 1 ? 'reply' : 'replies'}
                        </button>
                    </div>
                )}
            </li>

            <li
                key={reply?.id}
                className={`pr-[5px] pl-[30px] !mb-0 relative ${
                    isInForum ? '' : 'border-l border-solid border-primary squeak-left-border before:border-l-0'
                }`}
            >
                <Reply reply={reply} badgeText={badgeText} isInForum={isInForum} />
            </li>
        </>
    )
}

type ExpandedProps = {
    replies: StrapiData<ReplyData[]>
    isInForum: boolean
}

const getComunityClasses = (reply, isResolution) => {
    const profile = reply?.attributes?.profile?.data
    const isTeamMember = !!profile?.attributes?.startDate
    const isAI = profile?.id === Number(process.env.GATSBY_AI_PROFILE_ID)
    return `${isAI ? 'community-profile-ai' : isTeamMember ? 'community-profile-mod' : 'community-profile-member'}${
        isResolution ? ' community-reply-resolution' : ''
    }`
}

const Expanded = ({ replies, isInForum }: ExpandedProps) => {
    const {
        question: {
            profile: {
                data: { id: questionProfileID },
            },
            resolvedBy,
        },
    } = useContext(CurrentQuestionContext)
    return (
        <>
            {replies.data.map((reply) => {
                const badgeText = getBadge(questionProfileID, reply?.attributes?.profile?.data?.id)
                return (
                    <li
                        key={reply.id}
                        className={`pr-[5px] !mb-0 relative pb-4 border-primary ${
                            isInForum
                                ? 'border-t pt-4 px-5'
                                : 'border-l border-solid squeak-left-border before:border-l-0 pl-[30px]'
                        } ${getComunityClasses(reply, resolvedBy?.data?.id === reply.id)}`}
                    >
                        <Reply reply={reply} badgeText={badgeText} isInForum={isInForum} />
                    </li>
                )
            })}
        </>
    )
}
