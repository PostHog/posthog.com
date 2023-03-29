import Chip from 'components/Chip'
import FooterCTA from 'components/FooterCTA'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useEffect, useState } from 'react'
import TemplatesList from '../TemplatesList'
import Layout from '../Layout'
import { SEO } from 'components/seo'
import { navigate } from 'gatsby'

const filters = [
    {
        type: 'type',
        name: 'Product',
    },
    {
        type: 'type',
        name: 'Marketing',
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

function TemplatesPage({ location }) {
    const {
        templates: { nodes },
    } = useStaticQuery(query)
    const [templates, setTemplates] = useState(nodes)
    const [filteredTemplates, setFilteredTemplates] = useState(null)
    const [currentFilter, setCurrentFilter] = useState('all')

    const filter = (filter) => templates.filter(filter)

    const filterTemplates = (type, name) => {
        let filteredTemplates = []
        if (type === 'type') {
            filteredTemplates = filter((template) => template.frontmatter.filters?.type.includes(name))
        }
        if (type === 'maintainer') {
            filteredTemplates = filter((template) => template.frontmatter.filters?.maintainer === name)
        }
        if (type === 'builtIn') {
            filteredTemplates = filter((template) => template.frontmatter.filters?.builtIn)
        }
        setCurrentFilter(name)
        setFilteredTemplates(filteredTemplates)
    }

    const resetFilters = () => {
        navigate('?')
        setCurrentFilter('all')
        setFilteredTemplates(templates)
    }

    useEffect(() => {
        const params = new URLSearchParams(location?.search)
        const filter = params.get('filter')
        const value = params.get('value')

        if (filter && value) filterTemplates(filter, value)
    }, [location])

    return (
        <Layout>
            <SEO
                title="PostHog Templates"
                description="Do more with your data with PostHog Templates"
                image={`/og-images/apps.jpeg`}
            />
            <header className="py-12">
                <h2 className="m-0 text-center text-[2.75rem] leading-none  md:text-6xl text-primary">
                    Do more with your data with <br className="hidden lg:block" />
                    <span className="text-blue">PostHog Templates</span>
                </h2>
                <p className="my-6 mx-auto text-center text-lg md:text-lg font-semibold mt-2 lg:mt-4 text-primary max-w-2xl opacity-75">
                    Instantly start collecting essential insights in one place
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
            <TemplatesList templates={filteredTemplates || templates} />

            <div className="my-12 md:my-24 px-5 max-w-[960px] mx-auto">
                <FooterCTA />
            </div>
        </Layout>
    )
}

const query = graphql`
    query {
        templates: allMdx(filter: { fields: { slug: { regex: "/^/templates/(?!.*/docs).*/" } } }) {
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

export default TemplatesPage
