import React, { useState } from 'react'
import Modal from 'components/RadixUI/Modal'
import Switch from 'components/RadixUI/Switch'
import OSButton from 'components/OSButton'
import { OSInput, OSTextarea } from 'components/OSForm'
import DialogSelect from './DialogSelect'
import { ForumTopic, TopicInput, toSlug, useForumTopics } from './hooks'
import TopicIcon, { iconNames } from './TopicIcon'

const iconOptions = iconNames.map((name) => ({
    label: name.replace(/^Icon/, ''),
    value: name,
    icon: <TopicIcon icon={name} />,
}))

const Form = ({ topic, onDone, onDelete }: { topic?: ForumTopic; onDone: () => void; onDelete: () => void }) => {
    const { topics, createTopic, updateTopic } = useForumTopics()
    const current = topic?.attributes
    const [values, setValues] = useState({
        label: current?.label ?? '',
        slug: current?.slug ?? '',
        description: current?.description ?? '',
        icon: current?.icon ?? null,
        solutionsEnabled: current?.solutionsEnabled ?? false,
        aiRepliesEnabled: current?.aiRepliesEnabled ?? false,
    })
    const [slugEdited, setSlugEdited] = useState(!!topic)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const set = (field: keyof typeof values, value: unknown) => setValues((prev) => ({ ...prev, [field]: value }))

    const save = async () => {
        setSaving(true)
        setError('')
        try {
            const data: TopicInput = {
                ...values,
                // A new topic goes to the bottom of the sidebar; moderators move topics from the sidebar menu.
                sortOrder: current
                    ? current.sortOrder ?? 0
                    : Math.max(-1, ...topics.map((t) => t.attributes.sortOrder ?? 0)) + 1,
            }
            if (topic) await updateTopic(topic.id, data)
            else await createTopic(data)
            onDone()
        } catch (err) {
            setError((err as Error).message)
        }
        setSaving(false)
    }

    return (
        <div className="p-4 space-y-3 max-h-[80vh] overflow-y-auto">
            <OSInput
                label="Name"
                direction="column"
                required
                value={values.label}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    set('label', e.target.value)
                    if (!slugEdited) set('slug', toSlug(e.target.value))
                }}
            />
            <OSInput
                label="Slug"
                direction="column"
                required
                description={`/forum/t/${values.slug || 'slug'}`}
                value={values.slug}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSlugEdited(true)
                    set('slug', toSlug(e.target.value))
                }}
            />
            <OSTextarea
                label="Description"
                direction="column"
                rows={2}
                value={values.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => set('description', e.target.value)}
            />
            {/* Type an icon's name while the list is open to jump to it. */}
            <DialogSelect
                label="Icon"
                options={iconOptions}
                value={values.icon}
                onChange={(icon) => set('icon', icon)}
                placeholder="Choose an icon"
            />
            <div className="grid @md:grid-cols-2 gap-3">
                <div className="p-3 rounded border border-primary">
                    <Switch
                        label="Solutions"
                        checked={values.solutionsEnabled}
                        onChange={(checked) => set('solutionsEnabled', checked)}
                    />
                    <p className="text-sm text-secondary m-0 mt-1">Authors can mark a comment as the answer.</p>
                </div>
                <div className="p-3 rounded border border-primary">
                    <Switch
                        label="AI replies"
                        checked={values.aiRepliesEnabled}
                        onChange={(checked) => set('aiRepliesEnabled', checked)}
                    />
                    <p className="text-sm text-secondary m-0 mt-1">Max replies to new posts automatically.</p>
                </div>
            </div>
            {error && <p className="text-sm text-red dark:text-yellow m-0">{error}</p>}
            <div className="flex items-center gap-2 pt-1">
                {topic && (
                    <OSButton size="md" className="text-red dark:text-yellow font-semibold" onClick={onDelete}>
                        Delete topic…
                    </OSButton>
                )}
                <div className="ml-auto flex gap-2">
                    <OSButton size="md" onClick={onDone}>
                        Cancel
                    </OSButton>
                    <OSButton
                        size="md"
                        variant="primary"
                        disabled={saving || !values.label.trim() || !values.slug}
                        onClick={save}
                    >
                        {saving ? 'Saving…' : topic ? 'Save changes' : 'Create topic'}
                    </OSButton>
                </div>
            </div>
        </div>
    )
}

// Staff only. Creates a topic, or edits one and links to its delete dialog.
export default function TopicForm({
    open,
    topic,
    onOpenChange,
    onDelete,
}: {
    open: boolean
    topic?: ForumTopic
    onOpenChange: (open: boolean) => void
    onDelete: (topic: ForumTopic) => void
}) {
    return (
        <Modal open={open} onOpenChange={onOpenChange} title={topic ? 'Edit topic' : 'New topic'} maxWidth={560}>
            <div className="bg-primary text-primary @container">
                {open && (
                    <Form
                        key={topic?.id ?? 'new'}
                        topic={topic}
                        onDone={() => onOpenChange(false)}
                        onDelete={() => topic && onDelete(topic)}
                    />
                )}
            </div>
        </Modal>
    )
}
