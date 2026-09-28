import React, { useRef } from 'react'
import { useLocation } from '@reach/router'

import { IconBook, IconPlay } from '@posthog/icons'
import { HedgehogCursorHog, HedgehogReading } from '@posthog/brand/hoggies'

import Card from 'components/Card'
import { ProductSwitcher, buildProductMenuTabs, surfaceBasePath } from 'components/Products/ReaderViewProduct'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import useProduct from 'hooks/useProduct'

import LearnSurface from './LearnSurface'

interface LearnPageProps {
    /** `handle` from `src/hooks/productData/*`, e.g. `ai_observability`. */
    productHandle: string
    /** Chapter slug from the route; omitted on the index. */
    chapter?: string
    title: string
    description: string
    interactiveLearningUrl?: string
}

function LearnLanding({
    productName,
    description,
    pocketGuideUrl,
    interactiveLearningUrl,
}: {
    productName: string
    description: string
    pocketGuideUrl: string
    interactiveLearningUrl: string
}): JSX.Element {
    return (
        <section className="mx-auto flex w-full max-w-4xl flex-col pb-8 @xl/reader-content:pb-12">
            <div className="max-w-2xl">
                <h1 className="m-0 text-3xl font-bold tracking-tight @xl/reader-content:text-4xl">
                    Learn {productName}
                </h1>
                <p className="mb-0 mt-3 text-base text-secondary @xl/reader-content:text-lg">
                    Choose your path: follow a story or explore in a playground.
                </p>
            </div>

            <div className="not-prose mt-8 grid gap-6 md:grid-cols-2">
                <Card
                    url={pocketGuideUrl}
                    className="flex h-full flex-col border border-primary bg-primary text-primary no-underline dark:border-dark dark:bg-accent-dark"
                >
                    <div
                        key="preview"
                        className="flex h-48 items-center justify-center border-b border-primary bg-accent p-4 dark:border-dark dark:bg-accent-dark @xl/reader-content:h-56"
                    >
                        <HedgehogReading size={180} aria-hidden="true" className="max-h-full max-w-full" />
                    </div>
                    <div key="content" className="flex flex-1 flex-col p-5">
                        <div className="flex items-center gap-2">
                            <IconBook className="size-5 shrink-0 text-blue" />
                            <h2 className="m-0 text-xl font-bold">Learn through a story</h2>
                        </div>
                        <p className="mb-5 mt-2 text-base text-secondary">{description}</p>
                        <span className="mt-auto font-semibold">Start reading →</span>
                    </div>
                </Card>

                <Card
                    url={interactiveLearningUrl}
                    className="flex h-full flex-col border border-primary bg-primary text-primary no-underline dark:border-dark dark:bg-accent-dark"
                >
                    <div
                        key="preview"
                        className="flex h-48 items-center justify-center border-b border-primary bg-accent p-4 dark:border-dark dark:bg-accent-dark @xl/reader-content:h-56"
                    >
                        <HedgehogCursorHog
                            size={180}
                            aria-hidden="true"
                            className="max-h-full max-w-full [&>path:first-child]:hidden"
                        />
                    </div>
                    <div key="content" className="flex flex-1 flex-col p-5">
                        <div className="flex items-center gap-2">
                            <IconPlay className="size-5 shrink-0 text-orange" />
                            <h2 className="m-0 text-xl font-bold">Learn by doing</h2>
                        </div>
                        <p className="mb-5 mt-2 text-base text-secondary">
                            Explore a product, inspect its PostHog instrumentation, and test and break things.
                        </p>
                        <span className="mt-auto font-semibold">Try PostHog interactively ↗</span>
                    </div>
                </Card>
            </div>
        </section>
    )
}

/** Page shell shared by the index and per-chapter routes. */
export default function LearnPage({
    productHandle,
    chapter,
    title,
    description,
    interactiveLearningUrl,
}: LearnPageProps): JSX.Element {
    const productData = useProduct({ handle: productHandle }) as any
    const contentRef = useRef<HTMLElement>(null)
    const location = useLocation()
    const volumeId = productData?.pocketGuideVolume
    const landingInteractiveLearningUrl = !chapter && volumeId ? interactiveLearningUrl : undefined
    const isLearnLanding = Boolean(landingInteractiveLearningUrl)
    const productMenuTabs = buildProductMenuTabs({
        productData,
        contentRef,
        activeSurface: 'learn',
        currentPath: location?.pathname,
    })
    const menuTabs = isLearnLanding
        ? productMenuTabs.map((tab) => (tab.value === 'learn' ? { ...tab, menu: null } : tab))
        : productMenuTabs

    return (
        <>
            <SEO title={title} description={description} image="/images/og/default.png" />
            <ReaderView
                // The book carries its own structure; a second contents column competes.
                hideRightSidebar
                hideTitle
                showQuestions={false}
                menuTabs={menuTabs}
                productSelect={<ProductSwitcher activeHandle={productHandle} />}
            >
                <article ref={contentRef}>
                    {landingInteractiveLearningUrl ? (
                        <LearnLanding
                            productName={productData.name}
                            description={description}
                            pocketGuideUrl={`${surfaceBasePath(productData.slug, 'learn')}/introduction`}
                            interactiveLearningUrl={landingInteractiveLearningUrl}
                        />
                    ) : volumeId ? (
                        <LearnSurface
                            volumeId={volumeId}
                            chapter={chapter}
                            basePath={surfaceBasePath(productData.slug, 'learn')}
                        />
                    ) : null}
                </article>
            </ReaderView>
        </>
    )
}
