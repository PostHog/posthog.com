import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconCheck, IconPencil, IconSearch, IconSpinner, IconTrash, IconX } from '@posthog/icons'
import Modal from 'components/RadixUI/Modal'
import OSButton from 'components/OSButton'
import { ForumTag, useForumTagSearch, useForumTags } from './hooks'

const TagRow = ({ tag, onChange }: { tag: ForumTag; onChange: () => void }) => {
    const { updateTag, deleteTag } = useForumTags()
    const [label, setLabel] = useState(tag.attributes.label)
    const [editing, setEditing] = useState(false)
    const [confirming, setConfirming] = useState(false)
    const [error, setError] = useState('')

    const run = async (action: () => Promise<void>) => {
        setError('')
        try {
            await action()
            onChange()
        } catch (err) {
            setError((err as Error).message)
        }
    }

    return (
        <motion.li
            layout="position"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="py-1.5 border-b border-primary last:border-b-0"
        >
            <div className="flex items-center gap-2">
                {editing ? (
                    <input
                        autoFocus
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === 'Enter' && run(() => updateTag(tag.id, label)).then(() => setEditing(false))
                        }
                        className="flex-1 rounded border border-primary bg-primary px-2 py-1 text-sm"
                    />
                ) : (
                    <span className="flex-1">{tag.attributes.label}</span>
                )}
                {editing ? (
                    <>
                        <OSButton
                            size="sm"
                            icon={<IconCheck />}
                            aria-label="Save"
                            disabled={!label.trim()}
                            onClick={() => run(() => updateTag(tag.id, label.trim())).then(() => setEditing(false))}
                        />
                        <OSButton
                            size="sm"
                            icon={<IconX />}
                            aria-label="Cancel"
                            onClick={() => {
                                setLabel(tag.attributes.label)
                                setEditing(false)
                            }}
                        />
                    </>
                ) : confirming ? (
                    <>
                        <span className="text-xs text-secondary">Remove from all posts and topics?</span>
                        <OSButton
                            size="sm"
                            className="text-red dark:text-yellow font-semibold"
                            onClick={() => run(() => deleteTag(tag.id))}
                        >
                            Delete
                        </OSButton>
                        <OSButton size="sm" onClick={() => setConfirming(false)}>
                            Keep
                        </OSButton>
                    </>
                ) : (
                    <>
                        <OSButton
                            size="sm"
                            icon={<IconPencil />}
                            aria-label={`Rename ${tag.attributes.label}`}
                            onClick={() => setEditing(true)}
                        />
                        <OSButton
                            size="sm"
                            icon={<IconTrash />}
                            aria-label={`Delete ${tag.attributes.label}`}
                            onClick={() => setConfirming(true)}
                        />
                    </>
                )}
            </div>
            {error && <p className="m-0 mt-1 text-xs text-red dark:text-yellow">{error}</p>}
        </motion.li>
    )
}

// Staff only. Tags are shared between topics; each topic chooses its allowed tags in the topic form. One field
// searches the tags and, when no tag has that exact name, adds it.
export default function TagManager({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const { createTag } = useForumTags()
    const [query, setQuery] = useState('')
    const [search, setSearch] = useState('')
    const [error, setError] = useState('')
    const { tags, total, hasMore, isLoading, isValidating, loadMore, refresh } = useForumTagSearch(search)
    // Searching covers the wait for typing to stop and the request itself.
    const searching = query !== search || isValidating
    const name = query.trim()
    const exists = tags.some((tag) => tag.attributes.label.toLowerCase() === name.toLowerCase())

    // Search after typing stops. A new search starts again from the first 10.
    useEffect(() => {
        const timer = setTimeout(() => setSearch(query), 250)
        return () => clearTimeout(timer)
    }, [query])

    const add = async () => {
        setError('')
        try {
            await createTag(name)
            setQuery('')
            await refresh()
        } catch (err) {
            setError((err as Error).message)
        }
    }

    return (
        // Anchored to the top, not centered, so the dialog grows downward as results change.
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            title="Manage tags"
            maxWidth={480}
            contentClassName="!top-[10vh] !translate-y-0"
        >
            <div className="bg-primary text-primary p-4 space-y-3 text-sm max-h-[80vh] overflow-y-auto">
                <p className="m-0 text-secondary">
                    Deleting a tag removes it from every post and topic, and deletes its subscriptions.
                </p>
                <form
                    className="flex items-center gap-2"
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (name && !exists) add()
                    }}
                >
                    <label className="flex-1 flex items-center gap-2 rounded border border-primary bg-primary px-2 py-1.5 text-muted">
                        {searching ? (
                            <IconSpinner className="size-4 shrink-0 animate-spin" aria-label="Searching" />
                        ) : (
                            <IconSearch className="size-4 shrink-0" />
                        )}
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Find or add a tag…"
                            aria-label="Find or add a tag"
                            className="w-full bg-transparent border-none p-0 text-sm text-primary focus:ring-0"
                        />
                    </label>
                    <OSButton size="md" variant="primary" type="submit" disabled={!name || exists}>
                        Add tag
                    </OSButton>
                </form>
                {error && <p className="m-0 text-red dark:text-yellow">{error}</p>}
                <ul className={`list-none m-0 p-0 transition-opacity duration-150 ${searching ? 'opacity-60' : ''}`}>
                    <AnimatePresence initial={false}>
                        {tags.map((tag) => (
                            <TagRow key={tag.id} tag={tag} onChange={() => refresh()} />
                        ))}
                    </AnimatePresence>
                    {!isLoading && !searching && tags.length === 0 && (
                        <li className="text-muted py-2">
                            {search.trim() ? `No tags match “${search.trim()}”.` : 'No tags yet.'}
                        </li>
                    )}
                </ul>
                {hasMore && (
                    <div className="flex items-center justify-between gap-2 pt-1 text-secondary">
                        <span>
                            {tags.length} of {total} tags
                        </span>
                        <OSButton size="sm" disabled={isLoading} onClick={loadMore}>
                            {isLoading ? 'Loading…' : 'Load more'}
                        </OSButton>
                    </div>
                )}
            </div>
        </Modal>
    )
}
