import React from 'react'
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { popupArrow, overlayShadowSm, popupTransition, positionerLayer } from '../styles'
import { mergeClassName, positionerPropNames, splitProps } from '../utils'
import type { PositionerPropName } from '../utils'

const OPEN_DELAY_MS = 0

const tooltipPopup = `pointer-events-none relative max-w-[min(20rem,var(--available-width))] select-none rounded border border-primary bg-primary px-2 py-1 text-[13px] leading-4 text-primary ${overlayShadowSm} ${popupTransition} data-[instant]:transition-none`

export type TooltipRootProps = Omit<BaseTooltip.Root.Props, 'disableHoverablePopup'>

function Root(props: TooltipRootProps): JSX.Element {
    return <BaseTooltip.Root {...props} disableHoverablePopup />
}

const Trigger = React.forwardRef<HTMLButtonElement, Omit<BaseTooltip.Trigger.Props, 'ref'>>(function TooltipTrigger(
    { delay = OPEN_DELAY_MS, ...props },
    ref
) {
    return <BaseTooltip.Trigger ref={ref} delay={delay} {...props} />
})

export type TooltipPopupProps = BaseTooltip.Popup.Props &
    Pick<BaseTooltip.Positioner.Props, PositionerPropName> & {
        container?: BaseTooltip.Portal.Props['container']
        showArrow?: boolean
    }

const Popup = React.forwardRef<HTMLDivElement, TooltipPopupProps>(function TooltipPopup(
    { className, children, container, showArrow = true, ...props },
    ref
) {
    const [positionerProps, popupProps] = splitProps(props, positionerPropNames)

    return (
        <BaseTooltip.Portal container={container}>
            <BaseTooltip.Positioner sideOffset={showArrow ? 8 : 4} {...positionerProps} className={positionerLayer}>
                <BaseTooltip.Popup
                    ref={ref}
                    data-scheme="primary"
                    className={mergeClassName(tooltipPopup, className)}
                    {...popupProps}
                >
                    {children}
                    {showArrow && <BaseTooltip.Arrow className={popupArrow} />}
                </BaseTooltip.Popup>
            </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
    )
})

export const Tooltip = {
    Provider: BaseTooltip.Provider,
    Root,
    Trigger,
    Popup,
}
