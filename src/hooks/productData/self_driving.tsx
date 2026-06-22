import React from 'react'
import { IconSparkles } from '@posthog/icons'

export const selfDriving = {
    name: 'Self-Driving',
    Icon: IconSparkles,
    description: 'Autonomous engineering work powered by your PostHog context',
    handle: 'self_driving',
    type: 'self_driving',
    slug: 'self-driving',
    color: 'blue',
    colorSecondary: 'lilac',
    category: 'automation',
    slider: {
        marks: [4500, 15000, 75000, 150000],
        min: 4500,
        max: 150000,
    },
    volume: 4500,
    customPricingContent: (
        <div data-scheme="secondary" className="prose prose-sm text-lg mt-8 mb-12 leading-normal text-primary">
            <h3 className="text-xl font-bold text-primary mb-4">How credits work</h3>
            <p>
                Your first 4,500 Self-Driving credits (worth $45) are free every month. After that, credits are $0.01
                each.
            </p>
            <p>
                Credits meter the autonomous work completed for your organization, so more complex investigations and
                generated changes can consume more credits than simpler tasks.
            </p>
        </div>
    ),
    seo: {
        title: 'Self-Driving – Autonomous engineering work in PostHog',
        description: 'Turn product context into reviewed engineering changes with Self-Driving.',
    },
    overview: {
        title: 'Turn product context into engineering work',
        description: 'Self-Driving investigates product context and turns it into concrete engineering changes.',
        textColor: 'text-white',
        layout: 'ai',
    },
}
