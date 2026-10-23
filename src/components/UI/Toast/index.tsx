import React from 'react'
import { Toast as BaseToast } from '@base-ui/react/toast'
import { IconX } from '@posthog/icons'
import { cn } from '../../../utils'
import { Button, IconButton } from '../Button'
import { raisedOverlayShadowMd, toneIcon } from '../styles'
import { isTone, toneIcons } from '../toneIcons'
import { Spinner } from '../Spinner'

const toastViewport =
    'fixed bottom-4 right-4 top-auto z-50 mx-auto w-[calc(100vw-2rem)] sm:bottom-8 sm:right-8 sm:w-[22.5rem]'

const toastStack =
    "[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] absolute bottom-0 left-auto right-0 z-[calc(1000-var(--toast-index))] mr-0 h-[var(--height)] w-full origin-bottom select-none [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s] after:absolute after:left-0 after:top-full after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-[expanded]:h-[var(--toast-height)] data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))] data-[limited]:opacity-0 data-[ending-style]:opacity-0 data-[starting-style]:[transform:translateY(150%)] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)] data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] motion-reduce:[transition:opacity_0.15s]"

const toastSurface = `rounded-md border border-primary bg-primary text-primary ${raisedOverlayShadowMd}`

const StatusIcon = ({ type }: { type?: string }): JSX.Element | null => {
    if (type === 'loading') return <Spinner aria-hidden size="lg" className="text-secondary" />
    if (!isTone(type)) return null
    const Icon = toneIcons[type]
    return <Icon aria-hidden className={cn('size-5 shrink-0', toneIcon[type])} />
}

const ToastList = (): JSX.Element => {
    const { toasts } = BaseToast.useToastManager()

    return (
        <>
            {toasts.map((toast) => (
                <BaseToast.Root
                    key={toast.id}
                    toast={toast}
                    data-scheme="primary"
                    className={cn(toastStack, toastSurface)}
                >
                    <BaseToast.Content className="flex items-start gap-3 overflow-hidden p-4 transition-opacity duration-[250ms] data-[behind]:opacity-0 data-[expanded]:opacity-100">
                        <StatusIcon type={toast.type} />
                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                            <BaseToast.Title className="my-0 text-[15px] font-semibold leading-5 text-primary" />
                            <BaseToast.Description className="my-0 text-sm text-secondary" />
                        </div>
                        <div className="-my-[3px] flex shrink-0 items-center gap-1">
                            <BaseToast.Action render={<Button size="sm" />} />
                            <BaseToast.Close render={<IconButton size="sm" aria-label="Close" icon={<IconX />} />} />
                        </div>
                    </BaseToast.Content>
                </BaseToast.Root>
            ))}
        </>
    )
}

export type ToastViewportProps = BaseToast.Viewport.Props & {
    container?: BaseToast.Portal.Props['container']
}

const Viewport = React.forwardRef<HTMLDivElement, ToastViewportProps>(function ToastViewport(
    { className, container, ...props },
    ref
) {
    return (
        <BaseToast.Portal container={container}>
            <BaseToast.Viewport ref={ref} className={cn(toastViewport, className)} {...props}>
                <ToastList />
            </BaseToast.Viewport>
        </BaseToast.Portal>
    )
})

export const Toast = {
    Provider: BaseToast.Provider,
    Viewport,
    useToastManager: BaseToast.useToastManager,
    createToastManager: BaseToast.createToastManager,
}
