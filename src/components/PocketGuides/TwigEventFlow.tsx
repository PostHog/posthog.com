import React from 'react'
import PostHogEventInspector from './PostHogEventInspector'
import TwigBrowseStaysMockup from './TwigBrowseStaysMockup'
import './twigEventFlow.css'

export default function TwigEventFlow({
    recorded,
    mismatch = false,
}: {
    recorded?: string
    mismatch?: boolean
}): JSX.Element {
    return (
        <div className="twig-click-demo @container">
            <p className="sr-only">
                Animated example: a visitor changes Twig's stay filter from Forest to Coast. The PostHog inspector below
                shows the event associated with that click.
            </p>
            <div className="grid gap-3">
                <div className="overflow-hidden rounded border border-primary bg-primary">
                    <TwigBrowseStaysMockup selected="Coast" animated framed={false} />
                    <div className="flex justify-end border-t border-primary px-4 py-3 text-sm">
                        <a
                            href="https://twig.com/#twig-playground"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-rounded font-semibold text-primary underline decoration-orange underline-offset-4 hover:text-orange"
                        >
                            Explore Twig <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </div>
                <PostHogEventInspector
                    clicked="Coast"
                    recorded={recorded}
                    mismatch={mismatch}
                    eventOnly={recorded === undefined}
                />
            </div>
        </div>
    )
}
