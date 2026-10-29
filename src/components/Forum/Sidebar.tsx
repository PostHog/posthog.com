import React, { useEffect, useState } from 'react'
import { motion, Reorder, useReducedMotion } from 'framer-motion'
import { navigate } from 'gatsby'
import {
    IconBell,
    IconClock,
    IconDrag,
    IconEllipsis,
    IconMap,
    IconMegaphone,
    IconPencil,
    IconPlus,
    IconSort,
    IconSparkles,
    IconTrash,
} from '@posthog/icons'
import OSButton from 'components/OSButton'
import { IconTag } from 'components/OSIcons'
import Link from 'components/Link'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { Select } from 'components/RadixUI/Select'
import SearchProvider, { useSearch } from 'components/Editor/SearchProvider'
import { InlineSearch, AlgoliaSearchResults } from 'components/Search/InlineSearch'
import { useUser } from 'hooks/useUser'
import { ForumTopic, useForumTopics } from './hooks'
import { useForumActions } from './context'
import TopicIcon from './TopicIcon'
import ForumMenu from './ForumMenu'

// Search records keep a questions/ or forum/p/ slug; the forum opens every hit in its own window.
const forumHitUrl = (hit: any) => `/forum/p/${String(hit.slug).split('/').pop()}`

const NavItem = ({
    to,
    active,
    icon,
    children,
    menu,
}: {
    to: string
    active: boolean
    icon: React.ReactNode
    children: React.ReactNode
    menu?: React.ReactNode
}) => (
    // An open menu sets data-state="open" on its trigger, which keeps the row's hover look while the menu is open.
    <li
        className={`group flex items-center rounded ${
            active ? 'bg-accent font-semibold' : 'hover:bg-accent has-[[data-state=open]]:bg-accent'
        }`}
    >
        <div className="flex-1 min-w-0">
            <Link to={to} className="flex items-center gap-2 px-2 py-1 !no-underline text-primary truncate">
                <span className="text-secondary flex">{icon}</span>
                <span className="truncate">{children}</span>
            </Link>
        </div>
        {menu && (
            <div
                className={`pr-1 ${
                    active
                        ? ''
                        : 'opacity-0 group-hover:opacity-100 focus-within:opacity-100 group-has-[[data-state=open]]:opacity-100'
                }`}
            >
                {menu}
            </div>
        )}
    </li>
)

// The topic list in change order mode. Dragging a row lifts it, and the other rows spring out of its way. The
// rows jiggle a little, like app icons in edit mode, unless the visitor asks for reduced motion.
const TopicOrderList = ({
    topics,
    order,
    onReorder,
}: {
    topics: ForumTopic[]
    order: number[]
    onReorder: (order: number[]) => void
}) => {
    const reduceMotion = useReducedMotion()
    const [dragging, setDragging] = useState<number | null>(null)
    const byId = new Map(topics.map((topic) => [topic.id, topic]))

    return (
        <Reorder.Group as="ul" axis="y" values={order} onReorder={onReorder} className="list-none m-0 p-0 space-y-1">
            {order.map((id, index) => {
                const topic = byId.get(id)
                if (!topic) return null
                const jiggle = !reduceMotion && dragging !== id
                return (
                    <Reorder.Item
                        key={id}
                        value={id}
                        onDragStart={() => setDragging(id)}
                        onDragEnd={() => setDragging(null)}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        whileDrag={{ scale: 1.04, zIndex: 10 }}
                        className={`relative rounded-md bg-accent text-primary cursor-grab active:cursor-grabbing touch-none select-none ${
                            dragging === id ? 'shadow-xl' : ''
                        }`}
                    >
                        <motion.div
                            animate={jiggle ? { rotate: [-0.6, 0.6] } : { rotate: 0 }}
                            transition={
                                jiggle
                                    ? {
                                          rotate: {
                                              duration: 0.14,
                                              repeat: Infinity,
                                              repeatType: 'mirror',
                                              ease: 'easeInOut',
                                              // Rows start at different points, so they do not move in step.
                                              delay: (index % 3) * 0.05,
                                          },
                                      }
                                    : { duration: 0.1 }
                            }
                            className="flex items-center gap-2 px-2 py-1"
                        >
                            <span className="text-secondary flex">
                                <TopicIcon icon={topic.attributes.icon} />
                            </span>
                            <span className="flex-1 truncate">#{topic.attributes.slug}</span>
                            <IconDrag className="size-4 text-muted" />
                        </motion.div>
                    </Reorder.Item>
                )
            })}
        </Reorder.Group>
    )
}

const Navigation = ({
    view,
    topics,
    activeTopic,
    loading = false,
}: {
    view: string
    topics: ForumTopic[]
    activeTopic?: ForumTopic
    loading?: boolean
}) => {
    const { user, isModerator } = useUser()
    const { editTopic, deleteTopic } = useForumActions()
    const { reorderTopics } = useForumTopics()
    // Change order mode: the list becomes draggable. Done saves the new order; Cancel and Escape drop it.
    const [reordering, setReordering] = useState(false)
    const [order, setOrder] = useState<number[]>([])

    useEffect(() => {
        if (!reordering) return
        setOrder(topics.map((topic) => topic.id))
        const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setReordering(false)
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [reordering])

    const saveOrder = async () => {
        setReordering(false)
        await reorderTopics(order)
    }

    return (
        <nav className="text-[15px]">
            <ul className="list-none m-0 p-0 space-y-px">
                <NavItem to="/forum" active={view === 'home'} icon={<IconClock className="size-4" />}>
                    All posts
                </NavItem>
                <NavItem to="/forum/following" active={view === 'following'} icon={<IconBell className="size-4" />}>
                    Following
                </NavItem>
                {user && (
                    <NavItem to="/forum/drafts" active={view === 'drafts'} icon={<IconPencil className="size-4" />}>
                        Drafts
                    </NavItem>
                )}
                {isModerator && (
                    <NavItem to="/forum/alerts" active={view === 'alerts'} icon={<IconMegaphone className="size-4" />}>
                        Slack alerts
                    </NavItem>
                )}
            </ul>
            {/* pr-1 matches the topic rows, so this menu button lines up with theirs. */}
            <div className="flex items-center gap-1 pl-2 pr-1 pt-4 pb-1 text-sm text-muted">
                <span className="flex-1">Topics</span>
                {reordering ? (
                    <>
                        <OSButton size="xs" onClick={() => setReordering(false)}>
                            Cancel
                        </OSButton>
                        <OSButton size="xs" variant="primary" onClick={saveOrder}>
                            Done
                        </OSButton>
                    </>
                ) : (
                    isModerator && (
                        <ForumMenu
                            align="start"
                            trigger={
                                // A flex wrapper centers the button, which sits inside an inline tooltip span.
                                <span className="flex">
                                    <OSButton size="xs" icon={<IconEllipsis />} aria-label="Manage topics" />
                                </span>
                            }
                            items={[
                                { label: 'New topic', icon: <IconPlus />, onClick: () => editTopic() },
                                {
                                    label: 'Change order',
                                    icon: <IconSort />,
                                    onClick: () => setReordering(true),
                                },
                            ]}
                        />
                    )
                )}
            </div>
            {loading && topics.length === 0 ? (
                // Placeholder rows with the shape of topic rows, so the list does not pop in.
                <ul className="list-none m-0 p-0 space-y-px" aria-busy>
                    {['w-28', 'w-36', 'w-32', 'w-40'].map((width) => (
                        <li key={width} className="flex items-center gap-2 px-2 py-1.5">
                            <span className="size-4 rounded bg-accent animate-pulse" />
                            <span className={`h-3.5 rounded bg-accent animate-pulse ${width}`} />
                        </li>
                    ))}
                </ul>
            ) : reordering ? (
                <TopicOrderList topics={topics} order={order} onReorder={setOrder} />
            ) : (
                <ul className="list-none m-0 p-0 space-y-px">
                    {topics.map((topic) => (
                        <NavItem
                            key={topic.id}
                            to={`/forum/t/${topic.attributes.slug}`}
                            active={activeTopic?.id === topic.id}
                            icon={<TopicIcon icon={topic.attributes.icon} />}
                            menu={
                                isModerator && (
                                    <ForumMenu
                                        align="start"
                                        trigger={
                                            <span>
                                                <OSButton
                                                    size="xs"
                                                    icon={<IconEllipsis />}
                                                    aria-label={`Manage #${topic.attributes.slug}`}
                                                />
                                            </span>
                                        }
                                        items={[
                                            {
                                                label: 'Edit topic',
                                                icon: <IconPencil />,
                                                onClick: () => editTopic(topic),
                                            },
                                            {
                                                label: 'Manage tags',
                                                icon: <IconTag />,
                                                onClick: () => navigate(`/forum/t/${topic.attributes.slug}/tags`),
                                            },
                                            'divider',
                                            {
                                                label: 'Delete topic…',
                                                icon: <IconTrash />,
                                                onClick: () => deleteTopic(topic),
                                                danger: true,
                                            },
                                        ]}
                                    />
                                )
                            }
                        >
                            #{topic.attributes.slug}
                        </NavItem>
                    ))}
                </ul>
            )}
        </nav>
    )
}

const OffRamps = () => (
    <div
        data-scheme="primary"
        className="m-2 p-3 rounded border border-primary bg-primary text-primary text-[13px] space-y-2"
    >
        <div className="font-semibold">Looking for something else?</div>
        <div className="flex gap-2 text-secondary">
            <IconSparkles className="size-4 shrink-0 mt-0.5" />
            <span>
                Need a specific answer?
                <Link
                    to="https://app.posthog.com#panel=support"
                    externalNoIcon
                    className="block font-semibold text-red dark:text-yellow"
                >
                    Ask PostHog AI
                </Link>
            </span>
        </div>
        <div className="flex gap-2 text-secondary">
            <IconMap className="size-4 shrink-0 mt-0.5" />
            <span>
                Want a feature?
                <Link
                    to="/roadmap"
                    state={{ newWindow: true }}
                    className="block font-semibold text-red dark:text-yellow"
                >
                    See the roadmap
                </Link>
            </span>
        </div>
    </div>
)

const SidebarBody = (props: { view: string; topics: ForumTopic[]; activeTopic?: ForumTopic; loading?: boolean }) => {
    const { searchQuery } = useSearch()
    return (
        <>
            <InlineSearch placeholder="Search the forum…" className="p-2" />
            <div className="px-2">
                {searchQuery.length >= 2 ? (
                    <AlgoliaSearchResults
                        facetFilters={['type:question', 'isForum:true']}
                        getHitUrl={forumHitUrl}
                        newWindow={false}
                    />
                ) : (
                    <Navigation {...props} />
                )}
            </div>
        </>
    )
}

export default function Sidebar({
    view,
    topics,
    activeTopic,
    loading = false,
}: {
    view: string
    topics: ForumTopic[]
    activeTopic?: ForumTopic
    loading?: boolean
}) {
    const { user, isModerator } = useUser()
    const newPost = () => navigate('/forum/new', { state: { topicId: activeTopic?.id } })
    const current =
        view === 'topic' && activeTopic
            ? `/forum/t/${activeTopic.attributes.slug}`
            : view === 'following' || view === 'drafts' || view === 'alerts'
            ? `/forum/${view}`
            : '/forum'

    return (
        <aside
            data-scheme="secondary"
            className="bg-primary text-primary shrink-0 border-b @2xl:border-b-0 @2xl:border-r border-primary @2xl:w-60 @2xl:h-full"
        >
            <div className="flex @2xl:hidden items-center gap-2 p-2">
                <div className="flex-1 min-w-0">
                    <Select
                        className="w-full"
                        placeholder="Go to a topic"
                        value={current}
                        onValueChange={(value) => navigate(value)}
                        groups={[
                            {
                                label: 'Forum',
                                items: [
                                    { label: 'All posts', value: '/forum' },
                                    { label: 'Following', value: '/forum/following' },
                                    ...(user ? [{ label: 'Drafts', value: '/forum/drafts' }] : []),
                                    ...(isModerator ? [{ label: 'Slack alerts', value: '/forum/alerts' }] : []),
                                ],
                            },
                            {
                                label: 'Topics',
                                items: topics.map((topic) => ({
                                    label: `#${topic.attributes.slug}`,
                                    value: `/forum/t/${topic.attributes.slug}`,
                                })),
                            },
                        ]}
                    />
                </div>
                <OSButton variant="primary" size="md" onClick={newPost}>
                    + New post
                </OSButton>
            </div>
            <div className="hidden @2xl:flex flex-col h-full">
                <ScrollArea className="flex-1 min-h-0">
                    <SearchProvider>
                        <SidebarBody view={view} topics={topics} activeTopic={activeTopic} loading={loading} />
                    </SearchProvider>
                </ScrollArea>
                <OffRamps />
                <div className="px-2 pb-2">
                    <OSButton variant="primary" size="md" width="full" onClick={newPost}>
                        + New post
                    </OSButton>
                </div>
            </div>
        </aside>
    )
}
