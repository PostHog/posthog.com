import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import TeamMap from 'components/People/TeamMap'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'

const PeopleMapPage = () => {
    const {
        team: { teamMembers },
        mapboxLocations: { nodes: mapboxLocations },
    } = useStaticQuery(graphql`
        query PeopleMapPageQuery {
            team: allSqueakProfile(
                filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }
                sort: { fields: startDate, order: ASC }
            ) {
                teamMembers: nodes {
                    id
                    squeakId
                    firstName
                    lastName
                    companyRole
                    country
                    location
                    pronouns
                    color
                    avatar {
                        url
                    }
                }
            }
            mapboxLocations: allMapboxLocation {
                nodes {
                    profileId
                    location
                    coordinates {
                        latitude
                        longitude
                    }
                }
            }
        }
    `)

    const { tabs, handleTabChange, tabContainerClassName, className } = useCompanyNavigation({
        value: '/map',
        content: (
            <div className="max-w-screen-6xl mx-auto px-4 py-8 @xl:px-8">
                <div className="max-w-3xl mb-8">
                    <h1 className="text-4xl font-bold mb-3">PostHog people map</h1>
                    <p className="text-lg text-secondary">
                        Explore where the PostHog team is based around the world and meet the humans behind the features
                        you love.
                    </p>
                </div>
                <TeamMap teamMembers={teamMembers} locations={mapboxLocations} />
            </div>
        ),
    })

    return (
        <>
            <SEO
                title="People map – PostHog"
                description="See where the PostHog team is located around the world."
                image={`/images/og/people.jpg`}
            />
            <Editor
                maxWidth="100%"
                proseSize="base"
                hasTabs
                bookmark={{
                    title: 'People map',
                    description: 'See where PostHog is around the world',
                }}
            >
                <OSTabs
                    tabs={tabs}
                    defaultValue="/map"
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

export default PeopleMapPage
