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

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'underline' | 'underlineOnHover'

export type ToolbarElement =
    | ToolbarGroup
    | { type: 'separator'; className?: string }
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



export const Toolbar = ({ elements, className, 'aria-label': ariaLabel }: ToolbarProps) => {
    return (
        <RadixToolbar.Root
            data-scheme="secondary"
            className={`flex w-full min-w-max skin-modern:rounded bg-primary skin-modern:p-1 skin-modern:border border-primary ${className || ''
                }`}
            aria-label={ariaLabel}
            loop={true}
        >
            {elements.map((element, index) => {
                if (element.type === 'separator') {
                    return <RadixToolbar.Separator key={index} className={`mx-2.5 w-px bg-border ${element.className || ''}`} />
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
                            variant={element.variant || 'default'}
                            size={element.size || 'md'}
                            hover="background"
                            icon={element.icon}
                            className={`${element.className || ''} !px-[5px] ${element.active ? '!bg-accent-2 hover:!bg-accent-2 text-primary' : ''}`}
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

                // For ToggleGroup items - not used in current implementation
                return null
            })}
        </RadixToolbar.Root>
    )
}

export default Toolbar
