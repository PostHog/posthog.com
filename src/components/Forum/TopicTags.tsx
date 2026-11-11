import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconArrowLeft, IconPencil, IconPlus, IconSearch, IconSpinner, IconTrash } from '@posthog/icons'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { OSInput, OSTextarea } from 'components/OSForm'
import { RadioGroup } from 'components/RadixUI/RadioGroup'
import { useUser } from 'hooks/useUser'
import DialogSelect from './DialogSelect'
import { ForumTag, ForumTopic, TagInput, useForumTagSearch, useForumTags } from './hooks'
import TopicIcon from './TopicIcon'

// The server allows no more tags per topic than this, because automatic tagging asks about each one.
const MAX_TAGS_PER_TOPIC = 30

const postCount = (tag: ForumTag) => tag.attributes.questions?.data?.attributes?.count ?? 0
const plural = (count: number) => `${count} ${count === 1 ? 'post' : 'posts'}`

// The name and description fields, for a new tag and for an edit. Jev reads both when it picks tags for a post.
const TagFields = ({
    initial,
    saveLabel,
    onSave,
    onCancel,
}: {
    initial: TagInput
    saveLabel: string
    onSave: (values: TagInput) => Promise<void>
    onCancel: () => void
}) => {
    const [values, setValues] = useState(initial)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    const save = async () => {
        setSaving(true)
        setError('')
        try {
            await onSave({ label: values.label.trim(), description: values.description?.trim() || null })
        } catch (err) {
            setError((err as Error).message)
            setSaving(false)
        }
    }

    return (
        <form
            className="space-y-2"
            onSubmit={(e) => {
                e.preventDefault()
                if (values.label.trim()) save()
            }}
        >
            <OSInput
                label="Name"
                direction="column"
                required
                autoFocus
                value={values.label}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, label: e.target.value })}
            />
            <OSTextarea
                label="Description"
                direction="column"
                rows={2}
                description="Optional. Say what the tag covers, so Jev can tell when a post fits it."
                value={values.description ?? ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setValues({ ...values, description: e.target.value })
                }
            />
            {error && <p className="m-0 text-sm text-red dark:text-yellow">{error}</p>}
            <div className="flex justify-end gap-2">
                <OSButton size="sm" type="button" onClick={onCancel}>
                    Cancel
                </OSButton>
                <OSButton size="sm" variant="primary" type="submit" disabled={saving || !values.label.trim()}>
                    {saving ? 'Saving…' : saveLabel}
                </OSButton>
            </div>
        </form>
    )
}

// Delete, in the tag's own row: remove the tag from its posts, or move them to another tag in the same topic.
const DeleteTag = ({
    tag,
    others,
    onDone,
    onCancel,
}: {
    tag: ForumTag
    others: ForumTag[]
    onDone: () => void
    onCancel: () => void
}) => {
    const { deleteTag } = useForumTags()
    const count = postCount(tag)
    const [action, setAction] = useState<'remove' | 'move'>('remove')
    const [moveTo, setMoveTo] = useState<number | null>(null)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState('')
    const ready = action === 'remove' || !!moveTo

    const confirm = async () => {
        setDeleting(true)
        setError('')
        try {
            await deleteTag(tag.id, action === 'move' ? moveTo ?? undefined : undefined)
            onDone()
        } catch (err) {
            setError((err as Error).message)
            setDeleting(false)
        }
    }

    return (
        <div className="space-y-2 rounded border border-primary bg-accent p-3 text-sm">
            <p className="m-0 font-semibold">Delete “{tag.attributes.label}”?</p>
            {count > 0 ? (
                <>
                    <RadioGroup
                        title="Its posts"
                        value={action}
                        onValueChange={(value) => setAction(value as 'remove' | 'move')}
                        options={[
                            { label: `Remove it from its ${plural(count)}`, value: 'remove' },
                            ...(others.length
                                ? [{ label: `Move its ${plural(count)} to another tag`, value: 'move' }]
                                : []),
                        ]}
                    />
                    {action === 'move' && (
                        <DialogSelect
                            label="Move to"
                            placeholder="Choose a tag"
                            options={others.map((other) => ({ label: other.attributes.label, value: other.id }))}
                            value={moveTo}
                            onChange={setMoveTo}
                        />
                    )}
                </>
            ) : (
                <p className="m-0 text-secondary">No posts have this tag.</p>
            )}
            <p className="m-0 text-muted">
                {action === 'move'
                    ? 'Subscriptions to this tag move to the other tag.'
                    : 'Subscriptions to this tag are also deleted.'}
            </p>
            {error && <p className="m-0 text-red dark:text-yellow">{error}</p>}
            <div className="flex justify-end gap-2">
                <OSButton size="sm" onClick={onCancel}>
                    Cancel
                </OSButton>
                <OSButton size="sm" variant="primary" disabled={!ready || deleting} onClick={confirm}>
                    {deleting ? 'Deleting…' : action === 'move' ? 'Move posts and delete' : 'Delete tag'}
                </OSButton>
            </div>
        </div>
    )
}

const TagRow = ({ tag, others, onChange }: { tag: ForumTag; others: ForumTag[]; onChange: () => void }) => {
    const { updateTag } = useForumTags()
    const [mode, setMode] = useState<'view' | 'edit' | 'delete'>('view')
    const { label, description } = tag.attributes

    return (
        <motion.li
            layout="position"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="py-3 border-b border-primary last:border-b-0"
        >
            {mode === 'edit' ? (
                <TagFields
                    initial={{ label, description }}
                    saveLabel="Save"
                    onCancel={() => setMode('view')}
                    onSave={async (values) => {
                        await updateTag(tag.id, values)
                        onChange()
                        setMode('view')
                    }}
                />
            ) : (
                <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                        <div className="font-semibold">{label}</div>
                        <p className={`m-0 text-sm ${description ? 'text-secondary' : 'text-muted italic'}`}>
                            {description || 'No description'}
                        </p>
                    </div>
                    <span className="shrink-0 text-sm text-muted leading-6">{plural(postCount(tag))}</span>
                    <div className="flex shrink-0">
                        <OSButton
                            size="sm"
                            icon={<IconPencil />}
                            aria-label={`Edit ${label}`}
                            tooltip="Edit"
                            onClick={() => setMode('edit')}
                        />
                        <OSButton
                            size="sm"
                            icon={<IconTrash />}
                            aria-label={`Delete ${label}`}
                            tooltip="Delete"
                            onClick={() => setMode(mode === 'delete' ? 'view' : 'delete')}
                        />
                    </div>
                </div>
            )}
            {mode === 'delete' && (
                <div className="mt-2">
                    <DeleteTag tag={tag} others={others} onDone={onChange} onCancel={() => setMode('view')} />
                </div>
            )}
        </motion.li>
    )
}

// Staff only. A topic's own tags: search, add, edit the name and description, and delete (with the option to move
// posts to another tag). Tags belong to exactly one topic.
export default function TopicTags({ topic }: { topic: ForumTopic }) {
    const { isModerator } = useUser()
    const { createTag } = useForumTags()
    const { slug, icon } = topic.attributes
    const [query, setQuery] = useState('')
    const [search, setSearch] = useState('')
    const [adding, setAdding] = useState(false)
    const { tags, total, hasMore, isLoading, isValidating, loadMore, refresh } = useForumTagSearch(topic.id, search)
    // Every tag in the topic, for the "move to" choice and the limit. A topic has at most 30.
    const allTags = topic.attributes.tags?.data ?? []
    const full = allTags.length >= MAX_TAGS_PER_TOPIC
    const searching = query !== search || isValidating

    // Search after typing stops. A new search starts again from the first 10.
    useEffect(() => {
        const timer = setTimeout(() => setSearch(query), 250)
        return () => clearTimeout(timer)
    }, [query])

    if (!isModerator) {
        return <div className="px-6 py-12 text-center text-secondary">Only staff can manage tags.</div>
    }

    return (
        <div className="@container">
            <div className="px-4 @xl:px-5 py-2 border-b border-primary text-sm text-secondary">
                <Link
                    to={`/forum/t/${slug}`}
                    className="inline-flex items-center gap-1.5 !no-underline text-secondary hover:text-primary"
                >
                    <IconArrowLeft className="size-4" />#{slug}
                </Link>
            </div>
            <div className="max-w-3xl mx-auto px-4 @xl:px-6 py-5 space-y-4">
                <header>
                    <h1 className="text-2xl font-bold text-primary leading-tight m-0 flex items-center gap-2">
                        <TopicIcon icon={icon} className="size-6 text-secondary" />
                        Tags in #{slug}
                    </h1>
                    <p className="text-sm text-secondary m-0 mt-1">
                        Tags belong to this topic only. Jev picks them for new posts from their names and descriptions.
                        A topic can have up to {MAX_TAGS_PER_TOPIC} tags ({allTags.length} now).
                    </p>
                </header>
                <div className="flex items-center gap-2">
                    <label className="flex-1 flex items-center gap-2 rounded border border-primary bg-primary px-2 py-1.5 text-muted">
                        {searching ? (
                            <IconSpinner className="size-4 shrink-0 animate-spin" aria-label="Searching" />
                        ) : (
                            <IconSearch className="size-4 shrink-0" />
                        )}
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Find a tag…"
                            aria-label="Find a tag"
                            className="w-full bg-transparent border-none p-0 text-sm text-primary focus:ring-0"
                        />
                    </label>
                    <OSButton
                        size="md"
                        variant="primary"
                        icon={<IconPlus />}
                        disabled={adding || full}
                        tooltip={full ? `This topic already has ${MAX_TAGS_PER_TOPIC} tags` : undefined}
                        onClick={() => setAdding(true)}
                    >
                        New tag
                    </OSButton>
                </div>
                <AnimatePresence initial={false}>
                    {adding && (
                        <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="rounded border border-primary p-3"
                        >
                            <TagFields
                                // A search with no match is a likely name for the new tag.
                                initial={{ label: tags.length ? '' : query.trim(), description: '' }}
                                saveLabel="Add tag"
                                onCancel={() => setAdding(false)}
                                onSave={async (values) => {
                                    await createTag(topic.id, values)
                                    await refresh()
                                    setAdding(false)
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                <ul className={`list-none m-0 p-0 transition-opacity duration-150 ${searching ? 'opacity-60' : ''}`}>
                    <AnimatePresence initial={false}>
                        {tags.map((tag) => (
                            <TagRow
                                key={tag.id}
                                tag={tag}
                                others={allTags.filter((other) => other.id !== tag.id)}
                                onChange={() => refresh()}
                            />
                        ))}
                    </AnimatePresence>
                    {!isLoading && !searching && tags.length === 0 && (
                        <li className="py-6 text-center text-sm text-muted">
                            {search.trim() ? `No tags match “${search.trim()}”.` : 'This topic has no tags yet.'}
                        </li>
                    )}
                </ul>
                {hasMore && (
                    <div className="flex items-center justify-between gap-2 text-sm text-secondary">
                        <span>
                            {tags.length} of {total} tags
                        </span>
                        <OSButton size="sm" disabled={isLoading} onClick={loadMore}>
                            {isLoading ? 'Loading…' : 'Load more'}
                        </OSButton>
                    </div>
                )}
            </div>
        </div>
    )
}
