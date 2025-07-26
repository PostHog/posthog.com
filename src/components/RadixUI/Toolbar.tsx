import * as React from 'react'
import * as RadixToolbar from '@radix-ui/react-toolbar'
import OSButton from 'components/OSButton'
import { Select } from './Select'

export type ToolbarItem = {
    value: string
    label: string
    icon?: React.ReactNode
    disabled?: boolean
    className?: string
    onClick?: () => void
}

export type ToolbarGroup = {
    type: 'multiple' | 'single'
    label: string
    className?: string
    items: ToolbarItem[]
    defaultValue?: string
    disabled?: boolean
}

export type ToolbarSelect = {
    type: 'select'
    value?: string
    defaultValue?: string
    placeholder?: string
    className?: string
    disabled?: boolean
    groups: {
        label: string
        items: {
            value: string
            label: string
            icon?: string
            color?: string
            disabled?: boolean
        }[]
    }[]
}

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'underline' | 'ghost'

export type ToolbarElement =
    | ToolbarGroup
    | { type: 'separator' }
    | ToolbarSelect
    | {
          type: 'button'
          label: string
          onClick?: () => void
          disabled?: boolean
          className?: string
          icon?: React.ReactNode
          hideLabel?: boolean
          variant?: ButtonVariant
          size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
          active?: boolean
      }
    | {
          type: 'container'
          className?: string
          children: React.ReactNode
      }

interface ToolbarProps {
    elements: ToolbarElement[]
    className?: string
    'aria-label'?: string
}

const toggleItemButtonClasses =
    'bg-primary px-[5px] text-[13px] leading-none text-secondary outline-none hover:bg-accent hover:text-primary focus:relative focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-primary data-[state=on]:bg-accent-2 hover:data-[state=on]:bg-accent-2 data-[state=on]:text-primary disabled:hover:bg-primary disabled:hover:text-secondary'

export const Toolbar = ({ elements, className, 'aria-label': ariaLabel }: ToolbarProps) => {
    return (
        <RadixToolbar.Root
            data-scheme="secondary"
            className={`flex w-full min-w-max skin-modern:rounded bg-primary skin-modern:p-1 skin-modern:border border-primary ${
                className || ''
            }`}
            aria-label={ariaLabel}
            loop={true}
        >
            {elements.map((element, index) => {
                if (element.type === 'separator') {
                    return <RadixToolbar.Separator key={index} className="mx-2.5 w-px bg-border" />
                }

                if (element.type === 'select') {
                    return (
                        <Select
                            key={index}
                            value={element.value}
                            defaultValue={element.defaultValue}
                            placeholder={element.placeholder}
                            groups={element.groups}
                            className={element.className}
                            disabled={element.disabled}
                        />
                    )
                }

                if (element.type === 'button') {
                    return (
                        <OSButton
                            key={index}
                            onClick={() => !element.disabled && element.onClick?.()}
                            variant={element.variant || 'ghost'}
                            size={element.size || 'sm'}
                            icon={element.icon}
                            className={`${element.className} !px-[5px] ${
                                element.active ? '!bg-accent-2 hover:!bg-accent-2 text-primary' : ''
                            }`}
                            disabled={element.disabled}
                        >
                            {!element.hideLabel && element.label}
                        </OSButton>
                    )
                }

                if (element.type === 'container') {
                    return (
                        <div key={index} className={element.className}>
                            {element.children}
                        </div>
                    )
                }

                // For ToggleGroup items
                const ToggleGroup = element.type === 'single' ? RadixToolbar.ToggleGroup : RadixToolbar.ToggleGroup

                return (
                    <ToggleGroup
                        key={index}
                        type={element.type}
                        defaultValue={element.defaultValue}
                        aria-label={element.label}
                        className={`flex items-center gap-px ${element.className || ''}`}
                        disabled={element.disabled}
                    >
                        {element.items.map((item) => (
                            <RadixToolbar.ToggleItem
                                key={item.value}
                                value={item.value}
                                aria-label={item.label}
                                className={toggleItemButtonClasses}
                                disabled={item.disabled}
                                asChild={!!item.icon}
                                onClick={item.onClick}
                            >
                                {item.icon ? (
                                    <OSButton
                                        icon={item.icon}
                                        className="[&_svg]:size-full"
                                        size="sm"
                                        disabled={item.disabled}
                                    />
                                ) : (
                                    item.label
                                )}
                            </RadixToolbar.ToggleItem>
                        ))}
                    </ToggleGroup>
                )
            })}
        </RadixToolbar.Root>
    )
}

export default Toolbar
