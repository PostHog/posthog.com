import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { graphql, useStaticQuery } from 'gatsby'
import { Logo } from '@posthog/brand/logo'
import {
    IconArrowRight,
    IconAtSign,
    IconCheck,
    IconChevronDown,
    IconCode,
    IconComment,
    IconDocument,
    IconEmojiAdd,
    IconList,
    IconPlus,
    IconPullRequest,
    IconSearch,
    IconSend,
    IconSpinner,
    IconX,
} from '@posthog/icons'
import { cn } from '../../utils'
import { LINE_ENTER, WindowFrame } from '../Home/DataStory/Query/AgentWindow'
import { ANSWER_MS_PER_CHAR } from '../Home/DataStory/Query/trace'
import { PostHogMark, ScrollToLatest } from '../Home/DataStory/sceneParts'
import { SCENE_SIZE, SCENE_TEXT } from '../Home/DataStory/sceneScale'
import { useEventClock, wordStream } from '../Home/DataStory/timeline'

// `pace` stretches the written times so there's time to read. `hold` is how long the last frame stays before `onDone`.
const PLAYBACK = {
    window: { pace: 1.35, hold: 8000 },
    thread: { pace: 1, hold: 5000 },
}
const StreamContext = React.createContext(ANSWER_MS_PER_CHAR * PLAYBACK.window.pace)

export type SlackBlock = { at: number } & (
    | { type: 'text'; text: string }
    | { type: 'bullets'; items: string[] }
    | { type: 'plan'; steps: { label: string; doneAt: number }[] }
    /** With `subscription`, it adds the report buttons and the reply hint */
    | {
          type: 'insight'
          /** Like "Trends • Last 14 days" */
          label: string
          title: string
          description?: string
          series: { label: string; values: number[] }[]
          /** First, middle, and last */
          dates: string[]
          subscription?: boolean
      }
    /** Set `number` and `url` only in a real thread */
    | { type: 'pr'; state: 'opened' | 'merged'; repo: string; number?: number; url?: string }
    /** Something PostHog posts on its own */
    | {
          type: 'report'
          kind: 'scout' | 'self-driving'
          label: string
          title: string
          buttons?: string[]
      }
)

export type SlackMessage = { at: number; time: string } & (
    | {
          from: 'person'
          /** A full name from the team profiles */
          name: string
          text: string
          attachment?: string
          /** When the bot adds the eyes reaction */
          reactedAt?: number
          /** When the bot adds the heart, for a message that says please */
          heartAt?: number
      }
    | {
          from: 'bot'
          blocks: SlackBlock[]
          replies?: { at: number; labels: string[] }
      }
)

export interface SlackScene {
    channel: string
    messages: SlackMessage[]
    /** When the scene stops and holds its last frame */
    endAt: number
    /** For screen readers */
    summary: string
    /** The tag in the thread header. Defaults to "Sample data" */
    label?: string
}

const WORKSPACE = 'PostHog'
export const WORKSPACE_NOTE = 'Actual things happening in the PostHog Slack workspace.'
const SAMPLE_LABEL = 'Sample data'

type Profile = {
    squeakId: number
    firstName: string
    lastName: string
    color: string | null
    avatar: { formats: { thumbnail: { url: string } } } | null
}

// The same profiles as `TeamMember`
export const useProfile = (name: string): Profile | undefined => {
    const {
        profiles: { nodes },
    } = useStaticQuery(graphql`
        {
            profiles: allSqueakProfile(filter: { startDate: { ne: null } }) {
                nodes {
                    squeakId
                    firstName
                    lastName
                    color
                    avatar {
                        formats {
                            thumbnail {
                                url
                            }
                        }
                    }
                }
            }
        }
    `)
    return nodes.find(
        ({ firstName, lastName }: Profile) => `${firstName} ${lastName}`.toLowerCase() === name.toLowerCase()
    )
}

const pacedScene = (scene: SlackScene, factor: number): SlackScene => {
    const pace = (ms: number) => Math.round(ms * factor)
    const pacedBlock = (block: SlackBlock): SlackBlock =>
        block.type === 'plan'
            ? {
                  ...block,
                  at: pace(block.at),
                  steps: block.steps.map((step) => ({ ...step, doneAt: pace(step.doneAt) })),
              }
            : { ...block, at: pace(block.at) }
    return {
        ...scene,
        endAt: pace(scene.endAt),
        messages: scene.messages.map(
            (message): SlackMessage =>
                message.from === 'person'
                    ? {
                          ...message,
                          at: pace(message.at),
                          reactedAt: message.reactedAt && pace(message.reactedAt),
                          heartAt: message.heartAt && pace(message.heartAt),
                      }
                    : {
                          ...message,
                          at: pace(message.at),
                          blocks: message.blocks.map(pacedBlock),
                          replies: message.replies && { ...message.replies, at: pace(message.replies.at) },
                      }
        ),
    }
}

const streamText = (block: SlackBlock): string | undefined =>
    block.type === 'text' ? block.text : block.type === 'bullets' ? block.items.join('\n') : undefined

const blockBoundaries = (block: SlackBlock, msPerChar: number): number[] => {
    const text = streamText(block)
    return [
        block.at,
        ...(block.type === 'plan' ? block.steps.map(({ doneAt }) => doneAt) : []),
        ...(text ? wordStream(text, block.at, msPerChar).stops : []),
    ]
}

// The clock only re-renders at these times
const sceneBoundaries = ({ messages, endAt }: SlackScene, msPerChar: number, hold: number): number[] =>
    [
        endAt,
        endAt + hold,
        ...messages.flatMap((message) =>
            message.from === 'person'
                ? [message.at, message.reactedAt, message.heartAt]
                : [
                      message.at,
                      message.replies?.at,
                      ...message.blocks.flatMap((block) => blockBoundaries(block, msPerChar)),
                  ]
        ),
    ].filter((at): at is number => at !== undefined)

export const MUTED = 'text-[#616061] dark:text-[#ABABAD]'
export const BORDER = 'border-[#DDDDDD] dark:border-[#35373B]'
export const LINK = 'text-[#1264A3] dark:text-[#1D9BD1]'
const CARD = `rounded border ${BORDER} bg-white dark:bg-[#222529]`
const SURFACE = 'bg-[#F8F8F8] dark:bg-[#222529]'
const RULE = 'bg-[#DDDDDD] dark:bg-[#35373B]'
const ACTIVE_CHANNEL = '!bg-[#1164A3] font-bold text-white'
const REACTION = 'flex items-center gap-1 rounded-full border border-[#1D9BD1] bg-[#1D9BD1]/10 px-2 py-0.5'
export const PANE = 'bg-white text-[#1D1C1D] dark:bg-[#1A1D21] dark:text-[#D1D2D3]'

const RICH = /(@[A-Z][A-Za-z]+|`[^`]+`|\*[^*]+\*)/

// Mentions, inline code, and italics. `split` puts each match at an odd index.
export const Rich = ({ text }: { text: string }): JSX.Element => (
    <>
        {text.split(RICH).map((part, index) =>
            index % 2 === 0 ? (
                <React.Fragment key={index}>{part}</React.Fragment>
            ) : part.startsWith('@') ? (
                <span key={index} className={`rounded-sm bg-[#1D9BD1]/10 px-0.5 ${LINK}`}>
                    {part}
                </span>
            ) : part.startsWith('`') ? (
                <code
                    key={index}
                    className={`rounded-sm border ${BORDER} ${SURFACE} px-1 font-code !text-[0.85em] text-[#E01E5A] dark:text-[#E8912D]`}
                >
                    {part.slice(1, -1)}
                </code>
            ) : (
                <em key={index}>{part.slice(1, -1)}</em>
            )
        )}
    </>
)

const streamed = (text: string, at: number, elapsed: number, msPerChar: number) =>
    wordStream(text, at, msPerChar).textAt(elapsed)

const Buttons = ({ labels, className }: { labels: string[]; className?: string }) => (
    <span className={cn('flex flex-wrap gap-1.5', className)}>
        {labels.map((label) => (
            <span key={label} className={cn(CARD, 'px-2 py-0.5 font-bold')}>
                {label}
            </span>
        ))}
    </span>
)

const REPORT_KINDS = {
    scout: { name: 'Scout', bar: 'bg-[#E01E5A]' },
    'self-driving': { name: 'Self-driving', bar: 'bg-[#1264A3]' },
}

const SERIES_COLORS = ['#1D4AFF', '#CD0F74', '#43827E']
const seriesColor = (index: number) => SERIES_COLORS[index % SERIES_COLORS.length]

// Stays white in dark mode, because Slack shows the real one as an image
const InsightCard = ({ block }: { block: Extract<SlackBlock, { type: 'insight' }> }) => {
    const top = Math.ceil(Math.max(...block.series.flatMap(({ values }) => values)) / 20) * 20
    const y = (value: number) => 2 + (1 - value / top) * 96
    return (
        <div className={`max-w-md rounded-lg border ${BORDER} ${SURFACE} p-1.5`}>
            <div className="rounded border border-[#DDDDDD] bg-white text-[#1D1C1D]">
                <div className="border-b border-[#DDDDDD] px-3 py-2">
                    <p
                        className={cn(
                            SCENE_TEXT[11],
                            'm-0 flex items-center justify-between gap-2 font-bold uppercase tracking-wide text-[#616061]'
                        )}
                    >
                        {block.label}
                        <Logo className="h-3 w-auto shrink-0 @3xl:h-4" width="auto" />
                    </p>
                    <p className="m-0 mt-1 font-bold">{block.title}</p>
                    {block.description && <p className="m-0 mt-0.5">{block.description}</p>}
                </div>
                <div
                    className={cn(
                        SCENE_TEXT[11],
                        'grid grid-cols-[auto_minmax(0,1fr)] gap-x-1.5 px-3 pb-2 pt-3 text-[#616061]'
                    )}
                >
                    <span className="flex h-24 flex-col justify-between text-right leading-none">
                        {[top, top / 2, 0].map((tick) => (
                            <span key={tick}>{tick}</span>
                        ))}
                    </span>
                    <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="h-24 w-full">
                        {[2, 50, 98].map((line) => (
                            <line
                                key={line}
                                x1="0"
                                x2="300"
                                y1={line}
                                y2={line}
                                stroke="currentColor"
                                strokeDasharray="3 3"
                                strokeOpacity="0.25"
                                vectorEffect="non-scaling-stroke"
                            />
                        ))}
                        {block.series.map(({ label, values }, index) => (
                            <polyline
                                key={label}
                                points={values
                                    .map((value, i) => `${(i / (values.length - 1)) * 300},${y(value)}`)
                                    .join(' ')}
                                fill="none"
                                stroke={seriesColor(index)}
                                strokeWidth="2"
                                strokeLinejoin="round"
                                vectorEffect="non-scaling-stroke"
                            />
                        ))}
                    </svg>
                    <span className="col-start-2 mt-1 flex justify-between">
                        {block.dates.map((date) => (
                            <span key={date}>{date}</span>
                        ))}
                    </span>
                    <span className="col-span-2 mt-1.5 flex flex-wrap justify-center gap-x-3 gap-y-0.5 text-[#1D1C1D]">
                        {block.series.map(({ label }, index) => (
                            <span key={label} className="flex items-center gap-1">
                                <span className="size-2 rounded-full" style={{ backgroundColor: seriesColor(index) }} />
                                {label}
                            </span>
                        ))}
                    </span>
                </div>
            </div>
        </div>
    )
}

const Block = ({ block, elapsed }: { block: SlackBlock; elapsed: number }) => {
    const msPerChar = React.useContext(StreamContext)
    switch (block.type) {
        case 'text':
            return (
                <p className="m-0">
                    <Rich text={streamed(block.text, block.at, elapsed, msPerChar)} />
                </p>
            )
        case 'bullets':
            return (
                <ul className="m-0 list-disc pl-5">
                    {streamed(block.items.join('\n'), block.at, elapsed, msPerChar)
                        .split('\n')
                        .map((item, index) => (
                            <li key={index}>
                                <Rich text={item} />
                            </li>
                        ))}
                </ul>
            )
        case 'plan': {
            const done = block.steps.filter(({ doneAt }) => elapsed >= doneAt).length
            return (
                <motion.div {...LINE_ENTER} className={cn(CARD, SCENE_TEXT[12], 'px-3 py-2')}>
                    <p className="m-0 mb-1 font-bold">
                        Plan · {done} of {block.steps.length}
                    </p>
                    <ul className="m-0 list-none space-y-0.5 p-0">
                        {block.steps.map(({ label }, index) => (
                            <li key={label} className="flex items-center gap-2">
                                {index < done ? (
                                    <IconCheck className={cn(SCENE_SIZE[14], 'shrink-0 text-[#2BAC76]')} />
                                ) : index === done ? (
                                    <IconSpinner className={cn(SCENE_SIZE[14], 'shrink-0 animate-spin', MUTED)} />
                                ) : (
                                    <span className={cn(SCENE_SIZE[14], 'shrink-0 rounded-full border', BORDER)} />
                                )}
                                <span className={index < done ? cn(MUTED, 'line-through') : undefined}>{label}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )
        }
        case 'insight':
            return (
                <motion.div {...LINE_ENTER} className={cn('flex flex-col gap-2', SCENE_TEXT[12])}>
                    <InsightCard block={block} />
                    {block.subscription && (
                        <>
                            <Buttons
                                labels={['View in PostHog', 'Manage Subscription']}
                                className={cn('border-t pt-2', BORDER)}
                            />
                            <p className={cn('m-0 flex items-center gap-1.5', MUTED)}>
                                <IconComment className={cn(SCENE_SIZE[14], 'shrink-0')} />
                                <span>
                                    Reply in this thread and mention <strong>@PostHog</strong> with a question to dig
                                    into this report.
                                </span>
                            </p>
                        </>
                    )}
                </motion.div>
            )
        case 'pr':
            return (
                <motion.div
                    {...LINE_ENTER}
                    className={cn(CARD, SCENE_TEXT[12], 'flex w-fit max-w-full items-center gap-2.5 px-3 py-2')}
                >
                    <span
                        className={cn(
                            SCENE_SIZE[28],
                            'flex shrink-0 items-center justify-center rounded text-white',
                            block.state === 'merged' ? 'bg-[#8250DF]' : 'bg-[#2BAC76]'
                        )}
                    >
                        <IconPullRequest className={SCENE_SIZE[16]} />
                    </span>
                    <span className="min-w-0">
                        <strong className="block">
                            {block.state === 'merged' ? 'Pull request merged' : 'Pull request opened'}
                        </strong>
                        {/* The window is hidden from screen readers, so `ThreadDemo` repeats this link outside it */}
                        <a
                            href={block.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={-1}
                            className={cn('block truncate hover:underline', LINK)}
                        >
                            {block.number ? `${block.repo}#${block.number}` : block.repo}
                        </a>
                    </span>
                </motion.div>
            )
        case 'report':
            return (
                <motion.div {...LINE_ENTER} className={cn('flex gap-2.5', SCENE_TEXT[12])}>
                    <span className={cn('w-1 shrink-0 rounded-full', REPORT_KINDS[block.kind].bar)} />
                    <div className="min-w-0 flex-1">
                        <p className={cn('m-0', MUTED)}>
                            {REPORT_KINDS[block.kind].name} · {block.label}
                        </p>
                        <p className="m-0 font-bold">{block.title}</p>
                        {block.buttons && <Buttons labels={block.buttons} className="mt-1.5" />}
                        {block.kind === 'scout' && (
                            <p className={cn('m-0', MUTED)}>
                                Reply in this thread and mention <strong>@PostHog</strong> to dig in.
                            </p>
                        )}
                    </div>
                </motion.div>
            )
    }
}

export const Header = ({ name, time, bot }: { name: string; time: string; bot?: boolean }): JSX.Element => (
    <p className="m-0 flex items-baseline gap-1.5 leading-tight">
        <strong>{name}</strong>
        {bot && (
            <span
                className={cn(
                    SCENE_TEXT[9],
                    'self-center rounded-sm bg-[#1D1C1D]/10 px-1 font-bold uppercase dark:bg-white/10',
                    MUTED
                )}
            >
                Agent
            </span>
        )}
        <span className={cn(SCENE_TEXT[11], MUTED)}>{time}</span>
    </p>
)

export const MessageRow = ({
    avatar,
    header,
    children,
}: {
    avatar: React.ReactNode
    header: React.ReactNode
    children: React.ReactNode
}): JSX.Element => (
    <motion.div {...LINE_ENTER} className="flex items-start gap-2.5">
        {avatar}
        <div className="flex min-w-0 flex-1 flex-col">
            {header}
            <div className="mt-0.5 flex flex-col gap-1.5">{children}</div>
        </div>
    </motion.div>
)

export const BotAvatar = ({ size = 28 }: { size?: 12 | 16 | 28 }): JSX.Element => (
    <span
        className={cn(
            SCENE_SIZE[size],
            'flex shrink-0 items-center justify-center border bg-white',
            BORDER,
            size === 28 ? 'rounded-md' : 'rounded-sm'
        )}
    >
        <PostHogMark className="h-1/3" />
    </span>
)

export const PersonAvatar = ({ name, size = 28 }: { name: string; size?: 12 | 28 }): JSX.Element => {
    const profile = useProfile(name)
    const url = profile?.avatar?.formats?.thumbnail?.url
    const box = cn(SCENE_SIZE[size], 'shrink-0 overflow-hidden', size === 12 ? 'rounded-sm' : 'rounded-md')
    return url ? (
        <img src={url} alt="" className={cn(box, 'object-cover', `bg-${profile?.color || 'red'}`)} />
    ) : (
        <span className={cn(box, 'flex items-center justify-center bg-red font-bold text-white')}>{name[0]}</span>
    )
}

const Reaction = ({ heart }: { heart: boolean }) => (
    <span className={cn(SCENE_TEXT[11], 'flex gap-1')}>
        <span className={REACTION}>
            <span className="leading-none">👀</span> 1
        </span>
        {heart && (
            <span className={REACTION}>
                <span className="leading-none">🧡</span> 1
            </span>
        )}
        <span className="flex items-center rounded-full bg-[#1D1C1D]/5 px-2 py-0.5 dark:bg-white/10">
            <IconEmojiAdd className={SCENE_SIZE[12]} />
        </span>
    </span>
)

const Message = ({ message, elapsed }: { message: SlackMessage; elapsed: number }) => {
    if (message.from === 'person') {
        return (
            <MessageRow
                avatar={<PersonAvatar name={message.name} />}
                header={<Header name={message.name} time={message.time} />}
            >
                <p className="m-0">
                    <Rich text={message.text} />
                </p>
                {message.attachment && (
                    <span className={cn(CARD, SCENE_TEXT[12], 'flex w-fit items-center gap-1.5 px-2 py-1')}>
                        <IconDocument className={cn(SCENE_SIZE[14], MUTED)} />
                        {message.attachment}
                    </span>
                )}
                {message.reactedAt !== undefined && elapsed >= message.reactedAt && (
                    <Reaction heart={message.heartAt !== undefined && elapsed >= message.heartAt} />
                )}
            </MessageRow>
        )
    }

    const blocks = message.blocks.filter(({ at }) => elapsed >= at)
    return (
        <MessageRow avatar={<BotAvatar />} header={<Header name="PostHog" time={message.time} bot />}>
            {blocks.length === 0 && <p className={cn('m-0 animate-pulse italic', MUTED)}>is thinking…</p>}
            {blocks.map((block, index) => (
                <Block key={index} block={block} elapsed={elapsed} />
            ))}
            {message.replies && elapsed >= message.replies.at && (
                <motion.div {...LINE_ENTER} className={SCENE_TEXT[12]}>
                    <Buttons labels={message.replies.labels} />
                </motion.div>
            )}
        </MessageRow>
    )
}

const Composer = ({ placeholder }: { placeholder: string }) => (
    <div className="shrink-0 px-3 pb-3">
        <div
            aria-hidden
            className="w-full overflow-hidden rounded border border-[#BBBBBB] text-left dark:border-[#565856] [&_svg]:shrink-0"
        >
            <span className={cn('flex items-center gap-3 px-2.5 py-1', SURFACE, SCENE_TEXT[12], MUTED)}>
                <strong>B</strong>
                <em>I</em>
                <span className="underline">U</span>
                <span className="line-through">S</span>
                <span className="h-3 w-px bg-current opacity-30" />
                <IconList className={SCENE_SIZE[12]} />
                <IconCode className={SCENE_SIZE[12]} />
            </span>
            <div className="px-2.5 py-2">
                <p className={cn('m-0 min-h-[2.8em]', MUTED)}>{placeholder}</p>
            </div>
            <span className={cn('flex items-center gap-2.5 px-2.5 pb-1.5', MUTED)}>
                <IconPlus className={SCENE_SIZE[14]} />
                <span className={cn(SCENE_TEXT[12], 'font-bold underline')}>Aa</span>
                <IconAtSign className={SCENE_SIZE[14]} />
                <span className="ml-auto flex items-center rounded px-1.5 py-0.5">
                    <IconSend className={SCENE_SIZE[14]} />
                </span>
            </span>
        </div>
    </div>
)

// Not a <details>, because the site styles those globally
const SidebarSection = ({
    title,
    collapsible,
    children,
}: {
    title: string
    collapsible?: boolean
    children: React.ReactNode
}) => {
    const [open, setOpen] = useState(!collapsible)
    const titleClassName = 'm-0 mb-0.5 flex items-center gap-1 px-2'
    return (
        <div className="flex flex-col gap-px">
            {collapsible ? (
                <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpen(!open)}
                    className={cn(
                        titleClassName,
                        'cursor-pointer rounded-sm border-0 bg-transparent text-left text-inherit hover:bg-white/10',
                        SCENE_TEXT[11]
                    )}
                >
                    <IconChevronDown className={cn(SCENE_SIZE[10], !open && '-rotate-90')} />
                    {title}
                </button>
            ) : (
                <p aria-hidden className={cn(titleClassName, SCENE_TEXT[11])}>
                    <IconChevronDown className={SCENE_SIZE[10]} />
                    {title}
                </p>
            )}
            {open && children}
        </div>
    )
}

const SIDEBAR_ROW = 'm-0 flex items-center gap-1.5 rounded-sm px-2 py-0.5'

// A browser tab, not a site window: `Link` opens every site path in a window
const NewTabLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(SIDEBAR_ROW, '!text-inherit !no-underline hover:bg-white/10')}
    >
        {children}
    </a>
)

const PersonLink = ({ name }: { name: string }) => {
    const profile = useProfile(name)
    const content = (
        <>
            <PersonAvatar name={name} size={12} />
            <span className="truncate">{name.split(' ')[0]}</span>
        </>
    )
    return profile ? (
        <NewTabLink href={`/community/profiles/${profile.squeakId}`}>{content}</NewTabLink>
    ) : (
        <p aria-hidden className={SIDEBAR_ROW}>
            {content}
        </p>
    )
}

const ChannelButton = ({
    name,
    active,
    onSelect,
    className,
}: {
    name: string
    active: boolean
    onSelect?: (channel: string) => void
    className: string
}) => {
    const label = (
        <>
            <span className="opacity-70">#</span>
            <span className="truncate">{name}</span>
        </>
    )
    return onSelect ? (
        <button
            type="button"
            aria-current={active}
            onClick={() => onSelect(name)}
            className={cn(className, 'cursor-pointer border-0 bg-transparent text-left')}
        >
            {label}
        </button>
    ) : (
        <p aria-hidden className={className}>
            {label}
        </p>
    )
}

type ChannelPicker = { channel: string; channels: string[]; onSelectChannel?: (channel: string) => void }

const Sidebar = ({ channel, channels, onSelectChannel, people }: ChannelPicker & { people: string[] }) => (
    <div
        className={cn(
            SCENE_TEXT[12],
            'scrollbar-hide hidden min-h-0 w-40 shrink-0 flex-col gap-4 overflow-y-auto px-2 pb-2 pt-1 text-white/70 @lg:flex @3xl:w-52'
        )}
    >
        <p aria-hidden className={cn(SCENE_TEXT[14], 'm-0 flex items-center gap-1 px-2 font-bold text-white')}>
            {WORKSPACE} <IconChevronDown className={SCENE_SIZE[14]} />
        </p>
        <p aria-hidden className={cn(SCENE_TEXT[11], 'm-0 -mt-3 px-2 leading-snug')}>
            {WORKSPACE_NOTE}
        </p>
        <SidebarSection title="Channels">
            {channels.map((name) => (
                <ChannelButton
                    key={name}
                    name={name}
                    active={name === channel}
                    onSelect={onSelectChannel}
                    className={cn(SIDEBAR_ROW, name === channel ? ACTIVE_CHANNEL : 'text-inherit hover:bg-white/10')}
                />
            ))}
        </SidebarSection>
        {onSelectChannel && (
            <p
                aria-hidden
                className={cn(
                    SCENE_TEXT[11],
                    'm-0 -mt-2 flex items-center gap-1.5 rounded border border-dashed border-white/30 px-2 py-1.5 text-white/80'
                )}
            >
                {/* The bounce sets its own transform, so it goes on a wrapper to keep the rotation */}
                <span className="flex shrink-0 motion-safe:animate-bounce">
                    <IconArrowRight className={cn(SCENE_SIZE[12], '-rotate-90')} />
                </span>
                Click a channel to open its thread
            </p>
        )}
        <SidebarSection title="Direct messages" collapsible>
            {people.map((name) => (
                <PersonLink key={name} name={name} />
            ))}
        </SidebarSection>
        <SidebarSection title="Apps">
            <NewTabLink href="/docs/slack">
                <BotAvatar size={12} />
                PostHog
            </NewTabLink>
        </SidebarSection>
    </div>
)

const ChannelPane = ({ scene, elapsed, replies }: { scene: SlackScene; elapsed: number; replies: number }) => {
    const [starter] = scene.messages
    return (
        <div className="hidden min-w-0 flex-1 flex-col @3xl:flex">
            <div aria-hidden className={cn('shrink-0 border-b px-4 pt-2', BORDER)}>
                <p className="m-0 flex items-baseline gap-2">
                    <strong># {scene.channel}</strong>
                    <span className={cn(SCENE_TEXT[11], 'ml-auto', MUTED)}>{scene.label ?? SAMPLE_LABEL}</span>
                </p>
                <p className={cn('m-0 mt-1.5 flex gap-4', SCENE_TEXT[12])}>
                    <span className="border-b-2 border-[#1D1C1D] pb-1.5 font-bold dark:border-[#D1D2D3]">Messages</span>
                    <span className={cn('pb-1.5', MUTED)}>Bookmarks</span>
                </p>
            </div>
            <div aria-hidden className="flex min-h-0 flex-1 flex-col justify-end gap-4 overflow-hidden px-4 pb-3">
                <p className={cn('m-0 flex items-center gap-2', SCENE_TEXT[11], MUTED)}>
                    <span className={cn('h-px flex-1', RULE)} />
                    <span className={cn('rounded-full border px-2.5 py-0.5 font-bold', BORDER)}>Today</span>
                    <span className={cn('h-px flex-1', RULE)} />
                </p>
                {starter && elapsed >= starter.at && (
                    <div className="flex flex-col gap-1.5">
                        <Message message={starter} elapsed={elapsed} />
                        {replies > 0 && (
                            <motion.p {...LINE_ENTER} className="m-0 flex items-center gap-2.5">
                                <span className={cn(SCENE_SIZE[28], 'shrink-0')} />
                                <span className={cn(SCENE_TEXT[12], 'flex items-center gap-1.5')}>
                                    <BotAvatar size={16} />
                                    <span className={cn('font-bold', LINK)}>
                                        {replies} {replies === 1 ? 'reply' : 'replies'}
                                    </span>
                                </span>
                            </motion.p>
                        )}
                    </div>
                )}
            </div>
            <Composer placeholder={`Message #${scene.channel}`} />
        </div>
    )
}

const ThreadHeader = ({ scene, closable }: { scene: SlackScene; closable?: boolean }) => (
    <p aria-hidden className={cn('m-0 flex shrink-0 items-baseline gap-2 border-b px-3 py-2', BORDER)}>
        <strong>Thread</strong>
        <span className={cn(SCENE_TEXT[12], MUTED)}># {scene.channel}</span>
        <span className={cn(SCENE_TEXT[11], 'ml-auto', closable && '@3xl:hidden', MUTED)}>
            {scene.label ?? SAMPLE_LABEL}
        </span>
        {closable && <IconX className={cn(SCENE_SIZE[14], 'self-center @3xl:ml-auto', MUTED)} />}
    </p>
)

// Plays once when it scrolls into view, holds the last frame, then calls `onDone`
export default function SlackWindow({
    scene: written,
    variant = 'window',
    channels = [written.channel],
    people = [],
    onSelectChannel,
    onDone,
}: {
    scene: SlackScene
    /** `thread` shows only the thread */
    variant?: 'window' | 'thread'
    channels?: string[]
    people?: string[]
    /** Makes each channel a button */
    onSelectChannel?: (channel: string) => void
    onDone?: () => void
}): JSX.Element {
    const ref = useRef<HTMLDivElement>(null)
    const { pace, hold } = PLAYBACK[variant]
    const msPerChar = ANSWER_MS_PER_CHAR * pace
    const scene = useMemo(() => pacedScene(written, pace), [written, pace])
    const boundaries = useMemo(() => sceneBoundaries(scene, msPerChar, hold), [scene, msPerChar, hold])
    const doneAt = scene.endAt + hold
    const elapsed = useEventClock(ref, { loopMs: doneAt + 1, restingMs: scene.endAt, boundaries, loop: false })
    const done = elapsed >= doneAt
    useEffect(() => {
        if (done) onDone?.()
    }, [done, onDone])

    const replies = scene.messages.slice(1).filter(({ at }) => elapsed >= at).length
    const thread = (
        <ScrollToLatest className="px-3 pt-3">
            <div aria-hidden className="flex flex-col gap-3 pb-3">
                {scene.messages
                    .filter(({ at }) => elapsed >= at)
                    .map((message, index) => (
                        <Message key={index} message={message} elapsed={elapsed} />
                    ))}
            </div>
        </ScrollToLatest>
    )

    return (
        <StreamContext.Provider value={msPerChar}>
            <div
                ref={ref}
                className={cn('@container not-prose', variant === 'thread' && 'h-full')}
                role="group"
                aria-label="PostHog Slack app thread"
            >
                <p className="sr-only">{scene.summary}</p>
                {variant === 'thread' ? (
                    <div
                        className={cn(
                            SCENE_TEXT[12],
                            'flex h-96 flex-col overflow-hidden rounded-md border leading-snug @2xl/reader-content:h-full',
                            BORDER,
                            PANE
                        )}
                    >
                        <ThreadHeader scene={scene} />
                        {thread}
                    </div>
                ) : (
                    <WindowFrame
                        title={
                            <span
                                aria-hidden
                                className="flex w-1/2 items-center gap-1.5 rounded bg-white/20 px-3 py-0.5 font-normal text-white"
                            >
                                <IconSearch className={cn(SCENE_SIZE[12], 'shrink-0')} />
                                Search {WORKSPACE}
                            </span>
                        }
                        className={cn(SCENE_TEXT[12], 'rounded-md border-[#3F0E40] bg-[#3F0E40] leading-snug')}
                    >
                        <div className="flex min-h-0 flex-1">
                            <Sidebar
                                channel={scene.channel}
                                channels={channels}
                                people={people}
                                onSelectChannel={onSelectChannel}
                            />
                            <div
                                className={cn(
                                    'mb-1.5 ml-1.5 mr-1.5 flex min-w-0 flex-1 overflow-hidden rounded @lg:ml-0',
                                    PANE
                                )}
                            >
                                <ChannelPane scene={scene} elapsed={elapsed} replies={replies} />
                                <div
                                    className={cn(
                                        'flex min-w-0 flex-1 flex-col @3xl:w-1/2 @3xl:flex-none @3xl:border-l',
                                        BORDER,
                                        replies === 0 && '@3xl:hidden'
                                    )}
                                >
                                    {onSelectChannel && (
                                        <div
                                            className={cn(
                                                SCENE_TEXT[12],
                                                'scrollbar-hide flex shrink-0 gap-1 overflow-x-auto border-b px-2 py-1.5 @lg:hidden',
                                                BORDER
                                            )}
                                        >
                                            {channels.map((name) => (
                                                <ChannelButton
                                                    key={name}
                                                    name={name}
                                                    active={name === scene.channel}
                                                    onSelect={onSelectChannel}
                                                    className={cn(
                                                        'flex shrink-0 items-center gap-0.5 rounded px-2 py-0.5',
                                                        name === scene.channel
                                                            ? ACTIVE_CHANNEL
                                                            : cn(MUTED, 'hover:bg-[#F8F8F8] dark:hover:bg-[#222529]')
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    <ThreadHeader scene={scene} closable />
                                    {thread}
                                    <Composer placeholder="Reply…" />
                                </div>
                            </div>
                        </div>
                    </WindowFrame>
                )}
            </div>
        </StreamContext.Provider>
    )
}
