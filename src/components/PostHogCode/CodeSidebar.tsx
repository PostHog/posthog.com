import React from 'react'
import { IconPlus, IconFolder } from '@posthog/icons'
import { Section } from './types'

interface CodeSidebarProps {
    sections: Section[]
    activeSection: number
    onSectionClick: (index: number) => void
}

export default function CodeSidebar({ sections, activeSection, onSectionClick }: CodeSidebarProps) {
    return (
        <div
            className="flex flex-col h-full border-r border-input shrink-0 overflow-hidden bg-accent"
            style={{ width: '260px' }}
        >
            {/* New task button (decorative) */}
            <div className="px-2 py-1.5">
                <div className="flex items-center gap-2 px-2 py-1.5 text-secondary font-code text-xs cursor-default select-none">
                    <IconPlus className="size-4" />
                    <span>New task</span>
                </div>
            </div>

            {/* Section label */}
            <div className="px-2 py-1">
                <span className="font-code text-[10px] uppercase tracking-wide text-muted font-medium px-2">Tasks</span>
            </div>

            {/* Task list */}
            <div className="flex-1 overflow-y-auto">
                {sections.map((section, index) => {
                    const isActive = index === activeSection
                    const Icon = section.icon
                    return (
                        <button
                            key={section.id}
                            onClick={() => onSectionClick(index)}
                            className={`flex items-center gap-2 w-full text-left font-code text-xs py-1.5 px-4 cursor-pointer transition-colors ${
                                isActive ? 'bg-accent text-primary font-medium' : 'text-secondary hover:bg-accent/50'
                            }`}
                        >
                            {Icon && (
                                <Icon className={`size-3 shrink-0 ${isActive ? 'text-secondary' : 'text-muted'}`} />
                            )}
                            <span className="truncate">{section.title}</span>
                        </button>
                    )
                })}
            </div>

            {/* Project label (decorative) */}
            <div className="border-t border-input px-3 py-2.5 select-none">
                <div className="flex items-center gap-2">
                    <IconFolder className="size-3 text-muted shrink-0" />
                    <span className="font-code text-xs text-secondary font-medium truncate">posthog/posthog</span>
                </div>
            </div>
        </div>
    )
}
