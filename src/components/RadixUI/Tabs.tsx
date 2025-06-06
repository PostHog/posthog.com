import * as React from 'react'
import { Tabs as RadixTabs } from 'radix-ui'

interface TabsRootProps {
  className?: string
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  children: React.ReactNode
}

interface TabsListProps {
  className?: string
  'aria-label'?: string
  children: React.ReactNode
}

interface TabsTriggerProps {
  className?: string
  value: string
  children: React.ReactNode
  icon?: React.ReactNode
  color?: string
}

interface TabsContentProps {
  className?: string
  value: string
  children: React.ReactNode
}

const TabsRoot = ({
  className = "flex items-start w-full",
  defaultValue,
  value,
  onValueChange,
  orientation = "vertical",
  children
}: TabsRootProps): JSX.Element => {
  return (
    <RadixTabs.Root
      className={className}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      orientation={orientation}
    >
      {children}
    </RadixTabs.Root>
  )
}

const TabsList = ({
  className = "flex flex-col shrink-0 p-1 gap-0.5 min-w-52",
  'aria-label': ariaLabel,
  children
}: TabsListProps): JSX.Element => {
  return (
    <RadixTabs.List className={className} aria-label={ariaLabel}>
      {children}
    </RadixTabs.List>
  )
}

const TabsTrigger = ({
  className,
  value,
  children,
  icon,
  color
}: TabsTriggerProps): JSX.Element => {
  const baseClassName = "flex h-[45px] flex-1 gap-2 cursor-default select-none items-center bg-white text-[15px] leading-none text-primary rounded outline-none hover:text-primary hover:bg-accent data-[state=active]:font-bold data-[state=active]:bg-accent data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black group"
  const paddingClassName = icon ? "p-1" : "px-3 py-2"
  const finalClassName = className || `${baseClassName} ${paddingClassName}`

  return (
    <RadixTabs.Trigger className={finalClassName} value={value}>
      {icon && color && (
        <span
          className={`bg-${color}/10 p-1 rounded size-7 text-${color} group-hover:bg-${color}/25 group-data-[state=active]:bg-${color} group-data-[state=active]:text-white`}
        >
          {icon}
        </span>
      )}
      {children}
    </RadixTabs.Trigger>
  )
}

const TabsContent = ({
  className = "grow rounded bg-white px-5 py-2 outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black",
  value,
  children
}: TabsContentProps): JSX.Element => {
  return (
    <RadixTabs.Content className={className} value={value}>
      {children}
    </RadixTabs.Content>
  )
}

const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
}

export default Tabs

