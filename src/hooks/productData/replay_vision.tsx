import React from 'react'
import { IconEye } from '@posthog/icons'

export const replayVision = {
    name: 'Replay Vision',
    Icon: IconEye,
    description: 'AI-powered session replay analysis that watches recordings for you',
    handle: 'replay_vision',
    type: 'replay_vision',
    color: 'yellow',
    colorSecondary: 'yellow',
    category: 'product_engineering',
    slug: 'replay-vision',
    slider: {
        // Values in credits. min doubles as the "first N credits free" copy, so it tracks the free allocation.
        marks: [2500, 10000, 50000, 100000],
        min: 2500,
        max: 100000,
    },
    volume: 2500,
    customPricingContent: (
        <div data-scheme="secondary" className="prose prose-sm text-lg mt-8 mb-12 leading-normal text-primary">
            <h3 className="text-xl font-bold text-primary mb-4">How credits work</h3>
            <p>
                You pay per observation. One observation is one session recording watched by one scanner, so the
                credits you use depend on how many sessions your scanners pick up.
            </p>
            <ul>
                <li>
                    <strong className="text-primary">An observation costs 2, 5, or 15 credits</strong> depending on
                    which model the scanner runs. You choose the model per scanner and see its price next to each
                    option.
                </li>
                <li>
                    <strong className="text-primary">1 credit is $0.01</strong>, so 100 credits cost $1. The first 2,500
                    credits each month are free, which covers 500 sessions on the default model.
                </li>
            </ul>
            <p>
                Before you turn a scanner on, PostHog estimates how many sessions it will match each month and what that
                costs. Set a billing limit if you want a hard cap on spend.
            </p>
        </div>
    ),
}
