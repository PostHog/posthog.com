import React, { useState, useEffect } from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import Roadmap from 'components/Roadmap'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'
import { useRoadmaps } from 'hooks/useRoadmaps'
import groupBy from 'lodash.groupby'

const RoadmapPage = () => {
    const { activeTab, handleTabChange, createTabs } = useCompanyNavigation()
    const [filteredRoadmaps, setFilteredRoadmaps] = useState(null)
    const [groupByValue, setGroupByValue] = useState(null)

    // Fetch roadmaps for filter options
    const { roadmaps } = useRoadmaps({
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

    // Create tabs using the shared hook
    const tabs = createTabs((tabValue, item) => (
        <div className="w-full">
            {tabValue === 'roadmap' ? (
                <Roadmap filteredRoadmaps={filteredRoadmaps} groupByValue={groupByValue} />
            ) : (
                <div className="p-8 text-center text-muted">
                    <p>Loading {item.name} content...</p>
                </div>
            )}
        </div>
    ))

    return (
        <>
            <SEO
                title="Roadmap – PostHog"
                description="See what we're building next"
                image={`/images/og/roadmap.jpg`}
            />
            <Editor
                title="Company"
                type="roadmap"
                proseSize="base"
                showFilters
                dataToFilter={roadmaps}
                onFilterChange={(data) => setFilteredRoadmaps(data)}
                availableFilters={
                    roadmaps && roadmaps.length > 0
                        ? [
                              {
                                  label: 'Team',
                                  operator: 'equals',
                                  options: [
                                      { label: 'All', value: null },
                                      ...Object.keys(
                                          groupBy(
                                              roadmaps,
                                              (roadmap) =>
                                                  roadmap.attributes?.teams?.data?.[0]?.attributes?.name ||
                                                  'Not assigned'
                                          )
                                      )
                                          .sort()
                                          .filter((team) => team !== 'Not assigned')
                                          .map((team) => ({
                                              label: team,
                                              value: team,
                                          })),
                                      { label: 'Not assigned', value: 'Not assigned' },
                                  ],
                                  filter: (roadmap, value) => {
                                      const teamName = roadmap.attributes?.teams?.data?.[0]?.attributes?.name
                                      if (value === 'Not assigned') {
                                          return !teamName
                                      }
                                      return teamName === value
                                  },
                              },
                          ]
                        : undefined
                }
                availableGroups={[
                    {
                        label: 'Team',
                        value: 'attributes.teams.data[0].attributes.name',
                    },
                ]}
                onGroupChange={(group) => {
                    setGroupByValue(group === 'none' ? null : group)
                }}
                bookmark={{
                    title: 'Roadmap',
                    description: "See what we're building next",
                }}
            >
                <OSTabs
                    tabs={tabs}
                    value={activeTab}
                    onValueChange={handleTabChange}
                    frame={false}
                    className="-mx-4 -mt-4"
                    triggerDataScheme="primary"
                />
            </Editor>
        </>
    )
}

export default RoadmapPage
