import React from 'react'
import Editor from 'components/Editor'
import { useJourneyStore } from './Journey/journeyStore'
import { WorldMap, ContentPanel } from './Journey/component'

function FlagshipUseCases() {
    const {
        selectedRegionId,
        selectedSpaceId,
        completedSpaces,
        completedChecklistItems,
        getSelectedRegion,
        getSelectedSpace,
        selectRegion,
        selectSpace,
        toggleChecklistItem,
        completeSpace,
    } = useJourneyStore()

    const selectedRegion = getSelectedRegion()
    const selectedSpace = getSelectedSpace()

    const handleSelectRegion = (region: { id: string }) => {
        selectRegion(region.id)
    }

    const handleSelectSpace = (space: { id: string }) => {
        selectSpace(space.id)
    }

    const handleBack = () => {
        if (selectedSpaceId) {
            selectSpace(null)
        } else if (selectedRegionId) {
            selectRegion(null)
        }
    }

    return (
        <Editor
            type="mdx"
            slug="/flagship-use-cases"
            bookmark={{
                title: 'Flagship use cases',
                description: 'Scale your startup with data-driven product development.',
            }}
        >
            <div className="py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">
                        Scale your startup with PostHog{' '}
                        <span className="text-red dark:text-yellow">flagship use cases</span>
                    </h1>
                    <p className="text-lg text-secondary">
                        A learning journey through the key stages of startup growth
                    </p>
                </div>

                {/* World Map */}
                <div className="mb-8">
                    <WorldMap
                        selectedRegion={selectedRegion}
                        onSelectRegion={handleSelectRegion}
                        completedSpaces={completedSpaces}
                    />
                </div>

                {/* Content Panel */}
                <ContentPanel
                    selectedRegion={selectedRegion}
                    selectedSpace={selectedSpace}
                    onSelectRegion={handleSelectRegion}
                    onSelectSpace={handleSelectSpace}
                    onBack={handleBack}
                    completedSpaces={completedSpaces}
                    completedChecklistItems={completedChecklistItems}
                    onToggleChecklistItem={toggleChecklistItem}
                    onCompleteSpace={completeSpace}
                />
            </div>
        </Editor>
    )
}

export default FlagshipUseCases
