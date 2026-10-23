import React from 'react'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import { cn } from '../../../utils'
import { Radio } from '../Radio'
import { Checkbox } from '../Checkbox'
import { cardLevels, fieldState } from '../styles'
import { mergeClassName } from '../utils'

const MultipleContext = React.createContext<boolean | null>(null)

export type ChoiceboxGroupProps =
    | ({ multiple?: false } & BaseRadioGroup.Props<string>)
    | ({ multiple: true } & BaseCheckboxGroup.Props)

const groupClasses = 'grid grid-cols-1 gap-3 @sm:grid-cols-2 @2xl:grid-cols-3'

const Group = React.forwardRef<HTMLDivElement, ChoiceboxGroupProps>(function ChoiceboxGroup(props, ref) {
    let group: React.ReactNode
    if (props.multiple) {
        const { multiple, className, ...rest } = props
        group = (
            <BaseCheckboxGroup
                ref={ref}
                data-multiple={multiple}
                {...rest}
                className={mergeClassName(groupClasses, className)}
            />
        )
    } else {
        const { multiple, className, ...rest } = props
        group = (
            <BaseRadioGroup
                ref={ref}
                data-multiple={multiple || undefined}
                {...rest}
                className={mergeClassName(groupClasses, className)}
            />
        )
    }
    return (
        <MultipleContext.Provider value={Boolean(props.multiple)}>
            <div className="@container w-full">{group}</div>
        </MultipleContext.Provider>
    )
})

export type ChoiceboxItemProps = React.LabelHTMLAttributes<HTMLLabelElement> & { value: string; disabled?: boolean }

const Item = React.forwardRef<HTMLLabelElement, ChoiceboxItemProps>(function ChoiceboxItem(
    { value, disabled, className, children, ...props },
    ref
) {
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
        >
            <Control value={value} disabled={disabled} className="absolute right-4 top-4 focus-visible:outline-0">
                <Indicator />
            </Control>
            {children}
        </label>
    )
})

const Title = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(function ChoiceboxTitle(
    { className, ...props },
    ref
) {
    return <span ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
})

const Description = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    function ChoiceboxDescription({ className, ...props }, ref) {
        return <span ref={ref} className={cn('text-sm text-secondary', className)} {...props} />
    }
)

export const Choicebox = { Group, Item, Title, Description }
