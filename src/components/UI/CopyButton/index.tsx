import React from 'react'
import { IconCheck, IconCopy, IconX } from '@posthog/icons'
import { IconButton } from '../Button'
import type { IconButtonProps } from '../Button'
import { toneIcon } from '../styles'
import { cn } from '../../../utils'

export type CopyButtonActions = { copy: () => void }

export type CopyButtonProps = Omit<IconButtonProps, 'icon' | 'aria-label' | 'onCopy'> & {
    label?: string
    onCopy?: () => void
    actionsRef?: React.Ref<CopyButtonActions>
} & ({ text: string; getText?: never } | { text?: never; getText: () => string })

const feedbackDuration = 2000
const iconTransition =
    'col-start-1 row-start-1 size-full transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none'

export const CopyButton = React.forwardRef<HTMLElement, CopyButtonProps>(function CopyButton(
    { text, getText, label = 'Copy', onCopy, onClick, actionsRef, size = 'sm', variant = 'secondary', ...props },
    ref
) {
    const [status, setStatus] = React.useState<'idle' | 'copied' | 'error'>('idle')
    const tintResult = variant === 'secondary'
    const timer = React.useRef<ReturnType<typeof setTimeout>>()
    const mounted = React.useRef(false)
    const copying = React.useRef(false)
    React.useEffect(() => {
        mounted.current = true
        return () => {
            mounted.current = false
            clearTimeout(timer.current)
        }
    }, [])

    async function copy() {
        if (copying.current) return
        copying.current = true
        clearTimeout(timer.current)
        setStatus('idle')
        let succeeded = false
        try {
            await navigator.clipboard.writeText(getText ? getText() : text)
            succeeded = true
        } catch {
            succeeded = false
        }
        copying.current = false
        if (!mounted.current) return
        setStatus(succeeded ? 'copied' : 'error')
        timer.current = setTimeout(() => setStatus('idle'), feedbackDuration)
        if (succeeded) onCopy?.()
    }

    React.useImperativeHandle(actionsRef, () => ({ copy: () => void copy() }))

    return (
        <>
            <IconButton
                {...props}
                ref={ref}
                size={size}
                variant={variant}
                aria-label={label}
                onClick={(event) => {
                    onClick?.(event)
                    if (!event.defaultPrevented) void copy()
                }}
                icon={
                    <span aria-hidden="true" className="grid size-full">
                        <IconCopy
                            className={cn(
                                iconTransition,
                                status === 'idle' ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                            )}
                        />
                        <IconCheck
                            className={cn(
                                iconTransition,
                                tintResult && toneIcon.success,
                                status === 'copied' ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                            )}
                        />
                        <IconX
                            className={cn(
                                iconTransition,
                                tintResult && toneIcon.error,
                                status === 'error' ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                            )}
                        />
                    </span>
                }
            />
            <span role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                {status === 'copied' ? 'Copied' : status === 'error' ? 'Copy failed' : ''}
            </span>
        </>
    )
})
