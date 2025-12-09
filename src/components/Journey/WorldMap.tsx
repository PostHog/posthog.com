import React from 'react'
import { motion } from 'framer-motion'
import { regions, type Region, iconMap } from '../../data/journeyData'

interface WorldMapProps {
    selectedRegion: Region | null
    onSelectRegion: (region: Region) => void
    completedSpaces?: string[]
}

const colorStyles: Record<string, { border: string; text: string; bg: string }> = {
    blue: { border: 'border-blue', text: 'text-blue', bg: 'bg-blue' },
    teal: { border: 'border-teal', text: 'text-teal', bg: 'bg-teal' },
    green: { border: 'border-green', text: 'text-green', bg: 'bg-green' },
    salmon: { border: 'border-salmon', text: 'text-salmon', bg: 'bg-salmon' },
    purple: { border: 'border-purple', text: 'text-purple', bg: 'bg-purple' },
    yellow: { border: 'border-yellow', text: 'text-yellow', bg: 'bg-yellow' },
    red: { border: 'border-red', text: 'text-red', bg: 'bg-red' },
}

export default function WorldMap({ selectedRegion, onSelectRegion, completedSpaces = [] }: WorldMapProps) {
    const getCompletedCount = (region: Region) => {
        return region.spaces.filter((space) => completedSpaces.includes(space.id)).length
    }

    return (
        <div className="border border-light dark:border-dark rounded-lg p-6 bg-accent-light dark:bg-accent-dark">
            <h2 className="text-xl font-bold mb-4">Journey map</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {regions.map((region) => {
                    const Icon = iconMap[region.iconName]
                    const completedCount = getCompletedCount(region)
                    const isSelected = selectedRegion?.id === region.id
                    const isComplete = completedCount === region.spaces.length
                    const styles = colorStyles[region.color] || colorStyles.blue

                    return (
                        <motion.button
                            key={region.id}
                            onClick={() => onSelectRegion(region)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 rounded-lg border-2 text-left transition-colors ${
                                isSelected
                                    ? `${styles.border} bg-white dark:bg-dark`
                                    : 'border-light dark:border-dark hover:border-gray bg-white dark:bg-dark'
                            }`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                {Icon && <Icon className={`size-5 ${styles.text}`} />}
                                <span className="text-xs font-medium text-muted">{region.order}</span>
                            </div>
                            <div className="font-bold mb-1">{region.name}</div>
                            <div className="text-sm text-secondary mb-3">{region.tagline}</div>
                            <div className="flex items-center justify-between">
                                <div className="text-xs text-muted">
                                    {completedCount}/{region.spaces.length} complete
                                </div>
                                {isComplete && <span className="text-xs text-green font-medium">Done</span>}
                            </div>
                            {/* Progress bar */}
                            <div className="mt-2 h-1 bg-light dark:bg-dark rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(completedCount / region.spaces.length) * 100}%` }}
                                    className={`h-full ${styles.bg}`}
                                />
                            </div>
                        </motion.button>
                    )
                })}
            </div>
        </div>
    )
}
