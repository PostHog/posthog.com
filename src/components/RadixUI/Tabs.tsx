import * as React from 'react'
import { Tabs as RadixTabs } from 'radix-ui'

type TabSize = 'sm' | 'md' | 'lg' | 'xl'

interface TabsRootProps {
    className?: string
    defaultValue?: string
    value?: string
    onValueChange?: (value: string) => void
    orientation?: 'horizontal' | 'vertical'
    size?: TabSize
    children: React.ReactNode
}

interface TabsListProps {
    className?: string
    'aria-label'?: string
    orientation?: 'horizontal' | 'vertical'
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

// Create context for size
const TabsContext = React.createContext<TabSize>('sm')

// Create context for presentation mode detection
const PresentationModeContext = React.createContext<boolean>(false)

// Export the presentation mode context for use in other components
export { PresentationModeContext }

const TabsRoot = ({
    className,
    defaultValue,
    value,
    onValueChange,
    orientation = 'vertical', // set to horizontal for responsive. starts horizontal, then use container queries to adjust to vertical like in @FeaturesSlide.tsx
    size = 'sm',
    children,
}: TabsRootProps): JSX.Element => {
    const isInPresentationMode = React.useContext(PresentationModeContext)

    // If in presentation mode and size is lg, downgrade to sm
    const effectiveSize = isInPresentationMode && size === 'lg' ? 'sm' : size

    return (
        <TabsContext.Provider value={effectiveSize}>
            <RadixTabs.Root
                className={`flex items-start w-full ${orientation === 'vertical' ? '' : 'flex-col'} ${className}`}
                defaultValue={defaultValue}
                value={value}
                onValueChange={onValueChange}
                orientation={orientation}
            >
                {children}
            </RadixTabs.Root>
        </TabsContext.Provider>
    )
}

const TabsList = ({ 'aria-label': ariaLabel, orientation, className, children }: TabsListProps): JSX.Element => {
    return (
        <RadixTabs.List
            className={`flex shrink-0 p-1 gap-0.5 min-w-52 ${className} ${
                orientation === 'vertical' ? 'flex-col' : ''
            }`}
            aria-label={ariaLabel}
        >
            {children}
        </RadixTabs.List>
    )
}

const TabsTrigger = ({ className, value, children, icon, color }: TabsTriggerProps): JSX.Element => {
    const size = React.useContext(TabsContext)

    // Size-based styling
    const sizeStyles = {
        sm: {
            height: 'h-[45px]',
            fontSize: 'text-[15px]',
            padding: icon ? 'p-1' : 'px-3 py-2',
        },
        md: {
            height: 'h-[50px]',
            fontSize: 'text-base',
            padding: icon ? 'p-1.5' : 'px-4 py-2.5',
        },
        lg: {
            height: 'h-[55px]',
            fontSize: 'text-xl @xl:text-lg',
            padding: icon ? 'p-2' : 'px-5 py-3',
        },
        xl: {
            height: 'h-[60px]',
            fontSize: 'text-xl',
            padding: icon ? 'p-2.5' : 'px-6 py-3.5',
        },
    }

    const currentSize = sizeStyles[size]
    const baseClassName = `flex w-full ${currentSize.height} flex-1 gap-2 cursor-default select-none items-center ${currentSize.fontSize} leading-tight text-primary rounded outline-none hover:text-primary hover:bg-accent data-[state=active]:font-bold data-[state=active]:bg-accent data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black group whitespace-nowrap @xl:whitespace-normal`
    const finalClassName = `${baseClassName} ${currentSize.padding} ${className}`

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

const TabsContent = ({ className, value, children }: TabsContentProps): JSX.Element => {
    const size = React.useContext(TabsContext)

    // Size-based styling for content
    const sizeStyles = {
        sm: 'grow rounded bg-white px-5 py-2 text-[15px] outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black',
        md: 'grow rounded bg-white px-6 py-3 text-base outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black',
        lg: 'grow rounded bg-white px-7 py-4 text-lg outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black',
        xl: 'grow rounded bg-white px-8 py-5 text-xl outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black',
    }

    const finalClassName = className || sizeStyles[size]

    return (
        <RadixTabs.Content className={finalClassName} value={value}>
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
