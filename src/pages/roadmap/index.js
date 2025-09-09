import React, { useState } from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import Roadmap from 'components/Roadmap'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'
import { useRoadmaps } from 'hooks/useRoadmaps'
import groupBy from 'lodash.groupby'

const RoadmapPage = () => {
    const [filteredRoadmaps, setFilteredRoadmaps] = useState(null)
    const [groupByValue, setGroupByValue] = useState(null)
    const { tabs, handleTabChange, tabContainerClassName, className } = useCompanyNavigation({
        value: '/roadmap',
        content: (
            <div className="p-4 @xl:p-8">
                <h1>Roadmap</h1>
                <Roadmap filteredRoadmaps={filteredRoadmaps} groupByValue={groupByValue} />
            </div>
        ),
    })

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
