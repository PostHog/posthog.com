import React from 'react'

export default function TwigIntroductionFigure(): JSX.Element {
    return (
        <figure className="not-prose my-6 overflow-hidden rounded border border-primary bg-primary">
            <img
                src="/pocket-guides/posthog/twig-home.webp"
                alt="Twig's homepage, showing its vacation rental introduction, example trip request, and cliff illustration"
                className="block h-auto w-full"
                loading="lazy"
                width="1300"
                height="675"
            />
            <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-primary px-4 py-3 text-sm">
                <span className="text-secondary">A glimpse of Twig</span>
                <a
                    href="https://twig.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-rounded font-semibold text-primary underline decoration-orange underline-offset-4 hover:text-orange"
                >
                    Explore Twig <span aria-hidden="true">↗</span>
                </a>
            </figcaption>
        </figure>
    )
}
