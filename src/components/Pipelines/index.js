import Chip from 'components/Chip'
import FooterCTA from 'components/FooterCTA'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { SEO } from 'components/seo'
import { navigate } from 'gatsby'
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

function PipelinesPage({ location }) {
    const {
        pipelines: { nodes },
    } = useStaticQuery(query)
    const [pipelines, setPipelines] = useState(nodes)
    const [filteredPipelines, setFilteredPipelines] = useState(null)
    const [currentFilter, setCurrentFilter] = useState('all')

    const filter = (filter) => pipelines.filter(filter)

    const filterPipelines = (type, name) => {
        let filteredPipelines = []
        if (type === 'type') {
            filteredPipelines = filter((pipeline) => pipeline.frontmatter.filters?.type.includes(name))
        }
        if (type === 'maintainer') {
            filteredPipelines = filter((pipeline) => pipeline.frontmatter.filters?.maintainer === name)
        }
        if (type === 'builtIn') {
            filteredPipelines = filter((pipeline) => pipeline.frontmatter.filters?.builtIn)
        }
        setCurrentFilter(name)
        setFilteredPipelines(filteredPipelines)
    }

    const resetFilters = () => {
        navigate('?')
        setCurrentFilter('all')
        setFilteredPipelines(pipelines)
    }

    useEffect(() => {
        const params = new URLSearchParams(location?.search)
        const filter = params.get('filter')
        const value = params.get('value')

        if (filter && value) filterPipelines(filter, value)
    }, [location])

    return (
        <Layout>
            <SEO
                title="CDP data connections"
                description="Get all your data into PostHog with 60+ sources & destinations"
                image={`/og-images/apps.jpeg`}
            />
            <header className="py-12">
                <h2 className="m-0 text-center text-[2.75rem] leading-none  md:text-6xl text-primary dark:text-primary-dark">
                    Get all your data into PostHog with <br className="hidden lg:block" />
                    <span className="text-blue">data connections</span>
                </h2>
                <p className="my-6 mx-auto text-center text-lg md:text-lg font-semibold mt-2 lg:mt-4 text-primary dark:text-primary-dark max-w-2xl opacity-75">
                    (Our full customer data platform is coming soon.)
                </p>
            </header>
            <div className="flex justify-start px-4 md:justify-center items-center mb-6 space-x-2 overflow-auto whitespace-nowrap">
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
                    ...(filteredPipelines || pipelines)?.map(
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
        pipelines: allMdx(filter: { fields: { slug: { regex: "/^/cdp/(?!.*/docs).*/" } } }) {
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

export default PipelinesPage
