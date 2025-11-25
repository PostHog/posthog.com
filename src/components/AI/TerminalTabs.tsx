import React, { useState } from 'react'

interface Tab {
    id: string
    label: string
}

interface TerminalTabsProps {
    tabs: Tab[]
    defaultTab?: string
    onTabChange?: (tabId: string) => void
    children: (activeTab: string) => React.ReactNode
    vertical?: boolean
}

export default function TerminalTabs({ tabs, defaultTab, onTabChange, children, vertical = false }: TerminalTabsProps): JSX.Element {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId)
        onTabChange?.(tabId)
    }

    if (vertical) {
        return (
            <div className="flex gap-4">
                {/* Vertical Tab Navigation */}
                <div className="flex flex-col gap-1 min-w-[200px]">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`
                                px-3 py-2 text-left font-code text-sm transition-colors border-l-2
                                ${
                                    activeTab === tab.id
                                        ? 'border-[#00FF00] text-[#00FF00] bg-[#00FF00]/10'
                                        : 'border-[#333] text-[#666] hover:border-[#F1A82C] hover:text-[#F1A82C]'
                                }
                            `}
                        >
                            {activeTab === tab.id ? '▶' : ' '} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 text-[rgba(238,239,233,0.9)]">{children(activeTab)}</div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`
                            px-3 py-1 border-2 font-code text-sm transition-colors
                            ${
                                activeTab === tab.id
                                    ? 'border-[#00FF00] text-[#00FF00] bg-[#00FF00]/10'
                                    : 'border-[#666] text-[#666] hover:border-[#F1A82C] hover:text-[#F1A82C]'
                            }
                        `}
                    >
                        [{tab.label.toUpperCase()}]
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="text-[rgba(238,239,233,0.9)]">{children(activeTab)}</div>
        </div>
    )
}
