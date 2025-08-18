import React, { useState, useMemo } from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import People from 'components/People'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'
import { graphql, useStaticQuery } from 'gatsby'

const PeoplePage = () => {
    const { activeTab, handleTabChange, createTabs } = useCompanyNavigation()
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredPeople, setFilteredPeople] = useState(null)
    const [nameFilter, setNameFilter] = useState(null)
    const [pizzaFilter, setPizzaFilter] = useState(null)

    // Get team members data - include all fields needed by TeamMember component
    const {
        team: { teamMembers },
    } = useStaticQuery(graphql`
        query PeoplePageQuery {
            team: allSqueakProfile(
                filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }
                sort: { fields: startDate, order: ASC }
            ) {
                teamMembers: nodes {
                    squeakId
                    avatar {
                        url
                    }
                    biography
                    lastName
                    firstName
                    companyRole
                    country
                    color
                    location
                    pronouns
                    pineappleOnPizza
                    startDate
                    teams {
                        data {
                            id
                            attributes {
                                name
                                slug
                            }
                        }
                    }
                    leadTeams {
                        data {
                            attributes {
                                name
                            }
                        }
                    }
                }
            }
        }
    `)

    // Create filter options for names
    const availableFilters = useMemo(
        () => [
            {
                label: 'People named',
                operator: 'is',
                options: [
                    { label: 'Any', value: null },
                    { label: 'Ben', value: 'Ben' },
                    { label: 'Daniel', value: 'Daniel' },
                ],
                filter: (person, value) => {
                    if (!value) return true
                    return person.firstName === value
                },
            },
            {
                label: 'Pineapple on pizza',
                operator: 'is',
                options: [
                    { label: 'All', value: null },
                    { label: 'True', value: true },
                    { label: 'False', value: false },
                    { label: 'Undecided', value: 'undecided' },
                ],
                filter: (person, value) => {
                    if (value === null) return true
                    if (value === 'undecided') {
                        return person.pineappleOnPizza === null || person.pineappleOnPizza === undefined
                    }
                    return person.pineappleOnPizza === value
                },
            },
        ],
        []
    )

    // Handle filter changes
    const handleFilterChange = (filteredData) => {
        setFilteredPeople(filteredData)
    }

    // Create tabs using the shared hook
    const tabs = createTabs((tabValue, item) => (
        <div className="w-full">
            {tabValue === 'people' ? (
                <People searchTerm={searchTerm} filteredMembers={filteredPeople} />
            ) : (
                <div className="p-8 text-center text-muted">
                    <p>Loading {item.name} content...</p>
                </div>
            )}
        </div>
    ))

    return (
        <>
            <SEO title="People – PostHog" description="Meet the PostHog team" image={`/images/og/people.jpg`} />
            <Editor
                title="Company"
                type="people"
                proseSize="base"
                onSearchChange={(query) => setSearchTerm(query)}
                availableFilters={availableFilters}
                dataToFilter={teamMembers}
                onFilterChange={handleFilterChange}
                showFilters={true}
                bookmark={{
                    title: 'People',
                    description: 'Meet the PostHog team',
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

export default PeoplePage
