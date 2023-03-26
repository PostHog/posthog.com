import Link from 'components/Link'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Analytics, SessionRecording, FeatureFlags, AbTesting } from 'components/ProductIcons'
import { Platform } from 'components/NotProductIcons'
import Layout from 'components/Layout'
import { GatsbyImage, getImage, ImageDataLike, StaticImage } from 'gatsby-plugin-image'
import { Post } from '../Blog'
import TeamRoadmap from 'components/TeamRoadmap'
import ReactCountryFlag from 'react-country-flag'
import { ContributorImage } from 'components/PostLayout/Contributors'
import { graphql, useStaticQuery } from 'gatsby'
import { CallToAction } from '../CallToAction'
import Slider from 'react-slick'
import { useLocation } from '@reach/router'
import { Menu } from '@headlessui/react'
import { Link as ScrollLink } from 'react-scroll'
import { Chevron } from 'components/Icons'
import slugify from 'slugify'
import * as ProductIcons from 'components/ProductIcons'
import * as NotProductIcons from 'components/NotProductIcons'
import GithubSlugger from 'github-slugger'

const nav = [
    {
        label: 'Product analytics',
        url: '/product-analytics',
        icon: <Analytics className="w-5" />,
    },
    {
        label: 'Session replay',
        url: '/session-replay',
        icon: <SessionRecording className="w-5" />,
    },
    {
        label: 'Feature flags',
        url: '/feature-flags',
        icon: <FeatureFlags className="w-5" />,
    },
    {
        label: 'A/B testing',
        url: '/ab-testing',
        icon: <AbTesting className="w-5" />,
    },
    {
        label: 'Product OS',
        url: '/product-os',
        icon: <Platform className="w-5" />,
    },
]

export const MainFeatures = (props: IFeatureGridProps) => {
    return (
        <ul className="p-0" id="features">
            <FeatureGrid {...props} />
        </ul>
    )
}

const getTailwindGridCol = (length: number) =>
    `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${length > 6 ? length / 2 : length}`

interface IFeatureGridProps {
    features: IFeature[]
    className?: string
}

export const FeatureGrid = ({ features, className = '' }: IFeatureGridProps) => {
    const length = features?.length ?? 1
    return (
        <SectionWrapper className="max-w-full">
            <ul
                className={`grid list-none m-0 max-w-screen-4xl space-y-8 md:space-y-0 mx-auto p-0 ${getTailwindGridCol(
                    length
                )} ${className}`}
            >
                {features.map((feature) => {
                    return <Feature key={feature.title} {...feature} />
                })}
            </ul>
        </SectionWrapper>
    )
}

interface IPairGridProps {
    features: IFeature[]
    className?: string
}

export const PairGrid = ({ features, className = '' }: IPairGridProps) => {
    const length = features?.length ?? 1
    return (
        <SectionWrapper className="max-w-full">
            <ul
                className={`md:grid list-none m-0 max-w-screen-4xl mx-auto p-0 space-y-4 md:space-y-0 ${getTailwindGridCol(
                    length
                )} ${className}`}
            >
                {features.map((feature) => {
                    return <PairItem key={feature.title} {...feature} />
                })}
            </ul>
        </SectionWrapper>
    )
}

export const FeatureTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <h3 className={`text-[17px] mb-1 leading-tight ${className}`}>{children}</h3>
)

export const FeatureDescription = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <p className={`m-0 text-[15px] ${className}`}>{children}</p>
)

interface ISection {
    title?: string
    subtitle?: string
    features?: IFeature[]
    image?: ImageDataLike
    content?: string
    align?: string
    sections?: ISection[]
}

export const Section = ({ title, subtitle, features, image, content, align, sections }: ISection) => {
    const gatsbImage = image && getImage(image)
    return (
        <div style={{ alignSelf: align }}>
            {(title || subtitle) && <SectionHeading title={title} subtitle={subtitle} />}
            {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
            {features && features?.length > 0 && <FeatureList features={features} />}
            {gatsbImage && (
                <GatsbyImage alt={title || ''} image={gatsbImage} className="rounded overflow-hidden shadow-xl" />
            )}
            {sections &&
                (sections?.length > 1 ? (
                    <TwoCol>
                        {sections.map((section, index) => (
                            <Section align={section?.align} key={index} {...section} />
                        ))}
                    </TwoCol>
                ) : (
                    <Section {...sections[0]} />
                ))}
        </div>
    )
}

export const Sections = ({ sections }: { sections: ISection[][] }) => {
    return (
        <>
            {sections.map((section, index) => {
                return (
                    <SectionWrapper className="py-12 md:py-14 md:my-auto !my-0" key={index}>
                        {section.length > 1 ? (
                            <TwoCol>
                                {section.map((section, index) => (
                                    <Section align={section?.align} key={index} {...section} />
                                ))}
                            </TwoCol>
                        ) : (
                            <Section {...section[0]} />
                        )}
                    </SectionWrapper>
                )
            })}
        </>
    )
}

interface IFeature {
    title: string
    description: string
    icon?: React.ReactNode
    className?: string
}

export const Feature = ({ title, description, className = '', icon }: IFeature) => {
    const Icon = ProductIcons[icon] || NotProductIcons[icon]
    return (
        <li className={`sm:p-6 sm:pb-8  ${className}`}>
            {Icon && <Icon className="w-10 h-10 mb-4 opacity-50" />}
            <FeatureTitle>{title}</FeatureTitle>
            <FeatureDescription>{description}</FeatureDescription>
        </li>
    )
}

interface IPairItem {
    title: string
    description: string
    icon?: React.ReactNode
    url?: string
    className?: string
}

export const Documentation = ({ documentation, title, image, tutorials }) => {
    const slugger = new GithubSlugger()
    const gatsbyImage = image && getImage(image)
    return (
        <>
            <div className="pb-4 mb-4 border-b border-dashed border-gray-accent-light flex justify-between items-end">
                <h2 className="m-0">Docs & resources</h2>
                <CallToAction size="sm" type="secondary" to={documentation?.indexURL}>
                    Visit docs
                </CallToAction>
            </div>
            <div className="grid md:grid-cols-2 gap-x-0 md:gap-y-0 gap-y-4 md:gap-x-8">
                <div>
                    <h4 className="m-0 opacity-60">{title} docs</h4>
                    <ul className="m-0 p-0 list-none grid divide-y-1 divide-dashed divide-gray-accent-light">
                        {documentation?.pages?.map(({ frontmatter, fields, headings }, index) => {
                            const slug = fields?.slug
                            return (
                                <li key={slug} className="py-4 flex space-x-4">
                                    <span className="font-bold text-sm opacity-60 mt-1.5 ml-1.5">{index + 1}.</span>
                                    <div className="w-full">
                                        <Link
                                            to={slug}
                                            className="block font-semibold text-sm px-2 py-1 -ml-2 rounded-sm relative  hover:bg-gray-accent-light hover:text-red hover:scale-[1.01] active:scale-[1] active:top-[.5px]"
                                        >
                                            <h5 className="text-[17px] m-0">{frontmatter.title}</h5>
                                        </Link>
                                        <ul className="m-0 p-0 list-none">
                                            {headings
                                                .filter(({ depth }) => depth <= 3)
                                                .slice(0, 3)
                                                .map(({ value }) => {
                                                    const id = slugger.slug(value)
                                                    return (
                                                        <li key={id} className="">
                                                            <Link
                                                                to={`${slug}#${id}`}
                                                                className="block text-primary/75 font-semibold text-sm px-2 py-1 -ml-2 rounded-[3px] relative hover:bg-gray-accent-light hover:text-primary hover:scale-[1.01] active:scale-[1] active:top-[.5px]"
                                                            >
                                                                {value}
                                                            </Link>
                                                        </li>
                                                    )
                                                })}
                                        </ul>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    {gatsbyImage && (
                        <figure className="m-0 p-4 rounded bg-gray-accent-light">
                            {gatsbyImage && <GatsbyImage alt={title} image={gatsbyImage} />}
                        </figure>
                    )}
                    <h4 className="m-0 opacity-60 mt-6 md:mt-12">Tutorials</h4>
                    <ul className="m-0 p-0 list-none grid divide-y-1 divide-dashed divide-gray-accent-light">
                        {tutorials.map(({ frontmatter, fields }) => {
                            const title = frontmatter?.title
                            const slug = fields?.slug
                            return (
                                <li className="py-2" key={slug}>
                                    <Link className="font-semibold" to={slug}>
                                        {title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export const PairItem = ({ title, description, className = '', icon, url }: IPairItem) => {
    const Icon = ProductIcons[icon] || NotProductIcons[icon]
    return (
        <li className={` ${className}`}>
            <Link
                to={url}
                className="block h-full text-primary hover:text-primary p-6 pb-8 bg-white rounded-md md:mx-4 shadow relative hover:scale-[1.02] hover:top-[-.25px] active:top-[.5px] active:scale-[1]"
            >
                {Icon && <Icon className="w-8 h-8 mb-4 opacity-75" />}
                <FeatureTitle className="text-red">{title}</FeatureTitle>
                <FeatureDescription className="text-primary/75">{description}</FeatureDescription>
            </Link>
        </li>
    )
}

export const FeatureList = ({ features }: { features: IFeature[] }) => {
    return (
        <ul className="list-none m-0 p-0 space-y-6">
            {features.map(({ title, description }) => {
                return (
                    <li key={title}>
                        <FeatureTitle>{title}</FeatureTitle>
                        <FeatureDescription>{description}</FeatureDescription>
                    </li>
                )
            })}
        </ul>
    )
}

export const SectionHeading = ({ title, subtitle }: { title?: string; subtitle?: string | React.ReactNode }) => {
    return (
        <div className="mb-6">
            {title && <h2 className="text-3xl m-0">{title}</h2>}
            {subtitle && typeof subtitle === 'string' ? (
                <p className="text-base font-semibold opacity-70 m-0">{subtitle}</p>
            ) : (
                subtitle
            )}
        </div>
    )
}

export interface ITestimonial {
    author: {
        name: string
        role: string
        image: string
        company: {
            name: string
            image: string
        }
    }
    quote: string
}

export const Testimonial = ({ author, image, quote }: ITestimonial & { image: ImageDataLike }) => {
    const gatsbyImage = image && getImage(image)
    return (
        <SectionWrapper className="!pt-0 mt-0 relative">
            <Quote className="items-end">
                <div>
                    <img className="text-black max-h-[45px]" src={author.company.image} />
                    <p className="my-6 text-[17px]" dangerouslySetInnerHTML={{ __html: quote }} />

                    <div className="flex space-x-4 items-center">
                        <img className="rounded-full max-w-[50px]" src={author.image} />
                        <div>
                            <p className="m-0 font-bold">{author.name}</p>
                            <p className="m-0 opacity-70">
                                {author.role}, {author.company.name}
                            </p>
                        </div>
                    </div>
                </div>
                <div>{gatsbyImage && <GatsbyImage alt="" image={gatsbyImage} />}</div>
            </Quote>
        </SectionWrapper>
    )
}

export const TwoCol = ({ children, className = '' }: { children: React.ReactNode[]; className?: string }) => {
    return (
        <div className={`grid md:grid-cols-2 md:gap-y-0 gap-y-4 md:gap-x-8 lg:gap-x-12 xl:gap-x-16 ${className}`}>
            {children[0]}
            {children[1]}
        </div>
    )
}

export const Quote = ({ children, className = '' }: { children: React.ReactNode[]; className?: string }) => {
    return (
        <div
            className={`grid py-10 px-5 md:px-16 -mx-5 md:-mx-12 bg-gray-accent-light md:grid-cols-2 gap-y-8 md:gap-y-0 md:gap-x-8 lg:gap-x-12 xl:gap-x-16 ${className}`}
        >
            <div>{children[0]}</div>
            <div>{children[1]}</div>
        </div>
    )
}

export const PairsWith = ({ products }: { products: IFeature[] }) => {
    return (
        <div id="pairs-with">
            <SectionWrapper className="max-w-full">
                <h2 className="text-center text-4xl mb-2">Pairs with...</h2>
                <p className="text-center text-lg font-semibold text-black/70 mb-0">
                    PostHog products are natively designed to be interoperable using{' '}
                    <Link to="/product-os">Product OS</Link>.
                </p>
                <PairGrid features={products} />
            </SectionWrapper>
        </div>
    )
}

const Slide = ({ image, label }) => {
    return (
        <div className="relative group">
            <div className="hover:scale-[1.1] transition-transform relative active:scale-[1.09]">{image}</div>
            <div className="absolute left-0 bottom-4 right-0 group-hover:visible invisible flex justify-center">
                <span className="text-black bg-tan/75 backdrop-blur shadow-xl text-lg rounded-md px-3">{label}</span>
            </div>
        </div>
    )
}
const slides = [
    {
        label: 'Product analytics',
        url: 'product-analytics',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/product-analytics.png"
            />
        ),
    },
    {
        label: 'Session replay',
        url: 'session-replay',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/session-recording.png"
            />
        ),
    },
    {
        label: 'Feature flags',
        url: 'feature-flags',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/feature-flags.png"
            />
        ),
    },
    {
        label: 'A/B testing and experiments',
        url: 'ab-testing',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/experimentation.png"
            />
        ),
    },
    {
        label: 'Data warehouse',
        url: 'product-os',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/sql.png"
            />
        ),
    },
    {
        label: 'Event pipelines',
        url: 'product-os',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/event-pipelines.png"
            />
        ),
    },
    {
        label: 'API',
        url: 'product-os',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/api.png"
            />
        ),
    },
    {
        label: 'Data warehouse',
        url: 'product-os',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/data-tree.png"
            />
        ),
    },
    {
        label: 'Data warehouse',
        url: 'product-os',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/data-tractor.png"
            />
        ),
    },
    {
        label: 'Data warehouse',
        url: 'product-os',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/data-warehouse.png"
            />
        ),
    },
    {
        label: 'Data warehouse',
        url: 'product-os',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/warehouse-sync.png"
            />
        ),
    },
]

const sliderSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToScroll: 11,
    autoplay: true,
    variableWidth: true,
    autoplaySpeed: 0,
    speed: 100000,
    cssEase: 'linear',
}

export const Footer = ({ title }) => {
    const [activeSlide, setActiveSlide] = useState(0)

    return (
        <section className="text-center my-14">
            <h2 className="text-4xl md:text-6xl">PostHog does that.</h2>
            <p className="mt-2 mb-12">
                Now that you know PostHog does {title.toLowerCase()}, check out what else PostHog can do.
            </p>
            <Nav />
            <div className="-mx-5">
                <Slider
                    beforeChange={(_oldIndex, newIndex) => setActiveSlide(newIndex)}
                    className="product-hogs-slider"
                    {...sliderSettings}
                >
                    {slides.map((slide, index) => {
                        return (
                            <Link
                                key={index}
                                className="cursor-pointer"
                                smooth
                                duration={300}
                                offset={-57}
                                to={slide.url}
                            >
                                <Slide {...slide} />
                            </Link>
                        )
                    })}
                </Slider>
            </div>
        </section>
    )
}

export const SectionWrapper = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return (
        <section className={`list-none my-1 py-4 md:py-12 ${className}`}>
            <div className={`max-w-7xl mx-auto`}>{children}</div>
        </section>
    )
}

export const Comparison = ({ description, children }: { description: string; children: React.ReactNode }) => {
    return (
        <div id="comparison" className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="m-0">PostHog vs...</h2>
                    <p className="m-0">{description}</p>
                </div>
                <div>
                    <StaticImage className="max-w-[530px]" alt="PostHog vs..." src="./images/vs.png" />
                </div>
            </div>
            <div className="overflow-x-auto article-content mt-12">{children}</div>
        </div>
    )
}

export const BlogPosts = ({ posts, title }) => {
    return (
        posts &&
        posts?.length > 0 && (
            <SectionWrapper>
                <h3>{title}</h3>
                <ul className="list-none m-0 p-0 grid sm:grid-cols-2 gap-4">
                    {posts.map((post) => {
                        const {
                            node: {
                                id,
                                frontmatter: { date, title, featuredImage, authors, category },
                                fields: { slug },
                            },
                        } = post

                        return (
                            <li
                                className="relative active:top-[1px] active:scale-[.99] shadow-lg after:border-0 hover:after:border-1 after:border-black/25 after:rounded-md after:-inset-1.5 after:absolute"
                                key={id}
                            >
                                <Post
                                    date={date}
                                    title={title}
                                    featuredImage={featuredImage}
                                    authors={authors}
                                    category={category}
                                    slug={slug}
                                    imgClassName="w-full"
                                />
                            </li>
                        )
                    })}
                </ul>
            </SectionWrapper>
        )
    )
}

export const Questions = () => {
    return (
        <div id="questions" className="max-w-5xl">
            <h2>Questions?</h2>
        </div>
    )
}

export const Roadmap = ({ subtitle, team }) => {
    const {
        team: { nodes },
    } = useStaticQuery(graphql`
        query {
            team: allMdx(
                filter: { fields: { slug: { regex: "/^/team/" } } }
                sort: { fields: frontmatter___startDate }
            ) {
                nodes {
                    frontmatter {
                        headshot {
                            childImageSharp {
                                gatsbyImageData
                            }
                        }
                        team
                        jobTitle
                        name
                        country
                        github
                        teamLead
                        pineappleOnPizza
                    }
                }
            }
        }
    `)
    const teamMembers = nodes
        .filter((node) => node?.frontmatter?.team?.some((teamName) => teamName === team))
        .sort((l, r) => (l.frontmatter.teamLead ? -1 : r.frontmatter.teamLead ? 1 : 0))
    const teamLength = teamMembers?.length
    if (!teamMembers || !teamLength) return null
    const pineapplePercentage =
        teamLength &&
        teamLength > 0 &&
        Math.round(
            (teamMembers.filter(({ frontmatter: { pineappleOnPizza } }) => pineappleOnPizza).length / teamLength) * 100
        )
    const teamURL = `/handbook/small-teams/${team.toLowerCase()}`
    return (
        <div id="roadmap">
            <SectionWrapper>
                <div className="mt-8 flex items-start md:space-y-0 space-y-4 md:space-x-8 md:flex-row flex-col">
                    <div className="flex-1">
                        <h3 className="m-0">Roadmap</h3>
                        <p className="">
                            <span dangerouslySetInnerHTML={{ __html: subtitle }} />
                        </p>
                        <TeamRoadmap team={team} />
                    </div>
                    <div className="basis-[350px]">
                        <h4 className="m-0">The {team.toLowerCase()} team</h4>

                        <p className="text-sm mb-2">Here are the people bringing you {team.toLowerCase()}. </p>

                        <p className="text-xs mb-4 opacity-75">
                            (
                            {pineapplePercentage > 50
                                ? '<strong>' +
                                  pineapplePercentage +
                                  '%</strong> of this team prefer pineapple on pizza. As it should be.'
                                : pineapplePercentage == 50
                                ? 'This team is split even if pineapple belongs on pizza.'
                                : 'Shockingly, only ' + pineapplePercentage + '% of them prefer pineapple on pizza.'}
                            )
                        </p>
                        <ul className="list-none m-0 mb-4 p-0 space-y-2 md:space-y-0">
                            {teamMembers.map((member) => {
                                const { name, headshot, jobTitle, teamLead, country } = member?.frontmatter
                                return (
                                    <li className="flex space-x-2 items-center py-1" key={name}>
                                        <figure className="mb-0">
                                            <ContributorImage
                                                className="w-[45px] h-[45px]"
                                                image={getImage(headshot)}
                                            />
                                        </figure>
                                        <div>
                                            <span className="flex items-center md:flex-row space-x-2">
                                                <p className="text-base font-bold m-0 leading-none">{name}</p>
                                                {country && (
                                                    <span className="!leading-none">
                                                        {country === 'world' ? (
                                                            '🌎'
                                                        ) : (
                                                            <ReactCountryFlag svg countryCode={country} />
                                                        )}
                                                    </span>
                                                )}
                                                {teamLead && (
                                                    <span className="inline-block border-2 border-red/50 rounded-sm text-[12px] px-2 py-1 !leading-none font-semibold text-red bg-white">
                                                        Team lead
                                                    </span>
                                                )}
                                            </span>
                                            <p className="!text-sm !mb-0 opacity-50 !leading-none !mt-1">{jobTitle}</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>

                        <CallToAction size="sm" to={teamURL} type="outline">
                            Learn more about this team
                        </CallToAction>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    )
}

export const CTA = ({ title, subtitle, image }) => {
    const gatsbyImage = image && getImage(image)
    return (
        <SectionWrapper>
            <div className="flex md:space-y-0 space-y-4 md:flex-row flex-col md:space-x-4 justify-between p-12 bg-gray-accent-light rounded-lg md:items-center">
                <div>
                    <h2 className="m-0">{title}</h2>
                    <p className="m-0 mb-6">{subtitle}</p>
                    <CallToAction to="https://app.posthog.com/signup">Get started - free</CallToAction>
                </div>
                <div className="md:max-w-[400px]">
                    <GatsbyImage alt={title} image={gatsbyImage} />
                </div>
            </div>
        </SectionWrapper>
    )
}

interface IFeature {
    title: string
    description: string
}

interface IProps {
    title: string
    children: React.ReactNode
    showNav?: boolean
    showFooter?: boolean
}

interface IMenuItem {
    title: string
    id: string
}

export const StickyNav = ({ menuItems }: { menuItems: IMenuItem[] }) => {
    const [activeItem, setActiveItem] = useState(menuItems[0].title)
    return (
        <div className="z-[9999999] sticky bottom-0 text-center mt-12 pb-2">
            <Menu>
                {({ open }) => (
                    <>
                        <Menu.Button className="px-4 py-2 bg-white rounded-md shadow-md font-semibold">
                            <div className="flex space-x-2 justify-center items-baseline">
                                <span>{activeItem}</span>
                                <span>
                                    <Chevron />
                                </span>
                            </div>
                        </Menu.Button>
                        <Menu.Items
                            static
                            as="ul"
                            className={`list-none m-0 bg-white p-4 rounded-md absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full shadow-md ${
                                open ? 'visible' : 'invisible'
                            }`}
                        >
                            {menuItems.map(({ title, id }) => {
                                return (
                                    <Menu.Item key={id} as="li" className="cursor-pointer mt-3 first:mt-0">
                                        {({ active, close }) => {
                                            return (
                                                <ScrollLink
                                                    onClick={() => {
                                                        close()
                                                        setActiveItem(title)
                                                    }}
                                                    offset={-50}
                                                    spy
                                                    smooth
                                                    onSetActive={() => setActiveItem(title)}
                                                    to={id}
                                                    className={`py-2 px-4 rounded-md font-semibold transition-all text-black hover:text-black ${
                                                        activeItem === title ? 'bg-gray-accent-light/80' : ''
                                                    } ${active ? 'bg-gray-accent-light/40' : ''}`}
                                                >
                                                    {title}
                                                </ScrollLink>
                                            )
                                        }}
                                    </Menu.Item>
                                )
                            })}
                        </Menu.Items>
                    </>
                )}
            </Menu>
        </div>
    )
}

const Nav = () => {
    const { pathname } = useLocation()
    const [activeStyles, setActiveStyles] = useState({})
    const activeItem = useRef(null)

    const setStyles = useCallback(() => {
        if (activeItem?.current) {
            const bounding = activeItem.current.getBoundingClientRect()
            setActiveStyles({ width: bounding?.width, left: activeItem.current.offsetLeft })
        }
    }, [])

    useEffect(() => {
        window.addEventListener('resize', setStyles)
        return () => {
            window.removeEventListener('resize', setStyles)
        }
    }, [])

    useEffect(() => {
        setStyles()
    }, [pathname])

    return (
        <nav className="relative z-10 -mx-5 overflow-x-auto">
            <div className="relative flex max-w-screen-2xl mx-auto md:border-b md:border-gray-accent-light md:border-dashed px-4 pb-2.5 md:pb-0">
                <ul className="list-none flex p-0 m-auto space-x-1 md:space-x-4  whitespace-nowrap">
                    {nav.map((navItem) => {
                        const { label, url, icon } = navItem
                        const active = pathname === url
                        return (
                            <li
                                ref={active ? activeItem : null}
                                id={`product-nav-${slugify(url, { lower: true })}`}
                                key={label}
                                className="first:ml-auto last:mr-auto"
                            >
                                <Link
                                    className={`flex space-x-2 items-center ${
                                        active
                                            ? '!text-red !font-bold'
                                            : '!text-primary/75 hover:border-gray-accent-light hover:bg-gray-accent-light'
                                    } px-3 py-1.5 mb-1.5 text-sm [font-variation-settings:_'wght'_700] whitespace-nowrap rounded relative hover:scale-[1.01] active:scale-[.99] tracking-[-.1px] group`}
                                    to={url}
                                >
                                    <span className={`text-black ${active ? 'opacity-100' : 'opacity-70'} `}>
                                        {icon}
                                    </span>
                                    <span>{label}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <div
                    style={activeStyles}
                    className="h-[3px] md:h-[2px] bg-red rounded-md absolute bottom-3 md:bottom-[-1px] z-10 transition-all duration-500"
                />
            </div>
        </nav>
    )
}

export const Hero = ({
    title,
    subtitle,
    image,
    mainCTA,
    pricingCTA,
}: {
    title: string
    subtitle: string
    image: {
        image: ImageDataLike
        width: number | string
        height: number | string
    }
    mainCTA: {
        title: string
        url: string
    }
    pricingCTA: {
        title: string
        url: string
    }
}) => {
    const gatsbyImage = image?.image && getImage(image?.image)
    const imageStyles = { maxWidth: image?.width || '56rem', maxHeight: image?.height || 'auto' }
    return (
        <>
            <div>
                <h1 id="overview" className="text-center text-5xl lg:text-6xl 2xl:text-7xl mb-0 mt-8 md:mt-14">
                    <span className="text-red">{title}?</span> <span className="inline-block">PostHog does that.</span>
                </h1>
                <p
                    className="text-center text-lg font-semibold text-black/70 mt-4"
                    dangerouslySetInnerHTML={{ __html: subtitle }}
                />
                {pricingCTA && mainCTA && (
                    <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-4 md:items-center justify-center">
                        <CallToAction to={mainCTA.url}>{mainCTA.title}</CallToAction>
                        <CallToAction type="secondary" to={pricingCTA.url}>
                            {pricingCTA.title}
                        </CallToAction>
                    </div>
                )}
            </div>
            {gatsbyImage && (
                <div
                    style={imageStyles}
                    className="leading-0 mx-auto mt-8 -mb-12 text-center relative after:absolute after:bottom-12 after:left-0 after:w-full after:content-[''] after:h-36 after:bg-gradient-to-b after:from-tan/0 after:via-tan/60 after:to-tan/100"
                >
                    <GatsbyImage alt={title} image={gatsbyImage} className="rounded-md shadow-xl" />
                </div>
            )}
        </>
    )
}

export default function ProductLayout({ title, children, showNav = true, showFooter = true }: IProps): JSX.Element {
    return (
        <div className="px-5 py-12">
            {showNav && <Nav />}
            <div>{children}</div>
            {showFooter && <Footer title={title} />}
        </div>
    )
}
