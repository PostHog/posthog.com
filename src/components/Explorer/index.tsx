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
        <div className="@container w-full h-full flex flex-col min-h-1">
            <HeaderBar showHome showBack showForward showSearch />
            <div data-scheme="secondary" className="bg-primary p-2 border-b border-primary">
                <Select
                    groups={selectOptions}
                    placeholder="Select..."
                    ariaLabel="Products"
                    defaultValue="product-analytics"
                    className="w-full"
                    dataScheme="primary"
                />
            </div>
            <div className="flex h-full">
                <aside data-scheme="secondary" className="w-64 bg-primary p-2 border-r border-primary">
                    <div data-scheme="primary" className="bg-primary p-2 rounded-md border border-primary">
                        <h2 className="text-lg font-bold">Products</h2>
                        <hr />
                        hello world!
                    </div>
                </aside>
                <main data-scheme="primary" className="flex-1 bg-primary p-2">
                    color test:
                    <div data-scheme="primary" className="bg-primary text-primary border border-primary p-4">
                        <p className="text-secondary">Primary text</p>
                        <input
                            className="bg-input hover:bg-input-hover border-input hover:border-input-hover text-muted"
                            placeholder="Placeholder text"
                        />
                    </div>
                    <div data-scheme="secondary" className="bg-primary text-primary border border-primary p-4">
                        <p className="text-secondary">Secondary text</p>
                        <input
                            className="bg-input hover:bg-input-hover border-input hover:border-input-hover text-muted"
                            placeholder="Placeholder text"
                        />
                    </div>
                    <div data-scheme="tertiary" className="bg-primary text-primary border border-primary p-4">
                        <p className="text-secondary">Tertiary text</p>
                        <input
                            className="bg-input hover:bg-input-hover border-input hover:border-input-hover text-muted"
                            placeholder="Placeholder text"
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}
