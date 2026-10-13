import React from 'react'
import useSWR from 'swr'
import qs from 'qs'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import removeMarkdown from 'remove-markdown'
import { useInView } from 'react-intersection-observer'
import { IconCheck } from '@posthog/icons'
import { Logo } from '@posthog/brand/logo'
import Link from 'components/Link'
import HoverCard from 'components/RadixUI/HoverCard'
import { forumPathForLegacyQuestionsPath } from 'components/Forum/LegacyQuestionsRedirect'
import { commentCount, ProfileAvatar } from 'components/Forum/PostRow'
import TopicIcon from 'components/Forum/TopicIcon'
import { ForumTopicData, ProfileData, QuestionData, StrapiData, StrapiRecord } from 'lib/strapi'
import Avatar from './Avatar'
import LevelBadge from './LevelBadge'
import getAvatarURL from '../util/getAvatar'

dayjs.extend(relativeTime)

const API = `${process.env.GATSBY_SQUEAK_API_HOST}/api`
const AI_PROFILE_ID = Number(process.env.GATSBY_AI_PROFILE_ID)
const SITE_HOSTNAMES = ['posthog.com', 'www.posthog.com']
const PROFILE_PATH = /^\/community\/profiles\/(\d+)\/?$/
const POST_PATH = /^\/forum\/p\/([^/]+)\/?$/
const POST_EXCERPT_LENGTH = 300

type Reference =
    | { type: 'profile'; profileId: number; path: string }
    | { type: 'post'; permalink: string; path: string }

type ProfilePreview = StrapiRecord<
    Pick<
        ProfileData,
        | 'firstName'
        | 'lastName'
        | 'pronouns'
        | 'companyRole'
        | 'company'
        | 'location'
        | 'reputation'
        | 'createdAt'
        | 'gravatarURL'
        | 'avatar'
    > & {
        color: string | null
        startDate: string | null
        teams?: StrapiData<{ name: string }[]>
    }
>

type PostPreview = StrapiRecord<
    Pick<QuestionData, 'subject' | 'body' | 'createdAt' | 'publishedAt' | 'numReplies' | 'resolved' | 'profile'> & {
        forumTopic?: { data: StrapiRecord<Pick<ForumTopicData, 'slug' | 'icon'>> | null }
    }
>

const profileQuery = qs.stringify(
    {
        fields: [
            'firstName',
            'lastName',
            'pronouns',
            'companyRole',
            'company',
            'location',
            'reputation',
            'startDate',
            'createdAt',
            'color',
            'gravatarURL',
        ],
        populate: { avatar: { fields: ['url'] }, teams: { fields: ['name'] } },
    },
    { encodeValuesOnly: true }
)

const postQuery = (permalink: string) =>
    qs.stringify(
        {
            filters: { permalink: { $eq: permalink } },
            fields: ['subject', 'body', 'createdAt', 'publishedAt', 'numReplies', 'resolved'],
            populate: {
                profile: { fields: ['firstName', 'color', 'gravatarURL'], populate: { avatar: { fields: ['url'] } } },
                forumTopic: { fields: ['slug', 'icon'] },
            },
            pagination: { pageSize: 1 },
        },
        { encodeValuesOnly: true }
    )

const fetchJson = async (url: string) => {
    const res = await fetch(url)
    return res.ok ? res.json() : null
}

const loadOncePerSession = { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false }

const useProfilePreview = (profileId: number | null) =>
    useSWR<ProfilePreview | null>(
        profileId ? `${API}/profiles/${profileId}?${profileQuery}` : null,
        async (url: string) => (await fetchJson(url))?.data ?? null,
        loadOncePerSession
    )

const usePostPreview = (permalink: string) =>
    useSWR<PostPreview | null>(
        `${API}/questions?${postQuery(permalink)}`,
        async (url: string) => (await fetchJson(url))?.data?.[0] ?? null,
        loadOncePerSession
    )

const parseReference = (href: string): Reference | null => {
    let url: URL
    try {
        url = new URL(href, 'https://posthog.com')
    } catch {
        return null
    }
    if (!SITE_HOSTNAMES.includes(url.hostname)) return null

    const profileId = url.pathname.match(PROFILE_PATH)?.[1]
    if (profileId) return { type: 'profile', profileId: Number(profileId), path: url.pathname }

    const forumPath = url.pathname.startsWith('/questions/')
        ? forumPathForLegacyQuestionsPath(url.pathname)
        : url.pathname
    const permalink = forumPath.match(POST_PATH)?.[1]
    return permalink ? { type: 'post', permalink, path: `${forumPath}${url.hash}` } : null
}

const textOf = (children: React.ReactNode) =>
    React.Children.toArray(children)
        .map((child) => (typeof child === 'string' ? child : ''))
        .join('')

const placeholderNameFromMention = (mention: string) => {
    const slug = mention.match(/^@([^/\s]+)/)?.[1]
    return slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Profile'
}

const chipName = (profile: ProfilePreview) => {
    const { firstName, lastName } = profile.attributes
    const isAI = profile.id === AI_PROFILE_ID
    return (isAI ? [firstName, lastName].filter(Boolean).join(' ') : firstName) || 'Anonymous'
}

const CardSkeleton = () => (
    <div className="space-y-2 motion-safe:animate-pulse">
        <div className="h-4 w-2/3 rounded bg-accent" />
        <div className="h-3 w-full rounded bg-accent" />
        <div className="h-3 w-1/2 rounded bg-accent" />
    </div>
)

const ProfileCard = ({ profileId }: { profileId: number }) => {
    const { data: profile, isLoading } = useProfilePreview(profileId)

    if (isLoading) return <CardSkeleton />
    if (!profile) return <p className="m-0 text-sm text-muted">This profile is not available.</p>

    const { firstName, lastName, pronouns, companyRole, company, location, reputation, createdAt, color, startDate } =
        profile.attributes
    const isTeamMember = !!startDate
    const role = [companyRole, isTeamMember ? 'PostHog' : company].filter(Boolean).join(' at ')
    const teamName = profile.attributes.teams?.data?.[0]?.attributes.name

    return (
        <div className="flex gap-3 text-sm">
            <span className="relative shrink-0 self-start">
                <Avatar className="size-12" image={getAvatarURL(profile)} color={color ?? undefined} />
                {isTeamMember && (
                    <span className="absolute -right-1 -bottom-1 size-5 flex items-center justify-center rounded-full bg-primary border border-primary">
                        <Logo layout="logomark" className="w-3.5" />
                    </span>
                )}
            </span>
            <div className="min-w-0">
                <p className="m-0 text-[15px] font-semibold leading-tight">
                    {[firstName, lastName].filter(Boolean).join(' ') || 'Anonymous'}
                    {pronouns && <span className="ml-1 text-xs font-normal text-muted">({pronouns})</span>}
                </p>
                {role && <p className="m-0 mt-0.5 text-secondary">{role}</p>}
                {teamName && <p className="m-0 text-secondary">{teamName} Team</p>}
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
                    <LevelBadge points={reputation} tooltip={false} />
                    {location && <span>{location}</span>}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
            </div>
        </div>
    )
}

const PostCard = ({ permalink }: { permalink: string }) => {
    const { data: post, isLoading } = usePostPreview(permalink)

    if (isLoading) return <CardSkeleton />
    if (!post) return <p className="m-0 text-sm text-muted">This post is not available.</p>

    const { subject, body, createdAt, publishedAt, numReplies, resolved, profile, forumTopic } = post.attributes
    const topic = forumTopic?.data?.attributes
    const author = profile?.data
    const excerpt = removeMarkdown(body || '').slice(0, POST_EXCERPT_LENGTH)

    return (
        <div className="text-sm">
            {topic && (
                <p className="m-0 mb-1 flex items-center gap-1 text-xs text-secondary">
                    <TopicIcon icon={topic.icon} className="size-3.5" />#{topic.slug}
                </p>
            )}
            <p className="m-0 text-[15px] font-semibold leading-snug line-clamp-2">{subject}</p>
            {excerpt && <p className="m-0 mt-1 text-secondary line-clamp-3">{excerpt}</p>}
            <div className="mt-2 flex items-center gap-1.5 whitespace-nowrap text-xs text-muted">
                {author && (
                    <>
                        <ProfileAvatar profile={author} className="size-4" />
                        <span className="font-medium text-primary">{author.attributes.firstName || 'Anonymous'}</span>
                        <span>·</span>
                    </>
                )}
                <span>{dayjs(publishedAt || createdAt).fromNow()}</span>
                <span>· {numReplies ? commentCount(numReplies) : 'No replies'}</span>
                {resolved && (
                    <span className="inline-flex items-center gap-0.5 font-semibold text-green">
                        <IconCheck className="size-3.5" /> Solved
                    </span>
                )}
            </div>
        </div>
    )
}

export const ProfileHoverCard = ({
    profileId,
    triggerClassName,
    children,
}: {
    profileId: number
    triggerClassName?: string
    children: React.ReactNode
}) => (
    <HoverCard trigger={children} triggerClassName={triggerClassName} contentClassName="w-72">
        <ProfileCard profileId={profileId} />
    </HoverCard>
)

const PostHoverCard = ({ permalink, children }: { permalink: string; children: React.ReactNode }) => (
    <HoverCard trigger={children} contentClassName="w-80">
        <PostCard permalink={permalink} />
    </HoverCard>
)

type MarkdownLinkProps = { href?: string; title?: string; children?: React.ReactNode; node?: unknown }

const MARKDOWN_LINK_REL = 'nofollow noopener noreferrer'

const ProfileChip = ({
    profileId,
    path,
    placeholderName,
    title,
    children,
}: {
    profileId: number
    path: string
    placeholderName: string
    title?: string
    children: React.ReactNode
}) => {
    const { ref, inView } = useInView({ triggerOnce: true })
    const { data: profile } = useProfilePreview(inView ? profileId : null)

    if (profile === null) {
        return (
            <Link rel={MARKDOWN_LINK_REL} title={title} to={path} state={{ newWindow: true }}>
                {children}
            </Link>
        )
    }

    return (
        <ProfileHoverCard profileId={profileId}>
            <Link
                rel={MARKDOWN_LINK_REL}
                title={title}
                to={path}
                state={{ newWindow: true }}
                className="not-prose whitespace-nowrap rounded-full border border-primary bg-accent py-px pl-px pr-2 font-semibold text-primary !no-underline hover:border-secondary"
            >
                <span
                    ref={ref}
                    className="mr-1 inline-block size-[1.25em] overflow-hidden rounded-full bg-primary align-[-0.26em]"
                >
                    {profile && (
                        <img
                            src={getAvatarURL(profile)}
                            alt=""
                            loading="lazy"
                            className="size-full rounded-full object-cover"
                        />
                    )}
                </span>
                {profile ? chipName(profile) : placeholderName}
            </Link>
        </ProfileHoverCard>
    )
}

export const ReferenceLink = ({ href = '', title, children }: MarkdownLinkProps) => {
    const reference = parseReference(href)
    const text = textOf(children)
    const isMentionOrBareUrl = text.startsWith('@') || text === href

    if (reference?.type === 'profile' && isMentionOrBareUrl) {
        return (
            <ProfileChip
                profileId={reference.profileId}
                path={reference.path}
                placeholderName={placeholderNameFromMention(text)}
                title={title}
            >
                {children}
            </ProfileChip>
        )
    }

    const link = (
        <Link rel={MARKDOWN_LINK_REL} title={title} to={reference?.path ?? href} state={{ newWindow: true }}>
            {children}
        </Link>
    )

    if (reference?.type === 'profile')
        return <ProfileHoverCard profileId={reference.profileId}>{link}</ProfileHoverCard>
    if (reference?.type === 'post') return <PostHoverCard permalink={reference.permalink}>{link}</PostHoverCard>
    return link
}
