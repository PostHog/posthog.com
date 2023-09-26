import { ImageDataLike } from 'gatsby-plugin-image'

export interface IMenuItem {
    title: string
    id: string
}

export interface IProps {
    title: string
    children: React.ReactNode
    showNav?: boolean
    showFooter?: boolean
}

export interface ISectionWrapper {
    children: React.ReactNode
    className?: string
}

export interface ICTA {
    title: string
    subtitle: string
    image: ImageDataLike
    mainCTA: {
        title: string
        url: string
    }
    pricingCTA: {
        title: string
        url: string
    }
}

export interface IRoadmap {
    subtitle: string
    team: any
}

export interface IBlogPosts {
    title: string
    posts: any
}

export interface IComparison {
    description: string
    children: React.ReactNode
}

export interface IFooter {
    title: string
}

export interface IPairGridProps {
    features: IFeature[]
    className?: string
}

export interface IPairItem {
    title: string
    description: string
    icon?: React.ReactNode
    url?: string
    className?: string
}

export interface IFeature {
    title: string
    description: string
    icon?: React.ReactNode
    className?: string
}

export interface ITwoCol {
    children: React.ReactNode[]
    className?: string
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

export interface IMarquee {
    text: string
    url: string
}

export interface ISection {
    title?: string
    subtitle?: string
    features?: IFeature[]
    image?: ImageDataLike
    hideImage?: boolean
    content?: string
    align?: string
    sections?: ISection[]
    imageFrame?: boolean
    className?: string
    marquee?: IMarquee[]
    callout?: {
        content: string
        cta: {
            label: string
            url: string
        }
    }
}

export interface ISectionHeading {
    title?: string
    subtitle?: string | React.ReactNode
}

export interface IDocumentation {
    documentation: any
    title: string
    image?: ImageDataLike
    tutorials: any
}

export interface IFeatureGridProps {
    features: IFeature[]
    className?: string
}
