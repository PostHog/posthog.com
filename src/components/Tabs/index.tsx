import { IconInfo } from '@posthog/icons'
import Tooltip from 'components/Tooltip'
import React from 'react'

type Tab = {
    title: React.ReactNode
    subtitle: React.ReactNode
    icon: React.ReactNode
    tooltip?: strong
}

const Horizontal = ({ tabs, onClick, activeTab, className = '', size = 'lg', activeClass }) => {
    return (
        <ul
            className={`list-none m-0 flex flex-row gap-px overflow-x-auto w-screen md:w-auto -mx-4 px-4 py-0 pt-2 md:px-6 justify-between items-center ${className}`}
        >
            {tabs.map((tab, index) => {
                const active = activeTab === index
                return (
                    <li key={`${tab.title}-${index}`} className="w-full">
                        <button
                            onClick={() => onClick?.(tab, index)}
                            key={`${tab.title}-${index}`}
                            className={`click ${
                                size === 'sm' ? 'p-2 rounded' : 'py-3 px-4 rounded-md'
                            } font-semibold text-sm flex flex-col md:flex-row space-x-2 whitespace-nowrap items-start md:items-center justify-between w-full click ${
                                active
                                    ? activeClass !== undefined
                                        ? activeClass
                                        : 'font-bold bg-tan dark:bg-dark border border-b-tan dark:border-b-bg-dark border-light dark:border-dark rounded-tl rounded-tr'
                                    : 'rounded hover:bg-light/50 hover:dark:bg-dark/50 border border-b-3 border-transparent md:hover:border-light dark:md:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all hover:-mt-1'
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
                                    <p className="m-0 mt-0.5 text-sm whitespace-nowrap opacity-70">{tab.subtitle}</p>
                                </div>
                            </div>
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}

const Vertical = ({ tabs, onClick, activeTab, className = '', activeClass }) => {
    return (
        <ul
            className={`list-none m-0 p-0 flex-shrink-0 flex flex-row md:flex-col gap-px overflow-x-auto w-screen md:w-auto -mx-4 px-4 min-w-56 mb-2 md:mb-0 ${className}`}
        >
            {tabs.map((tab, index) => {
                const { title, icon } = tab
                const active = activeTab === index
                return (
                    <li key={title}>
                        <button
                            onClick={() => onClick?.(tab, index)}
                            className={`p-2 rounded-md font-semibold text-sm flex flex-col md:flex-row space-x-2 whitespace-nowrap items-start md:items-center justify-between w-full click ${
                                active
                                    ? activeClass !== undefined
                                        ? activeClass
                                        : 'font-bold bg-accent dark:bg-accent-dark'
                                    : 'hover:bg-accent dark:hover:bg-accent/15'
                            }`}
                        >
                            <div className="flex space-x-2 whitespace-nowrap">
                                <span>{icon}</span>
                                <span>{title}</span>
                            </div>
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}

export default function Tabs(props: {
    tabs: []
    onClick: (tab: Tab[], index: number) => void
    activeTab?: number
    className?: string
    vertical?: boolean
    size?: 'sm' | 'lg'
    activeClass?: string
}): JSX.Element {
    return props.vertical ? <Vertical {...props} /> : <Horizontal {...props} />
}
