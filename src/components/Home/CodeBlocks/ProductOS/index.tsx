import CodeBlock from 'components/Home/CodeBlock'
import React from 'react'
import Link from 'components/Link'
import { IconLightBulb } from '@posthog/icons'

function TrackEvent() {
    return (
        <div className="-mt-5">
            <p className="leading-tight">
                Use the <code>capture</code> method to send custom events from your codebase. Use this data in PostHog
                for building cohorts, filtering insights, watching specific session replays, triggering feature flags,
                adding a user to an A/B test, and more.
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
                <div>
                    <h4 className="text-xl">Your code</h4>
                    <CodeBlock
                        code={`posthog.capture('Plan purchased', {
  price: 12.99,
  planId: 'XYZ12345',
  term: 'monthly',
  features: { // TIP: Attach properties to any event
      'Quality': 'HD',
      'Seats': 2,
      'Downloads': false,
  },
});`}
                        language="js"
                    />
                </div>
                <div>
                    <h4 className="text-xl">Available in PostHog</h4>
                    <CodeBlock
                        code={`"event": { 8 items
  "created_at": "2023-06-28T10:12:38.789-07:00"
  "distinct_id": "1193056043057"
  "elements_chain": ""
  "event": "Plan purchased"
    "properties": {...} 57 items // TIP: Standard properties are sent with each event (like device info, session data, and geo IP) along with any custom properties you attach
  "team_id": 1234
  "timestamp": "2023-06-28T08:57:37.083-07:00"
  "uuid": "018902b9-797d-78df-a85e-73422079fcb5"
}`}
                        language="json"
                    />
                </div>
            </div>
            <div className="flex gap-1 pt-4">
                <span className="w-12 h-12 md:h-6 md:w-6">
                    <IconLightBulb />
                </span>
                <p className="opacity-75">
                    You can also use <Link to="/docs/product-analytics/autocapture">autocapture</Link> to retroactively
                    define events from the DOM structure with <Link to="/docs/toolbar">the toolbar</Link>.
                </p>
            </div>
        </div>
    )
}

function IdentifyUser() {
    return (
        <div className="-mt-5">
            <p className="leading-tight">
                Use the <code>identify</code> method to push relevant customer data into PostHog and <code>group</code>{' '}
                to associate them with an organization.
            </p>
            <div className="grid lg:grid-cols-2 gap-x-6">
                <h4 className="text-xl order-1 lg:order-none">Your code</h4>
                <h4 className="text-xl order-4 lg:order-none">Available in PostHog</h4>
                <div className="order-2 lg:order-none">
                    <code className="inline-block mb-2">identify</code>
                    <CodeBlock
                        code={`posthog.identify('distinct_id', {
  email: 'max@hedgehogmail.com', // TIP: Attach properties to a user
  name: 'Max Hedgehog',
  createdAt: '2023-06-28T10:12:38.789-07:00',
  completedOnboarding: false,
});`}
                        language="js"
                    />
                </div>
                <div className="order-5 lg:order-none">
                    <code className="inline-block mb-2">identify</code>
                    <CodeBlock
                        code={`{
  "id": 'distinct_id',
  "email": "max@hedgehogmail.com",
  "name": "Max Hedgehog",
  "createdAt": '2023-06-28T10:12:38.789-07:00',
  "completedOnboarding": false
}`}
                        language="js"
                    />
                </div>
                <div className="order-3 lg:order-none">
                    <code className="inline-block my-2">group</code>
                    <CodeBlock
                        code={`posthog.group('company', 'company_id', { // TIP: Associate a user with an organzation
  name: 'Hedgehog Corp',
  plan: 'Enterprise (Annual)',
  subscribedAt: '2023-06-28T10:12:38.789-07:00',
});`}
                        language="js"
                    />
                </div>
                <div className="order-6 lg:order-none">
                    <code className="inline-block my-2">group</code>
                    <CodeBlock
                        code={`{
  "group_type_index": 987,
  "group_key": "string",
  "group_properties": {
    "name": "Hedgehog Corp",
    "plan": "Enterprise (Annual)",
    "subscribedAt": "2023-06-28T10:12:38.789-07:00"
  }
}`}
                        language="js"
                    />
                </div>
            </div>
        </div>
    )
}

function RecordPageview() {
    return (
        <div className="-mt-5">
            <p className="leading-tight">
                With <Link to="/docs/product-analytics/autocapture">Autocapture</Link> enabled, you can skip this step.
                But if using a single-page app (or want to customize what you capture), use <code>capture</code> to
                record a pageview.
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
                <div>
                    <h4 className="text-xl">Your code</h4>
                    <CodeBlock code={`posthog.capture('$pageview');`} language="js" />
                </div>
                <div>
                    <h4 className="text-xl">Available in PostHog</h4>
                    <CodeBlock
                        code={`"event": { 8 items
    "created_at": "2023-06-28T10:12:38.789-07:00"
    "distinct_id": "1193056043057"
    "elements_chain": ""
    "event": "$pageview"
      "properties": {...} 177 items
    "team_id": 2
    "timestamp": "2023-06-28T08:57:37.083-07:00"
    "uuid": "018902b9-797d-78df-a85e-73422079fcb5"
  }`}
                        language="json"
                    />
                </div>
            </div>
        </div>
    )
}

export default [
    {
        title: 'Track an event',
        body: TrackEvent,
        bodyType: 'component',
        code: ['capture'],
    },
    {
        title: 'Identify a user',
        body: IdentifyUser,
        bodyType: 'component',
        code: ['identify', 'group'],
    },
    {
        title: 'Record a pageview',
        body: RecordPageview,
        bodyType: 'component',
        code: ['capture'],
    },
]
