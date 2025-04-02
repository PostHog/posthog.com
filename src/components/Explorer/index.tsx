import React from 'react'
import { Select } from '../RadixUI/Select'
import HeaderBar from 'components/OSChrome/HeaderBar'

const selectOptions = [
    {
        label: 'Products',
        items: [
            { value: 'product-os', label: 'Product OS' },
            { value: 'product-analytics', label: 'Product Analytics' },
            { value: 'web-analytics', label: 'Web Analytics' },
            { value: 'session-replay', label: 'Session Replay' },
            { value: 'feature-flags', label: 'Feature Flags' },
            { value: 'experiments', label: 'Experiments' },
            { value: 'surveys', label: 'Surveys' },
            { value: 'data-warehouse', label: 'Data Warehouse' },
            { value: 'cdp', label: 'Data Pipelines' },
            { value: 'ai-engineering', label: 'LLM Observability' },
            { value: 'error-tracking', label: 'Error Tracking' },
        ],
    },
]

export default function Explorer() {
    return (
        <div className="@container w-full h-full flex flex-col bg-light dark:bg-dark min-h-1">
            <HeaderBar showHome showBack showForward showSearch />
            <div className="p-2">
                <Select
                    groups={selectOptions}
                    placeholder="Select..."
                    ariaLabel="Products"
                    defaultValue="product-analytics"
                    className="w-full bg-white dark:bg-accent-dark border border-light dark:border-dark"
                />
            </div>
            <div className="flex h-full">
                <aside className="w-64 bg-accent/50 dark:bg-accent-dark px-2">
                    <div className="bg-white dark:bg-accent-dark p-2 rounded-md border border-light dark:border-dark">
                        <h2 className="text-lg font-bold">Products</h2>
                        <hr />
                        hello world!
                    </div>
                </aside>
                <main className="flex-1 bg-white dark:bg-accent-dark">hello world!</main>
            </div>
        </div>
    )
}
