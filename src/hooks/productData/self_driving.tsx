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
        marks: [3000, 10000, 50000, 100000],
        min: 3000,
        max: 100000,
    },
    volume: 3000,
    customPricingContent: (
        <div data-scheme="secondary" className="prose prose-sm text-lg mt-8 mb-12 leading-normal text-primary">
            <h3 className="text-xl font-bold text-primary mb-4">How credits work</h3>
            <p>
                Self-Driving credits meter the autonomous work completed for your organization. Billing uses the
                reported credit total for the month, so more complex investigations and generated changes can consume
                more credits than simpler tasks.
            </p>
            <p>Credits use the same convention as PostHog AI: 100 credits cost $1 after the monthly free allowance.</p>
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
