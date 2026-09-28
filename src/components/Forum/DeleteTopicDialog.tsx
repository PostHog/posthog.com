import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import Modal from 'components/RadixUI/Modal'
import { RadioGroup } from 'components/RadixUI/RadioGroup'
import OSButton from 'components/OSButton'
import DialogSelect from './DialogSelect'
import { ForumTopic, useForumTopics } from './hooks'
import TopicIcon from './TopicIcon'

const plural = (count: number) => `${count} post${count === 1 ? '' : 's'}`

// A topic with posts must move them or delete them. The API can also detach them, but the forum does not offer that.
export default function DeleteTopicDialog({
    topic,
    onOpenChange,
}: {
    topic?: ForumTopic
    onOpenChange: (open: boolean) => void
}) {
    const { topics, countPosts, deleteTopic } = useForumTopics()
    const [count, setCount] = useState<number | null>(null)
    const [action, setAction] = useState<'move' | 'delete'>('move')
    const [moveTo, setMoveTo] = useState<number | undefined>()
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setCount(null)
        setError('')
        setAction('move')
        setMoveTo(undefined)
        if (topic)
            countPosts(topic.id)
                .then(setCount)
                .catch((err) => setError(err.message))
    }, [topic?.id])

    if (!topic) return null
    const slug = topic.attributes.slug
    const hasPosts = !!count
    const ready = count !== null && (!hasPosts || action === 'delete' || !!moveTo)

    const confirm = async () => {
        setDeleting(true)
        setError('')
        try {
            await deleteTopic(
                topic.id,
                hasPosts
                    ? action === 'move'
                        ? { action: 'move', moveTo: moveTo as number }
                        : { action: 'delete' }
                    : undefined
            )
            onOpenChange(false)
            navigate('/forum')
        } catch (err) {
            setError((err as Error).message)
        }
        setDeleting(false)
    }

    return (
        <Modal open={!!topic} onOpenChange={onOpenChange} title={`Delete #${slug}`} maxWidth={480}>
            <div className="bg-primary text-primary p-4 space-y-3 text-sm">
                {count === null ? (
                    <p className="m-0 text-secondary">Counting posts…</p>
                ) : hasPosts ? (
                    <>
                        <p className="m-0 text-secondary">
                            This topic has <strong className="text-primary">{plural(count)}</strong>. Choose what
                            happens to {count === 1 ? 'it' : 'them'}.
                        </p>
                        <RadioGroup
                            title="Posts"
                            value={action}
                            onValueChange={(value) => setAction(value as 'move' | 'delete')}
                            options={[
                                { label: 'Move posts to another topic', value: 'move' },
                                { label: 'Delete posts and their comments', value: 'delete' },
                            ]}
                        />
                        {action === 'move' ? (
                            <>
                                <DialogSelect
                                    label="Move to"
                                    placeholder="Choose a topic"
                                    options={topics
                                        .filter((t) => t.id !== topic.id)
                                        .map((t) => ({
                                            label: `#${t.attributes.slug}`,
                                            value: t.id,
                                            icon: <TopicIcon icon={t.attributes.icon} />,
                                        }))}
                                    value={moveTo}
                                    onChange={setMoveTo}
                                />
                                <p className="m-0 text-secondary">Posts keep their comments, tags, and pins.</p>
                            </>
                        ) : (
                            <p className="m-0 font-semibold text-red dark:text-yellow">
                                This deletes {plural(count)} and all {count === 1 ? 'its' : 'their'} comments. You
                                cannot undo this.
                            </p>
                        )}
                    </>
                ) : (
                    <p className="m-0 text-secondary">This topic has no posts.</p>
                )}
                <p className="m-0 text-muted">Subscriptions to this topic are also deleted.</p>
                {error && <p className="m-0 text-red dark:text-yellow">{error}</p>}
                <div className="flex justify-end gap-2 pt-1">
                    <OSButton size="md" onClick={() => onOpenChange(false)}>
                        Cancel
                    </OSButton>
                    <OSButton size="md" variant="primary" disabled={!ready || deleting} onClick={confirm}>
                        {deleting
                            ? 'Deleting…'
                            : hasPosts
                            ? action === 'move'
                                ? `Move ${plural(count as number)} and delete topic`
                                : `Delete topic and ${plural(count as number)}`
                            : 'Delete topic'}
                    </OSButton>
                </div>
            </div>
        </Modal>
    )
}
