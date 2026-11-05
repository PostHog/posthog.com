import React, { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import removeMarkdown from 'remove-markdown'
import { IconTrash } from '@posthog/icons'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../context/App'
import { useForumDrafts } from './hooks'
import TopicIcon from './TopicIcon'
import DeletePostDialog from './DeletePostDialog'
import { FeedSkeleton } from './Feed'

dayjs.extend(relativeTime)

// The signed-in user's unpublished posts. Only their author can see them.
export default function Drafts() {
    const { user } = useUser()
    const { openSignIn } = useApp()
    const { questions, isFirstLoad, refresh } = useForumDrafts()
    const [deleting, setDeleting] = useState<number | null>(null)
    const drafts = questions.data

    if (!user) {
        return (
            <div className="px-6 py-12 text-center text-sm text-secondary space-y-3">
                <h1 className="text-2xl font-bold text-primary m-0">Drafts</h1>
                <p className="m-0">Sign in to see your drafts.</p>
                <OSButton variant="primary" size="md" onClick={() => openSignIn()}>
                    Sign in
                </OSButton>
            </div>
        )
    }

    return (
        <div className="@container">
            <header className="px-4 @xl:px-5 pt-4 pb-3 border-b border-primary">
                <h1 className="text-2xl font-bold text-primary leading-tight m-0">Drafts</h1>
                <p className="text-sm text-secondary m-0 mt-0.5">
                    Posts that you saved but did not publish. Only you can see them.
                </p>
            </header>
            <ul className="list-none m-0 p-0">
                {drafts.map((draft) => {
                    const topic = draft.attributes.forumTopic?.data?.attributes
                    return (
                        <li
                            key={draft.id}
                            className="flex items-center gap-3 px-4 @xl:px-5 py-3 border-b border-primary"
                        >
                            <div className="flex-1 min-w-0">
                                <Link to={`/forum/new?draft=${draft.id}`} className="block !no-underline group">
                                    <span className="font-semibold text-[15px] text-primary group-hover:underline">
                                        {draft.attributes.subject || 'Untitled draft'}
                                    </span>
                                    <span className="block text-sm text-secondary truncate mt-0.5">
                                        {removeMarkdown(draft.attributes.body || '').slice(0, 200)}
                                    </span>
                                </Link>
                                <div className="flex items-center gap-2 mt-1 text-[13px] text-secondary">
                                    {topic && (
                                        <span className="inline-flex items-center gap-1 font-semibold text-primary">
                                            <TopicIcon icon={topic.icon} className="size-3.5 text-secondary" />#
                                            {topic.slug}
                                        </span>
                                    )}
                                    <span>· edited {dayjs(draft.attributes.updatedAt).fromNow()}</span>
                                </div>
                            </div>
                            <OSButton
                                size="md"
                                icon={<IconTrash />}
                                tooltip="Delete draft"
                                aria-label="Delete draft"
                                onClick={() => setDeleting(draft.id)}
                            />
                        </li>
                    )
                })}
            </ul>
            {isFirstLoad && <FeedSkeleton rows={2} />}
            {!isFirstLoad && drafts.length === 0 && (
                <div className="px-6 py-12 text-center text-secondary text-sm">
                    No drafts. Use <strong className="text-primary">Save draft</strong> in a new post to keep it for
                    later.
                </div>
            )}
            {deleting && (
                <DeletePostDialog
                    draft
                    postId={deleting}
                    open={!!deleting}
                    onOpenChange={(open) => !open && setDeleting(null)}
                    onDeleted={() => refresh()}
                />
            )}
        </div>
    )
}
