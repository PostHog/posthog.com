import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import slugify from 'slugify'
import { IconFeatures, IconMessage, IconSpinner } from '@posthog/icons'
import { Logo } from '@posthog/brand/logo'
import { IconTag } from 'components/OSIcons'
import { useCommunityProfiles } from 'hooks/useCommunityProfiles'
import { useForumPostSearch, useForumTopics } from 'components/Forum/hooks'
import TopicIcon from 'components/Forum/TopicIcon'
import { CurrentQuestionContext } from './Question'
import Avatar from './Avatar'

// The editor's suggestion menus: `@` finds people, and `#` finds forum topics, tags, and posts. The editor owns the
// text and the caret; a menu only lists matches and says what to insert.

export type SuggestionTrigger = '@' | '#'

type Suggestion = { key: string; icon: React.ReactNode; label: string; detail?: string; insert: string }
type Group = { label?: string; items: Suggestion[] }

// The editor sends its key presses here first. A menu returns true for a key that it used.
export type SuggestionMenuHandle = { handleKey: (e: React.KeyboardEvent) => boolean }

type MenuProps = {
    query: string
    position: { top: number; left: number } | null
    onSelect: (insert: string) => void
    onClose: () => void
}

const AI_PROFILE_ID = Number(process.env.GATSBY_AI_PROFILE_ID)

const matches = (text: string | null | undefined, query: string) =>
    !query || (text || '').toLowerCase().includes(query.toLowerCase())

// Words that start with the query come before words that only contain it.
const byStart =
    <T,>(query: string, texts: (item: T) => (string | null | undefined)[]) =>
    (a: T, b: T) => {
        const starts = (item: T) =>
            texts(item).some((text) => (text || '').toLowerCase().startsWith(query.toLowerCase()))
        return Number(starts(b)) - Number(starts(a))
    }

const nameMatchesQuery = (first: string | null | undefined, last: string | null | undefined, query: string) => {
    if (!query) return true
    const q = query.toLowerCase()
    return (
        (first || '').toLowerCase().startsWith(q) ||
        (last || '').toLowerCase().startsWith(q) ||
        [first, last].filter(Boolean).join('').toLowerCase().startsWith(q)
    )
}

const isModProfile = (profile) => profile.attributes?.isTeamMember || !!profile.attributes?.startDate

// Mention tokens are `@name/id`. Strapi finds the id for the email, and Markdown links the token to the profile. The
// name part must be plain ASCII, or neither of them matches it.
const mentionToken = (profile) =>
    profile.id === AI_PROFILE_ID
        ? '@max'
        : `@${slugify(profile.attributes.firstName || '', { lower: true, strict: true }) || 'user'}/${profile.id}`

// Square brackets in a title would end the Markdown link text early, and a backslash would escape the closing one.
const linkText = (text: string) => text.replace(/[\\[\]]/g, '\\$&')

const SuggestionList = forwardRef<SuggestionMenuHandle, MenuProps & { groups: Group[]; loading?: boolean }>(
    function SuggestionList({ groups, loading, position, onSelect, onClose }, ref) {
        const items = groups.flatMap((group) => group.items)
        const [focused, setFocused] = useState(0)
        const listRef = useRef<HTMLUListElement>(null)

        // New matches start again from the first one.
        useEffect(() => setFocused(0), [items.map((item) => item.key).join()])

        useEffect(() => {
            listRef.current?.querySelector('[data-focused="true"]')?.scrollIntoView({ block: 'nearest' })
        }, [focused])

        useImperativeHandle(ref, () => ({
            handleKey: (e) => {
                if (e.key === 'Escape') {
                    onClose()
                    return true
                }
                // With no matches, Enter and the arrows keep their usual meaning in the text.
                if (!items.length) return false
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    const step = e.key === 'ArrowDown' ? 1 : -1
                    setFocused((prev) => (prev + step + items.length) % items.length)
                    return true
                }
                if (e.key === 'Enter' || e.key === 'Tab') {
                    onSelect(items[Math.min(focused, items.length - 1)].insert)
                    return true
                }
                return false
            },
        }))

        if (!items.length && !loading) return null

        let index = -1
        return (
            <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0, transition: { type: 'tween', duration: 0.1 } }}
                exit={{ opacity: 0, y: 4 }}
                className="w-64 absolute z-50"
                style={position ?? undefined}
                // A click on the menu must not move the caret out of the text.
                onMouseDown={(e) => e.preventDefault()}
            >
                <ul
                    ref={listRef}
                    role="listbox"
                    data-scheme="primary"
                    className="m-0 p-1 list-none border border-primary bg-primary text-primary shadow-lg max-h-64 rounded-md overflow-auto"
                >
                    {groups.map((group) =>
                        group.items.length ? (
                            <React.Fragment key={group.label ?? 'items'}>
                                {group.label && (
                                    <li className="px-2 pt-1.5 pb-0.5 text-xs font-semibold text-muted">
                                        {group.label}
                                    </li>
                                )}
                                {group.items.map((item) => {
                                    index += 1
                                    const itemIndex = index
                                    const isFocused = itemIndex === focused
                                    return (
                                        <li
                                            key={item.key}
                                            role="option"
                                            aria-selected={isFocused}
                                            data-focused={isFocused}
                                            onMouseEnter={() => setFocused(itemIndex)}
                                            onClick={() => onSelect(item.insert)}
                                            className={`flex items-center gap-2 rounded px-2 py-1 cursor-pointer text-sm ${
                                                isFocused ? 'bg-accent' : ''
                                            }`}
                                        >
                                            {item.icon}
                                            <span className="min-w-0 flex-1 truncate">{item.label}</span>
                                            {item.detail && (
                                                <span className="shrink-0 text-xs text-muted">{item.detail}</span>
                                            )}
                                        </li>
                                    )
                                })}
                            </React.Fragment>
                        ) : null
                    )}
                    {loading && !items.length && (
                        <li className="flex items-center gap-2 px-2 py-1 text-sm text-muted">
                            <IconSpinner className="size-4 animate-spin" />
                            Searching…
                        </li>
                    )}
                </ul>
            </motion.div>
        )
    }
)

const PersonIcon = ({ profile }) => (
    <span className="relative size-6 shrink-0 rounded-full">
        <Avatar
            className="w-full"
            image={profile.attributes.avatar?.data?.attributes?.url || profile.attributes.gravatarURL}
        />
        {isModProfile(profile) && (
            <span className="absolute -right-1 -bottom-1 size-3.5 flex items-center justify-center rounded-full bg-primary border border-primary">
                <Logo layout="logomark" className="w-2.5" />
            </span>
        )}
    </span>
)

// People in the thread come first, then a search of all profiles. Team members sort to the top.
const PeopleSuggestions = forwardRef<SuggestionMenuHandle, MenuProps>(function PeopleSuggestions(props, ref) {
    const { query } = props
    const currentQuestion = useContext(CurrentQuestionContext) ?? {}
    const question = currentQuestion?.question
    const threadProfiles = [
        question?.profile?.data,
        ...(question?.replies?.data || []).map((reply) => reply?.attributes?.profile?.data),
    ].filter(
        (profile, index, self) =>
            profile?.id &&
            profile.attributes &&
            self.findIndex((p) => p?.id === profile.id) === index &&
            nameMatchesQuery(profile.attributes.firstName, profile.attributes.lastName, query)
    )
    const { profiles: searchProfiles, isLoading } = useCommunityProfiles({
        filters: { search: query, compactName: true, sort: 'firstName:asc' },
        pageSize: 15,
        enabled: query.length > 0,
    })
    const threadIds = new Set(threadProfiles.map((profile) => profile.id))
    const profiles = [
        ...threadProfiles,
        ...searchProfiles
            .filter(
                (profile) =>
                    !threadIds.has(profile.id) &&
                    (profile.firstName || profile.lastName) &&
                    nameMatchesQuery(profile.firstName, profile.lastName, query)
            )
            .map((profile) => ({
                id: profile.id,
                attributes: {
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    avatar: { data: { attributes: { url: profile.avatarUrl } } },
                    isTeamMember: profile.isTeamMember,
                },
            })),
    ].sort((a, b) => Number(isModProfile(b)) - Number(isModProfile(a)))

    const items: Suggestion[] = profiles.map((profile) => {
        const isAI = profile.id === AI_PROFILE_ID
        return {
            key: `profile-${profile.id}`,
            icon: isAI ? <IconFeatures className="size-6 shrink-0 text-secondary" /> : <PersonIcon profile={profile} />,
            label: [profile.attributes.firstName, profile.attributes.lastName].filter(Boolean).join(' '),
            detail: isAI ? 'AI' : String(profile.id),
            insert: mentionToken(profile),
        }
    })
    return <SuggestionList ref={ref} {...props} groups={[{ items }]} loading={isLoading && query.length > 0} />
})

// Topics and tags are already loaded with the forum, so they match at once. Posts need a search, from two characters.
const ForumSuggestions = forwardRef<SuggestionMenuHandle, MenuProps>(function ForumSuggestions(props, ref) {
    const { query } = props
    const { topics } = useForumTopics()
    const { posts, isValidating } = useForumPostSearch(query)
    const [topicPart, tagPart] = query.includes('/') ? query.split('/') : [null, query]

    const topicItems: Suggestion[] = topicPart
        ? []
        : topics
              .filter((topic) => matches(topic.attributes.slug, query) || matches(topic.attributes.label, query))
              .sort(byStart(query, (topic) => [topic.attributes.slug, topic.attributes.label]))
              .slice(0, 5)
              .map((topic) => ({
                  key: `topic-${topic.id}`,
                  icon: <TopicIcon icon={topic.attributes.icon} className="size-4 text-secondary" />,
                  label: `#${topic.attributes.slug}`,
                  insert: `[#${topic.attributes.slug}](/forum/t/${topic.attributes.slug})`,
              }))
    // "topic/tag" narrows the tags to one topic.
    const tagItems: Suggestion[] = topics
        .filter((topic) => !topicPart || topic.attributes.slug.startsWith(topicPart.toLowerCase()))
        .flatMap((topic) =>
            (topic.attributes.tags?.data ?? []).map((tag) => ({ topic: topic.attributes.slug, tag: tag.attributes }))
        )
        .filter(({ tag }) => matches(tag.label, tagPart ?? '') || matches(tag.slug, tagPart ?? ''))
        .sort(byStart(tagPart ?? '', ({ tag }) => [tag.label, tag.slug]))
        .slice(0, 5)
        .map(({ topic, tag }) => ({
            key: `tag-${topic}-${tag.slug}`,
            icon: <IconTag className="size-4 shrink-0 text-secondary" />,
            label: tag.label,
            detail: `#${topic}`,
            insert: `[#${topic}/${tag.slug}](/forum/t/${topic}?tag=${tag.slug})`,
        }))
    const postItems: Suggestion[] = posts.map((post) => ({
        key: `post-${post.id}`,
        icon: <IconMessage className="size-4 shrink-0 text-secondary" />,
        label: post.attributes.subject,
        detail: post.attributes.forumTopic?.data ? `#${post.attributes.forumTopic.data.attributes.slug}` : undefined,
        insert: `[${linkText(post.attributes.subject)}](/forum/p/${post.attributes.permalink})`,
    }))

    return (
        <SuggestionList
            ref={ref}
            {...props}
            groups={[
                { label: 'Topics', items: topicItems },
                { label: 'Tags', items: tagItems },
                { label: 'Posts', items: postItems },
            ]}
            loading={isValidating && query.length >= 2}
        />
    )
})

export const SuggestionMenu = forwardRef<SuggestionMenuHandle, MenuProps & { trigger: SuggestionTrigger }>(
    function SuggestionMenu({ trigger, ...props }, ref) {
        return trigger === '@' ? <PeopleSuggestions ref={ref} {...props} /> : <ForumSuggestions ref={ref} {...props} />
    }
)
