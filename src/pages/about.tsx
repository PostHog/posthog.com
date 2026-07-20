import { graphql } from 'gatsby'
import React from 'react'
import Editor from 'components/Editor'
import { YC } from 'components/About/v2/YC'
import { TLDR } from 'components/About/v2/TLDR'
import { LottieAnimation } from 'components/About/v2/LottieAnimations'
import { Letterhead } from 'components/About/v2/Letterhead'
import Logo from 'components/Logo'
import CloudinaryImage from 'components/CloudinaryImage'
import { PRODUCT_COUNT, CUSTOMER_COUNT } from '../constants/index'
import { James, Plus, Tim } from 'components/Signatures'
import SEO from 'components/seo'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { shortcodes } from '../mdxGlobalComponents'
import Link from 'components/Link'
import { IconXNotTwitter } from 'components/OSIcons'
import { DifferentHighlights } from 'components/About/v2/DifferentHighlights'
import OSButton from 'components/OSButton'
const ProductCount = () => <span>{PRODUCT_COUNT}+</span>
const CustomerCount = () => <span>{CUSTOMER_COUNT}+</span>

const HappyHog = () => (
    <img
        src="https://res.cloudinary.com/dmukukwp6/image/upload/happy_hog_ebc59e4658.png"
        alt="happy hog"
        className="float-right max-w-[400px] max-h-48 -mt-2 -mr-2"
    />
)

// MDX components for MDXProvider
const mdxComponents = {
    ...shortcodes, // Include global MDX components first
    // Custom components for this page (override any from shortcodes if needed)
    OSButton,
    YC,
    TLDR,
    LottieAnimation,
    DifferentHighlights,
    HappyHog,
    Letterhead,
    Logo: () => <Logo wordmark={false} className="inline-block" />,
    CloudinaryImage,
    ProductCount,
    CustomerCount,
    // The signature components receive 'class' prop from MDX but need to convert to 'className'
    James: (props: any) => <James className={props.class || props.className} />,
    Tim: (props: any) => <Tim className={props.class || props.className} />,
    Plus: (props: any) => <Plus className={props.class || props.className} />,
}

interface AboutProps {
    data: { mdx: { body: string; frontmatter: { title: string } } }
}

export default function About({ data }: AboutProps) {
    return (
        <>
            <SEO title="About PostHog" description="All about PostHog" image={`/images/og/default.png`} />
            <Editor
                maxWidth="100%"
                hasPadding={false}
                proseSize="base"
                bookmark={{
                    title: 'Company',
                    description: 'Learn about PostHog',
                }}
            >
                <div className="min-h-full px-4 @xl:px-8 py-4">
                    <div className="max-w-3xl mx-auto pb-12">
                        <MDXProvider components={mdxComponents}>
                            <MDXRenderer>{data.mdx.body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                </div>
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
