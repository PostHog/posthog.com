import Chip from 'components/Chip'
import FooterCTA from 'components/FooterCTA'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { SEO } from 'components/seo'
import { navigate } from 'gatsby'
import Link from 'components/Link'
import List from 'components/List'

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
        type: 'type',
        name: 'Other',
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

function AppsPage({ location }) {
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
        navigate('?')
        setCurrentFilter('all')
        setFilteredApps(apps)
    }

    useEffect(() => {
        const params = new URLSearchParams(location?.search)
        const filter = params.get('filter')
        const value = params.get('value')

        if (filter && value) filterApps(filter, value)
    }, [location])

    return (
        <Layout>
            <SEO
                title="PostHog Apps"
                description="Do even more cool stuff with PostHog Apps"
                image={`/og-images/apps.jpeg`}
            />
            <header className="py-12">
                <h2 className="m-0 text-center text-[2.75rem] leading-none  md:text-6xl dark:text-primary-dark">
                    Do even more cool stuff <br className="hidden lg:block" />
                    <span className="text-blue">PostHog Apps</span>
                </h2>
                <p className="my-6 mx-auto text-center text-lg md:text-lg font-semibold mt-2 lg:mt-4 text-primary/75 dark:text-primary-dark/75 max-w-2xl">
                    Apps are built on the <Link to="/docs/api">PostHog API</Link>. They appear right inside PostHog, and
                    if using PostHog.js, apps can also inject code directly into your website or product.
                </p>
            </header>
            <div className="hidden flex justify-start px-4 md:justify-center items-center mb-6 space-x-2 overflow-auto whitespace-nowrap">
                <Chip onClick={resetFilters} active={currentFilter === 'all'} text="All" />
                {filters.map(({ type, name }) => (
                    <Chip
                        onClick={() => navigate(`?filter=${type}&value=${name.toLowerCase()}`)}
                        active={currentFilter === name.toLowerCase()}
                        key={name}
                        text={name}
                    />
                ))}
            </div>
            <List
                className="max-w-2xl mx-auto"
                items={[
                    ...(filteredApps || apps)?.map(
                        ({ fields: { slug }, frontmatter: { thumbnail, title, badge, price } }) => ({
                            label: title,
                            url: slug,
                            badge: badge?.toLowerCase() !== 'built-in' && (price || 'Free'),
                            image: thumbnail?.publicURL,
                        })
                    ),
                    { label: <>Build your own &rarr;</>, url: '/docs/cdp/build', image: '/images/builder-hog.png' },
                ]}
            />

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
