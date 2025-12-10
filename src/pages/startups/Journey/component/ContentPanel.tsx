import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { regions, type Region, type Space } from '../journeyData'
import SpaceList from './SpaceList'
import SpaceDetail from './SpaceDetail'

interface ContentPanelProps {
    selectedRegion: Region | null
    selectedSpace: Space | null
    onSelectRegion: (region: Region) => void
    onSelectSpace: (space: Space) => void
    onBack: () => void
    completedSpaces?: string[]
    completedChecklistItems?: string[]
    onToggleChecklistItem?: (itemId: string) => void
    onCompleteSpace?: (spaceId: string) => void
}

export default function ContentPanel({
    selectedRegion,
    selectedSpace,
    onSelectRegion,
    onSelectSpace,
    onBack,
    completedSpaces = [],
    completedChecklistItems = [],
    onToggleChecklistItem,
    onCompleteSpace,
}: ContentPanelProps) {
    return (
        <div className="border border-light dark:border-dark rounded-lg min-h-[400px]">
            <AnimatePresence>
                {!selectedRegion ? (
                    // Welcome state
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center py-12"
                    >
                        <h2 className="text-2xl font-bold mb-2">Welcome to your growth journey</h2>
                        <p className="text-secondary mb-6 max-w-lg mx-auto">
                            Start with <strong>Product-market fit valley</strong> to build a solid foundation, then
                            progress through each region as your startup grows.
                        </p>
                        <button
                            onClick={() => onSelectRegion(regions[0])}
                            className="px-6 py-3 bg-red dark:bg-yellow text-white dark:text-dark rounded-md font-bold hover:opacity-90 transition-opacity"
                        >
                            Start with Product-market fit
                        </button>
                    </motion.div>
                ) : !selectedSpace ? (
                    // Region selected - show space list
                    <motion.div
                        key={`region-${selectedRegion.id}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <SpaceList
                            region={selectedRegion}
                            onSelectSpace={onSelectSpace}
                            completedSpaces={completedSpaces}
                        />
                    </motion.div>
                ) : (
                    // Space selected - show space detail
                    <motion.div
                        key={`space-${selectedSpace.id}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <SpaceDetail
                            space={selectedSpace}
                            region={selectedRegion}
                            onBack={onBack}
                            completedChecklistItems={completedChecklistItems}
                            onToggleChecklistItem={onToggleChecklistItem}
                            onCompleteSpace={onCompleteSpace}
                            isCompleted={completedSpaces.includes(selectedSpace.id)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
