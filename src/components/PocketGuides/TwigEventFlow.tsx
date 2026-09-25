import React, { useState } from 'react'
import PostHogEventInspector from './PostHogEventInspector'
import TwigBrowseFigure from './TwigBrowseFigure'

export default function TwigEventFlow({
    recorded,
    mismatch = false,
}: {
    recorded?: string
    mismatch?: boolean
}): JSX.Element {
    const [clicked, setClicked] = useState('Coast')
    return (
        <div className="twig-click-demo @container">
            <div className="grid gap-3">
                <div className="overflow-hidden rounded border border-primary bg-primary">
                    <TwigBrowseFigure
                        id={`guide-event-${recorded || 'bare'}`}
                        initialSetting="Coast"
                        onFilter={(setting) => setClicked(setting)}
                    />
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
                    clicked={clicked}
                    recorded={mismatch ? recorded : recorded === undefined ? undefined : clicked}
                    mismatch={mismatch && clicked !== recorded}
                    eventOnly={recorded === undefined}
                />
            </div>
        </div>
    )
}
