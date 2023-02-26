import FullWidthBorderSlider from 'components/FullWidthBorderSlider'
import { graphql, useStaticQuery } from 'gatsby'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import React, { useRef, useState } from 'react'

export default function TutorialsSlider({ topic }: { topic: string }): any {
    const {
        allMdx: { nodes },
    } = useStaticQuery(query)
    const tutorials = nodes.filter((tutorial) =>
        tutorial?.frontmatter?.tags?.some((tutorialTag) => tutorialTag === topic)
    )
    const [activeSlide, setActiveSlide] = useState(0)

    return (
        <FullWidthBorderSlider
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            slides={tutorials?.map((tutorial) => {
                const {
                    featuredImageImgix,
                    frontmatter: { authors, title },
                    parent: {
                        fields: { date },
                    },
                    id,
                    fields: { slug },
                } = tutorial
                return {
                    image: featuredImageImgix,
                    authors,
                    title,
                    date,
                    url: slug,
                    id,
                    maxWidth: 514,
                }
            })}
        />
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
                featuredImageImgix
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
