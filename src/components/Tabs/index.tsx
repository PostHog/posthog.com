import React from 'react'

type Tab = {
    title: React.ReactNode
    subtitle: React.ReactNode
    icon: React.ReactNode
}

export default function Tabs({
    tabs,
    onClick,
    activeTab,
}: {
    tabs: []
    onClick: (tab: Tab[], index: number) => void
    activeTab: number
}): JSX.Element {
    return (
        <ul className="m-0 p-0 list-none flex justify-between items-center space-x-2">
            {tabs.map((tab, index) => {
                const active = activeTab === index
                return (
                    <button
                        onClick={() => onClick?.(tab, index)}
                        key={`${tab.title}-${index}`}
                        className={`click py-3 px-4 rounded-md hover:bg-accent dark:hover:bg-accent-dark flex-1 ${
                            active ? 'bg-accent border border-border dark:border-dark' : ''
                        }`}
                    >
                        <div className="flex items-start space-x-2">
                            <div>{tab.icon}</div>
                            <div className="text-left">
                                <h3 className="m-0 text-lg leading-tight">{tab.title}</h3>
                                <p className="m-0 mt-0.5 text-sm">{tab.subtitle}</p>
                            </div>
                        </div>
                    </button>
                )
            })}
        </ul>
    )
}
