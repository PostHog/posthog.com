import { Calendar } from 'components/Icons/Icons'
import Link from 'components/Link'
import SliderNav from 'components/SliderNav'
import { graphql, useStaticQuery } from 'gatsby'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useRef, useState } from 'react'
import Slider from 'react-slick'

const SliderItem = ({ image, date, url, authors, title }) => {
    return (
        <div className="p-3 sm:p-6 border-r border-dashed max-w-[80vw] sm:max-w-lg md:max-w-2xl lg:max-w-4xl w-full border-gray-accent-light dark:border-gray-accent-dark text-black dark:text-white">
            <div className="flex justify-between items-center mb-2">
                {authors && (
                    <ul className="flex space-x-2 list-none p-0 m-0">
                        {authors.map(({ image, name, id }) => {
                            return (
                                <li key={id} className="flex space-x-2 items-center">
                                    <div className="w-[36px] h-[36px] relative rounded-full overflow-hidden">
                                        <GatsbyImage image={getImage(image)} />
                                    </div>
                                    <span className="author text-[15px] font-semibold opacity-50">{name}</span>
                                </li>
                            )
                        })}
                    </ul>
                )}
                <span className="flex space-x-2 items-center ml-auto">
                    <Calendar className="text-gray" />
                    <time className="font-semibold opacity-50 text-[13px]">{date}</time>
                </span>
            </div>

            <Link to={url}>
                {image ? <GatsbyImage image={getImage(image)} /> : <img width={514} height={289} src="/banner.png" />}
            </Link>
        </div>
    )
}

export default function TutorialsSlider({ topic }: { topic: string }): any {
    const {
        allMdx: { nodes },
    } = useStaticQuery(query)
    const tutorials = nodes.filter((tutorial) =>
        tutorial?.frontmatter?.topics?.some((tutorialTopic) => tutorialTopic === topic)
    )
    const [activeSlide, setActiveSlide] = useState(0)
    const sliderRef = useRef(null)
    const sliderSettings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToScroll: 1,
        autoplay: false,
        variableWidth: true,
        adaptiveHeight: true,
    }

    const handleChange = (_, newIndex) => {
        setActiveSlide(newIndex)
    }
    const breakpoints = useBreakpoint()
    const slidesToShow = breakpoints.lg ? 1 : breakpoints['2xl'] ? 2 : 3
    return (
        tutorials.length > 1 && (
            <div>
                <div className="flex justify-between items-end mb-6">
                    <h4 className="m-0">{topic.charAt(0).toUpperCase() + topic.slice(1)} tutorials</h4>
                    {tutorials.length > 1 && tutorials.length > slidesToShow && (
                        <SliderNav
                            handlePrevious={() => sliderRef.current.slickPrev()}
                            handleNext={() => sliderRef.current.slickNext()}
                            currentIndex={activeSlide}
                            length={tutorials.length - slidesToShow}
                            className="!my-0"
                        />
                    )}
                </div>

                <div className="border-t border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark w-screen">
                    <Slider beforeChange={handleChange} ref={sliderRef} slidesToShow={slidesToShow} {...sliderSettings}>
                        {tutorials.map((tutorial) => {
                            const {
                                frontmatter: { featuredImage, authors, title },
                                parent: {
                                    fields: { date },
                                },
                                id,
                                fields: { slug },
                            } = tutorial
                            return (
                                <SliderItem
                                    title={title}
                                    key={id}
                                    image={featuredImage}
                                    date={date}
                                    authors={authors}
                                    url={slug}
                                />
                            )
                        })}
                    </Slider>
                </div>
            </div>
        )
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
                    topics
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
