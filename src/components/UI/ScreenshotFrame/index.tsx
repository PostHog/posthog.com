import React from 'react'
import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react'
import { IconLock, IconSquare, IconX } from '@posthog/icons'
import { CopyButton } from '../CopyButton'
import { Gallery } from '../Gallery'
import { cn } from '../../../utils'
import { cardLevels } from '../styles'

export type ScreenshotFrameKind = 'browser' | 'phone' | 'laptop'

export type ScreenshotFrameProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    src: string
    darkSrc?: string
    alt: string
    frame?: ScreenshotFrameKind
    title?: string
    address?: string
    copyAddress?: boolean
    caption?: ReactNode
    zoom?: boolean
    imageClassName?: string
    imageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'className'>
}

const deviceBlack = 'bg-[#0d0d0f]'

const deviceEdge = 'shadow-[0_0_0_1px_#3b3b3f,0_0_0_2.5px_#1b1b1d]'

const deviceScreen =
    'relative overflow-hidden bg-white dark:bg-dark [&_button]:absolute [&_button]:inset-0 [&_button]:rounded-none'

export const ScreenshotFrame = React.forwardRef<HTMLElement, ScreenshotFrameProps>(function ScreenshotFrame(
    {
        src,
        darkSrc,
        alt,
        frame = 'browser',
        title = 'PostHog',
        address = 'posthog.com',
        copyAddress = false,
        caption,
        zoom = false,
        imageClassName,
        imageProps,
        className,
        ...props
    },
    ref
) {
    const device = frame !== 'browser'
    const imageFit = device ? 'absolute inset-x-0 top-0 block h-auto w-full' : 'block h-auto w-full'

    const images = (
        <>
            <img
                loading="lazy"
                decoding="async"
                {...imageProps}
                src={src}
                alt={alt}
                className={cn('m-0', imageFit, darkSrc && 'dark:hidden', imageClassName)}
            />
            {darkSrc && (
                <img
                    loading="lazy"
                    decoding="async"
                    {...imageProps}
                    src={darkSrc}
                    alt={alt}
                    className={cn('m-0', imageFit, 'hidden dark:block', imageClassName)}
                />
            )}
        </>
    )

    const screen = zoom ? (
        <Gallery
            items={[
                {
                    imageLight: src,
                    imageDark: darkSrc,
                    alt,
                    caption,
                    width: Number(imageProps?.width) || undefined,
                    height: Number(imageProps?.height) || undefined,
                },
            ]}
            label={title}
            frame={false}
            columns={1}
            showThumbnailCaptions={false}
            renderThumbnail={() => images}
        />
    ) : (
        images
    )

    return (
        <figure ref={ref} {...props} className={cn('@container m-0 min-w-0', className)}>
            {frame === 'browser' && (
                <div className={cn(cardLevels[1], 'overflow-hidden')}>
                    <div className="flex items-center gap-2 border-b border-[rgb(var(--text-primary)/0.12)] bg-[rgb(var(--text-primary)/0.045)] py-1.5 pl-2 pr-1.5 dark:bg-white/[0.035]">
                        <div className="flex h-7 min-w-0 flex-1 items-center gap-1.5 rounded-md border border-[rgb(var(--text-primary)/0.1)] bg-white/70 pl-2.5 pr-0.5 text-xs text-secondary dark:bg-white/[0.06]">
                            <IconLock aria-hidden className="size-3.5 shrink-0 opacity-70" />
                            <span className="min-w-0 flex-1 truncate">{address}</span>
                            {copyAddress && (
                                <CopyButton
                                    text={`https://${address.replace(/^https?:\/\//, '')}`}
                                    label="Copy address"
                                />
                            )}
                        </div>
                        <span aria-hidden className="flex shrink-0 items-center text-secondary">
                            <span className="flex size-7 items-center justify-center">
                                <IconSquare className="size-3.5" />
                            </span>
                            <span className="flex size-7 items-center justify-center">
                                <IconX className="size-4" />
                            </span>
                        </span>
                    </div>
                    {screen}
                </div>
            )}
            {frame === 'phone' && (
                <div className="relative mx-auto w-full max-w-[18rem]">
                    <span
                        aria-hidden
                        className="absolute -left-[3px] top-[17%] h-[6%] w-[3px] rounded-l-sm bg-[#2c2c30]"
                    />
                    <span
                        aria-hidden
                        className="absolute -left-[3px] top-[25%] h-[6%] w-[3px] rounded-l-sm bg-[#2c2c30]"
                    />
                    <span
                        aria-hidden
                        className="absolute -right-[3px] top-[21%] h-[10%] w-[3px] rounded-r-sm bg-[#2c2c30]"
                    />
                    <div
                        className={cn(
                            'rounded-[2.75rem] p-[0.6875rem] shadow-[0_24px_48px_-16px_rgb(0_0_0/0.45)]',
                            deviceBlack,
                            deviceEdge
                        )}
                    >
                        <div className={cn(deviceScreen, 'aspect-[9/19.5] rounded-[2.1rem]')}>
                            {screen}
                            <span
                                aria-hidden
                                className="pointer-events-none absolute left-1/2 top-2.5 z-[1] h-[1.6rem] w-[34%] -translate-x-1/2 rounded-full bg-black"
                            />
                        </div>
                    </div>
                </div>
            )}
            {frame === 'laptop' && (
                <div className="mx-auto w-full max-w-4xl">
                    <div
                        className={cn(
                            'relative mx-[6.5%] rounded-t-[1.1rem] px-[1.6%] pb-[2.2%] pt-[2.6%]',
                            deviceBlack,
                            deviceEdge
                        )}
                    >
                        <span
                            aria-hidden
                            className="absolute left-1/2 top-[1.1%] size-[5px] -translate-x-1/2 rounded-full bg-[#26262a] shadow-[inset_0_0_0_1px_#3b3b3f]"
                        />
                        <div className={cn(deviceScreen, 'aspect-[16/10] rounded-[3px]')}>{screen}</div>
                    </div>
                    <div
                        aria-hidden
                        className="relative h-3.5 rounded-b-[0.9rem] rounded-t-[2px] bg-[linear-gradient(to_bottom,#e8e9ec,#cfd0d4_45%,#a7a8ad)] shadow-[0_14px_24px_-12px_rgb(0_0_0/0.5),inset_0_1px_0_rgb(255_255_255/0.7)] @2xl:h-4"
                    >
                        <span className="absolute left-1/2 top-0 h-[42%] w-[15%] -translate-x-1/2 rounded-b-md bg-[linear-gradient(to_bottom,#b4b5ba,#c6c7cb)]" />
                    </div>
                </div>
            )}
            {caption && (
                <figcaption className={cn('mt-3 text-sm leading-5 text-secondary', device && 'text-center')}>
                    {caption}
                </figcaption>
            )}
        </figure>
    )
})
