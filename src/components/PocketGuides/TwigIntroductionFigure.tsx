import React from 'react'
import ExploreTwigLink from './ExploreTwigLink'

export default function TwigIntroductionFigure(): JSX.Element {
    return (
        <figure className="not-prose my-6 mx-0 overflow-hidden rounded border border-primary bg-accent p-3 dark:bg-accent-dark @container @md:p-4">
            <div className="overflow-hidden rounded border border-primary">
                <img
                    src="/pocket-guides/posthog/twig-home.webp"
                    alt="Twig's homepage, showing its vacation rental introduction, example trip request, and cliff illustration"
                    className="block h-auto w-full"
                    loading="lazy"
                    width="1300"
                    height="675"
                />
            </div>
            <ExploreTwigLink href="https://twig.com" />
        </figure>
    )
}
