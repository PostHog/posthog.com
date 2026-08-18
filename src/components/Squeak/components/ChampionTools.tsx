import React, { useState } from 'react'
import { IconArchive, IconUndo } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { QuestionData, StrapiRecord } from 'lib/strapi'
import { useToast } from '../../../context/Toast'
import { TopicSelector } from './TopicSelector'
import { XIcon } from 'lucide-react'
import Link from 'components/Link'
import usePostHog from 'hooks/usePostHog'

/**
 * Forum moderation tools available to community champions as well as moderators.
 *
 * Deliberately kept separate from the "Moderator tools" panel in Question.tsx rather
 * than merged into one capability-driven panel. Champions are non-employees, and the
 * moderator panel renders the author's email address plus links into Strapi and
 * PostHog. Keeping that markup in a file champions never render means a future edit
 * here cannot accidentally expose it.
 *
 * Only put reversible, non-PII, non-destructive actions in here. Blocking users,
 * deleting content, gifting points and granting achievements stay moderator-only.
 */

type ChampionToolsProps = {
    question: StrapiRecord<QuestionData>
    onPublishChange: (published: boolean) => Promise<void>
    onEscalate: (note?: string) => Promise<void>
    onRemoveTopic: (topic: any) => void
}

export default function ChampionTools({
    question,
    onPublishChange,
    onEscalate,
    onRemoveTopic,
}: ChampionToolsProps): JSX.Element {
    const { addToast } = useToast()
    const posthog = usePostHog()
    const [publishing, setPublishing] = useState(false)
    const [escalateState, setEscalateState] = useState<'idle' | 'sending' | 'sent'>('idle')
    const [note, setNote] = useState('')

    const published = !!question.attributes.publishedAt
    const topics = question.attributes?.topics?.data ?? []

    const handlePublishToggle = async () => {
        setPublishing(true)
        try {
            await onPublishChange(published)
            addToast({
                title: published ? 'Thread hidden' : 'Thread restored',
                description: published
                    ? "It's no longer visible to the community. You can restore it from here."
                    : "It's visible to the community again.",
            })
        } catch (error) {
            addToast({
                title: published ? "Couldn't hide thread" : "Couldn't restore thread",
                description: 'Please try again.',
                error: true,
            })
            posthog?.captureException?.(error)
        } finally {
            setPublishing(false)
        }
    }

    const handleEscalate = async () => {
        if (escalateState !== 'idle') return
        setEscalateState('sending')
        try {
            await onEscalate(note.trim() || undefined)
            setEscalateState('sent')
            setNote('')
            addToast({
                title: 'Escalated',
                description: 'A PostHog moderator has been notified in Slack and will take a look.',
            })
        } catch (error) {
            setEscalateState('idle')
            addToast({
                title: 'Escalation failed',
                description: "The moderators couldn't be notified. Please try again.",
                error: true,
            })
            posthog?.captureException?.(error)
        }
    }

    return (
        <div className="p-4 pb-0">
            <div className="bg-accent rounded-md p-6 text-primary border border-border">
                <h4 className="text-xs opacity-70 mb-2 -mt-2 p-0 font-semibold uppercase">Champion tools</h4>

                <OSButton
                    variant="secondary"
                    size="sm"
                    onClick={handlePublishToggle}
                    disabled={publishing}
                    icon={published ? <IconArchive /> : <IconUndo />}
                >
                    {publishing ? (published ? 'Hiding…' : 'Restoring…') : published ? 'Hide thread' : 'Restore thread'}
                </OSButton>

                {!published && (
                    <p className="!text-sm mt-3 mb-0 italic">
                        This thread is hidden from the community. Hidden threads don't appear in the questions list, so
                        keep this page open if you might restore it — the moderator Slack notification also links back
                        here.
                    </p>
                )}

                <div className="mt-4 border-t border-border pt-4">
                    <h4 className="text-xs text-primary opacity-70 p-0 m-0 mb-2 font-semibold uppercase">
                        Escalate to PostHog
                    </h4>
                    <p className="!text-sm mt-0 mb-2">
                        Posts this thread to Slack for a PostHog moderator to pick up. Use it when something needs a
                        team member — a bug, an unhappy customer, or a decision that isn't yours to make.
                    </p>
                    <textarea
                        className="w-full text-sm p-2 rounded border border-primary bg-primary text-primary mb-2"
                        rows={2}
                        placeholder="Optional: what should they know?"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        disabled={escalateState !== 'idle'}
                    />
                    <OSButton
                        variant="secondary"
                        size="sm"
                        onClick={handleEscalate}
                        disabled={escalateState !== 'idle'}
                    >
                        {escalateState === 'sending'
                            ? 'Escalating…'
                            : escalateState === 'sent'
                            ? 'Escalated ✓'
                            : 'Escalate'}
                    </OSButton>
                </div>

                <div className="mt-4 border-t border-border pt-4">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs text-primary opacity-70 p-0 m-0 font-semibold uppercase">
                            Forum topics
                        </h4>
                        <TopicSelector questionId={question.id} permalink={question.attributes.permalink} />
                    </div>
                    <ul className="flex items-center list-none p-0 flex-wrap">
                        {topics.map((topic) => (
                            <li
                                key={topic.id}
                                className="bg-white dark:bg-white/10 py-0.5 px-2 rounded-sm whitespace-nowrap mr-2 my-2 inline-flex items-center space-x-1.5"
                            >
                                <Link to={`/questions/topic/${topic.attributes.slug}`} className="text-yellow text-sm">
                                    {topic.attributes.label}
                                </Link>
                                <button onClick={() => onRemoveTopic(topic)} aria-label="Remove topic">
                                    <XIcon className="h-4 w-4 text-primary" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
