import CodeBlock from 'components/Home/CodeBlock'
import React from 'react'

function Payloads() {
    return (
        <div className="-mt-5">
            <p className="leading-tight">
                <strong>
                    Turn <em>"this"</em> into <em>"that".</em>
                </strong>{' '}
                Test changes on your site without hard-coding the changes with <code>getFeatureFlagPayload()</code>.
            </p>
            <div className="flex flex-col lg:flex-row gap-x-6">
                <div className="flex-1">
                    <h4 className="text-lg">Feature flag payload</h4>
                    <p className="text-sm">
                        Enter the payload in the feature flag’s settings (inside PostHog) as a value or an object.
                    </p>
                    <CodeBlock code={`{"title": "Test headline", "subtitle": "Test description"}`} language="js" />
                    <h5 className="text-base">Your code</h5>
                    <CodeBlock
                        code={`<h1>Default headline</h1>
<h2>Default description</h2>`}
                        language="html"
                    />
                    <CodeBlock
                        code={`posthog.onFeatureFlags(function () {
  if (posthog.isFeatureEnabled('headline-change')) {
    const swapText = posthog.getFeatureFlagPayload('headline-change');
    document.querySelector('h1').textContent = swapText.title;
    document.querySelector('h2').textContent = swapText.subtitle;
  }
});`}
                        language="js"
                    />
                </div>
                <div className="shrink max-w-xs">
                    <h4 className="text-lg">Output</h4>
                    <p className="text-sm">
                        Serve any sort of changes from the payload like text or colors, or trigger functions.
                    </p>
                    <CodeBlock
                        code={`<h1>Test headline</h1>
<h2>Test description</h2>`}
                        language="html"
                    />
                </div>
            </div>
        </div>
    )
}

function Bootstrapping() {
    return (
        <div className="-mt-5">
            <p className="leading-tight">
                Make feature flags available at initialization without waiting for a response from PostHog - useful for
                redirecting to another page based on feature flag or showing variants instantly.
            </p>
            <CodeBlock
                code={`posthog.init('<ph_project_api_key>', {
  api_host: '<ph_client_api_host>',
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
    )
}

function LocalEvaluation() {
    return (
        <div className="-mt-5">
            <p className="leading-tight">
                Use a single API request to get feature flag definitions and match your users locally. The following
                will make an API request if the data is not already cached.
            </p>
            <CodeBlock
                code={`await client.getAllFlags('distinct id', {
  groups: {},
  personProperties: { is_authorized: True },
  groupProperties: {},
});`}
                language="js"
            />
        </div>
    )
}

function FlagOverrides() {
    return (
        <div className="-mt-5">
            <p className="leading-tight">
                When developing locally, you can set a flag's value in your browser’s console.
            </p>
            <CodeBlock code={`posthog.featureFlags.override({"myFlag": "test"})`} language="js" />
            <p className="leading-tight">
                This will persist until you call override again with the argument <code>false</code>.
            </p>
            <CodeBlock code={`posthog.featureFlags.override(false)`} language="js" />
        </div>
    )
}

export default [
    {
        title: 'Payloads',
        body: Payloads,
        bodyType: 'component',
        code: ['getFeatureFlagPayload()'],
    },
    {
        title: 'Bootstrapping',
        body: Bootstrapping,
        bodyType: 'component',
        code: ['bootstrap'],
    },
    {
        title: 'Local evaluation',
        body: LocalEvaluation,
        bodyType: 'component',
        code: ['getAllFlags'],
    },
    {
        title: 'Test features locally',
        body: FlagOverrides,
        bodyType: 'component',
        code: ['override'],
    },
]
