import React from 'react'
import { motion } from 'framer-motion'
import { IconCheck, IconArrowRight } from '@posthog/icons'
import { type Region, type Space } from '../journeyData'

interface SpaceListProps {
    region: Region
    onSelectSpace: (space: Space) => void
    completedSpaces?: string[]
}

export default function SpaceList({ region, onSelectSpace, completedSpaces = [] }: SpaceListProps) {
    const completedCount = region.spaces.filter((s) => completedSpaces.includes(s.id)).length

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">{region.name}</h2>
            <p className="text-secondary mb-2">{region.description}</p>
            <p className="text-sm text-muted mb-6">
                {completedCount} of {region.spaces.length} completed
            </p>

            <div className="space-y-2">
                {region.spaces.map((space, index) => {
                    const isCompleted = completedSpaces.includes(space.id)

                    return (
                        <motion.button
                            key={space.id}
                            onClick={() => onSelectSpace(space)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`w-full p-4 border border-light dark:border-dark rounded text-left group hover:border-gray transition-colors ${
                                isCompleted ? 'bg-green/5' : ''
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`shrink-0 size-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                        isCompleted
                                            ? 'bg-green text-white'
                                            : 'bg-accent-light dark:bg-accent-dark text-secondary'
                                    }`}
                                >
                                    {isCompleted ? <IconCheck className="size-4" /> : index + 1}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold">{space.title}</div>
                                    <div className="text-sm text-secondary truncate">{space.description}</div>
                                </div>

                                <IconArrowRight className="size-5 text-muted group-hover:text-secondary transition-colors shrink-0" />
                            </div>
                        </motion.button>
                    )
                })}
            </div>
        </div>
    )
}
