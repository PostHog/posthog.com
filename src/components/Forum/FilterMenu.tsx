import React, { useMemo, useState } from 'react'
import { IconBell, IconChevronDown, IconFilter, IconSearch } from '@posthog/icons'
import { Popover } from 'components/RadixUI/Popover'
import { Checkbox } from 'components/RadixUI/Checkbox'
import OSButton from 'components/OSButton'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../context/App'
import { ForumTag, useForumSubscriptions } from './hooks'

// Filters for a feed: posts with no reply, and tags. Selected tags stay in the menu; a bell shows for subscribed
// tags, or on hover.
export default function FilterMenu({
    tags,
    selected,
    onChange,
    unanswered,
    onUnansweredChange,
    scope,
}: {
    tags: ForumTag[]
    selected: number[]
    onChange: (tagIds: number[]) => void
    unanswered: boolean
    onUnansweredChange: (unanswered: boolean) => void
    scope: string
}) {
    const [query, setQuery] = useState('')
    const { user } = useUser()
    const { openSignIn } = useApp()
    const { tagSubscription, subscribe, unsubscribe } = useForumSubscriptions()

    const topicOf = (tag: ForumTag) => tag.attributes.topic?.data?.attributes.slug ?? ''
    const grouped = new Set(tags.map(topicOf)).size > 1
    const visible = useMemo(() => {
        const q = query.trim().toLowerCase()
        const found = q ? tags.filter((tag) => tag.attributes.label.toLowerCase().includes(q)) : tags
        return grouped ? [...found].sort((a, b) => topicOf(a).localeCompare(topicOf(b))) : found
    }, [tags, query, grouped])

    const count = selected.length + (unanswered ? 1 : 0)

    const toggle = (id: number) =>
        onChange(selected.includes(id) ? selected.filter((tagId) => tagId !== id) : [...selected, id])

    const toggleSubscription = (tag: ForumTag) => {
        if (!user) return openSignIn()
        const subscription = tagSubscription(tag.id)
        return subscription ? unsubscribe(subscription.id) : subscribe({ forumTag: tag.id }, 'dailyDigest')
    }

    return (
        <Popover
            dataScheme="primary"
            align="start"
            contentClassName="w-72 !p-0"
            trigger={
                <span>
                    <OSButton size="sm" icon={<IconFilter />} className="border border-primary" active={count > 0}>
                        <span className="flex items-center gap-1">
                            Filter
                            {count > 0 && (
                                <span className="rounded-full bg-primary px-1.5 text-xs font-bold leading-4 border border-primary">
                                    {count}
                                </span>
                            )}
                            <IconChevronDown className="size-3.5 text-muted" />
                        </span>
                    </OSButton>
                </span>
            }
        >
            <div className="flex flex-col text-sm">
                <div
                    className={`flex items-center gap-2 px-3 py-2 hover:bg-accent ${
                        tags.length > 0 ? 'border-b border-primary' : ''
                    }`}
                >
                    <Checkbox
                        id="forum-unanswered"
                        checked={unanswered}
                        onCheckedChange={() => onUnansweredChange(!unanswered)}
                    />
                    <label
                        htmlFor="forum-unanswered"
                        className={`flex-1 cursor-pointer ${unanswered ? 'font-semibold' : ''}`}
                    >
                        No replies yet
                    </label>
                </div>
                {/* A topic with no tags still gets the reply filter. */}
                {tags.length > 0 && (
                    <>
                        <label className="m-2 flex items-center gap-2 rounded border border-primary px-2 py-1 text-muted">
                            <IconSearch className="size-3.5" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Find a tag…"
                                className="w-full bg-transparent border-none p-0 text-sm text-primary focus:ring-0"
                            />
                        </label>
                        <div className="px-3 pb-1 text-xs text-muted">{scope}</div>
                        <ul className="max-h-72 overflow-y-auto list-none m-0 p-0">
                            {visible.map((tag, index) => {
                                const subscribed = !!tagSubscription(tag.id)
                                const checked = selected.includes(tag.id)
                                // Tags belong to one topic, so a list from several topics groups them under a heading.
                                const topicSlug = tag.attributes.topic?.data?.attributes.slug
                                const newGroup =
                                    grouped && topicSlug !== visible[index - 1]?.attributes.topic?.data?.attributes.slug
                                return (
                                    <React.Fragment key={tag.id}>
                                        {newGroup && (
                                            <li className="px-3 pt-2 pb-0.5 text-xs font-semibold text-muted">
                                                #{topicSlug}
                                            </li>
                                        )}
                                        <li className="group flex items-center gap-2 px-3 py-1 hover:bg-accent">
                                            <Checkbox
                                                id={`forum-tag-${tag.id}`}
                                                checked={checked}
                                                onCheckedChange={() => toggle(tag.id)}
                                            />
                                            <label
                                                htmlFor={`forum-tag-${tag.id}`}
                                                className={`flex-1 cursor-pointer ${checked ? 'font-semibold' : ''}`}
                                            >
                                                {tag.attributes.label}
                                            </label>
                                            <button
                                                onClick={() => toggleSubscription(tag)}
                                                aria-label={
                                                    subscribed
                                                        ? `Unsubscribe from ${tag.attributes.label}`
                                                        : `Subscribe to ${tag.attributes.label}`
                                                }
                                                aria-pressed={subscribed}
                                                className={`size-6 rounded flex items-center justify-center ${
                                                    subscribed
                                                        ? 'text-red dark:text-yellow'
                                                        : 'text-muted opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-primary border border-transparent hover:border-primary'
                                                }`}
                                            >
                                                <IconBell className="size-3.5" />
                                            </button>
                                        </li>
                                    </React.Fragment>
                                )
                            })}
                            {visible.length === 0 && <li className="px-3 py-2 text-muted">No tags</li>}
                        </ul>
                    </>
                )}
                {(tags.length > 0 || count > 0) && (
                    <div className="flex items-center border-t border-primary px-3 py-2 text-xs text-secondary">
                        {tags.length > 0 && 'Shows posts with any selected tag'}
                        {count > 0 && (
                            <button
                                onClick={() => {
                                    onChange([])
                                    onUnansweredChange(false)
                                }}
                                className="ml-auto underline"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                )}
            </div>
        </Popover>
    )
}
