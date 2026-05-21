import React from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import Roadmap from 'components/Roadmap'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'
import { useApp } from '../../context/App'
import { useUser } from 'hooks/useUser'
import RoadmapWindow from 'components/Roadmap/RoadmapWindow'
import OSButton from 'components/OSButton'
import { IconPlus, IconShieldLock } from '@posthog/icons'
import Tooltip from 'components/RadixUI/Tooltip'
import { useRoadmaps } from 'hooks/useRoadmaps'

const RoadmapPage = () => {
    const { addWindow } = useApp()
    const { user } = useUser()
    const isModerator = user?.role?.type === 'moderator'

    const { tabs, handleTabChange, tabContainerClassName, className } = useCompanyNavigation({
        value: '/roadmap',
        content: (
            <div className="p-4 @xl:p-8">
                <h1>Roadmap</h1>
                <Roadmap />
            </div>
        ),
    })

    const { mutate } = useRoadmaps({
        params: {
            filters: {
                dateCompleted: {
                    $null: true,
                },
                projectedCompletion: {
                    $null: true,
                },
            },
        },
        limit: 100,
    })

    const handleAddFeature = () => {
        addWindow(
            <RoadmapWindow
                location={{ pathname: `add-roadmap` }}
                key={`add-roadmap`}
                newWindow
                status="under-consideration"
                onSubmit={() => {
                    mutate()
                }}
            />
        )
    }

    return (
        <>
            <SEO
                title="Roadmap – PostHog"
                description="See what we're building next"
                image={`/images/og/roadmap.jpg`}
            />
            <Editor
                hasTabs
                type="roadmap"
                proseSize="base"
                maxWidth="100%"
                bookmark={{
                    title: 'Roadmap',
                    description: "See what we're building next",
                }}
                extraMenuOptions={
                    isModerator ? (
                        <>
                            <Tooltip
                                trigger={<OSButton size="md" icon={<IconPlus />} onClick={handleAddFeature} />}
                                delay={0}
                            >
                                <IconShieldLock className="size-6 inline-block relative -top-px text-secondary" /> Add
                                roadmap item
                            </Tooltip>
                        </>
                    ) : null
                }
            >
                <OSTabs
                    tabs={tabs}
                    defaultValue="/roadmap"
                    onValueChange={handleTabChange}
                    padding
                    contentPadding={false}
                    tabContainerClassName={tabContainerClassName}
                    className={className}
                    triggerDataScheme="primary"
                    centerTabs
                />
            </Editor>
        </>
    )
}

export default RoadmapPage
