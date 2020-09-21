const plans = {
    cloud: [
        {
            title: 'Hobby',
            image: imgHobby,
            popular: false,
            price: '$0',
            priceDetail: 'forever',
            description: 'Ideal for just yourself or small side projects',
            callToAction: 'Create free account',
            callToActionDest: {
                type: 'url',
                value: 'https://app.posthog.com/signup',
            },
            benefits: [
                'Capture up to <b>20,000 events/month</b>',
                '<b>All core analytics features</b>',
                '<b>Unlimited</b> tracked users',
                '<b>1</b> team member',
                '90 day data retention',
                'Community support',
            ],
        },
        {
            title: 'Starter',
            image: imgStarter,
            popular: true,
            price: '$19',
            priceDetail: '/month',
            description: 'Ideal to get your product or website off the ground',
            callToAction: 'Start my free trial',
            callToActionDest: {
                type: 'url',
                value: 'https://app.posthog.com/signup?plan=starter',
            },
            benefits: [
                '<span class="p-plan-benefit-lg">Everything in Hobby, plus:</span>',
                'Capture up to <b>200,000 events/month</b>',
                '<b>Unlimited</b> team members',
                '<a href="/docs/features/feature-flags" target="blank">Feature flags</a>',
                '<a href="/docs/features/cohorts" target="blank">User cohorts</a>',
                '<a href="/docs/features/users#user-history" target="blank">Individual user history</a>',
                '6 month data retention',
                'Community support',
            ],
        },
        {
            title: 'Growth',
            image: imgGrowth,
            popular: false,
            price: '$99',
            priceDetail: '/month',
            description: 'Ideal for companies with large volumes',
            callToAction: 'Start my free trial',
            callToActionDest: {
                type: 'url',
                value: 'https://app.posthog.com/signup?plan=growth',
            },
            benefits: [
                '<span class="p-plan-benefit-lg">Everything in Starter, plus:</span>',
                'Up to <b>500,000 events/month</b> included*',
                '12 month data retention',
                'Email support',
            ],
        },
        {
            title: 'Enterprise',
            image: imgEnterprise,
            popular: false,
            price: 'Custom',
            priceDetail: 'contact us',
            description: 'Ideal for large companies with millions of users',
            callToAction: 'Contact sales',
            callToActionDest: {
                type: 'url',
                value: 'mailto:sales@posthog.com?subject=Enquiry%20about%20enterprise%20plan',
            },
            benefits: [
                '<span class="p-plan-benefit-lg">Everything in Growth, plus:</span>',
                'Capture <b>unlimited</b> events',
                '<b>Unlimited</b> data retention',
                'Dedicated support',
                'SSO/SAML',
                'Export to data lakes',
            ],
        },
    ],
    'self-hosted': [
        {
            title: 'Open Source',
            popular: false,
            price: '$0',
            priceDetail: 'forever',
            description: 'Ideal if your team has technical expertise and handles large volumes of users or events.',
            callToAction: 'Start deployment',
            callToActionType: 'primary',
            callToActionDest: {
                type: 'gatsbyLink',
                value: '/docs/deployment',
            },
            benefits: [
                'Capture <b>unlimited</b> events',
                '<b>All analytics features</b>',
                '<b>Unlimited</b> tracked users',
                '<b>Unlimited</b> team members',
                '<b>Unlimited</b> data retention',
                'Free updates for life (our code is <a href="https://github.com/posthog/posthog" target="_blank">open source</a>)',
                'Community support',
            ],
        },
        {
            title: 'Enterprise',
            popular: false,
            price: 'Custom',
            priceDetail: 'contact us',
            description: 'Ideal for companies need scalability, enterprise features and custom integrations.',
            callToAction: 'Contact sales',
            callToActionDest: {
                type: 'url',
                value: 'mailto:sales@posthog.com?subject=Enquiry%20about%20self-hosted%20enterprise%20plan',
            },
            benefits: [
                '<span class="p-plan-benefit-lg">Everything in Open Source, plus:</span>',
                'Clickhouse database for Petabyte scale',
                'Integrations with services like Zapier',
                'Permissioning and multiple projects',
                'Dedicated support',
                'SSO/SAML',
                'Export to data lakes',
            ],
        },
        {
            title: 'Supported',
            popular: true,
            price: 'Custom',
            priceDetail: 'contact us',
            description:
                'Ideal for companies that do not want the hassle of managing PostHog, but want to own their data.',
            callToAction: 'Contact sales',
            callToActionDest: {
                type: 'url',
                value: 'mailto:sales@posthog.com?subject=Enquiry%20about%20self-hosted%20supported%20plan',
            },
            benefits: [
                '<span class="p-plan-benefit-lg">Everything in Enterprise, plus:</span>',
                'PostHog deploys and maintains everything (in your own infrastructure)',
                'Uptime and scalability SLAs',
            ],
        },
    ],
}
const faqs = [
    {
        q: 'What happens when I reach the maximum number of events in my plan?',
        a:
            'We will let you know when you are close to the maximum number of events and prompt you to upgrade to a different plan. We will not stop collecting events but we might limit your ability to consult your data or run analytics until the next billing period.',
    },
    {
        q: 'Is there a free trial on paid plans?',
        a:
            'You can get a 30-day free trial on our Starter and Growth plans. Our Enterprise plan does not offer a free trial because it has the same base features as the Growth plan.',
    },
    {
        q: 'What happens after the data retention period elapses?',
        a:
            'On the cloud plans, any event or user data stored for more than the retention period may be permanently deleted from our systems. On the self-hosted plans, you control your data retention and what happens to your data afterwards.',
    },
    {
        q: 'Can I switch between the cloud and self-hosted plans?',
        a:
            'We are working hard to enable a bridge that allows data transfer between self-hosted instances and cloud instances. This will be possible in the coming months.',
    },
]

export { plans, faqs }
