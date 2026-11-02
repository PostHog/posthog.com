import React from 'react'
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { mergeProps } from '@base-ui/react/merge-props'
import { grainSurface, popupArrow, overlayShadowSm, popupTransition, positionerLayer } from '../styles'
import { assignRef, mergeClassName, positionerPropNames, splitProps } from '../utils'
import type { PositionerPropName } from '../utils'

const OPEN_DELAY_MS = 0

const tooltipPopup = `${grainSurface} pointer-events-none relative max-w-[min(20rem,var(--available-width))] select-none rounded border border-primary bg-primary px-2 py-1 text-[13px] leading-4 text-primary ${overlayShadowSm} ${popupTransition} data-[instant]:transition-none`

export type TooltipRootProps = Omit<BaseTooltip.Root.Props, 'disableHoverablePopup'>

function Root(props: TooltipRootProps): JSX.Element {
    return <BaseTooltip.Root {...props} disableHoverablePopup />
}

type TriggerRender = BaseTooltip.Trigger.Props['render']

type TriggerRenderFunction = Extract<NonNullable<TriggerRender>, (...args: never[]) => unknown>

type ElementWithRef = React.ReactElement & { ref?: React.Ref<HTMLElement> }

const POPUP_OPEN_ATTRIBUTE = 'data-popup-open'

function withoutPopupOpen<Props extends React.HTMLAttributes<HTMLElement>>(props: Props): Props {
    return Object.fromEntries(Object.entries(props).filter(([name]) => name !== POPUP_OPEN_ATTRIBUTE)) as Props
}

type TriggerElementProps = React.HTMLAttributes<HTMLElement> & { element: ElementWithRef }

const TriggerElement = React.forwardRef<HTMLElement, TriggerElementProps>(function TooltipTriggerElement(
    { element, ...props },
    ref
) {
    const elementRef = element.ref
    const composedRef = React.useCallback(
        (node: HTMLElement | null) => {
            assignRef(ref, node)
            assignRef(elementRef ?? null, node)
        },
        [ref, elementRef]
    )
    return React.cloneElement(element, { ...mergeProps(withoutPopupOpen(props), element.props), ref: composedRef })
})

const renderWithoutPopupOpen =
    (render: TriggerRenderFunction): TriggerRenderFunction =>
    (props, state) =>
        render(withoutPopupOpen(props), state)

const Trigger = React.forwardRef<HTMLButtonElement, Omit<BaseTooltip.Trigger.Props, 'ref'>>(function TooltipTrigger(
    { delay = OPEN_DELAY_MS, render, ...props },
    ref
) {
    const triggerRender =
        typeof render === 'function' ? (
            renderWithoutPopupOpen(render)
        ) : (
            <TriggerElement element={render ?? <button type={props.type ?? 'button'} />} />
        )
    return <BaseTooltip.Trigger ref={ref} delay={delay} render={triggerRender} {...props} />
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
