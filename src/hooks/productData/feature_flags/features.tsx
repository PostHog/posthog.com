import React from 'react'
import {
    IconToggle,
    IconCode,
    IconPeople,
    IconBolt,
    IconTarget,
    IconFlask,
    IconGear,
    IconBell,
    IconPlug,
    IconRocket,
} from '@posthog/icons'
import CodeBlock from 'components/Home/CodeBlock'
import Link from 'components/Link'
import MCPInstall from 'components/Products/MCPInstall'

export const features = {
    boolean_multivariate: {
        title: 'Boolean & multivariate feature flags',
        headline: 'Boolean & multivariate feature flags',
        description: 'Test or release different versions of a feature with as many variants as you need.',
        icon: <IconToggle />,
        color: 'seagreen',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/multivariate.png',
                alt: 'Multivariate feature flags',
                stylize: true,
                shadow: true,
            },
        ],
    },
    payloads: {
        title: 'Test changes without pushing code',
        headline: 'Test changes without pushing code',
        description: (
            <>
                JSON payloads let you change text, visuals, or entire blocks of code directly from within PostHog – no
                code deployments needed with <code>getFeatureFlagResult()</code> – or server-side with{' '}
                <Link
                    to="/docs/feature-flags/remote-config"
                    className="font-bold underline"
                    state={{ newWindow: true }}
                >
                    remote config
                </Link>
                .
            </>
        ),
        icon: <IconCode />,
        color: 'blue',
        children: (
            <div className="grid grid-cols-12 gap-x-8 gap-y-4 -mt-4">
                <div className="col-span-12">
                    <h4 className="text-xl mb-1">Feature flag payload</h4>
                    <p className="text-lg">
                        Enter the payload in the feature flag's settings (inside PostHog) as a value or an object.
                    </p>
                    <CodeBlock code={`{"title": "Test headline", "subtitle": "Test description"}`} language="js" />
                </div>
                <div className="col-span-7">
                    <h4 className="text-xl">Your code</h4>
                    <CodeBlock
                        code={`<h1>Default headline</h1>
<h2>Default description</h2>`}
                        language="html"
                    />
                    <CodeBlock
                        code={`posthog.onFeatureFlags(function () {
  if (posthog.isFeatureEnabled('headline-change')) {
    const swapText = posthog.getFeatureFlagResult('headline-change')?.payload;
    document.querySelector('h1').textContent = swapText.title;
    document.querySelector('h2').textContent = swapText.subtitle;
  }
});`}
                        language="js"
                    />
                </div>
                <div className="col-span-5">
                    <h4 className="text-xl">Output</h4>
                    <CodeBlock
                        code={`<h1>Test headline</h1>
<h2>Test description</h2>`}
                        language="html"
                    />
                    <p className="text-lg">
                        Serve any sort of changes from the payload like text or colors, or trigger functions.
                    </p>
                </div>
            </div>
        ),
    },
    release_conditions: {
        title: 'Release conditions',
        headline: 'Release conditions',
        description: 'Customize your rollout strategy by user or group properties, cohort, or traffic percentage.',
        icon: <IconTarget />,
        color: 'yellow',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/release-conditions.png',
                alt: 'Release conditions',
                stylize: true,
                shadow: true,
            },
        ],
    },
    local_evaluation: {
        title: 'Local evaluation',
        headline: 'Local evaluation',
        description: "Improve speed by caching a flag's value on initial load. Or use the API to build your own UI.",
        icon: <IconBolt />,
        color: 'purple',
        children: (
            <>
                <h4 className="text-xl mb-1">
                    Use a single API request to get feature flag definitions and match your users locally.
                </h4>
                <p className="text-lg">The following will make an API request if the data is not already cached.</p>
                <CodeBlock
                    code={`await client.getAllFlags('distinct id', {
  groups: {},
  personProperties: { is_authorized: True },
  groupProperties: {},
});`}
                    language="js"
                />
            </>
        ),
    },
    bootstrapping: {
        title: 'Bootstrapping',
        headline: 'Bootstrapping',
        description:
            'Bootstrap flags on initialization so all flags are available immediately on page load – without having to make extra network requests.',
        icon: <IconRocket />,
        color: 'blue',
        children: (
            <div className="">
                <h4 className="text-xl mb-1">
                    Make feature flags available at initialization without waiting for a response from PostHog.
                </h4>
                <p className="text-lg">
                    This is useful for redirecting to another page based on feature flag or showing variants instantly.
                </p>
                <CodeBlock
                    code={`posthog.init('<ph_project_token>', {
  api_host: '<ph_client_api_host>',
  defaults: '<ph_posthog_js_defaults>',
  bootstrap: {
    distinctID: 'your-anonymous-id',
    featureFlags: {
      'flag-1': true,
      'variant-flag': 'control',
      'other-flag': false,
    },
  },
});
`}
                    language="js"
                />
            </div>
        ),
    },
    testing: {
        title: 'Testing & diagnostics',
        headline: 'Flag testing & diagnostics',
        description: 'There are a few ways to test flags and make sure your flags are working as expected.',
        icon: <IconFlask />,
        color: 'orange',
        children: (
            <div className="-mt-5">
                <h4 className="text-xl mb-1">1. Assign a specific value to a user</h4>
                <p className="text-lg">
                    Set release conditions to match your email or other user-identifiable properties.
                </p>

                <h4 className="text-xl mb-1">2. Flag overrides</h4>
                <p className="text-lg">
                    When developing locally, you can set a flag's value in your browser's console.
                </p>
                <CodeBlock
                    code={`posthog.featureFlags.overrideFeatureFlags({ flags: {"myFlag": "test"}})`}
                    language="js"
                />
                <p className="text-lg">
                    This will persist until you call override again with the argument <code>false</code>.
                </p>
                <CodeBlock code={`posthog.featureFlags.overrideFeatureFlags(false)`} language="js" />

                <h4 className="text-xl mb-1">3. PostHog toolbar</h4>
                <p className="text-lg">
                    Fire up the{' '}
                    <Link to="/toolbar" state={{ newWindow: true }}>
                        PostHog toolbar
                    </Link>{' '}
                    to toggle the status of any feature flag while on any page of your site.
                </p>
            </div>
        ),
    },
    automation: {
        title: 'Developer-friendly automation',
        headline: 'Developer-friendly automation',
        description: (
            <>
                <Link
                    to="/docs/feature-flags/scheduled-flag-changes"
                    className="font-bold underline"
                    state={{ newWindow: true }}
                >
                    Schedule flag changes.
                </Link>{' '}
                Get automated usage reports, IP address resolution (for location-based targeting), and recall person
                properties to avoid passing them manually every time.
            </>
        ),
        icon: <IconGear />,
        color: 'green',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/reports.png',
                alt: 'Developer-friendly automation',
                stylize: true,
                shadow: true,
            },
        ],
    },
    early_access: {
        title: 'Early access feature opt-in widget',
        headline: 'Early access feature opt-in widget',
        description: 'Allow users to opt in to (or out of) specified features. Or use the API to build your own UI.',
        icon: <IconBell />,
        color: 'salmon',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/early-access.png',
                alt: 'Early access feature opt-in widget',
                stylize: true,
                shadow: true,
            },
        ],
    },
    more_features: {
        title: 'More features',
        headline: 'More features',
        icon: <IconPeople />,
        color: 'blue',
        features: [
            {
                title: 'Persist flags across authentication',
                description:
                    "Persist feature flags across authentication events so that flag values don't change when an anonymous user logs in and becomes identified.",
            },
            {
                title: 'History & activity feed',
                description: "See who hit a feature flag, the flag's value, and which page they were on",
            },
            {
                title: 'Instant rollbacks',
                description: 'Disable a feature without touching your codebase',
            },
            {
                title: 'Persist flags across authentication steps',
                description: 'Make sure users have a consistent experience after login',
            },
            {
                title: 'Flag administration',
                description: 'See the history of a feature flag or control who can modify flags with user roles',
            },
            {
                title: 'SDKs or API',
                description: 'Copy code snippets for your library of choice, or implement yourself with the API',
            },
            {
                title: 'Multi-environment support',
                description:
                    'Test flags in local development or staging by using the same flag key across PostHog projects',
            },
        ],
    },
    mcp: {
        title: 'MCP',
        headline: 'Manage flags from your editor',
        description:
            'Create flags, configure targeting rules, and check rollout status from Cursor, Claude Code, VS Code, or any MCP-compatible agent.',
        icon: <IconPlug />,
        color: 'blue',
        features: [
            {
                title: 'Create flags while building features',
                description:
                    'Create a new feature flag with rollout percentage, targeting rules, and optional multivariate variants.',
            },
            {
                title: 'Check flags before deploying',
                description: 'Get the full definition of flags, including filters, groups, and payloads.',
            },
            {
                title: 'Clean up stale flags',
                description:
                    'List all active/inactive feature flags in the current project and find dead code to remove.',
            },
            {
                title: 'Update rollout rules',
                description: "Update a flag's rollout percentage, targeting rules, or variants.",
            },
        ],
        children: <MCPInstall />,
    },
}
