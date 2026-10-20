import React from 'react'
import { IconPlay } from '@posthog/icons'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import { TWIG_URL } from '../../constants'
import LearnPage from './LearnPage'

/** Heading and lead-in for the figure that follows it. */
export function SectionIntro({ title, children }: { title: string; children: React.ReactNode }): JSX.Element {
    return (
        <div className="mt-8 mb-4 border-t border-primary pt-8">
            <h3 className="mt-0 mb-2 text-lg font-bold">{title}</h3>
            <p className="m-0 leading-relaxed">{children}</p>
        </div>
    )
}

interface LivePlaygroundPageProps {
    /** `handle` from `src/hooks/productData/*`. */
    productHandle: string
    productName: string
    /** Line under the title. */
    subtitle: string
    /** Sections: `SectionIntro` followed by its figure. */
    children: React.ReactNode
}

/** A Learn hub page that introduces Twig.com and shows focused views of its instrumentation for one product. */
export default function LivePlaygroundPage({
    productHandle,
    productName,
    subtitle,
    children,
}: LivePlaygroundPageProps): JSX.Element {
    return (
        <LearnPage
            productHandle={productHandle}
            title={`Explore Twig: live playground for ${productName} – PostHog`}
            description="Explore Twig, a full, live website and interactive playground with PostHog already instrumented."
        >
            <div className="not-prose min-w-0">
                <div className="mb-3 flex items-center gap-3">
                    <IconPlay className="size-6 shrink-0 text-orange" />
                    <h1 className="m-0 text-2xl font-bold">Explore Twig: live playground for {productName}</h1>
                </div>
                <h2 className="mt-0 mb-4 text-base font-medium text-secondary">{subtitle}</h2>
                <p className="mt-0 mb-5 leading-relaxed">
                    <Link to={TWIG_URL} external>
                        Twig
                    </Link>{' '}
                    is a live vacation rental website with PostHog built in. It's a playground that turns real code and
                    instrumentation into hands-on labs, so you can learn by experimenting.
                </p>
                <OSButton asLink to={TWIG_URL} external variant="primary" size="md">
                    Explore Twig
                </OSButton>
                {children}
            </div>
        </LearnPage>
    )
}
