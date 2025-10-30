export const platformFeatures = {
    deployment: {
        description: 'Options for how and where you deploy PostHog',
        features: {
            open_source: {
                name: 'Open-source',
                description: 'Fully open-source codebase',
            },
            self_host: {
                name: 'Self-host option',
                description: 'Deploy and run on your own infrastructure',
            },
        },
    },
    pricing: {
        description: 'Pricing model and transparency',
        features: {
            usage_based_pricing: {
                name: 'Usage-based pricing',
                description: 'Only pay for what you use',
            },
            transparent_pricing: {
                name: 'Transparent pricing',
                description: 'Clear, upfront pricing with no hidden fees',
            },
            free_tier: {
                name: 'Free tier',
                description: 'Generous free tier available',
            },
        },
    },
    support: {
        description: 'Support and services',
        features: {},
    },
    integrations: {
        description: 'Integrations with other tools and workflows',
        features: {
            ci_cd_integrations: {
                name: 'Integrations (CI/CD, issue tracking)',
                description: 'Connect with development tools and workflows',
            },
        },
    },
    analytics_integration: {
        description: 'Analytics features available platform-wide',
        features: {
            built_in_analytics: {
                name: 'Built-in product analytics',
                description: 'Combine error tracking with product analytics data',
            },
        },
    },
}
