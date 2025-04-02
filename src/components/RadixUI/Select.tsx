import React from 'react'
import { Select as RadixSelect } from 'radix-ui'
import { IconCheck, IconChevronDown } from '@posthog/icons'

type SelectItem = {
    value: string
    label: string
    disabled?: boolean
}

type SelectGroup = {
    label: string
    items: SelectItem[]
}

type SelectProps = {
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    placeholder?: string
    disabled?: boolean
    required?: boolean
    name?: string
    ariaLabel?: string
    groups: SelectGroup[]
    className?: string
}

const SelectItem = React.forwardRef(
    ({ children, className, ...props }: React.ComponentPropsWithoutRef<typeof RadixSelect.Item>, forwardedRef) => {
        return (
            <RadixSelect.Item
                className={`relative flex h-[25px] select-none items-center rounded pl-8 pr-4 text-sm leading-none text-primary/80 hover:text-primary dark:hover:text-primary-dark data-[disabled]:pointer-events-none data-[highlighted]:bg-accent-2 dark:data-[highlighted]:bg-white/5 data-[disabled]:text-primary/50 dark:data-[disabled]:text-primary-dark/50 data-[disabled]:cursor-not-allowed data-[highlighted]:text-primary data-[highlighted]:outline-none data-[state=checked]:font-bold ${className}`}
                {...props}
                ref={forwardedRef as React.Ref<HTMLDivElement>}
            >
                <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className="absolute left-1 inline-flex w-[25px] items-center justify-center">
                    <IconCheck className="size-4" />
                </RadixSelect.ItemIndicator>
            </RadixSelect.Item>
        )
    }
)

SelectItem.displayName = 'SelectItem'

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
    (
        { value, defaultValue, onValueChange, placeholder, disabled, required, name, ariaLabel, groups, className },
        ref
    ) => {
        return (
            <RadixSelect.Root
                value={value}
                defaultValue={defaultValue}
                onValueChange={onValueChange}
                disabled={disabled}
                required={required}
                name={name}
            >
                <RadixSelect.Trigger
                    ref={ref}
                    className={`inline-flex items-center justify-center gap-1 rounded px-2 py-1 text-sm leading-none text-primary dark:text-primary-dark bg-accent dark:bg-accent-dark outline-none hover:bg-accent-2 dark:hover:bg-accent-dark focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-primary/60 ${className}`}
                    aria-label={ariaLabel}
                >
                    <RadixSelect.Value placeholder={placeholder} />
                    <RadixSelect.Icon className="text-primary/50 dark:text-primary-dark/50">
                        <IconChevronDown className="size-6" />
                    </RadixSelect.Icon>
                </RadixSelect.Trigger>
                <RadixSelect.Portal>
                    <RadixSelect.Content className="overflow-hidden rounded bg-white dark:bg-accent-dark shadow-xl">
                        <RadixSelect.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white dark:bg-accent-dark text-primary/60 dark:text-primary-dark/60">
                            <IconChevronDown className="size-4 rotate-180" />
                        </RadixSelect.ScrollUpButton>
                        <RadixSelect.Viewport className="p-1">
                            {groups.map((group, index) => (
                                <React.Fragment key={group.label}>
                                    <RadixSelect.Group>
                                        <RadixSelect.Label className="px-8 text-sm leading-[25px] text-primary/60 dark:text-primary-dark/60">
                                            {group.label}
                                        </RadixSelect.Label>
                                        {group.items.map((item) => (
                                            <SelectItem
                                                key={item.value}
                                                value={item.value}
                                                disabled={item.disabled}
                                                className="text-primary dark:text-primary-dark"
                                            >
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </RadixSelect.Group>
                                    {index < groups.length - 1 && (
                                        <RadixSelect.Separator className="m-1 h-px bg-border dark:bg-border-dark" />
                                    )}
                                </React.Fragment>
                            ))}
                        </RadixSelect.Viewport>
                        <RadixSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white dark:bg-accent-dark text-primary dark:text-primary-dark">
                            <IconChevronDown className="size-4" />
                        </RadixSelect.ScrollDownButton>
                    </RadixSelect.Content>
                </RadixSelect.Portal>
            </RadixSelect.Root>
        )
    }
)

Select.displayName = 'Select'
