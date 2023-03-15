import Link from 'components/Link'
import SEO from 'components/seo'
import React from 'react'
import { SessionRecording, FeatureFlags, AbTesting } from 'components/ProductIcons'
import Layout from 'components/Layout'
import { BusinessModel } from 'components/NotProductIcons'

const nav = [
    {
        label: 'Product analytics',
        url: '/product-analytics',
        icon: <SessionRecording className="w-5" />,
    },
    {
        label: 'Session recording',
        url: '/session-recording',
        icon: <SessionRecording className="w-5" />,
    },
    {
        label: 'Feature flags',
        url: '/feature-flags',
        icon: <FeatureFlags className="w-5" />,
    },
    {
        label: 'A/B testing',
        url: 'ab-testing',
        icon: <AbTesting className="w-5" />,
    },
    {
        label: 'CDP',
        url: '/cdp',
        icon: <SessionRecording className="w-5" />,
    },
]

const getTailwindGridCol = (length: number) => `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${length}`

export const FeatureGrid = ({ children, className = '' }: { children: React.ReactNode[]; className?: string }) => {
    const length = children?.length ?? 1
    return (
        <ul
            className={`grid list-none m-0 max-w-screen-2xl mx-auto border-l border-gray-accent-light border-dashed  ${getTailwindGridCol(
                length
            )} ${className}`}
        >
            {children}
        </ul>
    )
}

export const FeatureTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <h3 className={`text-base m-0 ${className}`}>{children}</h3>
)

export const FeatureDescription = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <p className={`m-0 text-sm ${className}`}>{children}</p>
)

interface IFeature {
    title: string
    description: string
    icon?: React.ReactNode
}

export const Feature = ({ title, description, icon }: IFeature) => {
    return (
        <li className="p-6 pb-8 border-r border-gray-accent-light border-dashed">
            <BusinessModel className="w-5 h-5 mb-2" />
            <FeatureTitle>{title}</FeatureTitle>
            <FeatureDescription>{description}</FeatureDescription>
        </li>
    )
}

export const FeatureList = ({ features }: { features: { title: string; description: string }[] }) => {
    return (
        <ul className="list-none m-0 p-0 space-y-4">
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

export const SectionHeading = ({ title, subtitle }: { title: string; subtitle: string }) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl m-0">{title}</h2>
            <p className="text-base m-0">{subtitle}</p>
        </div>
    )
}

interface ITestimonial {
    featuresUsed: string[]
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

export const Testimonial = ({ featuresUsed, author, quote }: ITestimonial) => {
    return (
        <div>
            <img className="text-black max-w-[200px]" src={author.company.image} />
            <p className="my-6">{quote}</p>
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
    )
}

export const TwoCol = ({ children, className = '' }: { children: React.ReactNode[]; className?: string }) => {
    return (
        <div className={`grid grid-cols-2 gap-x-6 ${className}`}>
            <div>{children[0]}</div>
            <div>{children[1]}</div>
        </div>
    )
}

export const PairsWith = ({ products }: { products: IFeature[] }) => {
    return (
        <div>
            <h2 className="text-center">Pairs with...</h2>
            <p className="text-center">PostHog products are natively designed to be interoperable.</p>
            <FeatureGrid>
                {products.map((product) => {
                    const { title, description } = product
                    return <Feature key={title} title={title} description={description} />
                })}
            </FeatureGrid>
        </div>
    )
}

export const Section = ({
    children,
    className = 'max-w-screen-2xl',
    border = false,
    borderPadding = true,
}: {
    children: React.ReactNode
    className?: string
    border?: boolean
    borderPadding?: boolean
}) => {
    return (
        <div
            className={`${
                border ? `${borderPadding ? 'py-14' : ''} border-y border-gray-accent-light border-dashed` : ''
            } my-14`}
        >
            <section className={`mx-auto ${className}`}>{children}</section>
        </div>
    )
}

interface IFeature {
    title: string
    description: string
}

interface IProps {
    title: string
    description: string | React.ReactNode
    image: React.ReactNode
    children: React.ReactNode
}

export default function ProductLayout({ title, description, image, children }: IProps): JSX.Element {
    return (
        <div className="px-5 py-12">
            <nav className="border-b border-gray-accent-light border-dashed">
                <ul className="list-none m-0 flex items-center space-x-4 justify-center max-w-screen-2xl mx-auto">
                    {nav.map((navItem) => {
                        const { label, url, icon } = navItem
                        return (
                            <li key={label}>
                                <Link className="py-4 px-2 flex space-x-2 items-center !text-black" to={url}>
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <section>
                <h1 className="text-center text-5xl mb-0 mt-14">{title}? PostHog does that.</h1>
                <div className="text-center mt-4">{description}</div>
                <div className="max-w-screen-xl mx-auto my-14">{image}</div>
                <div>{children}</div>
            </section>
        </div>
    )
}
