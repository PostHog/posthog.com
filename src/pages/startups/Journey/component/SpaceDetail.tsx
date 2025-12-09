import React from 'react'
import { IconCheck } from '@posthog/icons'
import Link from 'components/Link'
import { type Region, type Space } from '../journeyData'

interface SpaceDetailProps {
    space: Space
    region: Region
    onBack: () => void
    completedChecklistItems?: string[]
    onToggleChecklistItem?: (itemId: string) => void
    onCompleteSpace?: (spaceId: string) => void
    isCompleted?: boolean
}

const tagStyles: Record<string, string> = {
    blue: 'bg-blue/20 text-blue',
    yellow: 'bg-yellow/20 text-yellow',
    teal: 'bg-teal/20 text-teal',
    purple: 'bg-purple/20 text-purple',
    green: 'bg-green/20 text-green',
    red: 'bg-red/20 text-red',
}

function ProductTag({ name, color }: { name: string; color: string }) {
    const style = tagStyles[color] || 'bg-black/10 text-black/70 dark:bg-white/10 dark:text-white/70'
    return <span className={`px-2 py-0.5 text-xs font-medium rounded ${style}`}>{name}</span>
}

export default function SpaceDetail({
    space,
    region,
    onBack,
    completedChecklistItems = [],
    onToggleChecklistItem,
    onCompleteSpace,
    isCompleted = false,
}: SpaceDetailProps) {
    const requiredItems = space.checklistItems.filter((item) => item.required)
    const completedRequiredItems = requiredItems.filter((item) => completedChecklistItems.includes(item.id))
    const allRequiredComplete = completedRequiredItems.length === requiredItems.length
    const checklistProgress = completedChecklistItems.filter((id) =>
        space.checklistItems.some((item) => item.id === id)
    ).length

    return (
        <div>
            {/* Back button */}
            <button onClick={onBack} className="text-sm text-red dark:text-yellow hover:underline mb-4">
                ← Back to {region.name}
            </button>

            {/* Two column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left column - Main content */}
                <div className="lg:col-span-2">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-2">
                        {isCompleted && <IconCheck className="size-5 text-green" />}
                        <h2 className="text-2xl font-bold">{space.title}</h2>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {space.products.map((product) => (
                            <ProductTag key={product.id} name={product.name} color={product.color} />
                        ))}
                    </div>

                    {/* Introduction */}
                    <p className="text-secondary mb-6">{space.content.introduction}</p>

                    {/* Content sections */}
                    <div className="space-y-4">
                        {space.content.sections.map((section) => (
                            <div
                                key={section.id}
                                className="border border-light dark:border-dark rounded-lg p-4 bg-accent-light dark:bg-accent-dark"
                            >
                                <h3 className="font-semibold mb-2">{section.title}</h3>
                                <p className="text-sm text-secondary">{section.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right column - Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-4 space-y-4">
                        {/* Checklist */}
                        <div className="border border-light dark:border-dark rounded-lg p-5 bg-accent-light dark:bg-accent-dark">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold">Checklist</h3>
                                <span className="text-xs text-muted">
                                    {checklistProgress}/{space.checklistItems.length}
                                </span>
                            </div>
                            <div className="space-y-3">
                                {space.checklistItems
                                    .sort((a, b) => a.order - b.order)
                                    .map((item) => {
                                        const isChecked = completedChecklistItems.includes(item.id)
                                        return (
                                            <label
                                                key={item.id}
                                                className="flex items-start gap-3 cursor-pointer text-sm"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() => onToggleChecklistItem?.(item.id)}
                                                    className="mt-0.5 rounded"
                                                />
                                                <div>
                                                    <span className={isChecked ? 'line-through opacity-50' : ''}>
                                                        {item.text}
                                                    </span>
                                                    {!item.required && (
                                                        <span className="text-xs text-muted ml-1">(optional)</span>
                                                    )}
                                                    {item.helpText && (
                                                        <div className="text-xs text-muted mt-0.5">{item.helpText}</div>
                                                    )}
                                                </div>
                                            </label>
                                        )
                                    })}
                            </div>

                            {/* Complete button */}
                            {!isCompleted && allRequiredComplete && (
                                <button
                                    onClick={() => onCompleteSpace?.(space.id)}
                                    className="mt-5 w-full py-2 bg-green text-white rounded text-sm font-semibold hover:opacity-90 transition-opacity"
                                >
                                    Mark as complete
                                </button>
                            )}
                            {isCompleted && (
                                <div className="mt-4 text-center text-green text-sm font-medium flex items-center justify-center gap-1">
                                    <IconCheck className="size-4" />
                                    Completed
                                </div>
                            )}
                        </div>

                        {/* Resources */}
                        {space.resources.length > 0 && (
                            <div className="border border-light dark:border-dark rounded-lg p-5 bg-accent-light dark:bg-accent-dark">
                                <h3 className="font-bold mb-4">Resources</h3>
                                <div className="space-y-2">
                                    {space.resources.map((resource) => (
                                        <div
                                            key={resource.id}
                                            className="flex items-center justify-between py-2 text-sm"
                                        >
                                            <Link
                                                to={resource.url}
                                                className="font-semibold hover:opacity-70 transition-opacity"
                                            >
                                                {resource.title}
                                            </Link>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray/20 text-primary uppercase font-medium ml-2 shrink-0">
                                                {resource.type}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
