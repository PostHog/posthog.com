import React from 'react'
import ReaderView from 'components/ReaderView'
import { SEO } from 'components/seo'
import { Section } from 'components/Section'
import { shortcodes } from '../mdxGlobalComponents'
import { Blockquote } from 'components/BlockQuote'
import { MdxCodeBlock } from 'components/CodeBlock'
import { Heading } from 'components/Heading'
import { InlineCode } from 'components/InlineCode'
import { ZoomImage } from 'components/ZoomImage'
import Link from 'components/Link'
import { MDXProvider } from '@mdx-js/react'
import { TreeMenu } from 'components/TreeMenu'
import TemplateCTAs from 'components/TemplateCTAs'
import BookPage from 'components/PocketGuides/BookPage'
import { volumeIdFromUrl } from 'components/PocketGuides/bookModel'
import { volumeById } from '../constants/pocketGuides'
import { MDXRenderer } from 'components/MDXRenderer'
import { ResponsiveImage } from 'components/Image'
import type { TemplateProps } from '../lib/content/templates'

const A = (props: any) => <Link {...props} />

export default function Template({ body, slug, title, description, template }: TemplateProps) {
    const components = {
        code: InlineCode,
        blockquote: Blockquote,
        pre: MdxCodeBlock,
        MultiLanguage: MdxCodeBlock,
        h1: (props: any) => Heading({ as: 'h1', ...props }),
        h2: (props: any) => Heading({ as: 'h2', ...props }),
        h3: (props: any) => Heading({ as: 'h3', ...props }),
        h4: (props: any) => Heading({ as: 'h4', ...props }),
        h5: (props: any) => Heading({ as: 'h5', ...props }),
        h6: (props: any) => Heading({ as: 'h6', ...props }),
        img: ZoomImage,
        a: A,
        ...shortcodes,
        Section,
    }

    // Every page of a pocket guide is an MDX file rendered into the book layout – the volume's
    // front matter, its chapters, and its use cases all take this branch.
    if (slug.startsWith('/pocket-guides/')) {
        return (
            <>
                <SEO
                    // Named for its own volume: the shelf holds more than one book.
                    title={`${title} – ${volumeById(volumeIdFromUrl(slug))?.title ?? 'PostHog'} pocket guide`}
                    description={description}
                    image="/images/og/default.png"
                />
                <BookPage slug={slug} body={body} />
            </>
        )
    }

    if (!template) return null
    const { featuredImage, filePath, type: templateType, menu } = template

    return (
        <>
            <SEO
                image={`/images/templates/${slug.split('/')[2]}.png`}
                title={`${title} template - PostHog`}
                description={description}
            />
            <ReaderView
                body={{
                    type: 'plain',
                }}
                title={title}
                filePath={filePath}
                leftSidebar={<TreeMenu items={menu} />}
                hideRightSidebar
                hideTitle
                showQuestions={false}
            >
                <div className="max-w-3xl mx-auto">
                    <h1 className="!mb-4">{title}</h1>
                    <div className="mb-4">
                        {featuredImage && <ResponsiveImage image={featuredImage} alt={title} className="rounded" />}
                    </div>
                    <MDXProvider components={components}>
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                    <div className="mb-12">
                        <TemplateCTAs
                            urls={{
                                primary:
                                    templateType === 'survey'
                                        ? `https://app.posthog.com/surveys/guided/new`
                                        : `https://app.posthog.com/dashboard?templateFilter=${title}#newDashboard`,
                                secondary:
                                    templateType === 'survey'
                                        ? `https://app.posthog.com/surveys/guided/new`
                                        : `https://app.posthog.com/dashboards`,
                            }}
                        />
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
