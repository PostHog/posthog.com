import React from 'react'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import { cn } from '../../../utils'
import { Radio } from '../Radio'
import { Checkbox } from '../Checkbox'
import { cardLevels, fieldState } from '../styles'
import { mergeClassName, withClassName } from '../utils'

const MultipleContext = React.createContext<boolean | null>(null)

export type ChoiceboxGroupProps =
    | ({ multiple?: false } & BaseRadioGroup.Props<string>)
    | ({ multiple: true } & BaseCheckboxGroup.Props)

const groupClasses = 'grid grid-cols-1 gap-3 @sm:grid-cols-2 @2xl:grid-cols-3'

type LayoutProps<State> = {
    className?: string | ((state: State) => string | undefined)
    style?: React.CSSProperties | ((state: State) => React.CSSProperties | undefined)
}

function splitLayout<State>({ className, style }: LayoutProps<State>) {
    return {
        wrapper: {
            className: typeof className === 'string' ? className : undefined,
            style: typeof style === 'function' ? undefined : style,
        },
        grid: {
            className: mergeClassName(groupClasses, typeof className === 'function' ? className : undefined),
            style: typeof style === 'function' ? style : undefined,
        },
    }
}

const Group = React.forwardRef<HTMLDivElement, ChoiceboxGroupProps>(function ChoiceboxGroup(props, ref) {
    let wrapper: { className?: string; style?: React.CSSProperties }
    let group: React.ReactNode
    if (props.multiple) {
        const { multiple, className, style, ...rest } = props
        const layout = splitLayout({ className, style })
        wrapper = layout.wrapper
        group = <BaseCheckboxGroup ref={ref} data-multiple={multiple} {...rest} {...layout.grid} />
    } else {
        const { multiple, className, style, ...rest } = props
        const layout = splitLayout({ className, style })
        wrapper = layout.wrapper
        group = <BaseRadioGroup ref={ref} data-multiple={multiple || undefined} {...rest} {...layout.grid} />
    }
    return (
        <MultipleContext.Provider value={Boolean(props.multiple)}>
            <div className={cn('@container w-full', wrapper.className)} style={wrapper.style}>
                {group}
            </div>
        </MultipleContext.Provider>
    )
})

export type ChoiceboxItemProps = React.LabelHTMLAttributes<HTMLLabelElement> & { value: string; disabled?: boolean }

const Item = React.forwardRef<HTMLLabelElement, ChoiceboxItemProps>(function ChoiceboxItem(
    { value, disabled, className, children, onClick, ...props },
    ref
) {
    const controlRef = React.useRef<HTMLElement>(null)
    const multiple = React.useContext(MultipleContext)
    if (multiple === null) throw new Error('Choicebox.Item requires Choicebox.Group')
    const Control = multiple ? Checkbox.Root : Radio.Root
    const Indicator = multiple ? Checkbox.Indicator : Radio.Indicator
    return (
        <label
            ref={ref}
            data-disabled={disabled || undefined}
            className={cn(
                'relative flex cursor-pointer flex-col gap-1 p-4 pr-12 text-primary',
                cardLevels[1],
                'transition-[border-color,background-color] duration-150 motion-reduce:transition-none hover:border-[rgb(var(--text-primary)/0.36)] has-[[data-checked]]:border-orange has-[[data-checked]]:bg-orange/10 dark:has-[[data-checked]]:bg-orange/10 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-orange has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:border-dashed has-[[data-disabled]]:border-[rgb(var(--text-primary)/0.3)] has-[[data-disabled]]:bg-transparent dark:has-[[data-disabled]]:bg-transparent has-[[data-disabled]]:bg-[repeating-linear-gradient(135deg,rgb(var(--text-primary)/0.08)_0_1px,transparent_1px_6px)] dark:has-[[data-disabled]]:bg-[repeating-linear-gradient(135deg,rgb(var(--text-primary)/0.08)_0_1px,transparent_1px_6px)] has-[[data-disabled]]:opacity-70 has-[[data-disabled]]:shadow-none dark:has-[[data-disabled]]:shadow-none',
                fieldState,
                className
            )}
            {...props}
            onClick={(event) => {
                onClick?.(event)
                const target = event.target as Element
                const control = controlRef.current
                if (event.defaultPrevented || !control || control.contains(target) || target.tagName === 'INPUT') return
                event.preventDefault()
                control.click()
            }}
        >
            <Control
                ref={controlRef}
                value={value}
                disabled={disabled}
                className="absolute right-4 top-4 focus-visible:outline-0"
            >
                <Indicator />
            </Control>
            {children}
        </label>
    )
})

const Title = withClassName('span', 'text-sm font-semibold')

const Description = withClassName('span', 'text-sm text-secondary')

export const Choicebox = { Group, Item, Title, Description }
