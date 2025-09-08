import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Tabs } from 'radix-ui'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { useLocation } from '@reach/router'

interface TabItem {
    value: string
    label: React.ReactNode
    content: React.ReactNode
    triggerDataScheme?: string
}

interface TabTriggerData {
    value: string
    label: React.ReactNode
    triggerDataScheme?: string
}

interface OSTabsProps {
    tabs: TabItem[]
    defaultValue?: string
    value?: string
    orientation?: 'horizontal' | 'vertical'
    frame: boolean
    children?: React.ReactNode
    fullScreen?: boolean
    className?: string
    triggerDataScheme?: string
    extraTabRowContent?: React.ReactNode
    onValueChange?: (value: string, tabs: TabTriggerData[][]) => void
    tabContainerClassName?: string
    centerTabs?: boolean
    tabTriggerClassName?: string
    tabContentClassName?: string
    scrollable?: boolean
}

export default function OSTabs({
    tabs,
    defaultValue,
    value,
    children,
    orientation = 'horizontal',
    frame = true,
    className,
    triggerDataScheme = 'secondary',
    extraTabRowContent,
    onValueChange,
    tabContainerClassName,
    centerTabs = false,
    tabTriggerClassName,
    tabContentClassName,
    scrollable = true,
}: OSTabsProps): JSX.Element {
    const { state } = useLocation()
    const initialOrderedTabs = (state as any)?.orderedTabs
    const [controlledValue, setControlledValue] = useState(defaultValue || tabs[0]?.value)

    // Only use orderedTabs logic for horizontal orientation
    const [orderedTabs, setOrderedTabs] = useState<TabItem[][]>(
        orientation === 'horizontal' ? (initialOrderedTabs?.length > 0 ? initialOrderedTabs : [tabs]) : [tabs]
    )
    const ref = useRef<HTMLDivElement>(null)

    const calculateTabRows = useCallback(
        (activeTabValue?: string) => {
            if (orientation === 'vertical') {
                setOrderedTabs([tabs])
                return
            }

            if (!ref.current) return

            const containerWidth = ref.current.getBoundingClientRect().width - 48
            const currentActiveValue = activeTabValue || value || controlledValue

            const existingTab = ref.current.querySelector('[role="tab"]') as HTMLElement
            if (!existingTab) return

            const tempContainer = document.createElement('div')
            tempContainer.style.position = 'absolute'
            tempContainer.style.visibility = 'hidden'
            tempContainer.style.top = '-9999px'
            tempContainer.style.left = '-9999px'
            document.body.appendChild(tempContainer)

            const tabWidths: number[] = []
            tabs.forEach((tab) => {
                const clonedTab = existingTab.cloneNode(true) as HTMLElement
                // Handle ReactNode labels by converting to string
                if (typeof tab.label === 'string') {
                    clonedTab.textContent = tab.label
                } else {
                    clonedTab.textContent = 'Tab'
                }
                tempContainer.appendChild(clonedTab)
                tabWidths.push(clonedTab.getBoundingClientRect().width + 4)
                tempContainer.removeChild(clonedTab)
            })

            document.body.removeChild(tempContainer)

            const rows: TabItem[][] = []
            let currentRow: TabItem[] = []
            let currentRowWidth = 0

            tabs.forEach((tab, index) => {
                const tabWidth = tabWidths[index]

                if (currentRowWidth + tabWidth > containerWidth && currentRow.length > 0) {
                    rows.push([...currentRow])
                    currentRow = [tab]
                    currentRowWidth = tabWidth
                } else {
                    currentRow.push(tab)
                    currentRowWidth += tabWidth
                }
            })

            if (currentRow.length > 0) {
                rows.push(currentRow)
            }

            if (rows.length > 1) {
                const activeTabRowIndex = rows.findIndex((row) => row.some((tab) => tab.value === currentActiveValue))

                if (activeTabRowIndex !== -1 && activeTabRowIndex !== rows.length - 1) {
                    const activeRow = rows.splice(activeTabRowIndex, 1)[0]
                    rows.push(activeRow)
                }
            }

            setOrderedTabs(rows)
            return rows
        },
        [tabs, value, controlledValue, orientation]
    )

    useEffect(() => {
        // Only run tab row calculation for horizontal orientation (when tabs might wrap)
        if (orientation === 'vertical' || !ref.current) return

        setTimeout(() => {
            calculateTabRows()
        }, 300)

        const resizeObserver = new ResizeObserver(() => calculateTabRows())
        resizeObserver.observe(ref.current)
        return () => resizeObserver.disconnect()
    }, [calculateTabRows, orientation])

    const TabContentContainer = useMemo(() => (scrollable ? ScrollArea : 'div'), [scrollable])

    return (
        <div ref={ref}>
            <Tabs.Root
                onValueChange={(value) => {
                    setControlledValue(value)

                    // Only calculate ordered tabs for horizontal orientation and when no extraTabRowContent
                    // `/start` uses extraTabRowContent which displays on the far right side.
                    // it's incompatible with the stacked tabs logic, so it has to be skipped.
                    // on the homepage, tabs are vertical so we also want to skip it there too.
                    if (orientation === 'horizontal' && !extraTabRowContent) {
                        const orderedTabsWithoutContent = calculateTabRows(value)?.map((row) =>
                            row.map(
                                (tab): TabTriggerData => ({
                                    value: tab.value,
                                    label: tab.label,
                                    triggerDataScheme: tab.triggerDataScheme,
                                })
                            )
                        )
                        onValueChange?.(value, orderedTabsWithoutContent || [])
                    } else {
                        const verticalTabsData: TabTriggerData[][] = [
                            tabs.map(
                                (tab): TabTriggerData => ({
                                    value: tab.value,
                                    label: tab.label,
                                    triggerDataScheme: tab.triggerDataScheme,
                                })
                            ),
                        ]
                        onValueChange?.(value, verticalTabsData)
                    }
                }}
                defaultValue={defaultValue || tabs[0]?.value}
                value={value || controlledValue}
                className={
                    className ??
                    `relative flex ${orientation === 'horizontal' ? 'flex-col' : 'flex-row'} ${
                        frame ? 'pt-2 px-4 pb-4' : ''
                    } h-full min-h-0 bg-primary`
                }
            >
                <div className={tabContainerClassName}>
                    <Tabs.List
                        className={`flex-shrink-0 flex flex-col ${orientation === 'horizontal' ? '' : 'h-full'}`}
                    >
                        {orderedTabs.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                className={`flex ${
                                    orientation === 'horizontal' ? ' items-center' : 'flex-col gap-px h-full'
                                } ${centerTabs ? 'justify-center' : ''}`}
                            >
                                {row.map((tab) => (
                                    <Tabs.Trigger
                                        key={tab.value}
                                        value={tab.value}
                                        data-scheme={triggerDataScheme}
                                        className={`${tabTriggerClassName} data-[state=active]:bg-primary px-2 py-1 border border-transparent relative -bottom-px z-10 text-sm select-none text-primary data-[state=active]:border-primary border-b-0 rounded-t-sm`}
                                    >
                                        {tab.label}
                                    </Tabs.Trigger>
                                ))}
                                {rowIndex === orderedTabs.length - 1 && extraTabRowContent}
                            </div>
                        ))}
                    </Tabs.List>
                </div>
                {tabs.map((tab) => (
                    <Tabs.Content data-scheme="primary" key={tab.value} value={tab.value} className="flex-1 h-full">
                        <TabContentContainer
                            className={`@container bg-primary h-full min-h-0 ${
                                frame ? 'border border-primary rounded-md' : ''
                            }`}
                        >
                            <div
                                className={`${frame ? '@container p-4 @2xl:p-6' : '@container'} ${tabContentClassName}`}
                            >
                                {tab.content}
                            </div>
                        </TabContentContainer>
                    </Tabs.Content>
                ))}
            </Tabs.Root>
            {children}
        </div>
    )
}
