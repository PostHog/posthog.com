import React, { useState, useMemo } from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import People from 'components/People'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'
import { graphql } from 'gatsby'

const PeoplePage = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredPeople, setFilteredPeople] = useState(null)
    const [nameFilter, setNameFilter] = useState(null)
    const [pizzaFilter, setPizzaFilter] = useState(null)
    const {
        team: { teamMembers },
        allTeams,
    } = data

    const { handleTabChange, tabs, tabContainerClassName, className } = useCompanyNavigation({
        value: '/people',
        content: (
            <div className="max-w-screen-6xl mx-auto">
                <h1>People</h1>
                <People
                    searchTerm={searchTerm}
                    filteredMembers={filteredPeople}
                    teamMembers={teamMembers}
                    allTeams={allTeams}
                />
            </div>
        ),
    })

    // Create filter options for names
    const availableFilters = useMemo(
        () => [
            {
                label: 'People named',
                operator: 'is',
                options: [
                    { label: 'Any', value: 'any' },
                    { label: 'Ben', value: 'Ben' },
                    { label: 'Daniel', value: 'Daniel' },
                ],
                filter: (person, value) => value === 'any' || person.firstName === value,
            },
            {
                label: 'Pineapple on pizza',
                operator: 'is',
                options: [
                    { label: 'All', value: 'all' },
                    { label: 'True', value: 'true' },
                    { label: 'False', value: 'false' },
                    { label: 'Undecided', value: 'undecided' },
                ],
                filter: (person, value) => {
                    if (value === 'all') return true
                    if (value === 'true') return person.pineappleOnPizza
                    if (value === 'false') return person.pineappleOnPizza === false
                    if (value === 'undecided') {
                        return person.pineappleOnPizza === null || person.pineappleOnPizza === undefined
                    }
                },
            },
        ],
        []
    )

    // Handle filter changes - combine filter and search logic
    const handleFilterChange = (filteredData) => {
        // When filters change, apply them but keep the search term active
        setFilteredPeople(filteredData)
    }

    return (
        <>
            <SEO title="People – PostHog" description="Meet the PostHog team" image={`/images/og/people.jpg`} />
            <Editor
                hasTabs
                type="people"
                maxWidth="100%"
                proseSize="base"
                onSearchChange={(query) => setSearchTerm(query)}
                availableFilters={availableFilters}
                dataToFilter={teamMembers}
                onFilterChange={handleFilterChange}
                bookmark={{
                    title: 'People',
                    description: 'Meet the PostHog team',
                }}
            >
                <OSTabs
                    tabs={tabs}
                    defaultValue="/people"
                    onValueChange={handleTabChange}
                    padding
                    tabContainerClassName={tabContainerClassName}
                    className={className}
                    triggerDataScheme="primary"
                    centerTabs
                />
            </Editor>
        </>
    )
}

export default PeoplePage

export const query = graphql`
    {
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
        allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) {
            nodes {
                id
                name
                crest {
                    data {
                        attributes {
                            url
                        }
                    }
                }
                miniCrest {
                    gatsbyImageData(width: 20, height: 20)
                }
            }
        }
    }
`
