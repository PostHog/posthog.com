import React from 'react'
import { cn } from '../../../utils'
import { cardLevels, toneFill, toneText, toneIcon } from '../styles'
import type { Tone } from '../styles'
import { toneIcons } from '../toneIcons'

export type NoteType = 'action' | 'fyi' | 'caution'
export type NoteRootProps = React.HTMLAttributes<HTMLDivElement> & { tone?: Tone; type?: NoteType; size?: 'sm' | 'md' }
export type NoteIconProps = React.HTMLAttributes<HTMLSpanElement>

const noteSizes = {
    sm: 'text-[13px] [--note-x:0.625rem] [--note-y:0.375rem] [--note-title-y:0.25rem]',
    md: 'text-sm [--note-x:0.75rem] [--note-y:0.5rem] [--note-title-y:0.375rem]',
}
const NoteTone = React.createContext<Tone>('info')
const legacyTones: Record<NoteType, Tone> = { action: 'warning', fyi: 'neutral', caution: 'error' }

function flattenChildren(children: React.ReactNode): React.ReactNode[] {
    return React.Children.toArray(children).flatMap((child) =>
        React.isValidElement<{ children?: React.ReactNode }>(child) && child.type === React.Fragment
            ? flattenChildren(child.props.children)
            : [child]
    )
}

const Root = React.forwardRef<HTMLDivElement, NoteRootProps>(function NoteRoot(
    { tone, type, size = 'md', children, className, ...props },
    ref
) {
    const resolvedTone = tone ?? (type ? legacyTones[type] : 'info')
    const parts = flattenChildren(children)
    const icon = parts.find((child) => React.isValidElement(child) && child.type === Icon)
    const title = parts.find((child) => React.isValidElement(child) && child.type === Title)
    const action = parts.find((child) => React.isValidElement(child) && child.type === Action)
    const body = parts.filter((child) => child !== icon && child !== title && child !== action)
    return (
        <NoteTone.Provider value={resolvedTone}>
            <div className="@container">
                <div
                    ref={ref}
                    {...props}
                    className={cn(cardLevels[1], 'overflow-hidden leading-5 text-primary', noteSizes[size], className)}
                >
                    {title ? (
                        <>
                            <div
                                className={cn(
                                    'flex min-w-0 items-start gap-2 px-[var(--note-x)] py-[var(--note-title-y)]',
                                    toneFill[resolvedTone]
                                )}
                            >
                                {icon}
                                {title}
                            </div>
                            <div className="flex min-w-0 flex-col items-start gap-2 px-[var(--note-x)] py-[var(--note-y)] @md:flex-row @md:items-center">
                                <div className="min-w-0 flex-1">{body}</div>
                                {action && <div className="max-w-full shrink-0">{action}</div>}
                            </div>
                        </>
                    ) : (
                        <div className="flex min-w-0 items-start gap-2 px-[var(--note-x)] py-[var(--note-y)]">
                            {icon}
                            <div className="flex min-w-0 flex-1 flex-col gap-2 @md:flex-row @md:items-center">
                                <div className="min-w-0 flex-1">{body}</div>
                                {action && <div className="max-w-full shrink-0 @md:-my-[3px]">{action}</div>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </NoteTone.Provider>
    )
})

const Icon = React.forwardRef<HTMLSpanElement, NoteIconProps>(function NoteIcon(
    { children, className, ...props },
    ref
) {
    const tone = React.useContext(NoteTone)
    const DefaultIcon = toneIcons[tone]
    return (
        <span
            ref={ref}
            {...props}
            aria-hidden
            className={cn('flex h-5 shrink-0 items-center [&>svg]:size-4', toneIcon[tone], className)}
        >
            {children === undefined ? <DefaultIcon /> : children}
        </span>
    )
})
const Title = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function NoteTitle(
    { className, ...props },
    ref
) {
    const tone = React.useContext(NoteTone)
    return (
        <div
            ref={ref}
            {...props}
            className={cn('min-w-0 flex-1 font-semibold [overflow-wrap:anywhere]', toneText[tone], className)}
        />
    )
})
const Content = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function NoteContent(
    { className, ...props },
    ref
) {
    return (
        <div
            ref={ref}
            {...props}
            className={cn('min-w-0 [overflow-wrap:anywhere] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0', className)}
        />
    )
})
const Action = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function NoteAction(
    { className, ...props },
    ref
) {
    return <div ref={ref} {...props} className={cn('flex max-w-full flex-wrap gap-2', className)} />
})
export const Note = { Root, Icon, Title, Content, Action }
