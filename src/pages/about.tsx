import { graphql } from 'gatsby'
import React from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
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
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'

const ProductCount = () => <span>{PRODUCT_COUNT}+</span>

const HappyHog = () => (
    <img
        src="https://res.cloudinary.com/dmukukwp6/image/upload/happy_hog_ebc59e4658.png"
        alt="happy hog"
        className="float-right max-w-[400px] max-h-48 -mt-2 -mr-2"
    />
)

const A = (props: any) => <Link {...props} />

export default function About({ data }: { data: { mdx: { body: string; frontmatter: { title: string } } } }) {
    const { activeTab, handleTabChange, createTabs } = useCompanyNavigation()

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

    // Create tabs using the shared hook
    const tabs = createTabs((tabValue, item) => (
        <div className="prose prose-lg max-w-none">
            {tabValue === 'about' ? (
                <MDXRenderer components={components}>{data.mdx.body}</MDXRenderer>
            ) : (
                <div className="p-8 text-center text-muted">
                    <p>Loading {item.name} content...</p>
                    <p className="text-sm mt-2">This section will load dynamically based on the URL.</p>
                </div>
            )}
        </div>
    ))

    return (
        <>
            <SEO title="About PostHog" description="All about PostHog" image={`/images/og/product-analytics.jpg`} />
            <Editor
                title="Company"
                type="about"
                proseSize="base"
                bookmark={{
                    title: 'Company',
                    description: 'Learn about PostHog',
                }}
            >
                <OSTabs
                    tabs={tabs}
                    value={activeTab}
                    onValueChange={handleTabChange}
                    frame={false}
                    className="-mx-4 -mt-4"
                    triggerDataScheme="primary"
                />
            </Editor>
        </>
    )
}

export const query = graphql`
    {
        mdx(fields: { slug: { eq: "/about" } }) {
            body
            frontmatter {
                title
            }
        }
    }
`
