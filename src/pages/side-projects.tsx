import Chip from 'components/Chip'
import Layout from 'components/Layout'
import Link from 'components/Link'
import List from 'components/List'
import { SEO } from 'components/seo'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import React, { useEffect, useMemo, useState } from 'react'

function SideProjectsPage({ location }) {
    const {
        sideProjects: { nodes },
    } = useStaticQuery(query)

    const [projects, setProjects] = useState(nodes)
    const [filteredProjects, setFilteredProjects] = useState(null)
    const [currentFilter, setCurrentFilter] = useState('all')

    // Extract all unique tags dynamically from project frontmatter
    const allTags = useMemo(() => {
        const tags = new Set<string>()
        nodes.forEach((node) => {
            node.frontmatter.filters?.tags?.forEach((tag: string) => tags.add(tag))
        })
        return Array.from(tags).sort()
    }, [nodes])

    const filterProjects = (tag: string) => {
        const filtered = projects.filter((project) =>
            project.frontmatter.filters?.tags?.some((t: string) => t.toLowerCase() === tag.toLowerCase())
        )
        setCurrentFilter(tag.toLowerCase())
        setFilteredProjects(filtered)
    }

    const resetFilters = () => {
        navigate('?')
        setCurrentFilter('all')
        setFilteredProjects(null)
    }

    useEffect(() => {
        const params = new URLSearchParams(location?.search)
        const filter = params.get('filter')
        const value = params.get('value')

        if (filter === 'tags' && value) {
            filterProjects(value)
        }
    }, [location])

    const displayProjects = filteredProjects || projects

    return (
        <Layout>
            <SEO
                title="PostHog Side Projects"
                description="Fun and interesting side projects from the PostHog team"
                image="/images/side-projects-og.png"
            />
            <header className="py-12 px-5">
                <h1 className="m-0 text-center text-4xl md:text-5xl lg:text-6xl text-primary dark:text-primary-dark">
                    Side Projects
                </h1>
                <p className="my-4 mx-auto text-center text-lg md:text-xl font-semibold text-primary/75 dark:text-primary-dark/75 max-w-2xl">
                    Fun and interesting projects from the PostHog team. Demos, experiments, tools, and more.
                </p>
                <p className="text-center">
                    <Link to="/side-projects/guide" className="text-red dark:text-yellow hover:underline text-sm">
                        Want to add your project? &rarr;
                    </Link>
                </p>
            </header>

            {allTags.length > 0 && (
                <div className="flex justify-start px-4 md:justify-center items-center mb-6 space-x-2 overflow-auto whitespace-nowrap">
                    <Chip onClick={resetFilters} active={currentFilter === 'all'} text="All" />
                    {allTags.map((tag) => (
                        <Chip
                            onClick={() => navigate(`?filter=tags&value=${tag.toLowerCase()}`)}
                            active={currentFilter === tag.toLowerCase()}
                            key={tag}
                            text={tag}
                        />
                    ))}
                </div>
            )}

            {displayProjects.length > 0 ? (
                <List
                    className="max-w-2xl mx-auto pb-12 px-4"
                    items={displayProjects.map(
                        ({ fields: { slug }, frontmatter: { thumbnail, title, description, author, liveUrl } }) => ({
                            label: title,
                            url: slug,
                            image: thumbnail?.publicURL,
                            description: description,
                            badge: liveUrl ? 'Live' : undefined,
                        })
                    )}
                />
            ) : (
                <div className="text-center py-12 text-primary/60 dark:text-primary-dark/60">
                    <p>No projects found matching that filter.</p>
                    <button onClick={resetFilters} className="mt-4 text-red dark:text-yellow hover:underline">
                        Clear filter
                    </button>
                </div>
            )}
        </Layout>
    )
}

const query = graphql`
    query {
        sideProjects: allMdx(
            filter: { fields: { slug: { regex: "/^/side-projects/(?!_)/" } } }
            sort: { fields: frontmatter___title, order: ASC }
        ) {
            nodes {
                id
                fields {
                    slug
                }
                frontmatter {
                    thumbnail {
                        publicURL
                    }
                    title
                    description
                    author
                    liveUrl
                    filters {
                        tags
                    }
                }
            }
        }
    }
`

export default SideProjectsPage
