import React from 'react'
import { Toast as BaseToast } from '@base-ui/react/toast'
import { IconX } from '@posthog/icons'
import { cn } from '../../../utils'
import { Button, IconButton } from '../Button'
import { raisedOverlayShadowMd } from '../styles'
import { colorIcon, isColorOrStatus, resolveColor } from '../colors'
import { statusIcon } from '../toneIcons'
import { Spinner } from '../Spinner'

export type ToastData = {
    image?: React.ReactNode
    align?: 'start' | 'center'
}

const SITE_TOAST_TIMEOUT_MS = 3000
const SITE_TOAST_LIMIT = 20

const toastViewport =
    'pointer-events-none fixed bottom-4 right-0 top-auto z-50 m-0 h-[min(75vh,720px)] w-[calc(390px+1rem)] max-w-[calc(100vw-1rem)] outline-none [mask-image:linear-gradient(to_top,#000_calc(100%-8rem),transparent)]'

const toastMotion =
    "pointer-events-auto absolute bottom-0 right-4 z-[calc(1000-var(--toast-index))] w-[calc(100%-1rem)] [--gap:0.5rem] [--stack-y:calc(var(--toast-offset-y,0px)*-1-var(--toast-index,0)*var(--gap))] [transform:translateX(var(--toast-swipe-movement-x,0px))_translateY(var(--stack-y))] transition-[transform,opacity] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] after:absolute after:left-0 after:top-full after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-[starting-style]:[transform:translateX(calc(100%+1rem))_translateY(var(--stack-y))] data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 [&[data-ending-style]:not([data-swipe-direction])]:[transform:translateX(calc(100%+1rem))_translateY(var(--stack-y))] data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+100%+1rem))_translateY(var(--stack-y))] data-[limited]:pointer-events-none data-[limited]:opacity-0 motion-reduce:transition-[opacity]"

const toastSurface = `rounded-md border border-primary bg-primary text-primary ${raisedOverlayShadowMd}`

export const globalToastManager = BaseToast.createToastManager<ToastData>()

const StatusIcon = ({ type }: { type?: string }): JSX.Element | null => {
    if (type === 'loading') return <Spinner aria-hidden size="lg" className="text-secondary" />
    if (!isColorOrStatus(type)) return null
    const Icon = statusIcon(type)
    return <Icon aria-hidden className={cn('size-5 shrink-0', colorIcon[resolveColor(type)])} />
}

const ToastList = (): JSX.Element => {
    const { toasts } = BaseToast.useToastManager<ToastData>()

    return (
        <>
            {toasts.map((toast) => (
                <BaseToast.Root
                    key={toast.id}
                    toast={toast}
                    data-scheme="primary"
                    swipeDirection="right"
                    className={cn(toastMotion, toastSurface)}
                >
                    <BaseToast.Content
                        className={cn('flex gap-3 p-4', toast.data?.align === 'start' ? 'items-start' : 'items-center')}
                    >
                        <StatusIcon type={toast.type} />
                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                            <BaseToast.Title className="my-0 text-[15px] font-semibold leading-5 text-primary" />
                            <BaseToast.Description className="my-0 text-sm text-secondary" />
                        </div>
                        <div className="-my-[3px] flex shrink-0 items-center gap-1">
                            <BaseToast.Action render={<Button appearance="flat" size="sm" />} />
                            <BaseToast.Close
                                render={<IconButton appearance="flat" size="sm" aria-label="Close" icon={<IconX />} />}
                            />
                        </div>
                    </BaseToast.Content>
                    {toast.data?.image}
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

export type SiteToastProviderProps = Omit<BaseToast.Provider.Props, 'toastManager'>

const SiteProvider = ({ children, ...props }: SiteToastProviderProps): JSX.Element => (
    <BaseToast.Provider
        toastManager={globalToastManager}
        timeout={SITE_TOAST_TIMEOUT_MS}
        limit={SITE_TOAST_LIMIT}
        {...props}
    >
        {children}
        <Viewport />
    </BaseToast.Provider>
)

export const Toast = {
    SiteProvider,
    Provider: BaseToast.Provider,
    Viewport,
    useToastManager: BaseToast.useToastManager,
    createToastManager: BaseToast.createToastManager,
}
