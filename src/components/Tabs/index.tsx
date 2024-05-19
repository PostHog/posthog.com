import { IconInfo } from '@posthog/icons'
import Tooltip from 'components/Tooltip'
import React from 'react'

type Tab = {
    title: React.ReactNode
    subtitle: React.ReactNode
    icon: React.ReactNode
    tooltip?: strong
}

export default function Tabs({
    tabs,
    onClick,
    activeTab,
    className,
    vertical,
    size = 'lg',
    pricingBreakdown = false,
}: {
    tabs: []
    onClick: (tab: Tab[], index: number) => void
    activeTab?: number
    className?: string
    vertical?: boolean
    size?: 'sm' | 'lg'
    pricingBreakdown?: boolean
}): JSX.Element {
    return (
        <ul
            className={`list-none m-0 flex flex-row gap-px overflow-x-auto w-screen md:w-auto -mx-4 px-4 py-0 md:px-6 ${
                vertical ? 'md:flex-col' : 'justify-between items-center'
            } ${className}`}
        >
            {tabs.map((tab, index) => {
                const active = activeTab === index
                return (
                    <button
                        onClick={() => onClick?.(tab, index)}
                        key={`${tab.title}-${index}`}
                        className={`click ${
                            size === 'sm' ? 'p-2 rounded' : 'py-3 px-4 rounded-md'
                        } font-semibold text-sm flex flex-col md:flex-row space-x-2 whitespace-nowrap items-start md:items-center justify-between w-full click ${
                            pricingBreakdown ? '' : ''
                        } ${vertical ? '' : 'flex-1'} ${
                            active
                                ? 'font-bold bg-tan dark:bg-dark border border-b-tan dark:border-b-dark border-light dark:border-dark rounded-tl rounded-tr'
                                : 'hover:bg-accent'
                        }`}
                    >
                        <div className="flex items-start space-x-2">
                            {tab.icon && <div>{tab.icon}</div>}
                            <div className="text-left">
                                <h3
                                    className={`m-0 ${
                                        size === 'sm' ? 'text-base' : 'text-lg'
                                    } leading-tight flex space-x-1 items-center whitespace-nowrap`}
                                >
                                    <span>{tab.title}</span>
                                    {tab.tooltip && (
                                        <Tooltip
                                            content={tab.tooltip}
                                            tooltipClassName="max-w-[300px]"
                                            placement="right"
                                        >
                                            <span className="relative">
                                                <IconInfo className="w-4 h-4" />
                                            </span>
                                        </Tooltip>
                                    )}
                                </h3>
                                <p className="m-0 mt-0.5 text-sm whitespace-nowrap">{tab.subtitle}</p>
                            </div>
                        </div>
                    </button>
                )
            })}
        </ul>
    )
}
