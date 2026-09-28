import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import {
    IconArchive,
    IconArrowLeft,
    IconCheck,
    IconFolderMove,
    IconLock,
    IconPencil,
    IconPin,
    IconShield,
    IconSparkles,
    IconTrash,
    IconUndo,
    IconUnlock,
} from '@posthog/icons'
import { QuestionForm, useQuestion } from 'components/Squeak'
import { AskMax, CurrentQuestionContext } from 'components/Squeak/components/Question'
import { Replies } from 'components/Squeak/components/Replies'
import { Profile } from 'components/Squeak/components/Profile'
import Days from 'components/Squeak/components/Days'
import LevelBadge from 'components/Squeak/components/LevelBadge'
import Markdown from 'components/Squeak/components/Markdown'
import EditWrapper from 'components/Squeak/components/EditWrapper'
import ReportSpamButton from 'components/Squeak/components/ReportSpamButton'
import SubscribeButton from 'components/Squeak/components/SubscribeButton'
import QuestionSkeleton from 'components/Squeak/components/QuestionSkeleton'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import Modal from 'components/RadixUI/Modal'
import DialogSelect from './DialogSelect'
import SEO from 'components/seo'
import { useUser } from 'hooks/useUser'
import { useToast } from '../../context/Toast'
import { useWindow } from '../../context/Window'
import { ForumTopic, useForumPost } from './hooks'
import ForumMenu, { ForumMenuItem } from './ForumMenu'
import VoteBox from './VoteBox'
import TopicIcon from './TopicIcon'
import { commentCount, TagPills } from './PostRow'
import DeletePostDialog from './DeletePostDialog'

type MaxRequest = { manual: boolean; withContext: boolean }

const MoveDialog = ({
    open,
    onOpenChange,
    topics,
    currentTopicId,
    onMove,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    topics: ForumTopic[]
    currentTopicId?: number
    onMove: (topicId: number) => Promise<void>
}) => {
    const [topicId, setTopicId] = useState<number | undefined>()
    const [saving, setSaving] = useState(false)
    const options = topics
        .filter((topic) => topic.id !== currentTopicId)
        .map((topic) => ({
            label: `#${topic.attributes.slug}`,
            value: topic.id,
            icon: <TopicIcon icon={topic.attributes.icon} />,
        }))

    return (
        <Modal open={open} onOpenChange={onOpenChange} title="Move to topic" maxWidth={420}>
            <div className="bg-primary text-primary p-4 space-y-3 text-sm">
                <DialogSelect
                    label="Topic"
                    placeholder="Choose a topic"
                    options={options}
                    value={topicId}
                    onChange={setTopicId}
                />
                <p className="text-secondary m-0">The post keeps its comments, tags, and pin.</p>
                <div className="flex justify-end gap-2">
                    <OSButton size="md" onClick={() => onOpenChange(false)}>
                        Cancel
                    </OSButton>
                    <OSButton
                        size="md"
                        variant="primary"
                        disabled={!topicId || saving}
                        onClick={async () => {
                            if (!topicId) return
                            setSaving(true)
                            await onMove(topicId)
                            setSaving(false)
                            onOpenChange(false)
                        }}
                    >
                        Move post
                    </OSButton>
                </div>
            </div>
        </Modal>
    )
}

// Moderators' toggle chips for a topic's allowed tags. The server does not check allowedTags, so the UI limits the choice.
const TagPicker = ({
    topic,
    value,
    onChange,
}: {
    topic?: ForumTopic
    value: number[]
    onChange: (tagIds: number[]) => void
}) => {
    const tags = topic?.attributes.allowedTags?.data ?? []
    return (
        <div>
            <div className="text-[15px] mb-1">
                Tags {topic && <span className="text-muted text-sm">(from #{topic.attributes.slug})</span>}
            </div>
            {tags.length === 0 ? (
                <p className="text-sm text-muted m-0">{topic ? 'This topic has no tags.' : 'Choose a topic first.'}</p>
            ) : (
                <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => {
                        const active = value.includes(tag.id)
                        return (
                            <button
                                type="button"
                                key={tag.id}
                                aria-pressed={active}
                                onClick={() =>
                                    onChange(active ? value.filter((id) => id !== tag.id) : [...value, tag.id])
                                }
                                className={`inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-sm ${
                                    active
                                        ? 'border-secondary font-semibold text-primary'
                                        : 'border-primary text-secondary hover:text-primary'
                                }`}
                            >
                                {active && <IconCheck className="size-3.5" />}
                                {tag.attributes.label}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

const TagsDialog = ({
    open,
    onOpenChange,
    topic,
    initialTags,
    onSave,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    topic?: ForumTopic
    initialTags: number[]
    onSave: (tagIds: number[]) => Promise<void>
}) => {
    const [tagIds, setTagIds] = useState(initialTags)
    const [saving, setSaving] = useState(false)

    useEffect(() => setTagIds(initialTags), [open])

    return (
        <Modal open={open} onOpenChange={onOpenChange} title="Edit tags" maxWidth={480}>
            <div className="bg-primary text-primary p-4 space-y-3 text-sm">
                <TagPicker topic={topic} value={tagIds} onChange={setTagIds} />
                <div className="flex justify-end gap-2">
                    <OSButton size="md" onClick={() => onOpenChange(false)}>
                        Cancel
                    </OSButton>
                    <OSButton
                        size="md"
                        variant="primary"
                        disabled={saving}
                        onClick={async () => {
                            setSaving(true)
                            await onSave(tagIds)
                            setSaving(false)
                            onOpenChange(false)
                        }}
                    >
                        Save tags
                    </OSButton>
                </div>
            </div>
        </Modal>
    )
}

export default function Thread({ permalink, topics }: { permalink: string; topics: ForumTopic[] }) {
    const { user, isModerator, isForumModerator, notifications, setNotifications } = useUser()
    const { appWindow } = useWindow()
    const { addToast } = useToast()
    const { updatePost } = useForumPost()
    const [expanded, setExpanded] = useState(true)
    const [editing, setEditing] = useState(false)
    const [dialog, setDialog] = useState<'move' | 'tags' | 'delete' | null>(null)
    const [maxRequests, setMaxRequests] = useState<MaxRequest[]>([])
    const {
        question,
        isLoading,
        reply,
        handlePublishReply,
        handleResolve,
        handleReplyDelete,
        voteReply,
        pinTopics,
        mutate,
    } = useQuestion(permalink)

    const post = question?.attributes
    const topic = post?.forumTopic?.data
    const fullTopic = topics.find((t) => t.id === topic?.id)

    // A new post asks Max once, and only in topics with AI replies on; the server refuses the rest.
    useEffect(() => {
        if (appWindow?.location?.state?.askMax && topic?.attributes.aiRepliesEnabled) {
            setMaxRequests([{ manual: false, withContext: false }])
        }
    }, [topic?.id])

    // Opening a thread clears its reply notifications, the same as the question view.
    useEffect(() => {
        if (!question?.id || !notifications?.length) return
        const remaining = notifications.filter((notification: any) => notification.question?.id !== question.id)
        if (remaining.length !== notifications.length) setNotifications(remaining)
    }, [notifications, question?.id])

    if (isLoading) return <QuestionSkeleton isInForum />
    if (!question || !post) {
        return (
            <div className="p-8 text-center text-secondary">
                <p className="font-semibold text-primary">This post does not exist.</p>
                <Link to="/forum">Back to all posts</Link>
            </div>
        )
    }
    if (!topic) {
        return (
            <div className="p-8 text-center text-secondary">
                <p className="font-semibold text-primary">This question is not a forum post.</p>
                <Link to={`/questions/${permalink}`}>Open it in questions</Link>
            </div>
        )
    }

    const isAuthor = post.profile?.data?.id === user?.profile?.id
    const locked = !!post.locked
    const canReply = !locked || isForumModerator

    const moderate = async (data: Record<string, unknown>, done: string) => {
        try {
            await updatePost(question.id, data)
            await mutate()
            addToast({ title: done, description: post.subject })
        } catch (error) {
            addToast({ error: true, title: 'That did not work', description: (error as Error).message })
        }
    }

    const moderatorItems: ForumMenuItem[] = [
        {
            label: post.pinnedToTopic ? `Unpin from #${topic.attributes.slug}` : `Pin to #${topic.attributes.slug}`,
            icon: <IconPin />,
            onClick: () => moderate({ pinnedToTopic: !post.pinnedToTopic }, post.pinnedToTopic ? 'Unpinned' : 'Pinned'),
        },
        {
            label: locked ? 'Unlock replies' : 'Lock replies',
            icon: locked ? <IconUnlock /> : <IconLock />,
            onClick: () => moderate({ locked: !locked }, locked ? 'Replies unlocked' : 'Replies locked'),
        },
        { label: 'Move to topic…', icon: <IconFolderMove />, onClick: () => setDialog('move'), hasSubmenu: true },
        { label: 'Edit tags…', icon: <IconPencil />, onClick: () => setDialog('tags'), hasSubmenu: true },
        'divider',
        {
            label: post.archived ? 'Restore' : 'Archive',
            icon: post.archived ? <IconUndo /> : <IconArchive />,
            onClick: () => moderate({ archived: !post.archived }, post.archived ? 'Restored' : 'Archived'),
        },
        ...(isModerator
            ? [
                  {
                      label: 'Ask Max to reply',
                      icon: <IconSparkles />,
                      onClick: () => setMaxRequests([...maxRequests, { manual: true, withContext: true }]),
                  },
              ]
            : []),
    ]

    return (
        <CurrentQuestionContext.Provider
            value={{
                question: { id: question.id, ...post },
                handlePublishReply,
                handleResolve,
                handleReplyDelete,
                voteReply,
                pinTopics,
                mutate,
            }}
        >
            <SEO title={post.subject} />
            <div className="@container">
                <div className="px-4 @xl:px-5 py-2 border-b border-primary text-sm text-secondary flex items-center">
                    <Link
                        to={`/forum/t/${topic.attributes.slug}`}
                        className="inline-flex items-center gap-1.5 !no-underline text-secondary hover:text-primary"
                    >
                        <IconArrowLeft className="size-4" />#{topic.attributes.slug}
                    </Link>
                </div>

                {/* The post and its replies share one centered column, so a wide or expanded window does not
                    leave the thread on the left. */}
                <div className="max-w-[54rem] mx-auto">
                    <article className="px-4 @xl:px-6 py-5 flex gap-4">
                        <VoteBox postId={question.id} numUpvotes={post.numUpvotes} hasUpvoted={post.hasUpvoted} />
                        <div className="flex-1 min-w-0 max-w-3xl">
                            {post.archived && (
                                <p className="m-0 mb-3 p-2 text-sm rounded border border-primary bg-accent">
                                    This post is archived. Only its author and moderators can see it.
                                </p>
                            )}
                            <h1 className="text-2xl font-bold text-primary leading-tight m-0">{post.subject}</h1>
                            <div className="flex items-center gap-2 mt-2 flex-wrap text-sm text-secondary">
                                <Profile profile={post.profile?.data} />
                                <LevelBadge points={post.profile?.data?.attributes?.reputation} />
                                {/* A published draft dates from when it went live, not from when it was first saved. */}
                                <Days
                                    created={post.publishedAt || post.createdAt}
                                    profile={post.profile?.data}
                                    edits={post.edits}
                                />
                                <TagPills tags={post.forumTags} />
                                <div className="ml-auto flex items-center">
                                    {isForumModerator && (
                                        <ForumMenu
                                            items={moderatorItems}
                                            trigger={
                                                <span>
                                                    <OSButton
                                                        icon={<IconShield />}
                                                        size="md"
                                                        tooltip="Moderate"
                                                        aria-label="Moderate"
                                                    />
                                                </span>
                                            }
                                        />
                                    )}
                                    {/* Reply emails: the thread subscription that Squeak questions use */}
                                    <SubscribeButton contentType="question" id={question.id} />
                                    {!isAuthor && <ReportSpamButton type="question" id={question.id} />}
                                    {(isAuthor || isModerator) && (
                                        <OSButton
                                            onClick={() => setDialog('delete')}
                                            icon={<IconTrash />}
                                            size="md"
                                            tooltip="Delete post"
                                            aria-label="Delete post"
                                        />
                                    )}
                                    {isAuthor && !editing && !locked && (
                                        <OSButton
                                            onClick={() => setEditing(true)}
                                            icon={<IconPencil />}
                                            size="md"
                                            tooltip="Edit post"
                                            aria-label="Edit post"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="mt-4">
                                <EditWrapper
                                    data={question}
                                    type="question"
                                    onSubmit={() => mutate()}
                                    onEditingChange={setEditing}
                                    editing={editing}
                                >
                                    <Markdown className="question-content">{post.body}</Markdown>
                                </EditWrapper>
                            </div>
                        </div>
                    </article>

                    <div className="px-4 @xl:px-6">
                        <div className="flex items-center gap-2 border-t border-primary pt-3 pb-1 text-sm">
                            <strong>{commentCount(post.numReplies ?? 0)}</strong>
                            <span className="text-muted">· oldest first</span>
                            {locked && (
                                <span className="ml-auto inline-flex items-center gap-1 text-muted">
                                    <IconLock className="size-3.5" /> Locked
                                </span>
                            )}
                        </div>
                        <Replies expanded={expanded} setExpanded={setExpanded} isInForum />
                        {maxRequests.map((request, index) => (
                            <AskMax
                                key={`ask-max-${index}`}
                                question={question}
                                refresh={mutate}
                                manual={request.manual}
                                withContext={request.withContext}
                                isInForum
                            />
                        ))}
                        <div className="py-4">
                            {canReply ? (
                                <QuestionForm
                                    archived={post.archived}
                                    questionId={question.id}
                                    formType="reply"
                                    reply={reply}
                                    onSubmit={(_values, _formType, data) => {
                                        if (data?.askMax) {
                                            setMaxRequests([...maxRequests, { manual: false, withContext: true }])
                                        }
                                    }}
                                    isInForum
                                />
                            ) : (
                                <p className="m-0 p-3 text-sm text-center rounded border border-primary bg-accent">
                                    A moderator locked this post, so it does not accept new comments.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <DeletePostDialog
                postId={question.id}
                numComments={post.numReplies ?? 0}
                open={dialog === 'delete'}
                onOpenChange={(open) => setDialog(open ? 'delete' : null)}
                onDeleted={() => navigate(`/forum/t/${topic.attributes.slug}`)}
            />
            <MoveDialog
                open={dialog === 'move'}
                onOpenChange={(open) => setDialog(open ? 'move' : null)}
                topics={topics}
                currentTopicId={topic.id}
                onMove={(forumTopic) => moderate({ forumTopic }, 'Moved')}
            />
            <TagsDialog
                open={dialog === 'tags'}
                onOpenChange={(open) => setDialog(open ? 'tags' : null)}
                topic={fullTopic}
                initialTags={post.forumTags?.data?.map((tag) => tag.id) ?? []}
                onSave={(forumTags) => moderate({ forumTags }, 'Tags saved')}
            />
        </CurrentQuestionContext.Provider>
    )
}
