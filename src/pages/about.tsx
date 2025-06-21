import { graphql } from 'gatsby'
import React from 'react'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { companyMenu } from '../navs'
import { YC } from 'components/About/v2/YC'
import { TLDR } from 'components/About/v2/TLDR'
import Logo from 'components/Logo'
import { shortcodes } from '../mdxGlobalComponents'
import { Blockquote } from 'components/BlockQuote'
import { MdxCodeBlock } from 'components/CodeBlock'
import { Heading } from 'components/Heading'
import { InlineCode } from 'components/InlineCode'
import { ZoomImage } from 'components/ZoomImage'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import { PRODUCT_COUNT } from '../constants/index'
import { James, Plus, Tim } from 'components/Signatures'
import SEO from 'components/seo'

const ProductCount = () => <span>{PRODUCT_COUNT}+</span>

const HappyHog = () => (
    <img
        src="https://res.cloudinary.com/dmukukwp6/image/upload/happy_hog_ebc59e4658.png"
        alt="happy hog"
        className="float-right max-w-[400px] max-h-48 -mt-2 -mr-2"
    />
)

const A = (props: any) => <Link {...props} className="text-red hover:text-red font-semibold" />

export default function About({ data }: { data: { mdx: { body: string } } }) {
    const components = {
        HappyHog,
        Logo: () => <Logo noText className="inline-block" />,
        YC,
        TLDR,
        James,
        Tim,
        Plus,
        CloudinaryImage,
        ProductCount,
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: MdxCodeBlock,
        h1: (props: any) => Heading({ as: 'h1', ...props }),
        h2: (props: any) => Heading({ as: 'h2', ...props }),
        h3: (props: any) => Heading({ as: 'h3', ...props }),
        h4: (props: any) => Heading({ as: 'h4', ...props }),
        h5: (props: any) => Heading({ as: 'h5', ...props }),
        h6: (props: any) => Heading({ as: 'h6', ...props }),
        img: ZoomImage,
        a: A,
        ...shortcodes,
    }

    return (
        <>
            <SEO title="About PostHog" description="All about PostHog" image={`/images/og/product-analytics.jpg`} />
            <ReaderView
                body={{ type: 'mdx', content: data.mdx.body }}
                leftSidebar={<TreeMenu items={companyMenu.children.map((child) => ({ ...child, children: [] }))} />}
                mdxComponents={components}
            />
        </>
    )
}

export const query = graphql`
    {
        mdx(fields: { slug: { eq: "/about" } }) {
            body
        }
    }
`
