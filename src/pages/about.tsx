import { graphql } from 'gatsby'
import React from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import { YC } from 'components/About/v2/YC'
import { TLDR } from 'components/About/v2/TLDR'
import { LottieKendrick } from 'components/About/v2/LottieKendrick'
import { Letterhead } from 'components/About/v2/Letterhead'
import Logo from 'components/Logo'
import CloudinaryImage from 'components/CloudinaryImage'
import { PRODUCT_COUNT } from '../constants/index'
import { James, Plus, Tim } from 'components/Signatures'
import SEO from 'components/seo'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { shortcodes } from '../mdxGlobalComponents'
import Link from 'components/Link'
import { IconXNotTwitter } from 'components/OSIcons'

const ProductCount = () => <span>{PRODUCT_COUNT}+</span>

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
    YC,
    TLDR,
    LottieKendrick,
    HappyHog,
    Letterhead,
    Logo: () => <Logo noText className="inline-block" />,
    CloudinaryImage,
    ProductCount,
    // The signature components receive 'class' prop from MDX but need to convert to 'className'
    James: (props: any) => <James className={props.class || props.className} />,
    Tim: (props: any) => <Tim className={props.class || props.className} />,
    Plus: (props: any) => <Plus className={props.class || props.className} />,
}

interface AboutProps {
    data: { mdx: { body: string; frontmatter: { title: string } } }
}

export default function About({ data }: AboutProps) {
    const { activeTab, handleTabChange, createTabs } = useCompanyNavigation()

    // Create tabs using the shared hook
    const tabs = createTabs((tabValue, item) => (
        <div className="prose max-w-none">
            {tabValue === 'about' ? (
                <>
                    {/* @ts-expect-error - MDXProvider type issue with React 18 */}
                    <MDXProvider components={mdxComponents}>
                        <MDXRenderer>{data.mdx.body}</MDXRenderer>
                    </MDXProvider>
                </>
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
                    value={activeTab}
                    onValueChange={handleTabChange}
                    frame={false}
                    className="-mx-4 -mt-4 [&_div[data-state=active]]:border-t [&_div[data-state=active]]:border-t-primary [&_div[role=tablist]]:bg-accent [&_div[role=tablist]]:pt-0.5 [&_div[role=tablist]]:ml-0 [&_div[role=tablist]]:pl-1.5"
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
