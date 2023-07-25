import ResourceItem from 'components/Docs/ResourceItem'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

export default function TutorialsSlider({ topic, slugs }: { topic?: string; slugs?: string[] }): any {
    const {
        allMdx: { nodes },
    } = useStaticQuery(query)
    const tutorials = nodes.filter((tutorial) => {
        return slugs
            ? slugs.includes(tutorial.fields.slug)
            : tutorial?.frontmatter?.tags?.some((tutorialTag) => tutorialTag === topic)
    })

    return (
        <ul className="list-none m-0 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
            {tutorials.map(({ id, frontmatter: { title, featuredImage }, fields: { slug } }) => {
                return <ResourceItem key={id} title={title} url={slug} gatsbyImage={featuredImage} />
            })}
        </ul>
    )
}

export const query = graphql`
    query TutorialsSliderQuery {
        allMdx(filter: { fields: { slug: { regex: "/^/tutorials/" } } }, limit: 1000) {
            nodes {
                id
                fields {
                    slug
                }
                frontmatter {
                    title
                    tags
                    authors: authorData {
                        id
                        image {
                            childImageSharp {
                                gatsbyImageData(width: 36, height: 36)
                            }
                        }
                        name
                    }
                    featuredImage {
                        childImageSharp {
                            gatsbyImageData(width: 514, height: 289)
                        }
                    }
                }
                parent {
                    ... on File {
                        fields {
                            date: gitLogLatestDate(formatString: "MMM 'YY")
                        }
                    }
                }
            }
        }
    }
`
