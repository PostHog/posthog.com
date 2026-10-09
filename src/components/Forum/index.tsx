import React, { lazy, Suspense, useMemo, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { IconGear, IconPencil, IconPlus } from '@posthog/icons'
import { navigate } from 'gatsby'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import SEO from 'components/seo'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import { ForumTopic, useForumSubscriptions, useForumTags, useForumTopics } from './hooks'
import { ForumActions, ForumActionsContext, useForumActions } from './context'
import Sidebar from './Sidebar'
import Feed, { FeedPageSkeleton } from './Feed'
import Thread from './Thread'
import Composer from './Composer'
import Drafts from './Drafts'
import TopicSubscribeButton from './TopicSubscribeButton'
import TopicIcon from './TopicIcon'
import TopicForm from './TopicForm'
import DeleteTopicDialog from './DeleteTopicDialog'
import TopicTags from './TopicTags'
import ForumAlerts from './ForumAlerts'
import ManageSubscriptions from './ManageSubscriptions'

const GettingStarted = typeof window !== 'undefined' ? lazy(() => import('./GettingStarted')) : () => null

type View = 'home' | 'following' | 'drafts' | 'new' | 'topic' | 'tags' | 'post' | 'alerts'

// AppWindow's Router renders one Forum for every /forum path, so state such as open modals survives navigation.
const getView = (props: any): View => {
    if (props.params?.permalink) return 'post'
    // Window props carry the page path; location is not always passed through.
    const path = (props.path || props.location?.pathname || '').replace(/\/$/, '')
    if (props.params?.topic) return path.endsWith('/tags') ? 'tags' : 'topic'
    if (path.endsWith('/forum/following')) return 'following'
    if (path.endsWith('/forum/new')) return 'new'
    if (path.endsWith('/forum/drafts')) return 'drafts'
    if (path.endsWith('/forum/alerts')) return 'alerts'
    return 'home'
}

const TopicFeed = ({ topic }: { topic: ForumTopic }) => {
    const { isModerator } = useUser()
    const { editTopic } = useForumActions()
    const { slug, description, icon, tags } = topic.attributes
    return (
        <Feed
            key={topic.id}
            topicId={topic.id}
            title={
                <>
                    <TopicIcon icon={icon} className="size-6 text-secondary" />#{slug}
                    <TopicSubscribeButton topic={topic} />
                    <OSButton
                        size="md"
                        icon={<IconPlus />}
                        tooltip={`New post in #${slug}`}
                        aria-label={`New post in #${slug}`}
                        onClick={() => navigate('/forum/new', { state: { topicId: topic.id } })}
                    />
                    {isModerator && (
                        <OSButton
                            size="md"
                            icon={<IconPencil />}
                            tooltip="Edit topic"
                            aria-label="Edit topic"
                            onClick={() => editTopic(topic)}
                        />
                    )}
                </>
            }
            description={description}
            tags={tags?.data ?? []}
            tagScope={`Tags in #${slug}`}
            showTopic={false}
            empty="No posts in this topic yet. Start the conversation!"
        />
    )
}

const FollowingFeed = () => {
    const { user } = useUser()
    const { openSignIn } = useApp()
    const { manageSubscriptions } = useForumActions()
    const { subscriptions, isLoading: subscriptionsLoading } = useForumSubscriptions()
    const following = useMemo(
        () => ({
            topicIds: subscriptions.flatMap((sub) => (sub.forumTopic ? [sub.forumTopic.id] : [])),
            tagIds: subscriptions.flatMap((sub) => (sub.forumTag ? [sub.forumTag.id] : [])),
        }),
        [subscriptions]
    )

    if (!user) {
        return (
            <div className="px-6 py-12 text-center text-sm text-secondary space-y-3">
                <h1 className="text-2xl font-bold text-primary m-0">Following</h1>
                <p className="m-0">Sign in to see new posts from the topics and tags you subscribe to.</p>
                <OSButton variant="primary" size="md" onClick={() => openSignIn()}>
                    Sign in
                </OSButton>
            </div>
        )
    }

    // Without this, the page shows the "subscribe to a topic" message until the subscriptions arrive.
    if (subscriptionsLoading) return <FeedPageSkeleton />

    return (
        <Feed
            title={
                <>
                    Following
                    <OSButton
                        size="md"
                        icon={<IconGear />}
                        tooltip="Manage subscriptions"
                        aria-label="Manage subscriptions"
                        onClick={manageSubscriptions}
                    />
                </>
            }
            description="New posts from the topics and tags you subscribe to."
            following={following}
            showTopic
            empty={
                subscriptions.length
                    ? 'No posts from your subscriptions yet.'
                    : 'Subscribe to a topic, or to a tag in Filter, to see its new posts here.'
            }
        />
    )
}

export default function Forum(props: any) {
    const view = getView(props)
    const { user } = useUser()
    const { appWindow } = useWindow()
    const { topics, getTopic, isLoading: topicsLoading } = useForumTopics()
    const { tags } = useForumTags()
    const [editing, setEditing] = useState<{ open: boolean; topic?: ForumTopic }>({ open: false })
    const [deleting, setDeleting] = useState<ForumTopic | undefined>()
    const [subscriptionsOpen, setSubscriptionsOpen] = useState(false)
    const activeTopic = view === 'topic' || view === 'tags' ? getTopic(props.params?.topic) : undefined

    const actions: ForumActions = useMemo(
        () => ({
            editTopic: (topic) => setEditing({ open: true, topic }),
            deleteTopic: (topic) => {
                setEditing({ open: false })
                setDeleting(topic)
            },
            manageSubscriptions: () => setSubscriptionsOpen(true),
        }),
        []
    )

    const content = () => {
        switch (view) {
            case 'post':
                return <Thread key={props.params.permalink} permalink={props.params.permalink} topics={topics} />
            case 'new':
                return (
                    <Composer
                        topics={topics}
                        initialTopicId={(appWindow?.location as any)?.state?.topicId}
                        draftId={
                            Number(new URLSearchParams(appWindow?.location?.search || '').get('draft')) || undefined
                        }
                    />
                )
            case 'drafts':
                return <Drafts />
            case 'alerts':
                return <ForumAlerts topics={topics} loading={topicsLoading} />
            case 'following':
                return <FollowingFeed />
            case 'tags':
                if (activeTopic) return <TopicTags topic={activeTopic} />
                return topicsLoading ? (
                    <FeedPageSkeleton />
                ) : (
                    <div className="px-6 py-12 text-center text-secondary">
                        There is no #{props.params?.topic} topic.
                    </div>
                )
            case 'topic':
                if (activeTopic) return <TopicFeed topic={activeTopic} />
                return topicsLoading ? (
                    <FeedPageSkeleton />
                ) : (
                    <div className="px-6 py-12 text-center text-secondary">
                        There is no #{props.params?.topic} topic.
                    </div>
                )
            default:
                return (
                    <Feed
                        title="All posts"
                        description="Everything from every topic, newest posts first."
                        tags={tags}
                        showTopic
                        empty="No posts yet. Start the conversation!"
                    />
                )
        }
    }

    const title =
        view === 'topic' && activeTopic
            ? `#${activeTopic.attributes.slug}`
            : view === 'tags' && activeTopic
            ? `#${activeTopic.attributes.slug} tags`
            : view === 'following'
            ? 'Following'
            : view === 'drafts'
            ? 'Drafts'
            : view === 'alerts'
            ? 'Slack alerts'
            : 'Forum'

    return (
        // Every forum animation follows the visitor's reduced motion setting.
        <MotionConfig reducedMotion="user">
            <ForumActionsContext.Provider value={actions}>
                {view !== 'post' && view !== 'new' && <SEO title={title} />}
                <div data-scheme="secondary" className="@container w-full h-full flex flex-col border-t border-primary">
                    <div className="flex flex-col @2xl:flex-row flex-grow min-h-0">
                        <Sidebar view={view} topics={topics} activeTopic={activeTopic} loading={topicsLoading} />
                        <main
                            data-scheme="primary"
                            className="relative overflow-hidden flex-1 min-w-0 min-h-0 bg-primary text-primary"
                        >
                            <ScrollArea className="h-full">{content()}</ScrollArea>
                            {user && (
                                <Suspense fallback={null}>
                                    <GettingStarted visible={view !== 'post' && view !== 'new'} />
                                </Suspense>
                            )}
                        </main>
                    </div>
                </div>
                <TopicForm
                    open={editing.open}
                    topic={editing.topic}
                    onOpenChange={(open) => setEditing((prev) => ({ ...prev, open }))}
                    onDelete={actions.deleteTopic}
                />
                <DeleteTopicDialog topic={deleting} onOpenChange={(open) => !open && setDeleting(undefined)} />
                <ManageSubscriptions open={subscriptionsOpen} onOpenChange={setSubscriptionsOpen} />
            </ForumActionsContext.Provider>
        </MotionConfig>
    )
}
