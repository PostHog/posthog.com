import Chip from 'components/Chip'
import FooterCTA from 'components/FooterCTA'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useState } from 'react'
import AppsList from '../AppsList'
import Layout from '../Layout'

const filters = [
    {
        type: 'type',
        name: 'Data-in',
    },
    {
        type: 'type',
        name: 'Data-out',
    },
    {
        type: 'type',
        name: 'Ingestion-filtering',
    },
    {
        type: 'maintainer',
        name: 'Official',
    },
    {
        type: 'maintainer',
        name: 'Community',
    },
]

function AppsPage() {
    const {
        apps: { nodes },
    } = useStaticQuery(query)
    const [apps, setApps] = useState(nodes)
    const [filteredApps, setFilteredApps] = useState(null)
    const [currentFilter, setCurrentFilter] = useState('all')

    const filter = (filter) => apps.filter(filter)

    const filterApps = (type, name) => {
        let filteredApps = []
        if (type === 'type') {
            filteredApps = filter((app) => app.frontmatter.filters?.type.includes(name))
        }
        if (type === 'maintainer') {
            filteredApps = filter((app) => app.frontmatter.filters?.maintainer === name)
        }
        if (type === 'builtIn') {
            filteredApps = filter((app) => app.frontmatter.filters?.builtIn)
        }
        setCurrentFilter(name)
        setFilteredApps(filteredApps)
    }

    const resetFilters = () => {
        setCurrentFilter('all')
        setFilteredApps(apps)
    }

    return (
        <Layout>
            <header className="py-12">
                <h2 className="m-0 text-center text-[2.75rem] leading-[2.75rem]  md:text-6xl text-primary">
                    Do more with your data with <br className="hidden lg:block" />
                    <span className="text-blue">PostHog Apps</span>
                </h2>
                <p className="my-6 mx-auto text-center text-base md:text-lg font-semibold mt-2 lg:mt-4 text-primary max-w-2xl opacity-75">
                    50-ish apps available
                </p>
            </header>
            <div className="flex justify-start px-4 md:justify-center items-center mb-6 space-x-2 overflow-auto whitespace-nowrap">
                <Chip onClick={resetFilters} active={currentFilter === 'all'} text="All" />
                {filters.map(({ type, name }) => (
                    <Chip
                        onClick={() => filterApps(type, name.toLowerCase())}
                        active={currentFilter === name.toLowerCase()}
                        key={name}
                        text={name}
                    />
                ))}
            </div>
            <AppsList apps={filteredApps || apps} />

            <div className="my-12 md:my-24 px-5 max-w-[960px] mx-auto">
                <FooterCTA />
            </div>
        </Layout>
    )
}

const query = graphql`
    query {
        apps: allMdx(filter: { fields: { slug: { regex: "/^/apps/(?!.*/docs).*/" } } }) {
            nodes {
                id
                fields {
                    slug
                }
                frontmatter {
                    thumbnail {
                        id
                        publicURL
                    }
                    title
                    badge
                    price
                    filters {
                        type
                        maintainer
                    }
                }
            }
        }
    }
`

export default AppsPage
