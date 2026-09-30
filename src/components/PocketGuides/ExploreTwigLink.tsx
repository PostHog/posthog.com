import React from 'react'

export default function ExploreTwigLink({
    href = 'https://twig.com/#twig-playground',
}: {
    href?: string
}): JSX.Element {
    return (
        <div className="mt-3 flex justify-end border-t border-primary pt-3 text-sm">
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-rounded font-semibold text-primary underline decoration-orange underline-offset-4 hover:text-orange"
            >
                Explore Twig <span aria-hidden="true">↗</span>
            </a>
        </div>
    )
}
