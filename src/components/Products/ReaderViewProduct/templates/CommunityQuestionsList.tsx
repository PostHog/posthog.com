import React from 'react'
import { IconCheckCircle } from '@posthog/icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'components/Link'
import getAvatarURL from 'components/Squeak/util/getAvatar'
import { QuestionData, StrapiResult } from 'lib/strapi'

dayjs.extend(relativeTime)

const AI_BOT_PROFILE_ID = 28378

const AVATAR_COLORS = ['blue', 'green', 'salmon', 'purple', 'yellow', 'teal', 'orange', 'seagreen', 'lilac'] as const

function avatarColorClass(id: number | string | undefined): string {
    const n = typeof id === 'number' ? id : parseInt(String(id ?? 0), 10) || 0
    return AVATAR_COLORS[Math.abs(n) % AVATAR_COLORS.length]
}

type Props = {
    questions: Omit<StrapiResult<QuestionData[]>, 'meta'>
    isLoading: boolean
    currentPage?: { url: string; title: string }
    forumUrl: string
}

const MAX_VISIBLE = 4

const AvatarStack = ({ profiles }: { profiles: any[] }) => {
    const visible = profiles.slice(0, MAX_VISIBLE)
    const overflow = Math.max(profiles.length - visible.length, 0)
    const sizing = 'size-7 @md/reader-content:size-8'

    return (
        <div className="flex shrink-0 items-center">
            {visible.map((p, i) => {
                const url = getAvatarURL(p)
                const first = p?.attributes?.firstName ?? ''
                const last = p?.attributes?.lastName ?? ''
                const name = `${first} ${last}`.trim() || 'Community member'
                return (
                    <div
                        key={p?.id ?? i}
                        className={`relative ${sizing} rounded-full ring-2 ring-white dark:ring-dark overflow-hidden ${
                            i === 0 ? '' : '-ml-2 @md/reader-content:-ml-2.5'
                        } ${url ? 'bg-accent' : `bg-${avatarColorClass(p?.id)}`}`}
                        style={{ zIndex: visible.length - i }}
                        title={name}
                    >
                        {url ? (
                            <img src={url} alt={name} className="size-full object-cover" />
                        ) : (
                            <div className="size-full flex items-center justify-center text-white text-sm font-bold leading-none">
                                {(first[0] || '?').toUpperCase()}
                            </div>
                        )}
                    </div>
                )
            })}
            {overflow > 0 && (
                <div
                    className={`relative -ml-2 @md/reader-content:-ml-2.5 ${sizing} rounded-full ring-2 ring-white dark:ring-dark bg-accent text-primary text-xs font-bold flex items-center justify-center`}
                    aria-label={`${overflow} more participants`}
                >
                    +{overflow}
                </div>
            )}
        </div>
    )
}

const Row = ({ question, currentPage }: { question: QuestionData; currentPage?: { url: string; title: string } }) => {
    const {
        attributes: { profile, subject, permalink, replies, resolved, activeAt },
    } = question as any

    if (!profile?.data) return null

    const askerProfile = profile.data
    const replyData = replies?.data ?? []

    const numReplies =
        replyData.filter(
            (reply: any) =>
                reply?.attributes?.profile?.data?.id !== AI_BOT_PROFILE_ID || reply?.attributes?.helpful !== false
        ).length || 0

    const replyProfiles = replyData.map((r: any) => r?.attributes?.profile?.data).filter(Boolean)

    const seen = new Set<string | number>()
    const participants = [askerProfile, ...replyProfiles].filter((p: any) => {
        if (!p?.id || seen.has(p.id) || p.id === AI_BOT_PROFILE_ID) return false
        seen.add(p.id)
        return true
    })

    return (
        <li className="border-b border-primary first:border-t-0 last:border-b-0">
            <Link
                state={{ newWindow: true, preventScroll: true }}
                to={`/questions/${permalink}`}
                className="block group py-3"
            >
                <div className="flex items-center gap-4 @md/reader-content:gap-5">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-start gap-2">
                            <h3 className="m-0 !text-sm @md/reader-content:!text-base @2xl/reader-content:!text-lg font-semibold leading-snug text-primary line-clamp-2 group-hover:underline">
                                {subject}
                            </h3>
                            {resolved && (
                                <span className="text-green shrink-0 mt-0.5" title="Resolved">
                                    <IconCheckCircle className="size-3.5" />
                                </span>
                            )}
                        </div>
                        <div className="mt-0.5 flex flex-wrap items-center gap-x-1 gap-y-0.5 text-sm text-secondary">
                            <span>
                                {numReplies} {numReplies === 1 ? 'reply' : 'replies'}
                            </span>
                            <span aria-hidden>·</span>
                            <span>{dayjs(activeAt).fromNow()}</span>
                        </div>
                    </div>
                    <AvatarStack profiles={participants} />
                </div>
            </Link>
        </li>
    )
}

const SkeletonRow = () => (
    <li className="border-b border-primary last:border-b-0">
        <div className="py-3">
            <div className="flex items-center gap-4 @md/reader-content:gap-5">
                <div className="flex-1 min-w-0 space-y-2">
                    <div className="h-5 @md/reader-content:h-6 w-3/4 bg-accent rounded animate-pulse" />
                    <div className="h-3 w-1/3 bg-accent rounded animate-pulse" />
                </div>
                <div className="flex shrink-0 items-center">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={`size-7 @md/reader-content:size-8 rounded-full ring-2 ring-white dark:ring-dark bg-accent animate-pulse ${
                                i === 0 ? '' : '-ml-2 @md/reader-content:-ml-2.5'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    </li>
)

const CommunityQuestionsList = ({ questions, isLoading, currentPage, forumUrl }: Props) => {
    const items = (questions?.data ?? []).filter(Boolean)

    if (isLoading && items.length === 0) {
        return (
            <ul className="m-0 p-0 list-none">
                {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonRow key={i} />
                ))}
            </ul>
        )
    }

    if (!isLoading && items.length === 0) {
        return (
            <p className="text-base text-secondary m-0">
                No discussions yet.{' '}
                <Link
                    to={forumUrl}
                    state={{ newWindow: true, preventScroll: true }}
                    className="text-red dark:text-yellow font-semibold hover:underline"
                >
                    Be the first to ask
                </Link>
                .
            </p>
        )
    }

    return (
        <ul className="m-0 p-0 list-none">
            {items.map((question: any) => (
                <Row key={question.id} question={question} currentPage={currentPage} />
            ))}
        </ul>
    )
}

export default CommunityQuestionsList
