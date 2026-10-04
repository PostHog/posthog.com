import { MDXProvider } from '@mdx-js/react'
import { FeatureSnapshot } from 'components/FeatureSnapshot'
import Link from 'components/Link'
import { Hero } from 'components/Hero'
import { Check, Close } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import { Section } from 'components/Section'
import { SEO } from 'components/seo'
import TutorialsSlider from 'components/TutorialsSlider'
import TutorialsList from 'components/TutorialsList'
import React from 'react'
import { MdxCodeBlock } from '../components/CodeBlock'
import { shortcodes } from '../mdxGlobalComponents'
import { Tweet } from 'components/Tweet'
import ReaderView from 'components/ReaderView'
import { MDXRenderer } from 'components/MDXRenderer'
import type { PlainPage } from '../lib/content/plain'

const A = (props: React.ComponentProps<typeof Link>) => <Link {...props} />

export interface PlainProps {
    page: PlainPage
}

export default function Plain({ page }: PlainProps): JSX.Element {
    const { body, excerpt, title, featuredImage, showTitle, noindex, images, seo } = page
    const components = {
        pre: MdxCodeBlock,
        Hero,
        Section,
        FeatureSnapshot,
        Check,
        Close,
        a: A,
        TutorialsSlider,
        TutorialsList,
        // The shared MDX components, which also cover ProductScreenshot, ProductVideo, and similar.
        ...shortcodes,
    }

    return (
        <ReaderView hideLeftSidebar>
            <SEO
                title={seo?.metaTitle || title + ' - PostHog'}
                description={seo?.metaDescription || excerpt}
                article
                image={featuredImage ?? undefined}
                noindex={noindex}
            />
            <section className="py-12">
                {showTitle && <h1 className="text-center">{title}</h1>}
                <MDXProvider components={components}>
                    <MDXRenderer images={images}>{body}</MDXRenderer>
                </MDXProvider>
            </section>
        </ReaderView>
    )
}
