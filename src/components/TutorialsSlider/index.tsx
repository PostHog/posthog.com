import { Calendar } from 'components/Icons/Icons'
import Link from 'components/Link'
import SliderNav from 'components/SliderNav'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useRef, useState } from 'react'
import Slider from 'react-slick'

const SliderItem = ({ image, date, url, authors }) => {
    return (
        <div className="p-6 sm:p-10 border-r border-dashed max-w-lg md:max-w-2xl lg:max-w-4xl w-full border-gray-accent-light">
            <div className="flex justify-between items-center mb-2">
                {authors && (
                    <ul className="flex space-x-2 list-none p-0 m-0">
                        {authors.map(({ image, name, id }) => {
                            return (
                                <li key={id} className="flex space-x-2 items-center">
                                    <div className="w-[36px] h-[36px] relative rounded-full overflow-hidden">
                                        <img className="absolute w-full h-full inset-0 object-cover" src={image} />
                                    </div>
                                    <span className="author text-[15px] font-semibold text-black opacity-50">
                                        {name}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                )}
                <span className="flex space-x-2 items-center ml-auto">
                    <Calendar className="text-gray" />
                    <time className="font-semibold text-black opacity-50 text-[13px]">{date}</time>
                </span>
            </div>

            <Link to={url}>
                <GatsbyImage image={getImage(image)} />
            </Link>
        </div>
    )
}

export default function TutorialsSlider({ topic }: { topic: string }): JSX.Element {
    const {
        allMdx: { nodes },
    } = useStaticQuery(query)
    const tutorials = nodes.filter(
        (tutorial) =>
            tutorial?.frontmatter?.featuredImage &&
            tutorial?.frontmatter?.topics?.some((tutorialTopic) => tutorialTopic === topic)
    )
    const [activeSlide, setActiveSlide] = useState(0)
    const sliderRef = useRef(null)
    const sliderSettings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        variableWidth: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 639,
                settings: {
                    variableWidth: false,
                },
            },
        ],
    }

    const handleChange = (_, newIndex) => {
        setActiveSlide(newIndex)
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h4>{topic.charAt(0).toUpperCase() + topic.slice(1)} tutorials</h4>
                <SliderNav
                    handlePrevious={() => sliderRef.current.slickPrev()}
                    handleNext={() => sliderRef.current.slickNext()}
                    currentIndex={activeSlide}
                    length={tutorials.length - 1}
                />
            </div>
            <div className="border-t border-b border-dashed border-gray-accent-light">
                <Slider beforeChange={handleChange} ref={sliderRef} {...sliderSettings}>
                    {tutorials.map((tutorial) => {
                        const {
                            frontmatter: { featuredImage, authors },
                            parent: {
                                fields: { date },
                            },
                            id,
                            fields: { slug },
                        } = tutorial
                        return <SliderItem key={id} image={featuredImage} date={date} authors={authors} url={slug} />
                    })}
                </Slider>
            </div>
        </div>
    )
}

export const query = graphql`
    query TutorialsSliderQuery {
        allMdx(filter: { fields: { slug: { regex: "/^/docs/tutorials/" } } }, limit: 1000) {
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
                        image
                        name
                    }
                    featuredImage {
                        childImageSharp {
                            gatsbyImageData(width: 514)
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
