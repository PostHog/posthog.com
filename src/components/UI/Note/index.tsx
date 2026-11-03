import React from 'react'
import { cn } from '../../../utils'
import { cardLevels, tintedHeaderEdge } from '../styles'
import { colorHeader, colorIcon, colorText, resolveColor } from '../colors'
import type { ColorOrStatus } from '../colors'
import { statusIcon } from '../toneIcons'
import { flattenFragments } from '../utils'
import { wrapText } from '../truncation'

export type NoteRootProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> & {
    color?: ColorOrStatus
    size?: 'sm' | 'md'
}
export type NoteIconProps = React.HTMLAttributes<HTMLSpanElement>

const noteSizes = {
    sm: 'text-[13px] [--note-x:0.625rem] [--note-y:0.375rem] [--note-title-y:0.25rem]',
    md: 'text-sm [--note-x:0.75rem] [--note-y:0.5rem] [--note-title-y:0.375rem]',
}
const NoteColor = React.createContext<ColorOrStatus>('info')

const Root = React.forwardRef<HTMLDivElement, NoteRootProps>(function NoteRoot(
    { color = 'info', size = 'md', children, className, ...props },
    ref
) {
    const parts = flattenFragments(children)
    const icon = parts.find((child) => React.isValidElement(child) && child.type === Icon)
    const title = parts.find((child) => React.isValidElement(child) && child.type === Title)
    const action = parts.find((child) => React.isValidElement(child) && child.type === Action)
    const body = parts.filter((child) => child !== icon && child !== title && child !== action)
    return (
        <NoteColor.Provider value={color}>
            <div
                ref={ref}
                {...props}
                className={cn(
                    cardLevels[1],
                    '@container overflow-hidden leading-5 text-primary',
                    title && 'border-t-0',
                    noteSizes[size],
                    className
                )}
            >
                {title ? (
                    <>
                        <div
                            className={cn(
                                'flex min-w-0 items-start gap-2 px-[var(--note-x)] py-[var(--note-title-y)]',
                                tintedHeaderEdge,
                                colorHeader[resolveColor(color)]
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
        </NoteColor.Provider>
    )
})

const Icon = React.forwardRef<HTMLSpanElement, NoteIconProps>(function NoteIcon(
    { children, className, ...props },
    ref
) {
    const noteColor = React.useContext(NoteColor)
    const DefaultIcon = statusIcon(noteColor)
    return (
        <span
            ref={ref}
            {...props}
            aria-hidden
            className={cn(
                'flex h-5 shrink-0 items-center [&>svg]:size-4',
                colorIcon[resolveColor(noteColor)],
                className
            )}
        >
            {children === undefined ? <DefaultIcon /> : children}
        </span>
    )
})
const Title = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function NoteTitle(
    { className, ...props },
    ref
) {
    const noteColor = React.useContext(NoteColor)
    return (
        <div
            ref={ref}
            {...props}
            className={cn(wrapText, 'flex-1 font-semibold', colorText[resolveColor(noteColor)], className)}
        />
    )
})
const Content = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function NoteContent(
    { className, ...props },
    ref
) {
    return (
        <div ref={ref} {...props} className={cn(wrapText, '[&>*:first-child]:mt-0 [&>*:last-child]:mb-0', className)} />
    )
})
const Action = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function NoteAction(
    { className, ...props },
    ref
) {
    return <div ref={ref} {...props} className={cn('flex max-w-full flex-wrap gap-2', className)} />
})
export const Note = { Root, Icon, Title, Content, Action }
