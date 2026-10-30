import React from 'react'
import { motion } from 'framer-motion'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import removeMarkdown from 'remove-markdown'
import { IconCheck, IconLock, IconPinFilled } from '@posthog/icons'
import Link from 'components/Link'
import { IconTag } from 'components/OSIcons'
import Avatar from 'components/Squeak/components/Avatar'
import getAvatarURL from 'components/Squeak/util/getAvatar'
import { QuestionData, StrapiRecord } from 'lib/strapi'
import TopicIcon from './TopicIcon'

dayjs.extend(relativeTime)

export const commentCount = (count: number) => `${count} ${count === 1 ? 'comment' : 'comments'}`

export const ProfileAvatar = ({ profile, className = 'size-5' }: { profile: any; className?: string }) => (
    <span className="inline-flex shrink-0 rounded-full ring-2 ring-primary">
        <Avatar className={className} image={getAvatarURL(profile)} color={profile?.attributes?.color} />
    </span>
)

// The thread header's tags.
export const TagPills = ({ tags }: { tags?: QuestionData['forumTags'] }) => (
    <>
        {tags?.data?.map((tag) => (
            <span
                key={tag.id}
                className="rounded-full border border-primary bg-accent px-2 text-xs leading-5 text-secondary whitespace-nowrap"
            >
                {tag.attributes.label}
            </span>
        ))}
    </>
)

// An avatar and first name that link to the profile.
const ProfileLink = ({ profile }: { profile: any }) => (
    <Link
        to={`/community/profiles/${profile.id}`}
        // Link wraps the anchor in an inline span, which would put the avatar on the text baseline.
        wrapperClassName="flex shrink-0"
        className="flex items-center gap-1.5 font-medium text-primary !no-underline hover:!underline"
    >
        <ProfileAvatar profile={profile} className="size-4" />
        {profile.attributes?.firstName || 'Anonymous'}
    </Link>
)

// A feed row. The left side says what the post is; the right side says whether the conversation is alive.
// The forum is small and casual, so points are muted and come last.
export default function PostRow({
    post,
    showTopic,
    filterTagIds = [],
    showPin,
    rowRef,
}: {
    post: StrapiRecord<QuestionData>
    showTopic: boolean
    // Tags show only while the feed filters by tags, to show why each post matches. Matching tags come first.
    filterTagIds?: number[]
    showPin: boolean
    // The feed watches the last row to load the next page.
    rowRef?: (node?: Element | null) => void
}) {
    const {
        subject,
        permalink,
        body,
        createdAt,
        publishedAt,
        profile,
        numReplies,
        lastReplyAt,
        lastReplyBy,
        numUpvotes = 0,
        resolved,
        locked,
        pinnedToTopic,
        forumTopic,
        forumTags,
    } = post.attributes
    const pinned = showPin && pinnedToTopic
    const topic = forumTopic?.data?.attributes
    const author = profile?.data
    const lastReplier = lastReplyBy?.data
    const showTags = filterTagIds.length > 0
    const tagLabels = [...(forumTags?.data ?? [])]
        .sort((a, b) => Number(filterTagIds.includes(b.id)) - Number(filterTagIds.includes(a.id)))
        .map((tag) => tag.attributes.label)
    const tags = tagLabels.slice(0, 2).join(', ') + (tagLabels.length > 2 ? ` +${tagLabels.length - 2} more` : '')
    const excerpt = removeMarkdown(body || '').slice(0, 220)
    const url = `/forum/p/${permalink}`

    return (
        // A motion item, so the feed can slide rows into a new order and fade rows in and out.
        <motion.li
            ref={rowRef}
            layout="position"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 40, opacity: { duration: 0.15 } }}
            className={`px-4 @xl:px-5 py-3 border-b border-primary ${pinned ? 'bg-accent' : ''}`}
        >
            {/* The topic and tags sit on the title's first line, at the right. Narrow windows leave them out. */}
            <div className="flex items-baseline gap-4">
                {/* The icons are inline with the text, so they stay next to the last word of a long title. */}
                <Link to={url} wrapperClassName="flex-1 min-w-0" className="block !no-underline group">
                    {pinned && (
                        <IconPinFilled
                            className="inline size-4 mr-1.5 align-[-2px] text-red dark:text-yellow"
                            aria-label="Pinned"
                        />
                    )}
                    <span className="font-semibold text-[15px] text-primary group-hover:underline">{subject}</span>
                    {resolved && (
                        <span className="inline-flex items-center gap-0.5 ml-1.5 text-xs font-semibold text-green">
                            <IconCheck className="size-3.5" /> Solved
                        </span>
                    )}
                    {locked && (
                        <IconLock className="inline size-3.5 ml-1.5 align-[-2px] text-muted" aria-label="Locked" />
                    )}
                </Link>
                {((showTags && tags) || (showTopic && topic)) && (
                    <div className="hidden @xl:flex shrink-0 items-center gap-1.5 text-xs leading-5 whitespace-nowrap">
                        {showTags && tags && (
                            <span className="flex items-center gap-1 rounded-full border border-primary px-2 text-muted">
                                <IconTag className="size-3.5" />
                                {tags}
                            </span>
                        )}
                        {showTopic && topic && (
                            <Link
                                to={`/forum/t/${topic.slug}`}
                                wrapperClassName="flex"
                                className="flex items-center gap-1 rounded-full border border-primary px-2 font-medium text-secondary !no-underline hover:text-primary"
                            >
                                <TopicIcon icon={topic.icon} className="size-3.5" />#{topic.slug}
                            </Link>
                        )}
                    </div>
                )}
            </div>
            {excerpt && (
                // The title is the link for keyboards and screen readers; this is only a bigger click target.
                <Link to={url} tabIndex={-1} aria-hidden className="block !no-underline">
                    <span className="block text-sm text-secondary truncate mt-0.5">{excerpt}</span>
                </Link>
            )}
            {/* The meta line and the latest reply share one line. Every item is a flex item, so all are centered. */}
            <div className="flex items-center gap-4 mt-1.5 text-[13px] leading-5 text-muted">
                {/* One line, so a wrapped line never starts with a dot. The topic shortens to fit. */}
                <div className="flex-1 flex items-center gap-1.5 whitespace-nowrap min-w-0 overflow-hidden">
                    {author ? <ProfileLink profile={author} /> : <span className="shrink-0">Anonymous</span>}
                    {/* A published draft dates from when it went live. */}
                    <span className="shrink-0">· {dayjs(publishedAt || createdAt).fromNow()}</span>
                    {/* Wider windows show the topic at the top right. */}
                    {showTopic && topic && (
                        <span className="flex @xl:hidden items-center gap-1.5 min-w-0">
                            ·
                            <Link
                                to={`/forum/t/${topic.slug}`}
                                // Link wraps the anchor in a span, which must also be able to shrink.
                                wrapperClassName="flex min-w-0"
                                className="flex items-center gap-1 min-w-0 font-medium text-secondary !no-underline hover:!underline"
                            >
                                <TopicIcon icon={topic.icon} className="size-3.5 shrink-0" />
                                <span className="truncate">#{topic.slug}</span>
                            </Link>
                        </span>
                    )}
                    <span className="shrink-0">· {numReplies ? commentCount(numReplies) : 'No replies'}</span>
                    {/* Very narrow windows keep the author, time, topic, and comments; points go. */}
                    {numUpvotes > 0 && (
                        <span className="hidden @xl:block shrink-0">
                            · {numUpvotes} {numUpvotes === 1 ? 'point' : 'points'}
                        </span>
                    )}
                </div>
                {lastReplier && lastReplyAt && (
                    <div className="hidden @2xl:flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                        <ProfileLink profile={lastReplier} />
                        <span>replied {dayjs(lastReplyAt).fromNow()}</span>
                    </div>
                )}
            </div>
        </motion.li>
    )
}
