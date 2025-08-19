import { graphql, navigate } from 'gatsby'
import React from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import { YC } from 'components/About/v2/YC'
import { TLDR } from 'components/About/v2/TLDR'
import { LottieAnimation } from 'components/About/v2/LottieAnimations'
import { Letterhead } from 'components/About/v2/Letterhead'
import Logo from 'components/Logo'
import CloudinaryImage from 'components/CloudinaryImage'
import { PRODUCT_COUNT, CUSTOMER_COUNT } from '../constants/index'
import { James, Plus, Tim } from 'components/Signatures'
import SEO from 'components/seo'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { shortcodes } from '../mdxGlobalComponents'
import Link from 'components/Link'
import { IconXNotTwitter } from 'components/OSIcons'
import { DifferentHighlights } from 'components/About/v2/DifferentHighlights'
import OSButton from 'components/OSButton'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

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
    Logo: () => <Logo noText className="inline-block" />,
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
    const { tabs, handleTabChange, tabContainerClassName, className } = useCompanyNavigation({
        value: '/about',
        content: (
            <div className="max-w-3xl mx-auto">
                <MDXProvider components={mdxComponents}>
                    <MDXRenderer>{data.mdx.body}</MDXRenderer>
                </MDXProvider>
            </div>
        ),
    })

    return (
        <>
            <SEO title="About PostHog" description="All about PostHog" image={`/images/og/product-analytics.jpg`} />
            <Editor
                maxWidth="full"
                // title="Company"
                // type="about"
                proseSize="base"
                bookmark={{
                    title: 'Company',
                    description: 'Learn about PostHog',
                }}
            >
                <OSTabs
                    tabs={tabs}
                    defaultValue="/about"
                    onValueChange={handleTabChange}
                    frame={false}
                    tabContainerClassName={tabContainerClassName}
                    tabContentClassName="px-4 @xl:px-8"
                    className={className}
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
