import React from 'react'
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import { grainSurface, insetFocusRing } from '../styles'
import { mergeClassName, withClassName } from '../utils'

const Root = withClassName(BaseScrollArea.Root, 'relative min-h-0 overflow-hidden')

const edgeFadeMask =
    '[--fade-size:24px] [--fade-x-direction:to_right] [&:dir(rtl)]:[--fade-x-direction:to_left] [mask-image:linear-gradient(var(--fade-x-direction),transparent,black_min(var(--fade-size),var(--scroll-area-overflow-x-start,0px)),black_calc(100%_-_min(var(--fade-size),var(--scroll-area-overflow-x-end,0px))),transparent),linear-gradient(to_bottom,transparent,black_min(var(--fade-size),var(--scroll-area-overflow-y-start,0px)),black_calc(100%_-_min(var(--fade-size),var(--scroll-area-overflow-y-end,0px))),transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in]'

export type ScrollAreaViewportProps = BaseScrollArea.Viewport.Props & {
    edgeFades?: boolean
}

const Viewport = React.forwardRef<HTMLDivElement, ScrollAreaViewportProps>(function ScrollAreaViewport(
    { edgeFades = false, className, ...props },
    ref
) {
    return (
        <BaseScrollArea.Viewport
            ref={ref}
            className={mergeClassName(
                `size-full overscroll-contain rounded-[inherit] ${insetFocusRing} ${edgeFades ? edgeFadeMask : ''}`,
                className
            )}
            {...props}
        />
    )
})

const Scrollbar = withClassName(
    BaseScrollArea.Scrollbar,
    'pointer-events-none m-0.5 flex touch-none select-none rounded-full opacity-0 transition-opacity delay-300 duration-200 data-[hovering]:pointer-events-auto data-[scrolling]:pointer-events-auto data-[hovering]:opacity-100 data-[scrolling]:opacity-100 data-[hovering]:delay-0 data-[scrolling]:delay-0 data-[scrolling]:duration-0 data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5 data-[orientation=horizontal]:flex-col'
)

const Thumb = withClassName(
    BaseScrollArea.Thumb,
    `${grainSurface} rounded-full bg-[rgb(var(--text-primary)/0.28)] hover:bg-[rgb(var(--text-primary)/0.4)] active:bg-[rgb(var(--text-primary)/0.5)] data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full`
)

const Corner = withClassName(BaseScrollArea.Corner, 'bg-transparent')

export const ScrollArea = { Root, Viewport, Content: BaseScrollArea.Content, Scrollbar, Thumb, Corner }
