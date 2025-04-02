import React from 'react'
import { Select } from '../RadixUI/Select'

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
    {
        label: 'Roadmap',
        items: [
            { value: 'product-tours', label: 'Product Tours', disabled: true },
            { value: 'revenue-analytics', label: 'Revenue Analytics', disabled: true },
            { value: 'crm', label: 'CRM', disabled: true },
            { value: 'messaging', label: 'Messaging', disabled: true },
        ],
    },
]

export default function Explorer() {
    return (
        <div className="bg-white dark:bg-accent-dark h-full">
            <Select groups={selectOptions} placeholder="Select..." ariaLabel="Products" defaultValue="product-os" />
        </div>
    )
}
