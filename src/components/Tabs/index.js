import React, { useState } from 'react'

export const TabPane = ({ tab, active, ...other }) => {
    return (
        <button
            className={`px-5 py-2 rounded-sm ${active ? 'bg-primary dark:bg-gray-accent-dark text-white' : ''}`}
            {...other}
        >
            {tab}
        </button>
    )
}

export default function Tabs({ children }) {
    const [activeTab, setActiveTab] = useState(0)
    return (
        <div>
            <div className="mb-4">
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, {
                        onClick: () => setActiveTab(index),
                        active: activeTab === index,
                    })
                })}
            </div>
            <div>{children[activeTab]?.props?.children}</div>
        </div>
    )
}
